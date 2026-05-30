/* ===== Tresc A2: lekcje (15-22), dialogi, czytanki ===== */

export const a2Lessons = [
  { id:15, emoji:"⏪", title:"Αόριστος — co zrobilem", desc:"Czas przeszly dokonany", level:"A2",
    sections:[
      {type:"text", title:"Przeszlosc dokonana", body:"Αόριστος opisuje czynnosc zakonczona w przeszlosci („zrobilem”). Koncowki: -α, -ες, -ε, -αμε, -ατε, -αν. Czesto temat sie zmienia, a z przodu pojawia sie ε- (np. γράφω → έγραψα)."},
      {type:"grammar", title:"Najczestsze formy nieregularne",
        table:{head:["Teraz","Αόριστος","Znaczenie"], rows:[
          ["γράφω","έγραψα","napisalem"],["διαβάζω","διάβασα","przeczytalem"],
          ["τρώω","έφαγα","zjadlem"],["πίνω","ήπια","wypilem"],
          ["πάω","πήγα","poszedlem"],["βλέπω","είδα","zobaczylem"],
          ["λέω","είπα","powiedzialem"],["κάνω","έκανα","zrobilem"]]}, speakCol:1},
      {type:"words", title:"Slowa czasu przeszlego", items:[
        {gr:"χθες",rom:"chthes",pl:"wczoraj"},{gr:"προχθές",rom:"prochthés",pl:"przedwczoraj"},
        {gr:"πέρσι",rom:"pérsi",pl:"w zeszlym roku"},{gr:"πριν λίγο",rom:"prin lígo",pl:"przed chwila"},
        {gr:"την περασμένη εβδομάδα",rom:"tin perazméni evdomáda",pl:"w zeszlym tygodniu"},
        {gr:"νωρίτερα",rom:"norítera",pl:"wczesniej"}]},
      {type:"words", title:"Powiedz to w przeszlosci", items:[
        {gr:"Χθες πήγα στη δουλειά.",rom:"Chthes píga sti duliá.",pl:"Wczoraj poszedlem do pracy."},
        {gr:"Είδα μια ωραία ταινία.",rom:"Ída mia oréa tenía.",pl:"Obejrzalem dobry film."},
        {gr:"Έφαγα σουβλάκι το βράδυ.",rom:"Éfaga suvláki to vrádi.",pl:"Zjadlem souvlaki wieczorem."},
        {gr:"Τι έκανες το Σαββατοκύριακο;",rom:"Ti ékanes to Savatokíriako?",pl:"Co robiles w weekend?"},
        {gr:"Μιλήσαμε πολλή ώρα.",rom:"Milísame polí óra.",pl:"Rozmawialismy dlugo."}]},
    ]},
  { id:16, emoji:"🔁", title:"Παρατατικός i aspekt", desc:"Robilem vs zrobilem",  level:"A2",
    sections:[
      {type:"text", title:"Dwa rodzaje przeszlosci", body:"Παρατατικός = czynnosc trwajaca lub powtarzana („robilem zwykle”). Αόριστος = jednorazowa i zakonczona („zrobilem raz”). To kluczowa roznica w greckim — tzw. aspekt."},
      {type:"grammar", title:"Porownaj formy",
        table:{head:["Teraz","Παρατατικός (trwale)","Αόριστος (raz)"], rows:[
          ["πίνω","έπινα","ήπια"],["τρώω","έτρωγα","έφαγα"],
          ["πηγαίνω","πήγαινα","πήγα"],["γράφω","έγραφα","έγραψα"],
          ["είμαι","ήμουν","—"]]}, speakCol:1},
      {type:"words", title:"Aspekt w zdaniach", items:[
        {gr:"Κάθε πρωί έπινα καφέ.",rom:"Káthe proí épina kafé.",pl:"Codziennie rano pilem kawe."},
        {gr:"Χθες ήπια τρεις καφέδες.",rom:"Chthes ípia tris kafédes.",pl:"Wczoraj wypilem trzy kawy."},
        {gr:"Όταν ήμουν παιδί, έπαιζα ποδόσφαιρο.",rom:"Ótan ímun pedí, épeza podósfero.",pl:"Gdy bylem dzieckiem, gralem w pilke."},
        {gr:"Διάβαζα όλη μέρα και τελικά διάβασα το βιβλίο.",rom:"Diávaza óli méra ke teliká diávasa to vivlío.",pl:"Czytalem caly dzien i w koncu przeczytalem ksiazke."}]},
    ]},
  { id:17, emoji:"🔮", title:"Przyszlosc i plany", desc:"θα + aspekt", level:"A2",
    sections:[
      {type:"text", title:"θα tworzy przyszlosc", body:"θα + forma dokonana = jednorazowo („zrobie”): θα πάω. θα + forma niedokonana = stale/powtarzalnie („bede robil”): θα πηγαίνω κάθε μέρα."},
      {type:"grammar", title:"Jednorazowo vs regularnie",
        table:{head:["Jednorazowo","Regularnie","Znaczenie"], rows:[
          ["θα πάω","θα πηγαίνω","pojde / bede chodzic"],
          ["θα φάω","θα τρώω","zjem / bede jadl"],
          ["θα γράψω","θα γράφω","napisze / bede pisac"]]}, speakCol:0},
      {type:"words", title:"Slowa przyszlosci", items:[
        {gr:"αύριο",rom:"ávrio",pl:"jutro"},{gr:"μεθαύριο",rom:"methávrio",pl:"pojutrze"},
        {gr:"του χρόνου",rom:"tu chrónu",pl:"za rok"},{gr:"σε λίγο",rom:"se lígo",pl:"za chwile"},
        {gr:"αργότερα",rom:"argótera",pl:"pozniej"}]},
      {type:"words", title:"Plany", items:[
        {gr:"Αύριο θα πάω στη θάλασσα.",rom:"Ávrio tha páo sti thálasa.",pl:"Jutro pojade nad morze."},
        {gr:"Του χρόνου θα μάθω καλά ελληνικά.",rom:"Tu chrónu tha mátho kalá eliniká.",pl:"Za rok bede dobrze mowic po grecku."},
        {gr:"Τι θα κάνεις το βράδυ;",rom:"Ti tha kánis to vrádi?",pl:"Co bedziesz robil wieczorem?"}]},
    ]},
  { id:18, emoji:"🔗", title:"Zaimki slabe", desc:"τον, την, μου, σου — i ich miejsce", level:"A2",
    sections:[
      {type:"text", title:"Krotkie zaimki", body:"Zastepuja rzeczownik: zamiast „widze Janka” mowisz „widze go”. Stoja PRZED czasownikiem (Σε βλέπω), ale PO rozkazie (Πες μου!)."},
      {type:"grammar", title:"Biernik i celownik",
        table:{head:["Kogo/co","Komu/czyj","Osoba"], rows:[
          ["με","μου","mnie / mi"],["σε","σου","ciebie / ci"],
          ["τον / την / το","του / της","go,ja / jemu,jej"],
          ["μας","μας","nas / nam"],["σας","σας","was / wam"],["τους","τους","ich / im"]]}, speakCol:0},
      {type:"words", title:"W zdaniach", items:[
        {gr:"Σε αγαπώ.",rom:"Se agapó.",pl:"Kocham cie."},
        {gr:"Τον ξέρω καλά.",rom:"Ton kséro kalá.",pl:"Znam go dobrze."},
        {gr:"Μου αρέσει αυτό.",rom:"Mu arési aftó.",pl:"To mi sie podoba."},
        {gr:"Πες μου την αλήθεια.",rom:"Pes mu tin alíthia.",pl:"Powiedz mi prawde."},
        {gr:"Δώσε μου το, παρακαλώ.",rom:"Dóse mu to, parakaló.",pl:"Daj mi to, prosze."},
        {gr:"Θα σε πάρω τηλέφωνο.",rom:"Tha se páro tiléfono.",pl:"Zadzwonie do ciebie."}]},
    ]},
  { id:19, emoji:"📊", title:"Porownania", desc:"Wiekszy, najlepszy, bardziej", level:"A2",
    sections:[
      {type:"text", title:"Stopniowanie", body:"Wyzszy: πιο + przymiotnik + από. Najwyzszy: ο/η/το πιο + przymiotnik. Kilka form jest nieregularnych."},
      {type:"grammar", title:"Formy nieregularne",
        table:{head:["Podstawa","Wyzszy","Najwyzszy"], rows:[
          ["καλός","καλύτερος","ο καλύτερος"],["κακός","χειρότερος","ο χειρότερος"],
          ["πολύ","περισσότερο","το περισσότερο"],["λίγο","λιγότερο","το λιγότερο"]]}, speakCol:1},
      {type:"words", title:"Porownuj", items:[
        {gr:"Αυτό είναι πιο μεγάλο από εκείνο.",rom:"Aftó íne pio megálo apó ekíno.",pl:"To jest wieksze od tamtego."},
        {gr:"Είσαι ο καλύτερος φίλος μου.",rom:"Íse o kalíteros fílos mu.",pl:"Jestes moim najlepszym przyjacielem."},
        {gr:"Η Αθήνα είναι πιο μεγάλη από τη Θεσσαλονίκη.",rom:"I Athína íne pio megáli apó ti Thesaloníki.",pl:"Ateny sa wieksze od Salonik."},
        {gr:"Σήμερα κάνει πιο κρύο από χθες.",rom:"Símera káni pio krío apó chthes.",pl:"Dzis jest zimniej niz wczoraj."}]},
    ]},
  { id:20, emoji:"🧩", title:"Zdania zlozone", desc:"Kiedy, bo, jesli, zeby", level:"A2",
    sections:[
      {type:"grammar", title:"Spojniki, ktore lacza zdania",
        table:{head:["Grecki","Wymowa","Znaczenie"], rows:[
          ["όταν","ótan","kiedy / gdy"],["επειδή","epidí","poniewaz"],
          ["αν","an","jesli"],["για να","jia na","zeby"],
          ["που","pu","ktory / ze"],["ενώ","enó","podczas gdy"],["αφού","afú","skoro / po tym jak"]]}, speakCol:0},
      {type:"words", title:"Lacz zdania", items:[
        {gr:"Όταν έρθεις, θα φάμε μαζί.",rom:"Ótan érthis, tha fáme mazí.",pl:"Kiedy przyjdziesz, zjemy razem."},
        {gr:"Δεν ήρθα επειδή ήμουν άρρωστος.",rom:"Den írtha epidí ímun árostos.",pl:"Nie przyszedlem, bo bylem chory."},
        {gr:"Αν έχεις χρόνο, πάμε βόλτα.",rom:"An échis chróno, páme vólta.",pl:"Jesli masz czas, chodzmy na spacer."},
        {gr:"Ήρθα για να σε βοηθήσω.",rom:"Írtha jia na se voithíso.",pl:"Przyszedlem, zeby ci pomoc."},
        {gr:"Ο άντρας που είδες είναι ο αδερφός μου.",rom:"O ándras pu ídes íne o aderfós mu.",pl:"Mezczyzna, ktorego widziales, to moj brat."}]},
    ]},
  { id:21, emoji:"💼", title:"Praca i sprawy w miescie", desc:"Biuro, urzad, wizyty", level:"A2",
    sections:[
      {type:"words", title:"Slownictwo", items:[
        {gr:"η δουλειά",rom:"i duliá",pl:"praca"},{gr:"το γραφείο",rom:"to grafío",pl:"biuro"},
        {gr:"ο συνάδελφος",rom:"o sinádelfos",pl:"kolega z pracy"},{gr:"το ραντεβού",rom:"to randevú",pl:"spotkanie / wizyta"},
        {gr:"η τράπεζα",rom:"i trápeza",pl:"bank"},{gr:"το ταχυδρομείο",rom:"to tachidromío",pl:"poczta"},
        {gr:"ο δήμος",rom:"o dímos",pl:"urzad miasta"},{gr:"τα χαρτιά",rom:"ta chartiá",pl:"dokumenty"}]},
      {type:"words", title:"Zalatw sprawe", items:[
        {gr:"Έχω ραντεβού στις τρεις.",rom:"Écho randevú stis tris.",pl:"Mam spotkanie o trzeciej."},
        {gr:"Θα ήθελα να κλείσω ένα ραντεβού.",rom:"Tha íthela na klíso éna randevú.",pl:"Chcialbym umowic wizyte."},
        {gr:"Υπάρχει ένα πρόβλημα με τον λογαριασμό.",rom:"Ipárchi éna próvlima me ton logariazmó.",pl:"Jest problem z rachunkiem."},
        {gr:"Θέλω να κάνω μια καταγγελία.",rom:"Thélo na káno mia katangelía.",pl:"Chce zlozyc reklamacje."},
        {gr:"Ποια χαρτιά χρειάζομαι;",rom:"Pia chartiá chriázome?",pl:"Jakie dokumenty potrzebuje?"}]},
    ]},
  { id:22, emoji:"🌍", title:"Zdrowie, podroz, opinie", desc:"Wyrazaj zdanie i radz sobie", level:"A2",
    sections:[
      {type:"words", title:"Wyrazanie opinii", items:[
        {gr:"Νομίζω ότι...",rom:"Nomízo óti...",pl:"Mysle, ze..."},
        {gr:"Κατά τη γνώμη μου...",rom:"Katá ti gnómi mu...",pl:"Moim zdaniem..."},
        {gr:"Συμφωνώ μαζί σου.",rom:"Simfonó mazí su.",pl:"Zgadzam sie z toba."},
        {gr:"Διαφωνώ.",rom:"Diafonó.",pl:"Nie zgadzam sie."},
        {gr:"Έχεις δίκιο.",rom:"Échis díkio.",pl:"Masz racje."}]},
      {type:"words", title:"Podroz", items:[
        {gr:"Θα ήθελα να κλείσω ένα εισιτήριο.",rom:"Tha íthela na klíso éna isitírio.",pl:"Chcialbym kupic bilet."},
        {gr:"Πόση ώρα κάνει το ταξίδι;",rom:"Pósi óra káni to taksídi?",pl:"Ile trwa podroz?"},
        {gr:"Έχασα το λεωφορείο.",rom:"Échasa to leoforío.",pl:"Spoznilem sie na autobus."},
        {gr:"Πού μπορώ να αλλάξω χρήματα;",rom:"Pú boró na alákso chrímata?",pl:"Gdzie moge wymienic pieniadze?"}]},
      {type:"text", title:"Μπράβο! 🎉", body:"Masz fundamenty A2: czasy przeszle, aspekt, zaimki, porownania i zdania zlozone. Cwicz codziennie w sesji powtorek — to one utrwalaja material."},
    ]},
];

