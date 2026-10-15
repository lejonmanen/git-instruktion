```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "restart": "tsc && node ./dist/backend/src/server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "dependencies": {
    "express": "^5.2.1",
    "zod": "^4.6.1"
  },
  "devDependencies": {
    "@types/express": "^5.0.6",
    "@types/node": "^24.13.4",
    "typescript": "^6.0.3"
  }
}
```


Denna fil är `/backend/tsconfig.json`.

+ Lägg till de skript du behöver i `scripts`. Om du vill referera till ett skript i /package.json ska du använda samma namn här som i `/package.json`.


+ se till att `type:module` är satt
