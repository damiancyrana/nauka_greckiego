import { useState, useEffect, useRef } from "react";
import { Volume2, Moon, Sun, ChevronLeft, ChevronRight, Check, Lock, Mic, BarChart3, MessageCircle, BookOpen, Flame, RotateCcw, Gauge, Square, Turtle } from "lucide-react";
import { LEVELS, allLessons, dialogues, readers, categories, commonWordGroups, numbers, alphabet, digraphs, readingLevels } from "./data/levels.js";
import { buildPool, buildSession, makeExercise, checkAnswer, loadProgress, saveProgress, grade, loadStats, recordSession, dueCount, countLearned, getRecognizer, normalizeGreek } from "./learn.js";

/* Romanizacja: akcentowane samogloski na czerwono (znacznik akcentu/wymowy) */
const acMap = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
function R({t}){
  if(!t)return null;
  const parts=[];let buf='',k=0;
  for(const ch of String(t)){
    if(acMap[ch]){if(buf){parts.push(buf);buf='';}parts.push(<span key={k++} style={{color:'#dc2626',fontWeight:700}}>{acMap[ch]}</span>);}
    else{buf+=ch;}
  }
  if(buf)parts.push(buf);
  return <>{parts}</>;
}


/* ===== AUDIO: Web Speech API (el-GR) ===== */
let _elVoice = null;
/* preferuj zenski grecki glos (np. Apple „Melina"), unikaj znanych meskich */
const _FEMALE = /melina|female|woman|γυναίκα|athina|αθηνά|maria|μαρία|eleni|ελένη|despina|δέσποινα|google/i;
const _MALE = /\bmale\b|stefanos|στέφανος|nikos|νίκος|giorgos|γιώργος|dimitris|δημήτρης/i;
function pickVoice(){
  try{
    if(!window.speechSynthesis) return null;
    const vs = window.speechSynthesis.getVoices() || [];
    const el = vs.filter(v=>v.lang && v.lang.toLowerCase().indexOf("el")===0);
    if(!el.length) return null;
    return el.find(v=>_FEMALE.test(v.name)) || el.find(v=>!_MALE.test(v.name)) || el[0];
  }catch(e){ return null; }
}

/* tempo „zwyklego" odtwarzania — suwak, domyslnie wolne, zapisywane w localStorage */
function clampRate(r){ return Math.min(1.2, Math.max(0.5, r)); }
function loadRate(){
  try{ const r=parseFloat(localStorage.getItem("greek-rate")); return isNaN(r) ? 0.7 : clampRate(r); }
  catch(e){ return 0.7; }
}
let _rate = loadRate();
function setRate(r){ _rate=clampRate(r); try{ localStorage.setItem("greek-rate", String(_rate)); }catch(e){} }
const SLOW_RATE = 0.5;   /* staly „wolny" tryb dla przycisku 🐢 */

function speak(text, rate, onend){
  try{
    const synth = window.speechSynthesis;
    if(!synth || !text) return;
    const u = new SpeechSynthesisUtterance(String(text));
    u.lang = "el-GR";
    if(!_elVoice) _elVoice = pickVoice();
    if(_elVoice) u.voice = _elVoice;
    u.rate = rate || _rate;
    u.pitch = 1;
    if(onend){ u.onend = onend; u.onerror = onend; }
    const go = ()=>{ try{ synth.resume(); synth.speak(u); }catch(e){} };
    /* Chrome po cancel() w tym samym takcie gubi ustawienia nowej wypowiedzi
       (m.in. tempo). Gdy cos gra — anuluj i odpal z malym opoznieniem, by
       nowa predkosc zostala faktycznie zastosowana. */
    if(synth.speaking || synth.pending){ synth.cancel(); setTimeout(go, 90); }
    else { go(); }
  }catch(e){}
}
function stopSpeak(){ try{ window.speechSynthesis.cancel(); }catch(e){} }

/* Para przyciskow audio przy KAZDEJ frazie: zwykle (▶/⏹) + wolne (🐢/⏹) */
function Speak({text, size}){
  const [mode,setMode]=useState(null);   /* null | "n" (normalnie) | "s" (wolno) */
  const tok = useRef(0);
  const s = size || 18;
  const play=(m, rate)=>{
    if(mode===m){ stopSpeak(); setMode(null); return; }
    const id = ++tok.current;
    setMode(m);
    speak(text, rate, ()=>{ if(tok.current===id) setMode(null); });
  };
  return <span className="audio-grp" onClick={(e)=>e.stopPropagation()}>
    <button className="spk" aria-label={mode==="n"?"Zatrzymaj":"Posluchaj"} title="Posluchaj"
      onClick={(e)=>{e.stopPropagation();play("n", _rate);}}>
      {mode==="n" ? <Square size={s-4} strokeWidth={2.5}/> : <Volume2 size={s} strokeWidth={2}/>}
    </button>
    <button className="spk spk-slow" aria-label={mode==="s"?"Zatrzymaj":"Posluchaj wolniej"} title="Wolniej"
      onClick={(e)=>{e.stopPropagation();play("s", SLOW_RATE);}}>
      {mode==="s" ? <Square size={s-5} strokeWidth={2.5}/> : <Turtle size={s-1} strokeWidth={2}/>}
    </button>
  </span>;
}

