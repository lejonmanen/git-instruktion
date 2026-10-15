```json
{
  "name": "shared",
  "version": "1.0.0",
  "description": "",
  "main": "src/schema.ts",
  "types": "src/schema.ts",
  "scripts": {},
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "dependencies": {
    "zod": "^4.6.1"
  }
}
```

Detta är filen `/packages/package.json` som används för kod som används både av frontend och backend.

+ main och types ska peka på huvudfilen. Den ska exportera typer och scheman.
