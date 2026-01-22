import React from 'react';
import { UserStats, Task, Achievement } from '../types';
import { getDailyMissions } from '../data/dailyMissions';
import { localizeText, getRankBasedOnPoints } from '../utils';
import { soundService } from '../services/SoundService';
import { ACHIEVEMENTS } from '../constants';
import { notificationService } from '../services/NotificationService';

/**
 * Custom hook for managing missions (daily, custom, postponed)
 * Handles mission completion, scheduling, restoration, and deletion
 */
export const useMissions = (
    stats: UserStats,
    setStats: React.Dispatch<React.SetStateAction<UserStats>>,
    effectiveDate: string,
    currentDayIndex: number,
    setShowRankModal: (value: { show: boolean, rank: any | null }) => void,
    setShowAchievementModal: (value: Achievement | null) => void,
    setShowFailureModal: (value: Task | null) => void
) => {
    // Get today's daily missions
    const todaysMissionsRaw = getDailyMissions(currentDayIndex);

    // Achievement checker
    const checkAchievements = (currentStats: UserStats): { updatedStats: UserStats, newUnlock: Achievement | null } => {
        let newUnlock: Achievement | null = null;
        let newBadges = [...currentStats.badges];
        let xpGain = 0;

        ACHIEVEMENTS.forEach(ach => {
            if (newBadges.some(b => b.id === ach.id)) return;
            if (ach.condition(currentStats)) {
                newUnlock = ach;
                newBadges.push({ id: ach.id, unlockedDate: new Date().toISOString() });
                xpGain += ach.xpReward;

                if (currentStats.notificationsEnabled) {
                    notificationService.send(
                        `🎖️ Nový Achievement: ${ach.title}`,
                        ach.description
                    );
                }
            }
        });

        if (xpGain > 0) {
            return {
                updatedStats: { ...currentStats, badges: newBadges, points: currentStats.points + xpGain },
                newUnlock
            };
        }

        return { updatedStats: currentStats, newUnlock: null };
    };

    // Prepare active missions list
    const dailyMissionsFiltered = todaysMissionsRaw
        .filter(task => !stats.completedDailyMissionIds.includes(task.id))
        .filter(task => !stats.postponedMissions.some(pm => pm.id === task.id))
        .filter(task => !stats.customMissions.some(cm => cm.id === task.id))
        .map(task => ({
            ...task,
            title: localizeText(task.title, stats.partnerName),
            description: localizeText(task.description, stats.partnerName),
            completed: false
        }));

    const activeCustomMissions = (stats.customMissions || [])
        .filter(cm => {
            if (cm.failed) return false;
            if (!cm.scheduledDate) return true;
            if (cm.scheduledDate === effectiveDate) return true;
            if (cm.scheduledDate < (effectiveDate || '')) {
                if (cm.restoredCount && cm.restoredCount >= 1) return false;
                return true;
            }
            return false;
        })
        .map(task => ({
            ...task, // Preserve all properties including priority
            title: localizeText(task.title, stats.partnerName),
            description: localizeText(task.description, stats.partnerName)
        }));

    const activeMissions = [...dailyMissionsFiltered, ...activeCustomMissions];

    // Handler: Complete mission
    const handleCompleteMission = (task: Task) => {
        // Safety checks
        if (!task || !task.id) {
            console.error('Invalid task:', task);
            return;
        }

        // Play completion sound if enabled
        if (stats.soundEnabled) {
            soundService.playClick();
        }

        const timePart = new Date().toISOString().split('T')[1];
        const now = effectiveDate ? `${effectiveDate}T${timePart}` : new Date().toISOString();
        const completedTask = { ...task, completed: true, completedDate: now };
        const isDailyId = task.id.startsWith('daily_');
        const taskPoints = task.points || 0; // Default to 0 if undefined

        setStats(prev => {
            const newCustomMissions = prev.customMissions.filter(m => m.id !== task.id);
            const newPostponedMissions = prev.postponedMissions.filter(m => m.id !== task.id);
            const newPoints = prev.points + taskPoints;

            // Calculate streak
            const today = effectiveDate || new Date().toISOString().split('T')[0];
            let newStreak = prev.streak;
            let newLastEngagementDate = today;

            if (prev.lastEngagementDate) {
                const lastDate = new Date(prev.lastEngagementDate);
                const currentDate = new Date(today);
                const diffTime = currentDate.getTime() - lastDate.getTime();
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays === 0) {
                    // Same day - no change to streak
                    newStreak = prev.streak;
                } else if (diffDays === 1) {
                    // Next day - increment streak
                    newStreak = prev.streak + 1;
                } else {
                    // Streak broken - reset to 1
                    newStreak = 1;
                }
            } else {
                // First mission ever
                newStreak = 1;
            }

            // Calculate rank/level
            const oldRank = getRankBasedOnPoints(prev.points);
            const newRank = getRankBasedOnPoints(newPoints);

            let nextStats: UserStats = {
                ...prev,
                points: newPoints,
                level: newRank.level, // Update level based on points
                streak: newStreak,
                lastEngagementDate: newLastEngagementDate,
                completedTasks: [...prev.completedTasks, task.id],
                completedDailyMissionIds: (task.isDaily || isDailyId) ? [...prev.completedDailyMissionIds, task.id] : prev.completedDailyMissionIds,
                customMissions: newCustomMissions,
                postponedMissions: newPostponedMissions,
                missionHistory: [completedTask, ...prev.missionHistory]
            };

            if (newRank.level > oldRank.level) {
                setShowRankModal({ show: true, rank: newRank });
            }

            const { updatedStats, newUnlock } = checkAchievements(nextStats);
            if (newUnlock) setShowAchievementModal(newUnlock);

            return updatedStats;
        });
    };

    // Handler: Postpone mission
    const handlePostponeMission = (task: Task) => {
        setStats(prev => {
            const newCustomMissions = prev.customMissions.filter(m => m.id !== task.id);
            const others = prev.postponedMissions.filter(p => p.id !== task.id);
            const taskToPostpone = { ...task, scheduledDate: undefined };

            // If this is a daily mission, mark it as completed so it doesn't show in today's list
            const newCompletedDailyIds = task.isDaily && !prev.completedDailyMissionIds.includes(task.id)
                ? [...prev.completedDailyMissionIds, task.id]
                : prev.completedDailyMissionIds;

            return {
                ...prev,
                customMissions: newCustomMissions,
                postponedMissions: [...others, taskToPostpone],
                completedDailyMissionIds: newCompletedDailyIds
            };
        });
    };

    // Handler: Schedule mission
    const handleScheduleMission = (task: Task, date: string) => {
        setStats(prev => {
            const newPostponedMissions = prev.postponedMissions.filter(m => m.id !== task.id);
            const others = prev.customMissions.filter(m => m.id !== task.id);
            const scheduledTask = { ...task, scheduledDate: date };

            // If this is a daily mission, mark it as completed so it doesn't show in today's list
            const newCompletedDailyIds = task.isDaily && !prev.completedDailyMissionIds.includes(task.id)
                ? [...prev.completedDailyMissionIds, task.id]
                : prev.completedDailyMissionIds;

            return {
                ...prev,
                customMissions: [...others, scheduledTask],
                postponedMissions: newPostponedMissions,
                completedDailyMissionIds: newCompletedDailyIds
            };
        });
    };

    // Handler: Restore mission
    const handleRestoreMission = (task: Task, date: string) => {
        setStats(prev => {
            const restoredTask = {
                ...task,
                scheduledDate: date,
                restoredCount: (task.restoredCount || 0) + 1,
                failed: false,
                priority: 'highest' as const // Mark as highest priority
            };

            // Remove from backup/postponed and history
            const newHistory = prev.missionHistory.filter(m => m.id !== task.id);
            const newPostponed = prev.postponedMissions.filter(m => m.id !== task.id);
            const others = prev.customMissions.filter(m => m.id !== task.id);

            return {
                ...prev,
                customMissions: [...others, restoredTask],
                missionHistory: newHistory,
                postponedMissions: newPostponed // Remove from backup (postponed missions)
            };
        });
    };

    // Handler: Add custom mission
    const handleAddCustomMission = (title: string, description: string, scheduledDate: string) => {
        const newTask: Task = {
            id: `custom_${Date.now()}`,
            title,
            description,
            scheduledDate,
            points: 50, // Default for custom missions
            category: 'vlastní_rozkaz',
            completed: false
        };
        setStats(prev => {
            const nextStats = {
                ...prev,
                customMissions: [...prev.customMissions, newTask]
            };
            const { updatedStats, newUnlock } = checkAchievements(nextStats);
            if (newUnlock) setShowAchievementModal(newUnlock);
            return updatedStats;
        });
    };

    // Handler: Delete custom mission
    const handleDeleteCustomMission = (id: string) => {
        setStats(prev => ({
            ...prev,
            customMissions: prev.customMissions.filter(m => m.id !== id),
            postponedMissions: prev.postponedMissions.filter(m => m.id !== id)
        }));
    };


    // Handler: Sync missed missions (Materialize into history)
    // Returns the failed restored mission (if any) for modal display
    const syncMissedMissions = (effectiveDayIndex: number): Task | null => {
        const lastProcessed = stats.lastProcessedDayIndex || 0;

        if (effectiveDayIndex <= lastProcessed) return null;

        // Collect failed restored missions to trigger modal after state update
        let failedRestoredMission: Task | null = null;

        setStats(prev => {
            const currentLastProcessed = prev.lastProcessedDayIndex || 0;
            // Only proceed if we actually moved forward
            if (effectiveDayIndex <= currentLastProcessed) return prev;

            let newMissionHistory = [...prev.missionHistory];
            const completedDailyIds = new Set(prev.completedDailyMissionIds);
            const postponedIds = new Set(prev.postponedMissions.map(m => m.id));
            const historyIds = new Set(prev.missionHistory.map(m => m.id));

            let newPoints = prev.points;

            // 1. Process gap in daily missions (NO PENALTY for regular failed missions)
            for (let d = currentLastProcessed; d < effectiveDayIndex; d++) {
                const missionsForDay = getDailyMissions(d);
                missionsForDay.forEach(mission => {
                    if (!completedDailyIds.has(mission.id) && !postponedIds.has(mission.id) && !historyIds.has(mission.id)) {
                        // Calculate date for this day
                        const dueDateObj = prev.dueDate ? new Date(prev.dueDate) : new Date();
                        if (isNaN(dueDateObj.getTime())) {
                            console.warn('Invalid dueDate in syncMissedMissions (daily):', prev.dueDate);
                            return prev;
                        }
                        const missionDate = new Date(dueDateObj);
                        missionDate.setDate(dueDateObj.getDate() - (280 - d));

                        const failedMission: Task = {
                            ...mission,
                            completed: false,
                            failed: true,
                            manualFail: false, // Auto-failed, not manual
                            completedDate: missionDate.toISOString().split('T')[0]
                        };
                        newMissionHistory.push(failedMission);
                        // NO PENALTY for regular failed missions
                    }
                });
            }

            // 2. Process overdue restored missions (last chance failed) - PENALTY APPLIES HERE
            // Calculate current effective date from dueDate and dayIndex
            const dueDateObj = prev.dueDate ? new Date(prev.dueDate) : new Date();
            if (isNaN(dueDateObj.getTime())) {
                console.warn('Invalid dueDate in syncMissedMissions (restored):', prev.dueDate);
                return prev;
            }
            const currentEffectiveDate = new Date(dueDateObj);
            currentEffectiveDate.setDate(dueDateObj.getDate() - (280 - effectiveDayIndex));
            const currentEffectiveDateStr = currentEffectiveDate.toISOString().split('T')[0];

            const overdueRestored = prev.customMissions.filter(cm =>
                cm.restoredCount && cm.restoredCount >= 1 &&
                cm.scheduledDate && cm.scheduledDate < currentEffectiveDateStr
            );

            if (overdueRestored.length > 0) {
                overdueRestored.forEach((m, index) => {
                    const failedMission = {
                        ...m,
                        completed: false,
                        failed: true,
                        manualFail: false, // Auto-failed, not manual
                        completedDate: m.scheduledDate
                    };
                    newMissionHistory.push(failedMission);
                    // Penalty -30 XP for failed second chance
                    newPoints = Math.max(0, newPoints - 30);

                    // Store first failed restored mission to trigger modal after state update
                    if (index === 0) {
                        failedRestoredMission = failedMission;
                    }
                });
            }

            const newCustomMissions = prev.customMissions.filter(cm =>
                !overdueRestored.some(om => om.id === cm.id)
            );

            // Calculate new rank/level if points changed
            const newRank = getRankBasedOnPoints(newPoints);

            // Sort history to keep newest on top (optional as UI might sort it)
            newMissionHistory.sort((a, b) => (b.completedDate || '').localeCompare(a.completedDate || ''));

            return {
                ...prev,
                points: newPoints,
                level: newRank.level,
                missionHistory: newMissionHistory,
                customMissions: newCustomMissions,
                lastProcessedDayIndex: effectiveDayIndex
            };
        });

        // Return the failed restored mission for modal display
        return failedRestoredMission;
    };

    return {
        activeMissions,
        todaysMissionsRaw,
        handleCompleteMission,
        handlePostponeMission,
        handleScheduleMission,
        handleRestoreMission,
        handleAddCustomMission,
        handleDeleteCustomMission,
        syncMissedMissions,
        checkAchievements,
    };
};
