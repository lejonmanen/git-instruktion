[Innehåll](README.md)

*Uppdaterad april 2025*

1. [TL;DR](#tldr)
1. [Exempel på frågor du kan ställa till en AI](#exempel-på-frågor-du-kan-ställa-till-en-ai)
1. [Tänk långsiktigt](#tänk-långsiktigt)
1. [ChatGPT](#chatgpt)
1. [GitHub Copilot](#github-copilot)
1. [Tips till lärare](#tips-till-lärare)

---

# AI
Från och med att ChatGPT släpptes i november 2022 har vi tillgång till en oerhört kraftfull gratis assistent. Sedan dess har det kommit många andra LLMs (large language model) som har ungefär samma funktionalitet.

Idag (VT 2025) ser vi att AI integreras i fler och fler appar.

AI är ett arbetsredskap som du kommer behöva lära dig att använda på bästa sätt. Se AI som en *entusiastisk assistent*, som vill hjälpa till, men inte alltid är så noga med vad som är sant.

## TL;DR
För dig som är yh-student:

**Använd AI för att:**

| |Syfte |Exempel |
|-|-|-|
|1|Få särskilt krånglig kod förklarad för dig |Förklara vad som händer i den här koden: ...|
|2|Få förslag på lämpliga övningar på det du jobbar med |Ge mig 5 övningar på variabler och loopar|
|3|Förklara felmeddelanden |När jag försöker köra följande kod får jag ett felmeddelande. Vad beror det på? |
|4|Göra texten lättare att läsa |Skriv om följande text så att den blir lättare att läsa: ... |
|5|Skapa realistisk testdata |Ge mig 10 JavaScript-objekt som representerar användare. Varje objekt ska ha egenskaperna id, namn och epost. |
|6|Hitta fel i koden |Finns det något i följande kod som jag kan förbättra? |
|7|Lösa specifika problem |Jag behöver sortera en lista med strängar. Förklara hur jag kan göra, men ge mig inte hela lösningen direkt. |
|8|Sammanfatta längre texter |Jag försöker lära mig funktioner och läste detta online. Sammanfatta följande text i punktform: ... |


**Se upp med:**

1. Försök alltid själv innan du använder AI
1. Be aldrig om färdiga lösningar - då lär du dig inte själv
1. Se AI som en hjälpsam assistent, som dock ofta hittar på saker
1. Tillämpa källkritik - kontrollera alltid det som en AI genererat
1. AI kan föreslå en lösning som tycks fungera, men som använder föråldrad teknik

*Tips: när du arbetar med en uppgift, skriv ner vilka frågor du använder dig av. Då kan du be läraren om feedback på hur bra dina frågor är.*

---
## Exempel på frågor du kan ställa till en AI
AI-verktygen är utvecklade för att förstå *naturligt språk*. Du kan alltså skriva frågor till dem, precis som du hade chattat med en människa.

1. "Förklara följande kod för mig" (klistra in några rader kod)
	+ Du kan fortsätta med att ställa följdfrågor: "Ännu enklare tack"

1. "Förklara CSS flexbox för mig"
1. "Ge mig några övningar på loopar i JavaScript"
	+ "Föreslå något jag kan bygga som ett eget projekt, för att lära mig mer om loopar i JavaScript. Projektet ska innehålla CSS transitions och HTML-elementet &lt;dialog&gt;"
1. "Snygga till följande text" / "Skriv om texten så att den blir lättare att läsa och rätta eventuella stavfel"
1. "Finns det några fel i den här koden?" (klistra in några rader)
1. "När jag kör följande kod får jag felet TypeError och något med null, vad beror det på?" (ännu bättre om du klistrar in det exakta felmeddelandet)
1. "Jag försöker vända på en lista i JavaScript, men vet inte hur jag ska börja. Kan du ge mig tips så att jag kommer igång? Jag vill inte ha hela lösningen."
1. "Ge mig en lista med 10 JavaScript-objekt som motsvarar fotbollsspelare. Varje objekt ska ha egenskaperna playerName, age och teamName."
1. "Kan du sammanfatta den här långa texten?" (klistra in)

*Men kom ihåg att AI kan hallucinera. (Hallucinationer är när en AI hittar på något som inte är sant.) Kontrollera alltid att svaret/förslaget du får är rimligt!*

### Föra dialog
Om första frågan inte ger dig det du behöver, kan du fortsätta föra en dialog med AI. Exempel på hur du kan fortsätta fråga för att få mer och mer specifika svar:

> "Hjälp mig göra en loop"
>
> "Kan du svara med JavaScript-kod"
>
> "Nej, jag menar en for-loop, inte while"
>
> "Loopen ska upprepa 10 gånger"
>
> "Förklara varför index börjar på 0 i loopen"


---

## Tänk långsiktigt
När man använder en AI för att **skapa hela lösningar**, i stället för **hjälp att själv lösa problem**, så tar man en kortsiktig genväg. AI kan hjälpa dig att klara enskilda kurser.

Men syftet med en YH-utbildning är att du ska lära dig en profession - ett hantverk. För att du ska kunna arbeta med det efter utbildningen räcker det inte med att klara en kurs. Du måste **förstå och lära dig ämnet**.

---


## ChatGPT
ChatGPT är en språkmodell (large language model) som använder naturligt språk. Den baserar sig på statistik. Baserat på orden i din fråga, kommer den att slumpa ord som svar, ett i taget, baserat på vad som är mest sannolikt. (något förenklat)

ChatGPT har indexerat (läst) större delen av det öppna internet och använder det för att kunna beräkna sannolikheterna. Detta innebär bland annat att:

+ Det som förekommer ofta på webben har större chans att dyka upp i svaren
+ Man får bättre svar när det gäller tekniker som fler använder, eftersom det finns mer skrivet kring dem - dvs mest användbart i inledande YH-kurser
+ Svar som använder gamla, inaktuella tekniker kan dyka upp
+ Texter från inloggningsskyddade webbsidor har inte indexerats
+ Ny information kanske inte hunnit indexeras än

Det finns goda möjligheter att få hjälp av AI i början av en utbildning. Men använd detta för att *lära dig själv* att lösa problem. Annars kommer du att få problem i mer avancerade kurser, när AI inte är lika bra på att hjälpa till.


---

## GitHub Copilot
Genom att indexera (läsa) all kod som laddats upp på GitHub i publika repositories, har Microsoft skapat en AI-tjänst till Visual Studio Code. Medan du skriver kan AI föreslå hur slutet på raden borde bli, baserat på koden du tidigare skrivit och hur liknande kod brukar se ut på GitHub.

Detta verktyg är bäst för mer erfarna utvecklare. Risken finns att du blir distraherad eller för beroende av Copilot för att lösa uppgifter.