/* Suwak globalnego tempa zwyklego odtwarzania */
function SpeedControl(){
  const [r,setR]=useState(_rate);
  const onChange=(e)=>{ const v=parseFloat(e.target.value); setRate(v); setR(v); };
  return <label className="speed-ctl" title="Tempo zwyklego odtwarzania" onClick={(e)=>e.stopPropagation()}>
    <Gauge size={14}/>
    <input type="range" min="0.5" max="1.2" step="0.05" value={r} onChange={onChange} aria-label="Tempo wymowy"/>
    <span className="speed-val">{r.toFixed(2)}×</span>
  </label>;
}

/* ===== Karta z odkrywaniem tlumaczenia ===== */
function RevealCard({gr,rom,pl,note}){
  const [open,setOpen]=useState(false);
  const toggle=()=>setOpen(o=>!o);
  return <div className={"vc"+(open?" rev":"")} role="button" tabIndex={0} aria-pressed={open}
    onClick={toggle}
    onKeyDown={(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();toggle();}}}>
    <div className="vc-top">
      <div className="vg" lang="el">{gr}</div>
      <Speak text={gr}/>
    </div>
    <div className="vr"><R t={rom}/></div>
    {open
      ? <><div className="vp">{pl}</div>{note&&<span className="vnote">{note}</span>}</>
      : <div className="vh">▸ pokaz tlumaczenie</div>}
  </div>;
}

function CardList({s}){
  const items = s.type==="words"
    ? s.items
    : s.catIds.flatMap(cid=>{const c=categories.find(x=>x.id===cid);return c?c.phrases:[];});
  return <div className="vlist">{items.map((p,i)=><RevealCard key={i} gr={p.gr} rom={p.rom} pl={p.pl} note={p.note}/>)}</div>;
}

function GrammarBlock({s}){
  return <div className="gbox">
    {s.rule && <p className="grule">{s.rule}</p>}
    {s.table && <div className="overflow-x"><table className="gt">
      <thead><tr>{s.table.head.map((h,i)=><th key={i}>{h}</th>)}</tr></thead>
      <tbody>{s.table.rows.map((r,ri)=>(
        <tr key={ri}>{r.map((c,ci)=>(
          /[Ͱ-Ͽ]/.test(c)
            ? <td key={ci} className="gt-greek"><span lang="el">{c}</span> <Speak text={c} size={14}/></td>
            : <td key={ci}><R t={c}/></td>
        ))}</tr>
      ))}</tbody>
    </table></div>}
    {s.note && <p className="gnote" lang="el">{s.note}</p>}
  </div>;
}

function LettersBlock(){
  const [flipped,setFlipped]=useState({});
  const [showDi,setShowDi]=useState(false);
  const flip=(i)=>setFlipped(p=>({...p,[i]:!p[i]}));
  return <div>
    <div className="alpha-grid">{alphabet.map((l,i)=>(
      <div key={i} className={"ac"+(flipped[i]?" fl":"")} role="button" tabIndex={0} aria-pressed={!!flipped[i]}
        onClick={()=>flip(i)}
        onKeyDown={(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();flip(i);}}}>
        {!flipped[i]
          ? <>
              <div className="al"><span className="au" lang="el">{l.upper}</span><span className="alo" lang="el">{l.lower}</span></div>
              <div className="an">{l.name}</div>
              <div className="asb">{l.sound}</div>
            </>
          : <>
              <div className="at">{l.tip}</div>
              <div className="ae"><span className="aeg" lang="el">{l.example}</span><span className="aer"><R t={l.exRom}/></span><span className="aep">{l.exPl}</span></div>
            </>}
        <Speak text={l.example} size={14}/>
      </div>
    ))}</div>
    <button className="dtog" onClick={()=>setShowDi(s=>!s)}>{showDi?"▾ Ukryj dwuznaki":"▸ Dwuznaki — WAZNE!"}</button>
    {showDi && <div className="dlist">{digraphs.map((d,i)=>(
      <div key={i} className="dc">
        <div className="dctop"><span className="dcc" lang="el">{d.combo}</span><span className="dcsb">{d.sound}</span><Speak text={d.example} size={16}/></div>
        <div className="dct">{d.tip}</div>
        <div className="dce"><span className="dcg" lang="el">{d.example}</span><span className="dcr"><R t={d.exRom}/></span><span className="dcp">= {d.exPl}</span></div>
      </div>
    ))}</div>}
  </div>;
}

function NumbersBlock(){
  const [rev,setRev]=useState({});
  const toggle=(i)=>setRev(p=>({...p,[i]:!p[i]}));
  return <div className="num-grid">{numbers.map((n,i)=>{
    const open=rev[i];
    return <div key={i} className={"nc"+(open?" rev":"")} role="button" tabIndex={0} aria-pressed={!!open}
      onClick={()=>toggle(i)}
      onKeyDown={(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();toggle(i);}}}>
      <div className="nn">{n.n}</div>
      {open
        ? <><div className="ng" lang="el">{n.gr}</div><div className="nr"><R t={n.rom}/></div><Speak text={n.gr} size={13}/></>
        : <div className="nh">kliknij</div>}
    </div>;
  })}</div>;
}

