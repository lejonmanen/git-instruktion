[Innehåll](README.md)

Tillbaka till del 1: [Kommandoreferens](git.md)

# Git

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

---

Fortsättning följer i del 3: [Konfliktlösning](git-merge.md)
