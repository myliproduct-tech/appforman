
import { Task, Achievement, UserStats, ConsumableItem } from './types';

// Default consumable items (teas only - vitamins are added by user)
export const DEFAULT_CONSUMABLES: Omit<ConsumableItem, 'quantity' | 'lastUpdated'>[] = [
  { id: 'g51', name: 'Čaj pro těhotné ženy', isCustom: false },
  { id: 'g23', name: 'Čaj pro kojící matky', isCustom: false }
];

// Baby size comparison using tools
export const BABY_SIZES: Record<number, { name: string, emoji: string }> = {
  4: { name: 'Podložka M6', emoji: '🔩' },
  8: { name: 'Bit do šroubováku', emoji: '🪛' },
  12: { name: 'Ořech z gola sady', emoji: '⚙️' },
  16: { name: 'Svinovací metr', emoji: '📏' },
  20: { name: 'Kombinačky', emoji: '🔧' },
  24: { name: 'Pořádné kladivo', emoji: '🔨' },
  28: { name: 'Aku vrtačka', emoji: '🔫' },
  32: { name: 'Horkovzdušná pistole', emoji: '🌡️' },
  36: { name: 'Kanystr s benzínem', emoji: '⛽' },
  40: { name: 'Kufr s nářadím', emoji: '🧰' },
};

export const MISSION_DATABASE: Task[] = [
  // Keeping empty structure for type compatibility as we moved to dailyMissions.ts
];

export const INITIAL_TASKS: Task[] = [];

export const ACHIEVEMENTS: Achievement[] = [
  // --- STARTER ---
  {
    id: 'first_blood',
    title: 'První Krev',
    description: 'Splnil jsi svou první misi. Vítej v armádě, táto.',
    howToUnlock: 'Dokončit jakoukoliv misi z denního seznamu nebo vlastních misí.',
    icon: 'Medal',
    rarity: 'common',
    xpReward: 50,
    condition: (stats: UserStats) => stats.completedTasks.length >= 1,
    progress: (stats: UserStats) => ({ current: Math.min(stats.completedTasks.length, 1), total: 1 })
  },
  {
    id: 'tour_veteran',
    title: 'Veterán Výcviku',
    description: 'Prošel jsi celým instruktážním procesem. Teď už víš, co tě čeká.',
    howToUnlock: 'Dokončit úvodního průvodce aplikací.',
    icon: 'BookOpen',
    rarity: 'common',
    xpReward: 100,
    condition: (stats: UserStats) => !!stats.onboardingCompleted
  },
  {
    id: 'trainee',
    title: 'Zelenáč',
    description: 'Dokončil jsi 5 misí. Začínáš se orientovat.',
    howToUnlock: 'Dokončit celkem 5 misí.',
    icon: 'Sprout',
    rarity: 'common',
    xpReward: 100,
    condition: (stats: UserStats) => stats.completedTasks.length >= 5,
    progress: (stats: UserStats) => ({ current: Math.min(stats.completedTasks.length, 5), total: 5 })
  },

  // --- STREAKS ---
  {
    id: 'consistent',
    title: 'Srdcař',
    description: 'Udržel jsi sérii 3 dny v řadě. Disciplína je základ.',
    howToUnlock: 'Dokončit alespoň 1 misi denně po dobu 3 dní v řadě.',
    icon: 'Flame',
    rarity: 'rare',
    xpReward: 150,
    condition: (stats: UserStats) => stats.streak >= 3,
    progress: (stats: UserStats) => ({ current: Math.min(stats.streak, 3), total: 3 })
  },
  {
    id: 'iron_man',
    title: 'Železný Muž',
    description: 'Týdenní série (7 dní). Tebe nic nezastaví.',
    howToUnlock: 'Dokončit alespoň 1 misi denně po dobu 7 dní v řadě.',
    icon: 'Bot',
    rarity: 'epic',
    xpReward: 500,
    condition: (stats: UserStats) => stats.streak >= 7,
    progress: (stats: UserStats) => ({ current: Math.min(stats.streak, 7), total: 7 })
  },

  // --- PROGRESS ---
  {
    id: 'rank_5',
    title: 'Důstojník',
    description: 'Dosáhnul jsi 5. úrovně (Level 5). Už nejsi jen pěšák.',
    howToUnlock: 'Získat dostatek XP pro dosažení 5. úrovně.',
    icon: 'Star',
    rarity: 'rare',
    xpReward: 300,
    condition: (stats: UserStats) => stats.level >= 5,
    progress: (stats: UserStats) => ({ current: Math.min(stats.level, 5), total: 5 })
  },
  {
    id: 'rank_10',
    title: 'Generál',
    description: 'Dosáhnul jsi maximální 10. úrovně. Jsi legenda.',
    howToUnlock: 'Získat dostatek XP pro dosažení maximální 10. úrovně.',
    icon: 'Crown',
    rarity: 'legendary',
    xpReward: 1000,
    condition: (stats: UserStats) => stats.level >= 10,
    progress: (stats: UserStats) => ({ current: Math.min(stats.level, 10), total: 10 })
  },

  // --- SPECIALIST ---
  {
    id: 'supply_master',
    title: 'Týlář',
    description: 'Splnil jsi 10 úkolů v kategorii Zásoby nebo Logistika.',
    howToUnlock: 'Dokončit 10 misí v kategorii "Zásoby" nebo "Logistika".',
    icon: 'Package',
    rarity: 'rare',
    xpReward: 200,
    condition: (stats: UserStats) => {
      const supplyCount = stats.missionHistory.filter(m => m.category === 'zásoby' || m.category === 'logistika').length;
      return supplyCount >= 10;
    },
    progress: (stats: UserStats) => {
      const supplyCount = stats.missionHistory.filter(m => m.category === 'zásoby' || m.category === 'logistika').length;
      return { current: Math.min(supplyCount, 10), total: 10 };
    }
  },
  {
    id: 'intel_agent',
    title: 'Rozvědčík',
    description: 'Dokončil jsi 5 misí v kategorii Průzkum. Začínáš se orientovat.',
    howToUnlock: 'Dokončit 5 misí v kategorii "Průzkum".',
    icon: 'Search',
    rarity: 'rare',
    xpReward: 150,
    // Note: This requires tracking intel opens, for now we approximate by level or manual trigger, 
    // OR simply change condition to "Survey/Recon" missions
    condition: (stats: UserStats) => stats.missionHistory.filter(m => m.category === 'průzkum').length >= 5,
    progress: (stats: UserStats) => {
      const reconCount = stats.missionHistory.filter(m => m.category === 'průzkum').length;
      return { current: Math.min(reconCount, 5), total: 5 };
    }
  },

  // --- CHECKLISTS ---
  {
    id: 'prepper',
    title: 'Prepper',
    description: 'Máš kompletně sbalenou tašku do porodnice.',
    howToUnlock: 'Zaškrtnout alespoň 15 položek v evakuačním batohu (Průzkum Bojiště → Evakuační Batoh).',
    icon: 'Backpack',
    rarity: 'epic',
    xpReward: 400,
    // Assuming we can check length against total items (approx 15 items in lists)
    condition: (stats: UserStats) => stats.hospitalBagChecklist.length >= 15,
    progress: (stats: UserStats) => ({ current: Math.min(stats.hospitalBagChecklist.length, 15), total: 15 })
  },
  {
    id: 'mechanic',
    title: 'Mechanik',
    description: 'Pořídil jsi kompletní výbavu (kočár, sedačka, postýlka...).',
    howToUnlock: 'Zaškrtnout alespoň 10 položek v taktickém inventáři (Kasa → Inventář).',
    icon: 'Wrench',
    rarity: 'epic',
    xpReward: 400,
    condition: (stats: UserStats) => stats.gearChecklist.length >= 10,
    progress: (stats: UserStats) => ({ current: Math.min(stats.gearChecklist.length, 10), total: 10 })
  },
  {
    id: 'transporter',
    title: 'Transportér',
    description: 'První vozidlo jednotky Junior je připraveno k nasazení.',
    howToUnlock: 'Vybrat a potvrdit model kočárku v konfigurátoru (Kasa → Konfigurátor Kočárku).',
    icon: 'Car',
    rarity: 'rare',
    xpReward: 300,
    condition: (stats: UserStats) => !!stats.vehicleModel && stats.vehicleModel.length > 2
  },
  {
    id: 'warm_supplies',
    title: 'Teplé Zásoby',
    description: 'Logistika stravování zajištěna. Jednotka nebude hladovět.',
    howToUnlock: 'Zaškrtnout lahvičku nebo kartáč na lahve v inventáři, nebo přidat vlastní ohřívač.',
    icon: 'Milk',
    rarity: 'common',
    xpReward: 150,
    condition: (stats: UserStats) =>
      stats.gearChecklist.includes('g24') ||
      stats.gearChecklist.includes('g25') ||
      (stats.customGear || []).some(g => g.label.toLowerCase().includes('ohřívač') && g.bought)
  },
  {
    id: 'first_contact',
    title: 'První Kontakt',
    description: 'Cíl potvrdil svou přítomnost. Komunikace navázána.',
    howToUnlock: 'Nahlásit první kopanec Juniora (Průzkum Bojiště → Časovač Pohybů → Nahlásit První Kopanec).',
    icon: 'Waves',
    rarity: 'epic',
    xpReward: 500,
    condition: (stats: UserStats) => !!stats.firstKickDetected
  },

  // --- NEW TACTICAL ACHIEVEMENTS ---
  {
    id: 'f1_mechanic',
    title: 'F1 Mechanik',
    description: 'Blesková instalace autosedačky pod 12 vteřin.',
    howToUnlock: 'Dosáhnout času pod 12s v mini-hře Rychlé nasazení (Instalace autosedačky).',
    icon: 'Car',
    rarity: 'epic',
    xpReward: 350,
    condition: (stats: UserStats) => !!stats.speedBuildScores?.['car-seat'] && stats.speedBuildScores['car-seat'] < 12,
    progress: (stats: UserStats) => ({
      current: stats.speedBuildScores?.['car-seat'] ? Math.floor(100 - (stats.speedBuildScores['car-seat'] / 12 * 100)) : 0,
      total: 100
    })
  },
  {
    id: 'diaper_ninja',
    title: 'Přebalovací Ninja',
    description: 'Zvládnutí sanitární očisty pod 45 vteřin.',
    howToUnlock: 'Dosáhnout času pod 45s v mini-hře Rychlé nasazení (Bleskové přebalování).',
    icon: 'Zap',
    rarity: 'epic',
    xpReward: 350,
    condition: (stats: UserStats) => !!stats.speedBuildScores?.['diaper-change'] && stats.speedBuildScores['diaper-change'] < 45
  },
  {
    id: 'bat_ear',
    title: 'Netopýří ucho',
    description: 'Série 5 správných identifikací pláče v řadě.',
    howToUnlock: 'Získat sérii 5 správných odpovědí v Akustickém radaru.',
    icon: 'Volume2',
    rarity: 'rare',
    xpReward: 250,
    condition: (stats: UserStats) => (stats.soundIDStats?.bestStreakValue || 0) >= 5,
    progress: (stats: UserStats) => ({ current: Math.min(stats.soundIDStats?.bestStreakValue || 0, 5), total: 5 })
  },
  {
    id: 'acoustic_expert',
    title: 'Akustický expert',
    description: 'Vysoká přesnost analýzy signálu.',
    howToUnlock: 'Dosáhnout úspěšnosti přes 90 % v Akustickém radaru (min. 10 pokusů).',
    icon: 'Headphones',
    rarity: 'legendary',
    xpReward: 500,
    condition: (stats: UserStats) => {
      const s = stats.soundIDStats;
      if (!s || s.totalAttempts < 10) return false;
      return (s.correctAnswers / s.totalAttempts) >= 0.9;
    }
  },
  {
    id: 'translator',
    title: 'Tlumočník',
    description: 'Aktivní studium komunikačních protokolů Velitelky.',
    howToUnlock: 'Otevřít Komunikační manuál alespoň 10x.',
    icon: 'MessageSquare',
    rarity: 'common',
    xpReward: 100,
    condition: (stats: UserStats) => (stats.manualViewsCount || 0) >= 10,
    progress: (stats: UserStats) => ({ current: Math.min(stats.manualViewsCount || 0, 10), total: 10 })
  },
  {
    id: 'night_watch',
    title: 'Noční hlídka',
    description: 'Bdělost v hodinách, kdy zbytek světa spí.',
    howToUnlock: 'Otevřít aplikaci mezi půlnocí a 4. hodinou ranní.',
    icon: 'Moon',
    rarity: 'rare',
    xpReward: 200,
    condition: (stats: UserStats) => !!stats.nightWatchTriggered
  },
  {
    id: 'sanitary_officer',
    title: 'Sanitární důstojník',
    description: 'Kompletní zajištění hygienických a dekontaminačních prostředků.',
    howToUnlock: 'Pořídit všechny položky v kategorii Dekontaminace (Hygiena) v Inventáři.',
    icon: 'ShieldCheck',
    rarity: 'epic',
    xpReward: 400,
    condition: (stats: UserStats) => {
      // Look for hygiene items in GEAR_CHECKLIST
      // This is a bit complex as GEAR_CHECKLIST is in the same file, 
      // but exported as an array of categories.
      // For now, we'll check if important items are checked.
      const hygieneIds = ['g30', 'g34', 'g31', 'g32', 'g37', 'g38', 'g35', 'g36', 'g39', 'g33'];
      return hygieneIds.every(id => stats.gearChecklist.includes(id));
    },
    progress: (stats: UserStats) => {
      const hygieneIds = ['g30', 'g34', 'g31', 'g32', 'g37', 'g38', 'g35', 'g36', 'g39', 'g33'];
      const count = hygieneIds.filter(id => stats.gearChecklist.includes(id)).length;
      return { current: count, total: hygieneIds.length };
    }
  },
  {
    id: 'crisis_manager',
    title: 'Krizový manažer',
    description: 'Znalost nouzových postupů a krizových kontaktů.',
    howToUnlock: 'Prohlédnout si sekci Nouzové protokoly a ICE kartu.',
    icon: 'ShieldAlert',
    rarity: 'rare',
    xpReward: 200,
    condition: (stats: UserStats) => !!stats.emergencyProtocolsViewed
  },
  {
    id: 'final_countdown',
    title: 'Vstup do finále',
    description: 'Jednotka vstupuje do 3. trimestru. Mobilizace vrcholí.',
    howToUnlock: 'Dosáhnout 28. týdne těhotenství.',
    icon: 'Flag',
    rarity: 'epic',
    xpReward: 600,
    condition: (stats: UserStats) => {
      if (!stats.dueDate) return false;
      const due = new Date(stats.dueDate);
      const now = new Date();
      const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      const currentWeek = 40 - Math.ceil(diffDays / 7);
      return currentWeek >= 28;
    }
  },
  {
    id: 'promotion',
    title: 'Povýšení',
    description: 'Za mimořádné zásluhy a nasbírané zkušenosti.',
    howToUnlock: 'Dosáhnout celkem 2500 XP.',
    icon: 'TrendingUp',
    rarity: 'rare',
    xpReward: 300,
    condition: (stats: UserStats) => stats.points >= 2500,
    progress: (stats: UserStats) => ({ current: Math.min(stats.points, 2500), total: 2500 })
  },
  {
    id: 'name_confirmed',
    title: 'Kódové označení',
    description: 'Výběr jména pro nového člena jednotky dokončen.',
    howToUnlock: 'Vybrat a potvrdit jméno v sekci Nominace Juniora.',
    icon: 'Heart',
    rarity: 'rare',
    xpReward: 300,
    condition: (stats: UserStats) => stats.babyNames.some(n => n.selected)
  },
  {
    id: 'logistic_master',
    title: 'Mistr logistiky',
    description: 'Bojový rozpočet a logistický plán je připraven.',
    howToUnlock: 'Vytvořit položky v sekci Plánování rozpočtu.',
    icon: 'Wallet',
    rarity: 'rare',
    xpReward: 250,
    condition: (stats: UserStats) => Object.keys(stats.budgetPlan || {}).length > 0
  },
  {
    id: 'tactic_expert',
    title: 'Expert na taktiku',
    description: 'Vlastní operační plány a specifické rozkazy.',
    howToUnlock: 'Vytvořit alespoň 5 vlastních misí.',
    icon: 'FileText',
    rarity: 'epic',
    xpReward: 400,
    condition: (stats: UserStats) => (stats.customMissions?.length || 0) >= 5,
    progress: (stats: UserStats) => ({ current: Math.min(stats.customMissions?.length || 0, 5), total: 5 })
  },
  {
    id: 'emergency_net',
    title: 'Záchranná síť',
    description: 'Komplexní síť nouzových kontaktů pro krizové situace.',
    howToUnlock: 'Přidat alespoň 3 záložní kontakty.',
    icon: 'UserPlus',
    rarity: 'rare',
    xpReward: 200,
    condition: (stats: UserStats) => (stats.backupContacts?.length || 0) >= 3,
    progress: (stats: UserStats) => ({ current: Math.min(stats.backupContacts?.length || 0, 3), total: 3 })
  },
  {
    id: 'vehicle_configurator',
    title: 'Vozová hradba',
    description: 'Transportní modul je nakonfigurován pro maximální bezpečí.',
    howToUnlock: 'Vybrat typ vozidla v sekci Logistika.',
    icon: 'Settings',
    rarity: 'common',
    xpReward: 150,
    condition: (stats: UserStats) => !!stats.vehicleModel
  }
];


