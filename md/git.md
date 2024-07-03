[Innehåll](../README.md)

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

*Varning! Om du glömmer meddelandet så startas terminal-editorn Vim. [Läs här hur man avslutar den](https://stackoverflow.com/questions/11828270/how-do-i-exit-the-vim-editor)*.

När du har gjort en commit så säger vi att din *working directory* är *clean*, för det finns (för tillfället) inga ändringar som inte är committade. Flera kommandon kräver att du är *clean* för att använda dem.

### `git log`
Visar alla commits som gjorts i repot. Har många inställningar. Till exempel kan du visa de tre senaste commits som gjorts på en rad var geom att skriva:
`git log -3 --oneline`

### `git remote`
Visar om repot är anslutet till några "remote repository", till exempel GitHub. När du skapar ett nytt projekt på din dator ska du använda git remote för att lägga till det på din GitHub:
```bash
git remote add origin https://github.com/your-user-name/your-repo-name.git
```

### `git push`
Skickar alla commits du har gjort till GitHub. Innan du har pushat finns dina commits bara *lokalt*, alltså på din dator.

### `git fetch`
Ta reda på *om* det finns nya commits på GitHub. Om du skriver `git status` efteråt så får du veta om du är "up to date" eller om det finns nya uppdateringar som du behöver hämta.

### `git pull`
Hämta nya uppdateringar från GitHub. Hämtar alla commits som du inte har på din dator.

### `git branch`
Visar vilka branches som finns på din lokala dator. Du kan skapa en ny branch genom att skriva `git branch new-branch-name`.

### `git switch branch-name`
Säger åt git att byta branch. Detta går bara om du är *clean* - se [git commit](#git-commit).

När man byter branch så uppdateras alla filer i mappen, så att de matchar den valda branchen.

Du kan skriva `checkout` i stället för `switch`, för samma effekt.

### `git merge branch-to-get`
Se [Konfliktlösning](#konfliktlosning). Hämtar ändringar som gjorts i "branch-to-get" och kombinerar dem med din aktuella branch. Vi använder det för att kombinera kod. Git försöker lösa det automatiskt, men om två personer gjort ändringar i samma fil får vi en *merge-konflikt*.

### `git reset`
Se [Ångra och återställa](#angra-och-aterstalla). Används till många olika saker, som har att göra med tidigare commits:
+ ångra `git add` (*unstage*)
+ backa till en tidigare commit utan att ändra filerna
+ se hur en eller flera filer såg ut i en tidigare commit
+ "ångra" en commit

---

## Förstagångskonfiguration

När du installerar Git för första gången måste du konfigurera det. Skriv följande i terminalen. Innan du gjort det kan du inte göra en commit.

Namnet ska vara ditt namn. När man gör en commit till GitHub brukar man använda sitt riktiga namn. Inga gamer-tags här!

E-postadressen ska vara den e-post du använder för att logga in på GitHub.

```bash
git config --global user.name "Ditt Namn"
git config --global user.email "din.epost@gmail.com"
```


Fortsättning följer i del 2: [Workflow](git-workflow.md)
