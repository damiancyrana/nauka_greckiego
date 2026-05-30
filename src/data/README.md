# Dane kursu — jak dodać kolejny poziom (B1, B2, …)

Cała treść kursu mieszka tutaj. Logika (`../learn.js`, komponenty w `../main.jsx`)
jest od niej **niezależna** i steruje się rejestrem `levels.js`.

## Dodanie nowego poziomu — 2 kroki

1. **Utwórz plik danych**, np. `b1.js`:
   ```js
   export const b1Lessons = [ /* lekcje wg schematu poniżej */ ];
   // opcjonalnie:
   export const b1Dialogues = [ /* … */ ];
   export const b1Readers   = [ /* … */ ];
   ```

2. **Zarejestruj go w `levels.js`** — jeden import + jeden wpis w `LEVELS`:
   ```js
   import { b1Lessons, b1Dialogues, b1Readers } from "./b1.js";
   // …
   export const LEVELS = [
     { id:"A1", label:"Kurs A1 — podstawy",        lessons:a1Lessons },
     { id:"A2", label:"Rozdzial A2 — rozwiniecie", lessons:a2Lessons, dialogues:a2Dialogues, readers:a2Readers },
     { id:"B1", label:"Rozdzial B1", lessons:b1Lessons, dialogues:b1Dialogues, readers:b1Readers },
   ];
   ```

To wszystko. Ekran główny pokaże nową, zwijaną sekcję; pula SRS, ćwiczenia,
słownik, dialogi, czytanki i routing podłączą się automatycznie. `id` lekcji
muszą być **unikalne w całym kursie** (np. B1 zaczyna od 23 w górę).

## Pliki

- `shared.js` — wspólne: `alphabet`, `digraphs`, `numbers`, `readingLevels`, `commonWordGroups` (słownik 400+).
- `a1.js` — `categories` (frazy tematyczne A1) + `a1Lessons` (0–14, w tym 2 bonusowe).
- `a2.js` — `a2Lessons` (15–22) + `a2Dialogues` + `a2Readers`.
- `levels.js` — rejestr; eksportuje `LEVELS`, `allLessons`, `dialogues`, `readers` + reeksport wspólnych.

## Schemat lekcji

```js
{ id, emoji, title, desc, bonus?, adult?, sections:[
  { type:"text",    title, body },
  { type:"grammar", title, rule? , table?:{head:[],rows:[[]]} , note? },  // grecka komórka → auto 🔊 + lang="el"
  { type:"words",   title, items:[{gr,rom,pl,note?}] },   // trafia do puli SRS
  { type:"phrases", title, catIds:[...] },                // frazy z `categories` (A1)
  { type:"letters" },                                     // alfabet (poziom 0)
  { type:"numbers" },                                     // siatka liczb
  { type:"reading", level:<indeks w readingLevels> },     // czytanka sylabowa
] }
```

Dialog: `{ id, emoji, title, desc, lines:[{who:"A"|"B",gr,rom,pl}], roleplay?:[{prompt,options,answer}] }`
Czytanka: `{ id, emoji, title, desc, text:[{gr,rom,pl}], questions:[{q,options,answer}] }`
