import { useState, useEffect } from 'react';
import { getStartDateFromDue } from '../utils';

/**
 * Custom hook for dev mode functionality
 * Manages dayOffset for time travel and week calculation
 */
export const useDevMode = () => {
    const [isDevMode, setIsDevMode] = useState(false);
    const [dayOffset, setDayOffset] = useState(0); // This is now the absolute Pregnancy Day (0-280)
    const [currentWeek, setCurrentWeek] = useState(1);

    // Calculate effective date based on start date and current day index
    const getEffectiveDate = (dueDate: string | null): string => {
        if (!dueDate) return new Date().toISOString().split('T')[0];

        const startDate = getStartDateFromDue(dueDate);

        const effectiveDate = new Date(startDate);
        effectiveDate.setDate(startDate.getDate() + dayOffset);
        return effectiveDate.toISOString().split('T')[0];
    };

    // Update current week when day index changes
    useEffect(() => {
        const calculatedWeek = Math.min(42, 1 + Math.floor(dayOffset / 7));
        setCurrentWeek(calculatedWeek);
    }, [dayOffset]);

    return {
        isDevMode,
        setIsDevMode,
        dayOffset,
        setDayOffset,
        currentWeek,
        setCurrentWeek,
        getEffectiveDate,
    };
};
