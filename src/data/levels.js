/* ===== Rejestr poziomow jezykowych =====
   Aby dodac kolejny poziom (np. B1):
   1) utworz src/data/b1.js z `export const b1Lessons = [...]`
      (opcjonalnie b1Dialogues, b1Readers) wg tego samego schematu lekcji co a2.js,
   2) zaimportuj go tutaj i dodaj JEDEN wpis do tablicy LEVELS ponizej.
   Reszta (pula SRS, generator cwiczen, ekran glowny, routing, slownik) podlaczy sie sama.

   Schemat lekcji (sekcje):
   { id, emoji, title, desc, bonus?, adult?, sections:[
     { type:"text",    title, body }
     { type:"grammar", title, rule? , table?:{head:[],rows:[[]]} , speakCol?, note? }   // grecka komorka = auto audio+lang
     { type:"words",   title, items:[{gr,rom,pl,note?}] }      // trafiaja do puli SRS
     { type:"phrases", title, catIds:[...] }                   // frazy z `categories` (A1)
     { type:"letters" }                                        // alfabet (poziom 0)
     { type:"numbers" }                                        // siatka liczb
     { type:"reading", level: <indeks w readingLevels> }       // czytanka
   ] }
*/
import { a1Lessons, categories } from "./a1.js";
import { a2Lessons, a2Dialogues, a2Readers } from "./a2.js";
import { b1Lessons, b1Dialogues, b1Readers } from "./b1.js";

export { categories };
export { alphabet, digraphs, numbers, readingLevels, commonWordGroups } from "./shared.js";

export const LEVELS = [
  { id:"A1", label:"Kurs A1 — podstawy",        lessons:a1Lessons },
  { id:"A2", label:"Rozdzial A2 — rozwiniecie", lessons:a2Lessons, dialogues:a2Dialogues, readers:a2Readers },
  { id:"B1", label:"Rozdzial B1 — samodzielnosc", lessons:b1Lessons, dialogues:b1Dialogues, readers:b1Readers },
];

/* Wszystkie lekcje z naniesionym znacznikiem poziomu (level) */
export const allLessons = LEVELS.flatMap(L => L.lessons.map(les => les.level ? les : { ...les, level: L.id }));
export const dialogues  = LEVELS.flatMap(L => L.dialogues || []);
export const readers    = LEVELS.flatMap(L => L.readers   || []);