function ReadingBlock({level}){
  const lv = readingLevels[level];
  if(!lv) return null;
  return <div className="vlist">{lv.items.map((it,i)=>(
    <RevealCard key={i} gr={it.gr} rom={Array.isArray(it.rom)?it.rom.join(""):it.rom} pl={it.pl}/>
  ))}</div>;
}

function LessonSections({lesson}){
  return <>{lesson.sections.map((s,i)=>(
    <section key={i} className="lsec">
      {s.title && <h3 className="lsec-title">{s.title}</h3>}
      {s.type==="text" && <p className="lsec-body">{s.body}</p>}
      {s.type==="grammar" && <GrammarBlock s={s}/>}
      {s.type==="letters" && <LettersBlock/>}
      {s.type==="numbers" && <NumbersBlock/>}
      {s.type==="reading" && <ReadingBlock level={s.level}/>}
      {(s.type==="words"||s.type==="phrases") && <CardList s={s}/>}
    </section>
  ))}</>;
}

function LessonView({lesson, order, completed, onHome, onPrev, onNext}){
  useEffect(()=>{ try{window.scrollTo(0,0);}catch(e){} }, [lesson.id]);
  const pos = order.indexOf(lesson.id);
  const isLast = pos === order.length-1;
  const label = lesson.bonus ? "Bonus" : ("Lekcja "+lesson.id);
  return <div className="lesson">
    <header className="lhdr">
      <button className="lback" onClick={onHome}><ChevronLeft size={18}/> Kurs</button>
      <SpeedControl/><span className="lprog">{label}{completed && <span className="ldone-badge"><Check size={13}/> ukonczona</span>}</span>
    </header>
    <div className="lhero">
      <span className="lhero-emoji">{lesson.emoji}</span>
      <h1 className="lhero-title" lang="el">{lesson.title}</h1>
      <p className="lhero-desc">{lesson.desc}</p>
    </div>
    <LessonSections lesson={lesson}/>
    <div className="lnav">
      {onPrev ? <button className="lnav-prev" onClick={onPrev}><ChevronLeft size={18}/> Wstecz</button> : <span className="lnav-spacer"/>}
      <button className="lnav-next" onClick={onNext}>{isLast?"Zakoncz kurs":"Ukoncz i dalej"} <ChevronRight size={18}/></button>
    </div>
  </div>;
}

/* ===== Slownik 400+ najczestszych slow (jedyna referencja) ===== */
function DictWord({w}){
  const [open,setOpen]=useState(false);
  const toggle=()=>setOpen(o=>!o);
  return <div className={"dword"+(open?" rev":"")} role="button" tabIndex={0} aria-pressed={open}
    onClick={toggle}
    onKeyDown={(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();toggle();}}}>
    <div className="dword-top"><span className="dword-gr" lang="el">{w.gr}</span><Speak text={w.gr} size={14}/></div>
    {open
      ? <><div className="dword-rom"><R t={w.rom}/></div><div className="dword-pl">{w.pl}</div></>
      : <div className="dword-hint">▸</div>}
  </div>;
}
function DictionaryView({onHome}){
  const [open,setOpen]=useState(0);
  const total = commonWordGroups.reduce((a,g)=>a+g.words.length,0);
  return <div className="lesson">
    <header className="lhdr">
      <button className="lback" onClick={onHome}><ChevronLeft size={18}/> Kurs</button>
      <SpeedControl/><span className="lprog">Slownik</span>
    </header>
    <div className="lhero">
      <span className="lhero-emoji">📚</span>
      <h1 className="lhero-title">Slownik — {total} slow</h1>
      <p className="lhero-desc">~80% codziennej greckiej mowy. Kliknij grupe, potem slowo, posluchaj 🔊.</p>
    </div>
    <div className="dictlist">
      {commonWordGroups.map((g,gi)=>(
        <div key={gi}>
          <button className={"dictgroup"+(open===gi?" open":"")} onClick={()=>setOpen(open===gi?null:gi)}>
            <span>{g.title}</span><span className="dictcount">{g.words.length}</span>
          </button>
          {open===gi && <div className="dictgrid">{g.words.map((w,wi)=><DictWord key={wi} w={w}/>)}</div>}
        </div>
      ))}
    </div>
  </div>;
}

