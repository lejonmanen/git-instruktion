[Innehåll](README.md)

# Git
## Kommandoreferens

### `git init`
Skapa ett nytt git-repository. Det har inga filer ursprungligen. Börja med att skapa en `.gitignore` fil med innehållet:
```
node_modules/
DS_Store
```

### `git status`
Ta reda på alla filers status, i ditt lokala repo. Berättar för dig om det finns konflikter.

### `git add`
Lägg till utvalda filer och mappar i *staging area*. Du kan se vad som finns i staging area med kommandot `git status`.

Finns i två versioner:
```bash
# Lägga till filer och mappar individuellt
git add file1 folder1

# Lägga till allt i repots mapp som inte är committat.
git add --all
```

### `git commit -m "Meddelande"`
Skapar en ny *snapshot* (ögonblicksbild, commit) av koden i ditt lokala repo. Glöm inte lägga till ett commit-meddelande som beskriver vad committen innehåller.

När du har gjort en commit så säger vi att din *working directory* är *clean*, för det finns (för tillfället) inga ändringar som inte är committade. Flera kommandon kräver att du är *clean* för att använda dem.

### `git log`
Visar alla commits som gjorts i repot. Har många inställningar. Till exempel kan du visa de tre senaste commits som gjorts på en rad var geom att skriva:
`git log -3 --oneline`

### `git push`
Skickar alla commits du har gjort till GitHub. Innan du har pushat finns dina commits bara på din dator.

### `git fetch`
Ta reda på *om* det finns nya commits på GitHub. Om du skriver `git status` efteråt så får du veta om du är "up to date" eller om du behöver hämta det senaste.

### `git pull`
Hämta commits från GitHub. Hämtar alla commits som du inte har på din dator.

### `git branch`
Visar vilka branches som finns på din lokala dator. Du kan skapa en ny branch genom att skriva `git branch new-branch-name`.

### `git checkout branch-name`
Säger åt git att byta branch. Detta går bara om du är *clean* - se [git commit](#git-commit).

När man byter branch så uppdateras alla filer i mappen, så att de matchar den valda branchen.

### `git merge from-branch`
Se [Konfliktlösning](#konfliktlosning). Hämtar ändringar som gjorts i "from-branch" och kombinerar dem med din aktuella branch. Vi använder det för att kombinera kod. Git försöker lösa det automatiskt, men om två personer gjort ändringar i samma fil får vi en *merge-konflikt*.

### `git reset`
Se [Ångra och återställa](#angra-och-aterstalla). Används till många olika saker, som har att göra med tidigare commits:
+ ångra `git add` (*unstage*)
+ backa till en tidigare commit utan att ändra filerna
+ se hur en eller flera filer såg ut i en tidigare commit
+ "ångra" en commit
---

## Workflow
Ann di Feynd är frontendutvecklare och ska bygga en app för lokalbokning. Hon ska arbeta tillsammans med Zahar och de använder git för att dela kod och arbeta tillsammans.

Först skapar Ann ett repository med en första, minimal version av de filer som ska finnas. Från början finns bara branchen *master*. Ann vill skapa en dev branch och flera feature branches. Ann ska jobba med funktionen att visa/söka lokaler och kollegan Zeke med funktionen att boka en lokal.

```bash
git init
# Lägg till första version av filer
# Kom ihåg att skapa en .gitignore
git add .gitignore index.html styles/main.css script/main.js
git commit -m "Initial commit"

# Dags att skapa branches
git branch dev
git branch show-room-feature
git branch book-room-feature
```

Nu är det dags att börja jobba med sökfunktionen. Ann byter branch från *master* till *show-room-feature* och börjar skriva kod. Det behövs mera JavaScript så Ann lägger till en ny fil och gör en commit.

```bash
# Byt till rätt branch
git checkout show-room-feature

# Lägga till en ny fil
# Pusha committen så att Zeke kan se den på GitHub
git add script/show.js
git commit -m "Added script for show room feature"
git push
```


## Konfliktlösning
## Ångra och återställa
