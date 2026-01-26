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
        operationalPrepChecklist: [],
        vehicleConfirmed: false
    };

    const [stats, setStats] = useState<UserStats>(initialStats);
    const [isLoaded, setIsLoaded] = useState(false);

    // 1. Initial Load: Server (Primary) -> LocalStorage (Secondary)
    useEffect(() => {
        if (!currentUser) {
            setIsLoaded(false);
            return;
        }

        const loadData = async () => {
            // Try server first
            try {
                const response = await fetch(`https://appforman.onrender.com/api/stats/${encodeURIComponent(currentUser)}`);
                const serverData = await response.json();

                if (serverData) {
                    setStats({ ...initialStats, ...serverData, email: currentUser });
                    // Sync local storage with fresh server data
                    localStorage.setItem(`partner_app_data_${currentUser}`, JSON.stringify(serverData));
                    setIsLoaded(true);
                    return;
                }
            } catch (error) {
                console.warn('📡 Server unreachable, falling back to local storage');
            }

            // Fallback to local storage
            const localKey = `partner_app_data_${currentUser}`;
            const localSaved = localStorage.getItem(localKey);
            if (localSaved) {
                try {
                    const parsed = JSON.parse(localSaved);
                    setStats({ ...initialStats, ...parsed, email: currentUser });
                } catch (e) {
                    console.error('Failed to parse local data', e);
                    setStats({ ...initialStats, email: currentUser });
                }
            } else {
                setStats({ ...initialStats, email: currentUser });
            }
            setIsLoaded(true);
        };

        loadData();
    }, [currentUser]);

    // 2. Periodic Save: Save to both Server and LocalStorage
    useEffect(() => {
        if (!stats.email || !isLoaded) return;

        const saveData = async () => {
            const dataStr = JSON.stringify(stats);

            // Save locally immediately
            localStorage.setItem(`partner_app_data_${stats.email}`, dataStr);

            // Save to server
            try {
                const response = await fetch(`https://appforman.onrender.com/api/stats/${encodeURIComponent(stats.email)}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: dataStr
                });

                if (!response.ok) {
                    console.error('❌ Server error during save', response.status);
                }
            } catch (error) {
                console.error('❌ Failed to push stats to server', error);
            }
        };

        // Debounce saving slightly if needed, but for now direct is fine
        saveData();
    }, [stats, isLoaded]);

    return { stats, setStats, initialStats };
};
