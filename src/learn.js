/* ===== Silnik nauki: pula elementow, SRS (Leitner), cwiczenia, mowa, statystyki ===== */

/* Normalizacja greki: usun akcenty/tonos, male litery, znaki interpunkcyjne i nadmiarowe spacje */
export function normalizeGreek(s){
  return String(s||"")
    .normalize("NFD").replace(/[̀-ͯ]/g,"")   /* zdejmij znaki diakrytyczne */
    .toLowerCase()
    .replace(/[.,;!?·:"'()«»…]/g,"")
    .replace(/\s+/g," ")
    .trim();
}

function shuffle(a){
  const r=a.slice();
  for(let i=r.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [r[i],r[j]]=[r[j],r[i]]; }
  return r;
}
function sample(arr,n,exclude){
  const pool=arr.filter(x=>x!==exclude);
  return shuffle(pool).slice(0,n);
}
function now(){ try{ return Date.now(); }catch(e){ return 0; } }
const DAY=86400000;

/* ===== Pula elementow nauki — jedno zrodlo prawdy dla SRS, cwiczen i slownika ===== */
export function buildPool({lessons, categories, commonWordGroups, numbers}){
  const items=[];
  /* Frazy tematyczne A1 (zrodlo dla sekcji "phrases" przez catIds) */
  (categories||[]).forEach(cat=>{
    (cat.phrases||[]).forEach((p,i)=>{
      items.push({id:"p:"+cat.id+":"+i, gr:p.gr, rom:p.rom, pl:p.pl, note:p.note, kind:"phrase", tag:cat.id, level:cat.level||"A1"});
    });
  });
  /* Slownik najczestszych slow */
  (commonWordGroups||[]).forEach((g,gi)=>{
    (g.words||[]).forEach((w,wi)=>{
      items.push({id:"w:"+gi+":"+wi, gr:w.gr, rom:w.rom, pl:w.pl, kind:"word", tag:"top", level:"A1"});
    });
  });
  /* Liczby */
  (numbers||[]).forEach((n,i)=>{
    items.push({id:"n:"+i, gr:n.gr, rom:n.rom, pl:String(n.n), kind:"number", tag:"num", level:"A1"});
  });
  /* Slowa/zwroty wbudowane w lekcje DOWOLNEGO poziomu (sekcje type:"words") */
  (lessons||[]).forEach(les=>{
    (les.sections||[]).forEach((s,si)=>{
      if(s.type==="words"||s.type==="phrases"){
        (s.items||[]).forEach((w,wi)=>{
          items.push({id:"lw:"+les.id+":"+si+":"+wi, gr:w.gr, rom:w.rom, pl:w.pl, note:w.note, kind:(w.gr&&w.gr.indexOf(" ")>0)?"phrase":"word", tag:"l"+les.id, level:les.level||"A1"});
        });
      }
    });
  });
  return items;
}

/* ===== SRS — system Leitnera (6 pudelek) w localStorage ===== */
const BOX_INTERVAL=[0, 1, 2, 4, 9, 21];   /* dni do nastepnej powtorki wg pudelka */
const PROG_KEY="greek-srs";

export function loadProgress(){
  try{ return JSON.parse(localStorage.getItem(PROG_KEY)||"{}"); }catch(e){ return {}; }
}
export function saveProgress(p){
  try{ localStorage.setItem(PROG_KEY, JSON.stringify(p)); }catch(e){}
}
/* Production Gating: do „opanowania" (box>=4) slowo awansuje TYLKO przez
   produkcje (wpisanie / ulozenie zdania). Rozpoznawanie podnosi do box 3
   i podtrzymuje, ale samo nie „graduuje" — wymusza realne przypominanie. */
export function grade(progress, id, correct, productive){
  const p={...progress};
  const st=p[id]||{box:0,reps:0,lapses:0};
  let box=st.box;
  if(correct){
    if(box>=3){ if(productive) box=Math.min(BOX_INTERVAL.length-1, box+1); /* bez produkcji: podtrzymaj */ }
    else box=box+1;
  } else {
    box=Math.max(1, box-1);
  }
  p[id]={ box, reps:(st.reps||0)+1, lapses:(st.lapses||0)+(correct?0:1), due: now()+BOX_INTERVAL[box]*DAY, seen:true };
  return p;
}
export function isProductive(type){ return type==="type-gr" || type==="build"; }
export function isLearned(progress, id){ const st=progress[id]; return !!st && st.box>=4; }
export function countLearned(progress){ return Object.values(progress).filter(st=>st&&st.box>=4).length; }

/* Zbuduj dzisiejsza sesje: zalegle powtorki + nowe elementy, w sensownej kolejnosci */
export function buildSession(items, progress, opts){
  const o=opts||{};
  const maxNew=o.maxNew||8;
  const maxReview=o.maxReview||14;
  const t=now();
  const pool = o.levels ? items.filter(it=>o.levels.indexOf(it.level)>=0) : items;
  const due=[]; const fresh=[];
  pool.forEach(it=>{
    const st=progress[it.id];
    if(!st||!st.seen){ fresh.push(it); }
    else if(st.due<=t){ due.push(it); }
  });
  due.sort((a,b)=>(progress[a.id].due)-(progress[b.id].due));
  const session=due.slice(0,maxReview).concat(fresh.slice(0,maxNew));
  return shuffle(o.limit ? session.slice(0,o.limit) : session);
}
export function dueCount(items, progress, levels){
  const t=now();
  return items.filter(it=>(!levels||levels.indexOf(it.level)>=0) && progress[it.id]&&progress[it.id].seen&&progress[it.id].due<=t).length;
}

/* ===== Generator cwiczen ===== */
export function makeExercise(item, pool, box){
  const b=box||0;
  const words=String(item.gr||"").trim().split(/\s+/);
  const multi=words.length>=3;
  /* Trudnosc rosnie z pudelkiem: nowe slowo = rozpoznawanie (latwiej zakodowac),
     dojrzale = produkcja (zeby „opanowac" trzeba wyprodukowac). */
  let kinds;
  if(b<=0){ kinds=["choose-pl","listen"]; }
  else if(b<3){ kinds=["choose-pl","listen"]; if(item.kind!=="number") kinds.push("choose-gr"); if(item.kind==="phrase"&&multi) kinds.push("cloze"); }
  else { kinds=["type-gr"]; if(item.kind==="phrase"&&multi) kinds.push("build"); }
  const type=kinds[Math.floor(Math.random()*kinds.length)];

  if(type==="choose-pl"||type==="listen"){
    const distract=sample(pool.filter(x=>x.pl&&x.pl!==item.pl), 3).map(x=>x.pl);
    return { type, item, prompt:item.gr, audio:item.gr, options:shuffle([item.pl,...distract]), answer:item.pl, showRom:type!=="listen" };
  }
  if(type==="choose-gr"){
    const distract=sample(pool.filter(x=>x.gr&&x.gr!==item.gr&&x.kind===item.kind), 3).map(x=>x.gr);
    return { type, item, prompt:item.pl, options:shuffle([item.gr,...distract]), answer:item.gr };
  }
  if(type==="type-gr"){
    return { type, item, prompt:item.pl, hint:item.rom, answer:item.gr };
  }
  if(type==="build"){
    return { type, item, prompt:item.pl, tokens:shuffle(words.length>1?words:[item.gr]), answer:item.gr };
  }
  if(type==="cloze"){
    let idx=words.map((w,i)=>[w,i]).filter(([w])=>normalizeGreek(w).length>2);
    const pick=idx.length?idx[Math.floor(Math.random()*idx.length)]:[words[0],0];
    const blankWord=pick[0], bi=pick[1];
    const masked=words.map((w,i)=>i===bi?"_____":w).join(" ");
    const others=[];
    sample(pool.filter(x=>x.gr&&x.gr!==item.gr), 8).forEach(x=>{
      const tw=String(x.gr).split(/\s+/).filter(t=>normalizeGreek(t).length>2);
      if(tw.length) others.push(tw[Math.floor(Math.random()*tw.length)]);
    });
    const distract=[...new Set(others)].filter(w=>normalizeGreek(w)!==normalizeGreek(blankWord)).slice(0,3);
    return { type, item, prompt:item.pl, masked, options:shuffle([blankWord,...distract]), answer:blankWord };
  }
  /* fallback */
  return { type:"choose-pl", item, prompt:item.gr, audio:item.gr, options:shuffle([item.pl,...sample(pool.filter(x=>x.pl!==item.pl),3).map(x=>x.pl)]), answer:item.pl, showRom:true };
}

export function checkAnswer(ex, response){
  if(ex.type==="type-gr"||ex.type==="speak") return normalizeGreek(response)===normalizeGreek(ex.answer);
  if(ex.type==="build") return normalizeGreek((response||[]).join(" "))===normalizeGreek(ex.answer);
  return response===ex.answer;
}

/* ===== Statystyki i seria dni ===== */
const STATS_KEY="greek-stats";
function todayStr(){ try{ return new Date().toISOString().slice(0,10); }catch(e){ return "1970-01-01"; } }
export function loadStats(){
  try{ return JSON.parse(localStorage.getItem(STATS_KEY)||"null") || {streak:0,lastDay:null,totalReviews:0,totalCorrect:0,history:{}}; }
  catch(e){ return {streak:0,lastDay:null,totalReviews:0,totalCorrect:0,history:{}}; }
}
function dayOffset(n){ try{ const d=new Date(); d.setDate(d.getDate()+n); return d.toISOString().slice(0,10); }catch(e){ return null; } }
function isoWeek(){ try{ const d=new Date(); const oj=new Date(d.getFullYear(),0,1); const w=Math.ceil((((d-oj)/86400000)+oj.getDay()+1)/7); return d.getFullYear()+"-W"+w; }catch(e){ return ""; } }
export function recordSession(reviewed, correct){
  const s=loadStats();
  const today=todayStr();
  if(s.lastDay!==today){
    const yest=dayOffset(-1), prev=dayOffset(-2), week=isoWeek();
    if(s.lastDay===yest){ s.streak=(s.streak||0)+1; }
    else if(s.lastDay===prev && s.restWeek!==week){ s.streak=(s.streak||0)+1; s.restWeek=week; }  /* dzien odpoczynku: 1 opuszczony dzien/tydzien wybaczony */
    else { s.streak=1; }
    s.lastDay=today;
  }
  s.totalReviews=(s.totalReviews||0)+reviewed;
  s.totalCorrect=(s.totalCorrect||0)+correct;
  s.history=s.history||{};
  s.history[today]=(s.history[today]||0)+reviewed;
  try{ localStorage.setItem(STATS_KEY, JSON.stringify(s)); }catch(e){}
  return s;
}
/* Rozmiar sesji wg dziennego celu uzytkownika (minuty) */
export function sessionOpts(min){
  const m=min||10;
  if(m<=5) return {maxNew:4, maxReview:8};
  if(m>=15) return {maxNew:12, maxReview:20};
  return {maxNew:8, maxReview:14};
}
/* Miernik „ile rozumiem": ile z najczestszych slow (tag „top") jest juz
   rozpoznawanych (box >= 3) */
export function comprehension(pool, progress){
  const top=(pool||[]).filter(it=>it.tag==="top");
  const known=top.filter(it=>{ const st=progress[it.id]; return st && st.box>=3; }).length;
  return {known, total:top.length};
}

/* ===== Rozpoznawanie mowy (Web Speech API) ===== */
export function getRecognizer(){
  let Ctor=null;
  try{ Ctor=window.SpeechRecognition||window.webkitSpeechRecognition||null; }catch(e){}
  if(!Ctor) return { supported:false, listen(){}, };
  return {
    supported:true,
    listen({onResult,onError,onEnd}){
      try{
        const rec=new Ctor();
        rec.lang="el-GR"; rec.interimResults=false; rec.maxAlternatives=3;
        rec.onresult=(e)=>{ const alts=[]; for(let i=0;i<e.results[0].length;i++) alts.push(e.results[0][i].transcript); onResult&&onResult(alts); };
        rec.onerror=(e)=>{ onError&&onError(e.error||"error"); };
        rec.onend=()=>{ onEnd&&onEnd(); };
        rec.start();
        return rec;
      }catch(e){ onError&&onError("start-failed"); return null; }
    },
  };
}