/* ===== Ekran glowny — jedna sciezka ===== */
function Home({done, srs, stats, pool, onOpen, onSession, onDict, onDialogs, onReaders, onStats, dark, toggleDark}){
  const [open,setOpen]=useState({});
  const toggle=(k)=>setOpen(o=>({...o,[k]:!o[k]}));
  const core = allLessons.filter(l=>!l.bonus);
  const bonus = allLessons.filter(l=>l.bonus);
  const next = core.find(l=>!done.has(l.id)) || core[core.length-1];
  const doneCount = core.filter(l=>done.has(l.id)).length;
  const pct = core.length?Math.round(doneCount/core.length*100):0;
  const due = dueCount(pool, srs);
  const streak = (stats&&stats.streak)||0;
  const card=(l)=>{
    const isDone=done.has(l.id);
    const isCurrent=l.id===next.id && !isDone;
    return <button key={l.id} className={"lcard"+(isDone?" done":"")+(isCurrent?" current":"")} onClick={()=>onOpen(l.id)}>
      <span className="lcard-emoji" lang="el">{l.emoji}</span>
      <span className="lcard-body">
        <span className="lcard-title" lang="el">{l.title}{l.adult?" · 18+":""}</span>
        <span className="lcard-desc">{l.desc}</span>
      </span>
      <span className="lcard-state">{isDone ? <Check size={18}/> : (l.bonus?<Lock size={15}/>:<span className="lcard-num">{l.id}</span>)}</span>
    </button>;
  };
  return <div className="home">
    <header className="hhdr">
      <div className="hhdr-top">
        <div>
          <div className="hkicker">Ελληνικά · Grecki {LEVELS[0].id}–{LEVELS[LEVELS.length-1].id}</div>
          <h1 className="htitle" lang="el">Γεια σου!</h1>
        </div>
        <div className="hhdr-r">
          {streak>0 && <span className="streak"><Flame size={15}/> {streak}</span>}
          <button className="darkbtn" onClick={toggleDark} aria-label="Tryb ciemny">{dark?<Sun size={18}/>:<Moon size={18}/>}</button>
        </div>
      </div>
      <button className="session-cta" onClick={onSession}>
        <div className="session-cta-l">
          <div className="session-cta-k">Sesja powtorek</div>
          <div className="session-cta-t">{due>0 ? (due+" do powtorki dzis") : "Zacznij nauke →"}</div>
        </div>
        <span className="session-cta-go"><RotateCcw size={20}/></span>
      </button>
      <div className="hprogress">
        <div className="hprogress-bar"><span style={{width:pct+"%"}}/></div>
        <div className="hprogress-txt">Lekcje: {doneCount}/{core.length}</div>
      </div>
      <button className="continue" onClick={()=>onOpen(next.id)}>
        <div className="continue-l">
          <div className="continue-k">{done.has(next.id)?"Powtorz":"Kontynuuj"}</div>
          <div className="continue-t">{next.emoji} {next.title}</div>
        </div>
        <ChevronRight size={24}/>
      </button>
    </header>

    <div className="home-main">
    {LEVELS.map((lvl,idx)=>{
      const items=lvl.lessons.filter(l=>!l.bonus);
      if(!items.length) return null;
      if(idx===0) return <div key={lvl.id}>
        <div className="sec-label">{lvl.label}</div>
        <div className="llist">{items.map(card)}</div>
      </div>;
      const o=!!open[lvl.id];
      return <div key={lvl.id}>
        <button className="sec-tog" onClick={()=>toggle(lvl.id)}>{o?"▾":"▸"} {lvl.label} ({items.length})</button>
        {o && <div className="llist">{items.map(card)}</div>}
      </div>;
    })}

    {bonus.length>0 && <>
      <button className="sec-tog" onClick={()=>toggle("__bonus")}>{open["__bonus"]?"▾":"▸"} Bonus — poza kursem ({bonus.length})</button>
      {open["__bonus"] && <div className="llist">{bonus.map(card)}</div>}
    </>}

    <div className="more-grid">
      <button className="more-tile" onClick={onSession}><RotateCcw size={20}/><span>Cwiczenia</span></button>
      <button className="more-tile" onClick={onDialogs}><MessageCircle size={20}/><span>Dialogi</span></button>
      <button className="more-tile" onClick={onReaders}><BookOpen size={20}/><span>Czytanki</span></button>
      <button className="more-tile" onClick={onDict}><span className="more-emoji">📚</span><span>Slownik</span></button>
      <button className="more-tile" onClick={onStats}><BarChart3 size={20}/><span>Statystyki</span></button>
    </div>
    <footer className="hfoot">Καλή τύχη! · Ucz sie codziennie po kilka minut.</footer>
    </div>
  </div>;
}

/* ===== Routing przez hash (back button, odswiezenie, deep-link) ===== */
function parseHash(){
  try{
    const h = window.location.hash || "";
    if(/slownik/.test(h)) return {t:"dict"};
    if(/session/.test(h)) return {t:"session"};
    if(/stats/.test(h)) return {t:"stats"};
    let m=h.match(/dialog\/([a-z0-9]+)/i); if(m) return {t:"dialog", id:m[1]};
    if(/dialogs/.test(h)) return {t:"dialogs"};
    m=h.match(/reader\/([a-z0-9]+)/i); if(m) return {t:"reader", id:m[1]};
    if(/readers/.test(h)) return {t:"readers"};
    m = h.match(/lesson\/(\d+)/);
    if(m) return {t:"lesson", id:parseInt(m[1],10)};
  }catch(e){}
  return {t:"home"};
}

/* ===== CWICZENIA / SESJA POWTOREK (SRS) ===== */
function exLabel(t){
  return t==="choose-pl"?"Wybierz tlumaczenie"
    :t==="listen"?"Posluchaj i wybierz znaczenie"
    :t==="choose-gr"?"Jak to powiesz po grecku?"
    :t==="type-gr"?"Napisz po grecku"
    :t==="build"?"Uloz zdanie z klockow"
    :t==="cloze"?"Uzupelnij luke"
    :"";
}