// Defined 10 Lunar Months Structure
export const PREGNANCY_STAGES = [
  { week: 4, milestone: '1. MĚSÍC: OPERACE PRŮZKUMNÍK', description: 'Detekce signálu a prvotní analýza terénu.' },
  { week: 8, milestone: '2. MĚSÍC: OPERACE STAVITEL', description: 'Zahájení konstrukčních prací na základních systémech.' },
  { week: 12, milestone: '3. MĚSÍC: OPERACE KOLAUDACE', description: 'Ukončení prvního trimestru a stabilizace systémů.' },
  { week: 16, milestone: '4. MĚSÍC: OPERACE LOGISTICKÝ PRŮLOM', description: 'Začátek "zlatého věku", příprava zásobování.' },
  { week: 20, milestone: '5. MĚSÍC: OPERACE KONSTRUKČNÍ VRCHOL', description: 'Poločas rozpadu. Velký screening a gender reveal.' },
  { week: 24, milestone: '6. MĚSÍC: OPERACE HLOUBKOVÝ TEST', description: 'Testování životaschopnosti a sluchových senzorů.' },
  { week: 28, milestone: '8. MĚSÍC: LOGISTICKÉ FINÁLE', description: 'Monitorování pohybů a spánku. Příprava na sestup.' },
  { week: 32, milestone: '8. MĚSÍC: OPERACE MOBILIZACE', description: 'Finalizace výbavy a příprava evakuačních plánů.' },
  { week: 36, milestone: '9. MĚSÍC: OPERACE FINÁLNÍ KONTAKT', description: 'Systém je v podstatě hotový. Čekání na spouštěcí signál.' },
  { week: 40, milestone: '10. MĚSÍC: OSTRÝ START (POROD)', description: 'Jednotka v nejvyšší pohotovosti. Okamžité nasazení.' }
];

