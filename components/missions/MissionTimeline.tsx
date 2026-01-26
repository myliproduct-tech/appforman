import React, { useState } from 'react';
import { Task } from '../../types';
import { localizeText, parseLocalDate } from '../../utils';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';

interface MissionTimelineProps {
    missions: Task[];
    simulatedDate?: string | null;
    dayIndex: number;
}

export const getTaskWebData = (completedDateStr: string | undefined, simulatedDate: string | null, dayIndex: number) => {
    if (!completedDateStr || !simulatedDate) return { week: 0, month: 0 };

    const compDate = new Date(completedDateStr);
    const today = parseLocalDate(simulatedDate);

    const conceptionDate = new Date(today);
    conceptionDate.setDate(today.getDate() - dayIndex);

    const diffTime = compDate.getTime() - conceptionDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const week = Math.max(1, Math.floor(diffDays / 7) + 1);
    const month = Math.max(1, Math.ceil(week / 4));

    return { week, month };
};

export const groupMissionsByMonth = (missions: Task[]) => {
    const grouped = missions.reduce((acc, mission) => {
        const date = new Date(mission.completedDate || '');
        const monthKey = `${date.getFullYear()} -${String(date.getMonth() + 1).padStart(2, '0')} `;

        if (!acc[monthKey]) {
            acc[monthKey] = {
                label: date.toLocaleDateString('cs-CZ', { month: 'long', year: 'numeric' }),
                missions: [],
                monthKey
            };
        }

        acc[monthKey].missions.push(mission);
        return acc;
    }, {} as Record<string, { label: string; missions: Task[]; monthKey: string }>);

    return Object.values(grouped).sort((a, b) => b.monthKey.localeCompare(a.monthKey));
};

const MissionTimelineComponent: React.FC<MissionTimelineProps> = ({ missions, simulatedDate, dayIndex }) => {
    const [isExporting, setIsExporting] = useState(false);
    const groupedByMonth = groupMissionsByMonth(missions);

    const exportTimeline = async () => {
        try {
            setIsExporting(true);
            const element = document.getElementById('mission-history-export');
            if (!element) return;

            const canvas = await html2canvas(element, {
                scale: 2,
                backgroundColor: '#1f2933',
                logging: false,
                useCORS: true
            });

            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `mise - historie - ${new Date().toISOString().split('T')[0]}.png`;
            link.href = imgData;
            link.click();
            setIsExporting(false);
        } catch (error) {
            console.error('Export failed:', error);
            setIsExporting(false);
        }
    };

    if (missions.length === 0) return null;

    return (
        <div className="space-y-6">
            <button
                onClick={exportTimeline}
                disabled={isExporting}
                className="w-full py-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all disabled:opacity-50"
            >
                <Download className="w-4 h-4" />
                {isExporting ? 'Exportuji...' : 'Exportovat do PNG'}
            </button>

            <div id="mission-history-export" className="space-y-8">
                {groupedByMonth.map((monthGroup, monthIdx) => (
                    <div key={monthIdx} className="relative">
                        <div className="sticky top-0 bg-[#1f2933]/95 backdrop-blur-md py-2 mb-4 z-10 border-b border-white/5">
                            <h3 className="text-sm font-black uppercase tracking-widest accent-text">
                                {monthGroup.label}
                            </h3>
                            <p className="text-[10px] opacity-40">
                                {monthGroup.missions.length} {monthGroup.missions.length === 1 ? 'mise' : 'misí'}
                            </p>
                        </div>

                        <div className="relative pl-8">
                            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#f6c453] via-[#f6c453]/50 to-transparent" />

                            {monthGroup.missions.map((mission, idx) => (
                                <div key={`${mission.id}_timeline_${idx} `} className="relative mb-6 animate-fade-in">
                                    <div className="absolute -left-6 top-2 w-4 h-4 rounded-full bg-[#f6c453] border-4 border-[#1f2933] shadow-lg shadow-[#f6c453]/50 z-10" />

                                    <div className="glass-card p-4 rounded-2xl border-l-4 border-[#f6c453] hover:translate-x-1 transition-transform">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">
                                                    {new Date(mission.completedDate || '').toLocaleDateString('cs-CZ', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                                <h4 className="font-bold text-sm mb-1">
                                                    {mission.title}
                                                </h4>
                                                {mission.description && (
                                                    <p className="text-[10px] opacity-60 line-clamp-2">
                                                        {mission.description}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="text-right ml-3">
                                                <span className="text-xs font-black accent-text block mb-1">
                                                    +{mission.points} XP
                                                </span>
                                                <span className="text-[10px] opacity-40 uppercase block">
                                                    {mission.category?.replace('_', ' ')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const MissionTimeline = React.memo(MissionTimelineComponent);
