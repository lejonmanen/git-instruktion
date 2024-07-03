[Innehåll](../README.md)

*Uppdaterad juli 2024*

1. [Vad är bra kod?](#vad-är-bra-kod)

*Den här artikeln bygger vidare på [Att skriva bra kod](write-good-code#att-skriva-bra-kod).*

---

## Sammanfattning

1. Använd bra namn
1. Undvik att upprepa kod
1. Indentera rätt
1. Se upp med plural-s (arrayer och enskilda värden)
1. Håll det enkelt

---

# Nästa steg
## Vad är bra kod?

**Clean Code** är en bok från 2009, som handlar om att skriva bra kod. Boken omfattar många mer eller mindre avancerade koncept. Sedan den publicerades har utvecklingen gått framåt, och allt som presenteras är inte relevant. Här följer ett urval av de viktigaste principerna för den som håller på att lära sig programmering.

För att få maximal nytta av den här artikeln bör du vara bekant med *variabler*, *funktioner* och *loopar*.

---

## Block och indentering
Så fort koden börjar ett nytt block, ska innehållet indenteras. Alltså skjutas längre bort från vänsterkanten i din kodeditor. Använd Tab-tangenten en gång för att indentera. Tryck Shift-Tab för att ångra en indentering. Det finns plugin till VS Code (Prettier) som kan sköta det åt dig.

```js
if( x === 1) {
// Denna kodrad är inte indenterad alls
if( y === 2 ) {
// Inte denna heller
}
}  // Ingen indentering - svårt att se vilket block den här högerparentesen hör till!
```

```js
if( x === 1) {
    // Korrekt indenterad, tydligt att koden är inuti if-satsen
    if( y === 2 ) {
        // Tydligt att koden är inuti andra if-satsen
    }
}  // Lätt att se att denna hör ihop med första if-satsen
```

Ställ in din kodeditor så att du har rätt indentering! [VS Code: rekommenderade inställningar](vscode-settings.md#indent)

Läs mer: [Indentation is a code smell](https://blog.marcpicaud.dev/indentation-is-a-code-smell/)

*Obs! När du jobbar i ett team är det viktigt att alla i teamet har samma inställning på indentering. Annars kommer det uppstå commits där enda skillnaden är vilken indentering som används.*

---

## Bra namn
Ansträng dig för att hitta på bra namn på dina variabler och funktioner. Bra namn är:

1. **Meningsfulla**
1. **Beskriver syftet**
1. **Lätta att läsa och uttala**
1. **Självdokumenterande**
1. **Lagom långa**
1. **Luras inte**

<details>
<summary> Förklaring </summary>

**Meningsfulla** namn betyder något. Ett variabelnamn ska vara "fullt av mening" som beskriver vad dess värde representerar.

**Beskriver syftet** gör ett namn om man förstår hur värdet ska användas.

**Lätta att läsa** behöver namnen alltid vara, eftersom den mesta tiden går åt till att läsa kod, inte skriva den.

**Lätta att uttala** behöver namnen vara så fort man ska diskutera dem med någon annan. Se [Rubber Duck Debugging](https://sv.wikipedia.org/wiki/Fels%C3%B6kning_i_kod_med_hj%C3%A4lp_av_gummianka).

**Självdokumenterande** namn minskar behovet av kommentarer.

**Lagom långa** - undvik förkortningar. Skriv ut hela ord och var inte rädd för att ha lite längre namn.

```js
let variable = 5;          // Dåligt! Meningsfulla namn säger något om sitt innehåll
let value = 5;             // Dåligt! Meningslöst namn
let maximumAgeYears = 5;   // Bra!

let chosenOption;          // Dåligt! Vad är det man väljer mellan?
let chosenTransportation;  // Bra! Vi förstår att alternativen representerar färdmedel

let inconspicuousAggregator;  // Blä! Svårt att läsa. Försök hitta enklare ord.
let usrMgmt;          // Dåligt! Svårt att uttala. Förkortningar är sällan bra.
let userManagement;   // Bra! Lätt att läsa och uttala.


// Detta är användarens hemadress
let address;         // Kommentaren är nödvändig, eftersom namnet på variabeln är vagt.

// Detta är användarens adress
let homeAddress;     // Bättre namn, kommentaren behöver inte säga lika mycket

let userHomeAddress; // Namnet är självdokumenterande, kommentar behövs inte


let hamster = getHamsters()
// Funktionen säger att den hämtar FLERA hamstrar (lägg märke till plural-s)
// Men variabeln säger att den innehåller EN hamster
// Kommer variabeln att innehålla en array eller ett enskilt värde?
```
</details>

---

## Code smell

Ibland har man en känsla av att koden inte är bra, men det kan vara svårt att sätta fingret på vad som är problemet. Några exempel:

1. Duplicerad kod
1. Mystiska namn
1. För korta eller för långa namn
1. Lång funktion
1. Onödig komplexitet
1. För lång kodrad
1. Callback hell

<details>
<summary> Förklaring </summary>

Så fort **samma kod förekommer på minst två ställen** bör du överväga att antingen införa en variabel, en loop eller en funktion.

En mycket vanlig bug är att ändra ett värde, men glömma att ändra det på alla ställen det förekommer. Undvik det genom att använda en variabel. Då ändrar du värdet på bara ett ställe.


```js
let score = 5
...
if( correctAnswer ) { score += 5 }
// Värden som dyker upp utan någon förklaring på det här sättet kallas "magic numbers" eller "magic strings". Undvik!

const correctAnswerPoints = 5
let score = correctAnswerPoints
...
if( correctAnswer ) { score += correctAnswerPoints }
// En bonus är att variabeln är självdokumenterande och hjälper till att förklara vad som händer i koden.
```

Namn ska som sagt vara självdokumenterande. **Mystiska eller svårbegripliga namn** är ett tecken på att koden är svår att förstå.

**Hur lång en funktion bör vara** varierar mellan olika programmeringsspråk och beror på vem man frågar. En funktion som är så lång att du inte kan *se hela på skärmen utan att scrolla* är definitivt för lång. (En del menar att en funktion bör vara högst 5 rader.) När en funktion blir för lång, refaktorera koden och dela upp den i flera funktioner.

Gör inte koden komplicerad i onödan. Börja med den enklast möjliga lösningen. Fungerar inte den, så kan du försöka med en mera avancerad.

**Callback hell** är vanligt i JavaScript. Det uppstår när man är tvungen att indentera flera gånger. Undvik det genom att skriva om koden. Att använda async-await kan också underlätta.

![https://blog.devgenius.io/javascript-promise-chaining-avoid-callback-hell-6e04818d4464](https://miro.medium.com/max/720/1*uLjTm9CLmmITQC233T-KzA.gif)
</details>

---

```js
// Kan du skriva om detta så att koden blir enklare?
if( condition1 ) {
	if( condition2 ) {
		if( condition3 ) {
			// Do stuff
		} else {
			return
		}
	} else {
		return
	}
} else {
	return
}

```
<details>
<summary>Bättre kod</summary>

```js
// Bättre kod
if( !condition1 ) {
	return
}
if( !condition2 ) {
	return
}
if( !condition3 ) {
	return
}
// Do stuff
```
</details>

---

## Allmänna principer
1. **DRY** = **D**on't **R**epeat **Y**ourself. Använd variabler och funktioner för att undvika att göra samma sak två gånger.

2. **KISS** = **K**eep **I**t **S**imple **S**tupid. Ansträng dig för att hålla koden så enkel som möjligt. Enklare är alltid bättre.

3. **Lämna koden i bättre skick än du hittade den.** Om du går tillbaka in i en kod där du inte varit på ett tag, lägg lite extra tid på att städa i den.

4. **Leta alltid efter grundorsaken.** Försök att hitta anledningen till att en bug inträffar och åtgärda den. Annars kommer den ofta tillbaka senare i utvecklingen.

