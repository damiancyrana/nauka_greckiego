/* ===== Tresc B1: lekcje (23-32) + dialogi + czytanki =====
   Naturalna kontynuacja A2. Dobor wg Pareto: czasy zlozone, strona „-mai",
   okresy warunkowe, mowa zalezna, zdania zlozone, argumentacja, slownictwo
   abstrakcyjne (media/praca/srodowisko/plany) i slowotworstwo jako mnoznik. */

export const b1Lessons = [
  { id:23, emoji:"✅", title:"Παρακείμενος — co już zrobiłem", desc:"Czas teraźniejszy dokonany (έχω + forma)", level:"B1",
    sections:[
      {type:"text", title:"Wynik, który trwa", body:"Παρακείμενος = έχω + niezmienna forma. Mówi o czymś, co się stało, a jego wynik trwa do teraz. Odmienia się tylko έχω — forma czasownika jest zawsze ta sama."},
      {type:"grammar", title:"Tworzenie",
        table:{head:["Czasownik","Παρακείμενος","Znaczenie"], rows:[
          ["γράφω","έχω γράψει","napisałem"],["τρώω","έχω φάει","zjadłem"],
          ["πάω","έχω πάει","byłem / poszedłem"],["βλέπω","έχω δει","zobaczyłem"],
          ["λέω","έχω πει","powiedziałem"],["κάνω","έχω κάνει","zrobiłem"]]}, speakCol:1},
      {type:"grammar", title:"Przydatne słowa", rule:"ήδη = już · ακόμα = jeszcze · ποτέ = kiedykolwiek/nigdy · πρόσφατα = niedawno. Np. Δεν έχω φάει ακόμα = Jeszcze nie jadłem."},
      {type:"words", title:"Powiedz, co już się stało", items:[
        {gr:"Έχω ζήσει στην Ελλάδα.",rom:"Écho zísi stin Eláda.",pl:"Mieszkałem w Grecji."},
        {gr:"Έχεις πάει ποτέ στην Κρήτη;",rom:"Échis pái poté stin Kríti?",pl:"Byłeś kiedyś na Krecie?"},
        {gr:"Δεν έχω τελειώσει ακόμα.",rom:"Den écho teliósi akóma.",pl:"Jeszcze nie skończyłem."},
        {gr:"Έχουμε φάει ήδη.",rom:"Échume fái ídi.",pl:"Już zjedliśmy."},
        {gr:"Τι έχεις κάνει σήμερα;",rom:"Ti échis káni símera?",pl:"Co dziś zrobiłeś?"},
        {gr:"Δεν έχω ξαναδεί κάτι τέτοιο.",rom:"Den écho ksanadí káti tétio.",pl:"Nigdy nie widziałem czegoś takiego."}]},
    ]},
  { id:24, emoji:"🔁", title:"Czasowniki na -μαι", desc:"Częste czasowniki zwrotne (nie strona bierna!)", level:"B1",
    sections:[
      {type:"text", title:"Końcówka -μαι", body:"Wiele greckich czasowników kończy się na -μαι, choć znaczą zwykłą czynność (nie stronę bierną): έρχομαι = przychodzę, σκέφτομαι = myślę. Trzeba znać ich formy przeszłe."},
      {type:"grammar", title:"Teraz i w przeszłości",
        table:{head:["Teraz","Αόριστος","Znaczenie"], rows:[
          ["έρχομαι","ήρθα","przychodzę / przyszedłem"],["σκέφτομαι","σκέφτηκα","myślę / pomyślałem"],
          ["θυμάμαι","θυμήθηκα","pamiętam / przypomniałem"],["κοιμάμαι","κοιμήθηκα","śpię / spałem"],
          ["φοβάμαι","φοβήθηκα","boję się / przestraszyłem"],["χρειάζομαι","χρειάστηκα","potrzebuję / potrzebowałem"]]}, speakCol:0},
      {type:"words", title:"Uczucia i potrzeby", items:[
        {gr:"Αισθάνομαι κουρασμένος.",rom:"Esthánome kurazménos.",pl:"Czuję się zmęczony."},
        {gr:"Δεν θυμάμαι το όνομά του.",rom:"Den thimáme to ónomá tu.",pl:"Nie pamiętam jego imienia."},
        {gr:"Σκέφτομαι να αλλάξω δουλειά.",rom:"Skéftome na alákso duliá.",pl:"Myślę o zmianie pracy."},
        {gr:"Χρειάζομαι λίγο χρόνο.",rom:"Chriázome lígo chróno.",pl:"Potrzebuję trochę czasu."},
        {gr:"Φοβάμαι ότι θα αργήσω.",rom:"Fováme óti tha arjíso.",pl:"Boję się, że się spóźnię."},
        {gr:"Πότε θα έρθεις;",rom:"Póte tha érthis?",pl:"Kiedy przyjdziesz?"}]},
    ]},
  { id:25, emoji:"🔀", title:"Gdyby... — okresy warunkowe", desc:"Hipotezy realne i nierealne + życzenia", level:"B1",
    sections:[
      {type:"text", title:"Dwa rodzaje „jeśli”", body:"Realny: Αν + teraźniejszy, θα + przyszły (jeśli będę..., to...). Nierealny: Αν + παρατατικός, θα + παρατατικός (gdybym..., to bym...). Παρατατικός już znasz z A2."},
      {type:"grammar", title:"Porównaj",
        table:{head:["Typ","Przykład","Znaczenie"], rows:[
          ["Realny","Αν έχω χρόνο, θα έρθω.","Jeśli będę miał czas, przyjdę."],
          ["Nierealny","Αν είχα χρόνο, θα ερχόμουν.","Gdybym miał czas, przyszedłbym."],
          ["Życzenie","Μακάρι να είχα χρόνο.","Oby mieć czas / Szkoda, że nie mam."]]}, speakCol:1},
      {type:"words", title:"Mów warunkowo", items:[
        {gr:"Αν βρέξει, θα μείνουμε σπίτι.",rom:"An vréksi, tha mínume spíti.",pl:"Jeśli będzie padać, zostaniemy w domu."},
        {gr:"Αν ήμουν πλούσιος, θα ταξίδευα.",rom:"An ímun plúsios, tha taksídeva.",pl:"Gdybym był bogaty, podróżowałbym."},
        {gr:"Αν ήξερα, θα σου έλεγα.",rom:"An íksera, tha su éleya.",pl:"Gdybym wiedział, powiedziałbym ci."},
        {gr:"Μακάρι να ερχόσουν μαζί μας.",rom:"Makári na erchósun mazí mas.",pl:"Obyś poszedł z nami."},
        {gr:"Τι θα έκανες στη θέση μου;",rom:"Ti tha ékanes sti thési mu?",pl:"Co byś zrobił na moim miejscu?"}]},
    ]},
  { id:26, emoji:"💬", title:"Μου είπε ότι... — mowa zależna", desc:"Relacjonowanie cudzych słów", level:"B1",
    sections:[
      {type:"text", title:"Przekazuj, co ktoś powiedział", body:"Twierdzenie → ότι. Pytanie tak/nie → αν. Pytanie o szczegół → πού/τι/πότε… Prośba/rozkaz → να. Uwaga: grecki NIE wymaga cofania czasów jak angielski."},
      {type:"grammar", title:"Cztery wzory",
        table:{head:["Funkcja","Wzór","Przykład"], rows:[
          ["Twierdzenie","Είπε ότι…","Είπε ότι θα αργήσει."],
          ["Pytanie tak/nie","Ρώτησε αν…","Με ρώτησε αν θέλω καφέ."],
          ["Pytanie o szczegół","Ρώτησε πού/τι…","Με ρώτησε πού μένω."],
          ["Prośba","Μου είπε να…","Μου είπε να περιμένω."]]}, speakCol:2},
      {type:"words", title:"Relacjonuj rozmowę", items:[
        {gr:"Μου είπε ότι είναι κουρασμένος.",rom:"Mu ípe óti íne kurazménos.",pl:"Powiedział mi, że jest zmęczony."},
        {gr:"Με ρώτησε αν μιλάω ελληνικά.",rom:"Me rótise an miláo eliniká.",pl:"Zapytał mnie, czy mówię po grecku."},
        {gr:"Μου ζήτησε να τον βοηθήσω.",rom:"Mu zítise na ton voithíso.",pl:"Poprosił mnie, żebym mu pomógł."},
        {gr:"Είπαν ότι θα έρθουν αύριο.",rom:"Ípan óti tha érthun ávrio.",pl:"Powiedzieli, że przyjdą jutro."},
        {gr:"Μου είπε να μην ανησυχώ.",rom:"Mu ípe na min anisichó.",pl:"Powiedział, żebym się nie martwił."}]},
    ]},
  { id:27, emoji:"🔗", title:"Zdania złożone i spójniki", desc:"που / ο οποίος + łączniki dyskursu", level:"B1",
    sections:[
      {type:"grammar", title:"„który / że” = που", rule:"Najczęstszy łącznik zdań to που (nieodmienne): Ο άντρας που μιλάει… = Mężczyzna, który mówi… W rejestrze formalnym: ο οποίος / η οποία / το οποίο (odmienne)."},
      {type:"grammar", title:"Spójniki B1",
        table:{head:["Grecki","Wymowa","Znaczenie"], rows:[
          ["ωστόσο","ostóso","jednak"],["αν και","an ke","chociaż"],
          ["παρόλο που","parólo pu","mimo że"],["επομένως","epoménos","zatem / więc"],
          ["δηλαδή","diladí","to znaczy"],["μόλις","mólis","gdy tylko"],["καθώς","kathós","gdy / ponieważ"]]}, speakCol:0},
      {type:"words", title:"Łącz zdania jak na B1", items:[
        {gr:"Ο άντρας που μιλάει είναι ο διευθυντής.",rom:"O ándras pu milái íne o diefthindís.",pl:"Mężczyzna, który mówi, to dyrektor."},
        {gr:"Αν και ήταν αργά, βγήκαμε έξω.",rom:"An ke ítan argá, vjíkame ékso.",pl:"Choć było późno, wyszliśmy."},
        {gr:"Δεν διάβασα, επομένως απέτυχα.",rom:"Den diávasa, epoménos apéticha.",pl:"Nie uczyłem się, więc oblałem."},
        {gr:"Μόλις φτάσω, θα σε πάρω τηλέφωνο.",rom:"Mólis ftáso, tha se páro tiléfono.",pl:"Gdy tylko dotrę, zadzwonię."},
        {gr:"Η εταιρεία στην οποία δουλεύω είναι μεγάλη.",rom:"I etería stin opía dulévo íne megáli.",pl:"Firma, w której pracuję, jest duża."}]},
    ]},
  { id:28, emoji:"⚖️", title:"Opinie i argumentacja", desc:"Wyrażaj i uzasadniaj zdanie", level:"B1",
    sections:[
      {type:"text", title:"Nie tylko „co”, ale „dlaczego”", body:"Na B1 budujesz argument: wyrażasz opinię i ją uzasadniasz, ważysz za i przeciw."},
      {type:"grammar", title:"Szkielety opinii", rule:"Θεωρώ ότι… = Uważam, że… · Κατά τη γνώμη μου… = Moim zdaniem… · Από τη μία… από την άλλη… = Z jednej strony… z drugiej… · Διαφωνώ, επειδή… = Nie zgadzam się, bo…"},
      {type:"words", title:"Argumentuj", items:[
        {gr:"Θεωρώ ότι έχεις δίκιο.",rom:"Theoró óti échis díkio.",pl:"Uważam, że masz rację."},
        {gr:"Κατά τη γνώμη μου, είναι λάθος.",rom:"Katá ti gnómi mu, íne láthos.",pl:"Moim zdaniem to błąd."},
        {gr:"Από τη μία συμφωνώ, από την άλλη έχω αμφιβολίες.",rom:"Apó ti mía simfonó, apó tin áli écho amfivolíes.",pl:"Z jednej strony się zgadzam, z drugiej mam wątpliwości."},
        {gr:"Διαφωνώ, επειδή δεν είναι δίκαιο.",rom:"Diafonó, epidí den íne díkeo.",pl:"Nie zgadzam się, bo to niesprawiedliwe."},
        {gr:"Έχω την εντύπωση ότι κάτι αλλάζει.",rom:"Écho tin endíposi óti káti alázi.",pl:"Mam wrażenie, że coś się zmienia."}]},
    ]},
  { id:29, emoji:"🌍", title:"Media, technologia, środowisko", desc:"Słownictwo tematów B1", level:"B1",
    sections:[
      {type:"words", title:"Media i technologia", items:[
        {gr:"η είδηση",rom:"i ídisi",pl:"wiadomość"},{gr:"τα νέα",rom:"ta néa",pl:"wiadomości / news"},
        {gr:"η εφημερίδα",rom:"i efimerída",pl:"gazeta"},{gr:"το διαδίκτυο",rom:"to diadíktio",pl:"internet"},
        {gr:"η εφαρμογή",rom:"i efarmojí",pl:"aplikacja"},{gr:"τα κοινωνικά δίκτυα",rom:"ta kinoniká díktia",pl:"media społecznościowe"},
        {gr:"ο υπολογιστής",rom:"o ipolojistís",pl:"komputer"},{gr:"ο κωδικός",rom:"o kodikós",pl:"hasło / kod"}]},
      {type:"words", title:"Środowisko", items:[
        {gr:"το περιβάλλον",rom:"to periválon",pl:"środowisko"},{gr:"η κλιματική αλλαγή",rom:"i klimatikí alají",pl:"zmiana klimatu"},
        {gr:"η μόλυνση",rom:"i mólinsi",pl:"zanieczyszczenie"},{gr:"η ανακύκλωση",rom:"i anakíklosi",pl:"recykling"},
        {gr:"η ενέργεια",rom:"i enérjia",pl:"energia"},{gr:"η φύση",rom:"i físi",pl:"przyroda"}]},
      {type:"words", title:"W zdaniach", items:[
        {gr:"Διάβασα μια ενδιαφέρουσα είδηση.",rom:"Diávasa mia endiaférusa ídisi.",pl:"Przeczytałem ciekawą wiadomość."},
        {gr:"Πρέπει να προστατεύσουμε το περιβάλλον.",rom:"Prépi na prostatépsume to periválon.",pl:"Musimy chronić środowisko."}]},
    ]},
  { id:30, emoji:"🎯", title:"Praca, edukacja, plany", desc:"Mów o karierze, nauce i ambicjach", level:"B1",
    sections:[
      {type:"words", title:"Praca i nauka", items:[
        {gr:"η καριέρα",rom:"i kariéra",pl:"kariera"},{gr:"ο μισθός",rom:"o misthós",pl:"pensja"},
        {gr:"η σύμβαση",rom:"i símvasi",pl:"umowa"},{gr:"η εμπειρία",rom:"i embiría",pl:"doświadczenie"},
        {gr:"το πανεπιστήμιο",rom:"to panepistímio",pl:"uniwersytet"},{gr:"το πτυχίο",rom:"to ptichío",pl:"dyplom"},
        {gr:"η εξέταση",rom:"i eksétasi",pl:"egzamin"},{gr:"ο στόχος",rom:"o stóchos",pl:"cel"}]},
      {type:"grammar", title:"Mów o planach", rule:"Σκοπεύω να… = Zamierzam… · Ελπίζω να… = Mam nadzieję… · Ονειρεύομαι να… = Marzę, żeby… · Αποφάσισα να… = Postanowiłem…"},
      {type:"words", title:"Plany i ambicje", items:[
        {gr:"Σκοπεύω να σπουδάσω ιατρική.",rom:"Skopévo na spudáso iatrikí.",pl:"Zamierzam studiować medycynę."},
        {gr:"Ελπίζω να βρω καλύτερη δουλειά.",rom:"Elpízo na vro kalíteri duliá.",pl:"Mam nadzieję znaleźć lepszą pracę."},
        {gr:"Ονειρεύομαι να ζήσω στην Ελλάδα.",rom:"Onirévome na zíso stin Eláda.",pl:"Marzę, żeby zamieszkać w Grecji."},
        {gr:"Αποφάσισα να μάθω ελληνικά καλά.",rom:"Apofásisa na mátho eliniká kalá.",pl:"Postanowiłem dobrze nauczyć się greckiego."}]},
    ]},
  { id:31, emoji:"📣", title:"Reklamacje i problemy", desc:"Zgłoś problem grzecznie, ale stanowczo", level:"B1",
    sections:[
      {type:"text", title:"Kiedy coś jest nie tak", body:"Na B1 umiesz formalnie zgłosić problem i domagać się rozwiązania — uprzejmie, lecz asertywnie."},
      {type:"words", title:"Reklamacja i kłopoty", items:[
        {gr:"Θα ήθελα να αναφέρω ένα πρόβλημα.",rom:"Tha íthela na anaféro éna próvlima.",pl:"Chciałbym zgłosić problem."},
        {gr:"Δεν είμαι ικανοποιημένος.",rom:"Den íme ikanopiiménos.",pl:"Nie jestem zadowolony."},
        {gr:"Αυτό δεν είναι αυτό που παρήγγειλα.",rom:"Aftó den íne aftó pu paríngila.",pl:"To nie jest to, co zamówiłem."},
        {gr:"Θα ήθελα να μιλήσω με τον υπεύθυνο.",rom:"Tha íthela na milíso me ton ipéfthino.",pl:"Chciałbym mówić z kierownikiem."},
        {gr:"Θα ήθελα την επιστροφή των χρημάτων μου.",rom:"Tha íthela tin epistrofí ton chrimáton mu.",pl:"Chcę zwrotu pieniędzy."},
        {gr:"Έχασα τις αποσκευές μου.",rom:"Échasa tis aposkevés mu.",pl:"Zgubiłem bagaż."},
        {gr:"Η πτήση είχε καθυστέρηση.",rom:"I ptísi íche kathistérisi.",pl:"Lot miał opóźnienie."}]},
    ]},
  { id:32, emoji:"🧱", title:"Słowotwórstwo — jeden wzór, sto słów", desc:"Sufiksy jako mnożnik słownictwa + podsumowanie", level:"B1",
    sections:[
      {type:"text", title:"Mnożnik Pareto", body:"Zamiast uczyć się setek słów osobno, poznaj kilka sufiksów — i zgadniesz znaczenie dziesiątek nowych słów."},
      {type:"grammar", title:"5 sufiksów",
        table:{head:["Wzór","Znaczenie","Przykład"], rows:[
          ["-ση","czynność / proces","η απόφαση (decyzja)"],
          ["-ικός","jaki (przymiotnik)","κοινωνικός (społeczny)"],
          ["-τής / -τρια","kto (osoba)","ο μαθητής / η μαθήτρια"],
          ["-ισμός","-izm","ο τουρισμός (turystyka)"],
          ["ξανα-","znów","ξαναλέω (mówię ponownie)"]]}},
      {type:"words", title:"Zobacz wzór w działaniu", items:[
        {gr:"η ενημέρωση",rom:"i enimérosi",pl:"informacja / aktualizacja"},
        {gr:"οικονομικός",rom:"ikonomikós",pl:"ekonomiczny"},
        {gr:"ο εργάτης",rom:"o ergátis",pl:"pracownik / robotnik"},
        {gr:"ο ρεαλισμός",rom:"o realizmós",pl:"realizm"},
        {gr:"ξαναπροσπαθώ",rom:"ksanaprospathó",pl:"próbuję ponownie"}]},
      {type:"text", title:"Μπράβο! 🎉", body:"Masz fundamenty B1 — czasy złożone, tryb warunkowy, mowę zależną, argumentację i słowotwórstwo. Czytaj greckie wiadomości i rozmawiaj — jesteś gotów na prawdziwy grecki. Καλή συνέχεια!"},
    ]},
];

