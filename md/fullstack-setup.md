[Innehåll](../README.md)

*Uppdaterad HT 2026*

1. [Monorepo](#monorepo)
1. [Grundläggande mappstruktur](#grundläggande-mappstruktur)
1. [Steg för steg](#steg-för-steg)
	1. [Frontend](#frontend)
	1. [Backend](#backend)
	1. [Delad kod](#delad-kod)
	1. [Proxy](#proxy)
1. [Exempel mappstruktur](#exempel-mappstruktur)
1. [Fler inställningar](#fler-inställningar)
	1. [Environment-fil](#environment-fil)
	1. [Backend server](#backend-server)
	1. [Frontend förslag på mappstruktur](#frontend-förslag-på-mappstruktur)
1. [Testa](#testa)

---


# Sätta upp fullstackprojekt
Teknikstack: vite, Node, Express, React, statisk frontend, databas/DynamoDB, React Router, Zustand.

Vi använder Vite för att skapa och sätta upp frontend-projektet. Backend sätter vi upp manuellt.

## Monorepo
Denna guide går igenom hur vi lägger in både frontend- och backendkod i samma git-repo. Det finns flera fördelar, bland annat:

+ all kod tillgänglig i samma VS Code-fönster,
+ synkade versioner (frontend och backend utvecklas tillsammans),
+ en commit för ändringar i både frontend och backend, i stället för flera,
+ dela kod mellan projekten,
+ enklare smarbete och CI/CD.

### Grundläggande mappstruktur

```text
root/ 
├─ backend/
├─ frontend/
├─ packages/
| └─ shared/
└─ package.json
```

## Steg för steg
### Frontend

*Vi använder Vite för att konfigurera ett frontend-projekt, så vi inte behöver göra allt själva.*

10. Skapa en mapp för hela projektet

2. Skapa filen package.json för hela projektet. [Exempel package.json](fullstackDocs/package-root.md)

3. Skapa ett frontend-projekt med namnet `frontend`.

4. Flytta filen `.gitignore` från frontend-mappen till rotmappen. Se till att filen innehåller `.env`, `dist/` och `.DS_Store`.

```bash
mkdir project-name
cd project-name/
touch package.json
npm create vite@latest frontend
mv frontend/.gitignore .
printf "\n.env\ndist/\n.DS_Store\n" >> .gitignore
git add --all
git commit -m "Basic setup, frontend"
```

---

### Backend

20. Skapa en mapp för backend-projektet
20. Skapa `package.json` för backend-projektet. Lägg till de paket du behöver. [Exempel](fullstackDocs/package-backend.md)
20. Skapa en `tsconfig.json` fil. [Exempel](fullstackDocs/tsconfig-backend.md)
20. Skapa filer och mappar för koden

```bash
mkdir backend/
cd backend/
npm init -y
npm install express zod
npm install --save-dev @types/express @types/node typescript
# Lägg till AWS, Gemini m.fl. efter hand
npx tsc --init
mkdir src/
touch src/server.ts
cd ..
git add --all
git commit -m "Basic setup, backend"
```

---

### Delad kod

30. Skapa mapparna packages och shared
30. Skapa package.json. [Exempel](fullstackDocs/package-shared.md)

```bash
mkdir packages
cd packages/
mkdir shared
touch shared/schema.ts
npm init -y
npm i zod
cd ..
git add --all
git commit -m "Basic setup, shared packages"
```

---

### Proxy

40. Sätt ett portnummer i `backend/src/server.ts` eller i en `.env` fil.
41. Skriv in portnumret i vite.config.ts. [Exempel](fullstackDocs/vite-proxy.md)

```typescript
// Utan proxy - undvik!
const response = await fetch('http://localhost:3001/api/exempel')

// Med proxy
const response = await fetch('/api/exempel')
```

---

## Exempel mappstruktur
Ett exempel på hur mappstrukturen bör se ut efter du använt den här guiden.

```text
root/
├─ backend/
| ├─ src/
| | ├─ server.ts
| | └─ (backend-filer)
| ├─ package.json
| └─ tsconfig.json
|
├─ frontend/
| ├─ public/
| ├─ src/
| | └─ (React-filer)
| ├─ package.json
| ├─ tsconfig.json
| ├─ tsconfig.app.json
| ├─ tsconfig.node.json
| └─ vite.config.ts
|
├─ packages/
| ├─ shared/
| | └─ src/
| |   ├─ (delad kod)
| |   └─ schema.ts
| └─ package.json
|
├─ .gitignore
├─ package-lock.json
└─ package.json
```



## Fler inställningar

### Environment-fil
Backend kommer att behöva hemligheter för att ansluta till databasen och publicera appen. Skapa en fil med namnet `.env` i rotmappen.

```env
PORT=3001
ACCESS_KEY=(DynamoDB)
SECRET_ACCESS_KEY=(DynamoDB)
JWT_SECRET=(ett säkert lösenord som du väljer)
GEMINI_API_KEY=(Gemini)
```

Vi använder environment-filer till information som inte ska laddas upp på GitHub.
+ portnummer
+ access till databas
	+ access keys (DynamoDB)
	+ connection string (MongoDB)
+ hemlighet för JWT - ett riktigt svårt lösenord, som du väljer
+ access till andra tjänster såsom LLM, Firebase m.m.

---

### Backend server

```typescript
// Skriv funktioner som hämtar värden från .env-filen
function getJwtSecret() {
	const secret: string | undefined = process.env
	if( secret ) {
		return secret
	}
	console.log('Could not find JWT secret in .env file.')
	process.exit(1)
}
```


### Frontend förslag på mappstruktur
Lägg till fler mappar efter behov. Här är ett förslag på mappstruktur som bör fungera bra i projekt av olika storlekar.

En *feature* är en avgränsad del av en React-app, som kan utvecklas för sig. En feature-mapp kan innehålla flera komponenter och alla övriga filer som hör till. Till exempel: en gemensam header, lista över produkter, search bar, formulär.

```text
root/ 
├─ src/
| ├─ features/
| | ├─ search/
| | └─ header/
| ├─ models/
| | └─ types.ts
| ├─ pages/
| └─ store/
├─ dist/
└─ public/
```

Förklaring
+ `features/`  Dela in appen i en mapp per feature. Varje mapp kan innehålla flera komponenter.
+ `models/`  TypeScript interfaces
+ `pages/`  vyer för React Router
+ `store/`  Zustand eller Redux stores


## Testa
Nu är det dags att testa om allt fungerar!

Lägg till skript i rot-package.json för att bygga och starta delprojekten.

```bash
# Terminal 1
npm run restart:backend

# Terminal 2
npm run build:frontend
npm run dev:frontend
```

Öppna frontend utvecklingsservern i valfri webbläsare: `http://localhost:5173/`

Testa att backend är igång med en ny flik i webbläsaren: `http://localhost:3001/`. Använd porten du bestämt i koden eller .env-fil.

Om du ser samma sak i båda webbläsarna så servar backend de statiska, byggda frontend-filerna.



[Till toppen av sidan](#sätta-upp-fullstackprojekt)
