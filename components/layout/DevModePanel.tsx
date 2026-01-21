import React from 'react';
import { Settings, Eye } from 'lucide-react';
import { getRankBasedOnPoints } from '../../utils';
import { UserStats, Achievement, Task } from '../../types';

interface DevModePanelProps {
    isDevMode: boolean;
    dayOffset: number;
    setDayOffset: (val: number | ((prev: number) => number)) => void;
    setIsDevMode: (val: boolean) => void;
    stats: UserStats;
    setStats: React.Dispatch<React.SetStateAction<UserStats>>;
    onRankUp: (rank: any) => void;
    onAchievementUnlock: (achievement: Achievement) => void;
    checkAchievements: (stats: UserStats) => { updatedStats: UserStats, newUnlock: Achievement | null };
}

export const DevModePanel: React.FC<DevModePanelProps> = ({
    isDevMode,
    dayOffset,
    setDayOffset,
    setIsDevMode,
    stats,
    setStats,
    onRankUp,
    onAchievementUnlock,
    checkAchievements
}) => {
    if (!isDevMode) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-yellow-500/20 backdrop-blur-md border-b border-yellow-500/30 p-2 sm:p-3">
            <div className="max-w-md mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
                {/* Header */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                    <div className="flex items-center gap-2">
                        <Settings className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-yellow-400">Dev Mode</span>
                    </div>
                    {/* Close button - mobile only */}
                    <button
                        onClick={() => setIsDevMode(false)}
                        className="sm:hidden text-xs text-yellow-400 opacity-60 hover:opacity-100"
                    >
                        <Eye className="w-3 h-3" />
                    </button>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    {/* Day offset controls */}
                    <div className="flex items-center gap-1 bg-black/20 rounded-lg p-1 flex-1 sm:flex-initial">
                        <button
                            onClick={() => setDayOffset(prev => prev - 7)}
                            className="px-1.5 sm:px-2 py-0.5 sm:py-1 hover:bg-white/10 rounded text-[9px] sm:text-[10px] font-black"
                            title="-1 Týden"
                        >
                            -7
                        </button>
                        <button
                            onClick={() => setDayOffset(dayOffset - 1)}
                            className="px-1.5 sm:px-2 py-0.5 sm:py-1 hover:bg-white/10 rounded text-[9px] sm:text-[10px] font-black"
                            title="-1 Den"
                        >
                            -1
                        </button>

                        <div className="flex items-center gap-1 px-1 sm:px-2 border-x border-white/10 mx-0.5 sm:mx-1">
                            <span className="text-[8px] sm:text-[10px] font-black opacity-40 uppercase tracking-tighter">Den</span>
                            <input
                                type="number"
                                value={dayOffset}
                                onChange={(e) => setDayOffset(parseInt(e.target.value) || 0)}
                                className="w-8 sm:w-10 bg-transparent text-center text-[10px] sm:text-xs font-mono font-bold text-yellow-300 focus:outline-none"
                            />
                        </div>

                        <button
                            onClick={() => setDayOffset(dayOffset + 1)}
                            className="px-1.5 sm:px-2 py-0.5 sm:py-1 hover:bg-white/10 rounded text-[9px] sm:text-[10px] font-black"
                            title="+1 Den"
                        >
                            +1
                        </button>
                        <button
                            onClick={() => setDayOffset(dayOffset + 7)}
                            className="px-1.5 sm:px-2 py-0.5 sm:py-1 hover:bg-white/10 rounded text-[9px] sm:text-[10px] font-black"
                            title="+1 Týden"
                        >
                            +7
                        </button>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        <button
                            onClick={() => {
                                setStats(prev => {
                                    const newPoints = prev.points + 100;
                                    const oldRank = getRankBasedOnPoints(prev.points);
                                    const newRank = getRankBasedOnPoints(newPoints);

                                    let nextStats = {
                                        ...prev,
                                        points: newPoints,
                                        level: newRank.level
                                    };

                                    // Check for rank up
                                    if (newRank.level > oldRank.level) {
                                        onRankUp(newRank);
                                    }

                                    // Check achievements
                                    const { updatedStats, newUnlock } = checkAchievements(nextStats);
                                    if (newUnlock) onAchievementUnlock(newUnlock);

                                    return updatedStats;
                                });
                            }}
                            className="px-2 sm:px-3 py-0.5 sm:py-1 bg-green-500/20 rounded text-[9px] sm:text-xs font-bold text-green-400 hover:bg-green-500/30"
                            title="Přidat 100 XP"
                        >
                            +100
                        </button>
                        <button
                            onClick={() => {
                                if (confirm('Opravdu chceš resetovat celou aplikaci? Všechna data budou smazána!')) {
                                    localStorage.clear();
                                    window.location.reload();
                                }
                            }}
                            className="px-2 sm:px-3 py-0.5 sm:py-1 bg-red-500/20 rounded text-[9px] sm:text-xs font-bold text-red-400 hover:bg-red-500/30"
                            title="Reset aplikace"
                        >
                            Reset
                        </button>
                        {/* Close button - desktop only */}
                        <button
                            onClick={() => setIsDevMode(false)}
                            className="hidden sm:block text-xs text-yellow-400 opacity-60 hover:opacity-100"
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
