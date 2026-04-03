import { useState } from "react";
import { MessageCircle, User, Coffee, Compass, Users, Sparkles, ShoppingCart, Sun, Heart, Globe, GraduationCap, BookOpen, Dumbbell, Library, Type, BookMarked, Ruler, Languages, Key, Brain, Smile, HelpCircle, Activity, MapPin, Search, Clock, Ban, ThumbsUp, Lightbulb, Link2, PenLine, Star, Eye, Zap, Cloud, Hash, LifeBuoy, CalendarDays, Stethoscope, Plane, ShoppingBag, Sunset, Gift, Flame, Skull, Flag, Swords, Volume2, Table2, RotateCcw, Puzzle, Home, ChevronRight, Moon } from "lucide-react";

const iconMap = {
  "👋":MessageCircle,"🙋":User,"☕":Coffee,"🗺️":Compass,"👨‍👩‍👧":Users,
  "✨":Sparkles,"🛒":ShoppingCart,"🌤️":Sun,"💬":MessageCircle,"❤️":Heart,
  "🇬🇷":Globe,"🎓":GraduationCap,"📖":BookOpen,"📚":Library,"📋":Table2,
  "🔄":RotateCcw,"🔬":Puzzle,"⭐":Star,"Αα":Type,"📐":Ruler,
  "💬":Languages,"🏛️":BookMarked,"🔑":Key,"🧠":Brain,"🙏":Smile,
  "❓":HelpCircle,"💭":Activity,"☕":Coffee,"🚶":MapPin,"🏪":Search,
  "⏰":Clock,"🚫":Ban,"❤️":Heart,"💡":Lightbulb,"🔗":Link2,
  "📖":BookOpen,"💐":Star,"🎭":Smile,"🖼️":Eye,"💬":Zap,
  "🌤️":Cloud,"🔢":Hash,"🆘":LifeBuoy,"📱":CalendarDays,"🏥":Stethoscope,
  "✈️":Plane,"🛒":ShoppingBag,"☕":Coffee,"🌅":Sunset,"✨":Sparkles,
  "💕":Heart,"🍯":Gift,"👨‍👩‍👧":Users,"💑":Heart,"😤":Flame,
  "🤬":Skull,"😩":Cloud,"⚡":Swords,"🔄":RotateCcw,
};

const icoColors = {
  "👋":"#2874a6","🙋":"#7c3aed","☕":"#92400e","🗺️":"#0d9488","👨‍👩‍👧":"#c2410c",
  "✨":"#d97706","🛒":"#059669","🌤️":"#0284c7","💬":"#6366f1","❤️":"#dc2626",
  "🇬🇷":"#1e40af","🎓":"#7c2d12","📖":"#2874a6","📚":"#4338ca","📋":"#0891b2",
  "🔄":"#7c3aed","🔬":"#0d9488","⭐":"#d97706","📐":"#6366f1",
};