export const WEEKLY_INTEL: Record<number, string> = {
  1: "REPORT STAVU: TÝDEN 01\n\n1. Zahájen restart operačního systému Velitelky.\n2. Probíhá čištění paměti a příprava na nový cyklus.\n3. Hormonální hladiny (Estrogen/Progesteron) klesají na základní úroveň.\n4. Sliznice ubikace (dělohy) se obnovuje.\n5. Subjekt 'Junior' zatím existuje pouze jako myšlenkový koncept v HQ.\n6. Taktická poznámka: Ideální čas na plánování logistiky.\n7. Doporučení: Zahájit suplementaci kyseliny listové.\n8. Psychologický stav: Očekávání vs. Realita.\n9. Fyzický stav Velitelky: Menstruační fáze.\n10. Status mise: Příprava na vylodění.",
  2: "REPORT STAVU: TÝDEN 02\n\n1. Detekována ovulace. Cíl zaměřen.\n2. Uvolnění vajíčka do sektoru Vejcovod.\n3. Hormonální bouře (LH pík) aktivuje naváděcí systémy.\n4. Ideální okno pro nasazení speciálních jednotek (Spermies).\n5. Zvýšená teplota jádra Velitelky signalizuje připravenost.\n6. Hlenová zátka mění konzistenci pro usnadnění průniku.\n7. Taktická poznámka: Maximální nasazení v ložnici.\n8. Šance na úspěch mise: 20-30% v tomto cyklu.\n9. Doporučení: Minimalizovat stres, maximalizovat relax.\n10. Status mise: Aktivní pokus o spojení.",

  3: "REPORT STAVU: TÝDEN 03\n\n1. SPOJENÍ POTVRZENO! Vajíčko bylo úspěšně obsazeno.\n2. Genetický kód (DNA) byl nahrán a sloučen. Pohlaví je již určeno!\n3. Vzniká zygota - první buňka nové generace.\n4. Zahájeno rapidní buněčné dělení (Mitóza).\n5. Přesun jednotky směr Základna (Děloha).\n6. Cesta trvá cca 3-4 dny. Jednotka je v režimu utajení.\n7. Imunitní systém Velitelky zatím o vetřelci neví.\n8. Velikost subjektu: Mikroskopická tečka.\n9. Taktická poznámka: Velitelka může cítit zvláštní únavu.\n10. Status mise: Infiltrace probíhá.",

  4: "REPORT STAVU: TÝDEN 04\n\n1. Úspěšné přistání! Blastocysta se zavrtává do stěny dělohy.\n2. Spuštěna produkce hCG hormonu (signální světlice pro testy).\n3. Těhotenský test by měl nyní ukázat dvě čárky.\n4. Dělí se na dvě skupiny: jedna tvoří Plod, druhá Placentu.\n5. Vynechání menstruace - první viditelný důkaz úspěchu.\n6. Velitelka může pociťovat 'implantační špinění'.\n7. Prsa začínají být citlivá - kalibrace mléčných žláz.\n8. Velikost subjektu: Makové zrnko.\n9. Taktická poznámka: Kup digitální test a květinu.\n10. Status mise: OFICIÁLNĚ TĚHOTNÁ.",

  5: "REPORT STAVU: TÝDEN 05\n\n1. Kritický upgrade: Vyvíjí se neurální trubice (budoucí mozek a mícha).\n2. Instalace centrální hydraulické pumpy (Srdce).\n3. První rytmické stahy srdečního svalu.\n4. Začíná se formovat oběhový systém.\n5. Subjekt má nyní tvar malého pulce.\n6. Měří cca 2 mm. Viditelné pouhým okem (teoreticky).\n7. Velitelka hlásí ranní nevolnosti (reakce na hCG).\n8. Únava Velitelky dosahuje kritických hodnot.\n9. Taktická poznámka: Převezmi vaření. Pachy jsou nepřítel.\n10. Status mise: Vitální funkce naskakují.",

  6: "REPORT STAVU: TÝDEN 06\n\n1. Srdce bije frekvencí 100-160 BPM (2x rychleji než tvoje).\n2. Uzavírání neurální trubice dokončeno.\n3. Formují se základy pro oči a uši (černé tečky).\n4. Pučí základy končetin (malé ploutvičky).\n5. Játra, plíce a slinivka jsou ve fázi hrubé stavby.\n6. Velikost subjektu: Čočka (4-5 mm).\n7. Velitelka může trpět častým močením (tlak na měchýř).\n8. Náladovost Velitelky: Extrémní výkyvy. Pozor!\n9. Taktická poznámka: Buď trpělivý a měj po ruce zázvorová lízátka.\n10. Status mise: Strukturální integrita se zvyšuje.",

  7: "REPORT STAVU: TÝDEN 07\n\n1. Rychlý růst hlavy (ukládání mozkové kapacity).\n2. Končetiny se prodlužují, dělí se na segmenty rameno/loket.\n3. Vznikají nozdry. Systém sání vzduchu v přípravě.\n4. Kůže je průsvitná jako pergamen. Viditelné žíly.\n5. Ledviny jsou na místě, připraveny k filtraci.\n6. Srdce se dělí na levou a pravou komoru.\n7. Velikost subjektu: Borůvka (1 cm).\n8. Velitelka může mít chutě na bizarní kombinace jídla.\n9. Taktická poznámka: Nezpochybňuj nakládané okurky se šlehačkou.\n10. Status mise: Formování avatara.",

  8: "REPORT STAVU: TÝDEN 08\n\n1. Subjekt ztrácí 'ocásek'. Vypadá více jako člověk.\n2. Prsty na rukou a nohou jsou spojené blánami (jako žába).\n3. Oční víčka překrývají oči. Senzory se kalibrují ve tmě.\n4. Vznikají chuťové pohárky. Příprava na ochutnávku plodové vody.\n5. Neurony se propojují miliardovou rychlostí.\n6. Subjekt se začíná hýbat (zatím necítíš).\n7. Velikost subjektu: Malina (1.6 cm).\n8. Děloha se zvětšuje na velikost grapefruitu.\n9. Taktická poznámka: První velký ultrazvuk se blíží.\n10. Status mise: Přechod z embrya na plod.",

  9: "REPORT STAVU: TÝDEN 09\n\n1. Srdce je plně vyvinuto (čtyři komory).\n2. Prsty se oddělily, blány zmizely.\n3. Vznikají základy zubů (pod dásněmi).\n4. Svalový systém posiluje. Pohyby jsou koordinovanější.\n5. Placenta přebírá produkci hormonů. Support team jede naplno.\n6. Velikost subjektu: Oliva (2.3 cm).\n7. Velitelka může mít ucpaný nos (těhotenská rýma).\n8. Rozšíření pasu Velitelky (zatím jen mírné).\n9. Taktická poznámka: Kup jí pohodlné oblečení/tepláky.\n10. Status mise: Miniaturizace dokončena.",

  10: "REPORT STAVU: TÝDEN 10\n\n1. Konec embryonální fáze! Nyní je to oficiálně PLOD.\n2. Všechny životně důležité orgány jsou založeny.\n3. Klouby jsou funkční (lokty, kolena, zápěstí).\n4. Žaludek produkuje trávicí šťávy.\n5. Ledviny produkují moč (do plodové vody).\n6. Pokud je to kluk, začíná produkce testosteronu.\n7. Velikost subjektu: Sušená švestka (3 cm).\n8. Riziko vrozených vad výrazně klesá.\n9. Taktická poznámka: Oslavte to (nealko pro ni).\n10. Status mise: Kritický milník překročen.",

  11: "REPORT STAVU: TÝDEN 11\n\n1. Hlava tvoří 50% délky těla. Priorita: Růst mozku.\n2. Kůže začíná tloustnout, přestává být průhledná.\n3. Rostou nehty na prstech (budoucí zbraně).\n4. Subjekt začíná polykat plodovou vodu. Trénink trávení.\n5. Genitálie jsou viditelné (ale na UZ ještě těžko rozeznatelné).\n6. Začíná růst ochlupení (folikuly).\n7. Velikost subjektu: Limetka (4 cm).\n8. Nevolnosti Velitelky by měly ustupovat.\n9. Taktická poznámka: Plánujte dovolenou (babymoon).\n10. Status mise: Stabilizace systému.",

  12: "REPORT STAVU: TÝDEN 12\n\n1. KONEC PRVNÍHO TRIMESTRU! Riziko potratu dramaticky klesá.\n2. Subjekt reaguje na vnější podněty (reflexy).\n3. Střeva se stahují z pupeční šňůry do břišní dutiny.\n4. Hypofýza v mozku začíná pracovat.\n5. Kostra začíná tvrdnout (osifikace).\n6. Subjekt zívá a 'cvičí' dýchání.\n7. Velikost subjektu: Švestka (5.4 cm).\n8. Velitelka začíná mít více energie.\n9. Taktická poznámka: Čas oznámit to rodině/světu?\n10. Status mise: Level 1 dokončen.",

  13: "REPORT STAVU: TÝDEN 13\n\n1. Začíná druhý trimestr - Zlatý věk těhotenství.\n2. Tvoří se otisky prstů. Unikátní ID vygenerováno.\n3. Hlasivky se vyvíjejí. Příprava na zvukový výstup.\n4. Játra začínají vylučovat žluč.\n5. Slinivka začíná produkovat inzulín.\n6. Subjekt má velikost broskve (7.4 cm).\n7. Libido Velitelky se může vrátit (nebo zvýšit!).\n8. Viditelné 'těhotenské břicho' začíná růst.\n9. Taktická poznámka: Buď připraven v ložnici.\n10. Status mise: Expanze a Růst.",

  14: "REPORT STAVU: TÝDEN 14\n\n1. Tělo roste rychleji než hlava. Proporce se vyrovnávají.\n2. Krk se prodlužuje, hlava se napřimuje.\n3. Roste Lanugo - jemné chloupky pokrývající celé tělo (termoizolace).\n4. Subjekt se šklebí a mračí (trénink obličejových svalů).\n5. Štítná žláza je plně funkční.\n6. U dívek sestupují vaječníky do pánve.\n7. Velikost subjektu: Citron (8.7 cm).\n8. Velitelka se cítí lépe, pleť září (těhotenský glow).\n9. Taktická poznámka: Skládej komplimenty. Hodně.\n10. Status mise: Vizuální upgrade.",

  15: "REPORT STAVU: TÝDEN 15\n\n1. Subjekt vnímá světlo přes zavřená víčka.\n2. Chuťové pohárky jsou aktivní. Ochutnává co Velitelka jí (přes plodovou vodu).\n3. Kosti jsou pevnější, viditelné na rentgenu (nedělat!).\n4. Nohy jsou delší než ruce.\n5. Subjekt je velmi aktivní, dělá salta (zatím necítíš).\n6. Srdce pumpuje cca 28 litrů krve denně.\n7. Velikost subjektu: Pomeranč (10 cm, 70g).\n8. Velitelka může mít problémy s dásněmi (krvácení).\n9. Taktická poznámka: Kup jí měkký kartáček.\n10. Status mise: Aktivní manévry.",

  16: "REPORT STAVU: TÝDEN 16\n\n1. ODHALENÍ POHLAVÍ! Na dobrém UZ už je to vidět.\n2. Subjekt drží hlavu vzpřímeně.\n3. Oči se přesouvají z boků doprostřed obličeje.\n4. Uši jsou téměř na finální pozici.\n5. Srdce pracuje s vojenskou přesností.\n6. Močový měchýř se vyprazdňuje každých 40 minut.\n7. Velikost subjektu: Avokádo (11.6 cm, 100g).\n8. Velitelka může cítit 'motýlky' v břiše (první pohyby).\n9. Taktická poznámka: Připrav se na gender reveal party?\n10. Status mise: Identifikace jednotky.",

  17: "REPORT STAVU: TÝDEN 17\n\n1. Začíná se ukládat 'hnědý tuk' (zdroj tepla po narození).\n2. Pupeční šňůra je silná a pružná (záchranné lano).\n3. Potní žlázy se vyvíjejí.\n4. Kostra se mění z chrupavky na kost (osifikace).\n5. Subjekt reaguje na hlasité zvuky leknutím.\n6. Vernonix caseosa (mázek) začíná pokrývat kůži (voděodolný nátěr).\n7. Velikost subjektu: Hruška (13 cm, 140g).\n8. Velitelka může mít problémy s rovnováhou (změna těžiště).\n9. Taktická poznámka: Nepřesouvej nábytek bez varování.\n10. Status mise: Zesílení pancíře.",

  18: "REPORT STAVU: TÝDEN 18\n\n1. Sluch je aktivní! Uši zachycují zvuky zvenčí.\n2. Subjekt slyší tvůj hlas, tlukot srdce Velitelky, trávení.\n3. Sítnice oka se stává citlivou na světlo.\n4. Genitálie jsou jasně viditelné.\n5. Subjekt umí zívat a škytat.\n6. Nervová vlákna se obalují myelinem (izolace).\n7. Velikost subjektu: Batát (14 cm, 190g).\n8. Velitelka má zvýšenou chuť k jídlu.\n9. Taktická poznámka: Mluv na břicho. Junior tě poslouchá.\n10. Status mise: Komunikační kanály otevřeny.",

  19: "REPORT STAVU: TÝDEN 19\n\n1. Smysly se specializují v mozku (čich, chuť, zrak, sluch, hmat).\n2. Kůže produkuje mázek (Vernix) - ochrana před rozmočením.\n3. Ledviny filtrují moč efektivně.\n4. Vlasy začínají růst na hlavě.\n5. U dívek se tvoří vajíčka ve vaječnících (6 milionů!).\n6. Pohyby jsou silnější - kopance jsou cítit rukou.\n7. Velikost subjektu: Mango (15 cm, 240g).\n8. Velitelka může trpět křečemi v nohou a pálením žáhy.\n9. Taktická poznámka: Masíruj jí nohy. Každý večer.\n10. Status mise: Smyslová kalibrace.",

  20: "REPORT STAVU: TÝDEN 20\n\n1. POLOVINA MISE! Gratuluji, vojáku.\n2. Subjekt pozná tvůj hlas a uklidní se při něm.\n3. Imunitní systém se začíná vyvíjet.\n4. Střeva produkují mekonium (první stolice, černá a lepivá).\n5. Nehty na nohou rostou.\n6. Velký ultrazvuk (screening) kontroluje všechny orgány.\n7. Velikost subjektu: Banán (25 cm, 300g) - měří se už od hlavy k patě!\n8. Pupík Velitelky se může 'vyloupnout' ven.\n9. Taktická poznámka: Jdi na screening s ní. Je to rozkaz.\n10. Status mise: 50% Loading Complete.",

  21: "REPORT STAVU: TÝDEN 21\n\n1. Trávicí systém trénuje polykání plodové vody (cukry se vstřebávají).\n2. Kostní dřeň přebírá tvorbu krvinek od jater.\n3. Obočí a řasy jsou plně vyvinuté.\n4. Spánkové cykly se ustalují (bdění vs. spánek).\n5. Pohyby jsou koordinované, žádné náhodné záškuby.\n6. U chlapců sestupují varlata.\n7. Velikost subjektu: Mrkev (26 cm, 360g).\n8. Velitelka může mít strie (trhliny v plášti).\n9. Taktická poznámka: Kup jí krém na strie a řekni, že je krásná.\n10. Status mise: Energetická nezávislost.",

  22: "REPORT STAVU: TÝDEN 22\n\n1. Hmatové senzory jsou plně funkční.\n2. Subjekt zkoumá své okolí, chytá pupeční šňůru.\n3. Oči jsou vyvinuté, ale duhovka (barva) postrádá pigment.\n4. Pankreas produkuje hormony stabilně.\n5. Zoubky jsou připraveny v dásních.\n6. Subjekt vypadá jako miniaturní novorozenec, jen hubený.\n7. Velikost subjektu: Kokos (27 cm, 430g).\n8. Velitelka může být zadýchaná (děloha tlačí na plíce).\n9. Taktická poznámka: Nepořádej závody v běhu.\n10. Status mise: Hmatový průzkum.",

  23: "REPORT STAVU: TÝDEN 23\n\n1. Sluch je ostrý. Hlasité zvuky (sbíječka, koncert) subjekt děsí.\n2. Plíce trénují dýchací pohyby (bez vzduchu).\n3. Kůže je vrásčitá a červená (průsvitná).\n4. Keratinizace kůže začíná (zpevňování povrchu).\n5. Subjekt reaguje na pohyb Velitelky (kolébání ho uspává).\n6. Rovnovážný orgán v uchu je funkční (ví, kde je nahoře/dole).\n7. Velikost subjektu: Grapefruit (28 cm, 500g).\n8. Velitelka může mít oteklé kotníky.\n9. Taktická poznámka: Vylož nohy nahoru. Doslova.\n10. Status mise: Audio monitoring.",

  41: "REPORT STAVU: TÝDEN 41\n\n1. PŘESLUHUJEME! Subjekt je připraven, ale čeká na správný signál.\n2. Placenta stárne, ale stále funguje.\n3. Plodová voda se může snižovat.\n4. Subjekt je plně vyvinutý, jen nabírá váhu.\n5. Lékař zvažuje indukci porodu.\n6. Monitorování je intenzivnější (CTG, ultrazvuk).\n7. Velikost subjektu: Malý meloun (51 cm, 3500g+).\n8. Velitelka je netrpělivá a unavená.\n9. Taktická poznámka: Buď trpělivý. Příroda má svůj timing.\n10. Status mise: Prodloužené čekání.",

  42: "REPORT STAVU: TÝDEN 42\n\n1. KRITICKÁ FÁZE! Indukce porodu je pravděpodobná.\n2. Rizika se zvyšují (stárnutí placenty, nízká plodová voda).\n3. Lékařský tým převzal velení.\n4. Subjekt je v pořádku, ale prostředí se zhoršuje.\n5. Hospitalizace a indukce jsou na pořadu dne.\n6. Monitorování je nepřetržité.\n7. Velikost subjektu: Velký meloun (52 cm, 3600g+).\n8. Velitelka je fyzicky i psychicky vyčerpaná.\n9. Taktická poznámka: Důvěřuj lékařům. Jsou to profesionálové.\n10. Status mise: EVAKUACE ZAHÁJENA.",

  24: "REPORT STAVU: TÝDEN 24\n\n1. HRANICE VIABILITY! Subjekt má šanci přežít mimo základnu (s intenzivní péčí).\n2. Plíce začínají tvořit surfaktant (látka bránící slepení plicních sklípků).\n3. Rychlý nárůst váhy (svaly a tuk).\n4. Obličej je plně formovaný.\n5. Chuťové buňky rozeznávají sladké, slané, hořké.\n6. Bílé krvinky se tvoří (obrana proti infekci).\n7. Velikost subjektu: Kukuřice (30 cm, 600g).\n8. Test na těhotenskou cukrovku (OGTT) pro Velitelku.\n9. Taktická poznámka: Bude muset pít hnusnou sladkou vodu. Souciť s ní.\n10. Status mise: Bod zvratu.",

  25: "REPORT STAVU: TÝDEN 25\n\n1. Nosní dírky se otevírají. Čichové receptory fungují.\n2. Ruce mají preferenci (pravák/levák se rozhoduje nyní).\n3. Páteř se zpevňuje, struktura je pevná.\n4. Krevní cévy v plicích se vyvíjejí.\n5. Subjekt reaguje na světlo baterky přiložené k břichu.\n6. Barva vlasů a očí je geneticky dána, pigment se tvoří.\n7. Velikost subjektu: Květák (34 cm, 660g).\n8. Vlasy Velitelky jsou husté a lesklé (hormony brání vypadávání).\n9. Taktická poznámka: Pochval jí hřívu.\n10. Status mise: Jemná motorika.",

  26: "REPORT STAVU: TÝDEN 26\n\n1. OČI SE OTEVÍRAJÍ! Subjekt poprvé mrká.\n2. Duhovky jsou modré (barva se změní až po narození).\n3. Mozkové vlny vykazují reakci na dotek a zvuk.\n4. Srdeční tep klesá na 140 BPM.\n5. Sací reflex se zdokonaluje (cucá si palec).\n6. Alveoly (plicní sklípky) se množí.\n7. Velikost subjektu: Hlávkový salát (35 cm, 760g).\n8. Velitelka nemůže v noci spát (nepohodlí).\n9. Taktická poznámka: Kup jí kojící polštář na spaní. Hned.\n10. Status mise: Vizuální systém online.",

  27: "REPORT STAVU: TÝDEN 27\n\n1. Mozková aktivita rapidně roste. Povrch mozku se začíná zvrásňovat.\n2. Subjekt má pravidelné intervaly spánku a bdění.\n3. Možná se mu zdají sny (REM fáze spánku detekována).\n4. Škytavka je častá (cítíš rytmické škubání břicha).\n5. Chuťové preference se formují podle toho, co jí Velitelka.\n6. Sítnice je plně vyvinutá.\n7. Velikost subjektu: Kedlubna (36 cm, 875g).\n8. Konec druhého trimestru!\n9. Taktická poznámka: Připrav se na finální fázi. Třetí trimestr je jízda.\n10. Status mise: Kognitivní funkce.",

  28: "REPORT STAVU: TÝDEN 28\n\n1. ZAČÍNÁ TŘETÍ TRIMESTR. Cílová rovinka.\n2. Subjekt umí plakat (ale bez vzduchu není slyšet).\n3. Tukové zásoby uhlazují vrásčitou kůži.\n4. Tělesná teplota se začíná regulovat sama.\n5. Řasy jsou dlouhé a funkční.\n6. Subjekt se začíná otáčet hlavou dolů (příprava na sestup).\n7. Velikost subjektu: Lilek (37 cm, 1 kg).\n8. Velitelka je ve 3. trimestru unavená a velká.\n9. Taktická poznámka: Zavaž jí tkaničky. Už si na ně nedosáhne.\n10. Status mise: Logistické finále.",

  29: "REPORT STAVU: TÝDEN 29\n\n1. Imunitní transfer: Protilátky přecházejí z krve matky do plodu.\n2. Kosti jsou plně zkostnatělé (ale lebka měkká).\n3. Mozek řídí dýchání a teplotu.\n4. Pohyby jsou silné, málo místa na manévrování.\n5. Kůže ztrácí průhlednost.\n6. Oči se pohybují v důlcích.\n7. Velikost subjektu: Máslová dýně (38 cm, 1.15 kg).\n8. Křečové žíly a hemoroidy ohrožují Velitelku.\n9. Taktická poznámka: Buď empatický. Je to pro ni těžké.\n10. Status mise: Ochranné štíty (imunita).",

  30: "REPORT STAVU: TÝDEN 30\n\n1. Kostní dřeň je hlavním producentem krve.\n2. Lanugo (chloupky) začíná mizet.\n3. Nehty dorůstají ke konečkům prstů.\n4. Povrch mozku je složitě zvrásněný (zvyšování kapacity).\n5. Subjekt vnímá své okolí komplexně.\n6. Produkce trávicích enzymů.\n7. Velikost subjektu: Zelí (39 cm, 1.3 kg).\n8. Velitelka bojuje s pálením žáhy a dušností.\n9. Taktická poznámka: Nos jí polštáře navíc pod záda.\n10. Status mise: Optimalizace kapacity.",

  31: "REPORT STAVU: TÝDEN 31\n\n1. Všech 5 smyslů je plně funkčních.\n2. Zorničky reagují na světlo (stahují se/rozahují).\n3. Podkožní tuk se rychle ukládá, subjekt se 'zakulacuje'.\n4. Dlouhé periody REM spánku.\n5. Močový měchýř vylučuje půl litru moči denně.\n6. Plíce jsou jediný orgán, který ještě není 100% hotový.\n7. Velikost subjektu: Kokosový ořech (41 cm, 1.5 kg).\n8. Braxton-Hicks kontrakce (poslíčci) trénují dělohu.\n9. Taktická poznámka: Začni měřit intervaly kontrakcí (pro jistotu).\n10. Status mise: Smyslová integrace.",

  32: "REPORT STAVU: TÝDEN 32\n\n1. Subjekt trénuje otevírání očí při bdění a zavírání při spánku.\n2. Nehty jsou kompletní.\n3. Vlasy na hlavě jsou viditelné (u některých).\n4. Kostra je celá, ale pružná.\n5. Imunitní systém se stále nabíjí protilátkami.\n6. Poloha: Pravděpodobně hlavou dolů.\n7. Velikost subjektu: Jicama / Vodnice (42 cm, 1.7 kg).\n8. Velitelka má oteklé nohy a ruce.\n9. Taktická poznámka: Sundej jí prstýnky, dokud to jde.\n10. Status mise: Příprava na start.",

  33: "REPORT STAVU: TÝDEN 33\n\n1. Lebka je složena z 5 desek, které se mohou překrývat (pro průchod porodními cestami).\n2. Kosti lebeční nejsou srostlé (fontanely).\n3. Subjekt rychle přibírá - 200g týdně.\n4. Amniotická tekutina dosáhla maxima, teď bude ubývat.\n5. Koordinace sání a polykání je perfektní.\n6. Vlastní imunita začíná fungovat.\n7. Velikost subjektu: Ananas (43 cm, 1.9 kg).\n8. Syndrom karpálního tunelu u Velitelky (brnění rukou).\n9. Taktická poznámka: Masáž rukou a zápěstí.\n10. Status mise: Hardwarová flexibilita.",

  34: "REPORT STAVU: TÝDEN 34\n\n1. První stolice (smolka/mekonium) je připravena ve střevech.\n2. U chlapců varlata sestoupila do šourku.\n3. Ochranná vrstva vernix caseosa houstne.\n4. Nadledvinky produkují hormony pro laktaci u matky.\n5. Pokud by se teď narodil, má >99% šanci na přežití bez následků.\n6. Kůže je hladká a růžová.\n7. Velikost subjektu: Kantalup (45 cm, 2.1 kg).\n8. Zrak Velitelky se může rozostřit (hormony + zadržování vody).\n9. Taktická poznámka: Buď její řidič. Nepouštěj ji za volant.\n10. Status mise: Systémy 'Go' pro předčasný start.",

  35: "REPORT STAVU: TÝDEN 35\n\n1. Játra a ledviny jsou plně funkční a čistí odpad.\n2. Fyzický vývoj je z 99% hotov. Nyní se jen 'nabírá hmota'.\n3. Subjekt zaujímá startovní pozici v pánvi.\n4. Pohyby jsou bolestivé (loket v žebrech).\n5. Mozek váží o 30% víc než před měsícem.\n6. Dásně mají rýhy pro zuby.\n7. Velikost subjektu: Medový meloun (46 cm, 2.4 kg).\n8. Časté močení Velitelky (hlava tlačí na měchýř).\n9. Taktická poznámka: Zmapuj cestu do porodnice. Změř čas.\n10. Status mise: Tankování paliva (tuk).",

  36: "REPORT STAVU: TÝDEN 36\n\n1. Lanugo (chloupky) opadává. Subjekt ho polyká (mňam).\n2. Lebka je stále měkká.\n3. Krevní oběh je perfektní.\n4. Tváře jsou plné (sací polštářky).\n5. Sestup do pánve (klesnutí břicha).\n6. Plíce jsou připraveny na první nádech.\n7. Velikost subjektu: Římský salát (47 cm, 2.6 kg).\n8. 'Hnízdící instinkt' u Velitelky (uklízí jako šílená).\n9. Taktická poznámka: Pomoz jí, ale nenech ji tahat těžké věci.\n10. Status mise: Sestup do startovního bloku.",

  37: "REPORT STAVU: TÝDEN 37\n\n1. DONOŠENO! Oficiální termín 'Early Term'.\n2. Subjekt může dýchat vzduch bez přístrojů.\n3. Úchop ruky je pevný.\n4. Subjekt se otáčí za světlem mimo břicho.\n5. Trávicí systém obsahuje mekonium.\n6. Může se narodit kdykoliv od teď do 42. týdne.\n7. Velikost subjektu: Mangold (48 cm, 2.9 kg).\n8. Hlenová zátka může odejít (signál blížícího se startu).\n9. Taktická poznámka: Měj sbalenou tašku (Hospital Bag) u dveří.\n10. Status mise: Plná pohotovost.",

  38: "REPORT STAVU: TÝDEN 38\n\n1. Vernix se olupuje, zůstává jen v záhybech.\n2. Nehty přesahují špičky prstů (bude se škrábat).\n3. Barva očí je tmavě modrá/šedá (bez pigmentu).\n4. Hlasivky připraveny na první křik (Battle Cry).\n5. Reflexy: Moroův (úlek), sací, úchopový, hledací.\n6. Mozek stále řídí: 'Jíst, Spát, Vylučovat'.\n7. Velikost subjektu: Pór (49 cm, 3 kg).\n8. Velitelka je 'Ready to Pop'. Elektrické výboje v pánvi.\n9. Taktická poznámka: Nabij telefony. Powerbanky. Kamery.\n10. Status mise: T-minus ??? hodin.",

  39: "REPORT STAVU: TÝDEN 39\n\n1. Kůže je nová, růžová/bílá (podle pigmentu).\n2. Hrudník je vypouklý (u chlapců i dívek vlivem hormonů).\n3. Placenta začíná stárnout, dodávky kyslíku mohou klesat.\n4. Protilátky jsou na maximu.\n5. Slzné kanálky ještě nefungují (pláč bez slz).\n6. Čeká se jen na hormonální signál 'EJECT'.\n7. Velikost subjektu: Meloun vodní (50 cm, 3.3 kg).\n8. Kontrakce mohou přijít kdykoliv. Prasknutí vody.\n9. Taktická poznámka: Buď střízlivý. Neustále.\n10. Status mise: Odpočet běží.",

  40: "REPORT STAVU: TÝDEN 40\n\n1. TERMÍN! Mise je u konce, nová začíná.\n2. Do 40. týdne se narodí jen 5% subjektů. Většina má zpoždění.\n3. Lebka je stále flexibilní.\n4. Subjekt má málo místa, pohyby jsou jen vlnění.\n5. Hormony stresu při porodu pomohou nastartovat plíce.\n6. Pokud se nic neděje, nepanikař. Má ještě 2 týdny rezervu.\n7. Velikost subjektu: Dýně (51 cm, 3.5 kg).\n8. Velitelka chce, aby to už skončilo. HNED.\n9. Taktická poznámka: Masáž hráze? (Pokud jste to trénovali).\n10. Status mise: GO GO GO! Hodně štěstí, táto!"
};