export const a2Dialogues = [
  { id:"d1", emoji:"☕", title:"W kawiarni", desc:"Zamow i pogadaj",
    lines:[
      {who:"A", gr:"Καλημέρα! Τι θα θέλατε;", rom:"Kaliméra! Ti tha thélate?", pl:"Dzien dobry! Czego sobie zyczycie?"},
      {who:"B", gr:"Καλημέρα. Έναν freddo espresso, παρακαλώ.", rom:"Kaliméra. Énan fredo espréso, parakaló.", pl:"Dzien dobry. Freddo espresso, prosze."},
      {who:"A", gr:"Με ζάχαρη ή χωρίς;", rom:"Me záchari í chorís?", pl:"Z cukrem czy bez?"},
      {who:"B", gr:"Χωρίς, ευχαριστώ. Πόσο κάνει;", rom:"Chorís, efcharistó. Póso káni?", pl:"Bez, dziekuje. Ile kosztuje?"},
      {who:"A", gr:"Τρία ευρώ. Καθίστε, θα σας το φέρω.", rom:"Tría evró. Kathíste, tha sas to féro.", pl:"Trzy euro. Prosze usiasc, przyniose."},
    ],
    roleplay:[
      {prompt:"Kelner pyta: „Τι θα θέλατε;”. Co mowisz?", options:["Έναν καφέ, παρακαλώ.","Πού είναι το μετρό;","Καληνύχτα."], answer:"Έναν καφέ, παρακαλώ."},
      {prompt:"Pyta „Με ζάχαρη ή χωρίς;”. Wybierasz bez cukru:", options:["Χωρίς, ευχαριστώ.","Ναι, δύο καφέδες.","Δεν ξέρω πού είναι."], answer:"Χωρίς, ευχαριστώ."},
    ]},
  { id:"d2", emoji:"🗺️", title:"Pytanie o droge", desc:"Znajdz droge do metra",
    lines:[
      {who:"A", gr:"Συγγνώμη, πού είναι το μετρό;", rom:"Signómi, pú íne to metró?", pl:"Przepraszam, gdzie jest metro?"},
      {who:"B", gr:"Πηγαίνετε ευθεία και μετά δεξιά.", rom:"Pijénete efthía ke metá deksiá.", pl:"Prosze isc prosto, a potem w prawo."},
      {who:"A", gr:"Είναι μακριά;", rom:"Íne makriá?", pl:"Czy to daleko?"},
      {who:"B", gr:"Όχι, πέντε λεπτά με τα πόδια.", rom:"Óchi, pénde leptá me ta pódia.", pl:"Nie, piec minut piechota."},
      {who:"A", gr:"Σας ευχαριστώ πολύ!", rom:"Sas efcharistó polí!", pl:"Bardzo dziekuje!"},
    ],
    roleplay:[
      {prompt:"Chcesz grzecznie zapytac o droge. Zaczynasz od:", options:["Συγγνώμη, πού είναι...;","Δώσε μου το!","Είμαι κουρασμένος."], answer:"Συγγνώμη, πού είναι...;"},
      {prompt:"Uslyszales „πέντε λεπτά με τα πόδια”. To znaczy:", options:["piec minut piechota","piec euro","o piatej"], answer:"piec minut piechota"},
    ]},
];