function ExerciseCard({ex, onNext}){
  const [result,setResult]=useState(null);
  const [typed,setTyped]=useState("");
  const [answer,setAnswer]=useState([]);
  const [bank,setBank]=useState(ex.tokens||[]);
  const item=ex.item;
  const submit=(resp)=>{ if(result) return; setResult({correct:checkAnswer(ex,resp), resp}); };
  const greekOpts = ex.type==="choose-gr"||ex.type==="cloze";

  return <div className="ex">
    <div className="ex-q">{exLabel(ex.type)}</div>
    <div className="ex-prompt">
      {ex.type==="listen"
        ? <div className="ex-audio-grp">
            <button className="ex-audio" onClick={()=>speak(ex.audio, _rate)} aria-label="Posluchaj"><Volume2 size={28}/><span>Posluchaj</span></button>
            <button className="ex-audio ex-audio-slow" onClick={()=>speak(ex.audio, SLOW_RATE)} aria-label="Posluchaj wolniej"><Turtle size={26}/><span>Wolniej</span></button>
          </div>
        : ex.type==="cloze"
          ? <div className="ex-gr" lang="el">{ex.masked}</div>
          : (ex.type==="choose-gr"||ex.type==="type-gr"||ex.type==="build")
            ? <div className="ex-pl">{ex.prompt}</div>
            : <div className="ex-gr"><span lang="el">{ex.prompt}</span> <Speak text={ex.audio}/></div>}
      {ex.showRom && <div className="ex-rom"><R t={item.rom}/></div>}
    </div>

    {(ex.type==="choose-pl"||ex.type==="listen"||ex.type==="choose-gr"||ex.type==="cloze") &&
      <div className="ex-opts">{ex.options.map((o,i)=>{
        let st=""; if(result){ if(o===ex.answer) st="ok"; else if(o===result.resp) st="bad"; }
        return <button key={i} className={"opt"+(st?" opt-"+st:"")} disabled={!!result} onClick={()=>submit(o)}>
          {greekOpts?<span lang="el">{o}</span>:o}
        </button>;
      })}</div>}

    {ex.type==="type-gr" && <div className="ex-type">
      <input className="ex-input" lang="el" value={typed} disabled={!!result} placeholder="Wpisz po grecku..."
        onChange={e=>setTyped(e.target.value)}
        onKeyDown={e=>{ if(e.key==="Enter"&&!result&&typed.trim()) submit(typed); }}/>
      {ex.hint && !result && <div className="ex-hint">podpowiedz: <R t={ex.hint}/></div>}
      {!result && <button className="ex-check" disabled={!typed.trim()} onClick={()=>submit(typed)}>Sprawdz</button>}
    </div>}

    {ex.type==="build" && <div className="ex-build">
      <div className="ex-line" lang="el">{answer.length?answer.join(" "):<span className="ex-line-ph">dotykaj slow w kolejnosci...</span>}</div>
      <div className="ex-bank">{bank.map((tok,i)=>(
        <button key={i} className="chip" lang="el" disabled={!!result} onClick={()=>{ setAnswer(a=>[...a,tok]); setBank(b=>b.filter((_,j)=>j!==i)); }}>{tok}</button>
      ))}</div>
      {!result && <div className="ex-build-actions">
        <button className="ex-undo" disabled={!answer.length} onClick={()=>{ const last=answer[answer.length-1]; setAnswer(a=>a.slice(0,-1)); setBank(b=>[...b,last]); }}>← Cofnij</button>
        <button className="ex-check" disabled={bank.length>0} onClick={()=>submit(answer)}>Sprawdz</button>
      </div>}
    </div>}

    {result && <div className={"ex-fb "+(result.correct?"good":"bad")}>
      <div className="ex-fb-t">{result.correct?"✓ Dobrze!":"✗ Poprawna odpowiedz:"}</div>
      <div className="ex-fb-full"><span lang="el">{item.gr}</span> — {item.pl} <Speak text={item.gr} size={15}/></div>
      <button className="lnav-next ex-next" onClick={()=>onNext(result.correct)}>Dalej <ChevronRight size={18}/></button>
    </div>}
  </div>;
}