export const PREGNANCY_CIPHER = [
  { signal: "Já jsem v pohodě.", translation: "Nejsem. Potřebuju klid, ticho nebo obejmout. A možná čokoládu." },
  { signal: "Dělej si co chceš.", translation: "Jestli to uděláš, budeš mít problém. Zůstaň tady se mnou." },
  { signal: "Máš hlad?", translation: "Já mám hrozný hlad. Prosím, objednej něco dobrého." },
  { signal: "Už se na to moc těším.", translation: "Mám hrozný strach z porodu a potřebuju slyšet, že to spolu zvládneme." },
  { signal: "Vypadám v tom hrozně?", translation: "Cítím se jako tank. Potřebuju potvrdit, že jsem pro tebe pořád ta nejechčí." },
  { signal: "Máme všechno připravené?", translation: "Mám paniku z logistiky. Pojďme spolu ten seznam projít ještě jednou." },
  { signal: "Je mi to jedno.", translation: "Jsem tak unavená, že nedokážu udělat ani jedno rozhodnutí. Rozhodni to za mě." },
  { signal: "Nic mi není.", translation: "Bolí mě úplně všechno, ale nemám sílu to vysvětlovat." },
  { signal: "Cítíš to taky?", translation: "Junior právě udělal salto a já potřebuju sdílet tenhle zázrak." },
];

