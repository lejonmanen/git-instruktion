[Innehåll](../README.md)

*Uppdaterad HT 2025*

1. [TL;DR](#tldr)
1. [Windows](#windows)
1. [MacOS](#macos)
1. [on](#n)

---

# TL;DR
Lägg dina Windows-projekt i mappar under:
```
C:\skola\frontend\kursnamn\
```

Lägg dina MacOS-projekt i mappar under:
```
/Users/DittAnvändarnamn/skola/frontend/kursnamn
```

Undvik mellanslag och specialtecken i mappnamnen.



# Windows
När du ska skapa ett nytt programmeringsprojekt på en Windows-dator finns det några saker som är viktiga att tänka på.

+ Rotmappen i ett Windows-system heter `C:\`
+ Operativsystemet ligger i en mapp med sökvägen `C:\Windows`
+ Varje användare får en egen mapp med inställningar och filer: `C:\Users\DittAnvändarnamn`
+ När du laddar ner filer hamnar de i mappen `Downloads` (standard för webbläsare)


## OneDrive
Microsofts molntjänst OneDrive kommer förinstallerat på Windows-datorer. Syftet med den är att du ska kunna dela filer mellan flera datorer, när du är inloggad med samma användare. OneDrive ligger och väntar på att du ska ändra på någon av filerna i vissa mappar - och laddar sedan upp dem till molnet.

+ Dokument
+ Bilder
+ Skrivbord
+ m.fl.

OneDrive är byggt för att synka ändringar t.ex. när vi skriver i en fil och sparar då och då.


## npm och Vite
De flesta frontendprojekt använder `npm` för att ladda ner kodpaket. npm lägger dessa i mappen `node_modules` inuti projektmappen. Den mappen innehåller ofta tusentals små filer.

`Vite` används för att komma igång med ett standardprojekt och få en utvecklingsserver. Servern kan visa våra filändringar i webbläsaren i realtid. Men detta gör många små ändringar i filer.

Både npm och Vite beter sig på ett sätt som går på tvärs med hur OneDrive är byggt. Detta gör att OneDrive ofta orsakar problem om man har sina kodprojekt i en OneDrive-mapp.

## Se upp!
Undvik till varje pris att lägga dina kodprojekt
+ direkt på skrivbordet
+ i mappen Downloads
+ i mappen Document

---


# MacOS
MacOS har molntjänsten `iCloud` som automatiskt synkar mapparna
+ Skrivbord
+ Dokument

Precis som för Windows, av samma anledning, gäller det att lägga sina kodprojekt i en mapp som inte iCloud synkar. Så här:

```
/Users/DittAnvändarnamn/skola/frontend/kursnamn
```

Tips: sökvägen `~/` är en genväg till `/Users/användarnamn/`

---


[Till toppen av sidan](#tldr)
