[Innehåll](../README.md)

*Uppdaterad HT 2025*

1. [Monorepo](#monorepo)
1. [Mappstruktur](#mappstruktur)
1. [Metoder för felsökning](#metoder-för-felsökning)


# Sätta upp fullstackprojekt
Teknikstack: vite, Node, Express, React, statisk frontend

## Monorepo
Denna guide går igenom hur vi lägger in både frontend- och backendkod i samma git-repo. Det finns flera fördelar, bland annat att vi har all kod tillgänglig i samma VS Code-fönster.

Vite är idag det enklaste sättet att skapa en React-app. Skapa ett frontend-projekt genom att skriva i terminalen:

```bash
npm init vite@latest
# Välj React med TypeScript

cd projektetsMapp/
git init
git add --all
git commit -m "Initial frontend"
```

## Mappstruktur
Guiden utgår från att du har följande mappstruktur. Skapa de mappar som saknas.

```
/
    src/
	dist/
	backendSrc/
	backendDist/
	public/
```

## Konfiguration: package.json
Ladda ner och installera dependencies i projektet.
```bash
npm install express cors zod
npm install --save-dev @types/express @types/cors
```

Lägg till skript för vanliga uppgifter, så det är lätt att starta servern via terminalen.
```json
{
	"type": "module",
	"scripts": {
		"dev": "vite",
		"build-frontend": "tsc -b && vite build",
		"build-server": "tsc -p ./backendSrc/tsconfig.json",
		"start-server": "node --env-file ./backendSrc/.env  ./backendDist/server.js",
	}
}
```

## Konfiguration: tsconfig.json
Vite har skapat en TypeScript config-fil för frontend. Vi behöver skapa en för backend.
```bash
cd backendSrc/
npx tsc --init
cd ..
```

Se till att följande rader finns i den nya tsconfig.json. Detta talar om
+ att vi vill använda "nästa" JavaScript-version, dvs den modernaste syntaxen
+ att TypeScript ska leta efter .ts-filer i backendSrc/
+ att de byggda filerna ska läggas i serverDist/

```json
"module": "esnext",
"rootDir": "./",
"outDir": "../serverDist/",
```

## .gitignore
Lägg till rader i .gitignore-filen.

```
backendDist/
.env
```

## Environment-fil
Backend kommer att behöva hemligheter för att ansluta till databasen och publicera appen. Skapa en fil med namnet `.env` i mappen `backendSrc/`.

```env
PORT=1337
DATABASE=beror på den specifika databasen
```

Vi använder environment-filer till
+ portnummer
+ connection string (MongoDB)
+ access keys (DynamoDB)


## Server-inställningar
Kör `npm run build` för att bygga frontend. Servern ska serva den byggda frontend från mappen `dist/`. 

```js
// backendSrc/server.ts
// Ange en backup-port som ska användas om .env-filen inte kan laddas.
const port: string = process.env.PORT || 1337

app.use(express.static('./dist/'))
```

## Proxy
Konfigurera vite.config.ts så att 
```js
export default defineConfig({
  plugins: [react()],
  server: {
	proxy: {
		// Använd den port som står i .env
		'/api': 'http://localhost:1337/'
	}
  }
})
```

```js
// Frontend exempel
const result = await fetch('/api/users')
```