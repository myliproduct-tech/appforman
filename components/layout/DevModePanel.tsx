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
        <div className="fixed top-0 left-0 right-0 z-[100] bg-yellow-500/20 backdrop-blur-md border-b border-yellow-500/30 p-3">
            <div className="max-w-md mx-auto flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-yellow-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400">Dev Mode</span>
                </div>
                <div className="flex items-center gap-1 bg-black/20 rounded-lg p-1">
                    <button
                        onClick={() => setDayOffset(prev => prev - 7)}
                        className="px-2 py-1 hover:bg-white/10 rounded text-[10px] font-black"
                        title="-1 Týden"
                    >
                        -7
                    </button>
                    <button
                        onClick={() => setDayOffset(dayOffset - 1)}
                        className="px-2 py-1 hover:bg-white/10 rounded text-[10px] font-black"
                        title="-1 Den"
                    >
                        -1
                    </button>

                    <div className="flex items-center gap-1 px-2 border-x border-white/10 mx-1">
                        <span className="text-[10px] font-black opacity-40 uppercase tracking-tighter">Den</span>
                        <input
                            type="number"
                            value={dayOffset}
                            onChange={(e) => setDayOffset(parseInt(e.target.value) || 0)}
                            className="w-10 bg-transparent text-center text-xs font-mono font-bold text-yellow-300 focus:outline-none"
                        />
                    </div>

                    <button
                        onClick={() => setDayOffset(dayOffset + 1)}
                        className="px-2 py-1 hover:bg-white/10 rounded text-[10px] font-black"
                        title="+1 Den"
                    >
                        +1
                    </button>
                    <button
                        onClick={() => setDayOffset(dayOffset + 7)}
                        className="px-2 py-1 hover:bg-white/10 rounded text-[10px] font-black"
                        title="+1 Týden"
                    >
                        +7
                    </button>
                </div>
                <div className="flex items-center gap-2">
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
                        className="px-3 py-1 bg-green-500/20 rounded text-xs font-bold text-green-400 hover:bg-green-500/30"
                        title="Přidat 100 XP"
                    >
                        +100 XP
                    </button>
                    <button
                        onClick={() => {
                            if (confirm('Opravdu chceš resetovat celou aplikaci? Všechna data budou smazána!')) {
                                localStorage.clear();
                                window.location.reload();
                            }
                        }}
                        className="px-3 py-1 bg-red-500/20 rounded text-xs font-bold text-red-400 hover:bg-red-500/30"
                        title="Reset aplikace"
                    >
                        Reset
                    </button>
                    <button
                        onClick={() => setIsDevMode(false)}
                        className="text-xs text-yellow-400 opacity-60 hover:opacity-100"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};
