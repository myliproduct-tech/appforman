import React from 'react';
import { parseLocalDate } from '../../utils';
import { Task } from '../../types';

interface MissionStatsProps {
    missions: Task[];
    simulatedDate?: string | null;
}

export const calculateStats = (missions: Task[], simulatedDate?: string | null) => {
    if (!simulatedDate) return { thisMonth: { count: 0, xp: 0 }, thisWeek: { count: 0, xp: 0 }, total: { count: 0, xp: 0 } };

    const now = parseLocalDate(simulatedDate);
    const thisMonth = missions.filter(m => {
        const date = new Date(m.completedDate || '');
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    });

    const thisWeek = missions.filter(m => {
        const date = new Date(m.completedDate || '');
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        return date >= weekAgo && date <= now;
    });

    return {
        thisMonth: {
            count: thisMonth.length,
            xp: thisMonth.reduce((sum, m) => sum + m.points, 0)
        },
        thisWeek: {
            count: thisWeek.length,
            xp: thisWeek.reduce((sum, m) => sum + m.points, 0)
        },
        total: {
            count: missions.length,
            xp: missions.reduce((sum, m) => sum + m.points, 0)
        }
    };
};

const MissionStatsComponent: React.FC<MissionStatsProps> = ({ missions, simulatedDate }) => {
    const stats = calculateStats(missions, simulatedDate);

    return (
        <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="glass-card p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">
                    Tento Měsíc
                </p>
                <p className="text-2xl font-black accent-text">
                    {stats.thisMonth.count}
                </p>
                <p className="text-[10px] opacity-60">
                    +{stats.thisMonth.xp} XP
                </p>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">
                    Tento Týden
                </p>
                <p className="text-2xl font-black accent-text">
                    {stats.thisWeek.count}
                </p>
                <p className="text-[10px] opacity-60">
                    +{stats.thisWeek.xp} XP
                </p>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">
                    Celkem
                </p>
                <p className="text-2xl font-black accent-text">
                    {stats.total.count}
                </p>
                <p className="text-[10px] opacity-60">
                    +{stats.total.xp} XP
                </p>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">
                    Průměr/Mise
                </p>
                <p className="text-2xl font-black text-emerald-400">
                    {stats.total.count > 0 ? Math.round(stats.total.xp / stats.total.count) : 0}
                </p>
                <p className="text-[10px] opacity-60">
                    XP za misi
                </p>
            </div>
        </div>
    );
};

export const MissionStats = React.memo(MissionStatsComponent);