import { CommunicationEntry } from './types';

export const COMMUNICATION_MANUAL: CommunicationEntry[] = [
  {
    situation: "To je dobrý, já to zvládnu.",
    meaning: "Jsem už hrozně unavená, ale nechci tě pořád úkolovat. Prosím, vezmi mi to z ruky a udělej to za mě."
  },
  {
    situation: "Už mě to břicho hrozně tahá.",
    meaning: "Potřebuji si postěžovat a slyšet, že jsi v tom se mnou. Stačí mě chytit za ruku nebo mě nechat chvíli v klidu sedět."
  },
  {
    situation: "Máme v lednici něco dobrého?",
    meaning: "Mám náhlý propad energie nebo divnou chuť. Pokud tam nic není, byl bys hrdina, kdybys něco vymyslel."
  },
  {
    situation: "Vypadám v tomhle dobře?",
    meaning: "Moje tělo se mění tak rychle, že se v něm občas necítím svá. Potřebuji od tebe potvrdit, že jsem pro tebe pořád přitažlivá."
  },
  {
    situation: "Můžeš mi na chvíli podržet nohy/břicho?",
    meaning: "Hledám fyzickou úlevu od té váhy. Tvoje ruce jsou pro mě ten nejlepší relax."
  },
  {
    situation: "Dneska se mi nechtělo vůbec nic dělat.",
    meaning: "Cítím se provinile, že jsem nebyla produktivní. Řekni mi prosím, že odpočívat je teď moje nejdůležitější práce."
  },
  {
    situation: "Co myslíš ty?",
    meaning: "Cítím velkou zodpovědnost za všechna ta rozhodnutí (kočárek, jméno, výbava). Potřebuji, abys kus té zodpovědnosti přebral ty."
  },
  {
    situation: "Nic se neděje, jsem jen unavená.",
    meaning: "Hormony pracují a mně je prostě do pláče bez jasného důvodu. Jen mě obejmi, nic neřeš a na nic se neptej."
  },
  {
    situation: "Nezapomněl jsi na tu kontrolu u doktora?",
    meaning: "Moc pro mě znamená, když vím, že vývoj našeho miminka sleduješ stejně pozorně jako já."
  },
  {
    situation: "Cítila jsem teď divný pohyb.",
    meaning: "Jsem trochu nervózní, jestli je všechno v pořádku. Potřebuji, abys dal ruku na břicho a byl v tu chvíli se mnou."
  },
  {
    situation: "Myslíš, že budeme dobří rodiče?",
    meaning: "Mám strach z neznáma. Potřebuji slyšet, že jsme tým a že to spolu zvládneme."
  },
  {
    situation: "Dneska mě všechno rozbrečí.",
    meaning: "Moje emoce jsou teď jako na horské dráze. Buď prosím trpělivý, zítra to bude lepší."
  },
  {
    situation: "Potřebovala bych jen trošku klidu.",
    meaning: "Svět kolem je teď hlučný a náročný. Pomoz mi vytvořit bezpečnou bublinu, kde nemusím nic řešit."
  },
  {
    situation: "Dívej, co jsem koupila pro malýho.",
    meaning: "Mám radost z příprav a chci ji s tebou sdílet. I když je to desáté body, oceň můj výběr."
  },
  {
    situation: "Ty už spíš?",
    meaning: "Nemůžu najít polohu, pálí mě žáha nebo se mi honí hlavou myšlenky. Potřebuji si jen minutu popovídat, abych se uklidnila."
  }
];