function SessionView({pool, srs, onFinish, onHome}){
  const [work]=useState(()=>buildSession(pool, srs, {maxNew:8, maxReview:14}));
  const [extra,setExtra]=useState([]);
  const [idx,setIdx]=useState(0);
  const [localSrs,setLocalSrs]=useState(srs);
  const [acc,setAcc]=useState({c:0,t:0});
  const [ex,setEx]=useState(()=> work.length?makeExercise(work[0],pool):null);
  const list=work.concat(extra);
  const finished = idx>=list.length;

  const next=(correct)=>{
    const cur=list[idx];
    const ng=grade(localSrs, cur.id, correct);
    setLocalSrs(ng);
    const nc=acc.c+(correct?1:0), nt=acc.t+1;
    setAcc({c:nc,t:nt});
    let newExtra=extra;
    if(!correct && !cur._retried){ newExtra=[...extra,{...cur,_retried:true}]; setExtra(newExtra); }
    const newList=work.concat(newExtra);
    const ni=idx+1;
    setIdx(ni);
    if(ni<newList.length){ setEx(makeExercise(newList[ni], pool)); }
    else { setEx(null); onFinish&&onFinish(ng, {reviewed:nt, correct:nc}); }
  };

  if(list.length===0) return <div className="lesson">
    <header className="lhdr"><button className="lback" onClick={onHome}><ChevronLeft size={18}/> Kurs</button><span className="lprog">Sesja</span></header>
    <div className="ses-done"><div className="ses-done-emoji">✅</div><h1 className="lhero-title">Na dzis nic do powtorki</h1><p className="lhero-desc">Wroc jutro albo otworz nowa lekcje, by dolozyc material.</p><button className="lnav-next" onClick={onHome}>Wroc do kursu <ChevronRight size={18}/></button></div>
  </div>;

  if(finished){
    const pct=acc.t?Math.round(acc.c/acc.t*100):0;
    return <div className="lesson">
      <header className="lhdr"><button className="lback" onClick={onHome}><ChevronLeft size={18}/> Kurs</button><span className="lprog">Sesja</span></header>
      <div className="ses-done"><div className="ses-done-emoji">🎉</div><h1 className="lhero-title">Gotowe! {acc.c}/{acc.t}</h1><p className="lhero-desc">Skutecznosc {pct}%. Wroc jutro po kolejna porcje powtorek.</p><button className="lnav-next" onClick={onHome}>Wroc do kursu <ChevronRight size={18}/></button></div>
    </div>;
  }

  const prog=Math.round(idx/list.length*100);
  return <div className="lesson session">
    <header className="lhdr"><button className="lback" onClick={onHome}><ChevronLeft size={18}/> Przerwij</button><SpeedControl/><span className="lprog">{idx+1}/{list.length}</span></header>
    <div className="ses-bar"><span style={{width:prog+"%"}}/></div>
    <ExerciseCard key={idx} ex={ex} onNext={next}/>
  </div>;
}

function StatsView({stats, srs, pool, onHome}){
  const learned=countLearned(srs);
  const acc=stats.totalReviews?Math.round(stats.totalCorrect/stats.totalReviews*100):0;
  const due=dueCount(pool, srs);
  const days=[];
  for(let i=6;i>=0;i--){ const d=new Date(); d.setDate(d.getDate()-i); const k=d.toISOString().slice(0,10); days.push({k, n:(stats.history&&stats.history[k])||0}); }
  const max=Math.max(1,...days.map(d=>d.n));
  return <div className="lesson">
    <header className="lhdr"><button className="lback" onClick={onHome}><ChevronLeft size={18}/> Kurs</button><span className="lprog">Statystyki</span></header>
    <div className="lhero"><span className="lhero-emoji">📈</span><h1 className="lhero-title">Twoje postepy</h1></div>
    <div className="stat-grid">
      <div className="stat-card"><div className="stat-n"><Flame size={17}/> {stats.streak||0}</div><div className="stat-l">dni z rzedu</div></div>
      <div className="stat-card"><div className="stat-n">{learned}</div><div className="stat-l">opanowanych</div></div>
      <div className="stat-card"><div className="stat-n">{stats.totalReviews||0}</div><div className="stat-l">powtorek lacznie</div></div>
      <div className="stat-card"><div className="stat-n">{acc}%</div><div className="stat-l">skutecznosc</div></div>
    </div>
    <div className="lsec"><h3 className="lsec-title">Ostatnie 7 dni</h3>
      <div className="bars">{days.map((d,i)=><div key={i} className="bar-col"><div className="bar" style={{height:(d.n/max*70+4)+"px"}}/><div className="bar-x">{d.k.slice(8)}</div></div>)}</div>
    </div>
    {due>0 && <div className="lsec"><button className="lnav-next" onClick={onHome}>Masz {due} do powtorki — wroc i cwicz →</button></div>}
  </div>;
}

/* ===== Mowienie (rozpoznawanie mowy) ===== */
function SpeakCheck({target}){
  const [state,setState]=useState("idle");
  const rec=getRecognizer();
  if(!rec.supported) return null;
  const run=()=>{
    if(state==="listening") return;
    setState("listening");
    rec.listen({
      onResult:(alts)=>{
        const t=normalizeGreek(target);
        const hit=alts.some(a=>normalizeGreek(a)===t);
        const near=alts.some(a=>{ const n=normalizeGreek(a); return n&&(t.indexOf(n)>=0||n.indexOf(t.split(" ")[0])>=0); });
        setState(hit?"ok":(near?"near":"fail"));
      },
      onError:()=>setState("fail"),
      onEnd:()=>setState(s=>s==="listening"?"fail":s),
    });
  };
  const label=state==="listening"?"Sluchom...":state==="ok"?"✓ Brawo!":state==="near"?"Prawie!":state==="fail"?"Sprobuj jeszcze":"🎤 Powiedz";
  return <button className={"speakbtn speak-"+state} onClick={run}><Mic size={14}/> {label}</button>;
}

function RoleplaySteps({steps}){
  const [i,setI]=useState(0);
  const [res,setRes]=useState(null);
  if(i>=steps.length) return <div className="ses-done"><div className="ses-done-emoji">👏</div><h3 className="lsec-title">Koniec scenki — dobra robota!</h3></div>;
  const s=steps[i];
  return <div className="lsec">
    <div className="rp-prompt">{s.prompt}</div>
    <div className="ex-opts">{s.options.map((o,k)=>{
      let st=""; if(res){ if(o===s.answer) st="ok"; else if(o===res) st="bad"; }
      return <button key={k} className={"opt"+(st?" opt-"+st:"")} disabled={!!res} onClick={()=>setRes(o)}>{o}</button>;
    })}</div>
    {res && <button className="lnav-next" onClick={()=>{ setRes(null); setI(i+1); }}>Dalej <ChevronRight size={18}/></button>}
  </div>;
}