function Ico({e,size,bg}) {
  const Icon=iconMap[e];
  const color=icoColors[e]||"#1b3a5c";
  const s=size||22;
  if(!Icon) return <span style={{fontSize:s*1.2}}>{e}</span>;
  if(bg) return <div style={{width:s*2.2,height:s*2.2,borderRadius:s*.6,background:color+"14",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
    <Icon size={s} color={color} strokeWidth={2}/>
  </div>;
  return <Icon size={s} color={color} strokeWidth={2}/>;
}

/* Renders romanization with accented vowels in red instead of á é í ó ú marks */
const acMap = {'\u00e1':'a','\u00e9':'e','\u00ed':'i','\u00f3':'o','\u00fa':'u','\u00c1':'A','\u00c9':'E','\u00cd':'I','\u00d3':'O','\u00da':'U'};
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

/* ===== EXISTING DATA (condensed) ===== */
const alphabet = [
  { upper:"Α",lower:"α",name:"alfa",sound:"a",example:"αγάπη",exRom:"agápi",exPl:"miłość",tip:"jak polskie 'a'" },
  { upper:"Β",lower:"β",name:"wita",sound:"w",example:"βιβλίο",exRom:"wiwlío",exPl:"książka",tip:"jak polskie 'w' — NIE 'b'!" },
  { upper:"Γ",lower:"γ",name:"gamma",sound:"g/j",example:"γάτα",exRom:"gáta",exPl:"kot",tip:"'g' przed a/o/u, 'j' przed e/i" },
  { upper:"Δ",lower:"δ",name:"delta",sound:"dh",example:"δρόμος",exRom:"drómos",exPl:"droga",tip:"jak ang. 'th' w 'this'" },
  { upper:"Ε",lower:"ε",name:"epsilon",sound:"e",example:"ελιά",exRom:"eliá",exPl:"oliwka",tip:"jak polskie 'e'" },
  { upper:"Ζ",lower:"ζ",name:"zita",sound:"z",example:"ζάχαρη",exRom:"záchari",exPl:"cukier",tip:"jak polskie 'z'" },
  { upper:"Η",lower:"η",name:"ita",sound:"i",example:"ήλιος",exRom:"ílios",exPl:"słońce",tip:"wymawiane 'i' — nie 'e'!" },
  { upper:"Θ",lower:"θ",name:"thita",sound:"th",example:"θάλασσα",exRom:"thálasa",exPl:"morze",tip:"jak ang. 'th' w 'think'" },
  { upper:"Ι",lower:"ι",name:"jota",sound:"i",example:"ιστορία",exRom:"istoría",exPl:"historia",tip:"jak polskie 'i'" },
  { upper:"Κ",lower:"κ",name:"kappa",sound:"k",example:"καφές",exRom:"kafés",exPl:"kawa",tip:"jak polskie 'k'" },
  { upper:"Λ",lower:"λ",name:"lambda",sound:"l",example:"λεμόνι",exRom:"lemóni",exPl:"cytryna",tip:"jak polskie 'l'" },
  { upper:"Μ",lower:"μ",name:"mi",sound:"m",example:"μήλο",exRom:"mílo",exPl:"jabłko",tip:"jak polskie 'm'" },
  { upper:"Ν",lower:"ν",name:"ni",sound:"n",example:"νερό",exRom:"neró",exPl:"woda",tip:"jak polskie 'n'" },
  { upper:"Ξ",lower:"ξ",name:"ksi",sound:"ks",example:"ξένος",exRom:"ksénos",exPl:"obcy",tip:"jak 'ks' w 'taksówka'" },
  { upper:"Ο",lower:"ο",name:"omikron",sound:"o",example:"όνομα",exRom:"ónoma",exPl:"imię",tip:"jak polskie 'o'" },
  { upper:"Π",lower:"π",name:"pi",sound:"p",example:"πόρτα",exRom:"pórta",exPl:"drzwi",tip:"jak polskie 'p'" },
  { upper:"Ρ",lower:"ρ",name:"ro",sound:"r",example:"ρύζι",exRom:"rízi",exPl:"ryż",tip:"jak polskie 'r'" },
  { upper:"Σ",lower:"σ/ς",name:"sigma",sound:"s",example:"σπίτι",exRom:"spíti",exPl:"dom",tip:"ς na końcu, σ w środku" },
  { upper:"Τ",lower:"τ",name:"taf",sound:"t",example:"τυρί",exRom:"tirí",exPl:"ser",tip:"jak polskie 't'" },
  { upper:"Υ",lower:"υ",name:"ipsilon",sound:"i",example:"ύπνος",exRom:"ípnos",exPl:"sen",tip:"wymawiane 'i' — nie 'y'!" },
  { upper:"Φ",lower:"φ",name:"fi",sound:"f",example:"φίλος",exRom:"fílos",exPl:"przyjaciel",tip:"jak polskie 'f'" },
  { upper:"Χ",lower:"χ",name:"chi",sound:"ch",example:"χέρι",exRom:"chéri",exPl:"ręka",tip:"jak polskie 'ch'" },
  { upper:"Ψ",lower:"ψ",name:"psi",sound:"ps",example:"ψάρι",exRom:"psári",exPl:"ryba",tip:"jak 'ps' w 'psychologia'" },
  { upper:"Ω",lower:"ω",name:"omega",sound:"o",example:"ώρα",exRom:"óra",exPl:"godzina",tip:"identycznie jak omikron" },
];

const digraphs = [
  { combo:"ΑΙ/αι",sound:"e",example:"και",exRom:"ke",exPl:"i (spójnik)",tip:"αι = 'e', nie 'ai'!" },
  { combo:"ΕΙ/ει",sound:"i",example:"είναι",exRom:"íne",exPl:"jest",tip:"ει = 'i'" },
  { combo:"ΟΙ/οι",sound:"i",example:"οικογένεια",exRom:"ikojénia",exPl:"rodzina",tip:"οι = 'i'" },
  { combo:"ΟΥ/ου",sound:"u",example:"ουρανός",exRom:"uranós",exPl:"niebo",tip:"ου = 'u' — jedyny sposób na 'u'!" },
  { combo:"ΑΥ/αυ",sound:"aw/af",example:"αυτό",exRom:"aftó",exPl:"to",tip:"'aw' przed dźwięczną, 'af' przed bezdźwięczną" },
  { combo:"ΕΥ/ευ",sound:"ew/ef",example:"ευχαριστώ",exRom:"efcharistó",exPl:"dziękuję",tip:"'ew' przed dźwięczną, 'ef' przed bezdźwięczną" },
  { combo:"ΜΠ/μπ",sound:"b(mb)",example:"μπίρα",exRom:"bíra",exPl:"piwo",tip:"początek='b', środek='mb'" },
  { combo:"ΝΤ/ντ",sound:"d(nd)",example:"ντομάτα",exRom:"domáta",exPl:"pomidor",tip:"początek='d', środek='nd'" },
  { combo:"ΓΚ/γκ",sound:"g(ng)",example:"γκαράζ",exRom:"garáż",exPl:"garaż",tip:"początek='g', środek='ng'" },
  { combo:"ΤΣ/τσ",sound:"c",example:"τσάι",exRom:"cái",exPl:"herbata",tip:"jak polskie 'c'" },
  { combo:"ΤΖ/τζ",sound:"dz",example:"τζατζίκι",exRom:"dzadzíki",exPl:"tzatziki",tip:"jak polskie 'dz'" },
];

const categories = [
  { id:"modal",icon:"🔑",title:"Kluczowe konstrukcje",phrases:[
    {gr:"Μπορώ να...;",rom:"Boró na...?",pl:"Czy mogę...?",note:"Klucz do wszystkiego!"},
    {gr:"Μπορώ να σε ρωτήσω;",rom:"Boró na se rotíso?",pl:"Czy mogę cię zapytać?"},
    {gr:"Μπορώ να καθίσω εδώ;",rom:"Boró na kathíso edó?",pl:"Czy mogę tu usiąść?"},
    {gr:"Μπορώ να πληρώσω;",rom:"Boró na pliróso?",pl:"Czy mogę zapłacić?"},
    {gr:"Μπορείς να μου δώσεις...;",rom:"Borís na mu dósis...?",pl:"Czy możesz mi dać...?"},
    {gr:"Μπορείς να με βοηθήσεις;",rom:"Borís na me voithísis?",pl:"Czy możesz mi pomóc?"},
    {gr:"Μπορείτε να μιλάτε πιο αργά;",rom:"Boríte na miláte pio argá?",pl:"Czy możecie mówić wolniej?",note:"formalnie / do wielu osób"},
    {gr:"Μπορείτε να το γράψετε;",rom:"Boríte na to grápsete?",pl:"Czy możecie to napisać?"},
    {gr:"Πρέπει να...",rom:"Prépi na...",pl:"Muszę... / Powinienem..."},
    {gr:"Πρέπει να πάω.",rom:"Prépi na páo.",pl:"Muszę iść."},
    {gr:"Πρέπει να φύγω.",rom:"Prépi na fígo.",pl:"Muszę wyjść/jechać."},
    {gr:"Δεν πρέπει να...",rom:"Den prépi na...",pl:"Nie powinienem... / Nie wolno..."},
    {gr:"Χρειάζομαι...",rom:"Chriázome...",pl:"Potrzebuję..."},
    {gr:"Χρειάζομαι βοήθεια.",rom:"Chriázome voíthia.",pl:"Potrzebuję pomocy."},
    {gr:"Χρειάζομαι ένα ταξί.",rom:"Chriázome éna taksí.",pl:"Potrzebuję taksówki."},
    {gr:"Θέλω να...",rom:"Thélo na...",pl:"Chcę..."},
    {gr:"Θέλω να μάθω ελληνικά.",rom:"Thélo na mátho eliniká.",pl:"Chcę się nauczyć greckiego."},
    {gr:"Θα ήθελα...",rom:"Tha íthela...",pl:"Chciałbym/Chciałabym...",note:"grzeczniej niż θέλω"},
    {gr:"Θα ήθελα να κλείσω ένα τραπέζι.",rom:"Tha íthela na klíso éna trapézi.",pl:"Chciałbym zarezerwować stolik."},
  ]},
  { id:"know",icon:"🧠",title:"Wiem / Rozumiem",phrases:[
    {gr:"Ξέρω.",rom:"Kséro.",pl:"Wiem."},
    {gr:"Δεν ξέρω.",rom:"Den kséro.",pl:"Nie wiem."},
    {gr:"Καταλαβαίνω.",rom:"Katalavéno.",pl:"Rozumiem."},
    {gr:"Δεν καταλαβαίνω.",rom:"Den katalavéno.",pl:"Nie rozumiem."},
    {gr:"Νομίζω ότι...",rom:"Nomízo óti...",pl:"Myślę, że..."},
    {gr:"Δεν νομίζω.",rom:"Den nomízo.",pl:"Nie sądzę."},
    {gr:"Μου αρέσει.",rom:"Mu arési.",pl:"Podoba mi się. / Lubię to."},
    {gr:"Δεν μου αρέσει.",rom:"Den mu arési.",pl:"Nie podoba mi się."},
    {gr:"Έχω...",rom:"Écho...",pl:"Mam..."},
    {gr:"Δεν έχω...",rom:"Den écho...",pl:"Nie mam..."},
    {gr:"Υπάρχει...;",rom:"Ipárchi...?",pl:"Czy jest...? / Czy istnieje...?"},
    {gr:"Δεν υπάρχει πρόβλημα.",rom:"Den ipárchi próvlima.",pl:"Nie ma problemu."},
  ]},
  { id:"basics",icon:"👋",title:"Podstawy",phrases:[
    {gr:"Γεια σου",rom:"Jia su",pl:"Cześć",note:"nieformalnie"},{gr:"Γεια σας",rom:"Jia sas",pl:"Dzień dobry",note:"formalnie"},
    {gr:"Καλημέρα",rom:"Kalimera",pl:"Dzień dobry (rano)"},{gr:"Καλησπέρα",rom:"Kalispera",pl:"Dobry wieczór"},
    {gr:"Καληνύχτα",rom:"Kalinichta",pl:"Dobranoc"},{gr:"Με λένε...",rom:"Me lene...",pl:"Nazywam się..."},
    {gr:"Πώς σε λένε;",rom:"Pos se lene?",pl:"Jak masz na imię?"},{gr:"Χάρηκα",rom:"Charika",pl:"Miło mi"},
    {gr:"Αντίο",rom:"Adio",pl:"Do widzenia"},{gr:"Τα λέμε",rom:"Ta leme",pl:"Na razie"},
  ]},
  { id:"polite",icon:"🙏",title:"Uprzejmości",phrases:[
    {gr:"Παρακαλώ",rom:"Parakaló",pl:"Proszę"},{gr:"Ευχαριστώ πολύ",rom:"Efcharistó polí",pl:"Dziękuję bardzo"},
    {gr:"Συγγνώμη",rom:"Signómi",pl:"Przepraszam"},{gr:"Τίποτα",rom:"Típota",pl:"Nie ma za co"},
  ]},
  { id:"ask",icon:"❓",title:"Pytania",phrases:[
    {gr:"Μπορώ να...;",rom:"Boró na...?",pl:"Czy mogę...?"},{gr:"Πού είναι...;",rom:"Pu íne...?",pl:"Gdzie jest...?"},
    {gr:"Πόσο κοστίζει;",rom:"Póso kostízi?",pl:"Ile kosztuje?"},{gr:"Τι είναι αυτό;",rom:"Ti íne aftó?",pl:"Co to jest?"},
    {gr:"Μπορείτε να με βοηθήσετε;",rom:"Boríte na me voithísete?",pl:"Czy możecie mi pomóc?"},
  ]},
  { id:"state",icon:"💭",title:"Stany",phrases:[
    {gr:"Είμαι καλά",rom:"Íme kalá",pl:"Czuję się dobrze"},{gr:"Πεινάω",rom:"Pináo",pl:"Jestem głodny/a"},
    {gr:"Διψάω",rom:"Dipsáo",pl:"Chce mi się pić"},{gr:"Χρειάζομαι βοήθεια",rom:"Chriázome voíthia",pl:"Potrzebuję pomocy"},
    {gr:"Είμαι από την Πολωνία",rom:"Íme apó tin Polonía",pl:"Jestem z Polski"},
  ]},
  { id:"cafe",icon:"☕",title:"Kawiarnia",phrases:[
    {gr:"Θα ήθελα έναν καφέ",rom:"Tha íthela énan kafé",pl:"Chciałbym kawę"},
    {gr:"Τον λογαριασμό, παρακαλώ",rom:"Ton logariazmó, parakaló",pl:"Rachunek, proszę"},
    {gr:"Είναι πολύ νόστιμο!",rom:"Íne polí nóstimo!",pl:"Jest bardzo smaczne!"},
  ]},
  { id:"move",icon:"🚶",title:"Ruch i miejsce",phrases:[
    {gr:"Πάω σε...",rom:"Páo se...",pl:"Idę do..."},
    {gr:"Πάω στο σχολείο.",rom:"Páo sto scholío.",pl:"Idę do szkoły."},
    {gr:"Πάω στη δουλειά.",rom:"Páo sti duliá.",pl:"Idę do pracy."},
    {gr:"Έρχομαι από...",rom:"Érchome apó...",pl:"Przychodzę z..."},
    {gr:"Μένω σε ξενοδοχείο.",rom:"Méno se ksenodochío.",pl:"Mieszkam w hotelu."},
    {gr:"Είμαι στο σπίτι.",rom:"Íme sto spíti.",pl:"Jestem w domu."},
    {gr:"Πού μπορώ να βρω...;",rom:"Pú boró na vro...?",pl:"Gdzie mogę znaleźć...?"},
    {gr:"Πώς πάω στο μετρό;",rom:"Pós páo sto metró?",pl:"Jak dojdę do metra?"},
    {gr:"Είναι κοντά ή μακριά;",rom:"Íne kondá í makriá?",pl:"Jest blisko czy daleko?"},
    {gr:"Πάρτε δεξιά και μετά ευθεία.",rom:"Párte deksiá ke metá efthía.",pl:"Skręćcie w prawo i potem prosto."},
  ]},
  { id:"avail",icon:"🏪",title:"Dostępność",phrases:[
    {gr:"Έχετε...;",rom:"Échete...?",pl:"Czy macie...?"},
    {gr:"Έχετε δωμάτιο;",rom:"Échete domátio?",pl:"Czy macie pokój?"},
    {gr:"Υπάρχει φαρμακείο εδώ κοντά;",rom:"Ipárchi farmakío edó kondá?",pl:"Czy jest apteka tu blisko?"},
    {gr:"Υπάρχουν εισιτήρια;",rom:"Ipárchun isitíria?",pl:"Czy są bilety?"},
    {gr:"Πόσο κάνει;",rom:"Póso káni?",pl:"Ile kosztuje?"},
    {gr:"Τι ώρα ανοίγει;",rom:"Ti óra anígi?",pl:"O której otwierają?"},
    {gr:"Τι ώρα κλείνει;",rom:"Ti óra klíni?",pl:"O której zamykają?"},
    {gr:"Είναι ανοιχτό;",rom:"Íne anichtó?",pl:"Czy jest otwarte?"},
    {gr:"Δέχεστε κάρτα;",rom:"Décheste kárta?",pl:"Czy przyjmujecie kartę?"},
  ]},
  { id:"time",icon:"⏰",title:"Czas",phrases:[
    {gr:"Στις τρεις.",rom:"Stis tris.",pl:"O trzeciej."},
    {gr:"Στις εφτά το πρωί.",rom:"Stis eftá to proí.",pl:"O siódmej rano."},
    {gr:"Σε πέντε λεπτά.",rom:"Se pénde leptá.",pl:"Za pięć minut."},
    {gr:"Σε μισή ώρα.",rom:"Se misí óra.",pl:"Za pół godziny."},
    {gr:"Πριν μία ώρα.",rom:"Prin mía óra.",pl:"Godzinę temu."},
    {gr:"Από τις 9 μέχρι τις 5.",rom:"Apó tis eniá méchri tis pénde.",pl:"Od 9 do 5."},
    {gr:"Κάθε μέρα.",rom:"Káthe méra.",pl:"Codziennie."},
    {gr:"Κάθε πρωί / βράδυ.",rom:"Káthe proí / vrádi.",pl:"Co rano / Co wieczór."},
    {gr:"Τι ώρα είναι;",rom:"Ti óra íne?",pl:"Która jest godzina?"},
    {gr:"Είναι νωρίς / αργά.",rom:"Íne norís / argá.",pl:"Jest wcześnie / późno."},
  ]},
  { id:"neg",icon:"🚫",title:"Przeczenie",phrases:[
    {gr:"Δεν είναι έτοιμο ακόμα.",rom:"Den íne étimo akóma.",pl:"Jeszcze nie jest gotowe."},
    {gr:"Δεν μιλάω καλά, αλλά καταλαβαίνω.",rom:"Den miláo kalá, alá katalavéno.",pl:"Nie mówię dobrze, ale rozumiem."},
    {gr:"Δεν έχω χρόνο.",rom:"Den écho chróno.",pl:"Nie mam czasu."},
    {gr:"Δεν μπορώ τώρα.",rom:"Den boró tóra.",pl:"Nie mogę teraz."},
    {gr:"Τίποτα.",rom:"Típota.",pl:"Nic."},
    {gr:"Κανένας / Καμία.",rom:"Kanénas / Kamía.",pl:"Nikt / Żaden."},
    {gr:"Πουθενά.",rom:"Puthenà.",pl:"Nigdzie."},
    {gr:"Ούτε καφέ ούτε τσάι.",rom:"Úte kafé úte tsái.",pl:"Ani kawy ani herbaty."},
    {gr:"Ποτέ.",rom:"Poté.",pl:"Nigdy."},
    {gr:"Δεν πειράζει.",rom:"Den pirázi.",pl:"Nie szkodzi. / Nic się nie stało."},
  ]},
  { id:"pref",icon:"❤️",title:"Preferencje",phrases:[
    {gr:"Προτιμώ να...",rom:"Protimó na...",pl:"Wolę..."},
    {gr:"Προτιμώ να μείνω σπίτι.",rom:"Protimó na míno spíti.",pl:"Wolę zostać w domu."},
    {gr:"Μου αρέσει να ταξιδεύω.",rom:"Mu arési na taksidévo.",pl:"Lubię podróżować."},
    {gr:"Μου αρέσει πολύ η Ελλάδα.",rom:"Mu arési polí i Eláda.",pl:"Bardzo lubię Grecję."},
    {gr:"Πιο μεγάλο από αυτό.",rom:"Pio megálo apó aftó.",pl:"Większe niż to."},
    {gr:"Ο πιο ωραίος.",rom:"O pio oréos.",pl:"Najładniejszy."},
    {gr:"Η πιο καλή.",rom:"I pio kalí.",pl:"Najlepsza."},
    {gr:"Δεν μου αρέσει το κρύο.",rom:"Den mu arési to krío.",pl:"Nie lubię zimna."},
  ]},
  { id:"suggest",icon:"💡",title:"Propozycje",phrases:[
    {gr:"Πάμε να φάμε!",rom:"Páme na fáme!",pl:"Chodźmy coś zjeść!"},
    {gr:"Πάμε να δούμε!",rom:"Páme na dúme!",pl:"Chodźmy zobaczyć!"},
    {gr:"Γιατί δεν έρχεσαι;",rom:"Jiatí den érchese?",pl:"Czemu nie przyjdziesz?"},
    {gr:"Τι λες να πάμε σινεμά;",rom:"Ti les na páme sinemá?",pl:"Co powiesz na kino?"},
    {gr:"Ας φύγουμε.",rom:"As fígume.",pl:"Wyjdźmy. / Jedźmy."},
    {gr:"Ας πάμε μαζί!",rom:"As páme mazí!",pl:"Chodźmy razem!"},
    {gr:"Θέλεις να έρθεις;",rom:"Thélis na érthis?",pl:"Chcesz przyjść?"},
    {gr:"Θέλετε να καθίσετε;",rom:"Thélete na kathísete?",pl:"Chcecie usiąść?"},
    {gr:"Μπορούμε να πάμε αύριο.",rom:"Borúme na páme ávrio.",pl:"Możemy iść jutro."},
  ]},
  { id:"connect",icon:"🔗",title:"Łączenie zdań",phrases:[
    {gr:"Πρώτα... μετά...",rom:"Próta... metá...",pl:"Najpierw... potem..."},
    {gr:"Πρώτα τρώω, μετά πίνω καφέ.",rom:"Próta tróo, metá píno kafé.",pl:"Najpierw jem, potem piję kawę."},
    {gr:"Πριν φύγω...",rom:"Prin fígo...",pl:"Zanim wyjdę..."},
    {gr:"Αφού φάω...",rom:"Afú fáo...",pl:"Po tym jak zjem..."},
    {gr:"Αν βρέχει, θα μείνω σπίτι.",rom:"An vréchi, tha míno spíti.",pl:"Jeśli pada, zostanę w domu."},
    {gr:"Αν θέλεις, πάμε μαζί.",rom:"An thélis, páme mazí.",pl:"Jeśli chcesz, chodźmy razem."},
    {gr:"Όταν έρθεις, θα φάμε.",rom:"Ótan érthis, tha fáme.",pl:"Kiedy przyjdziesz, zjemy."},
    {gr:"Ενώ περιμένω...",rom:"Enó periméno...",pl:"Podczas gdy czekam..."},
    {gr:"Επειδή βρέχει, μένω σπίτι.",rom:"Epidí vréchi, méno spíti.",pl:"Ponieważ pada, zostaję w domu."},
  ]},
  { id:"narrate",icon:"📖",title:"Narracja",phrases:[
    {gr:"Χθες πήγα στη θάλασσα.",rom:"Chthes píga sti thálasa.",pl:"Wczoraj poszedłem nad morze."},
    {gr:"Χθες έφαγα σουβλάκι.",rom:"Chthes éfaga suvláki.",pl:"Wczoraj jadłem souvlaki."},
    {gr:"Αύριο θα πάω στην Αθήνα.",rom:"Ávrio tha páo stin Athína.",pl:"Jutro pojadę do Aten."},
    {gr:"Αύριο θα δουλέψω.",rom:"Ávrio tha dulépso.",pl:"Jutro będę pracować."},
    {gr:"Συνήθως πίνω καφέ το πρωί.",rom:"Siníthos píno kafé to proí.",pl:"Zwykle piję kawę rano."},
    {gr:"Κάθε Σάββατο πάω στην αγορά.",rom:"Káthe Sávato páo stin agorá.",pl:"Co sobotę chodzę na targ."},
    {gr:"Πέρσι ήμουν στην Κρήτη.",rom:"Pérsi ímun stin Kríti.",pl:"W zeszłym roku byłem na Krecie."},
    {gr:"Την επόμενη εβδομάδα θα ταξιδέψω.",rom:"Tin epómeni evdomáda tha taksidépso.",pl:"W przyszłym tygodniu będę podróżować."},
    {gr:"Μόλις έφτασα.",rom:"Mólis éftasa.",pl:"Właśnie przyjechałem."},
    {gr:"Σε λίγο φεύγω.",rom:"Se lígo févgo.",pl:"Za chwilę wychodzę."},
  ]},
  { id:"compliment",icon:"💐",title:"Komplementy",phrases:[
    {gr:"Είσαι πανέμορφη.",rom:"Íse panémorfi.",pl:"Jesteś przepiękna.",note:"do kobiety"},
    {gr:"Είσαι πολύ όμορφη.",rom:"Íse polí ómorfi.",pl:"Jesteś bardzo ładna.",note:"do kobiety"},
    {gr:"Είσαι πολύ όμορφος.",rom:"Íse polí ómorfos.",pl:"Jesteś bardzo przystojny.",note:"do mężczyzny"},
    {gr:"Σου πάει πολύ αυτό!",rom:"Su pái polí aftó!",pl:"Bardzo ci to pasuje!"},
    {gr:"Είσαι πολύ γλυκιά.",rom:"Íse polí glikiá.",pl:"Jesteś bardzo słodka.",note:"do kobiety"},
    {gr:"Έχεις ωραίο χαμόγελο.",rom:"Échis oréo chamójelo.",pl:"Masz piękny uśmiech."},
    {gr:"Έχεις πολύ ωραία μάτια.",rom:"Échis polí oréa mátia.",pl:"Masz bardzo ładne oczy."},
    {gr:"Δείχνεις υπέροχη απόψε.",rom:"Díchnis ipérohi apópse.",pl:"Wyglądasz wspaniale dziś wieczorem.",note:"do kobiety"},
    {gr:"Μαγειρεύεις πολύ ωραία!",rom:"Majirévis polí oréa!",pl:"Świetnie gotujesz!"},
    {gr:"Μιλάς πολύ καλά ελληνικά!",rom:"Milás polí kalá eliniká!",pl:"Bardzo dobrze mówisz po grecku!"},
    {gr:"Είσαι πολύ έξυπνος/η.",rom:"Íse polí éksipnos/i.",pl:"Jesteś bardzo mądry/a."},
    {gr:"Είσαι πολύ αστείος/α!",rom:"Íse polí astíos/a!",pl:"Jesteś bardzo zabawny/a!"},
    {gr:"Σ' αγαπώ.",rom:"S'agapó.",pl:"Kocham cię."},
    {gr:"Μου λείπεις.",rom:"Mu lípis.",pl:"Tęsknię za tobą."},
  ]},
  { id:"emotions",icon:"🎭",title:"Emocje i uczucia",phrases:[
    {gr:"Είμαι χαρούμενος/η.",rom:"Íme charúmenos/i.",pl:"Jestem szczęśliwy/a."},
    {gr:"Είμαι στεναχωρημένος/η.",rom:"Íme stenachoriménos/i.",pl:"Jestem smutny/a."},
    {gr:"Είμαι κουρασμένος/η.",rom:"Íme kurazménos/i.",pl:"Jestem zmęczony/a."},
    {gr:"Είμαι θυμωμένος/η.",rom:"Íme thimoménos/i.",pl:"Jestem zły/a. (wściekły)"},
    {gr:"Είμαι ενθουσιασμένος/η!",rom:"Íme enthusiazmenos/i!",pl:"Jestem podekscytowany/a!"},
    {gr:"Είμαι αγχωμένος/η.",rom:"Íme anchoménos/i.",pl:"Jestem zestresowany/a."},
    {gr:"Ανησυχώ.",rom:"Anisichó.",pl:"Martwię się."},
    {gr:"Φοβάμαι.",rom:"Fováme.",pl:"Boję się."},
    {gr:"Βαριέμαι.",rom:"Variéme.",pl:"Nudzę się."},
    {gr:"Χαίρομαι που σε βλέπω!",rom:"Chérome pu se vlépo!",pl:"Cieszę się, że cię widzę!"},
    {gr:"Χαίρομαι πολύ!",rom:"Chérome polí!",pl:"Bardzo się cieszę!"},
    {gr:"Λυπάμαι.",rom:"Lipáme.",pl:"Przykro mi. / Współczuję."},
    {gr:"Νιώθω καλά / άσχημα.",rom:"Nιótho kalá / áschima.",pl:"Czuję się dobrze / źle."},
    {gr:"Είμαι ερωτευμένος/η.",rom:"Íme eroteménos/i.",pl:"Jestem zakochany/a."},
    {gr:"Περνάω πολύ ωραία!",rom:"Pernáo polí oréa!",pl:"Świetnie się bawię!"},
    {gr:"Τι ωραία!",rom:"Ti oréa!",pl:"Jak pięknie! / Super!"},
    {gr:"Τέλεια!",rom:"Téleia!",pl:"Idealnie! / Świetnie!"},
    {gr:"Φοβερό!",rom:"Foveró!",pl:"Niesamowite! / Odlotowe!"},
  ]},
  { id:"describe",icon:"🖼️",title:"Opisywanie",phrases:[
    {gr:"Αυτό είναι...",rom:"Aftó íne...",pl:"To jest..."},
    {gr:"Αυτός είναι ο φίλος μου.",rom:"Aftós íne o fílos mu.",pl:"To jest mój przyjaciel."},
    {gr:"Αυτή είναι η αδερφή μου.",rom:"Aftí íne i aderfí mu.",pl:"To jest moja siostra."},
    {gr:"Το σπίτι μου είναι μικρό.",rom:"To spíti mu íne mikró.",pl:"Mój dom jest mały."},
    {gr:"Η πόλη μου είναι πολύ ωραία.",rom:"I póli mu íne polí oréa.",pl:"Moje miasto jest bardzo ładne."},
    {gr:"Είναι μεγάλο / μικρό.",rom:"Íne megálo / mikró.",pl:"Jest duże / małe."},
    {gr:"Είναι καινούργιο / παλιό.",rom:"Íne kenúrjio / palió.",pl:"Jest nowe / stare."},
    {gr:"Είναι ακριβό / φτηνό.",rom:"Íne akrivó / ftinó.",pl:"Jest drogie / tanie."},
    {gr:"Είναι ζεστό / κρύο.",rom:"Íne zestó / krío.",pl:"Jest ciepłe / zimne."},
    {gr:"Είναι εύκολο / δύσκολο.",rom:"Íne éfkolo / dískolo.",pl:"Jest łatwe / trudne."},
    {gr:"Μοιάζει με...",rom:"Miázi me...",pl:"Wygląda jak... / Przypomina..."},
  ]},
  { id:"react",icon:"💬",title:"Reakcje",phrases:[
    {gr:"Βέβαια!",rom:"Vévea!",pl:"Oczywiście!"},
    {gr:"Σωστά!",rom:"Sostá!",pl:"Zgadza się! / Racja!"},
    {gr:"Ίσως.",rom:"Ísos.",pl:"Może."},
    {gr:"Εξαρτάται.",rom:"Eksartáte.",pl:"To zależy."},
    {gr:"Συμφωνώ.",rom:"Simfonó.",pl:"Zgadzam się."},
    {gr:"Δεν συμφωνώ.",rom:"Den simfonó.",pl:"Nie zgadzam się."},
    {gr:"Σοβαρά;",rom:"Sovará?",pl:"Serio?!"},
    {gr:"Αλήθεια;",rom:"Alíthia?",pl:"Naprawdę?"},
    {gr:"Εντάξει.",rom:"Endáksi.",pl:"OK. / W porządku."},
    {gr:"Έτσι κι έτσι.",rom:"Étsi ki étsi.",pl:"Tak sobie."},
    {gr:"Φυσικά!",rom:"Fisiká!",pl:"Naturalnie!"},
    {gr:"Τι κρίμα!",rom:"Ti kríma!",pl:"Jaka szkoda!"},
    {gr:"Σίγουρα!",rom:"Sígura!",pl:"Na pewno!"},
    {gr:"Δεν νομίζω.",rom:"Den nomízo.",pl:"Nie sądzę."},
    {gr:"Ελπίζω.",rom:"Elpízo.",pl:"Mam nadzieję."},
    {gr:"Μακάρι!",rom:"Makári!",pl:"Oby! / Obyś miał rację!"},
  ]},
  { id:"weather",icon:"🌤️",title:"Pogoda",phrases:[
    {gr:"Τι καιρό κάνει;",rom:"Ti keró káni?",pl:"Jaka jest pogoda?"},
    {gr:"Κάνει ζέστη.",rom:"Káni zésti.",pl:"Jest gorąco."},
    {gr:"Κάνει κρύο.",rom:"Káni krío.",pl:"Jest zimno."},
    {gr:"Κάνει καλό καιρό.",rom:"Káni kaló keró.",pl:"Jest ładna pogoda."},
    {gr:"Βρέχει.",rom:"Vréchi.",pl:"Pada deszcz."},
    {gr:"Χιονίζει.",rom:"Chionízi.",pl:"Pada śnieg."},
    {gr:"Φυσάει.",rom:"Fisái.",pl:"Wieje wiatr."},
    {gr:"Έχει ήλιο.",rom:"Échi ília.",pl:"Jest słonecznie."},
    {gr:"Έχει συννεφιά.",rom:"Échi sinnefiá.",pl:"Jest pochmurno."},
    {gr:"Σήμερα κάνει πολύ ζέστη!",rom:"Símera káni polí zésti!",pl:"Dziś jest bardzo gorąco!"},
  ]},
  { id:"numctx",icon:"🔢",title:"Liczby w kontekście",phrases:[
    {gr:"Είμαι τριάντα χρονών.",rom:"Íme triánda chronón.",pl:"Mam trzydzieści lat."},
    {gr:"Πόσο χρονών είσαι;",rom:"Póso chronón íse?",pl:"Ile masz lat?"},
    {gr:"Κοστίζει δέκα ευρώ.",rom:"Kostízi déka evró.",pl:"Kosztuje dziesięć euro."},
    {gr:"Ο αριθμός μου είναι...",rom:"O arithmós mu íne...",pl:"Mój numer to..."},
    {gr:"Ένα κιλό, παρακαλώ.",rom:"Éna kiló, parakaló.",pl:"Kilo, proszę."},
    {gr:"Μισό κιλό.",rom:"Misó kiló.",pl:"Pół kilo."},
    {gr:"Δύο μπουκάλια νερό.",rom:"Dío bukália neró.",pl:"Dwie butelki wody."},
    {gr:"Για πόσα άτομα;",rom:"Jia pósa átoma?",pl:"Na ile osób?"},
    {gr:"Για δύο, παρακαλώ.",rom:"Jia dío, parakaló.",pl:"Na dwie osoby, proszę."},
    {gr:"Πόσες μέρες;",rom:"Póses méres?",pl:"Ile dni?"},
  ]},
  { id:"rescue",icon:"🆘",title:"Ratowanie rozmowy",phrases:[
    {gr:"Εννοώ...",rom:"Enoó...",pl:"Mam na myśli..."},
    {gr:"Δηλαδή...",rom:"Diladí...",pl:"To znaczy... / Czyli..."},
    {gr:"Περίμενε.",rom:"Perímene.",pl:"Poczekaj.",note:"nieformalnie"},
    {gr:"Περιμένετε.",rom:"Periménete.",pl:"Proszę poczekać.",note:"formalnie"},
    {gr:"Πώς το λένε στα ελληνικά;",rom:"Pós to léne sta eliniká?",pl:"Jak to się mówi po grecku?"},
    {gr:"Τι σημαίνει αυτό;",rom:"Ti siméni aftó?",pl:"Co to znaczy?"},
    {gr:"Δεν θυμάμαι τη λέξη.",rom:"Den thimáme ti léksi.",pl:"Nie pamiętam tego słowa."},
    {gr:"Μπορείτε να μου εξηγήσετε;",rom:"Boríte na mu eksijísete?",pl:"Czy możecie mi wyjaśnić?"},
    {gr:"Μπορείτε να το γράψετε;",rom:"Boríte na to grápsete?",pl:"Czy możecie to napisać?"},
    {gr:"Πιο αργά, σας παρακαλώ.",rom:"Pio argá, sas parakaló.",pl:"Wolniej, proszę."},
    {gr:"Μπορείς να το πεις ξανά;",rom:"Borís na to pis ksaná?",pl:"Możesz to powtórzyć?"},
    {gr:"Ένα λεπτό, παρακαλώ.",rom:"Éna leptó, parakaló.",pl:"Minutkę, proszę."},
  ]},
  { id:"meetup",icon:"📱",title:"Umawianie się",phrases:[
    {gr:"Είσαι ελεύθερος απόψε;",rom:"Íse eléftheros apópse?",pl:"Jesteś wolny dziś wieczorem?",note:"do mężczyzny"},
    {gr:"Είσαι ελεύθερη απόψε;",rom:"Íse eléftheri apópse?",pl:"Jesteś wolna dziś wieczorem?",note:"do kobiety"},
    {gr:"Πότε μπορούμε να βρεθούμε;",rom:"Póte borúme na vrethúme?",pl:"Kiedy możemy się spotkać?"},
    {gr:"Πού να συναντηθούμε;",rom:"Pú na sinandithúme?",pl:"Gdzie się spotkamy?"},
    {gr:"Στις πόσες;",rom:"Stis póses?",pl:"O której?"},
    {gr:"Τα λέμε αύριο!",rom:"Ta léme ávrio!",pl:"Do jutra! / Pogadamy jutro!"},
    {gr:"Θα σε πάρω τηλέφωνο.",rom:"Tha se páro tiléfono.",pl:"Zadzwonię do ciebie."},
    {gr:"Στείλε μου μήνυμα.",rom:"Stíle mu mínima.",pl:"Wyślij mi wiadomość."},
    {gr:"Θα έρθω στις οχτώ.",rom:"Tha értho stis ochtó.",pl:"Przyjdę o ósmej."},
    {gr:"Μπορούμε να αλλάξουμε ώρα;",rom:"Borúme na aláksume óra?",pl:"Możemy zmienić godzinę?"},
    {gr:"Ανυπομονώ!",rom:"Anipomonó!",pl:"Nie mogę się doczekać!"},
    {gr:"Θα αργήσω λίγο.",rom:"Tha arjíso lígo.",pl:"Trochę się spóźnię."},
  ]},
  { id:"doctor",icon:"🏥",title:"U lekarza",phrases:[
    {gr:"Δεν νιώθω καλά.",rom:"Den nióth kalá.",pl:"Nie czuję się dobrze."},
    {gr:"Πονάει εδώ.",rom:"Ponái edó.",pl:"Boli tutaj."},
    {gr:"Πονάει το κεφάλι μου.",rom:"Ponái to kefáli mu.",pl:"Boli mnie głowa."},
    {gr:"Πονάει η κοιλιά μου.",rom:"Ponái i kiliá mu.",pl:"Boli mnie brzuch."},
    {gr:"Έχω πυρετό.",rom:"Écho piretó.",pl:"Mam gorączkę."},
    {gr:"Έχω αλλεργία σε...",rom:"Écho alerjía se...",pl:"Mam alergię na..."},
    {gr:"Χρειάζομαι γιατρό.",rom:"Chriázome jatró.",pl:"Potrzebuję lekarza."},
    {gr:"Πού είναι το πιο κοντινό νοσοκομείο;",rom:"Pú íne to pio kondnó nosokomío?",pl:"Gdzie jest najbliższy szpital?"},
    {gr:"Παίρνω φάρμακα για...",rom:"Pérno fármaka jia...",pl:"Biorę leki na..."},
    {gr:"Είμαι έγκυος.",rom:"Íme éngios.",pl:"Jestem w ciąży."},
  ]},
  { id:"airport",icon:"✈️",title:"Na lotnisku",phrases:[
    {gr:"Πού είναι η πύλη;",rom:"Pú íne i píli?",pl:"Gdzie jest bramka?"},
    {gr:"Η πτήση μου έχει καθυστέρηση.",rom:"I ptísi mu échi kathistérisi.",pl:"Mój lot ma opóźnienie."},
    {gr:"Πού μπορώ να παραλάβω τις αποσκευές μου;",rom:"Pú boró na paralávo tis aposkevés mu?",pl:"Gdzie mogę odebrać bagaż?"},
    {gr:"Θέλω ένα εισιτήριο για...",rom:"Thélo éna isitírio jia...",pl:"Chcę bilet do..."},
    {gr:"Μόνο πήγαινε ή με επιστροφή;",rom:"Móno pígene í me epistrofí?",pl:"W jedną stronę czy z powrotem?"},
    {gr:"Πού είναι η στάση ταξί;",rom:"Pú íne i stási taksí?",pl:"Gdzie jest postój taksówek?"},
    {gr:"Πόσο κοστίζει μέχρι το κέντρο;",rom:"Póso kostízi méchri to kéndro?",pl:"Ile kosztuje do centrum?"},
    {gr:"Έχασα τη βαλίτσα μου.",rom:"Échasa ti valítsa mu.",pl:"Zgubiłem walizkę."},
  ]},
  { id:"shopping",icon:"🛒",title:"Zakupy",phrases:[
    {gr:"Θέλω να αγοράσω...",rom:"Thélo na agoráso...",pl:"Chcę kupić..."},
    {gr:"Πόσο κάνει αυτό;",rom:"Póso káni aftó?",pl:"Ile to kosztuje?"},
    {gr:"Είναι πολύ ακριβό.",rom:"Íne polí akrivó.",pl:"Jest za drogie."},
    {gr:"Έχετε κάτι πιο φτηνό;",rom:"Échete káti pio ftinó?",pl:"Macie coś tańszego?"},
    {gr:"Μπορώ να το δοκιμάσω;",rom:"Boró na to dokimáso?",pl:"Mogę to przymierzyć?"},
    {gr:"Θέλω ένα νούμερο πιο μεγάλο.",rom:"Thélo éna número pio megálo.",pl:"Chcę rozmiar większy."},
    {gr:"Θα το πάρω!",rom:"Tha to páro!",pl:"Biorę to!"},
    {gr:"Μπορώ να πληρώσω με κάρτα;",rom:"Boró na pliróso me kárta?",pl:"Mogę zapłacić kartą?"},
    {gr:"Έχετε απόδειξη;",rom:"Échete apódiksi?",pl:"Macie paragon?"},
    {gr:"Πού είναι τα αποδυτήρια;",rom:"Pú íne ta apoditíria?",pl:"Gdzie są przymierzalnie?"},
  ]},
  { id:"approach",icon:"☕",title:"Pierwsze podejście",phrases:[
    {gr:"Γεια σου, μπορώ να κάτσω εδώ;",rom:"Jia su, boró na kátso edó?",pl:"Cześć, mogę tu usiąść?",note:"Grecy poznają się głównie przy kawie"},
    {gr:"Πάμε για έναν καφέ;",rom:"Páme jia énan kafé?",pl:"Chodźmy na kawę?",note:"Klasyczne zaproszenie — greckie 'idziemy na drinka'"},
    {gr:"Σε έχω ξαναδεί εδώ;",rom:"Se écho ksanadí edó?",pl:"Widziałem cię tu już wcześniej?"},
    {gr:"Πώς σε λένε; Πολύ ωραίο όνομα.",rom:"Pos se léne? Polí oréo ónoma.",pl:"Jak masz na imię? Bardzo ładne imię."},
    {gr:"Είσαι από εδώ;",rom:"Íse apó edó?",pl:"Jesteś stąd?"},
    {gr:"Μου δίνεις το τηλέφωνό σου;",rom:"Mu dínis to tiléfonó su?",pl:"Dasz mi swój numer?",note:"Bezpośrednio — Grecy to cenią"},
    {gr:"Θα ήθελα να σε ξαναδώ.",rom:"Tha íthela na se ksanadó.",pl:"Chciałbym cię znów zobaczyć."},
    {gr:"Μπορώ να σε κεράσω κάτι;",rom:"Boró na se keráso káti?",pl:"Mogę cię poczęstować czymś?",note:"κεράσω = postawić — ważne w greckiej kulturze!"},
  ]},
  { id:"firstdate",icon:"🌅",title:"Pierwsze randki",phrases:[
    {gr:"Πού θέλεις να πάμε;",rom:"Pú thélis na páme?",pl:"Gdzie chcesz iść?"},
    {gr:"Ξέρεις κανένα ωραίο μέρος;",rom:"Kséris kanéna oréo méros?",pl:"Znasz jakieś fajne miejsce?"},
    {gr:"Περνάω πολύ ωραία μαζί σου.",rom:"Pernáo polí oréa mazí su.",pl:"Świetnie się z tobą bawię.",note:"Kluczowe zdanie na randce"},
    {gr:"Τι σου αρέσει να κάνεις;",rom:"Ti su arési na kánis?",pl:"Co lubisz robić?"},
    {gr:"Τι μουσική ακούς;",rom:"Ti musikí akús?",pl:"Jakiej muzyki słuchasz?"},
    {gr:"Σου αρέσει η Ελλάδα;",rom:"Su arési i Eláda?",pl:"Podoba ci się Grecja?"},
    {gr:"Πάμε μια βόλτα στη θάλασσα;",rom:"Páme mia vólta sti thálasa?",pl:"Chodźmy na spacer nad morze?",note:"Klasyczna grecka randka — βόλτα (spacer)"},
    {gr:"Θέλεις να πάμε για φαγητό;",rom:"Thélis na páme jia fajitó?",pl:"Chcesz iść na jedzenie?"},
    {gr:"Εγώ κερνάω!",rom:"Egó kernáo!",pl:"Ja stawiam!",note:"Grecy ZAWSZE walczą o rachunek — to kwestia honoru"},
    {gr:"Πότε μπορούμε να ξαναβρεθούμε;",rom:"Póte borúme na ksanavrethúme?",pl:"Kiedy możemy znów się spotkać?"},
  ]},
  { id:"flirt",icon:"✨",title:"Flirt",phrases:[
    {gr:"Έχεις πολύ ωραίο χαμόγελο.",rom:"Échis polí oréo chamójelo.",pl:"Masz bardzo ładny uśmiech."},
    {gr:"Μου αρέσουν τα μάτια σου.",rom:"Mu arésun ta mátia su.",pl:"Podobają mi się twoje oczy."},
    {gr:"Είσαι πολύ γλυκιά.",rom:"Íse polí glikiá.",pl:"Jesteś bardzo słodka."},
    {gr:"Δεν μπορώ να σταματήσω να σε κοιτάω.",rom:"Den boró na stamatíso na se kitáo.",pl:"Nie mogę przestać na ciebie patrzeć."},
    {gr:"Μου λείπεις ήδη.",rom:"Mu lípis ídi.",pl:"Już za tobą tęsknię."},
    {gr:"Σκέφτομαι συνέχεια εσένα.",rom:"Skéftome sinéchia eséna.",pl:"Ciągle o tobie myślę."},
    {gr:"Κάνεις την καρδιά μου να χτυπάει πιο γρήγορα.",rom:"Kánis tin kardiá mu na chtipái pio grígora.",pl:"Sprawiasz, że moje serce bije szybciej."},
    {gr:"Είσαι η πιο όμορφη γυναίκα εδώ.",rom:"Íse i pio ómorfi jinéka edó.",pl:"Jesteś najpiękniejszą kobietą tutaj."},
  ]},
  { id:"feelings",icon:"💕",title:"Wyrażanie uczuć",phrases:[
    {gr:"Μου αρέσεις πολύ.",rom:"Mu arésis polí.",pl:"Bardzo mi się podobasz.",note:"Pierwszy krok — bezpieczne wyznanie"},
    {gr:"Νιώθω κάτι για σένα.",rom:"Niotho káti jia séna.",pl:"Czuję coś do ciebie."},
    {gr:"Είμαι ερωτευμένος μαζί σου.",rom:"Íme eroteménos mazí su.",pl:"Jestem w tobie zakochany."},
    {gr:"Σ' αγαπώ.",rom:"S'agapó.",pl:"Kocham cię.",note:"W greckim to bardzo poważne — nie mów zbyt wcześnie"},
    {gr:"Κι εγώ σ' αγαπώ.",rom:"Ki egó s'agapó.",pl:"Ja ciebie też kocham."},
    {gr:"Θέλω να είμαι μαζί σου.",rom:"Thélo na íme mazí su.",pl:"Chcę być z tobą."},
    {gr:"Είσαι ο,τι πιο σημαντικό στη ζωή μου.",rom:"Íse óti pio simandikó sti zoí mu.",pl:"Jesteś najważniejszą osobą w moim życiu."},
    {gr:"Δεν μπορώ να ζήσω χωρίς εσένα.",rom:"Den boró na zíso chorís eséna.",pl:"Nie mogę żyć bez ciebie.",note:"Grecy są dramatyczni — i to jest OK!"},
    {gr:"Θέλω να μείνω μαζί σου για πάντα.",rom:"Thélo na míno mazí su jia pánda.",pl:"Chcę zostać z tobą na zawsze."},
  ]},
  { id:"petnames",icon:"🍯",title:"Czułe słówka",phrases:[
    {gr:"αγάπη μου",rom:"agápi mu",pl:"moja miłości",note:"Najczęstsze — używane codziennie"},
    {gr:"μωρό μου",rom:"moró mu",pl:"moje maleństwo / kochanie",note:"Bardzo popularne — jak ang. 'baby'"},
    {gr:"γλυκιά μου",rom:"glikiá mu",pl:"moja słodka"},
    {gr:"ψυχή μου",rom:"psichí mu",pl:"moja duszo",note:"Poetyckie — Grecy kochają dramat"},
    {gr:"καρδιά μου",rom:"kardiá mu",pl:"moje serce"},
    {gr:"ζωή μου",rom:"zoí mu",pl:"moje życie",note:"Brzmi przesadnie? Dla Greków to normalne!"},
    {gr:"αστέρι μου",rom:"astéri mu",pl:"moja gwiazdko"},
    {gr:"μάτια μου",rom:"mátia mu",pl:"moje oczy",note:"Niezwykłe — 'moje oczy' = to co najcenniejsze"},
    {gr:"κούκλα μου",rom:"kúkla mu",pl:"moja laleczko",note:"Popularny komplement do kobiety"},
  ]},
  { id:"meetfamily",icon:"👨‍👩‍👧",title:"Poznanie rodziny",phrases:[
    {gr:"Χαίρω πολύ, είμαι ο...",rom:"Chéro polí, íme o...",pl:"Bardzo mi miło, jestem...",note:"Do rodziców — formalnie!"},
    {gr:"Ευχαριστώ πολύ για την φιλοξενία σας.",rom:"Efcharistó polí jia tin filoksenía sas.",pl:"Bardzo dziękuję za gościnność.",note:"Φιλοξενία — grecka gościnność — święta sprawa"},
    {gr:"Είναι πολύ νόστιμο! Ποιος το μαγείρεψε;",rom:"Íne polí nóstimo! Piós to majírpse?",pl:"Jest bardzo smaczne! Kto to ugotował?",note:"ZAWSZE chwal jedzenie matki"},
    {gr:"Μπορώ να βοηθήσω σε κάτι;",rom:"Boró na voithíso se káti?",pl:"Mogę w czymś pomóc?",note:"Pokaż φιλότιμο — honor i chęć pomocy"},
    {gr:"Η κόρη σας είναι υπέροχη.",rom:"I kóri sas íne ipérohi.",pl:"Wasza córka jest wspaniała."},
    {gr:"Θαυμάζω πολύ τον ελληνικό πολιτισμό.",rom:"Thavmázo polí ton elinikó politizmó.",pl:"Bardzo podziwiam grecką kulturę."},
    {gr:"Θέλω να μάθω ελληνικά για αυτήν.",rom:"Thélo na mátho eliniká jia aftín.",pl:"Chcę nauczyć się greckiego dla niej.",note:"To roztopi serce każdej greckiej matki"},
    {gr:"Σας ευχαριστώ για ένα υπέροχο βράδυ.",rom:"Sas efcharistó jia éna ipérocho vrádi.",pl:"Dziękuję za wspaniały wieczór."},
  ]},
  { id:"relationship",icon:"💑",title:"Związek",phrases:[
    {gr:"Είσαι η κοπέλα μου.",rom:"Íse i kopéla mu.",pl:"Jesteś moją dziewczyną.",note:"κοπέλα = dziewczyna/partnerka"},
    {gr:"Είμαι ο φίλος σου.",rom:"Íme o fílos su.",pl:"Jestem twoim chłopakiem.",note:"φίλος = też 'chłopak' w kontekście"},
    {gr:"Θέλω να γνωρίσεις την οικογένειά μου.",rom:"Thélo na gnorísis tin ikojéniá mu.",pl:"Chcę żebyś poznała moją rodzinę."},
    {gr:"Πάμε διακοπές μαζί;",rom:"Páme diakopés mazí?",pl:"Jedziemy razem na wakacje?"},
    {gr:"Μπορώ να σου μαγειρέψω κάτι;",rom:"Boró na su majirepso káti?",pl:"Mogę ci coś ugotować?"},
    {gr:"Θέλεις να μείνεις σπίτι μου;",rom:"Thélis na mínis spíti mu?",pl:"Chcesz zostać u mnie?"},
    {gr:"Μου λείπεις πολύ.",rom:"Mu lípis polí.",pl:"Bardzo mi ciebie brakuje."},
    {gr:"Ανυπομονώ να σε δω!",rom:"Anipomonó na se do!",pl:"Nie mogę się doczekać, żeby cię zobaczyć!"},
    {gr:"Θέλεις να παντρευτούμε;",rom:"Thélis na pandrevtúme?",pl:"Chcesz się ze mną ożenić?",note:"Duży krok — ale Grecy biorą to poważnie"},
  ]},
  { id:"angry",icon:"😤",title:"Złość i frustracja",phrases:[
    {gr:"Είμαι θυμωμένος/η!",rom:"Íme thimoménos/i!",pl:"Jestem wściekły/a!"},
    {gr:"Είμαι έξω φρενών!",rom:"Íme ékso frenón!",pl:"Jestem wkurzony do granic!",note:"dosł. 'poza zmysłami'"},
    {gr:"Με εκνευρίζεις!",rom:"Me eknevrízis!",pl:"Wkurzasz mnie! / Denerwujesz mnie!"},
    {gr:"Δεν αντέχω άλλο!",rom:"Den antécho álo!",pl:"Nie wytrzymuję już!"},
    {gr:"Φτάνει!",rom:"Ftáni!",pl:"Dosyć! / Wystarczy!"},
    {gr:"Αρκετά!",rom:"Arketá!",pl:"Dość tego!"},
    {gr:"Τι στο διάολο;",rom:"Ti sto diáolo?",pl:"Co do diabła? / Co do cholery?"},
    {gr:"Σε βαρέθηκα!",rom:"Se varéthika!",pl:"Mam cię dość!"},
    {gr:"Μην με ενοχλείς!",rom:"Min me enochlís!",pl:"Nie przeszkadzaj mi!"},
    {gr:"Δεν είναι δίκαιο!",rom:"Den íne díkeo!",pl:"To nie fair!"},
    {gr:"Αυτό με τρελαίνει!",rom:"Aftó me treléni!",pl:"To mnie doprowadza do szaleństwa!"},
    {gr:"Δεν πιστεύω αυτό που βλέπω!",rom:"Den pistévo aftó pu vlépo!",pl:"Nie wierzę w to, co widzę!"},
  ]},
  { id:"curse",icon:"🤬",title:"Przekleństwa",phrases:[
    {gr:"Γαμώτο!",rom:"Gamóto!",pl:"Kurwa! / Cholera!",note:"Najczęstsze — odpowiednik 'fuck/damn'"},
    {gr:"Σκατά!",rom:"Skatá!",pl:"Gówno! / Szlag!"},
    {gr:"Μαλάκα!",rom:"Maláka!",pl:"Idioto! / Stary! / Ziom!",note:"UWAGA: wulgaryzm, ale Grecy mówią to do przyjaciół jak 'stary/ziom' — kontekst jest wszystkim!"},
    {gr:"Βλάκα!",rom:"Vláka!",pl:"Kretynie! / Idioto!"},
    {gr:"Ηλίθιε!",rom:"Ilíthie!",pl:"Debilu! / Idioto!"},
    {gr:"Σκάσε!",rom:"Skáse!",pl:"Zamknij się!"},
    {gr:"Άντε γαμήσου!",rom:"Ánde gamísu!",pl:"Wypierdalaj! / Spierdalaj!",note:"Bardzo wulgarne — nie używaj lekko"},
    {gr:"Πήγαινε στο διάολο!",rom:"Pígene sto diáolo!",pl:"Idź do diabła!"},
    {gr:"Άι στο διάολο!",rom:"Ái sto diáolo!",pl:"A idź w diabły!",note:"Skrócona wersja — bardzo częsta"},
    {gr:"Τράβα!",rom:"Tráva!",pl:"Spadaj! / Wynoś się!"},
    {gr:"Τι μαλακίες λες;",rom:"Ti malakíes les?",pl:"Co za bzdury gadasz?",note:"wulgarnie — dosł. 'jakie głupoty mówisz'"},
    {gr:"Πάει, βαρέθηκα!",rom:"Pái, varéthika!",pl:"Dość, mam dosyć!"},
  ]},
  { id:"malaka",icon:"🇬🇷",title:"Μαλάκα — instrukcja",phrases:[
    {gr:"Τι λες, μαλάκα;",rom:"Ti les, maláka?",pl:"Co mówisz, stary?",note:"Przyjacielsko — jak 'stary/ziom'"},
    {gr:"Έλα, μαλάκα!",rom:"Éla, maláka!",pl:"Chodź, stary! / No dawaj!",note:"Przyjacielsko — zaproszenie"},
    {gr:"Μαλάκα μου!",rom:"Maláka mu!",pl:"Stary mój!",note:"Czułe — tak, to możliwe!"},
    {gr:"Τι μαλάκας είναι αυτός!",rom:"Ti malákas íne aftós!",pl:"Co za idiota z niego!",note:"Obraźliwie — o trzeciej osobie"},
    {gr:"Μην είσαι μαλάκας.",rom:"Min íse malákas.",pl:"Nie bądź debilem.",note:"Obraźliwie — do kogoś"},
    {gr:"Ρε μαλάκα, σοβαρά;",rom:"Re maláka, sovará?",pl:"Stary, serio?!",note:"Zdziwienie — ρε = wzmocnienie"},
  ]},
  { id:"everyday",icon:"😩",title:"Codzienne nerwy",phrases:[
    {gr:"Έχει πολύ κίνηση!",rom:"Échi polí kínisi!",pl:"Są ogromne korki!",note:"Ateny = wieczne korki"},
    {gr:"Περιμένω μία ώρα!",rom:"Periméno mía óra!",pl:"Czekam godzinę!"},
    {gr:"Πού είναι ο σερβιτόρος;",rom:"Pú íne o servitóros?",pl:"Gdzie jest kelner?!"},
    {gr:"Δεν δουλεύει!",rom:"Den dulévi!",pl:"Nie działa!"},
    {gr:"Χάλασε πάλι!",rom:"Chálase páli!",pl:"Znowu się zepsuło!"},
    {gr:"Κάνει πολύ ζέστη, πεθαίνω!",rom:"Káni polí zésti, pethéno!",pl:"Jest za gorąco, umieram!",note:"Grecy uwielbiają przesadzać"},
    {gr:"Βαρέθηκα να περιμένω!",rom:"Varéthika na periméno!",pl:"Mam dość czekania!"},
    {gr:"Τι κίνηση είναι αυτή;",rom:"Ti kínisi íne aftí?",pl:"Co to za korki?!"},
    {gr:"Έχασα το λεωφορείο!",rom:"Échasa to leoforío!",pl:"Spóźniłem się na autobus!"},
    {gr:"Μου τη δίνει!",rom:"Mu ti díni!",pl:"Wkurza mnie to!",note:"Slangowo — bardzo częste"},
    {gr:"Ζαλίστηκα με τις τιμές!",rom:"Zalístika me tis timés!",pl:"Ceny mnie powaliły!"},
    {gr:"Έλεος!",rom:"Éleos!",pl:"Litości! / No bez jaj!",note:"Bardzo popularne — wyraz zniecierpliwienia"},
  ]},
  { id:"argue",icon:"⚡",title:"Kłótnie i konflikty",phrases:[
    {gr:"Δεν έχεις δίκιο!",rom:"Den échis díkio!",pl:"Nie masz racji!"},
    {gr:"Έχω δίκιο κι εσύ το ξέρεις!",rom:"Écho díkio ki esí to kséris!",pl:"Mam rację i ty to wiesz!"},
    {gr:"Δεν φταίω εγώ!",rom:"Den ftéo egó!",pl:"To nie moja wina!"},
    {gr:"Φταις εσύ!",rom:"Ftes esí!",pl:"To twoja wina!"},
    {gr:"Σταμάτα να φωνάζεις!",rom:"Stamáta na fonázis!",pl:"Przestań krzyczeć!"},
    {gr:"Ηρέμησε!",rom:"Irémise!",pl:"Uspokój się!"},
    {gr:"Ας μιλήσουμε ήρεμα.",rom:"As milísume írema.",pl:"Porozmawiajmy spokojnie."},
    {gr:"Συγγνώμη, δεν το εννοούσα.",rom:"Signómi, den to enoúsa.",pl:"Przepraszam, nie to miałem na myśli."},
    {gr:"Θέλω να τα βρούμε.",rom:"Thélo na ta vrúme.",pl:"Chcę żebyśmy się dogadali."},
    {gr:"Μην θυμώνεις.",rom:"Min thimónis.",pl:"Nie złość się."},
  ]},
];


/* ===== JOURNEY: Natural learning path ===== */
const lessons = [
  { id:1, emoji:"👋", title:"Γεια! — Cześć!", desc:"Pierwsze dźwięki i powitania",
    sections:[
      {title:"Zanim zaczniesz",text:"Grecki alfabet wygląda obco, ale wiele liter znasz — Α=a, Ε=e, Ι/Η=i, Ο/Ω=o, Κ=k, Μ=m, Ν=n, Τ=t. Zajrzyj do Alfabetu w Słowniku, żeby przećwiczyć każdą literę."},
      {title:"Powitania i pożegnania",catIds:["basics"]},
      {title:"Uprzejmości",catIds:["polite"]},
      {title:"Pułapki!",text:"Β = 'w' (nie 'b'!), Η = 'i' (nie 'h'!), Ρ = 'r' (nie 'p'!), Υ = 'i' (nie 'y'!). Zapamiętaj te cztery — reszta jest logiczna."},
    ]},
  { id:2, emoji:"🙋", title:"Με λένε... — Nazywam się...", desc:"Przedstawianie się i pierwsze pytania",
    sections:[
      {title:"Είμαι — najważniejszy czasownik",text:"Είμαι (íme) = jestem. Εσύ είσαι (esí íse) = ty jesteś. Αυτός/ή είναι (aftós/í íne) = on/a jest. Z tym jednym czasownikiem powiesz bardzo dużo."},
      {title:"Jak się czujesz? Skąd jesteś?",catIds:["state"]},
      {title:"Jak powiedzieć NIE",text:"Δεν (den) przed czasownikiem = nie. Δεν είμαι = nie jestem, Δεν ξέρω = nie wiem, Δεν καταλαβαίνω = nie rozumiem."},
      {title:"Podstawowe pytania",catIds:["ask"]},
    ]},
  { id:3, emoji:"☕", title:"Στο καφενείο — W kawiarni", desc:"Zamawianie, płacenie, liczby",
    sections:[
      {title:"Zamawiasz kawę",text:"Kawiarnia to sala treningowa greckiego. Zamów kawę i od razu ćwiczysz: θα ήθελα (chciałbym) + rodzajnik + rzeczownik."},
      {title:"W kawiarni",catIds:["cafe"]},
      {title:"Rodzajniki",text:"ο (o) = męski, η (i) = żeński, το (to) = nijaki. Np. ο καφές, η σαλάτα, το νερό. Pełne tabele w Gramatyce → Rodzajniki."},
      {title:"Ile to kosztuje?",catIds:["numctx"]},
    ]},
  { id:4, emoji:"🗺️", title:"Πού είναι; — Gdzie jest?", desc:"Kierunki, transport, przyimki",
    sections:[
      {title:"Ruch i miejsce",catIds:["move"]},
      {title:"Przyimki — klej zdań",text:"σε = do/w/na, από = z/od, με = z, για = dla/o. Te cztery pokrywają 80% sytuacji. Pełna lista → Słownictwo → Przyimki."},
      {title:"Czy jest tu blisko...?",catIds:["avail"]},
      {title:"Na lotnisku",catIds:["airport"]},
    ]},
  { id:5, emoji:"👨‍👩‍👧", title:"Η οικογένειά μου — Moja rodzina", desc:"Rodzina, zaimki dzierżawcze",
    sections:[
      {title:"Mój, twój, jego",text:"Dzierżawcze idą PO rzeczowniku: το σπίτι μου = dom mój, η μητέρα σου = matka twoja. Tabela → Gramatyka → Zaimki."},
      {title:"Opisywanie osób i rzeczy",catIds:["describe"]},
    ]},
  { id:6, emoji:"✨", title:"Θέλω να... — Chcę...", desc:"Konstrukcja να — klucz do greckiego",
    sections:[
      {title:"Najważniejsza reguła",text:"Grecki nie ma bezokolicznika. Zamiast 'chcę iść' mówisz 'chcę ΝΑ idę'. Pełny zestaw → Gramatyka → Να (klej)."},
      {title:"Kluczowe konstrukcje",catIds:["modal"]},
      {title:"Wiem, rozumiem, lubię",catIds:["know"]},
    ]},
  { id:7, emoji:"🛒", title:"Στην αγορά — Na zakupach", desc:"Kupowanie, przymiotniki",
    sections:[
      {title:"Na targu i w sklepie",catIds:["shopping"]},
      {title:"Przymiotniki",text:"Przymiotnik zmienia się z rodzajem: μεγάλος (m) / μεγάλη (f) / μεγάλο (n). Ucz się parami. Lista → Słownictwo → Przymiotniki."},
      {title:"Preferencje",catIds:["pref"]},
    ]},
  { id:8, emoji:"🌤️", title:"Σήμερα — Dzisiaj", desc:"Pogoda, czas, planowanie dnia",
    sections:[
      {title:"Pogoda",text:"Κάνει ζέστη (robi ciepło). Κάνει κρύο (zimno). Βρέχει (pada). Έχει ήλιο (ma słońce)."},
      {title:"Pogoda",catIds:["weather"]},
      {title:"Czas i planowanie",catIds:["time"]},
      {title:"Łączenie zdań",catIds:["connect"]},
    ]},
  { id:9, emoji:"💬", title:"Μιλάω — Rozmawiam", desc:"Reakcje, propozycje, ratowanie rozmowy",
    sections:[
      {title:"Reakcje — brzmisz jak Grek",catIds:["react"]},
      {title:"Kiedy nie rozumiesz",catIds:["rescue"]},
      {title:"Proponujesz",catIds:["suggest"]},
      {title:"Umawianie się",catIds:["meetup"]},
    ]},
  { id:10, emoji:"❤️", title:"Σ' αγαπώ — Kocham cię", desc:"Randki, flirt, uczucia",
    sections:[
      {title:"Jak Grecy kochają",text:"Grecy są dramatyczni i poetyccy. Ψυχή μου (moja duszo), ζωή μου (moje życie) — to codzienność."},
      {title:"Pierwsze podejście",catIds:["approach"]},
      {title:"Pierwsze randki",catIds:["firstdate"]},
      {title:"Flirt",catIds:["flirt"]},
      {title:"Wyrażanie uczuć",catIds:["feelings"]},
      {title:"Czułe słówka",catIds:["petnames"]},
    ]},
  { id:11, emoji:"🇬🇷", title:"Σαν Έλληνας — Jak Grek", desc:"Przekleństwa, nerwy, prawdziwe życie",
    sections:[
      {title:"Prawdziwy grecki",text:"Grecki na ulicy to nie grecki z podręcznika."},
      {title:"Emocje i uczucia",catIds:["emotions"]},
      {title:"U lekarza",catIds:["doctor"]},
      {title:"Złość",catIds:["angry"]},
      {title:"Przekleństwa",catIds:["curse"]},
      {title:"Μαλάκα — instrukcja",catIds:["malaka"]},
      {title:"Codzienne nerwy",catIds:["everyday"]},
    ]},
  { id:12, emoji:"🎓", title:"Τα κατάφερα! — Dałem radę!", desc:"Złożone zdania, zaawansowane",
    sections:[
      {title:"Łączysz wszystko",text:"Masz klocki: να, spójniki, czasy, przyimki. Teraz budujesz złożone wypowiedzi."},
      {title:"Narracja",catIds:["narrate"]},
      {title:"Przeczenia",catIds:["neg"]},
      {title:"Komplementy",catIds:["compliment"]},
      {title:"Poznanie rodziny",catIds:["meetfamily"]},
      {title:"Związek",catIds:["relationship"]},
      {title:"Kłótnie",catIds:["argue"]},
      {title:"Brawo!",text:"Jesteś gotowy na A1. Ćwicz interaktywnie i zacznij rozmawiać z Grekami. Καλή τύχη!"},
    ]},
];

const phraseGroups = [
  { id:"basics", title:"Podstawy", icon:"🏛️", desc:"Powitania, uprzejmości, pytania", cats:["modal","know","basics","polite","ask","state","react","rescue"] },
  { id:"situations", title:"Sytuacje", icon:"🗺️", desc:"Kawiarnia, zakupy, lekarz, spotkania", cats:["cafe","move","avail","time","meetup","airport","shopping","doctor","numctx","weather"] },
  { id:"sentences", title:"Budowa zdań", icon:"✍️", desc:"Szkielety, łączniki, narracja", cats:["describe","neg","pref","suggest","connect","narrate","everyday"] },
  { id:"life", title:"Emocje", icon:"🌊", desc:"Uczucia, komplementy, nerwy", cats:["compliment","emotions","angry","curse","malaka","argue"] },
  { id:"love", title:"Miłość", icon:"❤️", desc:"Randki, flirt, związek", cats:["approach","firstdate","flirt","feelings","petnames","meetfamily","relationship"] },
];
/* ===== WORD FORMATION PATTERNS ===== */
const wordPatterns = [
  {suffix:"-είο",meaning:"miejsce",examples:[
    {gr:"φαρμακείο",rom:"farmakío",pl:"apteka",root:"φάρμακο (lek)"},
    {gr:"νοσοκομείο",rom:"nosokomío",pl:"szpital",root:"νόσος (choroba)"},
    {gr:"μουσείο",rom:"musío",pl:"muzeum",root:"μούσα (muza)"},
    {gr:"εστιατόριο",rom:"estiatório",pl:"restauracja",root:"εστία (ognisko)"},
    {gr:"βιβλιοπωλείο",rom:"vivliopolío",pl:"księgarnia",root:"βιβλίο (książka) + πωλώ (sprzedaję)"},
  ]},
  {suffix:"-ικός/-ική/-ικό",meaning:"przymiotnik (jaki?)",examples:[
    {gr:"ελληνικός",rom:"elinikós",pl:"grecki",root:"Έλληνας (Grek)"},
    {gr:"ρομαντικός",rom:"romantikós",pl:"romantyczny",root:"ρομάντζο"},
    {gr:"πολιτικός",rom:"politikós",pl:"polityczny",root:"πόλη (miasto)"},
    {gr:"τουριστικός",rom:"turistikós",pl:"turystyczny",root:"τουρίστας"},
  ]},
  {suffix:"-τής/-τρια",meaning:"osoba (kto?)",examples:[
    {gr:"μαθητής",rom:"mathitís",pl:"uczeń",root:"μαθαίνω (uczę się)"},
    {gr:"φοιτητής",rom:"fititís",pl:"student",root:"φοιτώ (studiuję)"},
    {gr:"εργάτης",rom:"ergátis",pl:"pracownik",root:"εργασία (praca)"},
    {gr:"οδηγητής",rom:"odigitís",pl:"kierowca",root:"οδηγώ (prowadzę)"},
  ]},
  {suffix:"-ση",meaning:"czynność abstrakcyjna (co?)",examples:[
    {gr:"ερώτηση",rom:"erótisi",pl:"pytanie",root:"ερωτώ (pytam)"},
    {gr:"εξήγηση",rom:"eksígisi",pl:"wyjaśnienie",root:"εξηγώ (wyjaśniam)"},
    {gr:"κατεύθυνση",rom:"katéfthinsi",pl:"kierunek",root:"κατευθύνω (kieruję)"},
    {gr:"συγγνώμη",rom:"signómi",pl:"przepraszam",root:"συγ+γνώμη (wspól+zdanie)"},
  ]},
  {suffix:"-ίζω",meaning:"robić coś (czasownik)",examples:[
    {gr:"νομίζω",rom:"nomízo",pl:"myśleć/sądzić",root:"νόμος (prawo/reguła)"},
    {gr:"οργανίζω",rom:"organízo",pl:"organizować",root:"όργανο (narzędzie)"},
    {gr:"καθαρίζω",rom:"katharízo",pl:"czyścić",root:"καθαρός (czysty)"},
    {gr:"ετοιμάζω",rom:"etimázo",pl:"przygotowywać",root:"έτοιμος (gotowy)"},
  ]},
];

/* ===== 500 MOST COMMON WORDS — ~80% spoken coverage ===== */
const commonWordGroups = [
  {title:"Partykuły i łączniki",words:[
    {gr:"και",rom:"ke",pl:"i"},{gr:"να",rom:"na",pl:"żeby/aby"},{gr:"δεν",rom:"den",pl:"nie"},
    {gr:"θα",rom:"tha",pl:"będzie (przyszłość)"},{gr:"που",rom:"pu",pl:"który/gdzie/że"},
    {gr:"αν",rom:"an",pl:"jeśli"},{gr:"ότι",rom:"óti",pl:"że"},{gr:"αλλά",rom:"alá",pl:"ale"},
    {gr:"ή",rom:"í",pl:"lub"},{gr:"γιατί",rom:"jiatí",pl:"dlaczego/bo"},{gr:"όταν",rom:"ótan",pl:"kiedy/gdy"},
    {gr:"ούτε",rom:"úte",pl:"ani"},{gr:"ενώ",rom:"enó",pl:"podczas gdy"},{gr:"επειδή",rom:"epidí",pl:"ponieważ"},
    {gr:"μήπως",rom:"mípos",pl:"czy przypadkiem"},{gr:"ώστε",rom:"óste",pl:"więc/zatem"},
  ]},
  {title:"Rodzajniki i zaimki",words:[
    {gr:"ο/η/το",rom:"o/i/to",pl:"ten/ta/to"},{gr:"ένας/μία/ένα",rom:"énas/mía/éna",pl:"jeden/jedna/jedno"},
    {gr:"εγώ",rom:"egó",pl:"ja"},{gr:"εσύ",rom:"esí",pl:"ty"},{gr:"αυτός",rom:"aftós",pl:"on/ten"},
    {gr:"αυτή",rom:"aftí",pl:"ona/ta"},{gr:"αυτό",rom:"aftó",pl:"ono/to"},
    {gr:"εμείς",rom:"emís",pl:"my"},{gr:"εσείς",rom:"esís",pl:"wy/Pan"},
    {gr:"μου",rom:"mu",pl:"mój/mi"},{gr:"σου",rom:"su",pl:"twój/ci"},{gr:"του",rom:"tu",pl:"jego"},
    {gr:"της",rom:"tis",pl:"jej"},{gr:"μας",rom:"mas",pl:"nasz/nam"},{gr:"σας",rom:"sas",pl:"wasz/wam"},
    {gr:"τους",rom:"tus",pl:"ich/im"},{gr:"κάτι",rom:"káti",pl:"coś"},{gr:"κάποιος",rom:"kápios",pl:"ktoś"},
    {gr:"τίποτα",rom:"típota",pl:"nic"},{gr:"κανένας",rom:"kanénas",pl:"nikt/żaden"},
    {gr:"όλοι",rom:"óli",pl:"wszyscy"},{gr:"άλλος",rom:"álos",pl:"inny"},
  ]},
  {title:"Przyimki i przysłówki miejsca",words:[
    {gr:"σε",rom:"se",pl:"w/do/na"},{gr:"από",rom:"apó",pl:"z/od"},{gr:"με",rom:"me",pl:"z"},
    {gr:"για",rom:"jia",pl:"dla/o/na"},{gr:"μετά",rom:"metá",pl:"po/potem"},
    {gr:"πριν",rom:"prin",pl:"przed/zanim"},{gr:"χωρίς",rom:"chorís",pl:"bez"},
    {gr:"μέχρι",rom:"méchri",pl:"do/aż do"},{gr:"κατά",rom:"katá",pl:"według/przeciw"},
    {gr:"εδώ",rom:"edó",pl:"tutaj"},{gr:"εκεί",rom:"ekí",pl:"tam"},
    {gr:"μέσα",rom:"mésa",pl:"wewnątrz"},{gr:"έξω",rom:"ékso",pl:"na zewnątrz"},
    {gr:"πάνω",rom:"páno",pl:"na górze"},{gr:"κάτω",rom:"káto",pl:"na dole"},
    {gr:"μπροστά",rom:"brostá",pl:"z przodu"},{gr:"πίσω",rom:"píso",pl:"z tyłu"},
    {gr:"δίπλα",rom:"dípla",pl:"obok"},{gr:"κοντά",rom:"kondá",pl:"blisko"},
    {gr:"μακριά",rom:"makriá",pl:"daleko"},{gr:"ανάμεσα",rom:"anámesa",pl:"pomiędzy"},
  ]},
  {title:"Przysłówki czasu i sposobu",words:[
    {gr:"τώρα",rom:"tóra",pl:"teraz"},{gr:"σήμερα",rom:"símera",pl:"dziś"},
    {gr:"αύριο",rom:"ávrio",pl:"jutro"},{gr:"χθες",rom:"chthes",pl:"wczoraj"},
    {gr:"πάντα",rom:"pánda",pl:"zawsze"},{gr:"ποτέ",rom:"poté",pl:"nigdy"},
    {gr:"συνήθως",rom:"siníthos",pl:"zwykle"},{gr:"ακόμα",rom:"akóma",pl:"jeszcze"},
    {gr:"ήδη",rom:"ídi",pl:"już"},{gr:"μόλις",rom:"mólis",pl:"właśnie"},
    {gr:"σε λίγο",rom:"se lígo",pl:"za chwilę"},{gr:"αμέσως",rom:"amésos",pl:"natychmiast"},
    {gr:"αργά",rom:"argá",pl:"późno/wolno"},{gr:"νωρίς",rom:"norís",pl:"wcześnie"},
    {gr:"γρήγορα",rom:"grígora",pl:"szybko"},{gr:"σιγά",rom:"sigá",pl:"cicho/powoli"},
    {gr:"πολύ",rom:"polí",pl:"bardzo/dużo"},{gr:"λίγο",rom:"lígo",pl:"trochę/mało"},
    {gr:"μόνο",rom:"móno",pl:"tylko"},{gr:"πάλι",rom:"páli",pl:"znowu"},
    {gr:"μαζί",rom:"mazí",pl:"razem"},{gr:"ίσως",rom:"ísos",pl:"może"},
    {gr:"βέβαια",rom:"vévea",pl:"oczywiście"},{gr:"σχεδόν",rom:"schedón",pl:"prawie"},
    {gr:"μάλλον",rom:"málon",pl:"raczej"},{gr:"αρκετά",rom:"arketá",pl:"dość/sporo"},
    {gr:"καθόλου",rom:"kathólu",pl:"wcale"},{gr:"τελικά",rom:"teliká",pl:"w końcu"},
    {gr:"πέρσι",rom:"pérsi",pl:"w zeszłym roku"},{gr:"φέτος",rom:"fétos",pl:"w tym roku"},
  ]},
  {title:"Pytajniki",words:[
    {gr:"τι",rom:"ti",pl:"co/jaki"},{gr:"πού",rom:"pú",pl:"gdzie"},
    {gr:"πώς",rom:"pós",pl:"jak"},{gr:"πόσο",rom:"póso",pl:"ile"},
    {gr:"πότε",rom:"póte",pl:"kiedy"},{gr:"ποιος",rom:"piós",pl:"kto/który"},
  ]},
  {title:"Czasowniki — być, mieć, robić",words:[
    {gr:"είμαι",rom:"íme",pl:"jestem"},{gr:"είναι",rom:"íne",pl:"jest/są"},
    {gr:"ήταν",rom:"ítan",pl:"był/a"},{gr:"έχω",rom:"écho",pl:"mam"},
    {gr:"κάνω",rom:"káno",pl:"robię"},{gr:"υπάρχει",rom:"ipárchi",pl:"istnieje/jest"},
  ]},
  {title:"Czasowniki — ruch",words:[
    {gr:"πάω",rom:"páo",pl:"idę"},{gr:"έρχομαι",rom:"érchome",pl:"przychodzę"},
    {gr:"φεύγω",rom:"févgo",pl:"odjeżdżam"},{gr:"μένω",rom:"méno",pl:"zostaję/mieszkam"},
    {gr:"γυρίζω",rom:"jirízo",pl:"wracam/obracam"},{gr:"φτάνω",rom:"ftáno",pl:"docierać"},
    {gr:"τρέχω",rom:"trécho",pl:"biegnę"},{gr:"περπατάω",rom:"perpatáo",pl:"chodzę/spaceruję"},
    {gr:"μπαίνω",rom:"béno",pl:"wchodzę"},{gr:"βγαίνω",rom:"vjéno",pl:"wychodzę"},
    {gr:"κάθομαι",rom:"káthome",pl:"siadam/siedzę"},{gr:"σηκώνομαι",rom:"sikónome",pl:"wstaję"},
  ]},
  {title:"Czasowniki — komunikacja",words:[
    {gr:"λέω",rom:"léo",pl:"mówię"},{gr:"μιλάω",rom:"miláo",pl:"rozmawiam"},
    {gr:"ρωτάω",rom:"rotáo",pl:"pytam"},{gr:"απαντάω",rom:"apandáo",pl:"odpowiadam"},
    {gr:"ακούω",rom:"akúo",pl:"słucham"},{gr:"φωνάζω",rom:"fonázo",pl:"krzyczę/wołam"},
    {gr:"γράφω",rom:"gráfo",pl:"piszę"},{gr:"διαβάζω",rom:"diavázo",pl:"czytam"},
    {gr:"καταλαβαίνω",rom:"katalavéno",pl:"rozumiem"},{gr:"εξηγώ",rom:"eksigó",pl:"wyjaśniam"},
    {gr:"νομίζω",rom:"nomízo",pl:"myślę/sądzę"},{gr:"ξέρω",rom:"kséro",pl:"wiem"},
    {gr:"θυμάμαι",rom:"thimáme",pl:"pamiętam"},{gr:"ξεχνάω",rom:"ksechnáo",pl:"zapominam"},
  ]},
  {title:"Czasowniki — chcieć, móc, musieć",words:[
    {gr:"θέλω",rom:"thélo",pl:"chcę"},{gr:"μπορώ",rom:"boró",pl:"mogę"},
    {gr:"πρέπει",rom:"prépi",pl:"muszę/trzeba"},{gr:"χρειάζομαι",rom:"chriázome",pl:"potrzebuję"},
    {gr:"προσπαθώ",rom:"prospathó",pl:"próbuję"},{gr:"αρχίζω",rom:"archízo",pl:"zaczynam"},
    {gr:"τελειώνω",rom:"telióno",pl:"kończę"},{gr:"συνεχίζω",rom:"sinechízo",pl:"kontynuuję"},
    {gr:"σταματάω",rom:"stamatáo",pl:"przestaję/zatrzymuję"},
    {gr:"μαθαίνω",rom:"mathéno",pl:"uczę się"},{gr:"προτιμώ",rom:"protimó",pl:"wolę"},
  ]},
  {title:"Czasowniki — codzienność",words:[
    {gr:"τρώω",rom:"tróo",pl:"jem"},{gr:"πίνω",rom:"píno",pl:"piję"},
    {gr:"κοιμάμαι",rom:"kimáme",pl:"śpię"},{gr:"ξυπνάω",rom:"ksipnáo",pl:"budzę się"},
    {gr:"δουλεύω",rom:"dulévo",pl:"pracuję"},{gr:"πληρώνω",rom:"pliróno",pl:"płacę"},
    {gr:"αγοράζω",rom:"agorázo",pl:"kupuję"},{gr:"βλέπω",rom:"vlépo",pl:"widzę/oglądam"},
    {gr:"παίρνω",rom:"pérno",pl:"biorę"},{gr:"δίνω",rom:"díno",pl:"daję"},
    {gr:"βρίσκω",rom:"vrísko",pl:"znajduję"},{gr:"χάνω",rom:"cháno",pl:"gubię/tracę"},
    {gr:"ανοίγω",rom:"anígo",pl:"otwieram"},{gr:"κλείνω",rom:"klíno",pl:"zamykam"},
    {gr:"φέρνω",rom:"férno",pl:"przynoszę"},{gr:"στέλνω",rom:"stélno",pl:"wysyłam"},
    {gr:"βοηθάω",rom:"voitháo",pl:"pomagam"},{gr:"περιμένω",rom:"periméno",pl:"czekam"},
    {gr:"μαγειρεύω",rom:"majirévo",pl:"gotuję"},{gr:"πλένω",rom:"pléno",pl:"myję"},
    {gr:"φορώ/φοράω",rom:"foró/foráo",pl:"noszę (ubranie)"},{gr:"οδηγώ",rom:"odigó",pl:"prowadzę (auto)"},
  ]},
  {title:"Czasowniki — emocje i relacje",words:[
    {gr:"αγαπώ",rom:"agapó",pl:"kocham"},{gr:"αρέσω",rom:"aréso",pl:"podobam się"},
    {gr:"φοβάμαι",rom:"fováme",pl:"boję się"},{gr:"ελπίζω",rom:"elpízo",pl:"mam nadzieję"},
    {gr:"χαίρομαι",rom:"chérome",pl:"cieszę się"},{gr:"στεναχωριέμαι",rom:"stenachoriéme",pl:"smucę się"},
    {gr:"νιώθω",rom:"nióth",pl:"czuję"},{gr:"φαίνεται",rom:"fénete",pl:"wydaje się"},
    {gr:"ζω",rom:"zo",pl:"żyję"},{gr:"πεθαίνω",rom:"pethéno",pl:"umieram"},
    {gr:"γεννιέμαι",rom:"jeniéme",pl:"rodzę się"},{gr:"παντρεύομαι",rom:"pandrévome",pl:"żenię się"},
  ]},
  {title:"Rzeczowniki — ludzie",words:[
    {gr:"ο άνθρωπος",rom:"o ánthropos",pl:"człowiek"},{gr:"ο άντρας",rom:"o ándras",pl:"mężczyzna"},
    {gr:"η γυναίκα",rom:"i jinéka",pl:"kobieta"},{gr:"το παιδί",rom:"to pedí",pl:"dziecko"},
    {gr:"ο φίλος/η",rom:"o fílos/i",pl:"przyjaciel/ka"},{gr:"ο κόσμος",rom:"o kózmos",pl:"świat/ludzie"},
    {gr:"η κοπέλα",rom:"i kopéla",pl:"dziewczyna"},{gr:"ο κύριος",rom:"o kírios",pl:"pan"},
    {gr:"η κυρία",rom:"i kiría",pl:"pani"},{gr:"ο γείτονας",rom:"o jítonas",pl:"sąsiad"},
  ]},
  {title:"Rzeczowniki — czas i miejsce",words:[
    {gr:"η μέρα",rom:"i méra",pl:"dzień"},{gr:"η νύχτα",rom:"i níchta",pl:"noc"},
    {gr:"η ώρα",rom:"i óra",pl:"godzina"},{gr:"ο χρόνος",rom:"o chrónos",pl:"rok/czas"},
    {gr:"η εβδομάδα",rom:"i evdomáda",pl:"tydzień"},{gr:"ο μήνας",rom:"o mínas",pl:"miesiąc"},
    {gr:"το πρωί",rom:"to proí",pl:"rano"},{gr:"το βράδυ",rom:"to vrádi",pl:"wieczór"},
    {gr:"το μεσημέρι",rom:"to mesimérí",pl:"południe"},
    {gr:"ο τόπος",rom:"o tópos",pl:"miejsce"},{gr:"ο δρόμος",rom:"o drómos",pl:"droga/ulica"},
    {gr:"η πόλη",rom:"i póli",pl:"miasto"},{gr:"η χώρα",rom:"i chóra",pl:"kraj"},
    {gr:"η θάλασσα",rom:"i thálasa",pl:"morze"},{gr:"το βουνό",rom:"to vunó",pl:"góra"},
    {gr:"η πλατεία",rom:"i platía",pl:"plac"},{gr:"η εκκλησία",rom:"i eklisía",pl:"kościół"},
  ]},
  {title:"Rzeczowniki — życie codzienne",words:[
    {gr:"η ζωή",rom:"i zoí",pl:"życie"},{gr:"η δουλειά",rom:"i duliá",pl:"praca"},
    {gr:"το σχολείο",rom:"to scholío",pl:"szkoła"},{gr:"το νερό",rom:"to neró",pl:"woda"},
    {gr:"ο καφές",rom:"o kafés",pl:"kawa"},{gr:"το φαγητό",rom:"to fajitó",pl:"jedzenie"},
    {gr:"η μπίρα",rom:"i bíra",pl:"piwo"},{gr:"το κρασί",rom:"to krasí",pl:"wino"},
    {gr:"τα λεφτά",rom:"ta leftá",pl:"pieniądze"},{gr:"η τιμή",rom:"i timí",pl:"cena"},
    {gr:"το εισιτήριο",rom:"to isitírio",pl:"bilet"},{gr:"ο λογαριασμός",rom:"o logariazmós",pl:"rachunek"},
    {gr:"η τσάντα",rom:"i tsánda",pl:"torba"},{gr:"το κινητό",rom:"to kinitó",pl:"telefon komórkowy"},
    {gr:"η φωτογραφία",rom:"i fotografía",pl:"zdjęcie"},{gr:"η αλήθεια",rom:"i alíthia",pl:"prawda"},
    {gr:"το πρόβλημα",rom:"to próvlima",pl:"problem"},{gr:"η ιδέα",rom:"i idéa",pl:"pomysł"},
    {gr:"ο τρόπος",rom:"o trópos",pl:"sposób"},{gr:"ο λόγος",rom:"o lógos",pl:"powód/słowo"},
    {gr:"η φορά",rom:"i forá",pl:"raz"},{gr:"το πράγμα",rom:"to prágma",pl:"rzecz"},
  ]},
  {title:"Rzeczowniki — ciało i zdrowie",words:[
    {gr:"η καρδιά",rom:"i kardiá",pl:"serce"},{gr:"το κεφάλι",rom:"to kefáli",pl:"głowa"},
    {gr:"το χέρι",rom:"to chéri",pl:"ręka"},{gr:"το πόδι",rom:"to pódi",pl:"noga"},
    {gr:"τα μάτια",rom:"ta mátia",pl:"oczy"},{gr:"ο πόνος",rom:"o pónos",pl:"ból"},
    {gr:"ο γιατρός",rom:"o jatrós",pl:"lekarz"},{gr:"το φάρμακο",rom:"to fármako",pl:"lek"},
  ]},
  {title:"Przymiotniki",words:[
    {gr:"καλός",rom:"kalós",pl:"dobry"},{gr:"κακός",rom:"kakós",pl:"zły"},
    {gr:"μεγάλος",rom:"megálos",pl:"duży/wielki"},{gr:"μικρός",rom:"mikrós",pl:"mały"},
    {gr:"νέος",rom:"néos",pl:"nowy/młody"},{gr:"παλιός",rom:"paliós",pl:"stary"},
    {gr:"ωραίος",rom:"oréos",pl:"ładny"},{gr:"όμορφος",rom:"ómorfos",pl:"piękny"},
    {gr:"δυνατός",rom:"dinatós",pl:"silny/głośny"},{gr:"εύκολος",rom:"éfkolos",pl:"łatwy"},
    {gr:"δύσκολος",rom:"dískolos",pl:"trudny"},{gr:"γρήγορος",rom:"grígoros",pl:"szybki"},
    {gr:"αργός",rom:"argós",pl:"wolny/późny"},{gr:"ακριβός",rom:"akrivós",pl:"drogi"},
    {gr:"φτηνός",rom:"ftinós",pl:"tani"},{gr:"ζεστός",rom:"zestós",pl:"gorący"},
    {gr:"κρύος",rom:"kríos",pl:"zimny"},{gr:"σωστός",rom:"sostós",pl:"poprawny"},
    {gr:"λάθος",rom:"láthos",pl:"błędny/błąd"},{gr:"έτοιμος",rom:"étimos",pl:"gotowy"},
    {gr:"ελεύθερος",rom:"eléftheros",pl:"wolny"},{gr:"σημαντικός",rom:"simandikós",pl:"ważny"},
    {gr:"επόμενος",rom:"epómenos",pl:"następny"},{gr:"τελευταίος",rom:"teleftéos",pl:"ostatni"},
    {gr:"πρώτος",rom:"prótos",pl:"pierwszy"},{gr:"ίδιος",rom:"ídios",pl:"ten sam"},
    {gr:"μόνος",rom:"mónos",pl:"sam/samotny"},{gr:"ξένος",rom:"ksénos",pl:"obcy/zagraniczny"},
    {gr:"αληθινός",rom:"alithinós",pl:"prawdziwy"},{gr:"κάθε",rom:"káthe",pl:"każdy"},
  ]},
  {title:"Reakcje i wyrażenia",words:[
    {gr:"ναι",rom:"ne",pl:"tak"},{gr:"όχι",rom:"óchi",pl:"nie"},
    {gr:"εντάξει",rom:"endáksi",pl:"OK"},{gr:"ευχαριστώ",rom:"efcharistó",pl:"dziękuję"},
    {gr:"παρακαλώ",rom:"parakaló",pl:"proszę"},{gr:"συγγνώμη",rom:"signómi",pl:"przepraszam"},
    {gr:"καλά",rom:"kalá",pl:"dobrze"},{gr:"ωραία",rom:"oréa",pl:"ładnie/fajnie"},
    {gr:"τέλεια",rom:"téleia",pl:"świetnie"},{gr:"σωστά",rom:"sostá",pl:"zgadza się"},
    {gr:"βέβαια",rom:"vévea",pl:"oczywiście"},{gr:"μακάρι",rom:"makári",pl:"oby"},
    {gr:"έλα",rom:"éla",pl:"chodź/no dawaj"},{gr:"πάμε",rom:"páme",pl:"chodźmy"},
    {gr:"περίμενε",rom:"perímene",pl:"poczekaj"},{gr:"κοίτα",rom:"kíta",pl:"patrz"},
    {gr:"σταμάτα",rom:"stamáta",pl:"przestań/stop"},{gr:"φυσικά",rom:"fisiká",pl:"naturalnie"},
    {gr:"δηλαδή",rom:"diladí",pl:"to znaczy/czyli"},{gr:"εννοώ",rom:"enoó",pl:"mam na myśli"},
  ]},
  {title:"Rzeczowniki — jedzenie i napoje",words:[
    {gr:"καφές",rom:"kafés",pl:"kawa"},{gr:"τσάι",rom:"tsái",pl:"herbata"},{gr:"μπίρα",rom:"bíra",pl:"piwo"},
    {gr:"κρασί",rom:"krasí",pl:"wino"},{gr:"χυμός",rom:"chimós",pl:"sok"},{gr:"γάλα",rom:"gála",pl:"mleko"},
    {gr:"ψωμί",rom:"psomí",pl:"chleb"},{gr:"τυρί",rom:"tirí",pl:"ser"},{gr:"κρέας",rom:"kréas",pl:"mięso"},
    {gr:"κοτόπουλο",rom:"kotópulo",pl:"kurczak"},{gr:"ψάρι",rom:"psári",pl:"ryba"},
    {gr:"αυγό",rom:"avgó",pl:"jajko"},{gr:"σαλάτα",rom:"saláta",pl:"sałatka"},
    {gr:"λάδι",rom:"ládi",pl:"oliwa"},{gr:"αλάτι",rom:"aláti",pl:"sól"},{gr:"πιπέρι",rom:"pipéri",pl:"pieprz"},
    {gr:"ζάχαρη",rom:"záchari",pl:"cukier"},{gr:"παγωτό",rom:"pagotó",pl:"lody"},
    {gr:"φρούτο",rom:"frúto",pl:"owoc"},{gr:"λαχανικά",rom:"lachaniká",pl:"warzywa"},
    {gr:"ντομάτα",rom:"domáta",pl:"pomidor"},{gr:"πατάτα",rom:"patáta",pl:"ziemniak"},
    {gr:"ελιά",rom:"eliá",pl:"oliwka"},{gr:"μήλο",rom:"mílo",pl:"jabłko"},{gr:"λεμόνι",rom:"lemóni",pl:"cytryna"},
  ]},
  {title:"Rzeczowniki — transport i podróże",words:[
    {gr:"αεροπλάνο",rom:"aeropláno",pl:"samolot"},{gr:"τρένο",rom:"tréno",pl:"pociąg"},
    {gr:"πλοίο",rom:"plío",pl:"statek"},{gr:"ταξί",rom:"taksí",pl:"taksówka"},
    {gr:"μηχανή",rom:"michaní",pl:"motocykl"},{gr:"ποδήλατο",rom:"podílato",pl:"rower"},
    {gr:"στάση",rom:"stási",pl:"przystanek"},{gr:"σταθμός",rom:"stathmós",pl:"stacja"},
    {gr:"πτήση",rom:"ptísi",pl:"lot"},{gr:"βαλίτσα",rom:"valítsa",pl:"walizka"},
    {gr:"διαβατήριο",rom:"diavatírio",pl:"paszport"},{gr:"χάρτης",rom:"cháris",pl:"mapa"},
    {gr:"δωμάτιο",rom:"domátio",pl:"pokój"},{gr:"κλειδί",rom:"klidí",pl:"klucz"},
    {gr:"λογαριασμός",rom:"logariazmós",pl:"rachunek"},{gr:"τιμή",rom:"timí",pl:"cena"},
  ]},
  {title:"Rzeczowniki — praca i edukacja",words:[
    {gr:"εργασία",rom:"ergasía",pl:"praca/zadanie"},{gr:"γραφείο",rom:"grafío",pl:"biuro"},
    {gr:"υπολογιστής",rom:"ipologistís",pl:"komputer"},{gr:"κινητό",rom:"kinitó",pl:"komórka"},
    {gr:"μάθημα",rom:"máthima",pl:"lekcja"},{gr:"εξέταση",rom:"eksétasi",pl:"egzamin"},
    {gr:"πανεπιστήμιο",rom:"panepistímio",pl:"uniwersytet"},{gr:"πτυχίο",rom:"ptichío",pl:"dyplom"},
    {gr:"συνάδελφος",rom:"sinádelfos",pl:"kolega z pracy"},{gr:"αφεντικό",rom:"afendikó",pl:"szef"},
    {gr:"μισθός",rom:"misthós",pl:"pensja"},{gr:"συνέντευξη",rom:"sinéndefksi",pl:"rozmowa kwalifikacyjna"},
  ]},
  {title:"Rzeczowniki — natura i pogoda",words:[
    {gr:"δέντρο",rom:"déndro",pl:"drzewo"},{gr:"λουλούδι",rom:"lulúdi",pl:"kwiat"},
    {gr:"ζώο",rom:"zóo",pl:"zwierzę"},{gr:"σκύλος",rom:"skílos",pl:"pies"},
    {gr:"γάτα",rom:"gáta",pl:"kot"},{gr:"πουλί",rom:"pulí",pl:"ptak"},
    {gr:"ήλιος",rom:"ílios",pl:"słońce"},{gr:"φεγγάρι",rom:"fengári",pl:"księżyc"},
    {gr:"αστέρι",rom:"astéri",pl:"gwiazda"},{gr:"σύννεφο",rom:"sínefo",pl:"chmura"},
    {gr:"χιόνι",rom:"chióni",pl:"śnieg"},{gr:"αέρας",rom:"aéras",pl:"wiatr"},
    {gr:"φωτιά",rom:"fotiá",pl:"ogień"},{gr:"νησί",rom:"nisí",pl:"wyspa"},
  ]},
  {title:"Czasowniki — dodatkowe codzienne",words:[
    {gr:"πληρώνω",rom:"pliróno",pl:"płacę"},{gr:"αγοράζω",rom:"agorázo",pl:"kupuję"},
    {gr:"πουλάω",rom:"puláo",pl:"sprzedaję"},{gr:"μαγειρεύω",rom:"majirévo",pl:"gotuję"},
    {gr:"καθαρίζω",rom:"katharízo",pl:"czyszczę"},{gr:"πλένω",rom:"pléno",pl:"myję"},
    {gr:"οδηγώ",rom:"odigó",pl:"prowadzę (auto)"},{gr:"ταξιδεύω",rom:"taksidévo",pl:"podróżuję"},
    {gr:"κολυμπάω",rom:"kolimbáo",pl:"pływam"},{gr:"τρέχω",rom:"trécho",pl:"biegnę"},
    {gr:"περπατάω",rom:"perpatáo",pl:"spaceruję"},{gr:"χορεύω",rom:"chorévo",pl:"tańczę"},
    {gr:"τραγουδάω",rom:"tragudáo",pl:"śpiewam"},{gr:"φωτογραφίζω",rom:"fotografízo",pl:"fotografuję"},
    {gr:"δοκιμάζω",rom:"dokimázo",pl:"próbuję/przymierzam"},{gr:"χρησιμοποιώ",rom:"chrisimopió",pl:"używam"},
    {gr:"σκέφτομαι",rom:"skéftome",pl:"myślę"},{gr:"ονειρεύομαι",rom:"onirévome",pl:"marzę/śnię"},
    {gr:"κοιμάμαι",rom:"kimáme",pl:"śpię"},{gr:"ξυπνάω",rom:"ksipnáo",pl:"budzę się"},
    {gr:"ντύνομαι",rom:"dínome",pl:"ubieram się"},{gr:"βγαίνω",rom:"vjéno",pl:"wychodzę"},
    {gr:"μπαίνω",rom:"béno",pl:"wchodzę"},{gr:"γυρίζω",rom:"jirízo",pl:"wracam/obracam"},
    {gr:"σπουδάζω",rom:"spudázo",pl:"studiuję"},{gr:"συμφωνώ",rom:"simfonó",pl:"zgadzam się"},
    {gr:"διαφωνώ",rom:"diafonó",pl:"nie zgadzam się"},{gr:"ζω",rom:"zo",pl:"żyję"},
    {gr:"γεννιέμαι",rom:"jeniéme",pl:"rodzę się"},{gr:"πεθαίνω",rom:"pethéno",pl:"umieram"},
  ]},
  {title:"Kolory",words:[
    {gr:"κόκκινο",rom:"kókino",pl:"czerwony"},{gr:"μπλε",rom:"ble",pl:"niebieski"},
    {gr:"πράσινο",rom:"prásino",pl:"zielony"},{gr:"κίτρινο",rom:"kítrino",pl:"żółty"},
    {gr:"άσπρο",rom:"áspro",pl:"biały"},{gr:"μαύρο",rom:"mávro",pl:"czarny"},
    {gr:"πορτοκαλί",rom:"portokalí",pl:"pomarańczowy"},{gr:"ροζ",rom:"roz",pl:"różowy"},
    {gr:"γκρι",rom:"gri",pl:"szary"},{gr:"καφέ",rom:"kafé",pl:"brązowy"},
  ]},
  {title:"Przymiotniki — dodatkowe",words:[
    {gr:"ωραίος",rom:"oréos",pl:"ładny"},{gr:"άσχημος",rom:"áschimos",pl:"brzydki"},
    {gr:"τρελός",rom:"trelós",pl:"szalony"},{gr:"έξυπνος",rom:"éksipnos",pl:"mądry"},
    {gr:"χαζός",rom:"chazós",pl:"głupi"},{gr:"αστείος",rom:"astíos",pl:"zabawny"},
    {gr:"βαρετός",rom:"varetós",pl:"nudny"},{gr:"ενδιαφέρον",rom:"endiaféron",pl:"interesujący"},
    {gr:"φοβερός",rom:"foverós",pl:"niesamowity"},{gr:"τέλειος",rom:"télios",pl:"idealny"},
    {gr:"απαραίτητος",rom:"aparétitos",pl:"niezbędny"},{gr:"πιθανός",rom:"pithanós",pl:"prawdopodobny"},
    {gr:"περίεργος",rom:"períergos",pl:"dziwny/ciekawski"},{gr:"ικανοποιημένος",rom:"ikanopiménos",pl:"zadowolony"},
    {gr:"ευγενικός",rom:"evjenikós",pl:"uprzejmy"},{gr:"αγενής",rom:"ajenís",pl:"niegrzeczny"},
  ]},
  {title:"Liczby jako słowa",words:[
    {gr:"ένα",rom:"éna",pl:"1"},{gr:"δύο",rom:"dío",pl:"2"},{gr:"τρία",rom:"tría",pl:"3"},
    {gr:"τέσσερα",rom:"tésera",pl:"4"},{gr:"πέντε",rom:"pénde",pl:"5"},{gr:"έξι",rom:"éksi",pl:"6"},
    {gr:"εφτά",rom:"eftá",pl:"7"},{gr:"οχτώ",rom:"ochtó",pl:"8"},{gr:"εννιά",rom:"eniá",pl:"9"},
    {gr:"δέκα",rom:"déka",pl:"10"},{gr:"είκοσι",rom:"íkosi",pl:"20"},{gr:"τριάντα",rom:"triánda",pl:"30"},
    {gr:"πενήντα",rom:"peínda",pl:"50"},{gr:"εκατό",rom:"ekató",pl:"100"},{gr:"χίλια",rom:"chília",pl:"1000"},
  ]},
];

/* ===== VERB DRILL DATA ===== */
const drillVerbs = [
  {inf:"είμαι",pl:"być",forms:{εγώ:"είμαι",εσύ:"είσαι","αυτός/ή":"είναι",εμείς:"είμαστε",εσείς:"είστε","αυτοί/ές":"είναι"}},
  {inf:"έχω",pl:"mieć",forms:{εγώ:"έχω",εσύ:"έχεις","αυτός/ή":"έχει",εμείς:"έχουμε",εσείς:"έχετε","αυτοί/ές":"έχουν"}},
  {inf:"θέλω",pl:"chcieć",forms:{εγώ:"θέλω",εσύ:"θέλεις","αυτός/ή":"θέλει",εμείς:"θέλουμε",εσείς:"θέλετε","αυτοί/ές":"θέλουν"}},
  {inf:"μιλάω",pl:"mówić",forms:{εγώ:"μιλάω",εσύ:"μιλάς","αυτός/ή":"μιλάει",εμείς:"μιλάμε",εσείς:"μιλάτε","αυτοί/ές":"μιλάνε"}},
  {inf:"μπορώ",pl:"móc",forms:{εγώ:"μπορώ",εσύ:"μπορείς","αυτός/ή":"μπορεί",εμείς:"μπορούμε",εσείς:"μπορείτε","αυτοί/ές":"μπορούν"}},
  {inf:"πάω",pl:"iść",forms:{εγώ:"πάω",εσύ:"πας","αυτός/ή":"πάει",εμείς:"πάμε",εσείς:"πάτε","αυτοί/ές":"πάνε"}},
  {inf:"κάνω",pl:"robić",forms:{εγώ:"κάνω",εσύ:"κάνεις","αυτός/ή":"κάνει",εμείς:"κάνουμε",εσείς:"κάνετε","αυτοί/ές":"κάνουν"}},
  {inf:"ξέρω",pl:"wiedzieć",forms:{εγώ:"ξέρω",εσύ:"ξέρεις","αυτός/ή":"ξέρει",εμείς:"ξέρουμε",εσείς:"ξέρετε","αυτοί/ές":"ξέρουν"}},
];

const readingLevels = [
  {
    level: 1, title: "Słowa", desc: "Pojedyncze słowa — fundament",
    items: [
      { gr:"ναι", syllables:["ναι"], rom:["ne"], pl:"tak" },
      { gr:"όχι", syllables:["ό","χι"], rom:["ó","chi"], pl:"nie" },
      { gr:"νερό", syllables:["νε","ρό"], rom:["ne","ró"], pl:"woda" },
      { gr:"καφές", syllables:["κα","φές"], rom:["ka","fés"], pl:"kawa" },
      { gr:"ψωμί", syllables:["ψω","μί"], rom:["pso","mí"], pl:"chleb" },
      { gr:"γάλα", syllables:["γά","λα"], rom:["gá","la"], pl:"mleko" },
      { gr:"σπίτι", syllables:["σπί","τι"], rom:["spí","ti"], pl:"dom" },
      { gr:"θάλασσα", syllables:["θά","λα","σσα"], rom:["thá","la","sa"], pl:"morze" },
      { gr:"φίλος", syllables:["φί","λος"], rom:["fí","los"], pl:"przyjaciel" },
      { gr:"ουρανός", syllables:["ου","ρα","νός"], rom:["u","ra","nós"], pl:"niebo" },
      { gr:"γυναίκα", syllables:["γυ","ναί","κα"], rom:["ji","né","ka"], pl:"kobieta" },
      { gr:"άντρας", syllables:["ά","ντρας"], rom:["á","ndras"], pl:"mężczyzna" },
      { gr:"παιδί", syllables:["παι","δί"], rom:["pe","dí"], pl:"dziecko" },
      { gr:"δρόμος", syllables:["δρό","μος"], rom:["dró","mos"], pl:"droga/ulica" },
      { gr:"φαγητό", syllables:["φα","γη","τό"], rom:["fa","ji","tó"], pl:"jedzenie" },
      { gr:"δουλειά", syllables:["δου","λειά"], rom:["du","liá"], pl:"praca" },
      { gr:"αγάπη", syllables:["α","γά","πη"], rom:["a","gá","pi"], pl:"miłość" },
      { gr:"ελευθερία", syllables:["ε","λευ","θε","ρί","α"], rom:["e","lef","the","rí","a"], pl:"wolność" },
    ],
  },
  {
    level: 2, title: "Wyrażenia", desc: "Dwa–trzy słowa razem",
    items: [
      { gr:"καλημέρα σας", syllables:["κα","λη","μέ","ρα"," ","σας"], rom:["ka","li","mé","ra"," ","sas"], pl:"dzień dobry (formalnie)" },
      { gr:"τι κάνεις;", syllables:["τι"," ","κά","νεις;"], rom:["ti"," ","ká","nis?"], pl:"jak się masz?" },
      { gr:"είμαι καλά", syllables:["εί","μαι"," ","κα","λά"], rom:["í","me"," ","ka","lá"], pl:"mam się dobrze" },
      { gr:"ένα νερό", syllables:["έ","να"," ","νε","ρό"], rom:["é","na"," ","ne","ró"], pl:"jedna woda" },
      { gr:"πολύ ωραία", syllables:["πο","λύ"," ","ω","ραί","α"], rom:["po","lí"," ","o","ré","a"], pl:"bardzo ładnie" },
      { gr:"με λένε...", syllables:["με"," ","λέ","νε"], rom:["me"," ","lé","ne"], pl:"nazywam się..." },
      { gr:"πού είναι;", syllables:["πού"," ","εί","ναι;"], rom:["pú"," ","í","ne?"], pl:"gdzie jest?" },
      { gr:"δεν ξέρω", syllables:["δεν"," ","ξέ","ρω"], rom:["den"," ","ksé","ro"], pl:"nie wiem" },
      { gr:"μου αρέσει", syllables:["μου"," ","α","ρέ","σει"], rom:["mu"," ","a","ré","si"], pl:"podoba mi się" },
      { gr:"πόσο κάνει;", syllables:["πό","σο"," ","κά","νει;"], rom:["pó","so"," ","ká","ni?"], pl:"ile kosztuje?" },
      { gr:"κάνει ζέστη", syllables:["κά","νει"," ","ζέ","στη"], rom:["ká","ni"," ","zé","sti"], pl:"jest gorąco" },
      { gr:"δεν πειράζει", syllables:["δεν"," ","πει","ρά","ζει"], rom:["den"," ","pi","rá","zi"], pl:"nie szkodzi" },
      { gr:"μία στιγμή", syllables:["μί","α"," ","στι","γμή"], rom:["mí","a"," ","sti","gmí"], pl:"chwileczkę" },
      { gr:"τι ώρα είναι;", syllables:["τι"," ","ώ","ρα"," ","εί","ναι;"], rom:["ti"," ","ó","ra"," ","í","ne?"], pl:"która godzina?" },
    ],
  },
  {
    level: 3, title: "Kawiarnia", desc: "Zamawianie, pytanie, płacenie",
    items: [
      { gr:"Θα ήθελα έναν καφέ, παρακαλώ.", syllables:["Θα"," ","ή","θε","λα"," ","έ","ναν"," ","κα","φέ,"," ","πα","ρα","κα","λώ."], rom:["Tha"," ","í","the","la"," ","é","nan"," ","ka","fé,"," ","pa","ra","ka","ló."], pl:"Chciałbym kawę, proszę." },
      { gr:"Έναν ελληνικό μέτριο.", syllables:["Έ","ναν"," ","ε","λλη","νι","κό"," ","μέ","τρι","ο."], rom:["É","nan"," ","e","li","ni","kó"," ","mé","tri","o."], pl:"Grecką kawę średnio słodką." },
      { gr:"Έχετε κρύο νερό;", syllables:["Έ","χε","τε"," ","κρύ","ο"," ","νε","ρό;"], rom:["É","che","te"," ","krí","o"," ","ne","ró?"], pl:"Czy macie zimną wodę?" },
      { gr:"Τι μου προτείνετε;", syllables:["Τι"," ","μου"," ","προ","τεί","νε","τε;"], rom:["Ti"," ","mu"," ","pro","tí","ne","te?"], pl:"Co mi polecacie?" },
      { gr:"Τον λογαριασμό, παρακαλώ.", syllables:["Τον"," ","λο","γα","ρια","σμό,"," ","πα","ρα","κα","λώ."], rom:["Ton"," ","lo","ga","ria","zmó,"," ","pa","ra","ka","ló."], pl:"Rachunek, proszę." },
      { gr:"Μαζί ή χώρια;", syllables:["Μα","ζί"," ","ή"," ","χώ","ρια;"], rom:["Ma","zí"," ","í"," ","chó","ria?"], pl:"Razem czy osobno?" },
      { gr:"Είναι πολύ νόστιμο!", syllables:["Εί","ναι"," ","πο","λύ"," ","νό","στι","μο!"], rom:["Í","ne"," ","po","lí"," ","nó","sti","mo!"], pl:"Jest bardzo smaczne!" },
      { gr:"Δέχεστε κάρτα;", syllables:["Δέ","χε","στε"," ","κάρ","τα;"], rom:["Dé","che","ste"," ","kár","ta?"], pl:"Przyjmujecie kartę?" },
    ],
  },
  {
    level: 4, title: "Na ulicy", desc: "Kierunki, transport, zakupy",
    items: [
      { gr:"Πού είναι το μετρό;", syllables:["Πού"," ","εί","ναι"," ","το"," ","με","τρό;"], rom:["Pú"," ","í","ne"," ","to"," ","me","tró?"], pl:"Gdzie jest metro?" },
      { gr:"Πάρτε δεξιά και μετά ευθεία.", syllables:["Πάρ","τε"," ","δε","ξιά"," ","και"," ","με","τά"," ","ευ","θεί","α."], rom:["Pár","te"," ","de","ksiá"," ","ke"," ","me","tá"," ","ef","thí","a."], pl:"Skręćcie w prawo i potem prosto." },
      { gr:"Είναι πολύ κοντά, πέντε λεπτά.", syllables:["Εί","ναι"," ","πο","λύ"," ","κο","ντά,"," ","πέ","ντε"," ","λε","πτά."], rom:["Í","ne"," ","po","lí"," ","ko","ndá,"," ","pé","nde"," ","le","ptá."], pl:"Jest bardzo blisko, pięć minut." },
      { gr:"Πόσο κοστίζει ένα εισιτήριο;", syllables:["Πό","σο"," ","κο","στί","ζει"," ","έ","να"," ","ει","σι","τή","ριο;"], rom:["Pó","so"," ","ko","stí","zi"," ","é","na"," ","i","si","tí","rio?"], pl:"Ile kosztuje bilet?" },
      { gr:"Θέλω να πάω στο αεροδρόμιο.", syllables:["Θέ","λω"," ","να"," ","πά","ω"," ","στο"," ","α","ε","ρο","δρό","μιο."], rom:["Thé","lo"," ","na"," ","pá","o"," ","sto"," ","a","e","ro","dró","mio."], pl:"Chcę jechać na lotnisko." },
      { gr:"Υπάρχει φαρμακείο εδώ κοντά;", syllables:["Υ","πάρ","χει"," ","φαρ","μα","κεί","ο"," ","ε","δώ"," ","κο","ντά;"], rom:["I","pár","chi"," ","far","ma","kí","o"," ","e","dó"," ","ko","ndá?"], pl:"Czy jest apteka tu blisko?" },
      { gr:"Τι ώρα φεύγει το λεωφορείο;", syllables:["Τι"," ","ώ","ρα"," ","φεύ","γει"," ","το"," ","λε","ω","φο","ρεί","ο;"], rom:["Ti"," ","ó","ra"," ","fév","ji"," ","to"," ","le","o","fo","rí","o?"], pl:"O której odjeżdża autobus?" },
      { gr:"Μπορώ να πληρώσω σε ευρώ;", syllables:["Μπο","ρώ"," ","να"," ","πλη","ρώ","σω"," ","σε"," ","ευ","ρώ;"], rom:["Bo","ró"," ","na"," ","pli","ró","so"," ","se"," ","ev","ró?"], pl:"Czy mogę zapłacić w euro?" },
    ],
  },
  {
    level: 5, title: "Spotkania", desc: "Przedstawianie się, small talk, plany",
    items: [
      { gr:"Πώς σε λένε; Με λένε Μαρία.", syllables:["Πώς"," ","σε"," ","λέ","νε;"," ","Με"," ","λέ","νε"," ","Μα","ρί","α."], rom:["Pos"," ","se"," ","lé","ne?"," ","Me"," ","lé","ne"," ","Ma","rí","a."], pl:"Jak masz na imię? Nazywam się Maria." },
      { gr:"Είμαι από την Πολωνία.", syllables:["Εί","μαι"," ","α","πό"," ","την"," ","Πο","λω","νί","α."], rom:["Í","me"," ","a","pó"," ","tin"," ","Po","lo","ní","a."], pl:"Jestem z Polski." },
      { gr:"Μιλάω λίγο ελληνικά.", syllables:["Μι","λά","ω"," ","λί","γο"," ","ε","λλη","νι","κά."], rom:["Mi","lá","o"," ","lí","go"," ","e","li","ni","ká."], pl:"Mówię trochę po grecku." },
      { gr:"Τι δουλειά κάνεις;", syllables:["Τι"," ","δου","λειά"," ","κά","νεις;"], rom:["Ti"," ","du","liá"," ","ká","nis?"], pl:"Czym się zajmujesz?" },
      { gr:"Είσαι ελεύθερη απόψε;", syllables:["Εί","σαι"," ","ε","λεύ","θε","ρη"," ","α","πό","ψε;"], rom:["Í","se"," ","e","léf","the","ri"," ","a","pó","pse?"], pl:"Jesteś wolna dziś wieczorem?" },
      { gr:"Πάμε να φάμε κάτι μαζί!", syllables:["Πά","με"," ","να"," ","φά","με"," ","κά","τι"," ","μα","ζί!"], rom:["Pá","me"," ","na"," ","fá","me"," ","ká","ti"," ","ma","zí!"], pl:"Chodźmy coś zjeść razem!" },
      { gr:"Χάρηκα πολύ που σε γνώρισα.", syllables:["Χά","ρη","κα"," ","πο","λύ"," ","που"," ","σε"," ","γνώ","ρι","σα."], rom:["Chá","ri","ka"," ","po","lí"," ","pu"," ","se"," ","gnó","ri","sa."], pl:"Bardzo mi miło, że cię poznałem." },
      { gr:"Θα σε πάρω τηλέφωνο αύριο.", syllables:["Θα"," ","σε"," ","πά","ρω"," ","τη","λέ","φω","νο"," ","αύ","ριο."], rom:["Tha"," ","se"," ","pá","ro"," ","ti","lé","fo","no"," ","áv","rio."], pl:"Zadzwonię do ciebie jutro." },
    ],
  },
  {
    level: 6, title: "Hotel", desc: "Rezerwacja, meldowanie, problemy",
    items: [
      { gr:"Έχετε ελεύθερο δωμάτιο;", syllables:["Έ","χε","τε"," ","ε","λεύ","θε","ρο"," ","δω","μά","τιο;"], rom:["É","che","te"," ","e","léf","the","ro"," ","do","má","tio?"], pl:"Czy macie wolny pokój?" },
      { gr:"Για δύο νύχτες, παρακαλώ.", syllables:["Για"," ","δύ","ο"," ","νύ","χτες,"," ","πα","ρα","κα","λώ."], rom:["Jia"," ","dí","o"," ","ní","chtes,"," ","pa","ra","ka","ló."], pl:"Na dwie noce, proszę." },
      { gr:"Πόσο κοστίζει τη βραδιά;", syllables:["Πό","σο"," ","κο","στί","ζει"," ","τη"," ","βρα","διά;"], rom:["Pó","so"," ","ko","stí","zi"," ","ti"," ","vra","diá?"], pl:"Ile kosztuje za noc?" },
      { gr:"Το πρωινό περιλαμβάνεται;", syllables:["Το"," ","πρω","ι","νό"," ","πε","ρι","λαμ","βά","νε","ται;"], rom:["To"," ","pro","i","nó"," ","pe","ri","lam","vá","ne","te?"], pl:"Czy śniadanie jest wliczone?" },
      { gr:"Μπορώ να δω το δωμάτιο;", syllables:["Μπο","ρώ"," ","να"," ","δω"," ","το"," ","δω","μά","τιο;"], rom:["Bo","ró"," ","na"," ","do"," ","to"," ","do","má","tio?"], pl:"Czy mogę zobaczyć pokój?" },
      { gr:"Υπάρχει κλιματισμός;", syllables:["Υ","πάρ","χει"," ","κλι","μα","τι","σμός;"], rom:["I","pár","chi"," ","kli","ma","ti","zmós?"], pl:"Czy jest klimatyzacja?" },
      { gr:"Τι ώρα πρέπει να φύγουμε;", syllables:["Τι"," ","ώ","ρα"," ","πρέ","πει"," ","να"," ","φύ","γου","με;"], rom:["Ti"," ","ó","ra"," ","pré","pi"," ","na"," ","fí","gu","me?"], pl:"O której musimy się wymeldować?" },
    ],
  },
  {
    level: 7, title: "Codzienność", desc: "Pogoda, rodzina, praca, uczucia",
    items: [
      { gr:"Σήμερα κάνει πολύ ζέστη.", syllables:["Σή","με","ρα"," ","κά","νει"," ","πο","λύ"," ","ζέ","στη."], rom:["Sí","me","ra"," ","ká","ni"," ","po","lí"," ","zé","sti."], pl:"Dziś jest bardzo gorąco." },
      { gr:"Η μητέρα μου μένει στην Αθήνα.", syllables:["Η"," ","μη","τέ","ρα"," ","μου"," ","μέ","νει"," ","στην"," ","Α","θή","να."], rom:["I"," ","mi","té","ra"," ","mu"," ","mé","ni"," ","stin"," ","A","thí","na."], pl:"Moja mama mieszka w Atenach." },
      { gr:"Δουλεύω κάθε μέρα εκτός Κυριακής.", syllables:["Δου","λεύ","ω"," ","κά","θε"," ","μέ","ρα"," ","ε","κτός"," ","Κυ","ρια","κής."], rom:["Du","lé","vo"," ","ká","the"," ","mé","ra"," ","e","któs"," ","Ki","ria","kís."], pl:"Pracuję codziennie oprócz niedzieli." },
      { gr:"Η Ελλάδα είναι πολύ όμορφη χώρα.", syllables:["Η"," ","Ε","λλά","δα"," ","εί","ναι"," ","πο","λύ"," ","ό","μο","ρφη"," ","χώ","ρα."], rom:["I"," ","E","lá","da"," ","í","ne"," ","po","lí"," ","ó","mo","rfi"," ","chó","ra."], pl:"Grecja jest bardzo pięknym krajem." },
      { gr:"Χθες πήγα στη θάλασσα με φίλους.", syllables:["Χθες"," ","πή","γα"," ","στη"," ","θά","λα","σσα"," ","με"," ","φί","λους."], rom:["Chthes"," ","pí","ga"," ","sti"," ","thá","la","sa"," ","me"," ","fí","lus."], pl:"Wczoraj poszedłem na plażę z przyjaciółmi." },
      { gr:"Αύριο θα πάω στην αγορά.", syllables:["Αύ","ριο"," ","θα"," ","πά","ω"," ","στην"," ","α","γο","ρά."], rom:["Áv","rio"," ","tha"," ","pá","o"," ","stin"," ","a","go","rá."], pl:"Jutro pójdę na targ." },
      { gr:"Είμαι πολύ χαρούμενος σήμερα!", syllables:["Εί","μαι"," ","πο","λύ"," ","χα","ρού","με","νος"," ","σή","με","ρα!"], rom:["Í","me"," ","po","lí"," ","cha","rú","me","nos"," ","sí","me","ra!"], pl:"Jestem dziś bardzo szczęśliwy!" },
      { gr:"Μου αρέσει να ταξιδεύω στην Ελλάδα.", syllables:["Μου"," ","α","ρέ","σει"," ","να"," ","τα","ξι","δεύ","ω"," ","στην"," ","Ε","λλά","δα."], rom:["Mu"," ","a","ré","si"," ","na"," ","ta","ksi","dé","vo"," ","stin"," ","E","lá","da."], pl:"Lubię podróżować po Grecji." },
    ],
  },
  {
    level: 8, title: "Trudne zdania", desc: "Złożone wypowiedzi — boss level",
    items: [
      { gr:"Συγγνώμη, δεν καταλαβαίνω. Μπορείτε να μιλάτε πιο αργά;", syllables:["Συ","γγνώ","μη,"," ","δεν"," ","κα","τα","λα","βαί","νω."," ","Μπο","ρεί","τε"," ","να"," ","μι","λά","τε"," ","πιο"," ","αρ","γά;"], rom:["Si","gnó","mi,"," ","den"," ","ka","ta","la","vé","no."," ","Bo","rí","te"," ","na"," ","mi","lá","te"," ","pio"," ","ar","gá?"], pl:"Przepraszam, nie rozumiem. Czy możecie mówić wolniej?" },
      { gr:"Αν βρέχει αύριο, θα μείνω στο σπίτι.", syllables:["Αν"," ","βρέ","χει"," ","αύ","ριο,"," ","θα"," ","μεί","νω"," ","στο"," ","σπί","τι."], rom:["An"," ","vré","chi"," ","áv","rio,"," ","tha"," ","mí","no"," ","sto"," ","spí","ti."], pl:"Jeśli jutro będzie padać, zostanę w domu." },
      { gr:"Πρώτα θα φάω και μετά θα πάω για δουλειά.", syllables:["Πρώ","τα"," ","θα"," ","φά","ω"," ","και"," ","με","τά"," ","θα"," ","πά","ω"," ","για"," ","δου","λειά."], rom:["Pró","ta"," ","tha"," ","fá","o"," ","ke"," ","me","tá"," ","tha"," ","pá","o"," ","jia"," ","du","liá."], pl:"Najpierw zjem, a potem pójdę do pracy." },
      { gr:"Θέλω να μάθω ελληνικά γιατί αγαπώ την Ελλάδα.", syllables:["Θέ","λω"," ","να"," ","μά","θω"," ","ε","λλη","νι","κά"," ","για","τί"," ","α","γα","πώ"," ","την"," ","Ε","λλά","δα."], rom:["Thé","lo"," ","na"," ","má","tho"," ","e","li","ni","ká"," ","jia","tí"," ","a","ga","pó"," ","tin"," ","E","lá","da."], pl:"Chcę się nauczyć greckiego, bo kocham Grecję." },
      { gr:"Μπορείτε να μου πείτε πού είναι το πιο κοντινό νοσοκομείο;", syllables:["Μπο","ρεί","τε"," ","να"," ","μου"," ","πεί","τε"," ","πού"," ","εί","ναι"," ","το"," ","πιο"," ","κο","ντι","νό"," ","νο","σο","κο","μεί","ο;"], rom:["Bo","rí","te"," ","na"," ","mu"," ","pí","te"," ","pú"," ","í","ne"," ","to"," ","pio"," ","ko","ndi","nó"," ","no","so","ko","mí","o?"], pl:"Czy możecie mi powiedzieć, gdzie jest najbliższy szpital?" },
      { gr:"Περνάω πολύ ωραία στην Ελλάδα, δεν θέλω να φύγω!", syllables:["Περ","νά","ω"," ","πο","λύ"," ","ω","ραί","α"," ","στην"," ","Ε","λλά","δα,"," ","δεν"," ","θέ","λω"," ","να"," ","φύ","γω!"], rom:["Per","ná","o"," ","po","lí"," ","o","ré","a"," ","stin"," ","E","lá","da,"," ","den"," ","thé","lo"," ","na"," ","fí","go!"], pl:"Świetnie się bawię w Grecji, nie chcę wyjeżdżać!" },
    ],
  },
];
const numbers = [
  {n:0,gr:"μηδέν",rom:"midén"},{n:1,gr:"ένα",rom:"éna"},{n:2,gr:"δύο",rom:"dío"},{n:3,gr:"τρία",rom:"tría"},
  {n:4,gr:"τέσσερα",rom:"tésera"},{n:5,gr:"πέντε",rom:"pénde"},{n:6,gr:"έξι",rom:"éksi"},{n:7,gr:"εφτά",rom:"eftá"},
  {n:8,gr:"οχτώ",rom:"ochtó"},{n:9,gr:"εννιά",rom:"eniá"},{n:10,gr:"δέκα",rom:"déka"},
  {n:11,gr:"έντεκα",rom:"éndeka"},{n:12,gr:"δώδεκα",rom:"dódeka"},{n:13,gr:"δεκατρία",rom:"dekatría"},
  {n:14,gr:"δεκατέσσερα",rom:"dekatésera"},{n:15,gr:"δεκαπέντε",rom:"dekapénde"},
  {n:16,gr:"δεκαέξι",rom:"dekaéksi"},{n:17,gr:"δεκαεφτά",rom:"dekaeftá"},
  {n:18,gr:"δεκαοχτώ",rom:"dekaochtó"},{n:19,gr:"δεκαεννιά",rom:"dekaeniá"},
  {n:20,gr:"είκοσι",rom:"íkosi"},{n:30,gr:"τριάντα",rom:"triánda"},{n:40,gr:"σαράντα",rom:"saránda"},
  {n:50,gr:"πενήντα",rom:"peнínda"},{n:60,gr:"εξήντα",rom:"eksínda"},{n:70,gr:"εβδομήντα",rom:"evdomínda"},
  {n:80,gr:"ογδόντα",rom:"ogdónda"},{n:90,gr:"ενενήντα",rom:"enenínda"},{n:100,gr:"εκατό",rom:"ekató"},
  {n:1000,gr:"χίλια",rom:"chília"},
];

const days = [
  {gr:"Δευτέρα",rom:"Deftéra",pl:"Poniedziałek",short:"Δευ"},{gr:"Τρίτη",rom:"Tríti",pl:"Wtorek",short:"Τρι"},
  {gr:"Τετάρτη",rom:"Tetárti",pl:"Środa",short:"Τετ"},{gr:"Πέμπτη",rom:"Pémpti",pl:"Czwartek",short:"Πεμ"},
  {gr:"Παρασκευή",rom:"Paraskeví",pl:"Piątek",short:"Παρ"},{gr:"Σάββατο",rom:"Sávato",pl:"Sobota",short:"Σαβ"},
  {gr:"Κυριακή",rom:"Kiriakí",pl:"Niedziela",short:"Κυρ"},
];

const months = [
  {gr:"Ιανουάριος",rom:"Ianuários",pl:"Styczeń"},{gr:"Φεβρουάριος",rom:"Fevruários",pl:"Luty"},
  {gr:"Μάρτιος",rom:"Mártios",pl:"Marzec"},{gr:"Απρίλιος",rom:"Aprílios",pl:"Kwiecień"},
  {gr:"Μάιος",rom:"Máios",pl:"Maj"},{gr:"Ιούνιος",rom:"Iúnios",pl:"Czerwiec"},
  {gr:"Ιούλιος",rom:"Iúlios",pl:"Lipiec"},{gr:"Αύγουστος",rom:"Ávgustos",pl:"Sierpień"},
  {gr:"Σεπτέμβριος",rom:"Septémvrios",pl:"Wrzesień"},{gr:"Οκτώβριος",rom:"Októvrios",pl:"Październik"},
  {gr:"Νοέμβριος",rom:"Noémvrios",pl:"Listopad"},{gr:"Δεκέμβριος",rom:"Dekémvrios",pl:"Grudzień"},
];

/* ===== PRIORITY 1: Question words, Prepositions, Pronouns, Articles ===== */
const questionWords = [
  {gr:"Τι;",rom:"Ti?",pl:"Co? / Jaki?",ex:"Τι θέλεις; = Czego chcesz?"},
  {gr:"Ποιος/ποια/ποιο;",rom:"Piós/piá/pió?",pl:"Kto? / Który?",ex:"Ποιος είναι; = Kto to jest?"},
  {gr:"Πού;",rom:"Pú?",pl:"Gdzie?",ex:"Πού μένεις; = Gdzie mieszkasz?"},
  {gr:"Πότε;",rom:"Póte?",pl:"Kiedy?",ex:"Πότε φεύγεις; = Kiedy wyjeżdżasz?"},
  {gr:"Πώς;",rom:"Pós?",pl:"Jak?",ex:"Πώς είσαι; = Jak się masz?"},
  {gr:"Πόσο/πόσα;",rom:"Póso/pósa?",pl:"Ile?",ex:"Πόσο κάνει; = Ile kosztuje?"},
  {gr:"Γιατί;",rom:"Jiatí?",pl:"Dlaczego?",ex:"Γιατί αργείς; = Dlaczego się spóźniasz?"},
];

const prepositions = [
  {gr:"σε",rom:"se",pl:"do / w / na",ex:"Πάω σε σχολείο = Idę do szkoły",note:"Najważniejszy przyimek!"},
  {gr:"από",rom:"apó",pl:"z / od",ex:"Είμαι από την Πολωνία = Jestem z Polski"},
  {gr:"με",rom:"me",pl:"z (razem z)",ex:"Πάω με τον φίλο μου = Idę z moim przyjacielem"},
  {gr:"για",rom:"jia",pl:"dla / o / na",ex:"Αυτό είναι για σένα = To jest dla ciebie"},
  {gr:"μετά",rom:"metá",pl:"po",ex:"Μετά το φαγητό = Po jedzeniu"},
  {gr:"πριν",rom:"prin",pl:"przed",ex:"Πριν το μάθημα = Przed lekcją"},
  {gr:"χωρίς",rom:"chorís",pl:"bez",ex:"Καφέ χωρίς ζάχαρη = Kawa bez cukru"},
  {gr:"μέχρι",rom:"méchri",pl:"do / aż do",ex:"Μέχρι αύριο = Do jutra"},
];

const pronounsPersonal = [
  {person:"ja",gr:"εγώ",rom:"egó",weak:"με (me)",poss:"μου (mu)"},
  {person:"ty",gr:"εσύ",rom:"esí",weak:"σε (se)",poss:"σου (su)"},
  {person:"on",gr:"αυτός",rom:"aftós",weak:"τον (ton)",poss:"του (tu)"},
  {person:"ona",gr:"αυτή",rom:"aftí",weak:"την (tin)",poss:"της (tis)"},
  {person:"ono",gr:"αυτό",rom:"aftó",weak:"το (to)",poss:"του (tu)"},
  {person:"my",gr:"εμείς",rom:"emís",weak:"μας (mas)",poss:"μας (mas)"},
  {person:"wy/Pan",gr:"εσείς",rom:"esís",weak:"σας (sas)",poss:"σας (sas)"},
  {person:"oni/one",gr:"αυτοί/ές",rom:"aftí/aftés",weak:"τους (tus)",poss:"τους (tus)"},
];

const naGroups = [
  { title:"Możliwość, chęć, konieczność", color:"#3b82f6", items:[
    {gr:"Μπορώ να...",rom:"Boró na...",pl:"mogę...",ex:"Μπορώ να πάω = Mogę iść"},
    {gr:"Θέλω να...",rom:"Thélo na...",pl:"chcę...",ex:"Θέλω να φάω = Chcę jeść"},
    {gr:"Πρέπει να...",rom:"Prépi na...",pl:"muszę / powinienem...",ex:"Πρέπει να φύγω = Muszę wyjść"},
    {gr:"Χρειάζεται να...",rom:"Chriázete na...",pl:"trzeba...",ex:"Χρειάζεται να περιμένω = Trzeba czekać"},
  ]},
  { title:"Umiejętność i nauka", color:"#8b5cf6", items:[
    {gr:"Ξέρω να...",rom:"Kséro na...",pl:"umiem...",ex:"Ξέρω να μαγειρεύω = Umiem gotować"},
    {gr:"Μαθαίνω να...",rom:"Mathéno na...",pl:"uczę się...",ex:"Μαθαίνω να μιλάω ελληνικά = Uczę się mówić po grecku"},
  ]},
  { title:"Próbowanie, zaczynanie, kończenie", color:"#059669", items:[
    {gr:"Προσπαθώ να...",rom:"Prospathó na...",pl:"próbuję...",ex:"Προσπαθώ να καταλάβω = Próbuję zrozumieć"},
    {gr:"Αρχίζω να...",rom:"Archízo na...",pl:"zaczynam...",ex:"Αρχίζω να καταλαβαίνω = Zaczynam rozumieć"},
    {gr:"Σταματάω να...",rom:"Stamatáo na...",pl:"przestaję...",ex:"Σταματάω να καπνίζω = Przestaję palić"},
    {gr:"Συνεχίζω να...",rom:"Sinechízo na...",pl:"kontynuuję...",ex:"Συνεχίζω να μαθαίνω = Kontynuuję naukę"},
    {gr:"Τελειώνω να...",rom:"Telióno na...",pl:"kończę...",ex:"Τελειώνω να τρώω = Kończę jeść"},
  ]},
  { title:"Emocje wobec działania", color:"#dc2626", items:[
    {gr:"Μου αρέσει να...",rom:"Mu arési na...",pl:"lubię...",ex:"Μου αρέσει να ταξιδεύω = Lubię podróżować"},
    {gr:"Προτιμώ να...",rom:"Protimó na...",pl:"wolę...",ex:"Προτιμώ να μείνω σπίτι = Wolę zostać w domu"},
    {gr:"Φοβάμαι να...",rom:"Fováme na...",pl:"boję się...",ex:"Φοβάμαι να πετάξω = Boję się latać"},
    {gr:"Βαριέμαι να...",rom:"Variéme na...",pl:"nie chce mi się...",ex:"Βαριέμαι να μαγειρέψω = Nie chce mi się gotować"},
    {gr:"Ντρέπομαι να...",rom:"Drépome na...",pl:"wstydzę się...",ex:"Ντρέπομαι να μιλήσω = Wstydzę się odezwać"},
  ]},
  { title:"Myślenie i decyzje", color:"#0891b2", items:[
    {gr:"Σκέφτομαι να...",rom:"Skéftome na...",pl:"myślę, żeby...",ex:"Σκέφτομαι να φύγω = Myślę, żeby wyjechać"},
    {gr:"Αποφασίζω να...",rom:"Apofasízo na...",pl:"decyduję się...",ex:"Αποφάσισα να μείνω = Zdecydowałem, że zostanę"},
    {gr:"Ελπίζω να...",rom:"Elpízo na...",pl:"mam nadzieję...",ex:"Ελπίζω να έρθεις = Mam nadzieję, że przyjdziesz"},
  ]},
  { title:"Pamięć", color:"#ca8a04", items:[
    {gr:"Θυμάμαι να...",rom:"Thimáme na...",pl:"pamiętam, żeby...",ex:"Θυμάμαι να πάρω φάρμακα = Pamiętam, żeby wziąć leki"},
    {gr:"Ξεχνάω να...",rom:"Ksechnáo na...",pl:"zapominam...",ex:"Ξεχνάω να κλειδώσω = Zapominam zamykać"},
  ]},
  { title:"Να samo — życzenia, cele, okoliczności", color:"#6d28d9", items:[
    {gr:"Να + czasownik",rom:"Na...",pl:"niech / oby (życzenie/rozkaz)",ex:"Να προσέχεις! = Uważaj! / Να είσαι καλά! = Bądź zdrów!"},
    {gr:"Για να...",rom:"Jia na...",pl:"żeby / aby (cel)",ex:"Μαθαίνω ελληνικά για να μιλάω στην Ελλάδα = Uczę się greckiego, żeby mówić w Grecji"},
    {gr:"Χωρίς να...",rom:"Chorís na...",pl:"bez (+ czynność)",ex:"Έφυγε χωρίς να πει τίποτα = Wyszedł bez mówienia czegokolwiek"},
    {gr:"Πριν να...",rom:"Prin na...",pl:"zanim",ex:"Πριν να φύγεις, πάρε ομπρέλα = Zanim wyjdziesz, weź parasol"},
    {gr:"Αφού να...",rom:"Afú na...",pl:"po tym jak / skoro",ex:"Αφού φας, πάμε βόλτα = Jak zjesz, chodźmy na spacer"},
  ]},
];

const articles = {
  definite: {
    title:"Rodzajnik określony (the)",
    rows:[
      {c:"Mianownik (kto?)",m:"ο",f:"η",n:"το",mpl:"οι",fpl:"οι",npl:"τα"},
      {c:"Biernik (kogo?)",m:"τον",f:"τη(ν)",n:"το",mpl:"τους",fpl:"τις",npl:"τα"},
      {c:"Dopełniacz (czyj?)",m:"του",f:"της",n:"του",mpl:"των",fpl:"των",npl:"των"},
    ]
  },
  indefinite: {
    title:"Rodzajnik nieokreślony (a/an)",
    rows:[
      {c:"Mianownik",m:"ένας",f:"μία/μια",n:"ένα"},
      {c:"Biernik",m:"έναν",f:"μία/μια",n:"ένα"},
      {c:"Dopełniacz",m:"ενός",f:"μίας/μιας",n:"ενός"},
    ]
  }
};

/* ===== PRIORITY 4: Directions, Conjunctions, Ordinals ===== */
const directions = [
  {gr:"εδώ",rom:"edó",pl:"tutaj"},{gr:"εκεί",rom:"ekí",pl:"tam"},
  {gr:"δεξιά",rom:"deksiá",pl:"na prawo"},{gr:"αριστερά",rom:"aristerá",pl:"na lewo"},
  {gr:"ευθεία",rom:"efthía",pl:"prosto"},{gr:"κοντά",rom:"kondá",pl:"blisko"},
  {gr:"μακριά",rom:"makriá",pl:"daleko"},{gr:"πάνω",rom:"páno",pl:"na górze / w górę"},
  {gr:"κάτω",rom:"káto",pl:"na dole / w dół"},{gr:"μέσα",rom:"mésa",pl:"wewnątrz"},
  {gr:"έξω",rom:"ékso",pl:"na zewnątrz"},{gr:"μπροστά",rom:"brostá",pl:"z przodu"},
  {gr:"πίσω",rom:"píso",pl:"z tyłu"},
];

const conjunctions = [
  {gr:"και",rom:"ke",pl:"i",ex:"Εγώ και εσύ = Ja i ty"},
  {gr:"αλλά",rom:"alá",pl:"ale",ex:"Είναι μικρό αλλά ωραίο = Jest mały ale ładny"},
  {gr:"ή",rom:"í",pl:"lub / albo",ex:"Καφέ ή τσάι; = Kawa czy herbata?"},
  {gr:"γιατί / επειδή",rom:"jiatí / epidí",pl:"bo / ponieważ",ex:"Μένω σπίτι γιατί βρέχει = Zostaję w domu bo pada"},
  {gr:"όταν",rom:"ótan",pl:"kiedy / gdy",ex:"Όταν έρθεις... = Kiedy przyjdziesz..."},
  {gr:"αν",rom:"an",pl:"jeśli / gdyby",ex:"Αν θέλεις... = Jeśli chcesz..."},
  {gr:"ότι",rom:"óti",pl:"że",ex:"Νομίζω ότι... = Myślę, że..."},
  {gr:"ενώ",rom:"enó",pl:"podczas gdy",ex:"Ενώ τρώω... = Podczas gdy jem..."},
];

const ordinals = [
  {n:"1.",gr:"πρώτος/η/ο",rom:"prótos",pl:"pierwszy"},{n:"2.",gr:"δεύτερος/η/ο",rom:"défteros",pl:"drugi"},
  {n:"3.",gr:"τρίτος/η/ο",rom:"trítos",pl:"trzeci"},{n:"4.",gr:"τέταρτος/η/ο",rom:"tétartos",pl:"czwarty"},
  {n:"5.",gr:"πέμπτος/η/ο",rom:"pémptos",pl:"piąty"},{n:"6.",gr:"έκτος/η/ο",rom:"éktos",pl:"szósty"},
  {n:"7.",gr:"έβδομος/η/ο",rom:"évdomos",pl:"siódmy"},{n:"8.",gr:"όγδοος/η/ο",rom:"ógdoos",pl:"ósmy"},
  {n:"9.",gr:"ένατος/η/ο",rom:"énatos",pl:"dziewiąty"},{n:"10.",gr:"δέκατος/η/ο",rom:"dékatos",pl:"dziesiąty"},
];

const family = [
  {gr:"η οικογένεια",rom:"i ikojénia",pl:"rodzina"},{gr:"ο πατέρας / ο μπαμπάς",rom:"o patéras / o babás",pl:"ojciec / tata"},
  {gr:"η μητέρα / η μαμά",rom:"i mitéra / i mamá",pl:"matka / mama"},{gr:"ο αδερφός",rom:"o aderfós",pl:"brat"},
  {gr:"η αδερφή",rom:"i aderfí",pl:"siostra"},{gr:"ο γιος",rom:"o jiós",pl:"syn"},
  {gr:"η κόρη",rom:"i kóri",pl:"córka"},{gr:"ο παππούς",rom:"o papús",pl:"dziadek"},
  {gr:"η γιαγιά",rom:"i jajiá",pl:"babcia"},{gr:"ο θείος",rom:"o thíos",pl:"wujek"},
  {gr:"η θεία",rom:"i thía",pl:"ciocia"},{gr:"ο σύζυγος / η σύζυγος",rom:"o sízigos / i sízigos",pl:"mąż / żona"},
  {gr:"το μωρό",rom:"to moró",pl:"niemowlę"},{gr:"ο/η ξάδερφος/η",rom:"o/i ksáderfos/i",pl:"kuzyn/ka"},
];

const food = [
  {gr:"το ψωμί",rom:"to psomí",pl:"chleb"},{gr:"το τυρί",rom:"to tirí",pl:"ser"},
  {gr:"το κρέας",rom:"to kréas",pl:"mięso"},{gr:"το κοτόπουλο",rom:"to kotópulo",pl:"kurczak"},
  {gr:"το ψάρι",rom:"to psári",pl:"ryba"},{gr:"η σαλάτα",rom:"i saláta",pl:"sałatka"},
  {gr:"το ρύζι",rom:"to rízi",pl:"ryż"},{gr:"τα ζυμαρικά",rom:"ta zimariká",pl:"makaron"},
  {gr:"το αυγό",rom:"to avgó",pl:"jajko"},{gr:"τα φρούτα",rom:"ta frúta",pl:"owoce"},
  {gr:"τα λαχανικά",rom:"ta lachaniká",pl:"warzywa"},{gr:"η ντομάτα",rom:"i domáta",pl:"pomidor"},
  {gr:"το κρασί",rom:"to krasí",pl:"wino"},{gr:"η μπίρα",rom:"i bíra",pl:"piwo"},
  {gr:"ο χυμός",rom:"o chimós",pl:"sok"},{gr:"το παγωτό",rom:"to pagotó",pl:"lody"},
  {gr:"το σουβλάκι",rom:"to suvláki",pl:"souvlaki"},{gr:"η μουσακάς",rom:"i musakás",pl:"musaka"},
];

const colors = [
  {gr:"κόκκινο",rom:"kókino",pl:"czerwony"},{gr:"μπλε",rom:"ble",pl:"niebieski"},
  {gr:"πράσινο",rom:"prásino",pl:"zielony"},{gr:"κίτρινο",rom:"kítrino",pl:"żółty"},
  {gr:"άσπρο / λευκό",rom:"áspro / lefkó",pl:"biały"},{gr:"μαύρο",rom:"mávro",pl:"czarny"},
  {gr:"πορτοκαλί",rom:"portokalí",pl:"pomarańczowy"},{gr:"ροζ",rom:"roz",pl:"różowy"},
  {gr:"γκρι",rom:"gri",pl:"szary"},{gr:"μοβ",rom:"mov",pl:"fioletowy"},
  {gr:"καφέ",rom:"kafé",pl:"brązowy"},
];

const bodyParts = [
  {gr:"το κεφάλι",rom:"to kefáli",pl:"głowa"},{gr:"τα μάτια",rom:"ta mátia",pl:"oczy"},
  {gr:"η μύτη",rom:"i míti",pl:"nos"},{gr:"το στόμα",rom:"to stóma",pl:"usta"},
  {gr:"τα αυτιά",rom:"ta aftiá",pl:"uszy"},{gr:"τα μαλλιά",rom:"ta maliá",pl:"włosy"},
  {gr:"το χέρι",rom:"to chéri",pl:"ręka/dłoń"},{gr:"το πόδι",rom:"to pódi",pl:"noga/stopa"},
  {gr:"η πλάτη",rom:"i pláti",pl:"plecy"},{gr:"η κοιλιά",rom:"i kiliá",pl:"brzuch"},
  {gr:"το δάχτυλο",rom:"to dáchtilo",pl:"palec"},{gr:"η καρδιά",rom:"i kardiá",pl:"serce"},
];

const homeItems = [
  {gr:"το δωμάτιο",rom:"to domátio",pl:"pokój"},{gr:"η κουζίνα",rom:"i kuzína",pl:"kuchnia"},
  {gr:"το μπάνιο",rom:"to bánio",pl:"łazienka"},{gr:"η τουαλέτα",rom:"i tualéta",pl:"toaleta"},
  {gr:"το κρεβάτι",rom:"to kreváti",pl:"łóżko"},{gr:"η καρέκλα",rom:"i karékla",pl:"krzesło"},
  {gr:"το τραπέζι",rom:"to trapézi",pl:"stół"},{gr:"το παράθυρο",rom:"to paráthiro",pl:"okno"},
  {gr:"η πόρτα",rom:"i pórta",pl:"drzwi"},{gr:"η τηλεόραση",rom:"i tileórasi",pl:"telewizor"},
  {gr:"το κλειδί",rom:"to klidí",pl:"klucz"},{gr:"ο καναπές",rom:"o kanapés",pl:"kanapa"},
];

const adjectives = [
  {gr:"μεγάλος / μικρός",rom:"megálos / mikrós",pl:"duży / mały"},
  {gr:"καλός / κακός",rom:"kalós / kakós",pl:"dobry / zły"},
  {gr:"νέος / παλιός",rom:"néos / paliós",pl:"nowy / stary"},
  {gr:"ζεστός / κρύος",rom:"zestós / kríos",pl:"gorący / zimny"},
  {gr:"ακριβός / φτηνός",rom:"akrivós / ftinós",pl:"drogi / tani"},
  {gr:"εύκολος / δύσκολος",rom:"éfkolos / dískolos",pl:"łatwy / trudny"},
  {gr:"γρήγορος / αργός",rom:"grígoros / argós",pl:"szybki / wolny"},
  {gr:"ωραίος / άσχημος",rom:"oréos / áschimos",pl:"ładny / brzydki"},
  {gr:"κοντός / ψηλός",rom:"kondós / psilós",pl:"niski / wysoki"},
  {gr:"αδύνατος / χοντρός",rom:"adínatos / chondrós",pl:"chudy / gruby"},
  {gr:"δυνατός / αδύνατος",rom:"dinatós / adínatos",pl:"silny / słaby"},
  {gr:"ήσυχος / θορυβώδης",rom:"ísichos / thorivódis",pl:"cichy / głośny"},
  {gr:"σωστός / λάθος",rom:"sostós / láthos",pl:"poprawny / błędny"},
  {gr:"ανοιχτός / κλειστός",rom:"anichtós / klistós",pl:"otwarty / zamknięty"},
];

const timeExpressions = [
  {gr:"σήμερα",rom:"símera",pl:"dziś"},{gr:"αύριο",rom:"ávrio",pl:"jutro"},
  {gr:"χθες",rom:"chthes",pl:"wczoraj"},{gr:"τώρα",rom:"tóra",pl:"teraz"},
  {gr:"μετά / ύστερα",rom:"metá / ístera",pl:"potem / później"},
  {gr:"πριν",rom:"prin",pl:"przedtem / zanim"},{gr:"πάντα",rom:"pánda",pl:"zawsze"},
  {gr:"ποτέ",rom:"poté",pl:"nigdy"},{gr:"συνήθως",rom:"siníthos",pl:"zwykle"},
  {gr:"μερικές φορές",rom:"merikés forés",pl:"czasami"},{gr:"σπάνια",rom:"spánia",pl:"rzadko"},
  {gr:"νωρίς",rom:"norís",pl:"wcześnie"},{gr:"αργά",rom:"argá",pl:"późno"},
  {gr:"σε λίγο",rom:"se lígo",pl:"za chwilę"},{gr:"μόλις",rom:"mólis",pl:"właśnie / dopiero co"},
  {gr:"πέρσι",rom:"pérsi",pl:"w zeszłym roku"},{gr:"φέτος",rom:"fétos",pl:"w tym roku"},
];

const professions = [
  {gr:"ο/η γιατρός",rom:"o/i jatrós",pl:"lekarz/ka"},{gr:"ο/η δάσκαλος/α",rom:"o/i dáskalos/a",pl:"nauczyciel/ka"},
  {gr:"ο/η μαθητής/τρια",rom:"o/i mathitís/tria",pl:"uczeń/uczennica"},{gr:"ο/η φοιτητής/τρια",rom:"o/i fititís/tria",pl:"student/ka"},
  {gr:"ο/η μηχανικός",rom:"o/i michanikós",pl:"inżynier"},{gr:"ο/η δικηγόρος",rom:"o/i dikigóros",pl:"prawnik"},
  {gr:"ο/η οδηγός",rom:"o/i odigós",pl:"kierowca"},{gr:"ο/η μάγειρας",rom:"o/i mágiras",pl:"kucharz"},
  {gr:"ο/η νοσοκόμα",rom:"o/i nosokóma",pl:"pielęgniarz/ka"},{gr:"ο/η σερβιτόρος/α",rom:"o/i servitóros/a",pl:"kelner/ka"},
  {gr:"ο/η προγραμματιστής",rom:"o/i programatistís",pl:"programista"},
];

/* ===== NEW: GRAMMAR DATA ===== */
const genderIntro = [
  { gender:"Męski (αρσενικό)", article:"ο", color:"#3b82f6", endings:["-ος","-ης","-ας"],
    examples:[
      {gr:"ο φίλος",rom:"o fílos",pl:"przyjaciel"},{gr:"ο μαθητής",rom:"o mathitís",pl:"uczeń"},
      {gr:"ο άντρας",rom:"o ándras",pl:"mężczyzna"},{gr:"ο δρόμος",rom:"o drómos",pl:"droga"},
      {gr:"ο καφές",rom:"o kafés",pl:"kawa"},{gr:"ο πατέρας",rom:"o patéras",pl:"ojciec"},
    ]},
  { gender:"Żeński (θηλυκό)", article:"η", color:"#ec4899", endings:["-α","-η","-ού"],
    examples:[
      {gr:"η φίλη",rom:"i fíli",pl:"przyjaciółka"},{gr:"η θάλασσα",rom:"i thálasa",pl:"morze"},
      {gr:"η μητέρα",rom:"i mitéra",pl:"matka"},{gr:"η ζωή",rom:"i zoí",pl:"życie"},
      {gr:"η γυναίκα",rom:"i jinéka",pl:"kobieta"},{gr:"η αδερφή",rom:"i aderfí",pl:"siostra"},
    ]},
  { gender:"Nijaki (ουδέτερο)", article:"το", color:"#22c55e", endings:["-ο","-ι","-μα"],
    examples:[
      {gr:"το βιβλίο",rom:"to vivlío",pl:"książka"},{gr:"το σπίτι",rom:"to spíti",pl:"dom"},
      {gr:"το όνομα",rom:"to ónoma",pl:"imię"},{gr:"το νερό",rom:"to neró",pl:"woda"},
      {gr:"το παιδί",rom:"to pedí",pl:"dziecko"},{gr:"το πρόβλημα",rom:"to próvlima",pl:"problem"},
    ]},
];

const declensions = [
  { title:"Męski -ος", color:"#3b82f6", word:"φίλος (przyjaciel)",
    cases:[
      {c:"Mianownik",sg:"ο φίλος",pl:"οι φίλοι",sgR:"o fílos",plR:"i fíli",use:"kto? co?"},
      {c:"Biernik",sg:"τον φίλο",pl:"τους φίλους",sgR:"ton fílo",plR:"tus fílus",use:"kogo? co? (dopełnienie)"},
      {c:"Dopełniacz",sg:"του φίλου",pl:"των φίλων",sgR:"tu fílu",plR:"ton fílon",use:"czyj? czego?"},
    ]},
  { title:"Żeński -α", color:"#ec4899", word:"θάλασσα (morze)",
    cases:[
      {c:"Mianownik",sg:"η θάλασσα",pl:"οι θάλασσες",sgR:"i thálasa",plR:"i thálases",use:"kto? co?"},
      {c:"Biernik",sg:"τη θάλασσα",pl:"τις θάλασσες",sgR:"ti thálasa",plR:"tis thálases",use:"kogo? co?"},
      {c:"Dopełniacz",sg:"της θάλασσας",pl:"των θαλασσών",sgR:"tis thálasas",plR:"ton thalasón",use:"czyj? czego?"},
    ]},
  { title:"Nijaki -ο", color:"#22c55e", word:"βιβλίο (książka)",
    cases:[
      {c:"Mianownik",sg:"το βιβλίο",pl:"τα βιβλία",sgR:"to vivlío",plR:"ta vivlía",use:"kto? co?"},
      {c:"Biernik",sg:"το βιβλίο",pl:"τα βιβλία",sgR:"to vivlío",plR:"ta vivlía",use:"kogo? co?"},
      {c:"Dopełniacz",sg:"του βιβλίου",pl:"των βιβλίων",sgR:"tu vivlíu",plR:"ton vivlíon",use:"czyj? czego?"},
    ]},
];

const verbs = [
  { gr:"είμαι",rom:"íme",pl:"być",type:"nieregularny",
    present:[
      {person:"εγώ (ja)",form:"είμαι",rom:"íme"},{person:"εσύ (ty)",form:"είσαι",rom:"íse"},
      {person:"αυτός/ή/ό (on/a/o)",form:"είναι",rom:"íne"},{person:"εμείς (my)",form:"είμαστε",rom:"ímaste"},
      {person:"εσείς (wy/Pan)",form:"είστε",rom:"íste"},{person:"αυτοί/ές/ά (oni/e)",form:"είναι",rom:"íne"},
    ],
    pastHint:"ήμουν, ήσουν, ήταν, ήμασταν, ήσασταν, ήταν",
    futureHint:"θα είμαι, θα είσαι, θα είναι...",
    examples:[{gr:"Είμαι Πολωνός",rom:"Íme Polonós",pl:"Jestem Polakiem"},{gr:"Είσαι καλά;",rom:"Íse kalá?",pl:"Czy dobrze się czujesz?"}],
  },
  { gr:"έχω",rom:"écho",pl:"mieć",type:"regularny -ω",
    present:[
      {person:"εγώ",form:"έχω",rom:"écho"},{person:"εσύ",form:"έχεις",rom:"échis"},
      {person:"αυτός/ή/ό",form:"έχει",rom:"échi"},{person:"εμείς",form:"έχουμε",rom:"échume"},
      {person:"εσείς",form:"έχετε",rom:"échete"},{person:"αυτοί/ές/ά",form:"έχουν",rom:"échun"},
    ],
    pastHint:"είχα, είχες, είχε, είχαμε, είχατε, είχαν",
    futureHint:"θα έχω, θα έχεις, θα έχει...",
    examples:[{gr:"Έχω ένα σπίτι",rom:"Écho éna spíti",pl:"Mam dom"},{gr:"Έχεις αδερφή;",rom:"Échis aderfí?",pl:"Masz siostrę?"}],
  },
  { gr:"θέλω",rom:"thélo",pl:"chcieć",type:"regularny -ω",
    present:[
      {person:"εγώ",form:"θέλω",rom:"thélo"},{person:"εσύ",form:"θέλεις",rom:"thélis"},
      {person:"αυτός/ή/ό",form:"θέλει",rom:"théli"},{person:"εμείς",form:"θέλουμε",rom:"thélume"},
      {person:"εσείς",form:"θέλετε",rom:"thélete"},{person:"αυτοί/ές/ά",form:"θέλουν",rom:"thélun"},
    ],
    pastHint:"ήθελα, ήθελες, ήθελε, θέλαμε, θέλατε, ήθελαν",
    futureHint:"θα θέλω, θα θέλεις, θα θέλει...",
    examples:[{gr:"Θέλω νερό",rom:"Thélo neró",pl:"Chcę wodę"},{gr:"Τι θέλεις;",rom:"Ti thélis?",pl:"Czego chcesz?"}],
  },
  { gr:"μιλάω",rom:"miláo",pl:"mówić",type:"regularny -άω",
    present:[
      {person:"εγώ",form:"μιλάω",rom:"miláo"},{person:"εσύ",form:"μιλάς",rom:"milás"},
      {person:"αυτός/ή/ό",form:"μιλάει",rom:"milái"},{person:"εμείς",form:"μιλάμε",rom:"miláme"},
      {person:"εσείς",form:"μιλάτε",rom:"miláte"},{person:"αυτοί/ές/ά",form:"μιλάνε",rom:"milánе"},
    ],
    pastHint:"μίλησα, μίλησες, μίλησε, μιλήσαμε, μιλήσατε, μίλησαν",
    futureHint:"θα μιλήσω, θα μιλήσεις, θα μιλήσει...",
    examples:[{gr:"Μιλάω ελληνικά",rom:"Miláo eliniká",pl:"Mówię po grecku"},{gr:"Μιλάς αγγλικά;",rom:"Milás angliká?",pl:"Mówisz po angielsku?"}],
  },
  { gr:"μπορώ",rom:"boró",pl:"móc",type:"regularny -ώ",
    present:[
      {person:"εγώ",form:"μπορώ",rom:"boró"},{person:"εσύ",form:"μπορείς",rom:"borís"},
      {person:"αυτός/ή/ό",form:"μπορεί",rom:"borí"},{person:"εμείς",form:"μπορούμε",rom:"borúme"},
      {person:"εσείς",form:"μπορείτε",rom:"boríte"},{person:"αυτοί/ές/ά",form:"μπορούν",rom:"borún"},
    ],
    pastHint:"μπόρεσα, μπόρεσες, μπόρεσε...",
    futureHint:"θα μπορέσω, θα μπορέσεις...",
    examples:[{gr:"Μπορώ να σε βοηθήσω",rom:"Boró na se voithíso",pl:"Mogę ci pomóc"},{gr:"Μπορείς να έρθεις;",rom:"Borís na érthis?",pl:"Możesz przyjść?"}],
  },
];

const verbEndingsTable = {
  title: "Wzory końcówek — czas teraźniejszy",
  patterns: [
    { type:"Typ -ω (γράφω, θέλω, έχω)", endings:["-ω","-εις","-ει","-ουμε","-ετε","-ουν"], persons:["εγώ","εσύ","αυτ.","εμείς","εσείς","αυτ."] },
    { type:"Typ -άω (μιλάω, αγαπάω)", endings:["-άω","-άς","-άει","-άμε","-άτε","-άνε"], persons:["εγώ","εσύ","αυτ.","εμείς","εσείς","αυτ."] },
    { type:"Typ -ώ (μπορώ, ζω)", endings:["-ώ","-είς","-εί","-ούμε","-είτε","-ούν"], persons:["εγώ","εσύ","αυτ.","εμείς","εσείς","αυτ."] },
  ],
  future: "Czas przyszły = θα + forma teraźniejsza (z drobnymi zmianami tematu): θα γράψω, θα μιλήσω",
  past: "Czas przeszły prosty (αόριστος): zmienia się temat + końcówki: -α, -ες, -ε, -αμε, -ατε, -αν",
};

/* ===== COMPONENTS ===== */
function AlphabetView() {
  const [flipped,setFlipped]=useState({});
  const [showDi,setShowDi]=useState(false);
  return (<div>
    <div className="sh"><h2 className="st">Αλφάβητο — Alfabet</h2><p className="sd">Kliknij literę, aby odkryć wymowę</p></div>
    <div className="alpha-grid">{alphabet.map((l,i)=>(
      <div key={i} className={"ac"+(flipped[i]?" fl":"")} onClick={()=>setFlipped(p=>({...p,[i]:!p[i]}))}>
        {!flipped[i]?<><div className="al"><span className="au">{l.upper}</span><span className="alo">{l.lower}</span></div><div className="an">{l.name}</div><div className="asb">{l.sound}</div></>
        :<><div className="at">{l.tip}</div><div className="ae"><span className="aeg">{l.example}</span><span className="aer"><R t={l.exRom}/></span><span className="aep">{l.exPl}</span></div></>}
      </div>))}</div>
    <button className="dtog" onClick={()=>setShowDi(!showDi)}>{showDi?"▾ Ukryj dwuznaki":"▸ Dwuznaki — WAŻNE!"}</button>
    {showDi&&<div className="dlist">{digraphs.map((d,i)=>(<div key={i} className="dc"><div className="dctop"><span className="dcc">{d.combo}</span><span className="dcsb">{d.sound}</span></div><div className="dct">{d.tip}</div><div className="dce"><span className="dcg">{d.example}</span><span className="dcr"><R t={d.exRom}/></span><span className="dcp">= {d.exPl}</span></div></div>))}</div>}
  </div>);
}

function VocabView() {
  const [sub,setSub]=useState("questions");
  const [rev,setRev]=useState({});
  const toggle=(k)=>setRev(p=>({...p,[k]:!p[k]}));
  const renderList=(items,prefix,hasEx)=>(<div className="vlist">{items.map((d,i)=>{
    const k=prefix+i; const isR=rev[k];
    return <div key={k} className={"vc"+(isR?" rev":"")} onClick={()=>toggle(k)}>
      <div className="vg">{d.gr}</div><div className="vr"><R t={d.rom}/></div>
      {isR?<><div className="vp">{d.pl}</div>{(hasEx&&d.ex)&&<div className="ex-sentence">{d.ex}</div>}{d.note&&<span className="vnote">{d.note}</span>}</>:<div className="vh">▸ pokaż</div>}
    </div>
  })}</div>);
  return (<div>
    <div className="sh"><h2 className="st">Λεξιλόγιο — Słownictwo</h2></div>
    <div className="subtabs">
      {[{id:"questions",label:"❓ Pytajniki"},{id:"prep",label:"📌 Przyimki"},{id:"conj",label:"🔗 Spójniki"},{id:"dir",label:"🧭 Kierunki"},
        {id:"time",label:"⏰ Czas"},{id:"adj",label:"📊 Przymiotniki"},{id:"family",label:"👨‍👩‍👧 Rodzina"},{id:"food",label:"🍽️ Jedzenie"},
        {id:"colors",label:"🎨 Kolory"},{id:"body",label:"👤 Ciało"},{id:"home",label:"🏠 Dom"},{id:"jobs",label:"💼 Zawody"},
        {id:"numbers",label:"🔢 Liczby"},{id:"ordinals",label:"🏅 Porządkowe"},{id:"days",label:"📅 Dni"},{id:"months",label:"🗓️ Miesiące"},
      ].map(t=>(
        <button key={t.id} className={"stb"+(sub===t.id?" active":"")} onClick={()=>{setSub(t.id);setRev({})}}>{t.label}</button>
      ))}
    </div>
    {sub==="questions"&&renderList(questionWords,"q",true)}
    {sub==="prep"&&renderList(prepositions,"pr",true)}
    {sub==="conj"&&renderList(conjunctions,"cj",true)}
    {sub==="dir"&&renderList(directions,"dir",false)}
    {sub==="time"&&renderList(timeExpressions,"te",false)}
    {sub==="adj"&&renderList(adjectives,"adj",false)}
    {sub==="family"&&renderList(family,"fam",false)}
    {sub==="food"&&renderList(food,"fd",false)}
    {sub==="colors"&&renderList(colors,"col",false)}
    {sub==="body"&&renderList(bodyParts,"bp",false)}
    {sub==="home"&&renderList(homeItems,"hm",false)}
    {sub==="jobs"&&renderList(professions,"jb",false)}
    {sub==="ordinals"&&<div className="vlist">{ordinals.map((o,i)=>{
      const k="ord"+i; const isR=rev[k];
      return <div key={k} className={"vc"+(isR?" rev":"")} onClick={()=>toggle(k)}>
        <div className="ord-row"><span className="ord-num">{o.n}</span><span className="vg">{o.gr}</span></div><div className="vr"><R t={o.rom}/></div>
        {isR?<div className="vp">{o.pl}</div>:<div className="vh">▸ pokaż</div>}
      </div>
    })}</div>}
    {sub==="numbers"&&<div className="num-grid">{numbers.map((n,i)=>{
      const k="n"+i; const isR=rev[k];
      return <div key={k} className={"nc"+(isR?" rev":"")} onClick={()=>toggle(k)}>
        <div className="nn">{n.n}</div>
        {isR?<><div className="ng">{n.gr}</div><div className="nr"><R t={n.rom}/></div></>:<div className="nh">kliknij</div>}
      </div>
    })}</div>}
    {sub==="days"&&renderList(days,"d",false)}
    {sub==="months"&&renderList(months,"m",false)}
  </div>);
}

function GrammarView() {
  const [sub,setSub]=useState("na");
  const [open,setOpen]=useState(null);
  const [verbIdx,setVerbIdx]=useState(0);
  const [showConj,setShowConj]=useState(false);
  const v=verbs[verbIdx];
  return (<div>
    <div className="sh"><h2 className="st">Γραμματική — Gramatyka</h2></div>
    <div className="subtabs">
      {[{id:"na",label:"✨ Να (klej)"},{id:"pronouns",label:"🙋 Zaimki"},{id:"articles",label:"📎 Rodzajniki"},{id:"genders",label:"⚡ Rodzaje"},{id:"decl",label:"📐 Odmiany"},{id:"verbs",label:"🔄 Czasowniki"}].map(t=>(
        <button key={t.id} className={"stb"+(sub===t.id?" active":"")} onClick={()=>{setSub(t.id);setOpen(null);setShowConj(false)}}>{t.label}</button>
      ))}
    </div>

    {sub==="na"&&<div className="glist">
      <div className="gram-intro"><strong>Να</strong> to najważniejsza konstrukcja w greckim. Grecki nie ma bezokolicznika — zamiast 'mogę iść' mówisz 'mogę <strong>να</strong> idę'. Wzorzec: <strong>[czasownik 1] + να + [odmieniony czasownik 2]</strong></div>
      {naGroups.map((g,gi)=>(
        <div key={gi} className="gcard" style={{borderLeftColor:g.color}}>
          <div className="ghead"><span className="gname" style={{color:g.color}}>{g.title}</span></div>
          {g.items.map((item,ii)=>(
            <div key={ii} className="na-item">
              <div className="na-head">
                <span className="na-gr">{item.gr}</span>
                <span className="na-rom"><R t={item.rom}/></span>
              </div>
              <div className="na-pl">{item.pl}</div>
              <div className="ex-sentence">{item.ex}</div>
            </div>
          ))}
        </div>
      ))}
    </div>}

    {sub==="pronouns"&&<div className="glist">
      <div className="gram-intro">Grecki ma <strong>zaimki osobowe</strong> (ja, ty, on...), <strong>dzierżawcze</strong> (mój, twój...) i <strong>słabe zaimki dopełnienia</strong> (mnie, ciebie...). Dzierżawcze idą PO rzeczowniku: <strong>το σπίτι μου</strong> = dom mój.</div>
      <div className="dcard">
        <div className="dcard-head" style={{color:"#7c3aed"}}>Tabela zaimków</div>
        <div className="dcard-word">Osobowe + dzierżawcze + dopełnienie</div>
        <div className="overflow-x"><table className="dtable">
          <thead><tr><th>Osoba</th><th>Osobowy</th><th>Dzierżawczy</th><th>Dopełnienie</th></tr></thead>
          <tbody>{pronounsPersonal.map((p,i)=>(
            <tr key={i}>
              <td className="dtd-case">{p.person}</td>
              <td><div className="dtd-gr">{p.gr}</div><div className="dtd-rom"><R t={p.rom}/></div></td>
              <td><div className="dtd-gr">{p.poss.split(" ")[0]}</div><div className="dtd-rom"><R t={p.poss.split(" ").slice(1).join(" ")}/></div></td>
              <td><div className="dtd-gr">{p.weak.split(" ")[0]}</div><div className="dtd-rom"><R t={p.weak.split(" ").slice(1).join(" ")}/></div></td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>
      <div className="dcard">
        <div className="dcard-head" style={{color:"#7c3aed"}}>Jak ich używać?</div>
        <div className="verb-ex"><div className="vex-gr">Το σπίτι <strong>μου</strong> είναι μικρό.</div><div className="vex-rom"><R t="To spíti mu íne mikró."/></div><div className="vex-pl"><strong>Mój</strong> dom jest mały. (dosł. dom mój)</div></div>
        <div className="verb-ex"><div className="vex-gr"><strong>Σε</strong> βλέπω!</div><div className="vex-rom"><R t="Se vlépo!"/></div><div className="vex-pl">Widzę <strong>cię</strong>!</div></div>
        <div className="verb-ex"><div className="vex-gr"><strong>Αυτός</strong> μιλάει ελληνικά.</div><div className="vex-rom"><R t="Aftós milái eliniká."/></div><div className="vex-pl"><strong>On</strong> mówi po grecku.</div></div>
      </div>
    </div>}

    {sub==="articles"&&<div className="glist">
      <div className="gram-intro">W greckim <strong>rodzajnik jest obowiązkowy</strong> prawie zawsze. Odmienia się przez przypadki i rodzaje. Na A1 najważniejszy jest biernik — bo używasz go po większości czasowników.</div>
      <div className="dcard">
        <div className="dcard-head" style={{color:"#0891b2"}}>{articles.definite.title}</div>
        <div className="dcard-word">ο, η, το = odpowiednik ang. 'the'</div>
        <div className="overflow-x"><table className="dtable">
          <thead><tr><th>Przypadek</th><th>Męski</th><th>Żeński</th><th>Nijaki</th><th>M.mn</th><th>Ż.mn</th><th>N.mn</th></tr></thead>
          <tbody>{articles.definite.rows.map((r,i)=>(
            <tr key={i}><td className="dtd-case">{r.c}</td><td className="dtd-gr">{r.m}</td><td className="dtd-gr">{r.f}</td><td className="dtd-gr">{r.n}</td><td className="dtd-gr">{r.mpl}</td><td className="dtd-gr">{r.fpl}</td><td className="dtd-gr">{r.npl}</td></tr>
          ))}</tbody>
        </table></div>
      </div>
      <div className="dcard">
        <div className="dcard-head" style={{color:"#0891b2"}}>{articles.indefinite.title}</div>
        <div className="dcard-word">ένας, μία, ένα = odpowiednik ang. 'a/an' (tylko l.poj.)</div>
        <div className="overflow-x"><table className="dtable">
          <thead><tr><th>Przypadek</th><th>Męski</th><th>Żeński</th><th>Nijaki</th></tr></thead>
          <tbody>{articles.indefinite.rows.map((r,i)=>(
            <tr key={i}><td className="dtd-case">{r.c}</td><td className="dtd-gr">{r.m}</td><td className="dtd-gr">{r.f}</td><td className="dtd-gr">{r.n}</td></tr>
          ))}</tbody>
        </table></div>
      </div>
      <div className="dcard">
        <div className="dcard-head" style={{color:"#0891b2"}}>Kiedy który?</div>
        <div className="verb-ex"><div className="vex-gr">Βλέπω <strong>τον</strong> φίλο.</div><div className="vex-rom"><R t="Vlépo ton fílo."/></div><div className="vex-pl">Widzę (tego) przyjaciela. — biernik męski</div></div>
        <div className="verb-ex"><div className="vex-gr">Θέλω <strong>ένα</strong> νερό.</div><div className="vex-rom"><R t="Thélo éna neró."/></div><div className="vex-pl">Chcę (jedną) wodę. — nieokreślony nijaki</div></div>
        <div className="verb-ex"><div className="vex-gr">Το βιβλίο <strong>της</strong> μητέρας.</div><div className="vex-rom"><R t="To vivlío tis mitéras."/></div><div className="vex-pl">Książka matki. — dopełniacz żeński</div></div>
      </div>
    </div>}

    {sub==="genders"&&<div className="glist">
      <div className="gram-intro">W greckim każdy rzeczownik ma rodzaj. Rodzaj rozpoznajesz po <strong>rodzajniku</strong> i <strong>końcówce</strong>.</div>
      {genderIntro.map((g,gi)=>(
        <div key={gi} className="gcard" style={{borderLeftColor:g.color}}>
          <div className="ghead" style={{color:g.color}}>
            <span className="gart">{g.article}</span>
            <span className="gname">{g.gender}</span>
          </div>
          <div className="gend">Końcówki: {g.endings.join(", ")}</div>
          <div className="gex">{g.examples.map((e,j)=>(
            <div key={j} className="gex-item"><span className="gex-gr">{e.gr}</span><span className="gex-rom"><R t={e.rom}/></span><span className="gex-pl">{e.pl}</span></div>
          ))}</div>
        </div>
      ))}
    </div>}

    {sub==="decl"&&<div className="glist">
      <div className="gram-intro">Na A1 najważniejsze są 3 przypadki: mianownik (kto?), biernik (kogo?), i dopełniacz (czyj?). Biernik jest najczęstszy — używasz go po prawie każdym czasowniku.</div>
      {declensions.map((d,di)=>(
        <div key={di} className="dcard">
          <div className="dcard-head" style={{color:d.color}}>{d.title}</div>
          <div className="dcard-word">{d.word}</div>
          <table className="dtable">
            <thead><tr><th>Przypadek</th><th>l.poj.</th><th>l.mn.</th></tr></thead>
            <tbody>{d.cases.map((c,ci)=>(
              <tr key={ci}>
                <td className="dtd-case">{c.c}<div className="dtd-use">{c.use}</div></td>
                <td><div className="dtd-gr">{c.sg}</div><div className="dtd-rom"><R t={c.sgR}/></div></td>
                <td><div className="dtd-gr">{c.pl}</div><div className="dtd-rom"><R t={c.plR}/></div></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      ))}
    </div>}

    {sub==="verbs"&&<div className="glist">
      <div className="gram-intro">Grecki ma 3 główne typy odmian czasowników. Czas przyszły tworzy się przez <strong>θα + forma</strong>. Na A1 skup się na czasie teraźniejszym.</div>

      <div className="vpatterns">
        <div className="vpat-title">Wzory końcówek — czas teraźniejszy</div>
        {verbEndingsTable.patterns.map((p,i)=>(
          <div key={i} className="vpat-row">
            <div className="vpat-type">{p.type}</div>
            <div className="vpat-ends">{p.persons.map((pr,j)=>(
              <span key={j} className="vpat-cell"><span className="vpat-p">{pr}</span><span className="vpat-e">{p.endings[j]}</span></span>
            ))}</div>
          </div>
        ))}
        <div className="vpat-note">🔮 Przyszły: {verbEndingsTable.future}</div>
        <div className="vpat-note">⏪ Przeszły: {verbEndingsTable.past}</div>
      </div>

      <div className="verb-nav">
        {verbs.map((vb,i)=>(
          <button key={i} className={"vnb"+(verbIdx===i?" active":"")} onClick={()=>{setVerbIdx(i);setShowConj(false)}}>
            {vb.gr}
          </button>
        ))}
      </div>
      <div className="verb-card">
        <div className="verb-head">
          <span className="verb-gr">{v.gr}</span>
          <span className="verb-rom"><R t={v.rom}/></span>
          <span className="verb-pl">= {v.pl}</span>
          <span className="verb-type">{v.type}</span>
        </div>
        <button className="conj-btn" onClick={()=>setShowConj(!showConj)}>
          {showConj?"▾ Ukryj koniugację":"▸ Pokaż koniugację (czas teraźniejszy)"}
        </button>
        {showConj&&<table className="conj-table">
          <tbody>{v.present.map((p,i)=>(
            <tr key={i}><td className="conj-per">{p.person}</td><td className="conj-form">{p.form}</td><td className="conj-rom"><R t={p.rom}/></td></tr>
          ))}</tbody>
        </table>}
        <div className="verb-times">
          <div className="vt-row"><span className="vt-label">⏪ Przeszły:</span><span className="vt-val">{v.pastHint}</span></div>
          <div className="vt-row"><span className="vt-label">🔮 Przyszły:</span><span className="vt-val">{v.futureHint}</span></div>
        </div>
        <div className="verb-ex-title">Przykłady użycia:</div>
        {v.examples.map((e,i)=>(<div key={i} className="verb-ex"><div className="vex-gr">{e.gr}</div><div className="vex-rom"><R t={e.rom}/></div><div className="vex-pl">{e.pl}</div></div>))}
      </div>
    </div>}
  </div>);
}

function ReadingView() {
  const [currentLevel,setCurrentLevel]=useState(0);
  const [revealedItems,setRevealedItems]=useState({});
  const [revealMode,setRevealMode]=useState("syllable");
  const level=readingLevels[currentLevel];
  return (<div>
    <div className="sh"><h2 className="st">Ανάγνωση — Czytanie</h2><p className="sd">Od sylab do pełnych zdań — ucz się czytać wzrokowo</p></div>
    <div className="subtabs">
      {readingLevels.map((lv,i)=>(
        <button key={i} className={"stb"+(currentLevel===i?" active":"")} onClick={()=>{setCurrentLevel(i);setRevealedItems({})}}>
          {lv.level}. {lv.title}
        </button>
      ))}
    </div>
    <div className="mode-bar">
      <span className="mode-label">Tryb:</span>
      {[{id:"syllable",label:"Sylaby"},{id:"full",label:"Pełna wymowa"},{id:"hidden",label:"Test!"}].map(m=>(
        <button key={m.id} className={"stb"+(revealMode===m.id?" active":"")} onClick={()=>setRevealMode(m.id)}>{m.label}</button>
      ))}
    </div>
    <div className="vlist">
      {level.items.map((item,i)=>{
        const isRevealed=revealedItems[i];
        return (
          <div key={currentLevel+"-"+i} className={"vc"+(isRevealed?" rev":"")} onClick={()=>setRevealedItems(p=>({...p,[i]:!p[i]}))}>
            {revealMode==="syllable"?(
              <div className="syl-wrap">
                {item.syllables.map((syl,j)=>syl===" "?<span key={j} className="syl-sp"/>:(
                  <span key={j} className="syl-b"><span className="syl-g">{syl}</span><span className="syl-r"><R t={item.rom[j]}/></span></span>
                ))}
              </div>
            ):revealMode==="full"?(
              <div className="rd-full">
                <div className="rd-gr">{item.gr}</div>
                <div className="rd-rom"><R t={item.rom.join("")}/></div>
              </div>
            ):(
              <div className="rd-full"><div className="rd-gr">{item.gr}</div><div className="rd-hint">przeczytaj sam/a, potem kliknij</div>
              </div>
            )}
            {isRevealed?(
              <div className="rd-trans">
                {revealMode==="hidden"&&<div className="rd-reveal"><R t={item.rom.join("")}/></div>}
                <div className="rd-pl">{item.pl}</div>
              </div>
            ):<div className="vh">▸ sprawdź</div>}
          </div>
        );
      })}
    </div>
  </div>);
}


function VerbDrillView() {
  const persons=["εγώ","εσύ","αυτός/ή","εμείς","εσείς","αυτοί/ές"];
  const [show,setShow]=useState(false);
  const [vIdx,setVIdx]=useState(0);
  const [pIdx,setPIdx]=useState(0);
  const v=drillVerbs[vIdx]; const p=persons[pIdx];
  const next=()=>{setShow(false);const np=Math.floor(Math.random()*persons.length);const nv=Math.floor(Math.random()*drillVerbs.length);setPIdx(np);setVIdx(nv);};
  return (<div>
    <div className="sh"><h2 className="st">Dryl czasowników</h2><p className="sd">Jak najszybciej podaj formę</p></div>
    <div className="vlist">
      <div className="vc" style={{textAlign:"center",padding:32}}>
        <div style={{fontSize:14,color:"#999",marginBottom:8}}>Odmień czasownik:</div>
        <div style={{fontFamily:"'Literata',serif",fontSize:32,fontWeight:700,color:"#1b3a5c"}}>{v.inf}</div>
        <div style={{fontSize:16,color:"#999",marginTop:4}}>({v.pl})</div>
        <div style={{marginTop:20,padding:"12px 24px",background:"rgba(30,90,138,.06)",borderRadius:16,display:"inline-block"}}>
          <span style={{fontSize:20,fontWeight:700,color:"#2874a6"}}>{p}</span>
        </div>
        {!show?<div style={{marginTop:24}}><button className="stb active" onClick={()=>setShow(true)}>Pokaż odpowiedź</button></div>
        :<div style={{marginTop:24}}>
          <div style={{fontFamily:"'Literata',serif",fontSize:28,fontWeight:700,color:"#4a7c59"}}>{v.forms[p]}</div>
          <div style={{marginTop:16,display:"flex",gap:8,justifyContent:"center"}}>
            <button className="stb" onClick={next}>Następny →</button>
          </div>
        </div>}
      </div>
      <div className="vc">
        <div style={{fontSize:14,color:"#999",marginBottom:8}}>Pełna koniugacja: {v.inf}</div>
        {persons.map(pr=><div key={pr} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #f4f3ee"}}>
          <span style={{color:"#999",fontSize:15}}>{pr}</span>
          <span style={{fontFamily:"'Literata',serif",fontSize:17,fontWeight:600,color:"#1b3a5c"}}>{v.forms[pr]}</span>
        </div>)}
      </div>
    </div>
  </div>);
}

function WordPatternsView() {
  const [open,setOpen]=useState(null);
  return (<div>
    <div className="sh"><h2 className="st">Wzorce słowotwórcze</h2><p className="sd">Znając wzorzec, zgadniesz setki nowych słów</p></div>
    <div className="vlist">
      {wordPatterns.map((wp,i)=>(
        <div key={i} className={"vc"+(open===i?" rev":"")} onClick={()=>setOpen(open===i?null:i)}>
          <div className="vg">{wp.suffix}</div>
          <div className="vr">= {wp.meaning}</div>
          {open===i&&<div style={{marginTop:12}}>{wp.examples.map((e,j)=>(
            <div key={j} style={{padding:"10px 0",borderBottom:j<wp.examples.length-1?"1px solid #f0ede8":"none"}}>
              <div className="na-head"><span className="na-gr">{e.gr}</span><span className="na-rom"><R t={e.rom}/></span></div>
              <div className="na-pl">{e.pl}</div>
              <div style={{fontSize:13,color:"#2874a6",marginTop:2}}>← {e.root}</div>
            </div>
          ))}</div>}
        </div>
      ))}
    </div>
  </div>);
}

function CommonWordsView() {
  const [openGr,setOpenGr]=useState(null);
  const [rev,setRev]=useState({});
  const totalWords=commonWordGroups.reduce((a,g)=>a+g.words.length,0);
  return (<div>
    <div className="sh"><h2 className="st">{totalWords} najczęstszych słów</h2><p className="sd">~80% codziennej mowy greckiej</p></div>
    <div className="vlist">
      {commonWordGroups.map((g,gi)=>(
        <div key={gi}>
          <div className="cat-card" onClick={()=>setOpenGr(openGr===gi?null:gi)}>
            <span className="cc-title">{g.title}</span>
            <span className="cc-count">{g.words.length}</span>
          </div>
          {openGr===gi&&<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,padding:"6px 0"}}>
            {g.words.map((w,wi)=>{
              const k=gi+"-"+wi; const isR=rev[k];
              return <div key={k} className={"nc"+(isR?" rev":"")} onClick={()=>setRev(p=>({...p,[k]:!p[k]}))} style={{minHeight:70}}>
                <div style={{fontFamily:"'Literata',serif",fontSize:18,fontWeight:700,color:"#1b3a5c"}}>{w.gr}</div>
                {isR?<><div style={{fontSize:12,color:"#999",fontStyle:"italic"}}><R t={w.rom}/></div><div style={{fontSize:13,color:"#333",fontWeight:500}}>{w.pl}</div></>
                :<div style={{fontSize:12,color:"#ccc"}}>kliknij</div>}
              </div>
            })}
          </div>}
        </div>
      ))}
    </div>
  </div>);
}

function DictHub() {
  const [tab,setTab]=useState("alphabet");
  return (<div>
    <div className="subtabs" style={{padding:"12px 24px"}}>
      {[{id:"alphabet",label:"Alfabet",ico:"Αα"},{id:"vocab",label:"Słowa",ico:"📚"},{id:"grammar",label:"Gramatyka",ico:"📐"},{id:"phrases",label:"Wyrażenia",ico:"💬"},{id:"patterns",label:"Wzorce",ico:"🔬"},{id:"common",label:"⭐ Top 400+"}].map(t=>(
        <button key={t.id} className={"stb"+(tab===t.id?" active":"")} onClick={()=>setTab(t.id)}><Ico e={t.ico} size={16}/> {t.label}</button>
      ))}
    </div>
    {tab==="alphabet"&&<AlphabetView/>}
    {tab==="vocab"&&<VocabView/>}
    {tab==="grammar"&&<GrammarView/>}
    {tab==="phrases"&&<PhrasesView/>}
    {tab==="patterns"&&<WordPatternsView/>}
    {tab==="common"&&<CommonWordsView/>}
  </div>);
}


function LessonPage({lessonId,onBack}) {
  const [rev,setRev]=useState({});
  const lesson=lessons.find(l=>l.id===lessonId);
  if(!lesson) return null;
  return (<div>
    <div className="sh">
      <button className="back-btn" onClick={onBack}>← Lekcje</button>
      <h2 className="st"><span style={{display:"inline-flex",verticalAlign:"middle",marginRight:10}}><Ico e={lesson.emoji} size={26}/></span>{lesson.title}</h2>
      <p className="sd">{lesson.desc}</p>
    </div>
    <div className="vlist">
      {lesson.sections.map((s,si)=>(
        <div key={si}>
          <div style={{fontFamily:"'Literata',serif",fontSize:19,fontWeight:700,color:"#1b3a5c",padding:"18px 0 4px"}}>{s.title}</div>
          {s.text&&<div style={{fontSize:16,color:"#555",lineHeight:1.6,paddingBottom:2}}>{s.text}</div>}
          {s.catIds&&(()=>{const allItems=s.catIds.flatMap(cid=>{const cat=categories.find(x=>x.id===cid);return cat?cat.phrases:[];});return allItems.map((p,pi)=>{
            const k="l"+lesson.id+"s"+si+"i"+pi; const isR=rev[k];
            return <div key={k} className={"vc"+(isR?" rev":"")} onClick={()=>setRev(pr=>({...pr,[k]:!pr[k]}))}>
              <div className="vg">{p.gr}</div><div className="vr"><R t={p.rom}/></div>
              {isR?<><div className="vp">{p.pl}</div>{p.note&&<span className="vnote">{p.note}</span>}</>:<div className="vh">▸ pokaż</div>}
            </div>})})()}
        </div>
      ))}
    </div>
  </div>);
}

function PracticeHub() {
  const [mode,setMode]=useState("reading");
  return (<div>
    <div className="subtabs" style={{padding:"12px 24px"}}>
      {[{id:"reading",label:"Czytanie",ico:"📖"},{id:"verbs",label:"Odmiana",ico:"📋"},{id:"drill",label:"Dryl",ico:"🔄"},{id:"comp",label:"📝 Teksty"}].map(t=>(
        <button key={t.id} className={"stb"+(mode===t.id?" active":"")} onClick={()=>setMode(t.id)}>{t.label}</button>
      ))}
    </div>
    {mode==="reading"&&<ReadingView/>}
    {mode==="verbs"&&<VerbTablesView/>}
    {mode==="drill"&&<VerbDrillView/>}
    
  </div>);
}

function PhrasesView() {
  const [group,setGroup]=useState(null);
  const [cat,setCat]=useState(null);
  const [rev,setRev]=useState({});
  const c=cat?categories.find(x=>x.id===cat):null;
  const g=group?phraseGroups.find(x=>x.id===group):null;
  const groupCats=g?categories.filter(x=>g.cats.includes(x.id)):[];

  if(!group) return (<div>
    <div className="sh"><h2 className="st">Εκφράσεις</h2><p className="sd">Wybierz temat</p></div>
    <div className="group-grid">{phraseGroups.map(pg=>(
      <div key={pg.id} className="group-card" onClick={()=>{setGroup(pg.id);setCat(null);setRev({})}}>
        <Ico e={pg.icon} size={28} bg/>
        <div className="gc-title">{pg.title}</div>
        <div className="gc-desc">{pg.desc}</div>
        <div className="gc-count">{categories.filter(x=>pg.cats.includes(x.id)).reduce((a,c)=>a+c.phrases.length,0)} fraz</div>
      </div>
    ))}</div>
  </div>);

  if(!cat) return (<div>
    <div className="sh">
      <button className="back-btn" onClick={()=>setGroup(null)}>← Wstecz</button>
      <h2 className="st">{g.icon} {g.title}</h2>
    </div>
    <div className="cat-list">{groupCats.map(gc=>(
      <div key={gc.id} className="cat-card" onClick={()=>{setCat(gc.id);setRev({})}}>
        <Ico e={gc.icon} size={20}/>
        <span className="cc-title">{gc.title}</span>
        <span className="cc-count">{gc.phrases.length}</span>
      </div>
    ))}</div>
  </div>);

  return (<div>
    <div className="sh">
      <button className="back-btn" onClick={()=>setCat(null)}>← {g.title}</button>
      <h2 className="st"><span style={{display:"inline-flex",verticalAlign:"middle",marginRight:10}}><Ico e={c.icon} size={24}/></span>{c.title}</h2>
    </div>
    <div className="vlist">{c.phrases.map((p,i)=>{
      const k=c.id+i; const isR=rev[k];
      return <div key={k} className={"vc"+(isR?" rev":"")} onClick={()=>setRev(pr=>({...pr,[k]:!pr[k]}))}>
        <div className="vg">{p.gr}</div><div className="vr"><R t={p.rom}/></div>
        {isR?<><div className="vp">{p.pl}</div>{p.note&&<span className="vnote">{p.note}</span>}</>:<div className="vh">▸ pokaż</div>}
      </div>
    })}</div>
  </div>);
}

/* ===== MAIN ===== */
export default function App() {
  const [view,setView]=useState(null);
  const [dark,setDark]=useState(false);
  const home=()=>setView(null);
  const lessonMatch=view?view.match(/^lesson-(\d+)$/):null;
  const lessonId=lessonMatch?parseInt(lessonMatch[1]):null;

  return (
    <div className={"root"+(dark?" dark":"")}>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,400;7..72,600;7..72,700&family=DM+Sans:wght@400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
.root{font-family:'DM Sans',sans-serif;min-height:100vh;background:#f8f6f1;color:#1a1a1a;padding-bottom:88px;font-size:17px;-webkit-tap-highlight-color:transparent}
.hdr{background:linear-gradient(160deg,#1b3a5c 0%,#1e5a8a 60%,#2874a6 100%);padding:40px 24px 28px;color:#fff;position:relative;overflow:hidden}
.hdr::before{content:'';position:absolute;top:-40%;right:-20%;width:300px;height:300px;background:radial-gradient(circle,rgba(255,255,255,.06) 0%,transparent 70%);border-radius:50%}
.hdr-l{font-size:12px;text-transform:uppercase;letter-spacing:3px;opacity:.4;margin-bottom:6px}
.hdr-t{font-family:'Literata',serif;font-size:28px;font-weight:700;position:relative}
.bnav{position:fixed;bottom:0;left:0;right:0;background:rgba(255,255,255,.92);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);display:flex;z-index:100;border-top:1px solid rgba(0,0,0,.06);padding-bottom:env(safe-area-inset-bottom,0)}
.nb{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:12px 0 10px;border:none;background:none;color:#999;cursor:pointer;font-family:'DM Sans',sans-serif;transition:.2s}
.nb.a{color:#1e5a8a}
.nb-i{font-size:20px;height:26px;display:flex;align-items:center;justify-content:center;font-family:'Literata',serif;font-weight:700}
.nb-l{font-size:11px;font-weight:600;letter-spacing:.2px}
.sh{padding:20px 24px 8px}
.st{font-family:'Literata',serif;font-size:28px;font-weight:700;color:#1b3a5c}
.sd{font-size:16px;color:#999;margin-top:4px;line-height:1.5}
.back-btn{background:none;border:none;font-family:'DM Sans',sans-serif;font-size:15px;color:#2874a6;cursor:pointer;padding:0;margin-bottom:8px;font-weight:600}
.subtabs{display:flex;gap:8px;padding:10px 24px 14px;overflow-x:auto;scrollbar-width:none}
.subtabs::-webkit-scrollbar{display:none}
.stb{flex-shrink:0;padding:14px 22px;border-radius:100px;border:none;background:rgba(30,90,138,.06);font-family:'DM Sans',sans-serif;font-size:15px;font-weight:600;color:#1b3a5c;cursor:pointer;white-space:nowrap;transition:all .25s}
.stb:active{transform:scale(.96)}
.stb.active{background:#1e5a8a;color:#fff;box-shadow:0 4px 14px rgba(30,90,138,.25)}
.group-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;padding:8px 24px 28px}
@media(min-width:640px){.group-grid{grid-template-columns:repeat(3,1fr)}}
.group-card{background:#fff;border-radius:22px;padding:24px 20px;cursor:pointer;transition:all .3s;box-shadow:0 2px 12px rgba(0,0,0,.04);text-align:center;display:flex;flex-direction:column;align-items:center}
.group-card:active{transform:scale(.97)}
.group-card:hover{box-shadow:0 6px 24px rgba(0,0,0,.08);transform:translateY(-2px)}
.gc-icon{font-size:36px;margin-bottom:8px}
.gc-title{font-family:'Literata',serif;font-size:18px;font-weight:700;color:#1b3a5c}
.gc-desc{font-size:14px;color:#999;margin-top:4px;line-height:1.4}
.gc-count{font-size:12px;color:#2874a6;font-weight:600;margin-top:8px;background:rgba(40,116,166,.08);padding:4px 12px;border-radius:20px}
.cat-list{padding:6px 24px 28px;display:flex;flex-direction:column;gap:4px}
.cat-card{background:#fff;border-radius:18px;padding:18px 22px;cursor:pointer;transition:all .25s;box-shadow:0 2px 10px rgba(0,0,0,.04);display:flex;align-items:center;gap:14px}
.cat-card:active{transform:scale(.98)}
.cat-card:hover{box-shadow:0 4px 16px rgba(0,0,0,.07)}
.cc-icon{font-size:24px;flex-shrink:0}
.cc-title{font-size:18px;font-weight:600;color:#1b3a5c;flex:1}
.cc-count{font-size:14px;color:#999;background:#f4f3ee;padding:4px 12px;border-radius:20px;flex-shrink:0}
.alpha-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:12px 24px 24px}
@media(min-width:480px){.alpha-grid{grid-template-columns:repeat(4,1fr)}}
@media(min-width:640px){.alpha-grid{grid-template-columns:repeat(6,1fr)}}
.ac{background:#fff;border-radius:20px;padding:16px 8px;text-align:center;border:none;box-shadow:0 2px 10px rgba(0,0,0,.04);cursor:pointer;transition:all .3s;min-height:115px;display:flex;flex-direction:column;align-items:center;justify-content:center}
.ac:active{transform:scale(.96)}.ac:hover{box-shadow:0 6px 20px rgba(0,0,0,.08)}
.ac.fl{background:#1b3a5c;color:#fff;box-shadow:0 4px 16px rgba(27,58,92,.3)}
.al{display:flex;gap:6px;align-items:baseline}
.au{font-family:'Literata',serif;font-size:40px;font-weight:700;color:#1b3a5c}.ac.fl .au{color:#fff}
.alo{font-family:'Literata',serif;font-size:24px;color:#93afc5}.ac.fl .alo{color:rgba(255,255,255,.6)}
.an{font-size:14px;color:#bbb;margin-top:5px}
.asb{font-size:14px;font-weight:600;color:#4a7c59;background:#eef5f0;padding:3px 12px;border-radius:10px;margin-top:5px}
.at{font-size:14px;color:rgba(255,255,255,.75);line-height:1.5;margin-bottom:6px;padding:0 6px}
.ae{display:flex;flex-direction:column;align-items:center;gap:3px}
.aeg{font-family:'Literata',serif;font-size:19px;font-weight:600;color:#7bb8d9}
.aer{font-size:16px;color:rgba(255,255,255,.45);font-style:italic}
.aep{font-size:16px;color:rgba(255,255,255,.8)}
.dtog{display:block;margin:8px 24px 14px;padding:16px 22px;width:calc(100% - 48px);background:#fff;border:none;border-radius:18px;font-family:'DM Sans',sans-serif;font-size:16px;font-weight:600;color:#c4853a;cursor:pointer;text-align:left;box-shadow:0 2px 10px rgba(0,0,0,.04)}
.dlist{padding:0 24px 24px;display:flex;flex-direction:column;gap:10px}
.dc{background:#fff;border-radius:18px;padding:18px 22px;box-shadow:0 2px 10px rgba(0,0,0,.04)}
.dctop{display:flex;align-items:center;justify-content:space-between}
.dcc{font-family:'Literata',serif;font-size:22px;font-weight:700;color:#1b3a5c}
.dcsb{font-size:15px;font-weight:600;color:#4a7c59;background:#eef5f0;padding:4px 14px;border-radius:10px}
.dct{font-size:15px;color:#999;margin-top:6px;line-height:1.4}
.dce{display:flex;align-items:baseline;gap:12px;margin-top:10px;padding-top:10px;border-top:1px solid #f0ede8;flex-wrap:wrap}
.dcg{font-family:'Literata',serif;font-size:19px;font-weight:600;color:#1b3a5c}
.dcr{font-size:16px;color:#999;font-style:italic}.dcp{font-size:16px;color:#666}
.num-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:12px 24px 28px}
@media(min-width:480px){.num-grid{grid-template-columns:repeat(4,1fr)}}
@media(min-width:640px){.num-grid{grid-template-columns:repeat(5,1fr)}}
.nc{background:#fff;border-radius:18px;padding:16px 8px;text-align:center;border:none;box-shadow:0 2px 10px rgba(0,0,0,.04);cursor:pointer;transition:all .25s;min-height:100px;display:flex;flex-direction:column;align-items:center;justify-content:center}
.nc:active{transform:scale(.96)}.nc:hover{box-shadow:0 4px 16px rgba(0,0,0,.07)}.nc.rev{background:#f0f7fb;box-shadow:0 2px 12px rgba(30,90,138,.1)}
.nn{font-family:'Literata',serif;font-size:30px;font-weight:700;color:#1b3a5c}
.ng{font-family:'Literata',serif;font-size:17px;font-weight:600;color:#2874a6;margin-top:6px}
.nr{font-size:14px;color:#999;font-style:italic;margin-top:2px}.nh{font-size:14px;color:#ccc;margin-top:6px}
.vlist{padding:10px 24px 28px;display:flex;flex-direction:column;gap:6px}
.vc{background:#fff;border-radius:16px;padding:16px 20px;border:none;box-shadow:0 2px 10px rgba(0,0,0,.04);cursor:pointer;transition:all .25s}
.vc:active{transform:scale(.99)}.vc:hover{box-shadow:0 4px 16px rgba(0,0,0,.07)}.vc.rev{background:#f6fafe;box-shadow:0 2px 14px rgba(30,90,138,.08)}
.vg{font-family:'Literata',serif;font-size:26px;font-weight:600;color:#1b3a5c}
.vr{font-size:19px;color:#888;font-style:italic;margin-top:4px}
.vp{font-size:20px;color:#222;margin-top:10px;padding-top:10px;border-top:1px solid #eee;font-weight:500}
.vh{font-size:16px;color:#bbb;margin-top:6px}
.vnote{font-size:15px;color:#fff;background:#c4853a;display:inline-block;padding:4px 14px;border-radius:10px;margin-top:8px}
.glist{padding:10px 24px 28px;display:flex;flex-direction:column;gap:16px}
.gram-intro{font-size:17px;color:#666;line-height:1.7;padding:10px 0}
.gram-intro strong{color:#1b3a5c}
.gcard{background:#fff;border-radius:22px;padding:24px 22px;box-shadow:0 2px 10px rgba(0,0,0,.04);border-left:5px solid}
.ghead{display:flex;align-items:center;gap:12px;font-weight:700}
.gart{font-family:'Literata',serif;font-size:38px;font-weight:700}
.gname{font-size:18px}
.gend{font-size:15px;color:#999;margin-top:6px}
.gex{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:14px}
@media(min-width:640px){.gex{grid-template-columns:repeat(3,1fr)}}
.gex-item{background:#f8f6f1;border-radius:14px;padding:14px 16px;display:flex;flex-direction:column;gap:2px}
.gex-gr{font-family:'Literata',serif;font-size:18px;font-weight:600;color:#1b3a5c}
.gex-rom{font-size:16px;color:#999;font-style:italic}
.gex-pl{font-size:17px;color:#555}
.dcard{background:#fff;border-radius:22px;padding:24px 22px;box-shadow:0 2px 10px rgba(0,0,0,.04)}
.dcard-head{font-family:'Literata',serif;font-size:22px;font-weight:700;color:#1b3a5c}
.dcard-word{font-size:16px;color:#999;margin-top:4px;margin-bottom:14px}
.dtable{width:100%;border-collapse:collapse;font-size:16px}
.dtable th{text-align:left;padding:12px 10px;background:#f8f6f1;font-size:14px;font-weight:600;color:#999;border-bottom:2px solid #eee}
.dtable td{padding:14px 10px;border-bottom:1px solid #f4f3ee;vertical-align:top}
.dtd-case{font-weight:600;color:#1b3a5c;font-size:16px}
.dtd-use{font-size:13px;color:#bbb;font-weight:400;margin-top:2px}
.dtd-gr{font-family:'Literata',serif;font-size:19px;font-weight:600;color:#2874a6}
.dtd-rom{font-size:16px;color:#999;font-style:italic;margin-top:2px}
.vpatterns{background:#fff;border-radius:22px;padding:24px 22px;box-shadow:0 2px 10px rgba(0,0,0,.04);margin-bottom:12px}
.vpat-title{font-family:'Literata',serif;font-size:20px;font-weight:700;color:#1b3a5c;margin-bottom:16px}
.vpat-row{margin-bottom:18px}
.vpat-type{font-size:15px;font-weight:600;color:#666;margin-bottom:8px}
.vpat-ends{display:flex;flex-wrap:wrap;gap:6px}
.vpat-cell{background:#f8f6f1;border-radius:12px;padding:10px 12px;display:flex;flex-direction:column;align-items:center;min-width:60px;flex:1}
.vpat-p{font-size:13px;color:#999;margin-bottom:2px}.vpat-e{font-family:'Literata',serif;font-size:20px;font-weight:700;color:#1b3a5c}
.vpat-note{font-size:15px;color:#888;margin-top:10px;line-height:1.6;padding:12px 0;border-top:1px solid #f0ede8}
.verb-nav{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px}
.vnb{padding:12px 20px;border-radius:100px;border:none;background:rgba(30,90,138,.06);font-family:'Literata',serif;font-size:18px;font-weight:600;color:#1b3a5c;cursor:pointer;transition:all .25s}
.vnb:active{transform:scale(.96)}
.vnb.active{background:#1e5a8a;color:#fff;box-shadow:0 4px 14px rgba(30,90,138,.25)}
.verb-card{background:#fff;border-radius:22px;padding:26px 24px;box-shadow:0 2px 10px rgba(0,0,0,.04)}
.verb-head{display:flex;flex-wrap:wrap;align-items:baseline;gap:12px;margin-bottom:14px}
.verb-gr{font-family:'Literata',serif;font-size:32px;font-weight:700;color:#1b3a5c}
.verb-rom{font-size:18px;color:#999;font-style:italic}
.verb-pl{font-size:18px;color:#333;font-weight:500}
.verb-type{font-size:14px;color:#fff;background:#c4853a;padding:4px 14px;border-radius:10px}
.conj-btn{display:block;width:100%;padding:16px 20px;border-radius:16px;border:none;background:rgba(30,90,138,.04);color:#1b3a5c;font-family:'DM Sans',sans-serif;font-size:16px;font-weight:600;cursor:pointer;text-align:left;margin-bottom:14px;transition:.2s}
.conj-btn:active{background:rgba(30,90,138,.08)}
.conj-table{width:100%;border-collapse:collapse;margin-bottom:16px}
.conj-table td{padding:12px;border-bottom:1px solid #f4f3ee;font-size:16px}
.conj-per{color:#999;font-size:15px;min-width:100px}
.conj-form{font-family:'Literata',serif;font-size:22px;font-weight:600;color:#1b3a5c}
.conj-rom{font-size:17px;color:#999;font-style:italic}
.verb-times{padding:14px 0;border-top:1px solid #f0ede8}
.vt-row{font-size:15px;color:#666;margin:6px 0;line-height:1.6}
.vt-label{font-weight:600;margin-right:8px}
.vt-val{color:#999;font-style:italic}
.verb-ex-title{font-size:16px;font-weight:700;color:#1b3a5c;margin:14px 0 8px;padding-top:14px;border-top:1px solid #f0ede8}
.verb-ex{padding:16px 18px;background:#f8f6f1;border-radius:16px;margin-bottom:8px}
.vex-gr{font-family:'Literata',serif;font-size:21px;font-weight:600;color:#2874a6}
.vex-rom{font-size:17px;color:#999;font-style:italic;margin-top:2px}
.vex-pl{font-size:18px;color:#555;margin-top:4px}

/* UNIFIED COMPONENTS */
.ex-sentence{font-size:17px;color:#2874a6;margin-top:8px;padding:12px 16px;background:rgba(40,116,166,.04);border-radius:14px;font-style:italic;line-height:1.5}
.overflow-x{overflow-x:auto;-webkit-overflow-scrolling:touch}
.na-item{padding:14px 0;border-bottom:1px solid #f0ede8}
.na-item:last-child{border-bottom:none}
.na-head{display:flex;flex-wrap:wrap;align-items:baseline;gap:10px}
.na-gr{font-family:'Literata',serif;font-size:22px;font-weight:700;color:#1b3a5c}
.na-rom{font-size:18px;color:#999;font-style:italic}
.na-pl{font-size:18px;color:#555;margin-top:3px}
.ord-row{display:flex;align-items:baseline;gap:10px}
.ord-num{font-family:'Literata',serif;font-size:22px;font-weight:700;color:#bbb}
.section-color{font-weight:700}
.syl-wrap{display:flex;flex-wrap:wrap;gap:6px;align-items:flex-end}
.syl-sp{width:16px}
.syl-b{display:flex;flex-direction:column;align-items:center;background:#f0ede8;border-radius:12px;padding:10px 14px 8px;min-width:40px}
.syl-g{font-family:'Literata',serif;font-size:28px;font-weight:600;color:#1b3a5c;line-height:1.2}
.syl-r{font-size:16px;color:#999;font-style:italic;line-height:1.3}
.rd-full{text-align:center;padding:8px 0}
.rd-gr{font-family:'Literata',serif;font-size:32px;font-weight:600;color:#1b3a5c;line-height:1.4}
.rd-rom{font-size:20px;color:#999;font-style:italic;margin-top:5px}
.rd-hint{font-size:17px;color:#ccc;margin-top:6px;font-style:italic}
.rd-trans{margin-top:14px;padding-top:14px;border-top:1px solid #eee}
.rd-reveal{font-size:19px;color:#2874a6;font-style:italic;margin-bottom:4px}
.rd-pl{font-size:20px;color:#333;font-weight:500}
.mode-bar{display:flex;align-items:center;gap:8px;padding:6px 24px 14px}
.mode-label{font-size:15px;color:#999}

/* DASHBOARD */
.dash{padding:8px 20px 40px}
.dash-section{margin-bottom:24px}
.dash-label{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#999;padding:12px 4px 10px}
.dash-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
@media(min-width:500px){.dash-grid{grid-template-columns:repeat(3,1fr)}}
.dash-card{background:#fff;border-radius:20px;padding:22px 18px;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.04);transition:all .3s;display:flex;flex-direction:column}
.dash-card:active{transform:scale(.97)}
.dash-card:hover{box-shadow:0 6px 24px rgba(0,0,0,.08);transform:translateY(-2px)}
.dash-icon{font-size:30px;margin-bottom:8px}
.dash-title{font-family:'Literata',serif;font-size:17px;font-weight:700;color:#1b3a5c}
.dash-desc{font-size:13px;color:#999;margin-top:3px;line-height:1.3}
.hdr-back{background:none;border:none;color:rgba(255,255,255,.7);font-family:'DM Sans',sans-serif;font-size:15px;cursor:pointer;padding:0;margin-bottom:6px;font-weight:500}
.hdr-back:hover{color:#fff}
      
.dash-quick{display:flex;gap:10px;padding:12px 24px}
.dq-btn{flex:1;background:#fff;border:none;border-radius:16px;padding:16px;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.04);display:flex;align-items:center;gap:10px;transition:all .25s;font-family:'DM Sans',sans-serif}
.dq-btn:active{transform:scale(.97)}
.dq-btn:hover{box-shadow:0 4px 16px rgba(0,0,0,.07)}
.dq-icon{font-size:24px}
.dq-text{text-align:left}
.dq-title{font-size:15px;font-weight:700;color:#1b3a5c}
.dq-desc{font-size:12px;color:#999;margin-top:1px}
.lesson-list{padding:6px 24px 40px;display:flex;flex-direction:column;gap:4px}
.lesson-card{background:#fff;border-radius:18px;padding:18px 20px;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.04);display:flex;align-items:center;gap:14px;transition:all .25s}
.lesson-card:active{transform:scale(.98)}
.lesson-card:hover{box-shadow:0 4px 16px rgba(0,0,0,.07)}
.lc-emoji{flex-shrink:0}
.lc-body{flex:1;min-width:0}
.lc-title{font-family:'Literata',serif;font-size:16px;font-weight:700;color:#1b3a5c;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lc-desc{font-size:13px;color:#999;margin-top:2px}
.lc-num{font-size:13px;color:#bbb;flex-shrink:0}
.inner-page .hdr{padding:32px 24px 22px}
.home-btn{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1b3a5c;color:#fff;border:none;border-radius:100px;padding:14px 28px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:600;cursor:pointer;box-shadow:0 4px 20px rgba(27,58,92,.3);z-index:100;display:flex;align-items:center;gap:8px}
.home-btn:active{transform:translateX(-50%) scale(.96)}
      
.dash-quick{display:flex;gap:10px;padding:12px 24px}
.dq-btn{flex:1;background:#fff;border:none;border-radius:16px;padding:16px;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.04);display:flex;align-items:center;gap:10px;transition:all .25s;font-family:'DM Sans',sans-serif}
.dq-btn:active{transform:scale(.97)}
.dq-btn:hover{box-shadow:0 4px 16px rgba(0,0,0,.07)}
.dq-icon{font-size:24px}
.dq-text{text-align:left}
.dq-title{font-size:15px;font-weight:700;color:#1b3a5c}
.dq-desc{font-size:12px;color:#999;margin-top:1px}
.lesson-list{padding:6px 24px 40px;display:flex;flex-direction:column;gap:4px}
.lesson-card{background:#fff;border-radius:18px;padding:18px 20px;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.04);display:flex;align-items:center;gap:14px;transition:all .25s}
.lesson-card:active{transform:scale(.98)}
.lesson-card:hover{box-shadow:0 4px 16px rgba(0,0,0,.07)}
.lc-emoji{flex-shrink:0}
.lc-body{flex:1;min-width:0}
.lc-title{font-family:'Literata',serif;font-size:16px;font-weight:700;color:#1b3a5c;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lc-desc{font-size:13px;color:#999;margin-top:2px}
.lc-num{font-size:13px;color:#bbb;flex-shrink:0}
.home-btn{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1b3a5c;color:#fff;border:none;border-radius:100px;padding:14px 28px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:600;cursor:pointer;box-shadow:0 4px 20px rgba(27,58,92,.3);z-index:100;display:flex;align-items:center;gap:8px}
.home-btn:active{transform:translateX(-50%) scale(.96)}

/* MOBILE-FIRST RESPONSIVE */
@media(max-width:430px){
  .hdr{padding:48px 20px 24px}
  .hdr-t{font-size:26px}
  .sh{padding:20px 20px 8px}
  .vlist{padding:4px 20px 28px}
  .subtabs{padding:10px 20px 14px}
  .dash-quick{padding:10px 20px}
  .lesson-list{padding:8px 20px 40px}
  .alpha-grid{padding:10px 20px 20px;gap:8px}
  .num-grid{padding:10px 20px 24px;gap:8px}
  .vc{padding:14px 18px}
  .vg{font-size:24px}
  .group-grid{padding:8px 20px 28px;gap:10px}
}
@media(min-width:768px){
  .root{max-width:680px;margin:0 auto}
  .hdr{border-radius:0 0 28px 28px}
  .vg{font-size:28px}
  .vr{font-size:20px}
  .vp{font-size:22px}
  .st{font-size:32px}
  .rd-gr{font-size:36px}
}
@media(min-width:1024px){
  .root{max-width:720px}
}
/* Safe area for iPhone notch */
@supports(padding-top:env(safe-area-inset-top)){
  .hdr{padding-top:calc(40px + env(safe-area-inset-top))}
  .home-btn{bottom:calc(24px + env(safe-area-inset-bottom))}
}


/* FLOATING DARK MODE TOGGLE — always visible */
.dark-float{position:fixed;top:16px;right:16px;z-index:200;width:44px;height:44px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .3s;background:#1b3a5c;color:#fbbf24;box-shadow:0 4px 16px rgba(27,58,92,.4)}
.dark-float:hover{transform:scale(1.1);box-shadow:0 6px 20px rgba(27,58,92,.5)}
.dark-float:active{transform:scale(.95)}
.dark .dark-float{background:#fbbf24;color:#0f1419;box-shadow:0 4px 16px rgba(251,191,36,.3)}
.dark .dark-float:hover{box-shadow:0 6px 20px rgba(251,191,36,.4)}
@supports(padding-top:env(safe-area-inset-top)){.dark-float{top:calc(16px + env(safe-area-inset-top))}}

/* DARK MODE TOGGLE */


/* DARK MODE */
.dark{background:#0f1419;color:#d1d5db}
.dark .hdr{background:linear-gradient(160deg,#0a1929 0%,#0d2847 60%,#153d6b 100%)}
.dark .vc,.dark .ac,.dark .nc,.dark .dc,.dark .dcard,.dark .gcard,.dark .verb-card,.dark .vpatterns,.dark .cat-card,.dark .group-card,.dark .dash-card,.dark .lesson-card,.dark .dq-btn{background:#1a2332;box-shadow:0 2px 10px rgba(0,0,0,.3)}
.dark .vc:hover,.dark .ac:hover,.dark .nc:hover,.dark .cat-card:hover,.dark .group-card:hover,.dark .dash-card:hover,.dark .lesson-card:hover,.dark .dq-btn:hover{box-shadow:0 4px 20px rgba(0,0,0,.4)}
.dark .vc.rev,.dark .nc.rev{background:#162030;box-shadow:0 2px 14px rgba(40,116,166,.15)}
.dark .ac.fl{background:#1e3a5c;box-shadow:0 4px 16px rgba(30,58,92,.5)}

/* Dark text colors */
.dark .vg,.dark .nn,.dark .dcc,.dark .dcard-head,.dark .verb-gr,.dark .conj-form,.dark .na-gr,.dark .au,.dark .vpat-e,.dark .gex-gr,.dark .dcg,.dark .lc-title,.dark .cc-title,.dark .gc-title,.dark .dash-title,.dark .dq-title{color:#e2e8f0}
.dark .vr,.dark .nr,.dark .aer,.dark .vex-rom,.dark .na-rom,.dark .dtd-rom,.dark .conj-rom,.dark .gex-rom,.dark .rd-rom,.dark .syl-r,.dark .dcr{color:#6b7280}
.dark .vp,.dark .rd-pl,.dark .vex-pl,.dark .na-pl,.dark .gex-pl,.dark .dcp,.dark .verb-pl{color:#c9cdd3}
.dark .vh,.dark .nh,.dark .lc-num{color:#4a5568}
.dark .st{color:#93c5fd}
.dark .sd,.dark .gc-desc,.dark .dash-desc,.dark .dq-desc,.dark .lc-desc{color:#6b7280}
.dark .gram-intro{color:#9ca3af}
.dark .gram-intro strong{color:#93c5fd}
.dark .an,.dark .conj-per,.dark .dtd-case{color:#6b7280}
.dark .vnote{background:#92400e}
.dark .back-btn,.dark .hdr-back{color:rgba(147,197,253,.7)}

/* Dark backgrounds */
.dark .stb{background:rgba(147,197,253,.08);color:#93c5fd}
.dark .stb.active{background:#2563eb;color:#fff;box-shadow:0 4px 14px rgba(37,99,235,.3)}
.dark .syl-b,.dark .gex-item,.dark .vpat-cell,.dark .verb-ex{background:#111827}
.dark .ex-sentence{background:rgba(37,99,235,.08);color:#60a5fa}
.dark .dtog{background:#1a2332;color:#d97706}
.dark .asb,.dark .dcsb{background:rgba(74,124,89,.2);color:#6ee7b7}
.dark .dtable th{background:#111827;color:#6b7280;border-bottom-color:#2a3544}
.dark .dtable td,.dark .conj-table td,.dark .na-item{border-bottom-color:#1e293b}
.dark .vp,.dark .rd-trans{border-top-color:#1e293b}
.dark .gc-count,.dark .cc-count{background:#1e293b;color:#6b7280}

/* Dark interactive */
.dark .home-btn{background:#2563eb;box-shadow:0 4px 20px rgba(37,99,235,.4)}
.dark .dtd-gr,.dark .aeg,.dark .syl-g,.dark .rd-gr,.dark .vex-gr,.dark .rd-reveal{color:#60a5fa}
.dark .alo{color:#4a5568}
.dark .at,.dark .aep{color:rgba(255,255,255,.7)}

/* Dark mode for common words grid */
.dark .mode-label{color:#6b7280}
      `}</style>

      {!view&&<>
        <div className="hdr">
          <div className="hdr-l">Ελληνικά — Grecki A1</div>
          <div className="hdr-t">Γεια σου!</div>
        </div>
        <div className="dash-quick">
          <button className="dq-btn" onClick={()=>setView("practice")}>
            <Ico e="📖" size={22}/>
            <div className="dq-text"><div className="dq-title">Ćwiczenia</div><div className="dq-desc">Czytanie, dryl, teksty</div></div>
          </button>
          <button className="dq-btn" onClick={()=>setView("dict")}>
            <Ico e="📚" size={22}/>
            <div className="dq-text"><div className="dq-title">Słownik</div><div className="dq-desc">Alfabet, słowa, gramatyka</div></div>
          </button>
        </div>
        <div style={{padding:"8px 24px 4px"}}><div style={{fontSize:13,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"#999"}}>Twoja podróż</div></div>
        <div className="lesson-list">
          {lessons.map(l=>(
            <div key={l.id} className="lesson-card" onClick={()=>setView("lesson-"+l.id)}>
              <Ico e={l.emoji} size={22} bg/>
              <div className="lc-body"><div className="lc-title">{l.title}</div><div className="lc-desc">{l.desc}</div></div>
              <span className="lc-num">{l.id}/12</span>
            </div>
          ))}
        </div>
      </>}

      {view==="practice"&&<>
        <div className="hdr">
          <button className="hdr-back" onClick={home}>← Strona główna</button>
          <div className="hdr-t"><span style={{display:"inline-flex",verticalAlign:"middle",marginRight:10}}><Dumbbell size={24}/></span>Ćwiczenia</div>
        </div>
        <PracticeHub/>
        <button className="home-btn" onClick={home}><Home size={18}/> Strona główna</button>
      </>}

      {view==="dict"&&<>
        <div className="hdr">
          <button className="hdr-back" onClick={home}>← Strona główna</button>
          <div className="hdr-t"><span style={{display:"inline-flex",verticalAlign:"middle",marginRight:10}}><Library size={24}/></span>Słownik</div>
        </div>
        <DictHub/>
        <button className="home-btn" onClick={home}><Home size={18}/> Strona główna</button>
      </>}

      {lessonId&&<>
        <LessonPage lessonId={lessonId} onBack={home}/>
        <button className="home-btn" onClick={home}><Home size={18}/> Strona główna</button>
      </>}
      <button className="dark-float" onClick={()=>setDark(d=>!d)} aria-label="Toggle dark mode">
        {dark?<Sun size={16} strokeWidth={2.5}/>:<Moon size={16} strokeWidth={2.5}/>}
      </button>
    </div>
  );
}