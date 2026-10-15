```json
{
  "compilerOptions": {
    "rootDir": "..",
    "outDir": "./dist",

    "module": "nodenext",
    "target": "esnext",
    "types": [],
	// ...

	"rewriteRelativeImportExtensions": true,
	// "allowImportingTsExtensions": true
  },
  "include": ["src"]
}
```

Denna fil är `/backend/tsconfig.json`.

+ För ett monorepo med workspaces ska rootDir referera till projektets rotmapp, alltså `..`

+ outDir är den mapp som ska skapas när TypeScript bygger backend

+ rewriteRelativeImportExtensions gör så att man kan skriva `import x from 'fil.ts'`

+ Ange vilka mappar backend-koden ligger i med include: `["src"]`