function DialogueView({dialogue, onHome}){
  const [mode,setMode]=useState("listen");
  const d=dialogue;
  const playAll=()=>{ d.lines.forEach((ln,i)=>setTimeout(()=>speak(ln.gr), i*1900)); };
  return <div className="lesson">
    <header className="lhdr"><button className="lback" onClick={onHome}><ChevronLeft size={18}/> Dialogi</button><SpeedControl/></header>
    <div className="lhero"><span className="lhero-emoji">{d.emoji}</span><h1 className="lhero-title">{d.title}</h1><p className="lhero-desc">{d.desc}</p></div>
    <div className="seg">
      <button className={"seg-b"+(mode==="listen"?" active":"")} onClick={()=>setMode("listen")}>Sluchaj i mow</button>
      {d.roleplay && <button className={"seg-b"+(mode==="role"?" active":"")} onClick={()=>setMode("role")}>Odegraj role</button>}
    </div>
    {mode==="listen" ? <>
      <div className="lsec"><button className="lnav-next" onClick={playAll}><Volume2 size={18}/> Odtworz caly dialog</button></div>
      <div className="dlg">{d.lines.map((ln,i)=>(
        <div key={i} className={"dlg-line "+(ln.who==="A"?"a":"b")}>
          <div className="dlg-gr"><span lang="el">{ln.gr}</span> <Speak text={ln.gr} size={15}/></div>
          <div className="dlg-rom"><R t={ln.rom}/></div>
          <div className="dlg-pl">{ln.pl}</div>
          <SpeakCheck target={ln.gr}/>
        </div>
      ))}</div>
    </> : <RoleplaySteps steps={d.roleplay}/>}
  </div>;
}

function DialoguesView({onOpen, onHome}){
  return <div className="lesson">
    <header className="lhdr"><button className="lback" onClick={onHome}><ChevronLeft size={18}/> Kurs</button><span className="lprog">Dialogi</span></header>
    <div className="lhero"><span className="lhero-emoji">💬</span><h1 className="lhero-title">Dialogi</h1><p className="lhero-desc">Posluchaj, powtorz na glos, odegraj role.</p></div>
    <div className="llist">{dialogues.map(d=>(
      <button key={d.id} className="lcard" onClick={()=>onOpen(d.id)}>
        <span className="lcard-emoji">{d.emoji}</span>
        <span className="lcard-body"><span className="lcard-title">{d.title}</span><span className="lcard-desc">{d.desc}</span></span>
        <span className="lcard-state"><ChevronRight size={18}/></span>
      </button>
    ))}</div>
  </div>;
}

function ReaderView({reader, onHome}){
  const [rev,setRev]=useState({});
  const [ans,setAns]=useState({});
  return <div className="lesson">
    <header className="lhdr"><button className="lback" onClick={onHome}><ChevronLeft size={18}/> Czytanki</button><SpeedControl/></header>
    <div className="lhero"><span className="lhero-emoji">{reader.emoji}</span><h1 className="lhero-title">{reader.title}</h1><p className="lhero-desc">Kliknij zdanie, by zobaczyc tlumaczenie.</p></div>
    <div className="vlist">{reader.text.map((s,i)=>(
      <div key={i} className={"vc"+(rev[i]?" rev":"")} role="button" tabIndex={0} aria-pressed={!!rev[i]}
        onClick={()=>setRev(p=>({...p,[i]:!p[i]}))}
        onKeyDown={e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); setRev(p=>({...p,[i]:!p[i]})); } }}>
        <div className="vc-top"><div className="vg" lang="el">{s.gr}</div><Speak text={s.gr}/></div>
        <div className="vr"><R t={s.rom}/></div>
        {rev[i] && <div className="vp">{s.pl}</div>}
      </div>
    ))}</div>
    <div className="lsec"><h3 className="lsec-title">Pytania ze zrozumienia</h3>
      {reader.questions.map((q,qi)=>{
        const picked=ans[qi];
        return <div key={qi} className="gbox q-box">
          <div className="rp-prompt" lang="el">{q.q}</div>
          <div className="ex-opts">{q.options.map((o,k)=>{
            let st=""; if(picked){ if(o===q.answer) st="ok"; else if(o===picked) st="bad"; }
            return <button key={k} className={"opt"+(st?" opt-"+st:"")} disabled={!!picked} onClick={()=>setAns(p=>({...p,[qi]:o}))}>{o}</button>;
          })}</div>
        </div>;
      })}
    </div>
  </div>;
}

function ReadersView({onOpen, onHome}){
  return <div className="lesson">
    <header className="lhdr"><button className="lback" onClick={onHome}><ChevronLeft size={18}/> Kurs</button><span className="lprog">Czytanki</span></header>
    <div className="lhero"><span className="lhero-emoji">📖</span><h1 className="lhero-title">Czytanki</h1><p className="lhero-desc">Krotkie teksty A2 z pytaniami ze zrozumienia.</p></div>
    <div className="llist">{readers.map(r=>(
      <button key={r.id} className="lcard" onClick={()=>onOpen(r.id)}>
        <span className="lcard-emoji">{r.emoji}</span>
        <span className="lcard-body"><span className="lcard-title">{r.title}</span><span className="lcard-desc">{r.desc}</span></span>
        <span className="lcard-state"><ChevronRight size={18}/></span>
      </button>
    ))}</div>
  </div>;
}