export const b1Dialogues = [
  { id:"b1d1", emoji:"💼", title:"Rozmowa o pracę", desc:"Opowiedz o sobie i hipotetyzuj",
    lines:[
      {who:"A", gr:"Καλημέρα, καθίστε. Πείτε μου λίγο για την εμπειρία σας.", rom:"Kaliméra, kathíste. Píte mu lígo jia tin embiría sas.", pl:"Dzień dobry, proszę usiąść. Proszę opowiedzieć o swoim doświadczeniu."},
      {who:"B", gr:"Δούλεψα τρία χρόνια σε μια εταιρεία και έμαθα πολλά.", rom:"Dúlepsa tría chrónia se mia etería ke ématha polá.", pl:"Pracowałem trzy lata w firmie i wiele się nauczyłem."},
      {who:"A", gr:"Γιατί θέλετε να αλλάξετε δουλειά;", rom:"Jatí thélete na aláksete duliá?", pl:"Dlaczego chce pan zmienić pracę?"},
      {who:"B", gr:"Ψάχνω για νέες προκλήσεις και θέλω να εξελιχθώ.", rom:"Psáchno jia nées proklísis ke thélo na ekselichthó.", pl:"Szukam nowych wyzwań i chcę się rozwijać."},
      {who:"A", gr:"Τι θα κάνατε αν είχατε έναν δύσκολο πελάτη;", rom:"Ti tha kánate an íchate énan dískolo peláti?", pl:"Co by pan zrobił, gdyby miał trudnego klienta?"},
      {who:"B", gr:"Θα τον άκουγα με προσοχή και θα προσπαθούσα να βρω λύση.", rom:"Tha ton ákuga me prosochí ke tha prospathúsa na vro lísi.", pl:"Wysłuchałbym go uważnie i postarałbym się znaleźć rozwiązanie."},
      {who:"A", gr:"Ωραία. Θα σας ενημερώσουμε σύντομα.", rom:"Oréa. Tha sas enimerósume síndoma.", pl:"Dobrze. Wkrótce damy panu znać."},
    ],
    roleplay:[
      {prompt:"Rekruter prosi o doświadczenie. Odpowiadasz:", options:["Έχω τριών χρόνων εμπειρία.","Πού είναι η τουαλέτα;","Δεν ξέρω ελληνικά."], answer:"Έχω τριών χρόνων εμπειρία."},
      {prompt:"Pyta hipotetycznie „Τι θα κάνατε αν…;”. Wybierasz tryb warunkowy:", options:["Θα προσπαθούσα να βρω λύση.","Έφαγα σουβλάκι χθες.","Είμαι κουρασμένος."], answer:"Θα προσπαθούσα να βρω λύση."},
    ]},
  { id:"b1d2", emoji:"🏨", title:"Reklamacja w hotelu", desc:"Zgłoś problem i poproś o rozwiązanie",
    lines:[
      {who:"A", gr:"Καλησπέρα, πώς μπορώ να βοηθήσω;", rom:"Kalispéra, pos boró na voithíso?", pl:"Dobry wieczór, jak mogę pomóc?"},
      {who:"B", gr:"Καλησπέρα. Θα ήθελα να αναφέρω ένα πρόβλημα με το δωμάτιό μου.", rom:"Kalispéra. Tha íthela na anaféro éna próvlima me to domátió mu.", pl:"Dobry wieczór. Chciałbym zgłosić problem z moim pokojem."},
      {who:"A", gr:"Λυπάμαι. Τι ακριβώς συμβαίνει;", rom:"Lipáme. Ti akrivós simvéni?", pl:"Przykro mi. Co dokładnie się dzieje?"},
      {who:"B", gr:"Το κλιματιστικό δεν λειτουργεί και το δωμάτιο δεν είναι καθαρό.", rom:"To klimatistikó den liturjí ke to domátio den íne katharó.", pl:"Klimatyzacja nie działa, a pokój nie jest czysty."},
      {who:"A", gr:"Ζητώ συγγνώμη. Θα σας αλλάξουμε δωμάτιο αμέσως.", rom:"Zitó signómi. Tha sas aláksume domátio amésos.", pl:"Przepraszam. Natychmiast zmienimy panu pokój."},
      {who:"B", gr:"Σας ευχαριστώ. Θα ήθελα επίσης να ελέγξετε τον λογαριασμό.", rom:"Sas efcharistó. Tha íthela epísis na elénksete ton logariazmó.", pl:"Dziękuję. Chciałbym też, żeby sprawdzić rachunek."},
    ],
    roleplay:[
      {prompt:"Chcesz grzecznie zgłosić problem. Zaczynasz:", options:["Θα ήθελα να αναφέρω ένα πρόβλημα.","Άντε γεια!","Πόσο κάνει ο καφές;"], answer:"Θα ήθελα να αναφέρω ένα πρόβλημα."},
      {prompt:"Recepcja pyta „Τι ακριβώς συμβαίνει;”. Mówisz, co nie działa:", options:["Το κλιματιστικό δεν λειτουργεί.","Είμαι από την Πολωνία.","Καλή τύχη!"], answer:"Το κλιματιστικό δεν λειτουργεί."},
    ]},
];

