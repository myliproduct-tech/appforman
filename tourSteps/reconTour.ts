import { TourStep } from '../components/OnboardingTour';

export const RECON_TOUR: TourStep[] = [
    {
        target: 'body',
        title: '🔍 Průzkum Bojiště!',
        content: `Vítej v taktické sekci!

Zde najdeš nástroje pro sledování těhotenství a přípravu na porod.`,
        placement: 'center',
    },
    {
        target: 'body',
        title: '🛠️ Taktické Nástroje',
        content: `Monitoring Pohybů - sleduj kopance miminka
Komunikační Manuál - důležité kódy a signály

Vše pro perfektní komunikaci s partnerkou!`,
        placement: 'center',
    },
    {
        target: '[data-tour="ice-card"]',
        title: '🚨 Krizový Štítek',
        content: `Ulož důležité kontakty a informace pro případ nouze.

Cílová nemocnice, kontakty, pediatr - vše na jednom místě!`,
        placement: 'bottom',
    },
];
