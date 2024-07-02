[Innehåll](../README.md)

*Uppdaterad juli 2024*

1. [Variabler](#variabler)
1. [Datatyper](#datatyper)
1. [Typomvandling](#typomvandling)
1. [Flödeskontroll och syntax](#flödeskontroll-och-syntax)
1. [DOM-manipulation](#dom-manipulation)
1. [API och asynkron kod](#api-och-asynkron-kod)

---

# JavaScript översikt

JavaScript har av historiska skäl flera olika sätt att göra det mesta. De flesta guider till JavaScript går igenom flera. Den här guiden väljer att visa ett sätt - det som är modern kod och i förekommande fall best practice. Som JavaScript-utvecklare kommer du så småningom att behöva lära dig mera, men du kan få en enklare start om du börjar med detta.

Den här guiden förklarar inte. Prova att googla eller fråga en AI:
> Förklara den här koden för mig: (klistra in din kod)

---

### Variabler
```js
const x = 1
let y = 2
```

### Datatyper
| Namn          | Falsy   | Truthy    |
|---------------|---------|-----------|
|**number**     |`0, NaN` |Alla andra |
|**string**     |`''`     |Alla andra |
|**boolean**    |`false`  |`true`     |
|**null**       |Ja       |           |
|**undefined**  |Ja       |           |
|**object**     |         |Ja         |
|**Symbol**     |         |Ja         |
|**BigInt**     |`0n`     |Alla andra |

### Typomvandling
Vanliga typomvandlingar:  ``` x OP y ``` <br>
Använd `typeof` för att kontrollera datatyp och `isNaN(x)` för att kontrollera om ett `number` är `NaN`.

|typeof x |typeof y |OP | typeof (x+y) |
|---------|---------|---|--------------|
|any      |any      |`- * / %` |number |
|number   |number   |`+`|number        |
|any      |any      |`+`|string        |

### Flödeskontroll och syntax
```js
if( villkor ) {
    // if-block
} else {
    // else-block
}

for( let i=0; i<n; i++ ) {
    // upprepa n gånger
}

function fun(x) {
    return x + 1
}
const arrow1 = x => x + 1
const arrow2 = (x, y) => {
    return x + y
}

let conditional = x ? 'x är truthy' : 'x är falsy'
let optionalChaining = x?.y

let arrayCopy = [ ...array ]
let objectCopy = { ...obj }

let mappedValues = array.map(item => item.value)
let filteredItems = array.filter(item => item.x === y)
let firstItem     = array.find(  item => item.x === y)
array.forEach(item => {
    console.log(item)  // do something
})
```

### DOM-manipulation
```html
<!-- HTML: script-länk i head -->
<script type="module" src="./script.js"></script>
```
MDN: [document](https://developer.mozilla.org/en-US/docs/Web/API/Document), [element](https://developer.mozilla.org/en-US/docs/Web/API/Element)

```js
// "vanilla" JavaScript
document.
    querySelector(selektor)
    querySelectorAll(selektor)
    createElement(tagName)

element.
    innerText = 'hello'
    classList.
        add(classname)
        remove(classname)
        toggle(classname)
    addEventListener(eventName, callback)
    append(newElement)
    before(newElement)
    after(newElement)
    remove()


inputElement.
    value = 'exempel'
    disabled = true
    checked = true
```
Vanliga events: click, change, keyDown och blur.

### API och asynkron kod
```js
async getData() {
    try {
        // kom ihåg att läsa API-dokumentationen
        const response = await fetch(url, options)
        const const data = await response.json()
        return data
    } catch(error) {
        // handle error
        console.log(error.message)
    }
}
```

[Upp till toppen](#javascript-översikt)
