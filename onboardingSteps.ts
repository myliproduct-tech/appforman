import { TourStep } from './components/OnboardingTour';

export const ONBOARDING_STEPS: TourStep[] = [
    {
        target: 'body',
        title: '🎖️ VÍTEJ V OPERACI, VELITELI!',
        content: `Tato aplikace tě provede celým těhotenstvím partnerky pomocí gamifikovaného systému misí.

Získávej XP, postupuj v hodnosti a staň se nejlepším partnerem!`,
        placement: 'center',
    },
    {
        target: '[data-tour="rank-card"]',
        title: '📊 TVOJE HODNOST',
        content: `Zde vidíš svou aktuální hodnost a pokrok.
        
Kliknutím na tuto kartu se dostaneš do sekce **Odznaky**, kde uvidíš své úspěchy a ocenění!`,
        placement: 'bottom',
    },
    {
        target: '[data-tour="streak"]',
        title: '🔥 AKTIVNÍ DNY',
        content: `Udržuj sérii aktivních dnů! Každý den, kdy splníš misi, tvůj streak roste.`,
        placement: 'bottom',
    },
    {
        target: '[data-tour="intel"]',
        title: '🧬 INTEL REPORT',
        content: `Zde sleduj vývoj Juniora týden po týdnu. Klikni pro detailní hlášení o aktuálním stavu.`,
        placement: 'bottom',
    },
    {
        target: '[data-tour="missions-dashboard-link"]',
        title: '🎯 MISE',
        content: `Zde najdeš denní mise přizpůsobené aktuálnímu týdnu těhotenství.
        
Splň mise pro získání XP a postupu v hodnosti! 

**POZOR:** Misi z archivu můžeš obnovit pouze JEDNOU. Pokud ji znovu nesplníš, čeká tě postih!`,
        placement: 'top',
    },
    {
        target: '[data-tour="recon-tab"]',
        title: '🔍 BOJIŠTĚ',
        content: `Taktické nástroje pro sledování těhotenství:
• Počítadlo kopanců
• Komunikační manuál
• Krizový štítek (ICE Card)`,
        placement: 'top',
    },
    {
        target: '[data-tour="budget-tab"]',
        title: '💰 LOGISTIKA',
        content: `Správa financí a výbavy:
• Inventář potřebné výbavy
• Kalkulačka rozpočtu
• Konfigurátor vozidla`,
        placement: 'top',
    },
    {
        target: '[data-tour="extra-tab"]',
        title: '✨ EXTRA SEKCE',
        content: `Zde tě čeká speciální obsah pro odlehčení:
• Výcvikový kemp
• Nominace juniora
• Protokol návštěv`,
        placement: 'top',
    },
    {
        target: '[data-tour="menu-button"]',
        title: '🍔 HLAVNÍ MENU',
        content: `Tady najdeš nastavení, hlášení chyb a další možnosti.

Z menu můžeš také **kdykoliv manuálně spustit krizový režim Výsadek**, pokud jej potřebuješ dříve nebo se tlačítko nezobrazilo automaticky.`,
        placement: 'top',
    },
    {
        target: 'body',
        title: '🚨 OPERACE VÝSADEK',
        content: `Od 36. týdne se ti na hlavní obrazovce aktivuje červené tlačítko **VÝSADEK**. 

Je to tvůj krizový režim pro den D. Všechny důležité nástroje a kontakty budeš mít okamžitě po ruce! (Pamatuj, že jej lze spustit i přes Menu).`,
        placement: 'center',
    },
    {
        target: 'body',
        title: '✅ JDI DO TOHO!',
        content: `Nyní jsi připraven na misi!
        
Dokonči toto školení a získej svůj první odznak. Hodně štěstí, veliteli! 🎖️`,
        placement: 'center',
    },
];
