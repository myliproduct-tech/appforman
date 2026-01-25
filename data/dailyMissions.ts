import { Task } from '../types';

const DAILY_MISSIONS_DATABASE: Record<number, Omit<Task, 'id' | 'completed' | 'isDaily'>[]> = {
  // --- MĚSÍC 1: OPERACE PRŮZKUMNÍK ---

  // Týden 1: Příprava hardwaru a herního pole
  0: [
    { title: "Spuštění protokolu", description: "Identifikuj v kalendáři 'Okno příležitosti' (plodné dny). Musíme přesně vědět, kdy zahájit útok na cíl.", category: 'strategie', points: 45 },
    { title: "Systémový dopink", description: "Kup Velitelce kyselinu listovou. Bez tohoto doplňku nebude mít Juniorův hardware z čeho stavět.", category: 'medik', points: 35 }
  ],
  1: [
    { title: "Logistické centrum", description: "Doplň zásoby neperlivé vody a zdravého paliva. Odstraň z dosahu Velitelky nezdravé 'buffery' (chipsy, nekvalitní cukry).", category: 'zásoby', points: 35 },
    { title: "Digitální kontrola", description: "Ověř funkčnost teploměru nebo ovulačních senzorů. Veškerá měřicí technika musí být 100% kalibrovaná.", category: 'hardware', points: 40 }
  ],
  2: [
    { title: "Sanitární očista", description: "Proveď hloubkový úklid Základny. Čisté prostředí zvyšuje psychickou stabilitu Velitelky před zahájením mise.", category: 'údržba', points: 40 },
    { title: "Bonusová pozornost", description: "Kup Velitelce květinu nebo oblíbený nealko drink. Udržování vysokého morálu posádky je klíčem k úspěchu.", category: 'servis', points: 35 }
  ],
  3: [
    { title: "Analýza expertů", description: "Vyhledej a ulož kontakt na špičkovou gynekologickou kliniku v perimetru. Musíme vědět, kam poslat Juniora na první kontrolu.", category: 'průzkum', points: 35 },
    { title: "Finanční alokace", description: "Založ v bankovní aplikaci skrytý fond 'OPERACE POTOMEK'. Začni kumulovat kredity na budoucí upgrady.", category: 'trezor', points: 45 }
  ],
  4: [
    { title: "Toxická clona", description: "Prověř všechny domácí čističe a chemii. Pokud jsou agresivní, přesuň je do izolace. Musíme vytvořit bezpečné herní pole.", category: 'perimetr', points: 40 },
    { title: "Hormonální analýza", description: "Nastuduj, jak se mění nálady Velitelky v první fázi cyklu. Poznamenej si kritické body pro budoucí komunikaci.", category: 'briefing', points: 35 }
  ],
  5: [
    { title: "Časový harmonogram", description: "Vyčisti společný kalendář na příštích 14 dní od stresových událostí. Velitelka potřebuje klidový režim pro úspěšnou infiltraci.", category: 'logistika', points: 40 },
    { title: "Mobilní podpora", description: "Zkontroluj provozní kapaliny a tlak v pneu u transportního vozidla. Musíme být mobilní bez technických bugů.", category: 'transport', points: 35 }
  ],
  6: [
    { title: "Stav projektu", description: "Aktuálně probíhá příprava 'stavebního materiálu' v těle Velitelky. Pořiď první záznam do deníku: 'Základna připravena k zahájení'.", category: 'junior_update', points: 45 },
    { title: "Zóna klidu", description: "Uprav ložnici tak, aby byla maximálně komfortní (teplota, osvětlení). Stavíme dokonalé prostředí pro spuštění mise.", category: 'stavba', points: 40 }
  ],

  // Týden 2: Okno příležitosti (Dny 8–14)
  7: [
    { title: "Mobilizace týmu", description: "Vyhlaš stav nejvyšší pohotovosti. Podle kalendáře se blížíme k hlavnímu bodu mise. Naplánuj společný čas bez vyrušování.", category: 'strategie', points: 45 },
    { title: "Vitamínový check", description: "Dohlédni, aby Velitelka nezapomněla na ranní dávku kyseliny listové. Hardware vyžaduje stabilitu hned od startu.", category: 'medik', points: 15 }
  ],
  8: [
    { title: "Analýza cyklu", description: "Pokud používáte ovulační testy, vyhodnoť data. Musíme přesně vědět, kdy je systém Velitelky otevřen pro zápis Juniora.", category: 'průzkum', points: 35 },
    { title: "Masážní protokol", description: "Aplikuj 15minutovou masáž ramen. Snížení stresového kortizolu u Velitelky zvyšuje šance na úspěšnou infiltraci.", category: 'servis', points: 40 }
  ],
  9: [
    { title: "Energetický dopink", description: "Nakup čerstvé potraviny bohaté na zinek a vitamín E. Kvalitní palivo je pro budoucí hardware Juniora nezbytné.", category: 'zásoby', points: 35 },
    { title: "Plánování klidu", description: "Zruš na dnešní večer všechny externí návštěvy a povinnosti. Prioritou je klid na Základně a soustředění na misi.", category: 'logistika', points: 40 }
  ],
  10: [
    { title: "Teplotní dohled", description: "Pokud sledujete bazální teplotu, zapiš data do grafu. Technika nám musí potvrdit, že jsme v ideálních herních podmínkách.", category: 'hardware', points: 35 },
    { title: "Eliminace stresu", description: "Odstraň z okolí Velitelky jakékoli zdroje negativity (např. pracovní maily po pracovní době). Základna musí být v režimu 'Zen'.", category: 'perimetr', points: 40 }
  ],
  11: [
    { title: "Porada o postupu", description: "Proberte s Velitelkou, jak se cítí. Zaznamenej si případné změny nálad – hormonální bouře mohou začít dříve, než čekáš.", category: 'briefing', points: 35 },
    { title: "Technická revize domácnosti", description: "Oprav kapající kohoutek nebo vrzající dveře. Nic nesmí Velitelku rozptylovat při soustředění na hlavní úkol.", category: 'údržba', points: 35 }
  ],
  12: [
    { title: "Logistika výjezdu", description: "Naplánuj na zítřek krátký výlet někam, kde je Velitelka šťastná. Šťastná Velitelka = optimální prostředí pro Juniora.", category: 'transport', points: 40 },
    { title: "Audit výdajů", description: "Zkontroluj, zda máte v rozpočtu rezervu na případné další medicínské testy nebo doplňky pro příští týden.", category: 'trezor', points: 35 }
  ],
  13: [
    { title: "Stav infiltrátoru", description: "Probíhá pokus o start systému. Junior je ve fázi 'přenosu dat'. Udělej si do deníku záznam o čase zahájení hlavního útoku.", category: 'junior_update', points: 45 },
    { title: "Atmosféra Základny", description: "Uprav ložnici pomocí světla a vůně do režimu 'Maximální pohoda'. Hardware potřebuje pro úspěšný start perfektní zázemí.", category: 'stavba', points: 40 }
  ],

  // Týden 3: Fáze zápisu dat (Dny 15–21)
  14: [
    { title: "Režim tichého chodu", description: "Hlavní útok proběhl. Nyní přepni systém do udržovacího módu. Žádné prudké pohyby ani extrémní zátěž pro Velitelku.", category: 'strategie', points: 45 },
    { title: "Kontrola suplementace", description: "Dohlédni, aby Velitelka pokračovala v užívání vitamínů. I když Junior ještě není 'vidět', stavební materiál musí být v krevním oběhu.", category: 'medik', points: 35 }
  ],
  15: [
    { title: "Protinevolnostní dieta", description: "Nakup potraviny bohaté na Omega-3 (např. ořechy, kvalitní ryby). Podporujeme optimální prostředí pro uhnízdění hardwaru.", category: 'zásoby', points: 35 },
    { title: "Termoregulační péče", description: "Ujisti se, že Velitelka nemá studené nohy. Připrav teplé ponožky nebo deku. Teplo na periferiích pomáhá celkové stabilitě.", category: 'servis', points: 35 }
  ],
  16: [
    { title: "Monitoring symptomů", description: "Začni sledovat (nenápadně), zda Velitelka nehlásí změnu citlivosti senzorů (únava, citlivost prsou). Zapisuj si to do logu.", category: 'průzkum', points: 40 },
    { title: "Čistý vzduch", description: "Vyvětrej celou Základnu a omez používání silných parfémů nebo aromatických svíček. Citlivost na pachy může začít eskalovat.", category: 'perimetr', points: 35 }
  ],
  17: [
    { title: "Psychologická podpora", description: "Velitelka může být v napětí z čekání na výsledek. Ujisti ji, že tvůj support je 100%, ať už test dopadne jakkoliv.", category: 'briefing', points: 45 },
    { title: "Eliminace hluku", description: "Namaž vrzající panty a oprav vše, co vydává vysokofrekvenční zvuky. Snižujeme hladinu stresového šumu v herním prostředí.", category: 'údržba', points: 35 }
  ],
  18: [
    { title: "Spánkový management", description: "Nastav dřívější večerku pro celý tým. Během spánku probíhají u Velitelky ty nejdůležitější systémové procesy.", category: 'logistika', points: 40 },
    { title: "Příprava detektorů", description: "Kup v lékárně dva různé typy citlivých digitálních testů (early detection). Ulož je do Trezoru, jejich čas přijde příští týden.", category: 'hardware', points: 40 }
  ],
  19: [
    { title: "Stav zápisu", description: "Junior (blastocysta) právě provádí 'přistávací manévr' a pokouší se o implantaci. V deníku si označ tento den jako kritický pro stabilitu.", category: 'junior_update', points: 35 },
    { title: "Bezpečný přesun", description: "Pokud jedete autem, vyhýbej se výmolům a agresivnímu brzdění. Transport Velitelky musí být v režimu 'VIP Cargo'.", category: 'transport', points: 35 }
  ],
  20: [
    { title: "Revize pojištění", description: "Prověř, jaké zdravotní benefity a balíčky nabízí vaše pojišťovna pro budoucí rodinné upgrady. Informace jsou kredity.", category: 'trezor', points: 35 },
    { title: "Zóna komfortu", description: "Pořiď do ložnice zatemňovací závěsy nebo masku na oči. Maximální tma zvyšuje produkci melatoninu, což Juniorův hardware potřebuje.", category: 'stavba', points: 40 }
  ],

  // Týden 4: Okamžik pravdy (Dny 22–28)
  21: [
    { title: "Detekční plán", description: "Rozhodni s Velitelkou, kdy provedete první sken (test). Doporučení: Počkejte na první ranní moč pro maximální sílu signálu.", category: 'strategie', points: 45 },
    { title: "Hydratační kontrola", description: "Dohlédni na přísun čisté vody. Ledviny Velitelky začínají pracovat na vyšší výkon, aby filtrovaly palivo pro oba.", category: 'medik', points: 35 }
  ],
  22: [
    { title: "Analýza raných errorů", description: "Vyhledej informace o 'implantačním krvácení' nebo 'špinění'. Nelekej se – může to být potvrzení úspěšného zápisu, ne chyba systému.", category: 'průzkum', points: 40 },
    { title: "Gastronomický bonus", description: "Připrav Velitelce jídlo, které miluje, ale je lehce stravitelné. Vyhni se experimentům, žaludek může být v citlivém módu.", category: 'servis', points: 40 }
  ],
  23: [
    { title: "Protinevolnostní kit", description: "Kup do zásoby zázvorový čaj, lízátka nebo krekry. Pokud Junior naskočí, ranní bugy (nevolnosti) mohou přijít velmi rychle.", category: 'zásoby', points: 35 },
    { title: "Bezpečná zóna", description: "Zkontroluj, zda v bytě nejsou plísně nebo silné chemické pachy. Juniorův hardware je v této vteřině nejzranitelnější.", category: 'perimetr', points: 40 }
  ],
  24: [
    { title: "Emoční monitoring", description: "Velitelka může být pod tlakem (PMS vs. těhotenství mají podobné příznaky). Buď tichý pozorovatel a hromosvod pro případné výboje.", category: 'briefing', points: 45 },
    { title: "Plánování volna", description: "Prověř kalendář na příští týden. Pokud bude test pozitivní, bude Velitelka potřebovat více času na 'vstřebání dat' a odpočinek.", category: 'logistika', points: 35 }
  ],
  25: [
    { title: "Alokace na experty", description: "Prověř cenu prvního ultrazvuku u soukromého specialisty. Pokud chceme potvrzení v režimu 'Fast Track', budeme potřebovat kredity.", category: 'trezor', points: 40 },
    { title: "Bezpečné parkování", description: "Ujisti se, že transportní modul (auto) je zaparkován tak, aby Velitelka nemusela jít daleko, pokud se bude cítit slabá.", category: 'transport', points: 35 }
  ],
  26: [
    { title: "Generování signálu", description: "Junior (embryo) začíná produkovat hormon hCG. To je ten kód, který test zachytí. V deníku zapiš: 'Čekání na první ping'.", category: 'junior_update', points: 35 },
    { title: "Technická čistka", description: "Vyčisti lednici a vyhoď vše, co má silný zápach (např. zrající sýry). Senzory Velitelky mohou začít hlásit chybu při každém otevření dvířek.", category: 'údržba', points: 40 }
  ],
  27: [
    { title: "OPERACE TEST", description: "Provedení skenu systému. Pokud se objeví potvrzovací kód (dvě čárky), mise je oficiálně zahájena. Pokud ne, připrav se na restart cyklu.", category: 'velká_mise', points: 150 },
    { title: "První vizuální log", description: "Pokud je výsledek pozitivní, vyfoť test jako první důkaz Juniorovy existence na Základně. Zároveň si ulož datum 'Dne 0' do archivu.", category: 'junior_update', points: 50 }
  ],

  // --- MĚSÍC 2: OPERACE STAVITEL ---
  // Týden 5: Formování procesoru (Dny 29–35)
  28: [
    { title: "Informační embargo", description: "Domluv se s Velitelkou na komunikačním tichu. Nikdo mimo HQ (vás dva) nesmí o infiltraci vědět, dokud nebude hardware stabilní.", category: 'strategie', points: 45 },
    { title: "Kontrola paliva", description: "Ověř, zda Velitelka pociťuje kovovou pachuť nebo jiné změny v senzorech. Pokračuj v dodávkách vitamínů pro stavbu páteře.", category: 'medik', points: 35 }
  ],
  29: [
    { title: "Protichybový balíček", description: "Nakup suchary, mandle a minerálky. Junior začíná brát energii přímo z Velitelky, což může způsobit ranní pokles napětí (nevolnost).", category: 'zásoby', points: 35 },
    { title: "Management odpočinku", description: "Uprav večerní program tak, aby Velitelka mohla jít do standby režimu (spánku) hned po práci. Systém je teď extrémně vytížen.", category: 'logistika', points: 40 }
  ],
  30: [
    { title: "Odpadový management", description: "Přebíráš plnou kontrolu nad vynášením košů. I mírný pach starého jídla může u Velitelky vyvolat okamžitý systémový error (zvracení).", category: 'údržba', points: 40 },
    { title: "Databáze specialistů", description: "Najdi recenze na nejlepší screeningová pracoviště v dosahu 50 km. Budeme potřebovat špičkovou optiku pro budoucí kontroly.", category: 'průzkum', points: 35 }
  ],
  31: [
    { title: "Finanční predikce", description: "Udělej si přehled, kolik stojí 'startovací balíček' (kočár, vajíčko, postýlka). Začni plánovat rozložení nákladů do příštích měsíců.", category: 'trezor', points: 45 },
    { title: "Hydratační servis", description: "Přines Velitelce sklenici vody nebo čaje až k rukám, i když o to nežádá. Aktivní podpora zvyšuje morálku týmu.", category: 'servis', points: 15 }
  ],
  32: [
    { title: "Pachová clona", description: "Přestaň používat silné parfémy a agresivní kolínské. Velitelka má teď senzory nastavené na režim 'Super-slídil' a tvoje vůně může být nepřítel.", category: 'perimetr', points: 35 },
    { title: "Kontrola techniky", description: "Pokud máte doma digitální váhu, prověř baterie. Budeme sledovat hmotnostní parametry Základny (Velitelky) v týdenních intervalech.", category: 'hardware', points: 35 }
  ],
  33: [
    { title: "Logistika bezpečnosti", description: "Prověř, zda máš v autě čistý pytlík pro případ nouze a láhev vody. Ranní přesuny mohou být pro Velitelku rizikové.", category: 'transport', points: 35 },
    { title: "Analýza nálad", description: "Zaznamenej si frekvenci náhlých změn nálad. Nejsou to útoky na tebe, je to jen hormonální přepisování softwaru Velitelky.", category: 'briefing', points: 35 }
  ],
  34: [
    { title: "Evoluce hardwaru", description: "Junior už má základy mozku, míchy a srdce. Srdce začíná pumpovat krev. V deníku zapiš: 'Procesor naskočil, systém běží'.", category: 'junior_update', points: 40 },
    { title: "Úprava spánkové zóny", description: "Pořiď Velitelce extra měkký polštář nebo deku. Její tělo teď spotřebovává 2x víc energie, spánek musí být maximálně efektivní.", category: 'stavba', points: 40 }
  ],

  // Týden 6: Formování periferií (Dny 36–42)
  35: [
    { title: "Krizový plán 'Nevolnost'", description: "Definuj bezpečná jídla, která Velitelka toleruje. Pokud systém hlásí chybu po každém jídle, přejdi na režim 'malé dávky v krátkých intervalech'.", category: 'strategie', points: 45 },
    { title: "Revize symptomů", description: "Sleduj, zda Velitelka netrpí extrémní závratí. Juniorův krevní oběh se rozšiřuje a bere si zdroje z hlavního napájení Velitelky.", category: 'medik', points: 40 }
  ],
  36: [
    { title: "Akvizice hořčíku", description: "Kup minerální vody s vysokým obsahem hořčíku (Magnesia apod.). Pomáhá to stabilizovat svalové napětí a mírnit ranní křeče v systému.", category: 'zásoby', points: 35 },
    { title: "Gastronomická pohotovost", description: "Připrav Velitelce snídani přímo do postele (stačí suchar nebo čaj). Stabilizace cukru před vertikalizací těla brání pádu systému.", category: 'servis', points: 35 }
  ],
  37: [
    { title: "Monitoring lékařských slotů", description: "Ověř termín první velké vizity u lékaře (potvrzení srdeční akce). Pokud termín nemáte, dnes je den pro jeho urgenci.", category: 'průzkum', points: 40 },
    { title: "Analýza skrytých nákladů", description: "Zjisti, kolik stojí nadstandardní testy v 1. trimestru (prvotrimestrální screening). Zarezervuj si na to kredity v rozpočtu.", category: 'trezor', points: 40 }
  ],
  38: [
    { title: "Eliminace pachových stop", description: "Proveď hloubkovou čistku lednice a spíže. Odstraň vše, co má intenzivní aroma. Velitelka má nyní čichové senzory nastavené na režim 'predátor'.", category: 'údržba', points: 40 },
    { title: "Bezpečnostní zóna 'Koupelna'", description: "Převezmi čištění všech povrchů agresivní chemií. Velitelka nesmí inhalovat toxické výpary, které by mohly narušit Juniorův kód.", category: 'perimetr', points: 45 }
  ],
  39: [
    { title: "Komunikační uzel", description: "Prober s Velitelkou její pocity ohledně změn postavy. Hardware se mění (zvětšování prsou, nafouklé břicho). Buď hromosvodem pro její nejistoty.", category: 'briefing', points: 45 },
    { title: "Management logů", description: "Začni ukládat všechny lékařské zprávy a účtenky do jedné fyzické nebo digitální složky. Pořádek v datech šetří čas v krizi.", category: 'logistika', points: 35 }
  ],
  40: [
    { title: "Optimalizace trasy", description: "Pokud Velitelka stále cestuje do práce, najdi trasu s nejmenším počtem uzavírek a otřesů. Každý náraz do podvozku může vyvolat nevolnost.", category: 'transport', points: 35 },
    { title: "Kontrola váhy a tlaku", description: "Pokud máte domácí tlakoměr, proveď kontrolní měření. Nízký tlak je v tomto týdnu běžný bug, který způsobuje únavu systému.", category: 'hardware', points: 35 }
  ],
  41: [
    { title: "Upgrade grafiky", description: "Juniorovi se začínají tvořit tmavé skvrny tam, kde budou oči, a důlky pro uši. Srdce bije 150x za minutu. Zapiš do logu: 'Hardware má první detaily.'", category: 'junior_update', points: 35 },
    { title: "Světelný tuning", description: "Instaluj v chodbě nebo koupelně tlumené noční světlo. Velitelka bude nyní často provádět noční výsadky (močení) a ostré světlo by ji zbytečně restartovalo.", category: 'stavba', points: 40 }
  ],

  // Týden 7: Expanze neuronové sítě (Dny 43–49)
  42: [
    { title: "Delegování úkolů", description: "Přerovnej priority na Základně. Velitelka musí být v režimu 'Low Performance' pro vše kromě vývoje Juniora. Přebíráš veškerou fyzicky náročnou logistiku.", category: 'strategie', points: 45 },
    { title: "Monitoring pleti a těla", description: "Sleduj, zda se neobjevuje 'těhotenské akné' nebo citlivost pokožky. Hardware Velitelky prochází masivní hormonální rekonfigurací.", category: 'medik', points: 35 }
  ],
  43: [
    { title: "Vitamínový audit", description: "Zkontroluj, zda neubývá kyselina listová a jód. Pokud zásoby klesnou pod 15 %, okamžitě zahaj nákupní misi v lékárně (Medik-shop).", category: 'zásoby', points: 35 },
    { title: "Chladivý protokol", description: "Pořiď chladivý gel na nohy nebo prsa. Zvýšený průtok krve způsobuje pocit horka a napětí v hardwaru Velitelky.", category: 'servis', points: 35 }
  ],
  44: [
    { title: "Studium 'Těhotenské průkazky'", description: "Zjisti, co všechno se do tohoto oficiálního logu zapisuje. Brzy ji Velitelka dostane a bude to nejdůležitější dokument mise.", category: 'průzkum', points: 35 },
    { title: "Fond pro módu", description: "Vyčleň kredity na první vlnu 'Stretch-out' oblečení. Původní brnění (džíny) začne být brzy nekompatibilní s rostoucím břichem.", category: 'trezor', points: 40 }
  ],
  45: [
    { title: "Kontrola vodních zdrojů", description: "Vyčisti varnou konvici a prověř kvalitu vody. Velitelka teď musí filtrovat kapaliny pro dva, systém nesmí být zanášen nečistotami.", category: 'údržba', points: 35 },
    { title: "Bezpečnostní audit podlah", description: "Zkontroluj, zda na Základně nejsou kluzké plochy nebo volné koberce. Velitelka může mít kvůli nízkému tlaku horší stabilitu.", category: 'perimetr', points: 40 }
  ],
  46: [
    { title: "Konzultace s experty", description: "Pokud má Velitelka první oficiální vizitu u lékaře, připrav si seznam otázek (např. sport, kofein, cestování). Buď tam jako backup.", category: 'briefing', points: 45 },
    { title: "Plánování stravy", description: "Připrav jídla, která obsahují vitamín B6. Pomáhá to stabilizovat systém a mírnit ranní chyby (nevolnosti).", category: 'logistika', points: 35 }
  ],
  47: [
    { title: "Parkovací průzkum", description: "Pokud jedete na kliniku, zjisti si dopředu, kde je nejbližší volné parkování. Velitelka by neměla provádět dlouhé pěší přesuny v emisi.", category: 'transport', points: 35 },
    { title: "Kontrola spánkové techniky", description: "Prověř, zda Velitelce vyhovuje současná matrace. Pokud si stěžuje na bolesti v kříži, je čas na upgrade (např. anatomický polštář).", category: 'hardware', points: 40 }
  ],
  48: [
    { title: "Formování končetin", description: "Juniorovi se začínají tvořit ruce a nohy, i když zatím vypadají jako pádla. Vytváří se mu špička nosu. Zapiš do logu: 'Základy pohybu nahozeny.'", category: 'junior_update', points: 35 },
    { title: "Organizace úložných prostor", description: "Začni vyklízet jednu skříň nebo regál. Brzy budeme potřebovat prostor pro ukládání externího hardwaru (výbavy).", category: 'stavba', points: 35 }
  ],

  // Týden 8: Upgrade na verzi "PLOD" (Dny 50–56)
  49: [
    { title: "Revize pracovního nasazení", description: "Prober s Velitelkou její zátěž v práci. Pokud je mise příliš náročná, je čas naplánovat strategický ústup (neschopenku nebo úpravu náplně).", category: 'strategie', points: 45 },
    { title: "Kontrola hladiny železa", description: "Dohlédni na konzumaci potravin bohatých na železo (hovězí, listová zelenina). Juniorův krevní systém roste a vyčerpává hlavní zásobníky Velitelky.", category: 'medik', points: 35 }
  ],
  50: [
    { title: "Akvizice textilu", description: "Kup první kus oblečení s elastickým pasem. I když břicho není vidět, vnitřní hardware se roztahuje a tlak na pas začíná být pro Velitelku nepohodlný.", category: 'zásoby', points: 35 },
    { title: "Relaxační rituál", description: "Napusť Velitelce vlažnou vanu (pozor, max. 37 °C!). Přidej sůl s hořčíkem pro uvolnění napětí v svalovém korzetu.", category: 'servis', points: 40 }
  ],
  51: [
    { title: "Analýza screeningových metod", description: "Zjisti rozdíl mezi standardním ultrazvukem a placenými testy z krve (NIPT). Informace o genetické stabilitě Juniora jsou klíčové.", category: 'průzkum', points: 40 },
    { title: "Optimalizace cashflow", description: "Zkontroluj, zda máte nastavené trvalé platby a rezervu pro případ, že by Velitelka musela náhle přejít do úsporného režimu (domácí klid).", category: 'trezor', points: 40 }
  ],
  52: [
    { title: "Čistka vzduchotechniky", description: "Vyčisti filtry ve vysavači a otři prach na místech, kam se běžně nedívá. Velitelka potřebuje sterilní prostředí pro optimální ventilaci.", category: 'údržba', points: 35 },
    { title: "Eliminace rizik", description: "Zkontroluj stabilitu všech židlí a schodů na Základně. Kvůli hormonům se Velitelce uvolňují vazy a hrozí vyšší riziko pádů.", category: 'perimetr', points: 40 }
  ],
  53: [
    { title: "Porada o jménech", description: "Otevři první kolo diskuse o jménech pro Juniora. Zatím jen nahazuj nápady, netlač na finální rozhodnutí. Cílem je zvednout morálku týmu.", category: 'briefing', points: 35 },
    { title: "Plánování nákupů", description: "Vytvoř si v mobilu sdílený nákupní seznam. Velitelka do něj bude psát své náhlé 'bugy' (chutě) a ty budeš připraven k okamžitému výjezdu.", category: 'logistika', points: 35 }
  ],
  54: [
    { title: "Kontrola klimatizace", description: "Ujisti se, že klimatizace v autě funguje perfektně a filtry jsou čisté. Velitelka může trpět náhlými návaly horka nebo nevolnosti z vydýchaného vzduchu.", category: 'transport', points: 35 },
    { title: "Instalace monitoring-app", description: "Pokud ještě nemáš, nainstaluj si do mobilu aplikaci pro sledování vývoje plodu. Sleduj parametry Juniora v reálném čase.", category: 'hardware', points: 15 }
  ],
  55: [
    { title: "KONEC OPERACE STAVITEL", description: "Oslavte dokončení 2. měsíce. Junior je nyní oficiálně plod, má lokty a kolena. Připrav slavnostní nealko večeři (pokud to žaludek Velitelky dovolí).", category: 'velká_mise', points: 150 },
    { title: "Vizualizace pokroku", description: "Junior už má prsty, i když jsou ještě spojené blánou. Začíná se hýbat, i když to Velitelka ještě necítí. Zapiš do logu: 'Hardware je kompletní, začíná fáze růstu.'", category: 'junior_update', points: 50 }
  ],

  // --- MĚSÍC 3: OPERACE KOLAUDACE ---
  // Týden 9: Ladění motoriky (Dny 57–63)
  56: [
    { title: "Plánování screeningu", description: "Ověř termín velkého ultrazvuku (NT screening). Je to nejdůležitější hardware-check prvního trimestru. Musíme mít zarezervovaný slot v kalendáři.", category: 'strategie', points: 45 },
    { title: "Dentální monitoring", description: "Objednej Velitelku k zubaři. Hormonální upgrade může oslabit dásně (běžný bug systému). Prevence je levnější než oprava.", category: 'medik', points: 35 }
  ],
  57: [
    { title: "Analýza kosmetiky", description: "Vyhledej krémy nebo oleje proti striím. Kůže Velitelky se brzy začne natahovat a potřebuje elastický upgrade dřív, než se objeví první trhliny.", category: 'průzkum', points: 35 },
    { title: "Gastro-servis na přání", description: "Dnes se neptej 'co bude k večeři', ale 'na co má tvůj systém zrovna chuť'. Pokud je to okurka s marmeládou, prostě to doruč.", category: 'servis', points: 35 }
  ],
  58: [
    { title: "Obnova šatníku (Level 1)", description: "Kup první 'těhotenské' legíny. I když břicho neroste do dálky, začíná se měnit v pase. Komfort Velitelky = stabilita mise.", category: 'zásoby', points: 40 },
    { title: "Fond pro porodné", description: "Zjisti, jaké jsou aktuální státní příspěvky nebo benefity v práci. Začni mapovat příjmy během fáze 'Mateřská dovolená'.", category: 'trezor', points: 35 }
  ],
  59: [
    { title: "Hloubková hygiena", description: "Vyčisti odpady v celém bytě. Velitelka má stále čichové senzory v režimu 'max', jakýkoliv závan stojaté vody může vyvolat systémový error.", category: 'údržba', points: 40 },
    { title: "Eliminace kluzných ploch", description: "Pořiď do sprchy/vany protiskluzovou podložku. Těžiště Velitelky se začne brzy měnit a stabilita je prioritou č. 1.", category: 'perimetr', points: 35 }
  ],
  60: [
    { title: "Komunikační strategie", description: "Proberte, komu a kdy misi oznámíte. Rodina? Šéf? Spojenci? Stanovte si přesný časový harmonogram pro odtajnění.", category: 'briefing', points: 45 },
    { title: "Plánování odpočinku", description: "Zaveď 'povinnou hodinu ticha' po příchodu Velitelky z práce. Žádné úkoly, žádné dotazy. Jen dobíjení baterek.", category: 'logistika', points: 35 }
  ],
  61: [
    { title: "Bezpečnostní pásy", description: "Pořiď adaptér na bezpečnostní pás do auta pro těhotné. Odvádí tlak z břicha dolů na pánev. Je to klíčový bezpečnostní upgrade.", category: 'transport', points: 40 },
    { title: "Audio-test", description: "Začni na Juniora mluvit. Jeho uši se formují a začíná vnímat vibrace. Tvůj hlas musí mít v databázi jako 'bezpečný signál'.", category: 'hardware', points: 15 }
  ],
  62: [
    { title: "Vývoj reflexů", description: "Junior už hýbe končetinami a umí sevřít ruku v pěst, i když to Velitelka necítí. Zapiš do logu: 'Základní motorika online.'", category: 'junior_update', points: 35 },
    { title: "Revize osvětlení", description: "Pokud máte doma ostré bílé zářivky, vyměň je za teplé žluté světlo. Velitelka potřebuje večer snížit stimulaci pro lepší reboot.", category: 'stavba', points: 35 }
  ],

  // Týden 10: Finalizace orgánových soustav (Dny 64–70)
  63: [
    { title: "Rozvrh kontrol", description: "Zkontroluj, zda máte všechna potvrzení a termíny na screeningy v 1. trimestru. Musíme mít 'čistý štít' před vstupem do klidnějšího 2. trimestru.", category: 'strategie', points: 40 },
    { title: "Nutriční audit", description: "Zaměř se na přísun vápníku. Juniorovi začínají tvrdnout kosti a pokud ho nemá dost z paliva, začne ho odčerpávat z hardwaru Velitelky (zuby, kosti).", category: 'medik', points: 35 }
  ],
  64: [
    { title: "Monitoring trhu", description: "Začni sledovat recenze na monitory dechu a digitální chůvičky. Potřebujeme senzory s nejlepším dosahem a nulovým rušením signálu.", category: 'průzkum', points: 35 },
    { title: "Gastro-upgrade", description: "Připrav Velitelce jídlo bohaté na vlákninu. Systém Velitelky se kvůli hormonům zpomaluje a hrozí 'zácpa v logistických cestách'.", category: 'servis', points: 35 }
  ],
  65: [
    { title: "Akvizice 'Stretch-ready' prádla", description: "Kup Velitelce podprsenku bez kostic nebo s nastavitelným obvodem. Hardware (prsa) se připravuje na budoucí mléčnou produkci a vyžaduje komfort.", category: 'zásoby', points: 40 },
    { title: "Analýza úspor", description: "Spočítej, kolik kreditů ušetříte, pokud začnete nakupovat výbavu z druhé ruky (bazarové moduly). Některý hardware (např. vajíčko do auta) ale musí být vždy nový!", category: 'trezor', points: 40 }
  ],
  66: [
    { title: "Technická revize ložnice", description: "Zkontroluj stabilitu postele a roštů. Velitelka se začne brzy v noci více otáčet a potřebuje pevnou základnu bez vrzání.", category: 'údržba', points: 35 },
    { title: "Bezpečnostní zóna 'Kuchyně'", description: "Prověř expirační doby všech otevřených omáček a konzerv. Juniorův systém teď nesnese žádnou chybu v biochemii paliva.", category: 'perimetr', points: 40 }
  ],
  67: [
    { title: "Komunikační uzel 'Práce'", description: "Naplánujte, jakým způsobem Velitelka oznámí misi nadřízeným. Je důležité zachovat dobré vztahy se spojenci pro budoucí návrat do herního pole.", category: 'briefing', points: 45 },
    { title: "Management energie", description: "Pokud Velitelka pociťuje náhlé propady výkonu, zaveďte 'Power Nap' (20 min spánku) hned po obědě. Reboot systému je nezbytný.", category: 'logistika', points: 35 }
  ],
  68: [
    { title: "Úprava posezení", description: "Nastav v autě sklon sedadla spolujezdce tak, aby Velitelka měla víc prostoru pro břicho a nohy. Ergonomie při transportu snižuje riziko únavy.", category: 'transport', points: 15 },
    { title: "Audio-stimulace", description: "Pusť Velitelce i Juniorovi klidnou hudbu nebo bílý šum. Ladíme u Juniora sluchové senzory na příjemné frekvence.", category: 'hardware', points: 35 }
  ],
  69: [
    { title: "Konec embryonálního stádia", description: "Junior má už vytvořené klouby (kotníky, zápěstí). Ocasní část definitivně zmizela. Zapiš do logu: 'Hardware je kompletní, verze 1.0 schválena k růstu.'", category: 'junior_update', points: 40 },
    { title: "Vyklízení sektoru 'Junior'", description: "Vyhraď v bytě první polici nebo skříňku, která bude sloužit výhradně pro Juniorův externí hardware (plenky, oblečení).", category: 'stavba', points: 40 }
  ],

  // Týden 11: Expanze procesoru a kůže (Dny 71–77)
  70: [
    { title: "Logistika screeningu", description: "Pokud je screening příští týden, potvrď čas výsadku a zajisti, aby Velitelka měla s sebou veškerou dokumentaci (průkazku, logy).", category: 'strategie', points: 40 },
    { title: "Péče o hardware (Kůže)", description: "Dohlédni, aby Velitelka začala s pravidelným promazáváním břicha a boků. Kůže se připravuje na masivní expanzi a potřebuje elasticitu.", category: 'medik', points: 35 }
  ],
  71: [
    { title: "Analýza nutričních bugů", description: "Zjisti, které potraviny způsobují Velitelce nadýmání. Juniorova expanze tlačí na trávicí trakt a systém potřebuje lehce stravitelné palivo.", category: 'průzkum', points: 35 },
    { title: "Hydro-servis", description: "Připrav Velitelce relaxační koupel s Epsomskou solí. Hořčík se vstřebá kůží a pomůže uvolnit napětí v rozšiřujícím se svalovém korzetu.", category: 'servis', points: 40 }
  ],
  72: [
    { title: "Obnova šatníku (Level 2)", description: "Pořiď Velitelce první set 'oversized' triček nebo šatů. Původní outfit začíná omezovat cirkulaci krve, což snižuje výkon systému.", category: 'zásoby', points: 40 },
    { title: "Audit pojišťovny", description: "Prověř, zda vaše pojišťovna neproplácí část nákladů na prvotrimestrální screening nebo vitamíny. Každý ušetřený kredit se počítá.", category: 'trezor', points: 35 }
  ],
  73: [
    { title: "Kontrola lůžkovin", description: "Vyper všechny polštáře a peřiny na vysokou teplotu. Velitelka může mít citlivější sliznice a prach na Základně by mohl vyvolat zbytečné alergické reakce.", category: 'údržba', points: 40 },
    { title: "Bezpečnostní revize obuvi", description: "Zkontroluj podrážky bot Velitelky. Pokud jsou kluzké nebo podpatky nestabilní, nařiď nákup bezpečné, nízké obuvi.", category: 'perimetr', points: 35 }
  ],
  74: [
    { title: "Komunikační uzel 'Rodina'", description: "Pokud se chystáte na odtajnění mise, připravte si strategii (např. fotka z ultrazvuku v obálce). Musíte mít kontrolu nad šířením informací.", category: 'briefing', points: 45 },
    { title: "Management aktivit", description: "Naplánuj na víkend aktivitu s nízkou zátěží (např. výstava, kino). Velitelka potřebuje sociální interakci, ale bez rizika fyzického přetížení.", category: 'logistika', points: 35 }
  ],
  75: [
    { title: "Optimalizace komfortu", description: "Pokud Velitelka v autě pociťuje nevolnost, pořiď do transportního modulu malý ventilátor nebo zajisti funkční ionizátor vzduchu.", category: 'transport', points: 35 },
    { title: "Audio-stimulace 2.0", description: "Začni pouštět Juniorovi různé druhy zvuků (klasická hudba, příroda). Ladíme senzory na různé frekvence.", category: 'hardware', points: 35 }
  ],
  76: [
    { title: "Formování detailů", description: "Juniorovi se začínají tvořit nehtová lůžka a v dásních se zakládají budoucí zuby. Zapiš do logu: 'Detaily hardwaru jsou v procesu výroby.'", category: 'junior_update', points: 35 },
    { title: "Reorganizace koupelny", description: "Uvolni místo v koupelně pro nové kosmetické upgrady Velitelky (oleje, krémy). Základna musí být ergonomicky přizpůsobena nové rutině.", category: 'stavba', points: 40 }
  ],

  // Týden 12: Finále první fáze (Dny 78–84)
  77: [
    { title: "Den D: Screening", description: "Pokud je dnes termín velkého ultrazvuku, buď plně přítomen. Je to poprvé, co uvidíte Juniora jako kompletního 'malého člověka'. Sleduj srdeční akci a pohyby.", category: 'strategie', points: 40 },
    { title: "Revize suplementů", description: "Poraď se s lékařem, zda pokračovat v čisté kyselině listové, nebo přejít na komplexní 'Junior-pack' vitamíny pro 2. trimestr.", category: 'medik', points: 35 }
  ],
  78: [
    { title: "Analýza výsledků", description: "Pečlivě prostuduj zprávu ze screeningu. Pokud jsou všechny parametry v normě (NT, nosní kost atd.), mise má zelenou pro veřejné oznámení.", category: 'průzkum', points: 45 },
    { title: "Oslavný rituál", description: "Kup Velitelce něco speciálního na sebe nebo oblíbenou pochoutku. Přežili jste nejtěžší fázi infiltrace hardwaru. Morálka týmu musí být na maximu.", category: 'servis', points: 45 }
  ],
  79: [
    { title: "Akvizice širšího arzenálu", description: "Nakup potraviny s vysokým obsahem jódu a železa. Junior začíná produkovat vlastní hormony (štítná žláza) a potřebuje k tomu suroviny.", category: 'zásoby', points: 35 },
    { title: "Plánování velkých investic", description: "Na základě výsledků screeningu potvrď objednávku na hlavní transportní modul (kočárek). Dodací lhůty bývají dlouhé, je čas jednat.", category: 'trezor', points: 45 }
  ],
  80: [
    { title: "Kontrola domácí lékárničky", description: "Doplň zásoby léků na pálení žáhy (antacida bezpečná pro těhotné). S rostoucím Juniorem začne brzy docházet k tlaku na žaludeční uzávěr.", category: 'údržba', points: 35 },
    { title: "Odstranění zátěže", description: "Převezmi veškeré nošení těžkých nákupů a břemen (nad 5 kg). Velitelka se nesmí přetěžovat, aby nedošlo k mechanickému poškození spojení s Juniorem.", category: 'perimetr', points: 40 }
  ],
  81: [
    { title: "Velké odtajnění", description: "Pokud jsou výsledky v pořádku, můžete zahájit informační kampaň pro rodinu a přátele. Sleduj reakce spojenců a užívejte si status 'Budoucí rodiče'.", category: 'briefing', points: 40 },
    { title: "Harmonogram 2. trimestru", description: "Naplánuj 'Babymoon' (poslední dovolenou ve dvou). Druhý trimestr je pro cestování nejbezpečnější a Velitelka bude mít nejvíc energie.", category: 'logistika', points: 40 }
  ],
  82: [
    { title: "Bezpečnostní revize", description: "Zkontroluj, zda adaptér na pásy v autě Velitelce stále sedí. Junior se vytahuje nahoru z pánve, tlak na břicho musí být nulový.", category: 'transport', points: 35 },
    { title: "První audio-vazba", description: "Junior už reaguje na podněty. Zkus jemně zatlačit na břicho Velitelky – Junior může odpovědět pohybem (i když ho Velitelka ještě necítí).", category: 'hardware', points: 40 }
  ],
  83: [
    { title: "UKONČENÍ 1. TRIMESTRU", description: "Velká gratulace, Operativče! Junior měří cca 6 cm, má sací reflex a umí škytat. Udělejte si společnou fotku břicha (Level 1) pro archiv.", category: 'velká_mise', points: 150 },
    { title: "Formování ledvin", description: "Juniorovy ledviny začínají produkovat moč do plodové vody. Systém recyklace kapalin je online. Zapiš do logu: 'Všechny systémy funkční, zahajuji fázi masivního růstu.'", category: 'junior_update', points: 50 }
  ],

  // --- MĚSÍC 4: OPERACE EXPANZE ---
  // Týden 13: Start růstového spurtu (Dny 85–91)
  84: [
    { title: "Upgrade na verzi 2.0", description: "Junior je nyní plně závislý na placentě, která převzala veškerou podporu života. Naplánuj termíny pravidelných kontrol pro celý druhý trimestr.", category: 'strategie', points: 45 },
    { title: "Revize energetických článků", description: "Dohlédni na zvýšený příjem bílkovin. Junior začíná budovat svalovou hmotu a vyžaduje kvalitní stavební materiál.", category: 'medik', points: 35 }
  ],
  85: [
    { title: "Analýza těhotenské módy", description: "Vyhledej obchody s 'Maternity' výbavou. Velitelka už pravděpodobně nedopne standardní brnění (džíny). Potřebujeme elastické řešení.", category: 'průzkum', points: 35 },
    { title: "Hydratační péče o podvozek", description: "Aplikuj masážní olej na nohy Velitelky. Zvětšující se objem krve může způsobovat pocit těžkých končetin.", category: 'servis', points: 35 }
  ],
  86: [
    { title: "Obnova minerálních zásob", description: "Kup potraviny bohaté na hořčík a draslík (banány, ořechy). Tím předejdeme křečím v systému Velitelky, které se v této fázi často objevují.", category: 'zásoby', points: 35 },
    { title: "Audit rozpočtu na výbavu", description: "Rozděl budoucí náklady na 'Kritické' (kočár, postýlka) a 'Volitelné' (dekorace). Začni sledovat slevové akce na prémiové moduly.", category: 'trezor', points: 40 }
  ],
  87: [
    { title: "Čistka vzduchových cest", description: "Vyměň filtry v klimatizaci nebo čističce vzduchu. Velitelka může mít kvůli hormonům zduřelé sliznice (těhotenská rýma) a potřebuje čistý vzduch.", category: 'údržba', points: 35 },
    { title: "Odstranění mechanických překážek", description: "Odstraň z cesty kabely nebo nestabilní předměty, o které by Velitelka mohla zakopnout. Její těžiště se začíná pomalu posouvat.", category: 'perimetr', points: 40 }
  ],
  88: [
    { title: "Koordinace s týmem", description: "Pokud jste misi už oznámili, začni korigovat nevyžádané rady od okolních jednotek. Ty jsi hlavní analytik, filtruj stresové informace.", category: 'briefing', points: 35 },
    { title: "Plánování 'Babymoon'", description: "Vyhledej destinaci pro krátký odpočinkový výsadek. Druhý trimestr je ideální čas na poslední společnou misi před příchodem Juniora.", category: 'logistika', points: 45 }
  ],
  89: [
    { title: "Kontrola ergonomie", description: "Nastav bederní opěrku v transportním modulu (autě). Velitelka může začít pociťovat tlak v kříži, jak se Juniorův hardware zvětšuje.", category: 'transport', points: 15 },
    { title: "Audio-tuning", description: "Juniorovi se začínají vyvíjet kůstky v uchu. Začni mu pouštět tvou oblíbenou hudbu na nízkou hlasitost. Budujeme jeho vkus od základů.", category: 'hardware', points: 35 }
  ],
  90: [
    { title: "Formování otisků prstů", description: "Junior má na koncích prstů už unikátní kód (otisky). Umí si cucat palec a trénuje polykání. Zapiš do logu: 'Unikátní identifikace dokončena.'", category: 'junior_update', points: 45 },
    { title: "Projekt 'Dětský sektor'", description: "Zaměř prostor, kde bude stát postýlka a přebalovací pult. Potřebujeme přesné rozměry, než pořídíme nábytek.", category: 'stavba', points: 40 }
  ],

  // Týden 14: Ladění mimiky a pohybů (Dny 92–98)
  91: [
    { title: "Rozvrh druhého trimestru", description: "Naplánuj termín pro velký morfologický ultrazvuk (obvykle kolem 20. týdne). Je to klíčový scan pro kontrolu všech Juniorových systémů.", category: 'strategie', points: 40 },
    { title: "Kontrola dásní", description: "Dohlédni na zvýšenou ústní hygienu Velitelky. Zvýšený průtok krve může způsobit bug 'krvácení dásní'. Pořiď měkčí kartáček, pokud je to nutné.", category: 'medik', points: 35 }
  ],
  92: [
    { title: "Analýza kurzu předporodní přípravy", description: "Vyhledej v perimetru kurzy pro budoucí operativce (otce) a Velitelky. Znalost terénu a technik porodu snižuje stres při finální misi.", category: 'průzkum', points: 35 },
    { title: "Péče o křížovou oblast", description: "Aplikuj jemnou masáž beder. Děloha se zvedá výš do břišní dutiny a začíná měnit těžiště Velitelky, což namáhá svalový korzet.", category: 'servis', points: 40 }
  ],
  93: [
    { title: "Obnova šatníku (Level 3)", description: "Pořiď Velitelce speciální těhotenské džíny s vysokým elastickým pásem. Poskytují podporu břichu a eliminují tlak na Juniorův prostor.", category: 'zásoby', points: 40 },
    { title: "Fond pro vybavení pokojíčku", description: "Začni sledovat ceny barev na stěny (low-VOC, netoxické) a koberců. Připravujeme rozpočet na hlavní fázi STAVBY.", category: 'trezor', points: 35 }
  ],
  94: [
    { title: "Odlehčení logistiky", description: "Převezmi 100 % úkolů spojených s vysáváním a vytíráním. Ohýbání a rotace trupu začínají být pro Velitelku nepohodlné.", category: 'údržba', points: 45 },
    { title: "Bezpečnostní kontrola ložnice", description: "Zkontroluj vlhkost vzduchu. Pokud je příliš suchý, pořiď zvlhčovač. Velitelka potřebuje optimální prostředí pro regeneraci sliznic.", category: 'perimetr', points: 35 }
  ],
  95: [
    { title: "Komunikační kanál 'Pohlaví'", description: "Proberte s Velitelkou, zda chcete při příštím skenu znát Juniorovo ID (kluk/holka), nebo si to necháte jako překvapení pro finále.", category: 'briefing', points: 40 },
    { title: "Management spánkových poloh", description: "Doporuč Velitelce začít trénovat spánek na levém boku. Tato poloha optimalizuje průtok krve k Juniorovi a placentě.", category: 'logistika', points: 35 }
  ],
  96: [
    { title: "Revize autoparku", description: "Pokud máte třídveřové auto, zvaž, zda je praktické pro manipulaci s 'vajíčkem' (autosedačkou). Začni mapovat trh s rodinnými transportéry.", category: 'transport', points: 40 },
    { title: "Hmatová vazba", description: "Junior už reaguje na dotek přes břišní stěnu. Zkus jemně poklepávat na břicho a sleduj, zda Velitelka cítí 'bublinky' (první náznaky pohybů).", category: 'hardware', points: 35 }
  ],
  97: [
    { title: "Aktivace mimických svalů", description: "Junior už umí hýbat očima a začíná mu růst první jemné ochlupení (lanugo), které drží mázek na kůži. Zapiš do logu: 'Vizuální senzory a kůže v procesu ladění.'", category: 'junior_update', points: 35 },
    { title: "Světelný upgrade", description: "Nainstaluj do chodby senzorové noční osvětlení. Velitelka bude nyní častěji provádět noční patroly (návštěvy toalety) a potřebuje bezpečný koridor.", category: 'stavba', points: 35 }
  ],

  // Týden 15: Kalibrace senzorů a kostry (Dny 99–105)
  98: [
    { title: "Analýza krevního tlaku", description: "Sleduj, zda Velitelka nemá závratě při rychlém vstávání. Srdce Velitelky se zvětšilo a bije rychleji, aby utáhlo oba systémy.", category: 'strategie', points: 40 },
    { title: "Revize vápníkového protokolu", description: "Juniorovi začínají osifikovat (tvrdnout) kosti. Pokud Velitelka nepije mléko nebo nejí sýry, nasaďte doplňky. Junior si vápník vezme z jejích zásob za každou cenu.", category: 'medik', points: 40 }
  ],
  99: [
    { title: "Monitoring amniocentézy / NIPT", description: "Pokud výsledky z 1. trimestru nebyly 100%, vyhledej info o neinvazivním testování z krve. Klid na Základně je prioritou.", category: 'průzkum', points: 35 },
    { title: "Péče o dýchací cesty", description: "Pořiď mořskou vodu do nosu. 'Těhotenská rýma' (zduření sliznic) je teď běžný bug a ztěžuje Velitelce spánek.", category: 'servis', points: 35 }
  ],
  100: [
    { title: "Akvizice 'C-polštáře'", description: "Kup kojicí polštář ve tvaru písmene C nebo hokejky. Je to klíčový hardware pro stabilizaci polohy Velitelky při spánku na boku.", category: 'zásoby', points: 45 },
    { title: "Fond 'Přebalovací stanice'", description: "Zjisti ceny jednorázových vs. látkových plen. Rozhodněte se pro strategii (ekologie vs. rychlost) a vyčleňte kredity.", category: 'trezor', points: 35 }
  ],
  101: [
    { title: "Ergonomický audit pracoviště", description: "Pokud Velitelka pracuje u PC, zvedni jí monitor nebo pořiď bederní opěrku. Záda teď dostávají zabrat víc než kdy jindy.", category: 'údržba', points: 35 },
    { title: "Kontrola chemické expozice", description: "Pokud plánujete malování dětského sektoru, zajisti barvy s označením 'Zero VOC'. Výpary nesmí narušit Juniorův vývoj.", category: 'perimetr', points: 40 }
  ],
  102: [
    { title: "Porada o pohybech", description: "Junior už dělá salta, ale jsou tlumena plodovou vodou. Řekni Velitelce, ať se soustředí na pocity 'bublinek' v pod břiškem. První kontakt se blíží.", category: 'briefing', points: 40 },
    { title: "Management pitného režimu", description: "Zvyšte příjem tekutin na 2,5–3 litry. Plodová voda se kompletně obměňuje několikrát za den, systém potřebuje průtok.", category: 'logistika', points: 35 }
  ],
  103: [
    { title: "Revize parkovací strategie", description: "Začni parkovat na místech s větším prostorem po stranách. Velitelka brzy bude potřebovat větší úhel otevření dveří pro výsadek.", category: 'transport', points: 15 },
    { title: "Světelná stimulace", description: "Juniorova víčka jsou sice zavřená, ale oči už vnímají světlo. Zkus posvítit baterkou na břicho – Junior se může pokusit od světla odvrátit.", category: 'hardware', points: 35 }
  ],
  104: [
    { title: "Formování ušních boltců", description: "Junior už slyší tlukot srdce Velitelky a proudění krve. Tvůj hlas je pro něj teď hluboký dunivý zvuk. Zapiš do logu: 'Audio-přijímač online.'", category: 'junior_update', points: 45 },
    { title: "Montážní příprava", description: "Zkontroluj, zda máš v nářadí všechny bity (imbusy atd.). Příští měsíc začne masivní návoz nábytku a hardware nesmí selhat.", category: 'stavba', points: 40 }
  ],

  // Týden 16: Navázání spojení (Dny 106–112)
  105: [
    { title: "Plánování velkého skenu", description: "Potvrďte si termín morfologického ultrazvuku (v 20. týdnu). Je to nejdůležitější vizuální kontrola hardwaru v celém 2. trimestru.", category: 'strategie', points: 45 },
    { title: "Revize krevního oběhu", description: "Dohlédni, aby Velitelka dlouho nestála na jednom místě. Objem krve se zvýšil o 50 %, srdce pumpuje na maximum a hrozí otoky nohou.", category: 'medik', points: 40 }
  ],
  106: [
    { title: "Analýza ID (Pohlaví)", description: "Pokud chcete znát pohlaví, připrav se, že příští vizita by to mohla odhalit. Vyhledej originální způsoby, jak to oznámit rodině (pokud chcete).", category: 'průzkum', points: 35 },
    { title: "Péče o oční senzory", description: "Kup Velitelce zvlhčující kapky do očí. Hormony snižují produkci slz, což může způsobovat bug 'pálení očí', zejména u PC.", category: 'servis', points: 35 }
  ],
  107: [
    { title: "Obnova palivových článků", description: "Nakup potraviny bohaté na vitamín C. Ten je nezbytný pro tvorbu kolagenu, který teď Junior používá k posílení své kůže a cév.", category: 'zásoby', points: 35 },
    { title: "Fond 'Pohotovostní rezerva'", description: "Vyčleň stranou částku na neplánované výdaje (např. dřívější nákup léků nebo nadstandardní vyšetření).", category: 'trezor', points: 40 }
  ],
  108: [
    { title: "Technická správa šatníku", description: "Vyřaď ze skříně všechno oblečení, které Velitelku škrtí. Tlak na břišní stěnu může vyvolat nepříjemné kontrakce nebo pálení žáhy.", category: 'údržba', points: 40 },
    { title: "Čistka v kuchyni", description: "Vyhoď všechny potraviny s prošlou lhůtou. Imunitní systém Velitelky je v režimu 'Tolerance', což znamená, že je náchylnější k infekcím z jídla.", category: 'perimetr', points: 40 }
  ],
  109: [
    { title: "Komunikační uzel 'První pohyby'", description: "Vysvětli Velitelce, že to, co cítí jako 'bublinky' nebo 'střevní pohyby', je pravděpodobně Junior. Učte se rozpoznávat tyto signály.", category: 'briefing', points: 45 },
    { title: "Management spánku", description: "Pokud Velitelka chrápe (běžný bug kvůli zduřelým sliznicím), pořiď jí nosní náplasti pro lepší průchod vzduchu.", category: 'logistika', points: 35 }
  ],
  110: [
    { title: "Revize trasy do porodnice", description: "I když je čas, projeď si trasu do nejbližšího HQ (porodnice) v různou denní dobu. Musíš znát každou díru v silnici.", category: 'transport', points: 40 },
    { title: "Audio-vazba 3.0", description: "Junior už slyší tvůj hlas jasněji. Zkus mu číst nebo zpívat. Vytváříš mu v mozku 'bezpečnou zónu' spojenou s tvým hlasem.", category: 'hardware', points: 40 }
  ],
  111: [
    { title: "KONEC 4. MĚSÍCE", description: "Oslavte první kontakt. Pokud Velitelka cítí pohyby, je to velký úspěch mise. Udělejte si záznam do deníku: 'Junior dává o sobě vědět.'", category: 'velká_mise', points: 150 },
    { title: "Aktivace koordinace", description: "Junior už drží hlavu vzpřímeně a jeho nohy jsou plně pohyblivé. Zapiš do logu: 'Pohybový aparát připraven k intenzivnímu tréninku.'", category: 'junior_update', points: 50 }
  ],

  // --- MĚSÍC 5: OPERACE KOMUNIKACE ---
  // Týden 17: Izolace kabeláže (Dny 113–119)
  112: [
    { title: "Rozvrh morfologického skenu", description: "Pokud ještě nemáte pevný čas pro velký ultrazvuk ve 20. týdnu, dnes je deadline pro potvrzení. Je to klíčová prověrka všech orgánů a systémů.", category: 'strategie', points: 45 },
    { title: "Kontrola krevního tlaku", description: "Sleduj, zda se Velitelce netočí hlava. Její krevní oběh je nyní masivní a srdce musí pumpovat s vysokou efektivitou.", category: 'medik', points: 35 }
  ],
  113: [
    { title: "Analýza detektorů dechu", description: "Začni zkoumat trh s monitory dechu (deskové vs. na plenku). Tento hardware bude klíčový pro tvůj klidný spánek v první fázi po výsadku Juniora.", category: 'průzkum', points: 35 },
    { title: "Péče o dolní podvozek", description: "Kup Velitelce kompresní podkolenky, pokud plánujete delší cestu nebo stojí dlouho na nohou. Prevence křečových žil je prioritou.", category: 'servis', points: 35 }
  ],
  114: [
    { title: "Železitý dopink", description: "Nakup potraviny s vysokým obsahem železa (červená řepa, hovězí, špenát). Junior si teď buduje vlastní krevní zásobu a odčerpává suroviny Velitelce.", category: 'zásoby', points: 35 },
    { title: "Fond 'Dětský pokoj'", description: "Vyčleň kredity na barvy, nábytek a osvětlení. Příští týdny budou ve znamení fyzické stavby sektoru pro Juniora.", category: 'trezor', points: 40 }
  ],
  115: [
    { title: "Management vlhkosti", description: "Zkontroluj, zda se v koupelně nebo ložnici netvoří plíseň. Sliznice Velitelky jsou nyní velmi citlivé na kvalitu ovzduší na Základně.", category: 'údržba', points: 35 },
    { title: "Bezpečnostní audit osvětlení", description: "Přidej tlumená světla na trasu k toaletě. Velitelka teď provádí noční výsadky častěji, protože Junior začíná tlačit na močový měchýř.", category: 'perimetr', points: 40 }
  ],
  116: [
    { title: "Komunikační uzel 'Jméno'", description: "Zúži seznam jmen na TOP 3. Pokud už znáte pohlaví (nebo ho brzy zjistíte), začněte Juniora oslovovat pracovním jménem pro posílení vazby.", category: 'briefing', points: 40 },
    { title: "Plánování pohybu", description: "Zapiš Velitelku na těhotenské plavání nebo jógu. Udržování flexibility hardwaru Velitelky usnadní finální fázi mise (porod).", category: 'logistika', points: 35 }
  ],
  117: [
    { title: "Kontrola čistoty filtrů", description: "Nechej vyčistit klimatizaci v autě ozonem. Jakýkoliv biologický šum (bakterie) v transportním modulu je pro posádku rizikový.", category: 'transport', points: 35 },
    { title: "Odezva na dotek", description: "Junior už má vyvinutý hmat. Pokud přiložíš ruku na břicho a lehce zatlačíš, Junior se může pokusit do tvé dlaně 'ťuknout'.", category: 'hardware', points: 35 }
  ],
  118: [
    { title: "Izolace nervů", description: "Kolem nervových vláken se tvoří myelin (izolace). Junior už má vlastní otisky prstů a trénuje úchop. Zapiš do logu: 'Kabeláž izolována, přenos dat stabilní.'", category: 'junior_update', points: 45 },
    { title: "Vyklízecí operace", description: "Definitivně vykliď prostor určený pro Juniorovu základnu (dětský pokoj/koutek). Odstraň starý hardware a nepotřebný materiál.", category: 'stavba', points: 40 }
  ],

  // Týden 18: Aktivace senzorů (Dny 120–126)
  119: [
    { title: "Logistika screeningového výsadku", description: "Pokud je velký ultrazvuk (morfologie) tento nebo příští týden, připravte si seznam otázek. Zaměřte se na stav placenty a průtoky krve.", category: 'strategie', points: 40 },
    { title: "Revize krevního tlaku", description: "Sleduj, zda Velitelka netrpí na nízký tlak (závratě při vstávání). Srdce nyní pracuje o 40 % intenzivněji než na startu mise.", category: 'medik', points: 35 }
  ],
  120: [
    { title: "Analýza kočárkových modulů", description: "Pokud máte vybraný model, prověř jeho skladnost do kufru vašeho transportního modulu (auta). Hardware musí být kompatibilní s logistikou.", category: 'průzkum', points: 35 },
    { title: "Péče o unavené svaly", description: "Junior roste a mění těžiště Velitelky. Aplikuj masáž v oblasti kříže a lopatek. Použij přírodní oleje bez agresivních parfémů.", category: 'servis', points: 40 }
  ],
  121: [
    { title: "Doplnění paliva pro mozek", description: "Nakup potraviny bohaté na Omega-3 (ryby, vlašské ořechy). Junior právě teď masivně buduje mozkovou kůru a vyžaduje tuky pro stavbu neuronů.", category: 'zásoby', points: 35 },
    { title: "Fond 'Lékařský nadstandard'", description: "Pokud plánujete 3D/4D ultrazvuk pro lepší vizualizaci Juniora, vyčleňte na to kredity. Je to skvělý boost pro morálku týmu.", category: 'trezor', points: 40 }
  ],
  122: [
    { title: "Technická kontrola osvětlení", description: "Prověř, zda jsou všechny cesty k toaletě a kuchyni bezpečné i za tmy. Velitelka začíná mít v noci horší stabilitu kvůli uvolňování kloubů (relaxin).", category: 'údržba', points: 35 },
    { title: "Eliminace toxického šumu", description: "Zkontroluj, zda sousedé neplánují hlučnou rekonstrukci nebo malování. Junior už vnímá silné zvukové otřesy zvenčí.", category: 'perimetr', points: 40 }
  ],
  123: [
    { title: "Komunikační uzel 'Juniorovo ID'", description: "Pokud už znáte pohlaví, můžete začít s vizuální přípravou sektoru (barvy, doplňky). Pokud ne, držte se neutrálního 'unisex' schématu.", category: 'briefing', points: 40 },
    { title: "Management spánku", description: "Pořiď Velitelce druhý polštář pod nohy. Zvýšená poloha dolních končetin během standby režimu (spánku) brání vzniku otoků.", category: 'logistika', points: 35 }
  ],
  124: [
    { title: "Bezpečnostní audit pásů", description: "Zkontroluj, zda těhotenský pás v autě stále správně odvádí tlak z podbřišku. Junior se posouvá výš a ochrana nesmí selhat.", category: 'transport', points: 35 },
    { title: "Audio-vazba", description: "Začni Juniorovi pouštět specifickou melodii nebo mu pravidelně čti. Jeho uši jsou již plně vyvinuté a začíná si tvořit paměťovou stopu na tvůj hlas.", category: 'hardware', points: 35 }
  ],
  125: [
    { title: "Formování mázku", description: "Juniorova kůže se pokrývá ochrannou vrstvou (vernix caseosa). Je to 'antikorozní ochrana' proti dlouhodobému pobytu v plodové vodě.", category: 'junior_update', points: 45 },
    { title: "Montážní plán", description: "Sestav seznam nářadí, které budeš potřebovat pro stavbu Juniorova modulu (postýlky). Zkontroluj, zda máš všechny klíče a šroubováky v pohotovosti.", category: 'stavba', points: 35 }
  ],

  // Týden 19: Mapování smyslových center (Dny 127–133)
  126: [
    { title: "Analýza pohybových logů", description: "Sledujte, kdy je Junior nejaktivnější. Většinou zahajuje manévry, když je Velitelka v klidu (standby režim). Zapište si tyto časy do operačního deníku.", category: 'strategie', points: 40 },
    { title: "Monitoring krevního obrazu", description: "Junior nasává suroviny pro tvorbu červených krvinek. Pokud je Velitelka bledá nebo extrémně unavená, zvyšte dávky přírodního železa.", category: 'medik', points: 35 }
  ],
  127: [
    { title: "Studium kojicích modulů", description: "I když je primární palivo Juniora jasné, začni zkoumat odsávačky a sterilizátory. Tento externí hardware bude klíčový pro logistiku krmení.", category: 'průzkum', points: 35 },
    { title: "Gastro-diverze", description: "Junior už má vyvinuté chuťové pohárky. Plodová voda chutná podle toho, co jí Velitelka. Experimentujte s chutěmi a sledujte Juniorovu odezvu.", category: 'servis', points: 35 }
  ],
  128: [
    { title: "Akvizice 'Comfort-ware'", description: "Pořiď Velitelce podpůrný těhotenský pás na břicho. Pomáhá rozložit váhu Juniora a ulevuje bedernímu sektoru při delších přesunech.", category: 'zásoby', points: 40 },
    { title: "Fond 'Transportní doplňky'", description: "Vyčleň kredity na doplňky ke kočárku (pláštěnka, síťka proti hmyzu, taška). Tyto položky často nejsou součástí základního balení.", category: 'trezor', points: 35 }
  ],
  129: [
    { title: "Revize spací zóny", description: "Junior už slyší vnější zvuky. Pokud máte v ložnici hlučné hodiny nebo spotřebiče, odstraňte je. Potřebujeme tiché prostředí pro nerušený vývoj.", category: 'údržba', points: 35 },
    { title: "Kontrola chemické neutrality", description: "Při nákupu výbavičky (oblečení) dbej na to, aby byla z bio-bavlny a praná v netoxických prostředcích. Juniorova kůže bude po výsadku velmi citlivá.", category: 'perimetr', points: 40 }
  ],
  130: [
    { title: "Komunikační uzel 'Otcův hlas'", description: "Mluv přímo k břichu. Zvuk se v plodové vodě šíří skvěle a Junior si mapuje tvou frekvenci jako 'bezpečný doprovod'.", category: 'briefing', points: 40 },
    { title: "Management otoků", description: "Pokud Velitelce otékají kotníky, zaveďte režim 'nohy nad úroveň srdce' alespoň na 30 minut denně. Gravitace je teď nepřítel cirkulace.", category: 'logistika', points: 35 }
  ],
  131: [
    { title: "Optimalizace výstupu", description: "Nauč Velitelku techniku 'vystupování z auta snožmo' (otáčení celého těla najednou). Chrání to pánevní vazy, které jsou teď vlivem hormonů velmi volné.", category: 'transport', points: 35 },
    { title: "Vizuální test", description: "Juniorova sítnice už vnímá světlo. Pokud posvítíš na břicho silnějším zdrojem, Junior se může otočit nebo zvýšit aktivitu.", category: 'hardware', points: 15 }
  ],
  132: [
    { title: "Vývoj trvalých zubů", description: "Pod mléčnými zuby se v dásních už zakládají ty trvalé. Junior je velký jako velké mango. Zapiš do logu: 'Hardware připraven na dekády dopředu.'", category: 'junior_update', points: 45 },
    { title: "První nátěr", description: "Pokud už máte barvy do Juniorova sektoru, zahaj malířské práce. Velitelka se nesmí účastnit (kvůli výparům), ty jsi hlavní stavební četa.", category: 'stavba', points: 45 }
  ],

  // Týden 20: Velký poločas a morfologický audit (Dny 134–140)
  133: [
    { title: "HLAVNÍ MORFOLOGICKÝ SKEN", description: "Dnes je den D pro detailní revizi hardwaru. Lékař zkontroluje srdce (4 komory), mozek, ledviny a páteř. Je to nejdelší a nejdůležitější vizuální kontrola.", category: 'strategie', points: 50 },
    { title: "Potvrzení ID", description: "Pokud Junior spolupracuje a nezakrývá si senzory, dnes získáte 100% potvrzení o jeho pohlaví. Zapiš do logu: 'Identita potvrzena.'", category: 'junior_update', points: 40 }
  ],
  134: [
    { title: "Analýza růstové křivky", description: "Porovnejte data ze skenu s průměrnými tabulkami. Junior by měl vážit kolem 300 gramů a měřit cca 25 cm (měřeno od hlavy k patám).", category: 'průzkum', points: 40 },
    { title: "Gastro-oslava", description: "Po úspěšném skenu vezmi Velitelku na kvalitní večeři. Vyhněte se syrovým rybám a nepasterizovaným sýrům, ale dopřejte si prémiové palivo.", category: 'servis', points: 45 }
  ],
  135: [
    { title: "Akvizice 'První výbavičky'", description: "Na základě potvrzeného ID kupte první sadu oblečení (body, čepička). Volte velikost 56 nebo 62. Junior začne brzy tyto moduly plnit.", category: 'zásoby', points: 40 },
    { title: "Fond 'Velký nákup'", description: "Po úspěšném morfologickém auditu je bezpečné uvolnit kredity na nákup hlavního transportního modulu (kočárku) a autosedačky.", category: 'trezor', points: 45 }
  ],
  136: [
    { title: "Technická revize pleti", description: "Velitelka může mít na břiše 'Linea nigra' (tmavá čára). Je to jen pigmentový bug související s expanzí systému, po misi zmizí. Pokračuj v promazávání.", category: 'údržba', points: 35 },
    { title: "Optimalizace úložných prostor", description: "Namontuj v Juniorově sektoru první police. Potřebujeme systém, do kterého budeme třídit přicházející zásoby (plenky, kosmetiku).", category: 'perimetr', points: 40 }
  ],
  137: [
    { title: "Komunikační uzel 'Pohyby'", description: "Junior má teď období největší aktivity, protože má v děloze ještě dost místa na salta. Sledujte, jak reaguje na tvůj dotek – je to začátek interakce.", category: 'briefing', points: 45 },
    { title: "Management dýchání", description: "Velitelka může začít pociťovat zadýchávání při chůzi do schodů. Junior tlačí na bránici. Převezmi veškeré logistické úkoly vyžadující námahu.", category: 'logistika', points: 40 }
  ],
  138: [
    { title: "Instalace ISOFIX základny", description: "Pokud už máte autosedačku, nacvič si její instalaci do auta. V den výsadku (porodu) nesmíš nad manuálem váhat ani sekundu.", category: 'transport', points: 40 },
    { title: "Světelná a zvuková show", description: "Junior už aktivně reaguje na silné světlo i hlasité zvuky. Zkus kombinovat mluvení s jemným hlazením břicha.", category: 'hardware', points: 35 }
  ],
  139: [
    { title: "OSLAVA POLOČASU", description: "Máte za sebou 20 týdnů. Udělejte si fotku břicha v profilu. Junior je velký jako banán. Zapiš do logu: 'Poločas mise dosažen, všechny systémy nominální.'", category: 'velká_mise', points: 150 },
    { title: "Montáž postýlky", description: "Pokud je hardware na Základně, začni se sestavováním. Je důležité, aby se prostor vyvětral od pachů nového nábytku dlouho před příchodem Juniora.", category: 'stavba', points: 40 }
  ],

  // --- MĚSÍC 6: OPERACE STABILIZACE ---
  // Týden 21: Trénink svalové hmoty (Dny 141–147)
  140: [
    { title: "Analýza interakce", description: "Junior nyní začíná reagovat na dotek velmi cíleně. Pokud Velitelka cítí tlak na jedné straně, zkus tam přiložit ruku. Junior se může přisunout nebo naopak 'odkopnout'.", category: 'strategie', points: 45 },
    { title: "Kontrola žilního systému", description: "Sleduj výskyt křečí v lýtkách (zejména v noci). Je to bug spojený s nedostatkem hořčíku nebo tlaku Juniora na dolní dutou žílu.", category: 'medik', points: 35 }
  ],
  141: [
    { title: "Monitoring spánkových cyklů", description: "Junior si začíná vytvářet vlastní režim. Většinou spí, když se Velitelka hýbe, a ožívá, když jde do standby režimu. Zaznamenej si jeho 'aktivní hodiny'.", category: 'průzkum', points: 35 },
    { title: "Gastro-optimalizace", description: "Junior už aktivně polyká plodovou vodu a jeho trávicí trakt trénuje. Vyhněte se příliš pálivým jídlům, pokud na ně systém Velitelky reaguje pálením žáhy.", category: 'servis', points: 35 }
  ],
  142: [
    { title: "Akvizice 'Juniorovy lékárničky'", description: "Kup první základní potřeby: teploměr s ohebnou špičkou, nůžky na nehty s kulatou špičkou a odsávačku hlenů. Hardware musí být připraven v předstihu.", category: 'zásoby', points: 40 },
    { title: "Audit pojistných smluv", description: "Zkontroluj, zda máte jako rodina nastaveny správné parametry životního a úrazového pojištění. Juniorova bezpečnost vyžaduje finanční krytí.", category: 'trezor', points: 35 }
  ],
  143: [
    { title: "Management klimatu", description: "Sleduj teplotu na Základně. Velitelka se nyní může přehřívat rychleji (metabolismus jede na 120 %). Pořiď ventilátor nebo zajisti efektivní větrání.", category: 'údržba', points: 35 },
    { title: "Odstranění kluzných rizik", description: "Pokud máte v koupelně předložky, které kloužou, okamžitě je vyměň za pogumované. Stabilita Velitelky je se zvětšujícím se břichem prioritou.", category: 'perimetr', points: 40 }
  ],
  144: [
    { title: "Komunikační uzel 'Předporodní kurz'", description: "Pokud jste se minule rozhodli pro kurz, dnes je čas na první lekci. Nauč se, jak ulevit Velitelce od bolesti a jakou roli hraješ ty jako hlavní podpora.", category: 'briefing', points: 45 },
    { title: "Management energie", description: "Velitelka může začít pociťovat tlak na plíce. Junior roste směrem nahoru. Plánuj aktivity tak, aby obsahovaly časté pauzy na vydýchání.", category: 'logistika', points: 35 }
  ],
  145: [
    { title: "Testovací jízda s nákladem", description: "Pokud už máte kočárek, vyzkoušej si jeho skládání a nakládání do auta 'na čas'. Musíš to zvládnout i v dešti nebo ve stresu.", category: 'transport', points: 40 },
    { title: "Audio-vazba 4.0", description: "Junior už dokáže rozlišit tvůj hlas od zvuků okolí. Zkus mu vyprávět o tom, co se děje na Základně. Vytváříš mu mapu vnějšího světa.", category: 'hardware', points: 35 }
  ],
  146: [
    { title: "Formování obočí a řas", description: "Juniorovi už rostou řasy a obočí. Jeho kůže je stále svraštělá, protože zatím nemá dostatek podkožního tuku. Zapiš do logu: 'Vizuální detaily obličeje dokončeny.'", category: 'junior_update', points: 45 },
    { title: "Organizace šatníku", description: "Začni třídit oblečení pro Juniora podle velikostí (50, 56, 62). Použij štítky, aby ses v den výsadku v té hromadě textilu orientoval.", category: 'stavba', points: 40 }
  ],

  // Týden 22: Hormonální start-up (Dny 148–154)
  147: [
    { title: "Monitoring pohybů 2.0", description: "Junior má nyní dost síly na to, aby jeho kopy byly viditelné i přes tričko. Zkus vystihnout moment aktivity a natoč si krátký video-log. Je to skvělý důkaz o postupu mise.", category: 'strategie', points: 45 },
    { title: "Kontrola hladiny cukru", description: "Velitelka může pociťovat náhlé chutě na sladké. Sleduj to, protože v příštích týdnech nás čeká klíčový test na těhotenskou cukrovku (OGTT).", category: 'medik', points: 35 }
  ],
  148: [
    { title: "Analýza autosedaček (Vajíčko)", description: "Pokud ještě nemáte, prověř crash-testy (ADAC) pro vybraný model. Bezpečnost Juniora při transportu z HQ na Základnu je nekritičtější částí logistiky.", category: 'průzkum', points: 35 },
    { title: "Péče o dýchací kapacitu", description: "Junior tlačí na bránici Velitelky. Pokud se jí špatně dýchá vleže, pořiď další polštáře, aby mohla spát v polosedě. Tím uvolníš prostor pro plíce.", category: 'servis', points: 35 }
  ],
  149: [
    { title: "Akvizice 'Prvních plen'", description: "Kup jedno testovací balení plen velikosti 1 (Newborn). Potřebujeme otestovat jejich skladnost v přebalovacím sektoru.", category: 'zásoby', points: 40 },
    { title: "Fond 'Poporodní servis'", description: "Začni plánovat rozpočet na donášku jídla nebo pomoc v domácnosti pro první dva týdny po výsadku. Tvůj čas bude plně vytížen Juniorem.", category: 'trezor', points: 40 }
  ],
  150: [
    { title: "Technická revize podlah", description: "Pokud máte doma prahy nebo volné kabely, je čas na jejich odstranění. Velitelka má nyní omezený výhled pod nohy (přes břicho) a riziko zakopnutí roste.", category: 'údržba', points: 35 },
    { title: "Čistka v lékárničce", description: "Vyhoď všechny prošlé léky. Doplň zásoby dezinfekce a náplastí. Základna musí splňovat nejvyšší hygienické standardy.", category: 'perimetr', points: 40 }
  ],
  151: [
    { title: "Komunikační uzel 'Rodinné tradice'", description: "Proberte s Velitelkou, jaké rituály chcete s Juniorem zavést (večerní koupání, čtení). Shoda v týmu předem eliminuje budoucí konflikty.", category: 'briefing', points: 40 },
    { title: "Management otoků rukou", description: "Sleduj, zda Velitelku nezačínají škrtit prstýnky. Pokud ano, doporuč jejich včasné sejmutí, než dojde k zablokování cirkulace (bug zvaný karpální tunel).", category: 'logistika', points: 35 }
  ],
  152: [
    { title: "Instalace zrcátka pro monitoring", description: "Pořiď do auta zpětné zrcátko pro sledování Juniora v autosedačce (proti směru jízdy). Musíš mít vizuální kontakt s Juniorem i během řízení. ", category: 'transport', points: 35 },
    { title: "Smyslová stimulace", description: "Junior už má vyvinutou chuť. Pokud Velitelka sní něco výrazného (např. česnek), Junior na to v plodové vodě zareaguje. Sledujte jeho odezvu.", category: 'hardware', points: 35 }
  ],
  153: [
    { title: "Vývoj očních víček", description: "Junior už má obočí a řasy, ale jeho oči jsou stále zavřené. Přesto už vnímá světlo a tmu velmi intenzivně. Zapiš do logu: 'Senzory světla kalibrovány.'", category: 'junior_update', points: 45 },
    { title: "Montáž přebalovacího pultu", description: "Pokud je hardware na místě, sestav ho. Otestuj jeho výšku – musí být ergonomická pro tebe i Velitelku, abyste si nepoškodili páteř.", category: 'stavba', points: 40 }
  ],

  // Týden 23: Příprava ventilace (Dny 155–161)
  154: [
    { title: "Monitoring vibrační odezvy", description: "Junior už dokáže vnímat vibrace tvého hlasu i okolí. Pokud zapneš vysavač nebo mixér, může zareagovat prudkým kopnutím. Sleduj, které frekvence ho aktivují.", category: 'strategie', points: 40 },
    { title: "Revize krevního oběhu", description: "Velitelka může mít pocit 'těžkých nohou'. Objem krve je na maximu. Doporučuj časté sprchování nohou střídavě teplou a studenou vodou (tzv. Knejpování).", category: 'medik', points: 35 }
  ],
  155: [
    { title: "Analýza porodu a úlevy od bolesti", description: "Začni zjišťovat informace o metodách, jako je epidurální analgezie nebo aromaterapie. Musíš znát arzenál prostředků, které bude mít Velitelka k dispozici.", category: 'průzkum', points: 40 },
    { title: "Gastro-podpora (Pálení žáhy)", description: "Junior tlačí na žaludek. Pořiď do zásob mandle nebo neperlivou minerálku s vysokým obsahem hydrogenuhličitanu. Jsou to účinné neutralizátory 'žaludečních bugů'.", category: 'servis', points: 35 }
  ],
  156: [
    { title: "Akvizice 'Prvního textilu'", description: "Kup Juniorovi ponožky a rukavičky 'proti poškrábání'. I když jsou to malé moduly, v systému jsou nezbytné pro udržení tepelné stability po výsadku.", category: 'zásoby', points: 40 },
    { title: "Fond 'Dovolená po výsadku'", description: "Pokud plánuješ po narození Juniora volno (otcovská dovolená), prověř u zaměstnavatele administrativní procesy, aby v den D nevznikl error v papírech.", category: 'trezor', points: 35 }
  ],
  157: [
    { title: "Technická kontrola postýlky", description: "Zkontroluj stabilitu roštu a upevnění šroubů. Junior začne brzy s aktivním testováním nosnosti svého primárního standby modulu.", category: 'údržba', points: 35 },
    { title: "Čistka v ložnici", description: "Odstraň lapače prachu (staré plyšáky, hromady knih). Velitelka potřebuje v noci maximálně čistý vzduch pro optimální okysličení sebe i Juniora.", category: 'perimetr', points: 35 }
  ],
  158: [
    { title: "Komunikační uzel 'Plán porodu'", description: "Sedněte si s Velitelkou a začněte sepisovat její preference pro den výsadku. Kdo tam bude? Jaké světlo? Jaká hudba? Ty jsi strážce tohoto plánu.", category: 'briefing', points: 45 },
    { title: "Management mobility", description: "Velitelka může mít problém se vstáváním z hlubokých křesel. Buď připraven poskytnout fyzickou podporu (vytáhnout ji do vertikální polohy).", category: 'logistika', points: 35 }
  ],
  159: [
    { title: "Kontrola technického stavu", description: "Prověř stav brzd a pneumatik na vašem vozidle. Bezpečnost transportního modulu je teď prioritou č. 1 pro celou posádku.", category: 'transport', points: 40 },
    { title: "Audio-stimulace 5.0", description: "Junior už dokáže rozlišit hudbu od řeči. Zkus mu pustit nějakou klidnou melodii, kterou mu budeš pouštět i po narození – vytvoříš tím 'uklidňující kotvu'.", category: 'hardware', points: 35 }
  ],
  160: [
    { title: "Barvení kůže", description: "Juniorova kůže začíná dostávat narůžovělý odstín díky vývoji krevních kapilár pod povrchem. Zapiš do logu: 'Povrchová úprava hardwaru v procesu.'", category: 'junior_update', points: 45 },
    { title: "Instalace monitorovací techniky", description: "Pokud už máte chůvičku, vyzkoušej její dosah přes zdi Základny. Musíš mít jistotu, že signál je stabilní v každém sektoru.", category: 'stavba', points: 40 }
  ],

  // Týden 24: Hranice životaschopnosti (Dny 162–168)
  161: [
    { title: "Glukózový test (OGTT)", description: "Naplánuj nebo připrav Velitelku na test těhotenské cukrovky. Je to 'sladký drink', který prověří, jak hardware zpracovává cukry. Důležitý check pro prevenci nadměrného růstu Juniora.", category: 'strategie', points: 45 },
    { title: "Revize stability kloubů", description: "Hormon relaxin uvolňuje vazy v pánvi. Velitelka může pociťovat 'kachní chůzi' nebo bolesti stydké kosti. Naordinuj klidový režim a žádné prudké pohyby.", category: 'medik', points: 40 }
  ],
  162: [
    { title: "Analýza kůže (Strie)", description: "Junior se teď bude zvětšovat velmi rychle. Zkontroluj zásoby olejů. Promazávání musí být teď intenzivní (ráno i večer), aby kůže nepopraskala pod tlakem expanze.", category: 'průzkum', points: 35 },
    { title: "Gastro-monitoring (Pálení žáhy)", description: "Pokud bug 'žáha' přetrvává, zkus Velitelce připravit menší porce jídla 6x denně namísto 3 velkých. Menší nálož systém lépe odfiltruje.", category: 'servis', points: 35 }
  ],
  163: [
    { title: "Akvizice 'Digitálního arzenálu'", description: "Pořiď bezkontaktní teploměr. Budete ho potřebovat pro okamžitý screening Juniorovy teploty bez nutnosti narušovat jeho standby režim (spánek).", category: 'zásoby', points: 40 },
    { title: "Finanční rezerva na 'První měsíc'", description: "Po výsadku nebudete mít čas na bankovní operace. Zajisti, aby byl k dispozici dostatek hotovosti/kreditů na rychlé nákupy léků a potravin.", category: 'trezor', points: 40 }
  ],
  164: [
    { title: "Technická správa ložnice", description: "Velitelka se v noci přehřívá. Vyměň ložní prádlo za 100% bavlnu nebo len. Syntetické materiály způsobují systémové přehřátí a narušují regeneraci.", category: 'údržba', points: 35 },
    { title: "Odstranění aromatických šumů", description: "Juniorovy čichové senzory se ladí. Silné parfémy nebo čisticí prostředky mohou Velitelce (i Juniorovi) způsobovat nevolnost. Přejdi na 'Fragrance-free' režim.", category: 'perimetr', points: 35 }
  ],
  165: [
    { title: "Komunikační uzel 'Výběr porodnice'", description: "Pokud jich máte v perimetru více, dnes je den pro finální rozhodnutí. Zkontroluj dostupnost novorozenecké JIP (pro jistotu) a parkování pro operativce.", category: 'briefing', points: 45 },
    { title: "Management otoků", description: "Pokud Velitelce otékají i ruce, pořiď jí chladivé gely. Sleduj, zda otoky nemizí ani po ránu – pokud ne, je to signál pro lékařskou konzultaci.", category: 'logistika', points: 40 }
  ],
  166: [
    { title: "Logistika výsadku", description: "Prověř, kde přesně je 'Příjem rodiček'. Nechceš v den D s kontrakcemi bloudit po areálu nemocnice a hledat správný vchod.", category: 'transport', points: 40 },
    { title: "Reakce na světlo 2.0", description: "Junior už má oční víčka, která se začínají pomalu oddělovat. Pokud jdete na slunce, Junior vnímá červenou záři přes břišní stěnu.", category: 'hardware', points: 35 }
  ],
  167: [
    { title: "Produkce bílých krvinek", description: "Junior si začíná budovat vlastní imunitní systém. Zapiš do logu: 'Firewall online. Junior se začíná bránit vnějším hrozbám.'", category: 'junior_update', points: 35 },
    { title: "Finální revize pokoje", description: "Máte postýlku i přebalovací pult. Dnes se zaměř na osvětlení – pořiď lampu s červeným nebo teplým oranžovým světlem pro noční krmení.", category: 'stavba', points: 40 }
  ],

  // --- MĚSÍC 7: PŘÍPRAVA NA VÝSADEK ---
  // Týden 25: Otevírání vizuálních senzorů (Dny 169–175)
  168: [
    { title: "Start 3. trimestru", description: "Gratuluji, Operativče! Dosáhli jste finální rovinky. Odteď budeme sledovat hlavně Juniorovu váhu a polohu. Junior už měří kolem 34 cm.", category: 'strategie', points: 35 },
    { title: "Revize železa a vápníku", description: "Juniorova kostra masivně tvrdne. Dohlédni, aby Velitelka doplňovala suroviny, jinak systém začne odčerpávat vápník z jejích zubů a kostí.", category: 'medik', points: 35 }
  ],
  169: [
    { title: "Analýza autosedačky (Instalace)", description: "Pokud už máte 'vajíčko', dnes ho nainstaluj do auta (bez Juniora). Musíš vědět, jak funguje pás nebo ISOFIX základna, abys při ostrém výjezdu z porodnice nezmatkoval.", category: 'průzkum', points: 40 },
    { title: "Péče o unavené bedra", description: "Juniorova váha táhne břicho dopředu. Pořiď Velitelce nahřívací polštářek (pohankový nebo třešňový), který uleví svalovému napětí v kříži. ", category: 'servis', points: 35 }
  ],
  170: [
    { title: "Akvizice 'Prvních bodýček'", description: "Nakup sadu oblečení velikosti 56 a 62. Volte materiály jako biobavlna nebo bambus. Juniorova kůže bude po výsadku velmi citlivá na syntetický šum.", category: 'zásoby', points: 40 },
    { title: "Audit mateřské/rodičovské podpory", description: "Prověř, zda jsou všechny dokumenty pro úřady připraveny. Administrativa nesmí v závěru mise zdržovat logistiku.", category: 'trezor', points: 45 }
  ],
  171: [
    { title: "Management spánku", description: "Velitelka už pravděpodobně nemůže najít pohodlnou polohu. Pomoz jí vystlat postel polštáři tak, aby byla v polosedě a na levém boku. Zlepší to průtok krve k Juniorovi.", category: 'údržba', points: 35 },
    { title: "Odstranění bariér", description: "Zkontroluj, zda v bytě nejsou volné koberce nebo kabely. Velitelka si už nevidí pod nohy a riziko pádu je kritické.", category: 'perimetr', points: 40 }
  ],
  172: [
    { title: "Komunikační uzel 'Porodní asistentka/Dula'", description: "Pokud uvažujete o doprovodu k porodu, dnes je nejvyšší čas na finální schůzku. Musíte si sednout lidsky i takticky.", category: 'briefing', points: 45 },
    { title: "Příprava na 'Poslíčky'", description: "Velitelka může cítit tvrdnutí břicha (Braxton-Hicks). Nauč se je rozeznat od ostrých kontrakcí. Pokud po sprše nebo klidu zmizí, jde o cvičný poplach.", category: 'logistika', points: 40 }
  ],
  173: [
    { title: "Plánování trasy 2.0", description: "Najdi alternativní trasu do porodnice pro případ dopravní zácpy. Musíš znát terén jako své boty.", category: 'transport', points: 35 },
    { title: "Audio-vizuální test", description: "Junior už otevírá oči a reaguje na světlo. Zkus posvítit baterkou na břicho a mluvit u toho. Junior by se měl pohnout směrem ke zdroji nebo od něj.", category: 'hardware', points: 35 }
  ],
  174: [
    { title: "Formování kapilár", description: "Pod kůží se dotváří síť vlásečnic, které dodávají Juniorovi tu správnou barvu. Zapiš do logu: 'Termoregulace a krevní rozvod připraven k testování.'", category: 'junior_update', points: 45 },
    { title: "Revize dětského koutku", description: "Zkontroluj, zda je v dosahu přebalovacího pultu vše potřebné (plenky, ubrousky, čisté oblečení). Operativa musí být plynulá.", category: 'stavba', points: 40 }
  ],

  // Týden 26: Sny a reflexy (Dny 176–182)
  175: [
    { title: "Monitoring spánkových cyklů", description: "Sleduj, kdy Junior odpočívá. Pokud se mu zdají sny, jeho pohyby mohou být trhavé a nepravidelné. Respektuj jeho standby režim a nebuď ho zbytečně.", category: 'strategie', points: 40 },
    { title: "Prevence bugu 'Pálení žáhy'", description: "Junior vytlačuje žaludek Velitelky stále výš. Pořiď do zásob mandle nebo neperlivou minerálku s hořčíkem, které pomáhají neutralizovat kyseliny.", category: 'medik', points: 35 }
  ],
  176: [
    { title: "Analýza kůže (Strie)", description: "Napětí na břišní stěně je na maximu. Pokud Velitelka pociťuje svědění, zintenzivni mazání. Kůže se teď natahuje o milimetry každý den.", category: 'průzkum', points: 35 },
    { title: "Gastro-podpora", description: "Připravuj menší porce jídla, ale častěji. Velký náklad paliva naráz systém Velitelky už nezvládne efektivně zpracovat.", category: 'servis', points: 35 }
  ],
  177: [
    { title: "Akvizice 'Plenkového arzenálu'", description: "Kup první dvě balení plen velikosti 1. Neber jich moc, Junior z nich vyroste během prvních 14 dnů po výsadku.", category: 'zásoby', points: 40 },
    { title: "Fond 'Poporodní regenerace'", description: "Vyčleň kredity na kvalitní kosmetiku pro Velitelku po porodu a doplňky stravy na podporu laktace.", category: 'trezor', points: 40 }
  ],
  178: [
    { title: "Technická kontrola postýlky", description: "Zkontroluj, zda jsou šrouby pevně dotažené. Juniorova aktivita v břiše napovídá, že po výsadku bude v postýlce provádět náročné manévry.", category: 'údržba', points: 35 },
    { title: "Odstranění aromatických šumů", description: "Juniorovy čichové senzory jsou už velmi citlivé. Omez v bytě silné parfémy a agresivní čističe. Přejdi na 'EKO/BIO' chemii.", category: 'perimetr', points: 40 }
  ],
  179: [
    { title: "Komunikační uzel 'První pomoc'", description: "Nastuduj si základy první pomoci pro novorozence (zejména resuscitaci a pomoc při dušení). Jako operativní podpora musíš znát nouzové protokoly.", category: 'briefing', points: 35 },
    { title: "Management mobility", description: "Velitelka může mít problém se zavazováním bot. Převezmi tuto mechanickou úlohu nebo pořiď boty typu 'slip-on'.", category: 'logistika', points: 35 }
  ],
  180: [
    { title: "Revize lékárničky v autě", description: "Zkontroluj expiraci a doplň obsah. Při transportu z HQ na Základnu musí být sanitární modul v perfektním stavu.", category: 'transport', points: 35 },
    { title: "Audio-stimulace 6.0", description: "Junior už dokáže rozlišit tvůj hlas od hlasu Velitelky. Zkus s ním vést krátké monology o tom, jaký bude jeho první den na Základně.", category: 'hardware', points: 35 }
  ],
  181: [
    { title: "Otevírání očí", description: "Junior už pravidelně otevírá a zavírá oči. Má už i řasy! Zapiš do logu: 'Vizuální senzory v provozu, Junior sleduje změny světla skrz břišní stěnu.'", category: 'junior_update', points: 45 },
    { title: "Instalace chůvičky", description: "Pokud už máte elektronickou chůvičku, dnes ji nainstaluj a otestuj dosah signálu po celé Základně.", category: 'stavba', points: 40 }
  ],

  // Týden 27: Expanze mozku a kalibrace dechu (Dny 183–189)
  182: [
    { title: "Monitoring mozkové aktivity", description: "Juniorův mozek se začíná vlnit (tvoří se závity). To znamená vyšší výpočetní výkon. Sleduj, zda Junior reaguje na komplexnější podněty (střídání hudby a tvého hlasu).", category: 'strategie', points: 45 },
    { title: "Revize hladiny cukru", description: "Pokud Velitelka absolvovala test na cukrovku (OGTT), prověřte výsledky. Správná hladina paliva je klíčová pro optimální růst Juniorova hardwaru.", category: 'medik', points: 35 }
  ],
  183: [
    { title: "Analýza porodu a poloh", description: "Junior se pomalu začíná stáčet hlavou dolů (fáze rotace). Pokud je stále v poloze 'koncem pánevním', nepanikař – má ještě dostatek palubního prostoru na manévrování.", category: 'průzkum', points: 40 },
    { title: "Péče o dýchací cesty 2.0", description: "Junior tlačí na bránici. Pokud Velitelka pociťuje dušnost, naučte se společně úlevové pozice (např. kočičí hřbet), které Juniorovi dovolí na chvíli 'odplout' od plic.", category: 'servis', points: 35 }
  ],
  184: [
    { title: "Akvizice 'První kosmetiky'", description: "Kup dětský olej (nejlépe čistý mandlový) a krém na opruzeniny (zinek/rybilka). Tyto suroviny budou tvořit základní sanitární balíček po výsadku.", category: 'zásoby', points: 40 },
    { title: "Právní a finanční zajištění", description: "Prověř, zda máte v pořádku dokumentaci ohledně uznání otcovství (pokud nejste manželé, vyřizuje se na matrice před porodem) a zda máš v dosahu rodné listy obou rodičů.", category: 'trezor', points: 35 }
  ],
  185: [
    { title: "Technická správa spánkové zóny", description: "Pořiď Velitelce chladicí polštářek na oči nebo masku na spaní. Kvalitní hluboký spánek (reboot) je teď nezbytný pro stabilitu obou systémů.", category: 'údržba', points: 35 },
    { title: "Eliminace hluku", description: "Junior už slyší velmi ostře. Pokud máte doma hlučné spotřebiče, používejte je jen v době, kdy je Junior v aktivním režimu, aby mohl v klidu spát.", category: 'perimetr', points: 40 }
  ],
  186: [
    { title: "Komunikační uzel 'Sbaleno do porodnice'", description: "Dnes je den pro přípravu Evakuačního zavazadla. Sbalte věci pro Velitelku (noční košile, hygiena) i Juniora (první oblečení). Musí stát u dveří.", category: 'briefing', points: 40 },
    { title: "Management mobility", description: "Cesta do schodů je pro Velitelku jako výstup na Everest. Naplánuj trasy tak, aby v budovách byly vždy k dispozici výtahy nebo eskalátory.", category: 'logistika', points: 35 }
  ],
  187: [
    { title: "Bezpečnostní test ISOFIXu", description: "Pokud máte autosedačku, zkus ji dnes jednou rukou 'zacvaknout' a 'vycvaknout'. V den výsadku nesmíš ztratit ani sekundu zápasem s mechanismem.", category: 'transport', points: 40 },
    { title: "Hmatová vazba", description: "Junior už vnímá rozdíl mezi tvou rukou a rukou Velitelky (jiný tlak, jiná teplota). Pravidelně na něj pokládej dlaň, aby si zvykl na tvůj 'podpis'.", category: 'hardware', points: 35 }
  ],
  188: [
    { title: "Trénink očí", description: "Junior už umí mrkat! Jeho zrak je rozmazaný, ale světelné kontrasty vnímá jasně. Zapiš do logu: 'Vizuální hardware plně funkční, připraven na první fotony.'", category: 'junior_update', points: 35 },
    { title: "Finální revize Základny", description: "Zkontroluj, zda v dětském sektoru není průvan od oken. Junior bude mít po narození slabou termoregulaci a potřebuje stabilní tepelný štít.", category: 'stavba', points: 40 }
  ],

  // --- MĚSÍC 8: LOGISTICKÉ FINÁLE ---
  // Týden 28: Monitorování pohybů a spánku (Dny 190–196)
  189: [
    { title: "Protokol počítání pohybů", description: "Odteď by měla Velitelka cítit Juniora pravidelně. Pokud se ti zdá, že je Junior příliš tichý, nasaď 'cukrový boost' a sleduj odezvu. Junior by se měl do 30 minut ozvat.", category: 'strategie', points: 45 },
    { title: "Prevence křečových žil", description: "Velitelka má v systému o 1,5 litru krve víc než normálně. Dohlédni, aby nenosila škrtící ponožky a často polohovala nohy nad úroveň srdce.", category: 'medik', points: 35 }
  ],
  190: [
    { title: "Analýza polohy (Check-in)", description: "Junior by se měl pomalu orientovat hlavou dolů. Pokud cítíš škytavku (pravidelné rytmické cukání) dole v podbřišku, je Junior v ideální startovní pozici.", category: 'průzkum', points: 35 },
    { title: "Management spánkové deprese", description: "Velitelka může trpět nespavostí kvůli nepohodlí a častým návštěvám toalety. Převezmi ranní venčení psa nebo jiné pochůzky, aby mohla dospat dopoledne.", category: 'servis', points: 35 }
  ],
  191: [
    { title: "Akvizice 'Laktační podpory'", description: "Pořiď vložky do podprsenky a mast na bradavky (čistý lanolin). Hardware Velitelky se začíná připravovat na produkci paliva a může dojít k prosakování 'mleziva'.", category: 'zásoby', points: 40 },
    { title: "Finanční hotovost", description: "Vyber a ulož na bezpečné místo hotovost (cca 2000–5000 Kč) pro drobné výdaje v nemocnici, parkovné nebo rychlé nákupy, kde neberou karty.", category: 'trezor', points: 40 }
  ],
  192: [
    { title: "Technická prověrka pračky", description: "Všechno oblečení pro Juniora musí projít pracím cyklem s hypoalergenním práškem a dvojitým mácháním. Odstraňuješ tím tovární chemický šum z textilií.", category: 'údržba', points: 35 },
    { title: "Instalace stínících prvků", description: "Pokud do Juniorova sektoru svítí přímé slunce, nainstaluj zatemňovací závěsy. Junior po výsadku nebude umět rozlišit den a noc, tma mu pomůže se standby režimem.", category: 'perimetr', points: 40 }
  ],
  193: [
    { title: "Komunikační uzel 'Kdo komu volá'", description: "Sestavte si s Velitelkou seznam lidí, kterým zavoláš TY bezprostředně po výsadku. Velitelka bude v režimu regenerace a nesmí být přetížena gratulacemi.", category: 'briefing', points: 40 },
    { title: "Management 'poslíčků'", description: "Braxton-Hicksovy kontrakce mohou zesilovat. Pokud Velitelce ztvrdne břicho, podej jí sklenici vody a nařiď klid. Pokud to nepřejde do hodiny, aktivuj zvýšenou pozornost.", category: 'logistika', points: 40 }
  ],
  194: [
    { title: "Kontrola paliva", description: "Udržuj nádrž transportního modulu (auta) minimálně na 50 %. V den D nesmíš ztrácet čas u čerpací stanice. Prověř také tlak v pneumatikách.", category: 'transport', points: 35 },
    { title: "Reakce na zvuk", description: "Junior už pozná hudbu, kterou mu pouštíte. Zkus experiment: pusť mu stejnou skladbu jako před týdnem a sleduj, zda se uklidní, nebo naopak začne tančit.", category: 'hardware', points: 35 }
  ],
  195: [
    { title: "Tuková izolace", description: "Juniorovi se začíná ukládat podkožní tuk, jeho kůže už není průhledná a vyhlazuje se. Zapiš do logu: 'Termoizolační vrstva ve výstavbě, Junior začíná vypadat buclatě.'", category: 'junior_update', points: 45 },
    { title: "Poslední nákup nábytku", description: "Pokud chybí koš na pleny nebo noční stolek k postýlce, dnes je poslední rozumný termín pro nákup a montáž.", category: 'stavba', points: 40 }
  ],

  // Týden 29: Budování imunity a objemu (Dny 197–203)
  196: [
    { title: "Monitoring aktivity", description: "Junior má už vytvořený pevný biorytmus. Pokud se delší dobu nehýbe, Velitelka by měla vypít něco studeného nebo se položit na levý bok. Zapiš si časy největší 'party' v břiše.", category: 'strategie', points: 45 },
    { title: "Kontrola otoků", description: "Sleduj, zda Velitelce neotékají prsty na rukou nebo obličej. Mírné otoky nohou večer jsou normální, ale náhlý otok obličeje vyžaduje okamžitou konzultaci s lékařem.", category: 'medik', points: 40 }
  ],
  197: [
    { title: "Analýza autosedačky (Hardware check)", description: "Zkus cvičně upevnit do autosedačky plyšového medvěda podobné velikosti, jako bude Junior. Ověř si, jak fungují pětibodové pásy. Musíš to umět poslepu.", category: 'průzkum', points: 40 },
    { title: "Gastro-podpora (Pálení žáhy 2.0)", description: "Junior tlačí žaludek nahoru. Kup Velitelce mandle nebo pastilky proti pálení žáhy schválené pro těhotné. Vyhněte se těžkým jídlům po 18:00.", category: 'servis', points: 35 }
  ],
  198: [
    { title: "Akvizice 'Poporodních potřeb'", description: "Nakup zásoby vysokých síťovaných kalhotek a speciálních poporodních vložek. Je to neatraktivní, ale kriticky důležitý hardware pro regeneraci Velitelky po výsadku.", category: 'zásoby', points: 40 },
    { title: "Fond 'Rychlé palivo'", description: "Naplň mrazák hotovými jídly (domácími), která stačí jen ohřát. Prvních 14 dní po návratu z HQ nebude čas na žádné kulinářské operace.", category: 'trezor', points: 40 }
  ],
  199: [
    { title: "Technická správa ložnice", description: "Velitelka se může v noci dusit nebo mít pocit nedostatku vzduchu. Pořiď zvlhčovač vzduchu nebo častěji větrej. Junior spotřebuje 20 % veškerého kyslíku Velitelky.", category: 'údržba', points: 35 },
    { title: "Bezpečnostní audit podlah", description: "Odstraň všechny malé koberečky, o které by se dalo zakopnout. Velitelka má teď těžiště posunuté dopředu a stabilitu 'na heslo'.", category: 'perimetr', points: 35 }
  ],
  200: [
    { title: "Komunikační uzel 'Plán B'", description: "Co když začne výsadek v době, kdy budeš v práci nebo v koloně? Domluvte si záložního řidiče (soused, rodina, taxi). Každý člen týmu musí vědět, co dělat.", category: 'briefing', points: 45 },
    { title: "Management odpočinku", description: "Nařiď Velitelce povinný odpočinek po obědě. Její srdce teď pumpuje o 50 % více krve než obvykle a motor potřebuje pauzy na dochlazení.", category: 'logistika', points: 35 }
  ],
  201: [
    { title: "Instalace slunečních clon", description: "Na zadní okna auta nainstaluj stínítka. Juniorovy oči budou po výsadku extrémně citlivé na přímé fotony.", category: 'transport', points: 35 },
    { title: "Reakce na světlo", description: "Pokud svítí slunce, Junior už vidí jasně červené světlo skrz břišní stěnu. Může se za ním otáčet. Vyzkoušejte to na přímém světle.", category: 'hardware', points: 35 }
  ],
  202: [
    { title: "Vývoj bílých krvinek", description: "Junior si od Velitelky skrze placentu začíná 'stahovat' protilátky. Buduje si vlastní firewall proti virům a bakteriím. Zapiš do logu: 'Imunitní systém v režimu učení.'", category: 'junior_update', points: 45 },
    { title: "Finální doladění hnízdečka", description: "Vyper a vyžehli povlečení do postýlky. Žehlení na vysokou teplotu funguje jako dodatečná sterilizace hardwaru.", category: 'stavba', points: 40 }
  ],

  // Týden 30: Expanze mozku a ladění termostatu (Dny 204–210)
  203: [
    { title: "Monitoring mozkové aktivity", description: "Junior už má vyvinuté cykly REM spánku. Pokud cítíš rychlé, rytmické záškuby, pravděpodobně má Junior škytavku z polykání plodové vody. Je to dobré znamení – trénuje plíce.", category: 'strategie', points: 40 },
    { title: "Revize krevního tlaku", description: "Dohlédni, aby se Velitelka nepředpínala. Pokud cítí mžitky před očima nebo bolest v pravém podžebří, okamžitě kontaktuj lékařskou podporu.", category: 'medik', points: 40 }
  ],
  204: [
    { title: "Analýza porodních poloh", description: "Proberte s Velitelkou vertikální polohy při porodu (vkleče, v dřepu). Gravitace je tvůj spojenec. Nastuduj si, jak jí v těchto polohách můžeš být fyzickou oporou.", category: 'průzkum', points: 35 },
    { title: "Péče o dýchací kapacitu", description: "Junior tlačí na bránici. Nauč Velitelku spát v polosedě s oporou několika polštářů. Zlepší to přívod kyslíku do obou systémů.", category: 'servis', points: 35 }
  ],
  205: [
    { title: "Akvizice 'Látkových plen'", description: "I když plánujete jednorázové pleny, kup aspoň 10 ks klasických bílých látkových plen. Jsou to univerzální servisní utěrky na odříhnutí, stínění nebo podkládání Juniora.", category: 'zásoby', points: 40 },
    { title: "Audit digitální kapacity", description: "Zkontroluj volné místo v telefonu a cloudu. Od výsadku budeš generovat obrovské množství vizuálních dat (fotky/videa) a 'Storage Full' error v den D je nepřípustný.", category: 'trezor', points: 40 }
  ],
  206: [
    { title: "Technická správa podvozku", description: "Pokud Velitelka trpí na křeče v lýtkách, nasaď večerní masáž s hořčíkovým olejem. Zkontroluj, zda má dostatek tekutin – dehydratace zvyšuje riziko křečí.", category: 'údržba', points: 35 },
    { title: "Optimalizace osvětlení", description: "Pokud ještě nemáš, nainstaluj do chodby a koupelny slabá noční světla se senzorem. Velitelka teď provádí noční výsadky (toaletu) každé 2-3 hodiny.", category: 'perimetr', points: 35 }
  ],
  207: [
    { title: "Komunikační uzel 'Dětský lékař'", description: "Máte vybraného pediatra? Pokud ne, dnes je deadline pro průzkum v perimetru a telefonickou registraci. Junior musí mít po výsadku zajištěnou technickou kontrolu.", category: 'briefing', points: 45 },
    { title: "Management Braxton-Hicks", description: "Cvičné kontrakce jsou častější. Pokud břicho tvrdne příliš často (více než 4x za hodinu), nařiď Velitelce teplou (ne horkou!) sprchu. Pokud to nepoleví, aktivuj pohotovostní režim.", category: 'logistika', points: 40 }
  ],
  208: [
    { title: "Instalace ochranného potahu", description: "Dej na zadní sedadlo auta pod autosedačku ochrannou podložku. Uchráníš interiér před mechanickým poškozením od základny a budoucími biologickými nehodami.", category: 'transport', points: 35 },
    { title: "Testování sluchu", description: "Junior už dokáže rozlišit jednotlivé hlasy. Mluv na něj z různých stran břicha a sleduj, zda se 'natáčí' za tvým hlasem.", category: 'hardware', points: 35 }
  ],
  209: [
    { title: "Aktivace krvetvorby", description: "Kostní dřeň Juniora plně převzala tvorbu červených krvinek (dříve to dělala játra a slezina). Zapiš do logu: 'Produkce paliva plně decentralizována do kostního systému.'", category: 'junior_update', points: 45 },
    { title: "Poslední revize tašky do porodnice", description: "Zkontroluj, zda máte v tašce nabíječku na telefon s dlouhým kabelem a porodní plán. Taška musí být v sektoru 'Vchod' připravena k okamžité evakuaci.", category: 'stavba', points: 45 }
  ],

  // Týden 31: Kalibrace zornic a nárůst výkonu (Dny 211–217)
  210: [
    { title: "Monitoring pohybů (Standardizace)", description: "Junior má už tak málo místa, že kopy střídá spíše protahování. Pokud cítíš 'vlnění' břicha, Junior právě zkouší pevnost stěn svého modulu.", category: 'strategie', points: 40 },
    { title: "Kontrola železa", description: "Junior teď masivně odčerpává železo pro svou vlastní krevní zásobu. Dohlédni, aby Velitelka konzumovala suroviny bohaté na Fe (hovězí, luštěniny, tmavou listovou zeleninu).", category: 'medik', points: 35 }
  ],
  211: [
    { title: "Analýza úlevových technik", description: "Nastuduj techniku 'Rebozo' nebo jemné pohupování pánví. Pomůže to Velitelce ulevit od tlaku Juniorovy hlavy na pánevní dno.", category: 'průzkum', points: 40 },
    { title: "Hydratační protokol", description: "Sleduj příjem tekutin. Dostatečná hydratace snižuje intenzitu poslíčků a otoků. Cílová hodnota: 2,5 litru čisté vody denně.", category: 'servis', points: 35 }
  ],
  212: [
    { title: "Akvizice 'První medicíny'", description: "Pořiď do domácí lékárničky rektální rourku a kapičky na prdíky (simetikon). Tento hardware je kritický pro řešení bugů v trávicím traktu Juniora hned po návratu z HQ.", category: 'zásoby', points: 40 },
    { title: "Audit hesel a přístupů", description: "Pokud máš v telefonu fotky z průběhu mise, zálohuj je na externí disk. Vytvoř složku 'JUNIOR_FINAL', kam budeš ukládat data z deníku výsadku.", category: 'trezor', points: 35 }
  ],
  213: [
    { title: "Technická správa páteře", description: "Velitelka už neuvidí na své nohy. Pomoz jí s pedikúrou nebo stříháním nehtů na nohou. Ohýbání přes Juniorův modul je nyní systémově blokováno.", category: 'údržba', points: 40 },
    { title: "Čistka v kuchyni", description: "Vyřaď všechny silně aromatické potraviny, které Velitelce nedělají dobře. Čichový senzor Velitelky je stále v režimu 'Hyper-citlivost'.", category: 'perimetr', points: 35 }
  ],
  214: [
    { title: "Komunikační uzel 'Návštěvy'", description: "Nastavte s Velitelkou jasná pravidla pro návštěvy po výsadku. Kdo může přijít hned a kdo až po šestinedělí? Ty jsi 'vyhazovač', který tato pravidla bude v terénu vymáhat.", category: 'briefing', points: 45 },
    { title: "Management otoků (Nohy)", description: "Pokud jsou kotníky Velitelky jako sloupy, nasaď večerní sprchu se střídáním teplot a následné vyvýšení nohou o 20 cm nad úroveň srdce.", category: 'logistika', points: 35 }
  ],
  215: [
    { title: "Testovací jízda (Noc)", description: "Projeď si trasu do porodnice za tmy a deště. Musíš znát orientační body (světelné nápisy, brány), abys v noci nezmatkoval.", category: 'transport', points: 40 },
    { title: "Světelný reflex", description: "Junior už zužuje a roztahuje zorničky. Pokud na břicho dopadne silné slunce, Junior už aktivně chrání své vizuální senzory.", category: 'hardware', points: 35 }
  ],
  216: [
    { title: "Vyhlazování kůže", description: "Díky tuku už Junior nevypadá jako 'malý stařík'. Jeho kůže je napnutá a hladká. Zapiš do logu: 'Hardware dosáhl finálního designu, probíhá plnění objemu.'", category: 'junior_update', points: 45 },
    { title: "Instalace přebalovací stanice", description: "Pokud už máš pult, vyskládej plenky, ubrousky a náhradní body tak, aby byly na dosah pravé ruky. Ergonomie je klíčem k rychlému servisu.", category: 'stavba', points: 40 }
  ],

  // Týden 32: Koordinace reflexů (Dny 218–224)
  217: [
    { title: "Monitoring rytmu", description: "Junior už má velmi jasně vymezené fáze spánku a bdění. Pokud se v noci v břiše koná 'diskotéka', je to jeho přirozený cyklus. Velitelka by měla využít každou chvíli přes den k dobití baterií.", category: 'strategie', points: 40 },
    { title: "Revize polohy pro spánek", description: "Tlak na dolní dutou žílu může Velitelce způsobovat nevolnost při lehu na zádech. Dohlédni, aby spala výhradně na levém boku (optimalizace průtoku krve k Juniorovi).", category: 'medik', points: 35 }
  ],
  218: [
    { title: "Analýza úlevy (Voda)", description: "Pokud má Velitelka bolesti zad, napusť jí vanu (max 37°C). Voda nadnáší Juniorův modul a uvolňuje přetížené vazy. Sleduj teplotu, přehřátí systému je nepřípustné.", category: 'průzkum', points: 35 },
    { title: "Gastro-monitoring", description: "Junior už zabírá tolik místa, že žaludek Velitelky má kapacitu asi jako šálek na espresso. Servíruj jídlo v mikroporcích, ale klidně 8x denně.", category: 'servis', points: 35 }
  ],
  219: [
    { title: "Akvizice 'Energetických tyčinek'", description: "Kup do evakuačního zavazadla (tašky do porodnice) rychlé cukry pro tebe i Velitelku (hroznový cukr, müsli tyčinky). Výsadek může trvat mnoho hodin a posádka nesmí zkolabovat hlady.", category: 'zásoby', points: 40 },
    { title: "Administrativní check", description: "Zkontroluj, zda máte v tašce originál oddacího listu (nebo přiznání otcovství) a občanské průkazy. Bez těchto 'přístupových kódů' bude registrace Juniora po výsadku error.", category: 'trezor', points: 45 }
  ],
  220: [
    { title: "Technická správa ložnice", description: "Juniorovi začínají růst nehty a vlasy. Pokud Velitelka pociťuje pálení žáhy, je to jen starý mýtus, že 'rostou vlasy'. Skutečným důvodem je tlak Juniora na svěrač žaludku. Nasaď protikyselinová opatření.", category: 'údržba', points: 35 },
    { title: "Odstranění aromatických rizik", description: "Pokud plánuješ malovat nebo lakovat v jiných částech Základny, zruš to. Výpary rozpouštědel jsou v této fázi pro Juniorův vyvíjející se mozek vysoce toxické.", category: 'perimetr', points: 40 }
  ],
  221: [
    { title: "Komunikační uzel 'Doprovod u porodu'", description: "Potvrďte si, zda chce být Velitelka po celou dobu s tebou, nebo zda máte domluvenou doplňkovou podporu (dulu). Vyjasněte si svou roli – jsi tam jako ochránce klidu a hlavní logistik.", category: 'briefing', points: 45 },
    { title: "Management Braxton-Hicks", description: "Cvičné kontrakce mohou být nyní doprovázeny mírným tlakem v pánvi. Pokud jsou nepravidelné, je to v pořádku. Pokud začnou mít rytmus, aktivuj stopky.", category: 'logistika', points: 35 }
  ],
  222: [
    { title: "Instalace 'Dítě v autě'", description: "Nalep na zadní sklo varovný emblém. Informuješ tím ostatní účastníky provozu, že tvůj transportní modul vyžaduje zvýšený bezpečnostní odstup.", category: 'transport', points: 15 },
    { title: "Odezva na hudbu", description: "Junior už má své preference. Zkus mu pustit různé žánry a sleduj, u čeho se uklidní. Tuto hudbu pak využiješ v 'bojových podmínkách' po výsadku.", category: 'hardware', points: 35 }
  ],
  223: [
    { title: "Trénink otevírání očí", description: "Junior už pravidelně mžourá a trénuje zaostřování, i když v děloze není moc na co koukat. Zapiš do logu: 'Vizuální procesor v režimu autodiagnostiky.'", category: 'junior_update', points: 45 },
    { title: "FINÁLE 8. MĚSÍCE", description: "Všechny velké montážní práce jsou u konce. Dnes proveď jen 'měkké ladění' – srovnej hračky, zkontroluj čistotu textilií v postýlce. Základna je připravena.", category: 'stavba', points: 40 }
  ],

  // --- MĚSÍC 9: OPERACE VÝSADEK ---
  // Týden 33: Finální kalibrace a imunitní štít (Dny 225–231)
  224: [
    { title: "Režim 'Defcon 2'", description: "Od dnešního dne musí být tvůj komunikační modul (telefon) neustále online a s dostatečnou kapacitou baterie. Velitelka může vyslat signál k evakuaci v jakoukoliv hodinu.", category: 'strategie', points: 45 },
    { title: "Monitoring protilátek", description: "Junior právě teď masivně stahuje protilátky z krve Velitelky. Buduje si dočasný imunitní štít. Dohlédni na kvalitní stravu Velitelky.", category: 'medik', points: 35 }
  ],
  225: [
    { title: "Analýza plodové vody", description: "Junior jí nyní vypije až půl litru denně. Sleduj, zda Velitelka nemá pocit náhlého úniku tekutiny – může jít o prasknutí vaku blan.", category: 'průzkum', points: 35 },
    { title: "Management prostoru", description: "Junior už nemá místo na kopy. Pokud Velitelka cítí ostrou bolest pod žebry, Junior tam pravděpodobně zapřel patu. Zkus jemně zatlačit na to místo.", category: 'servis', points: 35 }
  ],
  226: [
    { title: "Akvizice 'První pomoci pro Velitelku'", description: "Pořiď hydrogelové polštářky na prsa. Po zahájení laktace to bude pro Velitelku nejvíce ceněný kus hardwaru na Základně.", category: 'zásoby', points: 40 },
    { title: "Finální kontrola dokumentů", description: "Jsou všechny papíry (občanky, prohlášení o jménu, těhotenská průkazka) v jedné složce v evakuačním zavazadle? Pokud ne, udělej to hned.", category: 'trezor', points: 40 }
  ],
  227: [
    { title: "Technická správa odpočinku", description: "Velitelka teď může pociťovat syndrom 'hnízdění' – náhlou potřebu drhnout podlahy. Přísně to koriguj! Potřebuje šetřit energii na výsadek.", category: 'údržba', points: 35 },
    { title: "Kontrola únikových cest", description: "Zkontroluj, zda v chodbě nejsou krabice nebo boty, o které byste mohli při rychlém odjezdu v noci zakopnout. Cesta k autu musí být čistá.", category: 'perimetr', points: 40 }
  ],
  228: [
    { title: "Komunikační uzel 'Průtok krve'", description: "Pokud Velitelka pociťuje brnění v rukou, je to tlakem Juniora na nervy. Nasaď jemnou masáž a změnu polohy. Junior už váží kolem 2 kg.", category: 'briefing', points: 40 },
    { title: "Management 'Poslíčků' 2.0", description: "Nauč se pravidlo: Pokud jsou kontrakce pravidelné, zesilují a nemění se při změně polohy, jde o ostrou fázi výsadku.", category: 'logistika', points: 45 }
  ],
  229: [
    { title: "Logistika parkování", description: "Zjisti si přesně, kde u porodnice můžeš nechat auto po dobu příjmu a kde pak budeš parkovat dlouhodobě.", category: 'transport', points: 35 },
    { title: "Formování kostry", description: "Lebka Juniora zůstává měkká a kosti nejsou srostlé, aby mohl projít porodním kanálem. Zapiš do logu: 'Lebka v flexibilním režimu.'", category: 'hardware', points: 35 }
  ],
  230: [
    { title: "Detekce světla", description: "Junior už dokáže rozlišit denní světlo a umělé osvětlení skrz břišní stěnu. Pokud je břicho odhalené na slunci, Junior může začít aktivně reagovat.", category: 'junior_update', points: 45 },
    { title: "Instalace monitoru dechu", description: "Pokud máte monitor dechu, dnes ho nainstaluj a otestuj alarm. Musíš vědět, jak zní, abys nepropadl panice při falešném poplachu.", category: 'stavba', points: 40 }
  ],

  // Týden 34: Dozrávání CNS a termoregulace (Dny 232–238)
  231: [
    { title: "Analýza spánkových vzorců", description: "Junior už má jasné fáze hlubokého spánku. Když spí, břicho je klidné. Respektuj tyto cykly, jsou klíčové pro vývoj jeho mozku.", category: 'strategie', points: 40 },
    { title: "Kontrola hladiny vápníku", description: "Juniorovy kosti dál tvrdnou. Dohlédni, aby Velitelka měla dostatek mléčných výrobků, aby Junior nečerpal z jejích zásob.", category: 'medik', points: 35 }
  ],
  232: [
    { title: "Studium 'Zlaté hodiny'", description: "Nastuduj si Skin-to-Skin kontakt. Tvou rolí bude zajistit, aby Juniora nikdo neodnášel pryč od Velitelky (pokud to stav dovolí).", category: 'průzkum', points: 40 },
    { title: "Péče o pokožku (Břicho)", description: "Kůže Velitelky může být extrémně citlivá a svědivá. Používej zklidňující oleje s obsahem vitaminu E.", category: 'servis', points: 35 }
  ],
  233: [
    { title: "Akvizice 'Látkových bariér'", description: "Připrav sadu čistých látkových plen (cca 5 ks) do auta. Hodí se jako podložka pod Juniora v autosedačce nebo k otření nehod.", category: 'zásoby', points: 35 },
    { title: "Fond 'Dovolená Operativce'", description: "Potvrď si v práci, že tvůj telefon bude v režimu prioritního příjmu a tvůj odchod do pole může nastat okamžitě.", category: 'trezor', points: 45 }
  ],
  234: [
    { title: "Technická správa podvozku", description: "Pokud Velitelka trpí na otoky, pořiď jí kompresní punčochy. Pomáhají udržet cirkulaci krve v optimálních parametrech.", category: 'údržba', points: 35 },
    { title: "Čistka v lednici", description: "Odstraň vše s krátkou expirací. Odteď nakupuj jen trvanlivé nebo mražené. Základna může zůstat několik dní opuštěná.", category: 'perimetr', points: 40 }
  ],
  235: [
    { title: "Komunikační uzel 'Kontakt na pediatra'", description: "Ulož si číslo na pediatra do rychlé volby. Po výsadku budeš muset Juniora nahlásit k první technické kontrole do 48h.", category: 'briefing', points: 40 },
    { title: "Management mobility", description: "Cesta k autu by měla být bez překážek. Pokud bydlíte vysoko, prověř výtah. Schody jsou pro Velitelku rizikový terén.", category: 'logistika', points: 35 }
  ],
  236: [
    { title: "Instalace zrcátka", description: "Nainstaluj na opěrku zadního sedadla panoramatické zrcátko, abys viděl na Juniora v autosedačce během řízení.", category: 'transport', points: 35 },
    { title: "Testování sluchu", description: "Junior už reaguje na tvůj hlas. Zkus mu zazpívat nebo přečíst manuál – tvoje frekvence ho uklidňuje.", category: 'hardware', points: 35 }
  ],
  237: [
    { title: "Stabilizace termoregulace", description: "Junior si vytvořil dostatek podkožního tuku na to, aby si po narození udržel tělesnou teplotu. Zapiš do logu: 'Topný systém ready.'", category: 'junior_update', points: 45 },
    { title: "Poslední prověrka Základny", description: "Postýlka je čistá, přebalovací pult vybaven, taška u dveří. Jsi v režimu Standby. Operace Výsadek může začít.", category: 'stavba', points: 40 }
  ],

  // Týden 35: Vrcholná imunitní ochrana (Dny 239–245)
  238: [
    { title: "Monitoring GBS", description: "Tento týden pravděpodobně proběhne stěr na GBS. Pokud je pozitivní, Velitelka dostane při výsadku antibiotika. Zapiš výsledek.", category: 'strategie', points: 45 },
    { title: "Kontrola tlaku v pánvi", description: "Junior klesá níž. Velitelka může pociťovat ostrou bolest v pánvi (jako el. výboje). Junior naráží na nervy. Naordinuj klid.", category: 'medik', points: 40 }
  ],
  239: [
    { title: "Analýza sbaleného vybavení", description: "Zkontroluj, zda jsou v tašce věci pro TEBE (oblečení, přezůvky, svačina). Pokud bude výsadek trvat 12 hodin, musíš být akceschopný.", category: 'průzkum', points: 35 },
    { title: "Management spánku", description: "Velitelka chodí na toaletu každou hodinu. Zajisti, aby měla přes den prostor pro krátké 'power-napy'.", category: 'servis', points: 35 }
  ],
  240: [
    { title: "Akvizice 'Laktační logistiky'", description: "Pokud plánujete odsávání, zkontroluj, zda je odsávačka čistá. Hardware musí být v režimu 'Ready'.", category: 'zásoby', points: 35 },
    { title: "Krizová hotovost 2.0", description: "Měj drobné mince na automaty v nemocnici (káva/voda). V noci bufety nefungují a ty budeš potřebovat energii.", category: 'trezor', points: 40 }
  ],
  241: [
    { title: "Technická správa dýchání", description: "Velitelce se lépe dýchá, protože břicho kleslo, ale zvýšil se tlak na podvozek. Uprav výšku polštářů.", category: 'údržba', points: 35 },
    { title: "Dezinfekční protokol", description: "Vydezinfikuj kliky a telefon. Juniorův imunitní systém bude po výsadku v režimu 'Učení' a nepotřebuje hned čelit agresivní náloži.", category: 'perimetr', points: 40 }
  ],
  242: [
    { title: "Komunikační uzel 'Dula/PA'", description: "Pokud máte externí podporu, proveďte finální briefing. Potvrďte si hesla a způsob komunikace pro ostrou fázi.", category: 'briefing', points: 45 },
    { title: "Management 'Poslíčků'", description: "Pokud kontrakce trvají déle než 30s a opakují se, nasaď vanu. Pokud neustávají, aktivuj evakuační plán.", category: 'logistika', points: 45 }
  ],
  243: [
    { title: "Navigační check", description: "Prověř, zda na trase k HQ (porodnici) nejsou nové uzavírky. Cesta musí být bez překvapení.", category: 'transport', points: 35 },
    { title: "Formování trávicího traktu", description: "Junior už vylučuje do plodové vody odpadní látky (smolku). Zapiš do logu: 'Odpadní systém naplněn.'", category: 'hardware', points: 35 }
  ],
  244: [
    { title: "Zánik lanuga", description: "Jemné chmýří mizí, zůstává jen mázka. Junior je velký jako střední ananas. Zapiš do logu: 'Design exteriéru dokončen.'", category: 'junior_update', points: 45 },
    { title: "Finální test autosedačky", description: "Zkus ji dnes jednou rukou vycvaknout z báze. Musíš mít tento pohyb v automatice. V den propuštění nesmíš vypadat jako amatér.", category: 'stavba', points: 40 }
  ],

  // --- MĚSÍC 9 a 10 (Zachováno z předchozí verze) ---

  // Týden 36: Oficiální donošenost a sestup (Dny 246–252)
  245: [
    { title: "Monitoring pohybů (Final Edition)", description: "Méně místa = intenzivnější pohyby. Pokud je 'podezřelé ticho', nasaď budíček (sladké/studené) a sleduj reakci.", category: 'strategie', points: 45 },
    { title: "Analýza krevního tlaku", description: "Velitelka by si měla měřit tlak 1–2x denně. Pokud vyskočí nad 140/90, hlaš to okamžitě lékaři.", category: 'medik', points: 40 }
  ],
  246: [
    { title: "Analýza sestupu", description: "Hlava se fixuje v pánevním vchodu. Lépe se dýchá, ale chůze je náročnější ('balon mezi nohama'). Podepírej ji.", category: 'průzkum', points: 35 },
    { title: "Péče o gastro-systém", description: "Tlak na močový měchýř je enormní. Plánuj trasy s toaletou v dosahu 5 minut. Musí pít dál!", category: 'servis', points: 15 }
  ],
  247: [
    { title: "Akvizice 'Poslední míle'", description: "Kup odsávačku hlenů (na vysavač nebo ústní). Nejdůležitější hardware pro průchodnost dýchacích cest Juniora.", category: 'zásoby', points: 40 },
    { title: "Fond 'První nákup'", description: "Seznam potravin pro den návratu z HQ: Čerstvé pečivo, ovoce, kvalitní šunka. Musí mít plnohodnotné palivo.", category: 'trezor', points: 35 }
  ],
  248: [
    { title: "Technická kontrola postýlky", description: "Dotáhni šrouby. Vyzkoušej stahování bočnice jednou rukou, zatímco v druhé držíš Juniora (nanečisto).", category: 'údržba', points: 45 },
    { title: "Zabezpečení ostrých hran", description: "Projdi byt očima někoho s 3kg křehkým nákladem. Odstraň pasti, o které bys mohl zakopnout.", category: 'perimetr', points: 40 }
  ],
  249: [
    { title: "Komunikační uzel 'Kdy jet'", description: "Zopakuj si pravidlo 5-1-1 (interval 5 min, trvání 1 min, trvá to 1 hodinu). Prasklá voda = jede se hned.", category: 'briefing', points: 45 },
    { title: "Management energie", description: "Velitelka je v režimu 'Nesting'. Zakázat drhnutí koupelny! Energie musí být v akumulátorech pro akci.", category: 'logistika', points: 40 }
  ],
  250: [
    { title: "Logistika autosedačky", description: "Dnes ji dej do auta nastálo. Zakryj ji čistou plenou proti prachu. Nechceš ji v den D hledat v panice.", category: 'transport', points: 35 },
    { title: "Formování imunity", description: "Junior polyká plodovou vodu s protilátkami. Log: 'Bio-firewall se konfiguruje.'", category: 'hardware', points: 35 }
  ],
  251: [
    { title: "Konec 'předčasnosti'", description: "Dnešní půlnocí končí rizika spojená s nezralostí. Junior váží cca 2,7 kg (římský salát).", category: 'junior_update', points: 50 },
    { title: "Check evakuačního zavazadla", description: "Doklady? Nabíječka? Čisté prádlo? Peníze? Taška se stěhuje k hlavním dveřím.", category: 'stavba', points: 45 }
  ],

  // Týden 37: Plná bojová pohotovost (Dny 253–259)
  252: [
    { title: "Režim 'Kdykoliv'", description: "Junior už jen tloustne a nabírá energetické zásoby. Pokud se výsadek spustí dnes, je to standardní procedura.", category: 'strategie', points: 35 },
    { title: "Sledování aktivity", description: "Místo kopanců ucítíš silné převalování. Počítej: alespoň 10 jasných vjemů během 2 hodin klidu.", category: 'medik', points: 40 }
  ],
  253: [
    { title: "Analýza hlenové zátky", description: "Může odejít zátka (i s krví). Žádná panika, jen signál přípravy. Výsadek může být za hodiny i týden.", category: 'průzkum', points: 35 },
    { title: "Gastro-příprava", description: "Připravuj jídla lehká, ale bohatá na sacharidy. Velitelka potřebuje mít nabito na maraton.", category: 'servis', points: 35 }
  ],
  254: [
    { title: "Finální check lékárničky", description: "Máš líh na pupík a sterilní čtverečky? Dnes je poslední den na klidný nákup bez stresu.", category: 'zásoby', points: 40 },
    { title: "Krizová karta", description: "Napiš na papír čísla: Porodnice, Pediatr, Záložní řidič. Dej to na lednici pro případ selhání techniky.", category: 'trezor', points: 45 }
  ],
  255: [
    { title: "Správa podvozku", description: "Velitelka cítí poslíčky. Test: V teplé vaně přestanou. Skutečné kontrakce naopak naberou sílu.", category: 'údržba', points: 40 },
    { title: "Logistika postýlky", description: "Nastav rošt postýlky do nejvyšší polohy. Šetří to záda operativců při zvedání Nováčka.", category: 'perimetr', points: 35 }
  ],
  256: [
    { title: "Komunikační uzel 'Otec'", description: "Nejsi divák, jsi advokát Velitelky. Komunikuj s personálem a hlídej dodržování porodního plánu.", category: 'briefing', points: 35 },
    { title: "Management spánku", description: "Pokud v noci nespí, buduj klidový režim přes den. Tělo si dělá zásoby na budoucí deficit.", category: 'logistika', points: 35 }
  ],
  257: [
    { title: "Logistika autosedačky II", description: "Zkontroluj správné upevnění báze. Do přihrádky dej roli utěrek a igelitový pytel pro transport.", category: 'transport', points: 40 },
    { title: "Příprava na první nádech", description: "Rytmické zvedání břicha = Junior trénuje dýchací svaly. Log: 'Ventilační systém otestován.'", category: 'hardware', points: 35 }
  ],
  258: [
    { title: "Úbytek vernixu", description: "Vernix mizí, voda se stává mléčnou. Junior váží cca 2,9 kg a je velký jako mangold.", category: 'junior_update', points: 45 },
    { title: "Operativní pohotovost", description: "Taška u dveří, boty připraveny, plná nádrž. Gratuluji, jsi připraven na největší misi života.", category: 'stavba', points: 50 }
  ],

  // Týden 38: Akumulace energie a klid před bouří (Dny 260–266)
  259: [
    { title: "Analýza energie", description: "Sleduj náhlý útlum nebo příval energie. Obojí je příprava na výsadek. Dohlédni, aby se nepřepínala.", category: 'strategie', points: 40 },
    { title: "Sledování pohybů", description: "Junior je velmi nízko. Pohyby cítíš jako 'škrábání' na čípek. Bolestivost značí jeho sílu.", category: 'medik', points: 40 }
  ],
  260: [
    { title: "Monitoring kontrakcí", description: "Pravé kontrakce neustupují po změně polohy, jsou delší a intervaly se zkracují. Při 5 min intervalu startuj.", category: 'průzkum', points: 45 },
    { title: "Péče o hydrataci", description: "Plodová voda se obnovuje co 3 hodiny. Velitelka musí pít jako velbloud (provozní kapaliny).", category: 'servis', points: 35 }
  ],
  261: [
    { title: "Svačinový box", description: "Do tašky trvanlivé jídlo pro TEBE (oříšky, tyčinky). Hladový operativec bude Velitelce k ničemu.", category: 'zásoby', points: 40 },
    { title: "Digitální záloha", description: "Máš místo v telefonu na 4K video a 200 fotek? První vteřiny po výsadku se neopakují.", category: 'trezor', points: 35 }
  ],
  262: [
    { title: "Správa podvozku II", description: "Pocit 'rozestupující se pánve' (vliv hormonů). Pomoz s polohováním nohou při sezení pro úlevu kyčlím.", category: 'údržba', points: 40 },
    { title: "Kontrola ISOFIXu", description: "Zkontroluj zelené kontrolky na bázi nebo překroucení pásů. Bezpečnost je tvoje priorita.", category: 'perimetr', points: 45 }
  ],
  263: [
    { title: "Komunikační uzel 'Metronom'", description: "Zopakuj techniky dýchání. Pokud Velitelka hyperventiluje, musíš ji uklidnit a dýchat s ní. Jsi její kotva.", category: 'briefing', points: 35 },
    { title: "Management klidu", description: "Omez návštěvy a hovory 'Už?'. Buď filtrem informačního šumu, který zvyšuje stres.", category: 'logistika', points: 40 }
  ],
  264: [
    { title: "Navigační check (Noc)", description: "Kde se v porodnici zvoní v noci? Často je to jiný vchod. Prověř to předem.", category: 'transport', points: 35 },
    { title: "Příprava na sání", description: "Junior má v tvářích tukové polštářky pro lepší podtlak. Log: 'Sací jednotka mechanicky posílena.'", category: 'hardware', points: 35 }
  ],
  265: [
    { title: "Produkce hormonů", description: "Juniorova nadledvinka produkuje adrenalin - příprava na šok z narození. Je připraven k boji.", category: 'junior_update', points: 35 },
    { title: "Operativní revize Základny", description: "Čisté ručníky? Teplo v bytě (22-24 °C)? Junior ztrácí teplo 4x rychleji než dospělý.", category: 'stavba', points: 45 }
  ],

  // Týden 39: Finální odpočet (Dny 267–273)
  266: [
    { title: "Monitoring ticha", description: "Junior může před výsadkem utichnout (nabírá síly). Při podezřelém tichu nasaď budíček (cukr + levý bok).", category: 'strategie', points: 45 },
    { title: "Kontrola otoků", description: "Náhlý otok obličeje nebo rukou? Okamžitě kontaktuj centrálu. Hrozí kritická chyba preeklampsie.", category: 'medik', points: 40 }
  ],
  267: [
    { title: "Analýza plodové vody 2.0", description: "Prasknutí blan: čirá/růžová OK. Zelená/zakalená = Priorita Alfa (smolka ve vodě), výjezd IHNED.", category: 'průzkum', points: 35 },
    { title: "Psychologická podpora", description: "Velitelka je frustrovaná z čekání. Vysvětli, že Junior si jen 'balí kufry', aby mu nic nechybělo.", category: 'servis', points: 40 }
  ],
  268: [
    { title: "Audit Domácí základny", description: "Máte jídlo na první 3 dny po návratu? Udělej velký nákup teď, pak na to nebude čas.", category: 'zásoby', points: 45 },
    { title: "Finanční hotovost", description: "Zkontroluj drobné na parkovací automaty. Detail, který v noci ušetří obrovský logistický stres.", category: 'trezor', points: 35 }
  ],
  269: [
    { title: "Správa energie", description: "Nabij powerbanky. Pokud bude výsadek dlouhý, komunikační modul musí být neustále v provozu.", category: 'údržba', points: 40 },
    { title: "Čistota cesty", description: "Palivo min. 1/2 nádrže. V zimě škrabka a rozmrazovač v pohotovosti. Každá sekunda se počítá.", category: 'perimetr', points: 45 }
  ],
  270: [
    { title: "Uzel 'První kontakt'", description: "Kdo dostane fotku první? Vytvoř hromadnou skupinu, ať nepíšeš 20 zpráv zvlášť. Jsi tiskový mluvčí.", category: 'briefing', points: 40 },
    { title: "Management bolesti", description: "Zopakuj techniku tlaku dlaní na kříž během kontrakce. Ulevuje od křížových bolestí.", category: 'logistika', points: 45 }
  ],
  271: [
    { title: "Logistika autosedačky III", description: "Prověř ukotvení. Junior váží cca 3,3 kg a jeho bezpečí při transportu z HQ je tvůj hlavní úkol.", category: 'transport', points: 35 },
    { title: "Formování zraku", description: "Junior vidí na 20-30 cm (vzdálenost od prsu k obličeji). Log: 'Optika zaostřena na cíl.'", category: 'hardware', points: 35 }
  ],
  272: [
    { title: "Odhazování mazku", description: "Vernix zůstává jen v podpaží a tříslech. Design exteriéru dokončen. Čekám na povolení k výstupu.", category: 'junior_update', points: 40 },
    { title: "Poslední revize hnízda", description: "Základna v perfektním stavu. Systémy Standby. Odpočet na nule. Jsi připraven stát se tátou.", category: 'stavba', points: 50 }
  ],

  // Týden 40: Den D (Dny 274–280)
  273: [
    { title: "Monitoring 'Vypuzení'", description: "Juniorovy plíce produkují surfaktant - signál připravenosti. Neklid Velitelky = hormonální start.", category: 'strategie', points: 40 },
    { title: "Kontrola tlaku (Critical)", description: "Bolest hlavy nebo mžitky? Okamžitý přesun do HQ bez ohledu na kontrakce. Kritické parametry.", category: 'medik', points: 50 }
  ],
  274: [
    { title: "Analýza prasknutí vody", description: "Vodopád je jasný, ale nenápadné vlhko prověř testem s vložkou a jeďte na kontrolu do HQ.", category: 'průzkum', points: 40 },
    { title: "Logistika jídla", description: "Při kontrakcích nebude chuť na jídlo. Nabízej vývar nebo hroznový cukr pro rychlou energii na finále.", category: 'servis', points: 40 }
  ],
  275: [
    { title: "Kontrola transportu", description: "Máš v autě deku pro Juniora na cestu domů? Přechod z budovy k autu vyžaduje tepelný štít.", category: 'zásoby', points: 40 },
    { title: "Přístupové kódy", description: "Nabitý telefon a uložená čísla. V nouzi volej 155, nehledej číslo na vrátnici.", category: 'trezor', points: 45 }
  ],
  276: [
    { title: "Management stresu", description: "Termín uplynul? Vypni telefony. Klid Velitelky = Oxytocin. Braň ji před dotazy okolí 'Už?'.", category: 'údržba', points: 40 },
    { title: "Kontrola lůžka", description: "Dej pod prostěradlo nepropustnou podložku. Pokud voda praskne v noci, uchráníš hardware (matraci).", category: 'perimetr', points: 45 }
  ],
  277: [
    { title: "Uzel 'Povzbuzování'", description: "Při tlačení neříkej 'už to bude', ale 'jsi skvělá, děláš to výborně'. Buď její kotvou v bouři.", category: 'briefing', points: 50 },
    { title: "Management času", description: "Měř intervaly. Ty jsi ten, kdo řekne 'Teď vyrážíme'. Velitelka se soustředí jen na dýchání.", category: 'logistika', points: 40 }
  ],
  278: [
    { title: "Logistika parkování", description: "Zastav u urgentu, vylož náklad a věci, teprve pak běž přeparkovat. Nenech ji jít pěšky z parkoviště.", category: 'transport', points: 40 },
    { title: "Formování lebky", description: "Kosti se při průchodu překryjí. Log: 'Strukturální komprese povolena. Junior je v pozici 0.'", category: 'hardware', points: 45 }
  ],
  279: [
    { title: "Cíl mise", description: "Junior (cca 3,7 kg) je připraven k výsadku. Všechny systémy v režimu Auto-Start.", category: 'junior_update', points: 150 },
    { title: "Gratulace Operativci", description: "Mise úspěšná. Pokud ještě držíš stráž, přenášení do 41+3 je pod dozorem lékařů normální.", category: 'stavba', points: 150 }
  ],
  281: [
    { title: "Informační embargo", description: "Staň se tiskovým mluvčím. Zakaž všem dotazy typu 'Už?'. Napiš všem, že až se Junior narodí, dáte vědět.", category: 'briefing', points: 50 }
  ],
  282: [
    { title: "Prověrka transportní kapacity", description: "Udržuj nádrž auta nad 50 % a zkontroluj tlak v pneu. Taška u dveří, telefony nabité.", category: 'logistika', points: 40 }
  ],
  283: [
    { title: "Gastronomický bonus", description: "Objednej mamině její nejoblíbenější jídlo. Brzy bude vaším jídlem studené kafe a rychlá sváča.", category: 'zásoby', points: 40 }
  ],
  284: [
    { title: "Gravitační podpora", description: "Vezmi Velitelku na lehkou procházku. Gravitace pomáhá hlavě miminka naléhat na porodní cesty.", category: 'logistika', points: 45 }
  ],
  285: [
    { title: "Digitální čistka", description: "Smaž z mobilu zbytečné fotky a videa. Budeš potřebovat stovky GB volného místa na dokumentaci Juniora.", category: 'servis', points: 45 }
  ],
  286: [
    { title: "Údržba výstroje", description: "Zkus si nanečisto zapnutí autosedačky do auta, abys ve stresu nebo v noci nebojoval s mechanikou.", category: 'servis', points: 40 }
  ],
  287: [
    { title: "Psychická stabilizace", description: "Být skála – neřeš detaily, nekritizuj a buď maximálně trpělivý. Velitelka je pod tlakem z přenášení.", category: 'medik', points: 50 }
  ],
  288: [
    { title: "Nutriční stimulace", description: "Pokud to zdravotní stav Velitelky dovolí, zkuste pálivé jídle. Může to reflexivně rozhýbat dělohu.", category: 'medik', points: 45 }
  ],
  289: [
    { title: "Regenerace dolních končetin", description: "Udej mamině důkladnou masáž nohou a chodidel. Ulevíš jí od otoků a pomůžeš jí se uvolnit.", category: 'medik', points: 40 }
  ],
  290: [
    { title: "Instalace odposlechu", description: "Vybal monitor dechu a chůvičku, vyzkoušej dosah. Musíš je umět ovládat i potmě a v únavě.", category: 'hardware', points: 40 }
  ],
  291: [
    { title: "Zásoby pro posádku", description: "Kup zásoby jídla do jedné ruky (tyčinky, kapsičky) a doplň zásoby kávy pro sebe na první dny.", category: 'zásoby', points: 45 }
  ],
  292: [
    { title: "Vertikální pohyb", description: "Pokud se Velitelka cítí dobře, vyjděte si pár pater schodů. Působí to jako přirozený vyvolávač.", category: 'logistika', points: 40 }
  ],
  293: [
    { title: "Finální briefing", description: "Zopakujte si cestu do porodnice, kde se v noci parkuje a kde je přesně zvonek na příjem.", category: 'briefing', points: 50 }
  ],
  294: [
    { title: "Vylodění je nevyhnutelné", description: "Dnes pravděpodobně dochází k nástupu na vyvolání. Buď připraven na roli asistenta a opory.", category: 'velká_mise', points: 150 }
  ]
};