// Added 'week' property to define when the item becomes relevant/unlocked
export const GEAR_CHECKLIST = [
  {
    category: "Logistika: Velitelka",
    items: [
      { id: "g54", label: "Vitamíny pro partnerku (Kyselina listová/Hořčík)", week: 1, endWeek: 40, tip: "Kyselina listová je základ; hořčík (magnesium) zase pomáhá proti křečím v nohách a tvrdnutí břicha.", condition: "Vždy NOVÁ!" },
      { id: "g52", label: "Ovulační testy (Detekce okna)", week: 1, endWeek: 4, tip: "Slouží k přesnému určení startu mise (početí); po potvrzení těhotenství už je nekupuj.", condition: "Vždy NOVÁ!" },
      { id: "g53", label: "Těhotenský test (Digitální)", week: 4, endWeek: 6, tip: "Nejspolehlivější detekce; digitální displej eliminuje hádání „je tam ta čárka nebo ne?“.", condition: "Vždy NOVÁ!" },
      { id: "g51", label: "Čaj pro těhotné ženy", week: 6, endWeek: 40, tip: "Podporuje hydrataci a minerály; hlídej, aby neobsahoval bylinky, které můžou vyvolat kontrakce (např. šalvěj).", condition: "Vždy NOVÁ!" },
      { id: "g50", label: "Olejíček na strie (Péče o kůži)", week: 10, endWeek: 14, tip: "Promazávat se musí hned, jak začne růst břicho; kůže musí být pružná, aby nepopraskala.", condition: "Vždy NOVÁ!" },
      { id: "g16", label: "Kojící polštář (Podpora stability)", week: 18, endWeek: 22, tip: "Využijete ho už před porodem; mamince pomůže najít pohodlnou polohu při spaní na boku.", condition: "Bazar / Nové" },
      { id: "g18", label: "Kojící podprsenky (2-3 ks)", week: 30, endWeek: 32, tip: "Kupuj je až ke konci; prsa se zvětší i o dvě čísla a kostice by mohly blokovat mlékovody.", condition: "Vždy NOVÁ!" },
      { id: "g17", label: "Vložky do podprsenky (Absorpce)", week: 34, endWeek: 36, tip: "Jednorázové jsou praktičtější na cesty, pratelné jsou příjemnější na kůži (neškrábou).", condition: "Vždy NOVÁ!" },
      { id: "g21", label: "Mastička na bradavky (Purelan)", week: 34, endWeek: 36, tip: "Čistý lanolin; je to zázrak na hojení, který miminku nijak neškodí při krmení.", condition: "Vždy NOVÁ!" },
      { id: "g23", label: "Čaj pro kojící matky (Laktace)", week: 36, endWeek: 38, tip: "Podporuje tvorbu paliva (laktaci); začněte pít až těsně před porodem nebo po něm.", condition: "Vždy NOVÁ!" }
    ]
  },
  {
    category: "Cestování",
    items: [
      { id: "g9", label: "Hlavní Kočárek (Vozidlo)", week: 16, endWeek: 22, tip: "Zkontroluj odpružení a váhu; ty ho budeš skládat do auta a tahat do schodů.", condition: "Bazar / Nové", warning: "Zkontroluj odpružení a skládání do kufru! Bazar ušetří až 60%." },
      { id: "g100", label: "Autosedačka (Vajíčko)", week: 30, endWeek: 40, tip: "Zkontroluj kompatibilitu s kočárkem a autem (Isofix).", condition: "Vždy NOVÁ!", warning: "Nikdy z bazaru (riziko skrytých mikro-trhlin z nehod). Bezpečnost je priorita č. 1." },
      { id: "g15", label: "Nosítko / Šátek (Kontaktní transport)", week: 24, endWeek: 28, tip: "Skvělé pro 'hands-free' režim doma i venku; vybírej ergonomické modely pro zdravý vývoj kyčlí.", condition: "Bazar / Nové" },
      { id: "g13", label: "Taška na kočárek (Externí úložiště)", week: 26, endWeek: 30, tip: "Musí mít hodně vnitřních kapes; organizovaný chaos je klíč k úspěchu na procházce.", condition: "Bazar / Nové" },
      { id: "g12", label: "Pláštěnka / Moskytiéra (Ochranné štíty)", week: 28, endWeek: 32, tip: "Základní ochranné štíty; bez nich tě venku zastaví první déšť nebo mračna komárů.", condition: "Bazar / Nové" },
      { id: "g11", label: "Fusak a dečka", week: 30, endWeek: 34, tip: "Fusak do kočárku vybírej podle toho, jak moc jdou otřít nečistoty z vnitřní strany od botiček.", condition: "Bazar / Nové" },
      { id: "g14", label: "Cestovní postýlka (Mobilní základna)", week: 32, endWeek: 34, tip: "Ideální pro operace u prarodičů; hledej takovou, co se dá složit do jedné minuty.", condition: "Bazar / Nové" },
      { id: "g10", label: "Rukávník (Tepelná ochrana rukou)", week: 32, endWeek: 36, tip: "Tvoje záchrana v zimě; nemusíš pořád sundávat a nandávat rukavice, když spadnou dudlíky.", condition: "Bazar / Nové" }
    ]
  },
  {
    category: "Spánkový Hangár",
    items: [
      { id: "g26", label: "Hlavní postýlka", week: 22, endWeek: 26, tip: "Nastavitelná výška roštu je nutnost; ušetříš si záda při každém zvedání Juniora.", condition: "Bazar / Nové", warning: "Postýlka klidně z bazaru, ale matrace musí být vždy nová!" },
      { id: "g55", label: "Matrace", week: 22, endWeek: 26, tip: "VŽDY kupuj novou. Matrace z druhé ruky může mít v sobě prach, roztoče, plísně nebo zbytky biologických nehod předchozího miminka. Navíc bývá proležená – novorozenec potřebuje pro správný vývoj páteře rovnou a pevnou plochu, ne měkký \"důlek\".", condition: "Vždy NOVÁ!", warning: "Nová matrace je základ pro zdravá záda Juniora. Nikdy nekupuj použitou!" },
      { id: "g27", label: "Spací pytel (Bezpečný režim)", week: 30, endWeek: 34, tip: "Nejbezpečnější volba; miminko se neodkope a nehrozí mu prochladnutí ani udušení dekou.", condition: "Bazar / Nové" },
      { id: "g28", label: "Kolotoč (Vizuální tracking)", week: 32, endWeek: 34, tip: "Pomáhá s vizuálním tréninkem; hledej takový, co se po čase sám vypne (šetří baterie i tvoje nervy).", condition: "Bazar / Nové" },
      { id: "g29", label: "Dudlík (Umlčovač)", week: 35, endWeek: 37, tip: "Měj víc druhů and velikostí; Junior si sám vybere, který mu „sedne“ do pusy.", condition: "Vždy NOVÁ!" }
    ]
  },
  {
    category: "Taktická Výstroj (Oblečení)",
    items: [
      { id: "g1", label: "Dupačky (Základní vrstva)", week: 26, endWeek: 30, tip: "Základní uniforma; hledej ty, co mají zapínání mezi nohama pro rychlý přístup k pleně.", condition: "Bazar", warning: "Vyroste z toho za 14 dní. Nové jsou vyhozené peníze." },
      { id: "g2", label: "Body s krátkým rukávem (Léto/Interiér)", week: 26, endWeek: 30, tip: "Ber ty se zavinovacím zapínáním (na druky na boku); novorozenci nesnáší přetahování přes hlavu.", condition: "Bazar" },
      { id: "g3", label: "Body s dlouhým rukávem (Standard)", week: 26, endWeek: 30, tip: "Ber ty se zavinovacím zapínáním (na druky na boku); novorozenci nesnáší přetahování přes hlavu.", condition: "Bazar" },
      { id: "g4", label: "Kalhoty / Tepláky", week: 28, endWeek: 32, tip: "Musí mít volný pas, aby netlačily na bříško a hojící se pupík.", condition: "Bazar" },
      { id: "g5", label: "Polodupačky (S integrovanou ponožkou)", week: 28, endWeek: 32, tip: "Tepláky s integrovanou ponožkou; geniální věc, protože miminka si ponožky neustále kopou dolů.", condition: "Bazar" },
      { id: "g6", label: "Ponožky (Přídavná izolace)", week: 30, endWeek: 32, tip: "I když máš polodupačky, jedna vrstva navíc v zimě se hodí jako přídavná izolace.", condition: "Bazar" },
      { id: "g7", label: "Kombinéza + Zimní gear (pro zimní start)", week: 32, endWeek: 34, tip: "Kupuj o kousek větší, pod kombinézu se musí vejít další vrstvy oblečení.", condition: "Bazar" },
      { id: "g8", label: "Šatičky / Kraťasy (pro letní start)", week: 32, endWeek: 34, tip: "Pro letní starty vybírej lehké a prodyšné materiály (len, mušelín), aby se Junior nepřehřál.", condition: "Bazar" }
    ]
  },
  {
    category: "Dekontaminace (Hygiena)",
    items: [
      { id: "g30", label: "Vanička (Mycí nádrž)", week: 28, endWeek: 32, tip: "Stačí jednoduchá; ty s integrovaným lehátkem bývají nepraktické, jakmile dítě trochu povyroste.", condition: "Bazar / Nové" },
      { id: "g34", label: "Teploměr do vody", week: 28, endWeek: 32, tip: "Digitální s alarmem je top; voda musí mít 37 °C (teplo lidského těla).", condition: "Bazar / Nové" },
      { id: "g31", label: "Lehátko do vaničky (Fixátor)", week: 30, endWeek: 34, tip: "Fixuje Juniora ve vodě; uvolní ti obě ruce na mytí (místo abys ho jen křečovitě držel).", condition: "Bazar / Nové" },
      { id: "g32", label: "Osušky & Žínky", week: 32, endWeek: 34, tip: "Bambusové jsou měkčí a savější než klasická bavlna; šetrnější k dětské kůži.", condition: "Bazar / Nové" },
      { id: "g37", label: "Mýdlo a Šampon (Sensitive)", week: 34, endWeek: 36, tip: "Méně je více; novorozenec nepotřebuje litry pěny, stačí kapka bez chemie.", condition: "Vždy NOVÁ!" },
      { id: "g38", label: "Olejíček pro Juniora (Lubrikace)", week: 34, endWeek: 36, tip: "Po koupeli pomáhá udržet kůži hydratovanou; skvělé pro masáže po koupání.", condition: "Vždy NOVÁ!" },
      { id: "g35", label: "Nůžtičky s kulatou špičkou", week: 34, endWeek: 36, tip: "Stříhej jen, když Junior spí; kulatá špička zabrání nechtěnému bodnutí.", condition: "Bazar / Nové" },
      { id: "g36", label: "Hřebínek (Údržba povrchu)", week: 34, endWeek: 36, tip: "I když nemá vlasy, jemné česání masíruje hlavu a pomáhá odstraňovat šupinky (mléčnou krustu).", condition: "Bazar / Nové" },
      { id: "g39", label: "Odsávačka na nudle (Biovysavač)", week: 35, endWeek: 37, tip: "Ta na vysavač je nejúčinnější; vytáhne rýmu i z hloubi dutin během vteřiny.", condition: "Bazar / Nové" },
      { id: "g33", label: "Líh na pupík (Sterilizace)", week: 36, endWeek: 38, tip: "Čistí a vysušuje zbytek pupeční šňůry; zabraňuje infekci v prvních dnech.", condition: "Vždy NOVÁ!" }
    ]
  },
  {
    category: "Sektor Přebalování",
    items: [
      { id: "g40", label: "Přebalovací pult / Komoda", week: 24, endWeek: 28, tip: "Musí být stabilní; nikdy od něj neodcházej, i když Junior 'ještě neleze'.", condition: "Bazar / DIY", warning: "Stačí podložka na komodu. Šetři prostor." },
      { id: "g45", label: "Přebalovací podložka", week: 28, endWeek: 30, tip: "Omyvatelný povrch je základ; nehody se budou stávat denně.", condition: "Vždy NOVÁ!" },
      { id: "g44", label: "Koš na pleny (Kontejner)", week: 30, endWeek: 34, tip: "Speciální koše s těsněním zachrání vzduch v bytě před biologickým útokem.", condition: "Bazar / Nové" },
      { id: "g42", label: "Pleny (Zásobníky na odpad)", week: 35, endWeek: 37, tip: "Začni s jedním balíkem velikosti 1; uvidíš, jak rychle bude Junior přibírat, než koupíš další.", condition: "Vždy NOVÁ!" },
      { id: "g41", label: "Mast na opruzeniny (Ochranný krém)", week: 35, endWeek: 37, tip: "Preventivní štít; nanášej v tenké vrstvě při každém přebalování.", condition: "Vždy NOVÁ!" },
      { id: "g43", label: "Perlan / Ubrousky (Čistící munice)", week: 35, endWeek: 37, tip: "Perlan namočený ve vodě je nejlevnější a nejzdravější varianta pro dětský zadek.", condition: "Vždy NOVÁ!" }
    ]
  },
  {
    category: "Palivový Systém (Krmení)",
    items: [
      { id: "g24", label: "Antikoliková lahvička (Filtrace vzduchu)", week: 34, endWeek: 36, tip: "Speciální ventily brání polykání vzduchu; snižuje riziko večerních záchvatů pláče.", condition: "Vždy NOVÁ!" },
      { id: "g25", label: "Kartáč na lahve & Dávkovač", week: 34, endWeek: 36, tip: "Čistota je v lékárně i v kuchyni základ; mléko se v teple kazí extrémně rychle.", condition: "Vždy NOVÁ!" },
      { id: "g22", label: "Látkové pleny", week: 28, endWeek: 32, tip: "Kup jich hodně (15–20 ks); slouží jako bryndák, podložka pod hlavu i stínítko na kočárek.", condition: "Bazar / Nové" },
      { id: "g19", label: "Odsávačka mléka (Pumpa)", week: 36, endWeek: 38, tip: "Pomůže uvolnit přeplněná prsa nebo vytvořit zásobu, když chceš jít s klukama ven.", condition: "Bazar / Nové" },
      { id: "g20", label: "Sáčky/Pohárky na palivo", week: 36, endWeek: 38, tip: "Pro skladování mateřského mléka v mrazáku; vždy popiš datem odsátí.", condition: "Vždy NOVÁ!" }
    ]
  },
  {
    category: "Simulátory & Zábava",
    items: [
      { id: "g48", label: "Kontrastní kartičky (Vizuální trénink)", week: 32, endWeek: 34, tip: "Černobílé vzory trénují mozek a zrak; dej je na kraj postýlky nebo k přebalováku.", condition: "Bazar / Nové" },
      { id: "g46", label: "Houpátko (Stabilizátor nálady)", week: 35, endWeek: 38, tip: "Tvůj 'druhý pilot'; když potřebuješ v klidu sníst oběd, houpátko Juniora na chvíli zabaví.", condition: "Bazar / Nové" },
      { id: "g47", label: "Chrastítka (Audio signály)", week: 35, endWeek: 38, tip: "První interaktivní senzory; trénují úchop a reakci na zvuk.", condition: "Bazar / Nové" },
      { id: "g49", label: "Hrací deka s hrazdičkou (Aréna)", week: 35, endWeek: 38, tip: "Hlavní výcviková aréna; motivuje Juniora pást koníčky a natahovat se po hračkách.", condition: "Bazar / Nové" }
    ]
  },
];

