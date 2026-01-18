import { TourStep } from '../components/OnboardingTour';

export const MISSIONS_TOUR: TourStep[] = [
    {
        target: 'body',
        title: '🎯 Vítej v Misích!',
        content: `Zde najdeš všechny své úkoly a mise.

Každý den dostaneš nové mise přizpůsobené aktuálnímu týdnu těhotenství.`,
        placement: 'center',
    },
    {
        target: 'header',
        title: '📋 Záložky Misí',
        content: `Přepínej mezi:
• Aktivní - aktuální mise
• Odložené - mise na později
• Historie - splněné a promarněné mise`,
        placement: 'bottom',
    },
    {
        target: 'body',
        title: '✅ Splň Mise!',
        content: `Klikni na misi pro detail a označ ji jako splněnou.

Můžeš ji také odložit nebo naplánovat na konkrétní datum. Za každou splněnou misi získáš XP!`,
        placement: 'center',
    },
    {
        target: 'body',
        title: '🔄 Obnova Misí',
        content: `Misi z archivu můžeš obnovit pouze JEDNOU.
        
Pokud obnovenou misi znovu nesplníš, budeš potrestán citelnou ztrátou XP a hodnosti!`,
        placement: 'center',
    },
];
