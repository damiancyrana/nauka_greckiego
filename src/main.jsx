import { useState, useEffect } from "react";
import { Volume2, Moon, Sun, ChevronLeft, ChevronRight, Check, Lock, Mic, BarChart3, MessageCircle, BookOpen, Flame, RotateCcw, Gauge } from "lucide-react";
import { a2Lessons, a2Dialogues, a2Readers } from "./a2data.js";
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
    {gr:"Είμαι ενθουσιασμένος/η!",rom:"Íme enthusiazménos/i!",pl:"Jestem podekscytowany/a!"},
    {gr:"Είμαι αγχωμένος/η.",rom:"Íme anchoménos/i.",pl:"Jestem zestresowany/a."},
    {gr:"Ανησυχώ.",rom:"Anisichó.",pl:"Martwię się."},
    {gr:"Φοβάμαι.",rom:"Fováme.",pl:"Boję się."},
    {gr:"Βαριέμαι.",rom:"Variéme.",pl:"Nudzę się."},
    {gr:"Χαίρομαι που σε βλέπω!",rom:"Chérome pu se vlépo!",pl:"Cieszę się, że cię widzę!"},
    {gr:"Χαίρομαι πολύ!",rom:"Chérome polí!",pl:"Bardzo się cieszę!"},
    {gr:"Λυπάμαι.",rom:"Lipáme.",pl:"Przykro mi. / Współczuję."},
    {gr:"Νιώθω καλά / άσχημα.",rom:"Niótho kalá / áschima.",pl:"Czuję się dobrze / źle."},
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
    {gr:"Δεν νιώθω καλά.",rom:"Den niótho kalá.",pl:"Nie czuję się dobrze."},
    {gr:"Πονάει εδώ.",rom:"Ponái edó.",pl:"Boli tutaj."},
    {gr:"Πονάει το κεφάλι μου.",rom:"Ponái to kefáli mu.",pl:"Boli mnie głowa."},
    {gr:"Πονάει η κοιλιά μου.",rom:"Ponái i kiliá mu.",pl:"Boli mnie brzuch."},
    {gr:"Έχω πυρετό.",rom:"Écho piretó.",pl:"Mam gorączkę."},
    {gr:"Έχω αλλεργία σε...",rom:"Écho alerjía se...",pl:"Mam alergię na..."},
    {gr:"Χρειάζομαι γιατρό.",rom:"Chriázome jatró.",pl:"Potrzebuję lekarza."},
    {gr:"Πού είναι το πιο κοντινό νοσοκομείο;",rom:"Pú íne to pio kondinó nosokomío?",pl:"Gdzie jest najbliższy szpital?"},
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
    {gr:"Είσαι ό,τι πιο σημαντικό στη ζωή μου.",rom:"Íse óti pio simandikó sti zoí mu.",pl:"Jesteś najważniejszą osobą w moim życiu."},
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
    {gr:"Είναι πολύ νόστιμο! Ποιος το μαγείρεψε;",rom:"Íne polí nóstimo! Piós to majírepse?",pl:"Jest bardzo smaczne! Kto to ugotował?",note:"ZAWSZE chwal jedzenie matki"},
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
    {gr:"νιώθω",rom:"niótho",pl:"czuję"},{gr:"φαίνεται",rom:"fénete",pl:"wydaje się"},
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
    {gr:"το μεσημέρι",rom:"to mesiméri",pl:"południe"},
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
    {gr:"διαβατήριο",rom:"diavatírio",pl:"paszport"},{gr:"χάρτης",rom:"chártis",pl:"mapa"},
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
    {gr:"πενήντα",rom:"penínda",pl:"50"},{gr:"εκατό",rom:"ekató",pl:"100"},{gr:"χίλια",rom:"chília",pl:"1000"},
  ]},
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
  {n:50,gr:"πενήντα",rom:"penínda"},{n:60,gr:"εξήντα",rom:"eksínda"},{n:70,gr:"εβδομήντα",rom:"evdomínda"},
  {n:80,gr:"ογδόντα",rom:"ogdónda"},{n:90,gr:"ενενήντα",rom:"enenínda"},{n:100,gr:"εκατό",rom:"ekató"},
  {n:1000,gr:"χίλια",rom:"chília"},
];


