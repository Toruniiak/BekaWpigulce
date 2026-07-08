/* ============================================================================
   BekaWpigułce — QUIZY PLUS (quizy-plus.js)
   30 trudniejszych quizów po 8 pytań. Ładowane przed db.js i scalane
   w locie z quizami bazowymi (DB.quizzes.all).
   Format pytania: { q, opts[4|2], answer: indeks poprawnej }
   ========================================================================== */
window.__BWP_QUIZZES_EXTRA__ = [

{ id:'qx_hist_pl', title:'Historia Polski — poziom trudny', desc:'Daty, władcy i wydarzenia, których nie było w podstawówce.', questions:[
 { q:'W którym roku odbył się hołd pruski?', opts:['1466','1525','1569','1610'], answer:1 },
 { q:'Kto był pierwszym królem elekcyjnym Polski?', opts:['Stefan Batory','Henryk Walezy','Zygmunt III Waza','August II Mocny'], answer:1 },
 { q:'Konstytucja 3 maja została uchwalona w roku…', opts:['1772','1788','1791','1795'], answer:2 },
 { q:'Bitwa pod Grunwaldem miała miejsce w…', opts:['1410','1385','1444','1466'], answer:0 },
 { q:'Który zaborca NIE brał udziału w I rozbiorze Polski?', opts:['Rosja','Prusy','Austria','Wszyscy brali'], answer:3 },
 { q:'Jak nazywał się ostatni król Polski?', opts:['August III Sas','Stanisław Leszczyński','Stanisław August Poniatowski','Jan III Sobieski'], answer:2 },
 { q:'Powstanie styczniowe wybuchło w roku…', opts:['1830','1846','1863','1905'], answer:2 },
 { q:'Bitwa Warszawska („Cud nad Wisłą") rozegrała się w…', opts:['1918','1920','1921','1939'], answer:1 },
]},

{ id:'qx_hist_sw', title:'Historia świata — dla twardzieli', desc:'Od starożytności po XX wiek. Bez taryfy ulgowej.', questions:[
 { q:'W którym roku upadł Konstantynopol?', opts:['1204','1389','1453','1492'], answer:2 },
 { q:'Kto był pierwszym cesarzem rzymskim?', opts:['Juliusz Cezar','Oktawian August','Neron','Trajan'], answer:1 },
 { q:'Rewolucja francuska wybuchła w roku…', opts:['1776','1789','1799','1815'], answer:1 },
 { q:'Mur Berliński upadł w roku…', opts:['1985','1987','1989','1991'], answer:2 },
 { q:'Które państwo jako pierwsze przyznało kobietom prawa wyborcze (1893)?', opts:['USA','Finlandia','Nowa Zelandia','Szwajcaria'], answer:2 },
 { q:'Bitwa pod Hastings (1066) dotyczyła podboju…', opts:['Francji','Anglii','Irlandii','Danii'], answer:1 },
 { q:'Kto napisał „95 tez", zaczynając reformację?', opts:['Jan Kalwin','Jan Hus','Marcin Luter','Erazm z Rotterdamu'], answer:2 },
 { q:'Traktat wersalski podpisano w roku…', opts:['1918','1919','1920','1921'], answer:1 },
]},

{ id:'qx_geo_pl', title:'Geografia Polski — bez mapy ani rusz', desc:'Rzeki, szczyty i miasta, o których zapomniałeś po maturze.', questions:[
 { q:'Najwyższy szczyt polskich Beskidów to…', opts:['Śnieżka','Babia Góra','Tarnica','Turbacz'], answer:1 },
 { q:'Która rzeka NIE jest dopływem Wisły?', opts:['San','Pilica','Warta','Dunajec'], answer:2 },
 { q:'Największe jezioro w Polsce to…', opts:['Mamry','Śniardwy','Łebsko','Hańcza'], answer:1 },
 { q:'Najgłębsze polskie jezioro to…', opts:['Śniardwy','Hańcza','Wigry','Drawsko'], answer:1 },
 { q:'W którym województwie leży Biebrzański Park Narodowy?', opts:['warmińsko-mazurskim','podlaskim','lubelskim','mazowieckim'], answer:1 },
 { q:'Pustynia Błędowska leży na pograniczu województw…', opts:['śląskiego i małopolskiego','łódzkiego i śląskiego','małopolskiego i świętokrzyskiego','opolskiego i śląskiego'], answer:0 },
 { q:'Które miasto leży NAD ODRĄ?', opts:['Toruń','Płock','Opole','Przemyśl'], answer:2 },
 { q:'Rysy mają wysokość około…', opts:['2199 m','2301 m','2499 m','2655 m'], answer:2 },
]},

{ id:'qx_geo_sw', title:'Geografia świata — poziom ekspert', desc:'Stolice, rzeki i rekordy planety.', questions:[
 { q:'Stolicą Australii jest…', opts:['Sydney','Melbourne','Canberra','Perth'], answer:2 },
 { q:'Najdłuższa rzeka świata (wg większości źródeł) to…', opts:['Nil','Amazonka','Jangcy','Missisipi'], answer:1 },
 { q:'Które państwo ma najwięcej sąsiadów (14)?', opts:['Rosja i Chiny (ex aequo)','Brazylia','Niemcy','Indie'], answer:0 },
 { q:'Najgłębszy punkt oceanów to Rów…', opts:['Portorykański','Mariański','Jawajski','Aleucki'], answer:1 },
 { q:'Stolica Kanady to…', opts:['Toronto','Vancouver','Montreal','Ottawa'], answer:3 },
 { q:'Największa wyspa świata to…', opts:['Borneo','Madagaskar','Grenlandia','Nowa Gwinea'], answer:2 },
 { q:'Przez które państwo NIE przepływa Dunaj?', opts:['Węgry','Serbia','Polska','Austria'], answer:2 },
 { q:'Atakama, najsuchsza pustynia świata, leży w…', opts:['Peru','Chile','Meksyku','Argentynie'], answer:1 },
]},

{ id:'qx_stolice', title:'Stolice, które mylą wszystkich', desc:'Nie, to nie największe miasto. Właśnie o to chodzi.', questions:[
 { q:'Stolica Turcji to…', opts:['Stambuł','Ankara','Izmir','Bursa'], answer:1 },
 { q:'Stolica Brazylii to…', opts:['Rio de Janeiro','São Paulo','Brasília','Salvador'], answer:2 },
 { q:'Stolica Szwajcarii to…', opts:['Zurych','Genewa','Berno','Bazylea'], answer:2 },
 { q:'Stolica Maroka to…', opts:['Casablanca','Marrakesz','Rabat','Fez'], answer:2 },
 { q:'Stolica Wietnamu to…', opts:['Ho Chi Minh','Hanoi','Da Nang','Hue'], answer:1 },
 { q:'Stolica Nigerii to…', opts:['Lagos','Abudża','Kano','Ibadan'], answer:1 },
 { q:'Stolica Kazachstanu to…', opts:['Ałmaty','Astana','Szymkent','Karaganda'], answer:1 },
 { q:'Stolica RPA (siedziba rządu) to…', opts:['Johannesburg','Kapsztad','Pretoria','Durban'], answer:2 },
]},

{ id:'qx_kosmos', title:'Kosmos — quiz nie z tej Ziemi', desc:'Planety, misje i rekordy Układu Słonecznego.', questions:[
 { q:'Największy księżyc w Układzie Słonecznym to…', opts:['Tytan','Ganimedes','Europa','Księżyc'], answer:1 },
 { q:'Ile planet ma pierścienie?', opts:['1','2','4','6'], answer:2 },
 { q:'Wielka Czerwona Plama to burza na…', opts:['Marsie','Saturnie','Jowiszu','Neptunie'], answer:2 },
 { q:'Pierwszy człowiek w kosmosie to…', opts:['Neil Armstrong','Jurij Gagarin','Alan Shepard','German Titow'], answer:1 },
 { q:'Rok na Merkurym trwa około…', opts:['88 dni','225 dni','365 dni','687 dni'], answer:0 },
 { q:'Najbliższa Ziemi gwiazda (poza Słońcem) to…', opts:['Syriusz','Alfa Centauri / Proxima','Betelgeza','Wega'], answer:1 },
 { q:'Łazik Perseverance bada…', opts:['Księżyc','Wenus','Marsa','Tytana'], answer:2 },
 { q:'Światło ze Słońca leci do Ziemi około…', opts:['8 sekund','8 minut','8 godzin','8 dni'], answer:1 },
]},

{ id:'qx_bio', title:'Biologia — zaskakująco trudna', desc:'Ciało, komórki i ewolucyjne dziwactwa.', questions:[
 { q:'Najmniejsza kość człowieka (strzemiączko) znajduje się w…', opts:['dłoni','stopie','uchu','nosie'], answer:2 },
 { q:'Ile komór ma serce ośmiornicy? (podchwytliwe: serc ma 3)', opts:['serce jest jedno','ma 2 serca','ma 3 serca','ma 4 serca'], answer:2 },
 { q:'DNA ma kształt…', opts:['pojedynczej spirali','podwójnej helisy','drabiny prostej','pierścienia'], answer:1 },
 { q:'Fotosynteza zachodzi w…', opts:['mitochondriach','rybosomach','chloroplastach','jądrze'], answer:2 },
 { q:'Która grupa krwi jest „uniwersalnym dawcą"?', opts:['AB Rh+','0 Rh−','A Rh+','B Rh−'], answer:1 },
 { q:'Aksolotl to…', opts:['ryba','płaz','gad','ssak'], answer:1 },
 { q:'Ile procent DNA dzielimy z szympansami (w przybliżeniu)?', opts:['~75%','~85%','~98%','100%'], answer:2 },
 { q:'Najdłuższy nerw człowieka to nerw…', opts:['błędny','kulszowy','trójdzielny','łokciowy'], answer:1 },
]},

{ id:'qx_chemfiz', title:'Fizyka i chemia — tylko dla odważnych', desc:'Wzory zostają w domu, logika idzie z Tobą.', questions:[
 { q:'Symbol chemiczny złota to…', opts:['Go','Au','Ag','Gd'], answer:1 },
 { q:'Woda wrze na Mount Evereście w temperaturze…', opts:['ok. 70°C','równo 100°C','ok. 120°C','nie wrze wcale'], answer:0 },
 { q:'Najlżejszy pierwiastek to…', opts:['hel','tlen','wodór','lit'], answer:2 },
 { q:'Prędkość światła w próżni to około…', opts:['300 tys. km/s','150 tys. km/s','1 mln km/s','30 tys. km/s'], answer:0 },
 { q:'pH równe 7 oznacza roztwór…', opts:['kwaśny','zasadowy','obojętny','stężony'], answer:2 },
 { q:'Suchy lód to zestalony…', opts:['azot','dwutlenek węgla','tlen','metan'], answer:1 },
 { q:'Jednostką oporu elektrycznego jest…', opts:['wat','wolt','om','amper'], answer:2 },
 { q:'Rtęć w temperaturze pokojowej jest…', opts:['ciałem stałym','cieczą','gazem','plazmą'], answer:1 },
]},

{ id:'qx_logika', title:'Łamigłówki logiczne', desc:'Czytaj DOKŁADNIE. Każde pytanie to pułapka.', questions:[
 { q:'Ile miesięcy ma 28 dni?', opts:['1','2','6','wszystkie 12'], answer:3 },
 { q:'Lekarz daje Ci 3 tabletki, co pół godziny jedną. Ile czasu zajmie ich zażycie?', opts:['30 min','60 min','90 min','120 min'], answer:1 },
 { q:'Co waży więcej: tona piór czy tona cegieł?', opts:['pióra','cegły','tyle samo','zależy od wilgotności'], answer:2 },
 { q:'Idziesz w maratonie i wyprzedzasz drugiego zawodnika. Na którym jesteś miejscu?', opts:['pierwszym','drugim','trzecim','nie da się określić'], answer:1 },
 { q:'Ojciec Marka ma 5 synów: Ali, Ole, Ele, Ule i…?', opts:['Yle','Ile','Marek','Ale'], answer:2 },
 { q:'5 maszyn robi 5 zabawek w 5 minut. Ile czasu zajmie 100 maszynom zrobienie 100 zabawek?', opts:['5 minut','20 minut','100 minut','500 minut'], answer:0 },
 { q:'W ciemnym pokoju masz świeczkę, lampę naftową i kominek. Co zapalasz najpierw?', opts:['świeczkę','lampę','kominek','zapałkę'], answer:3 },
 { q:'Jak daleko pies może wbiec do lasu?', opts:['do końca lasu','do połowy','dokąd chce','psy nie biegają do lasu'], answer:1 },
]},

{ id:'qx_matma', title:'Matematyka na spokojnie (albo nie)', desc:'Procenty, ciągi i liczby, które oszukują.', questions:[
 { q:'Ile to 15% z 240?', opts:['24','32','36','40'], answer:2 },
 { q:'Suma kątów w trójkącie to…', opts:['90°','180°','270°','360°'], answer:1 },
 { q:'Która liczba jest pierwsza?', opts:['51','57','61','63'], answer:2 },
 { q:'0,25 to inaczej…', opts:['1/3','1/4','2/5','1/5'], answer:1 },
 { q:'Ile wynosi 2 do potęgi 10?', opts:['512','1000','1024','2048'], answer:2 },
 { q:'Ciąg: 2, 6, 12, 20, 30, … Następny wyraz to…', opts:['40','42','44','48'], answer:1 },
 { q:'Pierwiastek z 144 to…', opts:['11','12','13','14'], answer:1 },
 { q:'Rzucasz monetą 3 razy. Prawdopodobieństwo 3 orłów to…', opts:['1/2','1/4','1/6','1/8'], answer:3 },
]},

{ id:'qx_jezyk', title:'Język polski — pułapki ortografii', desc:'Tu „chyba dobrze" zwykle znaczy źle.', questions:[
 { q:'Poprawna forma to…', opts:['wziąść','wziąć','wziońć','wziąc'], answer:1 },
 { q:'Które słowo jest napisane POPRAWNIE?', opts:['naprawde','na prawdę','naprawdę','na prawde'], answer:2 },
 { q:'Poprawnie piszemy…', opts:['rzadko kiedy','żadko kiedy','rzatko kiedy','żatko kiedy'], answer:0 },
 { q:'„Sześćset" odmienione: nie ma…', opts:['sześcset złotych','sześciuset złotych','sześćset złotych','sześćsetu złotych'], answer:1 },
 { q:'Które zdanie jest poprawne?', opts:['Ubrałem sweter','Założyłem sweter','Oblokłem sweter','Wdziełem sweter'], answer:1 },
 { q:'Poprawna pisownia:', opts:['póki co','puki co','pułki co','pki co'], answer:0 },
 { q:'Liczba mnoga od „orzeł" to…', opts:['orzełki','orły','orzeły','orlce'], answer:1 },
 { q:'„W cudzysłowie" czy „w cudzysłowiu"?', opts:['w cudzysłowie','w cudzysłowiu','obie formy poprawne','żadna'], answer:0 },
]},

{ id:'qx_powiedzenia', title:'Przysłowia i związki frazeologiczne', desc:'Dokończ tak, jak mówili dziadkowie — nie jak internet.', questions:[
 { q:'„Gdyby kózka nie skakała…"', opts:['to by smutne życie miała','to by nóżki nie złamała','to by w dołku nie siedziała','to by mleko dawała'], answer:1 },
 { q:'„Nie chwal dnia…"', opts:['przed zmrokiem','przed zachodem słońca','przed wieczorem','póki trwa'], answer:2 },
 { q:'„Mądry Polak…"', opts:['przed szkodą','po szkodzie','po fakcie','po czasie'], answer:1 },
 { q:'„Rzucać grochem…"', opts:['o ścianę','w błoto','na wiatr','pod nogi'], answer:0 },
 { q:'Mieć „węża w kieszeni" to być…', opts:['bogatym','skąpym','zdradliwym','szybkim'], answer:1 },
 { q:'„Wyjść jak Zabłocki…"', opts:['na swoje','przed szereg','na mydle','z mostu'], answer:2 },
 { q:'„Dzielić skórę…"', opts:['na pół','na niedźwiedziu','po polowaniu','między psy'], answer:1 },
 { q:'„Kto rano wstaje…"', opts:['ten się wysypia','temu Pan Bóg daje','ten kawę stawia','ten pierwszy je'], answer:1 },
]},

{ id:'qx_prl', title:'PRL — quiz dla roczników 60–90', desc:'Kartki, kolejki i saturator. Kto pamięta, ten wie.', questions:[
 { q:'Co można było kupić „na kartki" w latach 80.?', opts:['tylko benzynę','mięso, cukier i inne podstawowe produkty','tylko alkohol','wyłącznie buty'], answer:1 },
 { q:'„Maluch" to potoczna nazwa…', opts:['Fiata 125p','Fiata 126p','Syreny','Trabanta'], answer:1 },
 { q:'Oranżada w proszku była jedzona najczęściej…', opts:['rozpuszczona w wodzie','prosto z torebki na palec','z mlekiem','z herbatą'], answer:1 },
 { q:'Teleranek emitowano w…', opts:['sobotnie wieczory','niedzielne poranki','piątkowe popołudnia','poniedziałki'], answer:1 },
 { q:'Pewex to sklep, w którym płaciło się…', opts:['złotówkami','kartkami','dolarami/bonami','czekami'], answer:2 },
 { q:'Stan wojenny wprowadzono…', opts:['13 grudnia 1981','1 września 1980','4 czerwca 1989','31 sierpnia 1982'], answer:0 },
 { q:'„Trybuna Ludu" to…', opts:['program TV','gazeta partyjna','radiowęzeł','pomnik'], answer:1 },
 { q:'Woda z saturatora była podawana…', opts:['w butelkach','w szklance wielorazowej','w woreczkach','w kubkach papierowych'], answer:1 },
]},

{ id:'qx_kuchnia', title:'Kuchnia polska i światowa', desc:'Od żurku po ramen. Głodny nie podchodź.', questions:[
 { q:'Podstawą prawdziwego żurku jest…', opts:['kapusta kiszona','zakwas z mąki żytniej','ocet','serwatka'], answer:1 },
 { q:'Tatar wołowy podaje się…', opts:['lekko podsmażony','surowy','gotowany','wędzony'], answer:1 },
 { q:'Carbonara według klasycznej receptury NIE zawiera…', opts:['jajek','guanciale','śmietany','pecorino'], answer:2 },
 { q:'Kimchi to…', opts:['zupa rybna','fermentowana kapusta po koreańsku','surowa ryba','placek ryżowy'], answer:1 },
 { q:'Oscypek robi się z mleka…', opts:['krowiego','koziego','owczego','klaczy'], answer:2 },
 { q:'Bigos tradycyjnie dusi się…', opts:['15 minut','godzinę','wiele godzin, najlepiej kilka dni','w mikrofali'], answer:2 },
 { q:'Wasabi to spokrewniony z chrzanem…', opts:['korzeń','owoc','grzyb','wodorost'], answer:0 },
 { q:'Pierogi ruskie mają nadzienie z…', opts:['mięsa i kapusty','ziemniaków i twarogu','grzybów','soczewicy'], answer:1 },
]},

{ id:'qx_sport', title:'Sport — legendy i rekordy', desc:'Nie tylko piłka. Sprawdź, czy ogarniasz sport szeroko.', questions:[
 { q:'Ile punktów ma szachowa figura hetmana (umownie)?', opts:['5','7','9','11'], answer:2 },
 { q:'Maraton ma długość…', opts:['40,000 km','41,195 km','42,195 km','43,000 km'], answer:2 },
 { q:'Adam Małysz z zawodu wyuczonego jest…', opts:['stolarzem','dekarzem-blacharzem','ślusarzem','kucharzem'], answer:1 },
 { q:'W siatkówce set (poza tie-breakiem) gra się do…', opts:['15 punktów','21 punktów','25 punktów','30 punktów'], answer:2 },
 { q:'Robert Kubica ścigał się w F1 m.in. dla teamu…', opts:['Ferrari','BMW Sauber','McLaren','Red Bull'], answer:1 },
 { q:'Ile trwa jedna kwarta w NBA?', opts:['10 minut','12 minut','15 minut','20 minut'], answer:1 },
 { q:'Irena Szewińska zdobywała medale olimpijskie w…', opts:['pływaniu','lekkoatletyce','gimnastyce','łyżwiarstwie'], answer:1 },
 { q:'„Hat-trick" w piłce nożnej to…', opts:['3 asysty','3 gole jednego zawodnika w meczu','3 żółte kartki','wygrana 3:0'], answer:1 },
]},

{ id:'qx_pilka', title:'Piłka nożna — klasyka i mistrzostwa', desc:'Mundiale, legendy i polskie momenty chwały.', questions:[
 { q:'Polska zajęła 3. miejsce na mundialu w latach…', opts:['1974 i 1982','1978 i 1986','1970 i 1974','1982 i 1990'], answer:0 },
 { q:'„Ręka Boga" to gol…', opts:['Pelego','Maradony','Zidane\'a','Ronaldo'], answer:1 },
 { q:'Mecz trwa 90 minut plus…', opts:['nic','doliczony czas','zawsze dogrywka','przerwa techniczna'], answer:1 },
 { q:'Który kraj wygrał najwięcej mundiali?', opts:['Niemcy','Argentyna','Włochy','Brazylia'], answer:3 },
 { q:'Kazimierz Deyna grał z numerem…', opts:['7','9','10','11'], answer:2 },
 { q:'Rzut karny wykonuje się z odległości…', opts:['9 metrów','10 metrów','11 metrów','12 metrów'], answer:2 },
 { q:'Złotą Piłkę za rok 2021 otrzymał…', opts:['Robert Lewandowski','Lionel Messi','Cristiano Ronaldo','Karim Benzema'], answer:1 },
 { q:'„Orły Górskiego" to reprezentacja Polski z lat…', opts:['60.','70.','80.','90.'], answer:1 },
]},

{ id:'qx_film', title:'Kino klasyczne — poziom kinoman', desc:'Filmy, które wypada znać. Serio, wypada.', questions:[
 { q:'„Ojca chrzestnego" wyreżyserował…', opts:['Martin Scorsese','Francis Ford Coppola','Stanley Kubrick','Sergio Leone'], answer:1 },
 { q:'W „Matriksie" Neo wybiera tabletkę…', opts:['niebieską','czerwoną','zieloną','białą'], answer:1 },
 { q:'„Rejs" Marka Piwowskiego to komedia z roku…', opts:['1965','1970','1976','1981'], answer:1 },
 { q:'Hannibal Lecter po raz pierwszy przeraził widzów w „Milczeniu owiec" w roku…', opts:['1987','1991','1994','1999'], answer:1 },
 { q:'Które hasło pochodzi z „Misia" Barei?', opts:['„Nie mamy pańskiego płaszcza i co nam pan zrobi"','„Jestem twoim ojcem"','„Houston, mamy problem"','„Zostań, zjedz obiad"'], answer:0 },
 { q:'„Psy" Pasikowskiego — kto zagrał Franza Maurera?', opts:['Cezary Pazura','Bogusław Linda','Marek Kondrat','Janusz Gajos'], answer:1 },
 { q:'Pierwszy pełnometrażowy film Disneya to…', opts:['Pinokio','Królewna Śnieżka i siedmiu krasnoludków','Dumbo','Bambi'], answer:1 },
 { q:'„Pulp Fiction" nagrodzono Złotą Palmą w roku…', opts:['1992','1994','1996','1998'], answer:1 },
]},

{ id:'qx_seriale', title:'Kultowe seriale — PL i świat', desc:'Od „Czterech pancernych" po „Breaking Bad".', questions:[
 { q:'Pies z serialu „Czterej pancerni i pies" miał na imię…', opts:['Cywil','Szarik','Reksio','Burek'], answer:1 },
 { q:'Walter White z „Breaking Bad" był nauczycielem…', opts:['fizyki','matematyki','chemii','biologii'], answer:2 },
 { q:'„Alternatywy 4" wyreżyserował…', opts:['Stanisław Bareja','Janusz Zaorski','Andrzej Wajda','Juliusz Machulski'], answer:0 },
 { q:'Serial „Przyjaciele" rozgrywa się w…', opts:['Los Angeles','Chicago','Nowym Jorku','Bostonie'], answer:2 },
 { q:'Kapitan Hans Kloss to agent o kryptonimie…', opts:['J-23','H-4','X-27','A-1'], answer:0 },
 { q:'„Gra o tron" powstała na podstawie książek…', opts:['J.R.R. Tolkiena','George\'a R.R. Martina','Andrzeja Sapkowskiego','C.S. Lewisa'], answer:1 },
 { q:'W „Stranger Things" świat „po drugiej stronie" to…', opts:['Zaświaty','Drugi Wymiar','Upside Down','Mroczna Strefa'], answer:2 },
 { q:'„Świat według Kiepskich" rozgrywa się we…', opts:['Warszawie','Łodzi','Wrocławiu','Krakowie'], answer:2 },
]},

{ id:'qx_muzyka', title:'Muzyka — od Chopina po rock', desc:'Klasyka, rock i polskie legendy sceny.', questions:[
 { q:'Fryderyk Chopin urodził się w…', opts:['Warszawie','Żelazowej Woli','Krakowie','Paryżu'], answer:1 },
 { q:'Wokalistą Queen był…', opts:['David Bowie','Freddie Mercury','Elton John','Mick Jagger'], answer:1 },
 { q:'„Dziwny jest ten świat" śpiewał…', opts:['Czesław Niemen','Marek Grechuta','Tadeusz Nalepa','Krzysztof Krawczyk'], answer:0 },
 { q:'Zespół The Beatles pochodził z…', opts:['Londynu','Manchesteru','Liverpoolu','Birmingham'], answer:2 },
 { q:'Perfect to zespół, którego wokalistą był…', opts:['Grzegorz Markowski','Kora','Zbigniew Hołdys','Marek Piekarczyk'], answer:0 },
 { q:'Ile strun ma klasyczna gitara?', opts:['4','5','6','7'], answer:2 },
 { q:'„Bohemian Rhapsody" trwa około…', opts:['3 minut','4 minut','6 minut','9 minut'], answer:2 },
 { q:'Nirvana to ikona gatunku…', opts:['disco','grunge','punk','metal'], answer:1 },
]},

{ id:'qx_bajki', title:'Bajki dzieciństwa — nostalgia level max', desc:'Dobranocki i animacje, przy których rosłeś.', questions:[
 { q:'Bolek i Lolek to…', opts:['bracia','kuzyni','sąsiedzi','koledzy z klasy'], answer:0 },
 { q:'Reksio z dobranocki to pies rasy…', opts:['jamnik','terier (łaciaty kundelek)','owczarek','pudel'], answer:1 },
 { q:'Smerfy uciekają przed…', opts:['Gargamelem','Klakierem','Dziadkiem','Osiłkiem'], answer:0 },
 { q:'„Wilk i Zając" to kreskówka znana jako…', opts:['Nu, pogodi!','Tom i Jerry','Krecik','Miś Uszatek'], answer:0 },
 { q:'Miś Uszatek miał charakterystyczne…', opts:['czerwone spodnie','klapnięte uszko','okulary','parasol'], answer:1 },
 { q:'Scooby-Doo je przekąski o nazwie…', opts:['Scooby Chrupki','Scooby Snacks','Psie Ciastka','Chrup-Chrup'], answer:1 },
 { q:'Kot Filemon przyjaźnił się z kotem…', opts:['Bonifacym','Klakierem','Tygrysem','Mruczkiem'], answer:0 },
 { q:'„Pszczółka Maja" ma przyjaciela trutnia o imieniu…', opts:['Filip','Gucio','Alek','Zyzio'], answer:1 },
]},

{ id:'qx_gry', title:'Gry wideo — retro i klasyki', desc:'Od Pegasusa po Wiedźmina. Sprawdź swój gamerski staż.', questions:[
 { q:'Mario z gier Nintendo jest z zawodu…', opts:['kucharzem','hydraulikiem','stolarzem','mechanikiem'], answer:1 },
 { q:'W Tetrisie klocki składają się z…', opts:['3 kwadratów','4 kwadratów','5 kwadratów','6 kwadratów'], answer:1 },
 { q:'Wiedźmin Geralt pochodzi z…', opts:['Novigradu','Rivii','Kaer Morhen','Oxenfurtu'], answer:1 },
 { q:'Pegasus to podróbka konsoli…', opts:['SNES','Nintendo Famicom/NES','Sega Mega Drive','Atari'], answer:1 },
 { q:'Duszki z Pac-Mana to Blinky, Pinky, Inky i…', opts:['Clyde','Sparky','Winky','Rudy'], answer:0 },
 { q:'„Creeper" to przeciwnik z gry…', opts:['Terraria','Minecraft','Roblox','Fortnite'], answer:1 },
 { q:'Lara Croft to bohaterka serii…', opts:['Uncharted','Tomb Raider','Far Cry','Assassin\'s Creed'], answer:1 },
 { q:'Polskie studio CD Projekt RED stworzyło…', opts:['Dying Light','Cyberpunk 2077','This War of Mine','Frostpunk'], answer:1 },
]},

{ id:'qx_internet', title:'Internet i technologia', desc:'Od dial-upu po AI. Historia sieci w pigułce.', questions:[
 { q:'WWW wymyślił…', opts:['Bill Gates','Tim Berners-Lee','Steve Jobs','Linus Torvalds'], answer:1 },
 { q:'Charakterystyczny dźwięk łączenia z internetem wydawał…', opts:['router Wi-Fi','modem dial-up','światłowód','pager'], answer:1 },
 { q:'Pierwszy iPhone zaprezentowano w roku…', opts:['2005','2007','2009','2010'], answer:1 },
 { q:'HTML to język…', opts:['programowania','znaczników','baz danych','skryptowy'], answer:1 },
 { q:'Nasza-Klasa była popularna głównie w latach…', opts:['1995–2000','2001–2005','2006–2012','2015–2020'], answer:2 },
 { q:'Skrót „RAM" oznacza pamięć…', opts:['stałą','operacyjną','graficzną','wirtualną'], answer:1 },
 { q:'Gadu-Gadu identyfikowało użytkownika po…', opts:['e-mailu','numerze','nicku','telefonie'], answer:1 },
 { q:'Linux to system stworzony przez…', opts:['Torvaldsa','Wozniaka','Ballmera','Bezosa'], answer:0 },
]},

{ id:'qx_moto', title:'Motoryzacja — benzyna we krwi', desc:'Klasyki szos, silniki i polskie legendy drogowe.', questions:[
 { q:'Polonez był produkowany przez…', opts:['FSM','FSO','ZSD','Ursus'], answer:1 },
 { q:'Silnik „bokser" ma cylindry ułożone…', opts:['w rzędzie','w V','naprzeciwlegle','pionowo'], answer:2 },
 { q:'Skrót ABS dotyczy…', opts:['poduszek powietrznych','układu hamulcowego','klimatyzacji','zawieszenia'], answer:1 },
 { q:'Trabant miał karoserię z…', opts:['aluminium','stali','duroplastu','włókna szklanego'], answer:2 },
 { q:'„Kaszlak" to potoczna nazwa…', opts:['Fiata 126p','Syreny','Warszawy','Żuka'], answer:1 },
 { q:'Które auto NIE było produkowane w PRL?', opts:['Warszawa','Syrena','Wartburg','Nysa'], answer:2 },
 { q:'Ferrari pochodzi z miasta…', opts:['Turyn','Mediolan','Maranello','Bolonia'], answer:2 },
 { q:'W silniku 4-suwowym po suwie sprężania następuje…', opts:['ssanie','praca (zapłon)','wydech','chłodzenie'], answer:1 },
]},

{ id:'qx_zwierzeta', title:'Zwierzęta — rekordy natury', desc:'Najszybsze, największe i najdziwniejsze. Serio, najdziwniejsze.', questions:[
 { q:'Najszybsze zwierzę lądowe to…', opts:['antylopa','gepard','struś','lew'], answer:1 },
 { q:'Największe zwierzę, jakie kiedykolwiek żyło, to…', opts:['dinozaur argentynozaur','płetwal błękitny','megalodon','mamut'], answer:1 },
 { q:'Ile serc ma dżdżownica (par serc pseudo)?', opts:['1','2','5','10'], answer:2 },
 { q:'Koala je prawie wyłącznie liście…', opts:['bambusa','eukaliptusa','akacji','figowca'], answer:1 },
 { q:'Które zwierzę śpi stojąc?', opts:['krowa','koń','pies','świnia'], answer:1 },
 { q:'Żubr występuje dziko m.in. w puszczy…', opts:['Kampinoskiej','Białowieskiej','Noteckiej','Bukowej'], answer:1 },
 { q:'Ośmiornica ma krew koloru…', opts:['czerwonego','niebieskiego','zielonego','przezroczystego'], answer:1 },
 { q:'Najgłośniejsze zwierzę świata (pod wodą) to…', opts:['delfin','kaszalot','orka','humbak'], answer:1 },
]},

{ id:'qx_cialo', title:'Ciało człowieka — fabryka dziwów', desc:'Kości, neurony i fakty, które brzmią jak fejki.', questions:[
 { q:'Dorosły człowiek ma kości w liczbie około…', opts:['106','206','306','406'], answer:1 },
 { q:'Najtwardszą substancją w ciele jest…', opts:['kość udowa','szkliwo zębów','paznokieć','chrząstka'], answer:1 },
 { q:'Który narząd zużywa ~20% energii organizmu?', opts:['serce','wątroba','mózg','nerki'], answer:2 },
 { q:'Krew od serca prowadzą…', opts:['żyły','tętnice','limfa','oskrzela'], answer:1 },
 { q:'Ile litrów krwi ma przeciętny dorosły?', opts:['2–3','4–6','8–10','12'], answer:1 },
 { q:'Odciski palców są…', opts:['identyczne u bliźniąt','unikalne dla każdego','dziedziczone 1:1','zmienne co roku'], answer:1 },
 { q:'Najdłuższa kość człowieka to kość…', opts:['ramienna','piszczelowa','udowa','biodrowa'], answer:2 },
 { q:'Żołądek chroni się przed samostrawieniem dzięki…', opts:['niskiej temperaturze','warstwie śluzu','braku kwasu','specjalnym bakteriom'], answer:1 },
]},

{ id:'qx_mity', title:'Mitologia grecka — poziom Olimp', desc:'Bogowie, herosi i dramaty większe niż w reality show.', questions:[
 { q:'Bogiem morza był…', opts:['Hades','Posejdon','Ares','Hermes'], answer:1 },
 { q:'Puszkę z nieszczęściami otworzyła…', opts:['Afrodyta','Pandora','Hera','Atena'], answer:1 },
 { q:'Achilles był rażalny tylko w…', opts:['dłoń','oko','piętę','kark'], answer:2 },
 { q:'Ile prac wykonał Herakles?', opts:['7','10','12','15'], answer:2 },
 { q:'Minotaur mieszkał w labiryncie na…', opts:['Rodos','Krecie','Cyprze','Santorini'], answer:1 },
 { q:'Bogini mądrości to…', opts:['Hera','Atena','Artemida','Demeter'], answer:1 },
 { q:'Prometeusz ukradł bogom…', opts:['złoto','ogień','ambrozję','piorun'], answer:1 },
 { q:'Wzrok Meduzy zamieniał ludzi w…', opts:['popiół','kamień','zwierzęta','lód'], answer:1 },
]},

{ id:'qx_lektury', title:'Lektury szkolne — czy czytałeś naprawdę?', desc:'Streszczenia nie wystarczą. Sprawdzamy.', questions:[
 { q:'Jacek Soplica w „Panu Tadeuszu" ukrywa się jako…', opts:['Gerwazy','ksiądz Robak','Wojski','Protazy'], answer:1 },
 { q:'„Lalka" Prusa rozgrywa się głównie w…', opts:['Krakowie','Warszawie','Lublinie','Paryżu'], answer:1 },
 { q:'Kto napisał „Zemstę"?', opts:['Juliusz Słowacki','Aleksander Fredro','Adam Mickiewicz','Cyprian Norwid'], answer:1 },
 { q:'Wokulski zakochał się w…', opts:['Helenie','Izabeli Łęckiej','Justynie','Emilii'], answer:1 },
 { q:'„Quo vadis" opowiada o czasach…', opts:['średniowiecza','Nerona','napoleońskich','potopu'], answer:1 },
 { q:'Bohaterem „Zbrodni i kary" jest…', opts:['Bazarow','Raskolnikow','Oniegin','Bezuchow'], answer:1 },
 { q:'W „Weselu" Wyspiańskiego chochoł to symbol…', opts:['zwycięstwa','uśpienia narodu','miłości','bogactwa'], answer:1 },
 { q:'„Mały Książę" spotyka na Ziemi…', opts:['wilka','lisa','węża i lisa','orła'], answer:2 },
]},

{ id:'qx_sztuka', title:'Sztuka i architektura', desc:'Obrazy i budowle, które każdy widział, ale mało kto zna.', questions:[
 { q:'„Mona Lisę" namalował…', opts:['Michał Anioł','Rafael','Leonardo da Vinci','Botticelli'], answer:2 },
 { q:'„Krzyk" to obraz…', opts:['van Gogha','Muncha','Dalego','Picassa'], answer:1 },
 { q:'Sufit Kaplicy Sykstyńskiej ozdobił…', opts:['Leonardo','Michał Anioł','Caravaggio','Tycjan'], answer:1 },
 { q:'Jan Matejko NAMALOWAŁ…', opts:['„Bitwę pod Grunwaldem"','„Damę z gronostajem"','„Babie lato"','„Szał uniesień"'], answer:0 },
 { q:'Krzywa Wieża stoi w…', opts:['Rzymie','Wenecji','Pizie','Florencji'], answer:2 },
 { q:'Salvador Dalí to mistrz…', opts:['kubizmu','surrealizmu','impresjonizmu','baroku'], answer:1 },
 { q:'Sagrada Família w Barcelonie to dzieło…', opts:['Gaudíego','Le Corbusiera','Picassa','Miró'], answer:0 },
 { q:'„Dama z gronostajem" wisi w…', opts:['Luwrze','Krakowie','Prado','Ermitażu'], answer:1 },
]},

{ id:'qx_ciekawostki', title:'Ciekawostki, w które trudno uwierzyć', desc:'Wszystko tu jest prawdą. Nawet to najdziwniejsze.', questions:[
 { q:'Uniwersytet w Oksfordzie jest starszy niż…', opts:['imperium Azteków','piramidy w Gizie','Koloseum','pismo'], answer:0 },
 { q:'Miód znaleziony w grobowcach egipskich po tysiącach lat był…', opts:['zepsuty','nadal jadalny','zamieniony w kamień','pusty'], answer:1 },
 { q:'Banan to z botanicznego punktu widzenia…', opts:['owoc pestkowy','jagoda','orzech','warzywo'], answer:1 },
 { q:'Rekiny istniały wcześniej niż…', opts:['dinozaury','drzewa','oba powyższe','żadne z powyższych'], answer:2 },
 { q:'Wieża Eiffla latem jest…', opts:['niższa','wyższa o ~15 cm','tej samej wysokości','przechylona'], answer:1 },
 { q:'Flamingi są różowe, bo…', opts:['taki mają gen','jedzą skorupiaki i algi z barwnikami','farbują się w błocie','to efekt słońca'], answer:1 },
 { q:'Najkrótsza wojna w historii (Anglia–Zanzibar) trwała około…', opts:['38 minut','3 godziny','2 dni','tydzień'], answer:0 },
 { q:'Chmura burzowa może ważyć…', opts:['kilka kilogramów','kilka ton','setki tysięcy ton','nic — to para'], answer:2 },
]},

{ id:'qx_europa', title:'Europa — sąsiedzi bliżsi i dalsi', desc:'Flagi, języki i granice. Bez ściągi z mapy.', questions:[
 { q:'Ile państw graniczy z Polską?', opts:['5','6','7','8'], answer:2 },
 { q:'W którym państwie mówi się po katalońsku (poza Hiszpanią) jako urzędowym?', opts:['Portugalia','Andora','Monako','San Marino'], answer:1 },
 { q:'Najmniejsze państwo świata to…', opts:['Monako','San Marino','Watykan','Liechtenstein'], answer:2 },
 { q:'Fiordy to wizytówka…', opts:['Danii','Norwegii','Holandii','Estonii'], answer:1 },
 { q:'Które państwo NIE leży nad Bałtykiem?', opts:['Litwa','Łotwa','Czechy','Estonia'], answer:2 },
 { q:'Flaga Ukrainy to kolory…', opts:['biało-czerwony','niebiesko-żółty','żółto-niebieski (żółty u góry)','czerwono-czarny'], answer:1 },
 { q:'Strefa euro NIE obejmuje…', opts:['Słowacji','Litwy','Czech','Chorwacji'], answer:2 },
 { q:'Przylądek Północny (Nordkapp) leży w…', opts:['Islandii','Norwegii','Finlandii','Szwecji'], answer:1 },
]},

{ id:'qx_pogoda', title:'Pogoda i klimat — nie tylko small talk', desc:'Chmury, wiatry i zjawiska, o których mówisz codziennie.', questions:[
 { q:'Halny to wiatr typu…', opts:['bryza','fen','monsun','pasat'], answer:1 },
 { q:'Cumulonimbus to chmura…', opts:['pierzasta','burzowa','warstwowa','mgły'], answer:1 },
 { q:'Tęcza powstaje przez…', opts:['odbicie od chmur','załamanie i odbicie światła w kroplach','pył w powietrzu','pole magnetyczne'], answer:1 },
 { q:'Grzmot słyszymy po błysku, bo…', opts:['dźwięk jest wolniejszy od światła','chmury tłumią dźwięk','błysk jest wyżej','to echo'], answer:0 },
 { q:'Najwyższa temperatura zanotowana na Ziemi (ok. 56,7°C) padła w…', opts:['Saharze','Dolinie Śmierci','Australii','Iraku'], answer:1 },
 { q:'Skala Beauforta mierzy…', opts:['opady','siłę wiatru','wilgotność','ciśnienie'], answer:1 },
 { q:'„Oko cyklonu" to miejsce, gdzie…', opts:['wiatr jest najsilniejszy','panuje względny spokój','pada najmocniej','jest najzimniej'], answer:1 },
 { q:'Szron powstaje, gdy para wodna…', opts:['skrapla się','resublimuje (od razu w lód)','zamarza po deszczu','paruje'], answer:1 },
]},

{ id:'qx_pieniadze', title:'Pieniądze i ekonomia na chłopski rozum', desc:'Inflacja, banki i to, czemu w portfelu pusto.', questions:[
 { q:'Inflacja to…', opts:['spadek cen','wzrost ogólnego poziomu cen','wzrost pensji','podatek'], answer:1 },
 { q:'Denominacja złotego (skreślenie 4 zer) miała miejsce w…', opts:['1989','1995','1999','2004'], answer:1 },
 { q:'Kto ustala stopy procentowe w Polsce?', opts:['Sejm','Rada Polityki Pieniężnej','Ministerstwo Finansów','banki komercyjne'], answer:1 },
 { q:'„Bessa" na giełdzie to okres…', opts:['wzrostów','spadków','stagnacji','wakacji'], answer:1 },
 { q:'Na polskim banknocie 100 zł widnieje…', opts:['Mieszko I','Władysław Jagiełło','Kazimierz Wielki','Zygmunt Stary'], answer:1 },
 { q:'PKB to skrót od…', opts:['Polski Kapitał Bankowy','Produkt Krajowy Brutto','Państwowa Kasa Budżetowa','Produkt Końcowy Bilansu'], answer:1 },
 { q:'Procent składany oznacza, że odsetki…', opts:['są stałe','naliczają się też od wcześniejszych odsetek','maleją','są zwolnione z podatku'], answer:1 },
 { q:'Waluta Czech to…', opts:['euro','korona','forint','lej'], answer:1 },
]},

{ id:'qx_zagadki_det', title:'Zagadki detektywistyczne', desc:'Dedukcja jak u Sherlocka. Czytaj między wierszami.', questions:[
 { q:'Znaleziono Romea i Julię martwych na mokrej podłodze wśród szkła. To…', opts:['zbrodnia doskonała','rybki, którym rozbiło się akwarium','wypadek samochodowy','zatrucie'], answer:1 },
 { q:'Mężczyzna mieszka na 10. piętrze, ale windą jeździ tylko do 7. i idzie pieszo. Czemu?', opts:['lubi ruch','jest niski i nie sięga wyżej przycisku','winda się psuje','oszczędza prąd'], answer:1 },
 { q:'Im więcej zabierasz, tym większa się staje. Co to?', opts:['pożyczka','dziura','fala','cisza'], answer:1 },
 { q:'Co ma miasta bez domów, rzeki bez wody i lasy bez drzew?', opts:['sen','mapa','obraz','wspomnienie'], answer:1 },
 { q:'Nocny stróż zmarł W DZIEŃ. Czy firma wypłaci odszkodowanie za wypadek przy pracy?', opts:['tak, oczywiście','nie — zmarł poza godzinami swojej pracy','tylko połowę','zależy od pogody'], answer:1 },
 { q:'Dwóch ojców i dwóch synów złowiło 3 ryby — każdy po jednej. Jak to możliwe?', opts:['jedna uciekła','to dziadek, ojciec i syn','łowili dwa razy','jeden kłamał'], answer:1 },
 { q:'Co należy do Ciebie, ale inni używają tego częściej?', opts:['telefon','imię','czas','cień'], answer:1 },
 { q:'Jest zawsze przed Tobą, ale nie można jej zobaczyć. To…', opts:['przyszłość','śmierć','myśl','droga'], answer:0 },
]},

{ id:'qx_final', title:'WIELKI MIX — finałowy sprawdzian', desc:'Po jednym pytaniu z każdej dziedziny. Zdasz na 8/8?', questions:[
 { q:'Rok chrztu Polski to…', opts:['966','1000','1025','1410'], answer:0 },
 { q:'Symbol chemiczny sodu to…', opts:['S','So','Na','Sd'], answer:2 },
 { q:'Autor „Wiedźmina" to…', opts:['Sapkowski','Pilipiuk','Dukaj','Ziemiański'], answer:0 },
 { q:'Mount Everest leży na granicy Nepalu i…', opts:['Indii','Chin (Tybetu)','Bhutanu','Pakistanu'], answer:1 },
 { q:'Ile zawodników drużyny piłkarskiej gra na boisku?', opts:['9','10','11','12'], answer:2 },
 { q:'Wenus jest planetą numer… od Słońca', opts:['1','2','3','4'], answer:1 },
 { q:'„Hamleta" napisał…', opts:['Molier','Szekspir','Goethe','Dante'], answer:1 },
 { q:'Bit to…', opts:['8 bajtów','najmniejsza jednostka informacji','rodzaj procesora','wirus'], answer:1 },
]}

];
