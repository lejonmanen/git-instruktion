[Innehåll](../README.md)

Tillbaka till del 2: [Workflow](git-workflow.md)

# Git

## Konfliktlösning - merge

### Status just nu
*Tabell över ändringar som gjorts i två olika branches:*

|Anns branch    |Zekes branch   |Resultat  |
|---------------|---------------|----------|
|script.js      |               |script.js |
|               |book.css       |book.css  |
|index.html (1) |index.html (2) |**MERGE** |

*Git försöker lösa alla sammanslagningar automatiskt. Men det är inte alltid det lyckas.*

Filerna `script.js` och `book.css` löser git självt.

Men eftersom Ann och Zeke har gjort ändringar i samma fil, `index.html`, så behöver Git vår hjälp! Så här ser gamla index.html ut:

```html
 1    <!DOCTYPE html>
 2    <html lang="en" dir="ltr">
 3    <head>
 4        <meta charset="utf-8">
 5        <title>Boka lokaler </title>
 6    </head>
 7    <body>
 8        <section>
 9            <h1> Boka konferensrum </h1>
10            <ul>
11                <li> <button>Skatan</button> </li>
12                <li> <button>Bofinken</button> </li>
13                <li> <button>Strutsen</button> </li>
14            </ul>
15        </section>
16    </body>
17    </html>
```

Ann, som jobbar med sökfunktionen; har lagt till kod för att söka baserat på rummets namn, efter rad 9:

```html
10    <p> Sök efter rum: <input type="text" placeholder="Namn" /> </p>
```

Men Zeke, som jobbar med bokningen, har skrivit:

```html
10    <p> <input type="checkbox" /> Behöver projektor </p>
11    <ul>
12        <li> <button>Skatan (8 platser)</button> </li>
13        <li> <button>Bofinken (5 platser)</button> </li>
14        <li> <button>Strutsen (12 platser)</button> </li>
15    </ul>
```

Git tittar igenom ändringarna.

### Ändring 1

Zekes rad 11-15 är ändringar som bara finns hos Zeke. Git löser konflikten automatiskt genom att ta med raderna.

### Ändring 2

Ann och Zekes rad 10 är olika. Det blir därför en konflikt, som kan lösas på flera sätt:
1. behålla Anns version
1. behålla Zekes version
1. behålla båda raderna - det blir två rader i stället för en
1. kombinera raderna - det blir en rad med det bästa från båda
1. ibland behöver vi freestyla och skriva om koden för att det ska fungera rätt

I detta fallet väljer vi alternativ 4. Från rad 10:

```html
 1    <!DOCTYPE html>
 2    <html lang="en" dir="ltr">
 3    <head>
 4        <meta charset="utf-8">
 5        <title>Boka lokaler </title>
 6    </head>
 7    <body>
 8        <section>
 9            <h1> Boka konferensrum </h1>
10*A          <p> Sök efter rum: <input type="text" placeholder="Namn" /> </p>
11*Z          <p> <input type="checkbox" /> Behöver projektor </p>
12*Z          <ul>
13*Z              <li> <button>Skatan (8 platser)</button> </li>
14*Z              <li> <button>Bofinken (5 platser)</button> </li>
15*Z              <li> <button>Strutsen (12 platser)</button> </li>
16*Z          </ul>
17        </section>
18    </body>
19    </html>
```

Ett exempel på hur man kan lösa konflikten med strategi 5: vi skriver om rad 10-11, genom att använda koden från båda ändringarna.
```html
10a    <p>
10b        Sök efter rum: <input type="text" placeholder="Namn" />
10c        <input type="checkbox" /> Behöver projektor
10d    </p>
```

### Dags att göra ändringarna

```bash
git merge book-room-feature
# Hoppsan! Git rapporterar en merge-konflikt! Så här ser filen ut:
```

Ann står i sin branch (terminalen är i Anns branch) och hon har gjort en merge med Zekes ändringar. Git markerar konflikten i index.html. Det kommer att dyka upp konfliktmarkörer i filen:

```html
 8        <section>
 9            <h1> Boka konferensrum </h1>
10    <<<<<<< HEAD  (vi står i Anns branch)
11            <p> Sök efter rum: <input type="text" placeholder="Namn" /> </p>
12    =======
13            <p> <input type="checkbox" /> Behöver projektor </p>
14            <ul>
15                <li> <button>Skatan (8 platser)</button> </li>
16                <li> <button>Bofinken (5 platser)</button> </li>
17                <li> <button>Strutsen (12 platser)</button> </li>
18            </ul>
19    >>>>>>> book-room-feature  (hämtat från Zekes branch)
20        </section>
```

### Lösningen

Ann tar bort konfliktmarkörerna från index.html och gör ändringarna. Sedan committar hon och pushar till GitHub.

```html
 8        <section>
 9            <h1> Boka konferensrum </h1>
10            <p> Sök efter rum: <input type="text" placeholder="Namn" /> </p>
11            <p> <input type="checkbox" /> Behöver projektor </p>
12            <ul>
13                <li> <button>Skatan (8 platser)</button> </li>
14                <li> <button>Bofinken (5 platser)</button> </li>
15                <li> <button>Strutsen (12 platser)</button> </li>
16            </ul>
17        </section>
```

```bash
git add index.html
git commit -m "Merge commit (search and book rooms combined)"
git push
```

Nu är konflikten löst!

---

Fortsättning följer i del 4: [Ångra och återställa](git-undo.md)
