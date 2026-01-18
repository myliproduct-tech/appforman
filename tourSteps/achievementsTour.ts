import { TourStep } from '../components/OnboardingTour';

export const ACHIEVEMENTS_TOUR: TourStep[] = [
    {
        target: 'body',
        title: '🏆 Zeď Slávy!',
        content: `Vítej ve sbírce odznaků!

Za speciální úkoly a milníky získáváš odznaky různé vzácnosti.`,
        placement: 'center',
    },
    {
        target: 'body',
        title: '⭐ Vzácnost Odznaků',
        content: `Odznaky mají různou vzácnost:
• Běžné (šedé)
• Vzácné (modré)
• Epické (fialové)
• Legendární (zlaté)

Některé odemkneš automaticky, jiné vyžadují speciální akce!`,
        placement: 'center',
    },
];