const OVERDUE_MISSIONS: Omit<Task, 'id' | 'completed' | 'isDaily'>[] = [
  { title: "Logistika komfortu", description: "Přines do nemocnice cokoli, co zlepší prostředí – vlastní polštář, oblíbené pití nebo knížku. Nemocniční setup je strohý.", category: 'logistika', points: 45 },
  { title: "Emocionální kotva", description: "Buď k dispozici pro ventilaci frustrace. Přenášení v nemocnici je psychicky náročné. Jen poslouchej a buď tam.", category: 'medik', points: 40 },
  { title: "Psychická bariéra", description: "Filtruj dotazy rodiny a okolí. Ty jsi ten, kdo podává hlášení. Mamině dopřej komunikační klid na odpočinek.", category: 'briefing', points: 45 },
  { title: "Zabezpečení základny", description: "Ujisti se, že doma je vše v režimu 'Ready'. Čisté povlečení, vysypané koše, lednice připravená na návrat.", category: 'údržba', points: 40 },
  { title: "Kurýrní služba", description: "Ověř, zda nechybí něco z výbavy nebo hygieny. Cokoli zapomenuté musíš doručit v prioritním režimu.", category: 'transport', points: 45 },
  { title: "Morální podpora systému", description: "Přenášení je vyčerpávající. Oceň její sílu a trpělivost. Jsi v tom s ní až do finálního vítězství.", category: 'medik', points: 40 }
];