/* ===== KORYTARZ NAUKI: 13 lekcji rdzenia (0-12) + 2 bonusowe ===== */
const lessons = [
  { id:0, emoji:"Αα", title:"Alfabet i czytanie", desc:"24 litery, dwuznaki, pierwsze czytanie",
    sections:[
      {type:"text", title:"Zanim zaczniesz", body:"Grecki alfabet wyglada obco, ale wiele liter juz znasz: Α=a, Ε=e, Ι/Η=i, Ο/Ω=o, Κ=k, Μ=m, Ν=n, Τ=t. Kliknij kazda litere, posluchaj 🔊 i odkryj wymowe."},
      {type:"letters"},
      {type:"grammar", title:"4 pulapki — zapamietaj je", rule:"Β = „w” (nie „b”!) · Η = „i” (nie „h”!) · Ρ = „r” (nie „p”!) · Υ = „i” (nie „y”!). Te cztery zapamietaj — reszta jest logiczna."},
      {type:"reading", title:"Pierwsze czytanie — pojedyncze slowa", level:0},
      {type:"text", title:"Gotowe!", body:"Umiesz juz przeliterowac greckie slowa. Od teraz kazda fraza w kursie ma 🔊 — sluchaj i powtarzaj na glos."},
    ]},
  { id:1, emoji:"👋", title:"Powitania", desc:"Przywitaj sie i badz uprzejmy",
    sections:[
      {type:"text", title:"Pierwsze slowa", body:"Od tych zwrotow zaczyna sie kazda rozmowa po grecku. Kliknij fraze, posluchaj i odkryj tlumaczenie."},
      {type:"phrases", title:"Powitania i pozegnania", catIds:["basics"]},
      {type:"phrases", title:"Uprzejmosci", catIds:["polite"]},
    ]},
  { id:2, emoji:"🙋", title:"Ja i ty", desc:"Przedstaw sie, zapytaj, zaprzecz",
    sections:[
      {type:"grammar", title:"είμαι — „byc” (najwazniejszy czasownik)",
        table:{head:["Osoba","Forma","Wymowa"], rows:[["ja","είμαι","íme"],["ty","είσαι","íse"],["on/ona","είναι","íne"],["my","είμαστε","ímaste"],["wy","είστε","íste"],["oni","είναι","íne"]]}, speakCol:1},
      {type:"grammar", title:"Jak powiedziec NIE", rule:"Δεν (den) przed czasownikiem = nie. Δεν είμαι = nie jestem · Δεν ξέρω = nie wiem · Δεν καταλαβαίνω = nie rozumiem. W greckim kazde slowo ma tez rodzaj (ο/η/το) — poznasz go w Lekcji 4."},
      {type:"phrases", title:"Jak sie czujesz? Skad jestes?", catIds:["state"]},
      {type:"phrases", title:"Podstawowe pytania", catIds:["ask"]},
    ]},
  { id:3, emoji:"🔢", title:"Liczby, czas, cena", desc:"Policz, zapytaj o godzine i cene",
    sections:[
      {type:"text", title:"Liczby to podstawa", body:"Bez nich nie zaplacisz, nie umowisz sie, nie kupisz biletu. Kliknij, zeby odkryc i posluchac."},
      {type:"numbers"},
      {type:"grammar", title:"Liczby zlozone", rule:"Laczysz dziesiatki z jednosciami: είκοσι ένα = 21, τριάντα πέντε = 35, σαράντα οχτώ = 48. Setki: διακόσια = 200, πεντακόσια = 500."},
      {type:"phrases", title:"Ile kosztuje? O ktorej?", catIds:["numctx","time"]},
    ]},
  { id:4, emoji:"☕", title:"W kawiarni", desc:"Zamow, zaplac, pochwal",
    sections:[
      {type:"grammar", title:"Rodzajniki ο / η / το", rule:"Kazdy rzeczownik ma rodzaj: ο (meski) · η (zenski) · το (nijaki). Np. ο καφές (kawa), η σαλάτα (salatka), το νερό (woda). „Chce kawe” to: θα ήθελα έναν καφέ."},
      {type:"phrases", title:"W kawiarni", catIds:["cafe"]},
      {type:"reading", title:"Poczytaj: kawiarnia", level:2},
    ]},
  { id:5, emoji:"🗺️", title:"Kierunki", desc:"Znajdz droge i zapytaj gdzie",
    sections:[
      {type:"grammar", title:"4 przyimki = 80% sytuacji",
        table:{head:["Grecki","Wymowa","Znaczenie"], rows:[["σε","se","do / w / na"],["από","apó","z / od"],["με","me","z (kims/czyms)"],["για","jia","dla / o"]]}, speakCol:0},
      {type:"phrases", title:"Ruch i miejsce", catIds:["move"]},
      {type:"phrases", title:"Czy jest tu blisko...?", catIds:["avail"]},
    ]},
  { id:6, emoji:"👨‍👩‍👧", title:"Rodzina", desc:"Opowiedz o bliskich",
    sections:[
      {type:"words", title:"Rodzina", items:[
        {gr:"η μητέρα",rom:"i mitéra",pl:"matka"},{gr:"ο πατέρας",rom:"o patéras",pl:"ojciec"},
        {gr:"ο αδερφός",rom:"o aderfós",pl:"brat"},{gr:"η αδερφή",rom:"i aderfí",pl:"siostra"},
        {gr:"ο γιος",rom:"o jios",pl:"syn"},{gr:"η κόρη",rom:"i kóri",pl:"corka"},
        {gr:"ο φίλος",rom:"o fílos",pl:"przyjaciel"},{gr:"η οικογένεια",rom:"i ikojénia",pl:"rodzina"}]},
      {type:"grammar", title:"Moj, twoj, jego — ida PO rzeczowniku",
        table:{head:["Grecki","Wymowa","Znaczenie"], rows:[["... μου","mu","moj"],["... σου","su","twoj"],["... του","tu","jego"],["... της","tis","jej"]]}, speakCol:0,
        note:"το σπίτι μου = dom moj · η μητέρα σου = matka twoja"},
      {type:"phrases", title:"Opisywanie osob i rzeczy", catIds:["describe"]},
    ]},
  { id:7, emoji:"✨", title:"Θέλω να... (klucz do greckiego)", desc:"Chce / moge / musze cos zrobic",
    sections:[
      {type:"grammar", title:"Najwazniejsza regula", rule:"Grecki nie ma bezokolicznika. Zamiast „chce isc” mowisz „chce ΝΑ ide”: θέλω να πάω. Wzor: [czasownik] + να + [odmieniony czasownik]."},
      {type:"grammar", title:"3 czasowniki, ktore otwieraja wszystko",
        table:{head:["Grecki","Wymowa","Znaczenie"], rows:[["θέλω να...","thélo na","chce..."],["μπορώ να...","boró na","moge..."],["πρέπει να...","prépi na","musze..."]]}, speakCol:0},
      {type:"phrases", title:"Kluczowe konstrukcje", catIds:["modal"]},
      {type:"phrases", title:"Wiem, rozumiem, lubie", catIds:["know"]},
    ]},
  { id:8, emoji:"🛒", title:"Zakupy i podroz", desc:"Kup, przymierz, dojedz",
    sections:[
      {type:"grammar", title:"Przymiotnik zmienia sie z rodzajem",
        table:{head:["Meski","Zenski","Nijaki","Znaczenie"], rows:[["μεγάλος","μεγάλη","μεγάλο","duzy"],["μικρός","μικρή","μικρό","maly"],["καλός","καλή","καλό","dobry"]]}},
      {type:"phrases", title:"Na zakupach", catIds:["shopping"]},
      {type:"phrases", title:"Preferencje", catIds:["pref"]},
      {type:"phrases", title:"Na lotnisku", catIds:["airport"]},
    ]},
  { id:9, emoji:"🌤️", title:"Pogoda i czasy", desc:"Mow o jutrze i wczoraj",
    sections:[
      {type:"grammar", title:"Przyszlosc i przeszlosc", rule:"Przyszly = θα + czasownik: θα πάω = pojde, θα φάω = zjem. Przeszly (proste zdarzenie) ma koncowki -α, -ες, -ε: πήγα = poszedlem, έφαγα = zjadlem."},
      {type:"phrases", title:"Pogoda", catIds:["weather"]},
      {type:"phrases", title:"Laczenie zdan", catIds:["connect"]},
    ]},
  { id:10, emoji:"💬", title:"Rozmowa", desc:"Reaguj, proponuj, umow sie",
    sections:[
      {type:"grammar", title:"Tryb rozkazujacy (krotko)", rule:"Έλα! = Chodz! · Πες μου = Powiedz mi · Περίμενε = Poczekaj · Πάμε! = Chodzmy! Przydaje sie na co dzien."},
      {type:"phrases", title:"Reakcje — brzmisz jak Grek", catIds:["react"]},
      {type:"phrases", title:"Kiedy nie rozumiesz", catIds:["rescue"]},
      {type:"phrases", title:"Proponujesz i umawiasz sie", catIds:["suggest","meetup"]},
    ]},
  { id:11, emoji:"❤️‍🩹", title:"Emocje i zdrowie", desc:"Powiedz jak sie czujesz, popros o pomoc",
    sections:[
      {type:"phrases", title:"Emocje i uczucia", catIds:["emotions"]},
      {type:"phrases", title:"U lekarza", catIds:["doctor"]},
    ]},
  { id:12, emoji:"🎓", title:"Laczenie wszystkiego", desc:"Opowiadaj, zaprzeczaj, chwal",
    sections:[
      {type:"text", title:"Masz wszystkie klocki", body:"να, spojniki, czasy, przyimki, rodzajniki. Teraz budujesz dluzsze wypowiedzi."},
      {type:"phrases", title:"Narracja", catIds:["narrate"]},
      {type:"phrases", title:"Przeczenia", catIds:["neg"]},
      {type:"phrases", title:"Komplementy", catIds:["compliment"]},
      {type:"reading", title:"Trudniejsze czytanie", level:7},
      {type:"text", title:"Καλή τύχη! 🎉", body:"Jestes gotowy na poziom A1. Zacznij rozmawiac z Grekami — i baw sie dobrze!"},
    ]},
  { id:13, emoji:"💕", title:"Milosc i flirt", desc:"Randki, komplementy, uczucia", bonus:true,
    sections:[
      {type:"text", title:"Bonus", body:"Material poza glownym kursem — gdy bedziesz gotowy."},
      {type:"phrases", title:"Pierwsze podejscie", catIds:["approach"]},
      {type:"phrases", title:"Randki i flirt", catIds:["firstdate","flirt"]},
      {type:"phrases", title:"Wyrazanie uczuc", catIds:["feelings","petnames"]},
      {type:"phrases", title:"Zwiazek i rodzina partnera", catIds:["relationship","meetfamily"]},
    ]},
  { id:14, emoji:"🔥", title:"Jak Grek (18+)", desc:"Nerwy, przeklenstwa, ulica", bonus:true, adult:true,
    sections:[
      {type:"text", title:"Uwaga — wulgaryzmy", body:"Prawdziwy jezyk ulicy. Uzywaj z glowa — kontekst jest wszystkim."},
      {type:"phrases", title:"Zlosc i codzienne nerwy", catIds:["angry","everyday"]},
      {type:"phrases", title:"Przeklenstwa", catIds:["curse"]},
      {type:"phrases", title:"Μαλάκα — instrukcja obslugi", catIds:["malaka"]},
      {type:"phrases", title:"Klotnie", catIds:["argue"]},
    ]},
];


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

