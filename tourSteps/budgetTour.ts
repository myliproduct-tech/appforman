import { TourStep } from '../components/OnboardingTour';

export const BUDGET_TOUR: TourStep[] = [
    {
        target: 'body',
        title: '💰 Logistika!',
        content: `Vítej v sekci správy financí a vybavení!

Zde si naplánuješ rozpočet a zkontroluj eš, co všechno potřebuješ.`,
        placement: 'center',
    },
    {
        target: 'body',
        title: '🛠️ Nástroje Logistiky',
        content: `Inventář - checklist vybavení
Kalkulačka - plánování rozpočtu
Konfigurátor vozidla - příprava auta
Spotřebáky - sledování zásob

Vše pro perfektní přípravu!`,
        placement: 'center',
    },
];
