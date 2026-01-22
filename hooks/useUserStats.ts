import { useState, useEffect } from 'react';
import { UserStats } from '../types';

/**
 * Custom hook for managing user stats with localStorage persistence
 */
export const useUserStats = (currentUser: string | null) => {
    // Default initial stats structure
    const initialStats: UserStats = {
        email: '',
        partnerName: 'Velitelka',
        points: 0,
        level: 1,
        completedTasks: [],
        badges: [],
        logs: [],
        timeCapsule: [],
        streak: 0,
        lastEngagementDate: null,
        userName: null,
        dueDate: null,
        gearChecklist: [],
        hospitalBagChecklist: [],
        completedDailyMissionIds: [],
        dailyMissions: [],
        dailyMissionsDate: null,
        customMissions: [],
        postponedMissions: [],
        missionHistory: [],
        hospitalTarget: '',
        backupContacts: [],
        partnerPhone: '',
        pediatricianContact: { name: '', phone: '', address: '' },
        visitorStatus: 'bunker',
        musicPreference: '',
        parkingInfo: '',
        gbsStatus: 'unknown',
        bloodPressureLog: [],
        amnioticFluidLog: null,
        babyNames: [],
        budgetPlan: {
            totalBudget: 50000,
            stroller: 0,
            carSeat: 0,
            furniture: 0,
            clothes: 0,
            cosmetics: 0,
            other: 0
        },
        accountCreated: new Date().toISOString(),
        customGear: [],
        onboardingCompleted: false,
        onboardingFinished: false,
        tourCompleted: {
            missions: false,
            achievements: false,
            recon: false,
            budget: false
        },
        lastProcessedDayIndex: 0,
        operationalPrepChecklist: []
    };

    const [stats, setStats] = useState<UserStats>(initialStats);

    // Load data from localStorage when user changes
    useEffect(() => {
        if (currentUser) {
            const storageKey = `partner_app_data_${currentUser}`;
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    setStats({ ...initialStats, ...parsed, email: currentUser });
                } catch (e) {
                    console.error('Failed to parse saved data', e);
                    setStats({ ...initialStats, email: currentUser });
                }
            } else {
                setStats({ ...initialStats, email: currentUser });
            }
        }
    }, [currentUser]);

    // Save data to localStorage whenever stats change
    useEffect(() => {
        if (stats.email) {
            const storageKey = `partner_app_data_${stats.email}`;
            localStorage.setItem(storageKey, JSON.stringify(stats));
        }
    }, [stats]);

    return { stats, setStats, initialStats };
};
