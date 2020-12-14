[Innehåll](README.md)

# Git

## Konfliktlösning - merge

### Status just nu
*Tabell över ändringar som gjorts i två olika branches:*

|Anns branch    |Zekes branch   |Resultat  |
|---------------|---------------|----------|
|script.js      |               |script.js |
|               |book.css       |book.css  |
|index.html (1) |index.html (2) |**MERGE** |

Git försöker lösa alla sammanslagningar automatiskt. Men det är inte alltid det lyckas.

Filerna `script.js` och `book.css` löser git självt.

Men eftersom Ann och Zeke har gjort ändringar i samma fil, `index.html`, så behöver Git vår hjälp!

(Fortsättning följer)