export const HOSPITAL_BAG_CHECKLIST = [
  {
    category: "Dokumenty (Alfa Priorita)",
    items: [
      { id: "h1", label: "Občanský průkaz (Oba)" },
      { id: "h2", label: "Průkaz pojištěnce" },
      { id: "h3", label: "Těhotenská průkazka" },
      { id: "h4", label: "Oddací list / Prohlášení o otcovství" },
      { id: "h5", label: "Porodní plán (pokud existuje)" }
    ]
  },
  {
    category: "Velitelka (Provozní doba)",
    items: [
      { id: "h6", label: "Noční košile (rozepínací) 2x" },
      { id: "h7", label: "Župan (tepelný štít)" },
      { id: "h8", label: "Přezůvky (omyvatelné - do sprchy)" },
      { id: "h9", label: "Teplé ponožky" },
      { id: "h10", label: "Poporodní kalhotky (síťované) 5x" },
      { id: "h11", label: "Poporodní vložky (2 balení)" },
      { id: "h12", label: "Kojící podprsenka" },
      { id: "h13", label: "Vložky do podprsenky" },
      { id: "h14", label: "Toaletní potřeby (vč. jeleního loje)" },
      { id: "h15", label: "Ručníky (tmavé) 2x" }
    ]
  },
  {
    category: "Junior (Nový Rekrut)",
    items: [
      { id: "h16", label: "Pleny vel. 0 nebo 1 (balení)" },
      { id: "h17", label: "Vlhčené ubrousky / Perlan" },
      { id: "h18", label: "Krém na zadeček" },
      { id: "h19", label: "Body vel. 56 (2x)" },
      { id: "h20", label: "Dupačky vel. 56 (2x)" },
      { id: "h21", label: "Čepička a rukavičky" },
      { id: "h22", label: "Zavinovačka (lze často půjčit)" }
    ]
  },
  {
    category: "Operativec (Otec/Doprovod)",
    items: [
      { id: "h23", label: "Svačina a pití (energetické tyčinky)" },
      { id: "h24", label: "Přezůvky" },
      { id: "h25", label: "Náhradní tričko" },
      { id: "h26", label: "Mobil + Nabíječka + Powerbanka" },
      { id: "h27", label: "Drobné do automatu" }
    ]
  }
];

export const RANKS = [
  { level: 1, minPoints: 0, icon: "👶", name: "CIVILNÍ KONTAKT", status: "Cíl detekován. Prvotní šok zjištěn. Zahajuji sledování situace.", message: "Vítej v programu, civilisto. Tvoje cesta teprve začíná." },
  { level: 2, minPoints: 150, icon: "🎖️", name: "REKRUT JEDNOTKY \"TÁTA\"", status: "Přijat do výcvikového tábora. Učíš se základní zkratky a termíny.", message: "Pozor! Byl jsi přijat do výcviku. Tady končí legrace, rekrute." },
  { level: 3, minPoints: 450, icon: "🔭", name: "OPERÁTOR PRŮZKUMU", status: "Aktivní vyhledávání informací a mapování terénu (prodejny, recenze).", message: "Dobrá práce. Máš oči všude. Průzkum je základ úspěchu." },
  { level: 4, minPoints: 900, icon: "📦", name: "SPECIALISTA LOGISTIKY", status: "Správa zásobování. Dokážeš bezchybně doručit jakoukoliv surovinu, kterou ONA vyžádá.", message: "Logistika vyhrává války. Tvoje schopnost sehnat okurky ve 2 ráno je legendární." },
  { level: 5, minPoints: 1500, icon: "⚙️", name: "ANALYTIK KONFIGURACÍ", status: "Expert na technické parametry (kočárky, autosedačky, monitory dechu).", message: "Rozumíš technice lépe než manuálům. Kočárek složíš i poslepu." },
  { level: 6, minPoints: 2300, icon: "🧠", name: "TAKTICKÝ PORADCE", status: "Pokročilé znalosti procesů v těle maminy. Jsi připraven na krizové scénáře.", message: "Tvé rady jsou nyní brány vážně. Jsi oporou v týlu nepřítele (hormonů)." },
  { level: 7, minPoints: 3300, icon: "🚁", name: "VELITEL VÝSADKOVÉHO TÝMU", status: "Příprava k akci vrcholí. Logistické cesty do porodnice jsou schváleny a prověřeny.", message: "Tým je připraven k výsadku. Znáš trasu, znáš plán. Jsi připraven." },
  { level: 8, minPoints: 4500, icon: "🛡️", name: "STRÁŽCE SEKTORU", status: "Maximální pohotovost 24/7. Tvá trpělivost a podpora jsou hlavní obrannou linií.", message: "Jsi majákem v bouři. Tvoje trpělivost je štítem celé rodiny." },
  { level: 9, minPoints: 6000, icon: "🎖️", name: "ELITNÍ VETERÁN", status: "Poslední fáze před nasazením. Nic tě nepřekvapí. Jsi v nejlepší formě života.", message: "Viděl jsi všechno. Jsi připraven na to hlavní. Teď už není cesty zpět." },
  { level: 10, minPoints: 8000, icon: "👑", name: "GENERÁL TATÍNEK", status: "MISE SPLNĚNA. Junior je na základně. Máš nejvyšší velení a respekt celého štábu.", message: "POZOR! GENERÁL NA SCÉNĚ! Dokázal jsi to. Jsi Táta. Nejvyšší pocta, jakou muž může získat." }
];

export const DESERTER_RANK = {
  level: 0,
  minPoints: -1,
  icon: "🌑",
  name: "DEZERTÉR",
  status: "Hanba! Opustil jsi jednotku v kritické chvíli. Důvěra je na nule.",
  message: "VAROVÁNÍ: ZJIŠTĚNA DEZERCE! Vrať se okamžitě plnit úkoly, vojáku! Rodina tě potřebuje."
};

