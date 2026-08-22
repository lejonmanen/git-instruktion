# Convert to HTML

Script that produces HTML files from all .md files.

Usage:

```bash
# Run
cd convertHtml/
npm install
npm run build
```

Then open [readme.html](output/readme.html) in your browser.



## Notes

- Each generated page gets a `<body class="<filename>-html">` root class
  (e.g. `main.md` -> `class="main-html"`), for shared CSS hooks. Filenames
  are assumed to already be kebab-case.
- Links are rewritten via marked's `walkTokens` hook, operating on parsed
  link tokens rather than regexing raw markdown text — so links inside code
  fences/inline code are left alone.
- `.git` and `node_modules` directories are skipped when walking the source
  tree.
- GFM tables work out of the box (marked supports them natively, no plugin
  needed).
- The template assumes a shared `/common.css` — adjust the `<link>` tag in
  `renderPage()` in build.js to match wherever you keep your stylesheet.