export const b1Readers = [
  { id:"b1r1", emoji:"📱", title:"Οι νέοι και η τεχνολογία", desc:"Krótki tekst o młodych i technologii",
    text:[
      {gr:"Σήμερα οι περισσότεροι νέοι περνούν πολλές ώρες στο διαδίκτυο.", rom:"Símera i perisóteri néi pernún polés óres sto diadíktio.", pl:"Dziś większość młodych spędza wiele godzin w internecie."},
      {gr:"Χρησιμοποιούν τα κοινωνικά δίκτυα για να επικοινωνούν με φίλους.", rom:"Chrisimopiún ta kinoniká díktia jia na epikinonún me fílus.", pl:"Używają mediów społecznościowych, żeby kontaktować się z przyjaciółmi."},
      {gr:"Ωστόσο, πολλοί ειδικοί ανησυχούν για τον χρόνο μπροστά στην οθόνη.", rom:"Ostóso, polí idikí anisichún jia ton chróno brostá stin othóni.", pl:"Jednak wielu ekspertów martwi się o czas przed ekranem."},
      {gr:"Από τη μία η τεχνολογία βοηθάει, από την άλλη μπορεί να δημιουργήσει εξάρτηση.", rom:"Apó ti mía i technolojía voithái, apó tin áli borí na dimiurjísi eksártisi.", pl:"Z jednej strony technologia pomaga, z drugiej może uzależnić."},
    ],
    questions:[
      {q:"Τι κάνουν οι νέοι στα κοινωνικά δίκτυα;", options:["Επικοινωνούν με φίλους","Μαγειρεύουν","Κοιμούνται"], answer:"Επικοινωνούν με φίλους"},
      {q:"O co martwią się eksperci?", options:["O czas przed ekranem","O cenę internetu","O pogodę"], answer:"O czas przed ekranem"},
    ]},
  { id:"b1r2", emoji:"✉️", title:"Email — reklamacja", desc:"Skarga do linii lotniczej",
    text:[
      {gr:"Αγαπητοί κύριοι,", rom:"Agapití kírii,", pl:"Szanowni Państwo,"},
      {gr:"Σας γράφω σχετικά με την πτήση μου της περασμένης εβδομάδας.", rom:"Sas gráfo schetiká me tin ptísi mu tis perazménis evdomádas.", pl:"Piszę w sprawie mojego lotu z zeszłego tygodnia."},
      {gr:"Η πτήση είχε μεγάλη καθυστέρηση και έχασα την ανταπόκρισή μου.", rom:"I ptísi íche megáli kathistérisi ke échasa tin andapókrisí mu.", pl:"Lot miał duże opóźnienie i straciłem przesiadkę."},
      {gr:"Θα ήθελα να ζητήσω αποζημίωση για την ταλαιπωρία.", rom:"Tha íthela na zitíso apozimíosi jia tin taleporía.", pl:"Chciałbym poprosić o odszkodowanie za niedogodności."},
      {gr:"Με εκτίμηση, Γιάννης Παπαδόπουλος.", rom:"Me ektímisi, Jánis Papadópulos.", pl:"Z poważaniem, Jannis Papadopulos."},
    ],
    questions:[
      {q:"Ποιο ήταν το πρόβλημα;", options:["Η πτήση καθυστέρησε","Έχασε το διαβατήριο","Δεν βρήκε ξενοδοχείο"], answer:"Η πτήση καθυστέρησε"},
      {q:"Czego oczekuje autor?", options:["Odszkodowania","Darmowego posiłku","Nowego biletu za darmo"], answer:"Odszkodowania"},
    ]},
];
