[Innehåll](../README.md)

*Uppdaterad januari 2025*

# Publicera React-app med GitHub Pages

1. [Instruktioner](#instruktioner)
1. [Terminalkommandon](#instruktioner)
1. [vite.config.js](#viteconfigjs)
1. [package.json](#packagejson)
1. [React Router](#react-router)

#### Olika sätt att publicera sin app
Utöver GitHub Pages finns det många tjänster för att publicera en statisk frontend-app, t.ex. Netlify, Surge.sh och Firebase.


### Instruktioner
1. Skapa ett React-projekt
1. Lägg till gh-pages
1. Skapa git-repo
1. Editera vite.config.js
1. Editera package.json
1. Gör en commit med alla filer
1. Koppla ihop ditt lokala repo med GitHub
1. Pusha din kod
1. Kör deploy-skriptet

### Terminalkommandon
```bash
npm init vite@latest
npm i gh-pages
git init

# Editera vite.config.js och package.json nu

git add --all
git commit -m "Initial files"
git remote add origin (adressen till ditt git-repo)
# om din branch heter master, byt namn på den
git branch -m main

git push -u origin main
```

---

### vite.config.js
Standardinställningen för Vite är *absoluta* sökvägar. Den utgår från att du publicerar din app på serverns rotmapp. Men när vi publicerar på GitHub läggs projektet i en mapp med repots namn. Vi har två alternativ:
1. Ändra till relativ sökväg: `base: "./"`
1. Lägg in repots namn: `base: "github-repo-namn"`

Lägg in den version du vill ha inuti `defineConfig`.

---

### package.json
Paketet `gh-pages` gör en hel del inställningar i bakgrunden. Det enda den behöver för att göra sitt jobb är att du sätter "homepage". Lägg till en rad på rotnivå:
```json
"homepage": "https://github-user.github.io/github-repo-name"
```

Observera att github-user ska vara ditt användarnamn på GitHub, och github-repo-name ska vara namnet som du gett repot på GitHub.

Innan man kan publicera projektet behöver det byggas. För att underlätta detta behöver du lägga till två skript: deploy predeploy. Den senare körs automatiskt när man kör deploy-skriptet. Lägg till raderna inuti sektionen"scripts":
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

Nu kan du i fortsättningen publicera direkt genom att skriva:

```bash
npm run deploy
```

Ship away! Men se upp - skriptet publicerar det som ligger i projektets mapp just nu, inte den senaste committen!

---

### React Router
Om du använder det vanliga paketet React Router - se upp! RR har två olika routers:

1. BrowserRouter
1. HashRouter

Många guider rekommenderar BrowserRouter, eftersom de utgår från att man bygger en webbserver också. Men den tekniken fungerar inte på en statisk frontend. Du måste använda HashRouter.
