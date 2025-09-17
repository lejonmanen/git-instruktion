[Innehåll](../README.md)

Tillbaka till del 3: [Konfliktlösning](git-merge.md)

# Ångra och återställa

Olika sorters ångra är olika svårt! Så länge vi bara jobbar på vår egen dator är det relativt lätt att backa bandet. Men så snart något är uppladdat på GitHub, så kan mina teammedlemmar använda koden. Därför är det svårare att ångra det som pushats.

1. Ångra `git add` - jag har lagt till filer i staging area av misstag
1. Ångra `git commit` - jag har committat filer av misstag, men inte pushat
1. Ångra `git push` - jag har pushat en eller flera commits
1. Specialfall - jag pushade lösenordet till databasen till GitHub

## 1 Ångra git add
Använd om du har lagt till filer med `git add`, men inte committat än.
```bash
# Backa ändringar i en fil till senaste commit
git reset HEAD fil1.js fil2.js

# Backa alla ändringar
git reset HEAD
```

## 2 Ångra git commit
Använd om du har committat en eller flera gånger, men inte pushat än. Börja med att ta reda på vilken revision (version) du vill backa till.

```bash
# Se senaste 5 commit
git log --oneline -5

#ce9a71b (HEAD -> main) En commit som jag vill ångra
#afc4fb6 En commit som jag vill tillbaka till
```

Varje revision har en unik kod på 7 tecken. Vi använder "git log" för att se vilken kod vi ska använda. Koden är `afc4fb6` i det här exemplet. Byt ut den mot din egen kod.

```bash
# Rulla tillbaka till så som filerna såg ut efter revision afc4fb6
git reset afc4fb6 --hard
```

Obs! Flaggan `--hard` talar om att filerna i *working directory* ska slängas. Har du något som du inte committat men vill behålla, kopiera det innan du kör kommandot.


## 3 Ångra git push
Hoppsan! Om du har pushat till GitHub, så finns det en risk att någon annan i ditt team har hunnit ladda ner dina ändringar och gjort merge med sin kod. Bäst är att göra en ny commit, som återställer koden till det tillstånd du vill att den ska vara i. Har du till exempel lagt till en ny fil, gör du en ny commit där filen är borttagen. Den nya committen ska alltså vara motsatsen till den du vill ångra.

1. Prata med alla teammedlemmar, så att de vet att de ska undvika din branch tills du har löst problemet
1. Skapa en "motsatscommit"
1. Pusha den

> Exempel 1: om jag gjort en commit som lägger till en ny fil, så är motsatscommiten en commit där jag har tagit bort filen.
>
> Exempel 2: om jag har gjort en commit som lägger till en extra rad, så är motsatscommiten en commit där raden är borttagen.


#### `git revert`
Revert skapar en motsatscommit för en specifik revision. (Det måste inte vara den senaste.) Man måste ange HEAD eller SHA-1 koden.
```bash
# ångra bara den senaste, pushade committen
git revert HEAD

# ångra en specifik commit: afc4fb6
git revert afc4fb6

# Glöm inte att kontrollera hur det gick!
git status
```

#### Ångra flera committs
Flera revert efter varandra kan klumpas ihop till en commit.
```bash
# --no-commit betyder att git ska vänta med att göra en commit, tills du skriver "git commit"
git revert ce9a71b --no-commit
git revert afc4fb6 --no-commit
git commit -m "Revert: berätta vad som ingår i committsen du ångrar"

# Kolla så att allt ser bra ut innan du pushar!
git status

git push
```


## 4 Pushade känsliga uppgifter
You're screwed. Det går inte att 100% garantera att ingen kan plocka ut lösenordet ur koden på GitHub. Byt alla lösenord som har läckt.


Se hur proffsen arbetar i del 3: [Pull request](git-pull-request.md#workflow)