export default function App(){
  const [dark,setDark]=useState(()=>{
    try{
      const s=localStorage.getItem("greek-dark");
      if(s!==null) return s==="1";
      return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }catch(e){ return false; }
  });
  const [done,setDone]=useState(()=>{
    try{ return new Set(JSON.parse(localStorage.getItem("greek-done")||"[]")); }catch(e){ return new Set(); }
  });
  const [srs,setSrs]=useState(()=>loadProgress());
  const [stats,setStats]=useState(()=>loadStats());
  const [pool]=useState(()=>buildPool({lessons: allLessons, categories, commonWordGroups, numbers}));
  const [route,setRoute]=useState(()=>parseHash());

  useEffect(()=>{
    const fn=()=>setRoute(parseHash());
    window.addEventListener("hashchange",fn);
    return ()=>window.removeEventListener("hashchange",fn);
  },[]);
  useEffect(()=>{ try{localStorage.setItem("greek-dark",dark?"1":"0");}catch(e){} },[dark]);
  useEffect(()=>{ try{localStorage.setItem("greek-done",JSON.stringify([...done]));}catch(e){} },[done]);
  useEffect(()=>{ saveProgress(srs); },[srs]);
  useEffect(()=>{
    try{
      if(window.speechSynthesis){
        _elVoice=pickVoice();
        window.speechSynthesis.onvoiceschanged=()=>{_elVoice=pickVoice();};
      }
    }catch(e){}
  },[]);

  const order = allLessons.map(l=>l.id);

  const navigate=(r)=>{
    let hash="#/";
    if(r.t==="lesson") hash="#/lesson/"+r.id;
    else if(r.t==="dict") hash="#/slownik";
    else if(r.t==="session") hash="#/session";
    else if(r.t==="stats") hash="#/stats";
    else if(r.t==="dialogs") hash="#/dialogs";
    else if(r.t==="dialog") hash="#/dialog/"+r.id;
    else if(r.t==="readers") hash="#/readers";
    else if(r.t==="reader") hash="#/reader/"+r.id;
    try{ window.location.hash=hash; }catch(e){}
    setRoute(r);
  };
  const openLesson=(id)=>navigate({t:"lesson",id});
  const openDict=()=>navigate({t:"dict"});
  const openSession=()=>navigate({t:"session"});
  const openStats=()=>navigate({t:"stats"});
  const openDialogs=()=>navigate({t:"dialogs"});
  const openDialog=(id)=>navigate({t:"dialog",id});
  const openReaders=()=>navigate({t:"readers"});
  const openReader=(id)=>navigate({t:"reader",id});
  const goHome=()=>navigate({t:"home"});
  const markDone=(id)=>setDone(prev=>{ const n=new Set(prev); n.add(id); return n; });

  const homeEl = <Home done={done} srs={srs} stats={stats} pool={pool} onOpen={openLesson} onSession={openSession} onDict={openDict} onDialogs={openDialogs} onReaders={openReaders} onStats={openStats} dark={dark} toggleDark={()=>setDark(d=>!d)}/>;

  let body;
  if(route.t==="dict") body = <DictionaryView onHome={goHome}/>;
  else if(route.t==="session") body = <SessionView pool={pool} srs={srs} onHome={goHome} onFinish={(ns,res)=>{ setSrs(ns); setStats(recordSession(res.reviewed,res.correct)); }}/>;
  else if(route.t==="stats") body = <StatsView stats={stats} srs={srs} pool={pool} onHome={goHome}/>;
  else if(route.t==="dialogs") body = <DialoguesView onOpen={openDialog} onHome={goHome}/>;
  else if(route.t==="dialog"){ const d=dialogues.find(x=>x.id===route.id); body = d?<DialogueView dialogue={d} onHome={goHome}/>:homeEl; }
  else if(route.t==="readers") body = <ReadersView onOpen={openReader} onHome={goHome}/>;
  else if(route.t==="reader"){ const r=readers.find(x=>x.id===route.id); body = r?<ReaderView reader={r} onHome={goHome}/>:homeEl; }
  else if(route.t==="lesson"){
    const lesson = allLessons.find(l=>l.id===route.id);
    if(!lesson){ body = homeEl; }
    else {
      const pos = order.indexOf(lesson.id);
      const prevId = pos>0 ? order[pos-1] : null;
      const nextId = pos<order.length-1 ? order[pos+1] : null;
      body = <LessonView
        lesson={lesson}
        order={order}
        completed={done.has(lesson.id)}
        onHome={goHome}
        onPrev={prevId!=null ? ()=>openLesson(prevId) : null}
        onNext={()=>{ markDone(lesson.id); if(nextId!=null) openLesson(nextId); else goHome(); }}
      />;
    }
  } else { body = homeEl; }

  return <div className={"root"+(dark?" dark":"")}>{body}</div>;
}
