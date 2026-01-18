/**
 * Date utility functions
 */

/**
 * Get effective date with dayOffset applied
 */
export const getEffectiveDate = (dayOffset: number = 0): string => {
    const d = new Date();
    d.setDate(d.getDate() + dayOffset);
    return d.toISOString().split('T')[0];
};

/**
 * Calculate week number from date
 */
export const calculateWeekFromDate = (date: Date): number => {
    // Simple calculation - can be enhanced based on actual due date
    return Math.min(40, 1 + Math.floor(date.getDate() / 7));
};

/**
 * Get number of days since a given date
 */
export const getDaysSince = (dateString: string): number => {
    const today = new Date().toISOString().split('T')[0];
    const daysDiff = Math.floor(
        (new Date(today).getTime() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysDiff;
};

/**
 * Format date to locale string
 */
export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('cs-CZ');
};
