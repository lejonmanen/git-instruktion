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
### Single player
Ann di Feynd är frontendutvecklare och ska bygga en app för lokalbokning. Hon ska arbeta tillsammans med kollegan Zeke. De använder git för att dela kod och arbeta tillsammans.

Först skapar Ann ett repository med en första, minimal version av de filer som ska finnas. Från början finns bara branchen *main*. Ann vill skapa en dev branch och flera feature branches. Ann ska jobba med funktionen att visa/söka lokaler och kollegan Zeke med funktionen att boka en lokal.

```bash
git init
# Lägg till första version av filer
# Kom ihåg att skapa en .gitignore fil
git add .gitignore index.html styles/main.css script/main.js
git commit -m "Initial commit"

# Dags att skapa branches
git branch dev
git branch show-rooms-feature
git branch book-room-feature
```

Innan Ann kan börja jobba i projektet måste hon ladda upp projektet till GitHub.

1. Skapa ett nytt repository på GitHub (helst med samma namn)
2. Kryssa *inte* i att skapa några filer atomatiskt. Ann har redan skapat allt som behövs på sin dator.
3. Nu har du ett nytt, tomt repository på GitHub. Detta ska kopplas ihop med ditt lokala repository. Skriv i terminalen:

```bash
# Detta står även på GitHub
git remote add origin https://github.com/your-user-name/your-repo-name.git
git push -u origin main
```

Nu är det dags att börja jobba med sökfunktionen. Ann byter branch från *main* till *show-rooms-feature* och ska börja skriva kod. Innan hon börjar kontrollerar hon att statusen är rätt.
 Det behövs mera JavaScript så Ann kommer att lägga till en ny fil.

```bash
# Byt till rätt branch
git checkout show-room-feature

git status
# Git säger:
#   On branch show-rooms-feature
#   nothing to commit, working tree clean
```

Nu jobbar Ann i projektet. Hon gör ändringar och lägger till nya filer.
```bash
git status
# Git säger:
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#       modified:   index.html
#
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#
#       script.js
```

Git har märkt att Ann har gjort ändringar i mappen. Ann lägger till filerna i *staging area* och gör en *commit*.
```bash
# Lägga till ändringarna
git add --all
# Eller: git add index.html script.js

git status
# Git säger:
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
#       new file:   script.js
#       modified:   index.html

# Ok, då kör vi
git commit -m "Uppdate index.html and added script.js"
git push
# Pusha commit så att Zeke kan hämta den från GitHub om han behöver
# Första gången skriver man: git push -u origin main
```
---


### Multi player
Samtidigt ska Zeke börja jobba med bokning av rum. Eftersom Ann har skapat repot, behöver inte Zeke göra det. Han ska bara klona repot.
```bash
# Ladda ner repot från GitHub
git clone https://github.com/anns-user-name/anns-repo-name.git

# Git skapar en mapp för repot, gå in i den och börja jobba
cd mappens-namn/

git status
# Vänta nu! Git rapporterar att branchen är "main"
# Zeke måste byta branch innan han börjar jobba
git checkout book-room-feature
```

Zeke ändrar i index.html och lägger till en ny CSS-fil. Sedan ska han committa det till GitHub, så att Ann kan se ändringarna.

```bash
# Committa och pusha
git add index.html book.css
# Eller: git add --all

git commit -m "Booking styles"
git push

git status
# Kontrollera så att allt gick vägen
```

Ann vill använda Zekes snygga CSS. Eftersom de jobbar i olika branches behöver hon *hämta Zekes ändringar* från branchen Zeke jobbade i. Det gör man med `git merge`. Men innan hon gör det måste hon hämta ner uppdateringar från GitHub, annars känner inte Git på hennes dator till Zekes ändringar.

```bash
git status
# Ann måste ha ett "cleant" working directory för att kunna hämta ändringar

git fetch   # fråga GitHub om det har skett några ändringar sen sist
git status

# Nu kör vi! Hämta ändringarna från Zekes branch
# och kombinera dem med ändringarna i Anns branch
git merge book-room-feature
```

### Konfliktlösning - merge


## Ångra och återställa