const GENERIC_MISSIONS: Omit<Task, 'id' | 'completed' | 'isDaily'>[] = [
  { title: "Kontrola hydratace Velitelky", description: "Zajisti, aby Velitelka měla vždy po ruce vodu. Hydratace je klíčová pro tvorbu plodové vody.", category: 'servis', points: 10 },
  { title: "Masáž šíje", description: "Nabídni krátkou masáž ramen a šíje pro uvolnění napětí.", category: 'medik', points: 15 },
  { title: "Doplnění vitamínů", description: "Připomeň nebo připrav vitamíny pro těhotné.", category: 'zásoby', points: 10 },
  { title: "Večerní procházka", description: "Navrhni krátkou procházku na čerstvém vzduchu.", category: 'průzkum', points: 35 },
  { title: "Úklid sektoru kuchyně", description: "Převezmi iniciativu a ukliď kuchyň/nádobí.", category: 'údržba', points: 40 },
  { title: "Záznam do deníku", description: "Zapiš, jak se dnes Velitelka cítila a zda byl zaznamenán pohyb.", category: 'briefing', points: 15 },
  { title: "Kontrola zásob", description: "Ověř stav lednice a spíže. Nedochází něco důležitého?", category: 'zásoby', points: 15 }
];

export const getDailyMissions = (dayIndex: number): Task[] => {
  let missionsData = DAILY_MISSIONS_DATABASE[dayIndex];

  if (dayIndex > 294) {
    const overdueIdx = (dayIndex - 295) % OVERDUE_MISSIONS.length;
    missionsData = [OVERDUE_MISSIONS[overdueIdx]];
  }

  let selectedMissions = missionsData;

  if (!selectedMissions || selectedMissions.length === 0) {
    // Fallback logic for days not explicitly defined
    const idx1 = dayIndex % GENERIC_MISSIONS.length;
    const idx2 = (dayIndex + 3) % GENERIC_MISSIONS.length;
    selectedMissions = [GENERIC_MISSIONS[idx1], GENERIC_MISSIONS[idx2]];
  }

  return selectedMissions.map((mission, index) => ({
    ...mission,
    id: `daily_${dayIndex}_${index}`,
    completed: false,
    isDaily: true
  }));
};