export const PARTNER_RECON: Record<number, string> = {
  1: "TAKTIKA TÝDEN 01\n\n- Situace: Terén je nepřehledný. Nikdo nic neví.\n- Úkol: Tvař se, že máš plán.\n- Rada: Pokud je unavená, neřeš proč. Prostě ji ulož do postele.\n- Intel: Její hormony začínají pracovat. Tvoje ještě spí.",
  2: "TAKTIKA TÝDEN 02\n\n- Situace: Ostrá munice byla vypálena.\n- Úkol: Čekání na zásah cíle.\n- Rada: Buď v klidu. Stres snižuje šance.\n- Intel: Tohle je ten týden, kdy se rozhoduje o všem.",
  3: "TAKTIKA TÝDEN 03\n\n- Situace: Ticho po pěšině. Nepřítel se zakopává.\n- Úkol: Neptej se 'už?'. Nikdy.\n- Rada: Přines jí čokoládu. Preventivně.\n- Intel: V těle probíhá revoluce, navenek není vidět nic.",
  4: "TAKTIKA TÝDEN 04\n\n- Situace: Dvě čárky na radaru.\n- Úkol: Oslava (decentní). Udržet tajemství.\n- Rada: Začni šetřit peníze. Budeš je potřebovat.\n- Intel: Jsi oficiálně čekatel na hodnost OTCE.",
  5: "TAKTIKA TÝDEN 05\n\n- Situace: Ranní nevolnosti útočí.\n- Úkol: Drž jí vlasy, když zvrací. (Hrdinství level 1).\n- Rada: Nekupuj uzeniny. Smrdí jí to.\n- Intel: Smiř se s tím, že teď velí hormony.",
  6: "TAKTIKA TÝDEN 06\n\n- Situace: Extrémní únava jednotky.\n- Úkol: Převezmi domácí práce. Všechny.\n- Rada: Neříkej, že jsi taky unavený. Nejsi.\n- Intel: Bude spát 14 hodin denně. Nech ji.",
  7: "TAKTIKA TÝDEN 07\n\n- Situace: Náladovost level 'Tornádo'.\n- Úkol: Přežít. Nehádat se.\n- Rada: Když pláče u reklamy na kočičí žrádlo, podej kapesník.\n- Intel: Nic z toho, co řekne, neber osobně.",
  8: "TAKTIKA TÝDEN 08\n\n- Situace: První kontrola u doktora.\n- Úkol: Jdi s ní. Podrž tašku. Kývej.\n- Rada: Udělej fotku z ultrazvuku (i když je to jen šmouha).\n- Intel: Teď už je to realita. Vidíš to srdce?",
  9: "TAKTIKA TÝDEN 09\n\n- Situace: Pas se začíná rozšiřovat (ne tvůj).\n- Úkol: Říkej jí, že je krásná. Každý den.\n- Rada: Nekupuj oblečení bez ní. Nikdy.\n- Intel: Začíná 'hnízdící fáze' - bude chtít malovat byt.",
  10: "TAKTIKA TÝDEN 10\n\n- Situace: Konec kritické fáze.\n- Úkol: Mírná oslava (stále nealko).\n- Rada: Naplánuj poslední dovolenou ve dvou.\n- Intel: Riziko potratu klesá. Můžeš trochu vydechnout.",
  11: "TAKTIKA TÝDEN 11\n\n- Situace: Hlad. Obrovský hlad.\n- Úkol: Měj zásoby jídla. Kdekoliv.\n- Rada: Když řekne, že chce zmrzlinu ve 3 ráno, jdi pro ni.\n- Intel: Junior roste a potřebuje palivo.",
  12: "TAKTIKA TÝDEN 12\n\n- Situace: Konec 1. trimestru. Úleva.\n- Úkol: Oficiální oznámení rodině (pokud už neví).\n- Rada: Připrav se na nevyžádané rady od tchyně.\n- Intel: Energie se jí vrací. Využij to.",
  13: "TAKTIKA TÝDEN 13\n\n- Situace: Zlatý věk začíná.\n- Úkol: Sex? Možná. Buď opatrný, ale připravený.\n- Rada: Začni studovat typy kočárků. Je to věda.\n- Intel: Vypadá skvěle. Těhotenský 'glow' je skutečný.",
  14: "TAKTIKA TÝDEN 14\n\n- Situace: Bříško už je vidět.\n- Úkol: Uvolni místo ve skříni pro těhotenské věci.\n- Rada: Neříkej 'ty jsi přibrala'. Říkej 'krásně rosteš'.\n- Intel: Začínáš si uvědomovat, že se to vážně děje.",
  15: "TAKTIKA TÝDEN 15\n\n- Situace: Zapomnětlivost (Pregnancy Brain).\n- Úkol: Dělej si poznámky za ni.\n- Rada: Když ztratí klíče popáté, najdi je bez řečí.\n- Intel: Krevní oběh jí jede na 120%. Je jí pořád horko.",
  16: "TAKTIKA TÝDEN 16\n\n- Situace: Gender reveal?\n- Úkol: Tvař se nadšeně, ať je to cokoliv.\n- Rada: Pokud jsi chtěl kluka a je to holka, nebuď zklamaný.\n- Intel: Teď už můžeš vybírat jméno. Hodně štěstí.",
  17: "TAKTIKA TÝDEN 17\n\n- Situace: Rovnováha se horší.\n- Úkol: Dělej jí oporu (doslova).\n- Rada: Nainstaluj protiskluzovou podložku do vany.\n- Intel: Těžiště se posouvá. Zakopává o vlastní nohy.",
  18: "TAKTIKA TÝDEN 18\n\n- Situace: Mluv na břicho.\n- Úkol: Navaž kontakt s jednotkou.\n- Rada: Čti mu/jí pohádky. Nebo manuál k autu. Je to jedno.\n- Intel: Slyší tě. Zvyká si na tvj hlas.",
  19: "TAKTIKA TÝDEN 19\n\n- Situace: Velký screening se blíží.\n- Úkol: Uvolni se z práce. Musíš tam být.\n- Rada: Potečou slzy (její, možná i tvoje). Kapesníky.\n- Intel: Uvidíš páteř, srdce, mozek. Je to mazec.",
  20: "TAKTIKA TÝDEN 20\n\n- Situace: Půlka za námi!\n- Úkol: Oslava poloviny mise.\n- Rada: Kup jí masáž pro těhotné.\n- Intel: Junior už je velký jako banán. A kope.",
  21: "TAKTIKA TÝDEN 21\n\n- Situace: Kopance jsou vidět.\n- Úkol: Dej ruku na břicho a číhej.\n- Rada: Měj trpělivost. Vždycky přestane kopat, když tam dáš ruku.\n- Intel: Je to jako vetřelec, ale roztomilý.",
  22: "TAKTIKA TÝDEN 22\n\n- Situace: Hnízdění nabírá na obrátkách.\n- Úkol: Malování, stěhování nábytku, montování.\n- Rada: Neodporuj. Musí to být hotové TEĎ.\n- Intel: Instinkt je silnější než logika.",
  23: "TAKTIKA TÝDEN 23\n\n- Situace: Otoky nohou.\n- Úkol: Masáž chodidel. Každý večer.\n- Rada: Nauč se to dělat pořádně. YouTube pomůže.\n- Intel: Zadržuje vodu. Prstýnky už možná nesundá.",
  24: "TAKTIKA TÝDEN 24\n\n- Situace: Test na cukrovku.\n- Úkol: Podpora morálky po vypití glukózy.\n- Rada: Nejez před ní sladké, pokud ona nemůže.\n- Intel: Pokud má cukrovku, dieta platí pro celou rodinu (solidarita).",
  25: "TAKTIKA TÝDEN 25\n\n- Situace: Bolesti zad.\n- Úkol: Masáž zad (ano, další masáž).\n- Rada: Kup jí kojící polštář na spaní. I ty ho budeš chtít.\n- Intel: Nemůže najít polohu na spaní. Bude se vrtět.",
  26: "TAKTIKA TÝDEN 26\n\n- Situace: Jména. Finální výběr.\n- Úkol: Veto právo na ta nejhorší jména.\n- Rada: Kompromis je klíč. 'Anakin' asi neprojde.\n- Intel: Bude to jméno používat celý život. Nepokaz to.",
  27: "TAKTIKA TÝDEN 27\n\n- Situace: Konec 2. trimestru.\n- Úkol: Užij si poslední týdny relativního klidu.\n- Rada: Jděte do kina. S dítětem to pak dlouho nepůjde.\n- Intel: Začíná jít do tuhého. Břicho už je velké.",
  28: "TAKTIKA TÝDEN 28\n\n- Situace: 3. Trimestr. Velrybí fáze (neříkat nahlas!).\n- Úkol: Zavazuj jí tkaničky.\n- Rada: Ostříhej jí nehty na nohou, pokud nedosáhne.\n- Intel: Cítí se nemotorná. Potřebuje ujištění, že je stále sexy.",
  29: "TAKTIKA TÝDEN 29\n\n- Situace: Výběr porodnice.\n- Úkol: Zjisti trasu, parkování, kde je příjem.\n- Rada: Zajeďte se tam podívat. Klidní to nervy.\n- Intel: Logistika je na tobě. Ona má dost práce s výrobou člověka.",
  30: "TAKTIKA TÝDEN 30\n\n- Situace: Kurz předporodní přípravy.\n- Úkol: Neusni tam.\n- Rada: Poslouchej hlavně část o tom, jak dýchat a jak ji masírovat.\n- Intel: Budeš tam za exota, ale děláš to pro ni.",
  31: "TAKTIKA TÝDEN 31\n\n- Situace: Pokojíček.\n- Úkol: Finální montáž postýlky.\n- Rada: Zkontroluj, jestli máš všechny šroubky. Dvakrát.\n- Intel: Až to bude hotové, dojde jí, že už je to tady.",
  32: "TAKTIKA TÝDEN 32\n\n- Situace: Taška do porodnice.\n- Úkol: Zkontroluj checklist (viz naše aplikace).\n- Rada: Sbal si i svoji tašku (svačina, powerbanka, drobné).\n- Intel: Měj to u dveří. Kdykoliv to může vypuknout.",
  33: "TAKTIKA TÝDEN 33\n\n- Situace: Poslíčci (Braxton-Hicks).\n- Úkol: Neplašit při každém píchnutí.\n- Rada: Stáhni si aplikaci na měření kontrakcí.\n- Intel: Trénink na den D. Děloha posiluje.",
  34: "TAKTIKA TÝDEN 34\n\n- Situace: Masáž hráze.\n- Úkol: Pokud tě o to požádá... je to technická záležitost.\n- Rada: Olejíček. A studium anatomie.\n- Intel: Pomáhá to předejít nastřižení. Stojí to za to.",
  35: "TAKTIKA TÝDEN 35\n\n- Situace: Únava level 'Zombie'.\n- Úkol: Nech ji odpočívat. Pořád.\n- Rada: Vař, uklízej, nakupuj. Jsi v tom 100%.\n- Intel: Už se to blíží. Energie je na nule.",
  36: "TAKTIKA TÝDEN 36\n\n- Situace: Kontroly každý týden.\n- Úkol: Doprovod nutný.\n- Rada: Měj natankované auto. Vždycky plná nádrž.\n- Intel: Může se to stát dnes. Nebo za měsíc.",
  37: "TAKTIKA TÝDEN 37\n\n- Situace: Donošeno.\n- Úkol: Zákaz alkoholu pro tebe. Musíš být řidič.\n- Rada: Měj telefon pořád nahlas.\n- Intel: Jste v cílové rovince. Čekání na výstřel.",
  38: "TAKTIKA TÝDEN 38\n\n- Situace: Nervozita vrcholí.\n- Úkol: Rozptylovat ji. Humor, filmy, klid.\n- Rada: Neptej se 'tak co?'. Ona taky neví.\n- Intel: Každé zazvonění telefonu ji vyděsí. Vypněte zvonění.",
  39: "TAKTIKA TÝDEN 39\n\n- Situace: Přesluhujeme (pocitově).\n- Úkol: Vyvolávání porodu (babské rady).\n- Rada: Pálivé jídlo, sex, procházky. Zkuste všechno.\n- Intel: Už chce, aby to bylo venku. Je protivná. Právem.",
  40: "TAKTIKA TÝDEN 40\n\n- Situace: TERMÍN.\n- Úkol: Připravenost č. 1.\n- Rada: Dýchej. Až to přijde, ty jsi ten klidný.\n- Intel: Uvidíš svého syna/dceru. Bude to masakr. A bude to boží.",

  41: "TAKTIKA TÝDEN 41\n\n- Situace: Přesluhujeme.\n- Úkol: Udržuj ji v klidu. Žádný stres.\n- Rada: Neptej se 'ještě nic?'. Ona to ví.\n- Intel: Lékař ji bude sledovat častěji. Jdi s ní.",

  42: "TAKTIKA TÝDEN 42\n\n- Situace: Indukce porodu.\n- Úkol: Sbal tašky. Jeďte do porodnice.\n- Rada: Buď připraven na dlouhou noc. Powerbanka nabitá.\n- Intel: Tohle je to. Za pár hodin budeš táta."
};
