[Innehåll](../README.md)

*Uppdaterad HT 2025*

1. [Monorepo](#monorepo)
1. [Mappstruktur](#mappstruktur)
1. [Konfiguration: package.json](#konfiguration-packagejson)
1. [Konfiguration: tsconfig.json](#konfiguration-tsconfigjson)
1. [.gitignore](#gitignore)
1. [Environment-fil](#environment-fil)
1. [Server-inställningar](#server-inställningar)
1. [Proxy](#proxy)
1. [Förslag på mappstruktur](#förslag-på-mappstruktur)


# Sätta upp fullstackprojekt
Teknikstack: vite, Node, Express, React, statisk frontend, databas/DynamoDB, React Router, Zustand.

## Monorepo
Denna guide går igenom hur vi lägger in både frontend- och backendkod i samma git-repo. Det finns flera fördelar, bland annat:

+ all kod tillgänglig i samma VS Code-fönster,
+ synkade versioner (frontend och backend utvecklas tillsammans),
+ en package.json, en plats för alla skript och npm-paket.

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
	srcServer/
	distServer/
	public/
```

## Konfiguration: package.json
Ladda ner och installera dependencies i projektet.
```bash
npm install express cors zod jsonwebtoken @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb react-router zustand
npm install --save-dev typescript @types/express @types/cors @types/jsonwebtoken
```

Lägg till skript för vanliga uppgifter, så det är lätt att starta servern via terminalen.
```json
{
	"type": "module",
	"scripts": {
		"dev": "vite",
		"build-frontend": "tsc -b && vite build",
		"build-server": "tsc -p ./srcServer/tsconfig.json",
		"start-server": "node --env-file ./srcServer/.env  ./backendDist/server.js",
		"restart-server": "clear && npm run build-server && npm run start-server",
		"predeploy": "npm run build-frontend && npm run build-server"
	}
}
```

## Konfiguration: tsconfig.json
Vite har skapat en TypeScript config-fil för frontend. Vi måste skapa en för backend.
```bash
cd srcServer/
npx tsc --init
cd ..
```

Se till att följande rader finns i den nya tsconfig.json. Detta talar om
+ att vi vill använda "nästa" JavaScript-version, dvs den modernaste syntaxen
+ att TypeScript ska leta efter .ts-filer i serverns mapp
+ var de byggda serverfilerna ska läggas

```json
"module": "esnext",
"rootDir": "./",
"outDir": "../distServer/",
```

## .gitignore
Lägg till rader i .gitignore-filen.

```
distServer/
.env
```


## Environment-fil
Backend kommer att behöva hemligheter för att ansluta till databasen och publicera appen. Skapa en fil med namnet `.env` i mappen `backendSrc/`.

```env
PORT=1337
ACCESS_KEY=(DynamoDB)
SECRET_ACCESS_KEY=(DynamoDB)
JWT_SECRET=
```

Vi använder environment-filer till information som inte ska laddas upp på GitHub.
+ portnummer
+ access till databas
	+ access keys (DynamoDB)
	+ connection string (MongoDB)
+ hemlighet för JWT - tänk dig ett riktigt svårt lösenord


## Server-inställningar
Kör `npm run build` för att bygga frontend. Servern ska serva den byggda frontend från mappen `dist/`.

```js
// srcServer/server.ts
// Ange en backup-port som ska användas om .env-filen inte kan laddas.
const port: string = process.env.PORT || 1337

app.use(express.static('./dist/'))
```

## Proxy
Alla request som skickas från dev-servern och börjar med `/api` måste gå via en proxy. Konfigurera vite.config.ts så att den använder serverns portnummer.
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


## Förslag på mappstruktur
Lägg till fler mappar efter behov. Här är ett förslag på mappstruktur som bör fungera bra i projekt av olika storlekar.

En *feature* är en avgränsad del av en React-app, som kan utvecklas för sig. En feature-mapp kan innehålla flera komponenter och alla övriga filer som hör till. Till exempel: en gemensam header, lista över produkter, search bar, formulär.

```
/
    src/
		features/   Dela in appen i olika features
		models/     TypeScript interfaces
		pages/      React Router routable views
		store/      Zustand stores
	dist/           Byggda frontend-filer
	srcServer/
	    auth/       Kod för autentisering
		data/       TypeScript interfaces, databaskod
		routes/     Router modules
	distServer/     Byggda backend-filer
	public/         Gemensamma frontend-resurser
```