/* tempo wymowy — domyslnie wolne, zapisywane w localStorage */
const RATES = [0.5, 0.7, 0.85, 1.0];
function loadRate(){
  try{ const r=parseFloat(localStorage.getItem("greek-rate")); return RATES.indexOf(r)>=0 ? r : 0.7; }
  catch(e){ return 0.7; }
}
let _rate = loadRate();
function setRate(r){ _rate=r; try{ localStorage.setItem("greek-rate", String(r)); }catch(e){} }

function speak(text){
  try{
    if(!window.speechSynthesis || !text) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text));
    u.lang = "el-GR";
    if(!_elVoice) _elVoice = pickVoice();
    if(_elVoice) u.voice = _elVoice;
    u.rate = _rate;
    window.speechSynthesis.speak(u);
  }catch(e){}
}
function Speak({text,size}){
  return <button className="spk" aria-label="Posluchaj wymowy" onClick={(e)=>{e.stopPropagation();speak(text);}}>
    <Volume2 size={size||18} strokeWidth={2}/>
  </button>;
}
const RATE_LABEL = {0.5:"0.5×", 0.7:"0.7×", 0.85:"0.85×", 1:"1×"};
function SpeedControl(){
  const [r,setR]=useState(_rate);
  const cycle=()=>{ const nr=RATES[(RATES.indexOf(r)+1)%RATES.length]; setRate(nr); setR(nr); };
  return <button className="speed-ctl" onClick={cycle} title="Tempo wymowy" aria-label={"Tempo wymowy "+RATE_LABEL[r]+", kliknij aby zmienic"}>
    <Gauge size={14}/> {RATE_LABEL[r]}
  </button>;
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
        <button className="spk spk-corner" aria-label="Posluchaj przyklad" onClick={(e)=>{e.stopPropagation();speak(l.example);}}><Volume2 size={15}/></button>
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
        ? <><div className="ng" lang="el">{n.gr}</div><div className="nr"><R t={n.rom}/></div><button className="spk spk-corner" aria-label="Posluchaj" onClick={(e)=>{e.stopPropagation();speak(n.gr);}}><Volume2 size={14}/></button></>
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
  const [showBonus,setShowBonus]=useState(false);
  const [showA2,setShowA2]=useState(false);
  const core = lessons.filter(l=>!l.bonus);
  const bonus = lessons.filter(l=>l.bonus);
  const next = core.find(l=>!done.has(l.id)) || core[core.length-1];
  const doneCount = core.filter(l=>done.has(l.id)).length;
  const pct = Math.round(doneCount/core.length*100);
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
          <div className="hkicker">Ελληνικά · Grecki A1–A2</div>
          <h1 className="htitle" lang="el">Γεια σου!</h1>
        </div>
        <div className="hhdr-r">
          {streak>0 && <span className="streak"><Flame size={15}/> {streak}</span>}
          <SpeedControl/>
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
        <div className="hprogress-txt">Lekcje A1: {doneCount}/{core.length}</div>
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
    <div className="sec-label">Kurs A1 — podstawy</div>
    <div className="llist">{core.map(card)}</div>

    <button className="sec-tog" onClick={()=>setShowA2(s=>!s)}>{showA2?"▾":"▸"} Rozdzial A2 — rozwiniecie ({a2Lessons.length})</button>
    {showA2 && <div className="llist">{a2Lessons.map(card)}</div>}

    <button className="sec-tog" onClick={()=>setShowBonus(s=>!s)}>{showBonus?"▾":"▸"} Bonus — poza kursem ({bonus.length})</button>
    {showBonus && <div className="llist">{bonus.map(card)}</div>}

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
        ? <button className="ex-audio" onClick={()=>speak(ex.audio)} aria-label="Posluchaj"><Volume2 size={30}/><span>Posluchaj</span></button>
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
    <div className="llist">{a2Dialogues.map(d=>(
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
    <div className="llist">{a2Readers.map(r=>(
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
  const [pool]=useState(()=>buildPool({categories, commonWordGroups, numbers, a2Lessons}));
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

  const allLessons = lessons.concat(a2Lessons);
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
  else if(route.t==="dialog"){ const d=a2Dialogues.find(x=>x.id===route.id); body = d?<DialogueView dialogue={d} onHome={goHome}/>:homeEl; }
  else if(route.t==="readers") body = <ReadersView onOpen={openReader} onHome={goHome}/>;
  else if(route.t==="reader"){ const r=a2Readers.find(x=>x.id===route.id); body = r?<ReaderView reader={r} onHome={goHome}/>:homeEl; }
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
