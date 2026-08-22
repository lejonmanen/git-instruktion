/*
build.js
Converts a directory of Markdown files into a mirrored directory of HTML
files. Relative links between .md files are rewritten to .html, and every
other file (images, etc.) is copied through unchanged at the same
relative path. Each generated page gets a root class derived from its
filename (main.md -> class="main-html") for shared CSS hooks.
*/

import { readdir, mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { marked } from 'marked';
import { Dirent } from 'node:fs';

// Directories to skip entirely while walking the source tree.
const IGNORE_DIRS = new Set(['.git', 'node_modules']);

// --- Link rewriting -------------------------------------------------------
//
// marked's walkTokens hook runs over every parsed token before rendering,
// so we rewrite href values on actual `link` tokens instead of regexing
// raw markdown text (which would risk touching text inside code fences,
// inline code, etc.)

function isRewritableRelativeLink(href) {
	if( !href ) return false;
	if( /^[a-z][a-z0-9+.-]*:/i.test(href) ) return false;   // has a scheme (http:, mailto:, etc.)
	if( href.startsWith('//') ) return false;               // protocol-relative
	if( href.startsWith('#') ) return false;                // same-page anchor only
	return true;
}

function rewriteMdHref(href) {
	if( !isRewritableRelativeLink(href) ) return href

	const hashIndex = href.indexOf('#');
	const beforeHash = hashIndex === -1 ? href : href.slice(0, hashIndex);
	const hashPart = hashIndex === -1 ? '' : href.slice(hashIndex);

	const queryIndex = beforeHash.indexOf('?');
	const pathOnly = queryIndex === -1 ? beforeHash : beforeHash.slice(0, queryIndex);
	const queryPart = queryIndex === -1 ? '' : beforeHash.slice(queryIndex);

	if (!/\.md$/i.test(pathOnly)) return href; // not a link to a markdown file

	const newPath = pathOnly.replace(/\.md$/i, '.html');
	return newPath + queryPart + hashPart;
}

// Slug for heading ids, matching the GitHub-style anchors already used in
// your table-of-contents links (e.g. "4 Smarta genvägar" -> "4-smarta-genvägar").
function slugify(text) {
	return text
	.toLowerCase()
	.trim()
	.replace(/\s+/g, '-')
	.replace(/[^\p{L}\p{N}_-]+/gu, '');
}

// Minimal attribute escaping (quotes/ampersands only) — deliberately NOT
// encodeURI/percent-encoding, so UTF-8 characters stay literal in href/title
// attributes. HTML5 allows this directly.
function escapeAttr(str) {
	return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

marked.use({
	walkTokens(token) {
		if (token.type === 'link') {
			token.href = rewriteMdHref(token.href);
		}
	},
	renderer: {
		// Default renderer would call marked's cleanUrl(), which runs href
		// through encodeURI() and turns e.g. "ä" into "%C3%A4". This override
		// keeps the href (already .md->.html rewritten by walkTokens) as-is.
		link({ href, title, tokens }) {
			const text = this.parser.parseInline(tokens);
			let out = `<a href="${escapeAttr(href)}"`;
			if (title) out += ` title="${escapeAttr(title)}"`;
			return out + `>${text}</a>`;
		},
		image({ href, title, text }) {
			let out = `<img src="${escapeAttr(href)}" alt="${escapeAttr(text)}"`;
			if (title) out += ` title="${escapeAttr(title)}"`;
			return out + '>';
		},
		// Default renderer emits headings with no id at all. This adds one,
		// slugified to match your existing #anchor links.
		heading({ tokens, depth, text }) {
			const id = slugify(text);
			return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
		},
	},
});



// --- HTML template ---------------------------------------------------------

function renderPage({ title, rootClass, body }) {
	return `<!doctype html>
<html lang="se">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title> git-instruktion | ${escapeHtml(title)} </title>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="./common.css">
</head>
<body class="${rootClass}">
	${body}
</body>
</html>
`;
}

function escapeHtml(str) {
	return str
	.replace(/&/g, '&amp;')
	.replace(/</g, '&lt;')
	.replace(/>/g, '&gt;');
}


// --- File conversion --------------------------------------------------------

async function convertMarkdownFile(srcPath, outPath) {
	const markdown = await readFile(srcPath, 'utf8');
	const body = await marked.parse(markdown);

	const slug = path.basename(srcPath, path.extname(srcPath)); // already kebab-case
	const rootClass = `${slug}-html`;
	const htmlOutPath = outPath.replace(/\.md$/i, '.html');

	const page = renderPage({ title: slug, rootClass, body });

	await mkdir(path.dirname(htmlOutPath), { recursive: true });
	await writeFile(htmlOutPath, page, 'utf8');
}

async function copyAsset(srcPath, outPath) {
	await mkdir(path.dirname(outPath), { recursive: true });
	await copyFile(srcPath, outPath);
}

// --- Directory walk ----------------------------------------------------------

async function processDir(srcDir, outDir) {
	await mkdir(outDir, { recursive: true });
	const entries = await readdir(srcDir, { withFileTypes: true });

	for (const entry of entries) {
		if (entry.isDirectory() && IGNORE_DIRS.has(entry.name)) continue;

		const srcPath = path.join(srcDir, entry.name);
		const outPath = path.join(outDir, entry.name);

		if (entry.isDirectory()) {
			await processDir(srcPath, outPath);
		} else if (entry.isFile() && /\.md$/i.test(entry.name)) {
			await convertMarkdownFile(srcPath, outPath);
		} else if (entry.isFile()) {
			await copyAsset(srcPath, outPath);
		}
	}
}

// --- File dispatch -----------------------------------------------------------

// Processes a single file: converts it if it's markdown, otherwise copies it
// through unchanged. outDir is the *directory* the file belongs in (its
// output name is derived from srcFile's basename).
async function processFile(srcFile, outDir, outFile='') {
	const outPath = path.join(outDir, path.basename(outFile || srcFile));

	if (/\.md$/i.test(srcFile)) {
		await convertMarkdownFile(srcFile, outPath);
	} else {
		await copyAsset(srcFile, outPath);
	}
}


// --- Entry point --------------------------------------------------------------

async function main() {
	// const [, , srcArg, outArg] = process.argv;

	// if (!srcArg || !outArg) {
	// 	console.error('Usage: node build.js <source-dir> <output-dir>');
	// 	process.exit(1);
	// }

	// const srcDir = path.resolve(srcArg);
	// const outDir = path.resolve(outArg);

	await processFile('../README.md', './output', 'index.html')
	await processDir('../md/', './output/md')
	// await copyAsset('../img/', './output/img')
	console.log(`Done. HTML written to output/`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