export const a2Readers = [
  { id:"r1", emoji:"🏖️", title:"Μια μέρα στη θάλασσα", desc:"Krotka historia w czasie przeszlym",
    text:[
      {gr:"Χθες πήγα στη θάλασσα με τους φίλους μου.", rom:"Chthes píga sti thálasa me tus fílus mu.", pl:"Wczoraj poszedlem nad morze z przyjaciolmi."},
      {gr:"Κάναμε μπάνιο και μετά φάγαμε σε μια ταβέρνα.", rom:"Káname bánio ke metá fágame se mia tavérna.", pl:"Kapalismy sie, a potem zjedlismy w tawernie."},
      {gr:"Το φαγητό ήταν πολύ νόστιμο και φθηνό.", rom:"To fajitó ítan polí nóstimo ke fthinó.", pl:"Jedzenie bylo bardzo smaczne i tanie."},
      {gr:"Το βράδυ γυρίσαμε σπίτι κουρασμένοι αλλά χαρούμενοι.", rom:"To vrádi jirísame spíti kurazméni alá charúmeni.", pl:"Wieczorem wrocilismy do domu zmeczeni, ale szczesliwi."},
    ],
    questions:[
      {q:"Πού πήγε χθες;", options:["Στη θάλασσα","Στη δουλειά","Στο νοσοκομείο"], answer:"Στη θάλασσα"},
      {q:"Jakie bylo jedzenie?", options:["Smaczne i tanie","Drogie","Niedobre"], answer:"Smaczne i tanie"},
    ]},
  { id:"r2", emoji:"🛒", title:"Στο σούπερ μάρκετ", desc:"Codzienna scena",
    text:[
      {gr:"Σήμερα το πρωί πήγα στο σούπερ μάρκετ.", rom:"Símera to proí píga sto súper márket.", pl:"Dzis rano poszedlem do supermarketu."},
      {gr:"Αγόρασα ψωμί, γάλα, τυρί και φρούτα.", rom:"Agórasa psomí, gála, tirí ke frúta.", pl:"Kupilem chleb, mleko, ser i owoce."},
      {gr:"Δεν είχα αρκετά μετρητά, οπότε πλήρωσα με κάρτα.", rom:"Den ícha arketá metritá, opóte plírosa me kárta.", pl:"Nie mialem dosc gotowki, wiec zaplacilem karta."},
      {gr:"Όλα μαζί έκαναν δεκαπέντε ευρώ.", rom:"Óla mazí ékanan dekapénde evró.", pl:"Wszystko razem kosztowalo pietnascie euro."},
    ],
    questions:[
      {q:"Πώς πλήρωσε;", options:["Με κάρτα","Με μετρητά","Δεν πλήρωσε"], answer:"Με κάρτα"},
      {q:"Ile zaplacil?", options:["15 euro","50 euro","5 euro"], answer:"15 euro"},
    ]},
];
