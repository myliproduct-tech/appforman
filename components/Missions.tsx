import React, { useRef, useEffect } from 'react';
import { Task, TaskCategory } from '../types';
import { getDailyMissions } from '../data/dailyMissions';
import { Target, Shield, Wrench, Wallet, ShoppingBag, Map, Search, Stethoscope, Heart, FileText, Hammer, ClipboardList, Truck, Baby, Trophy, Cpu, CheckCircle2, Circle, CalendarDays, Star, Info, Plus, X, Command, Archive, Clock, History, RotateCcw, Trash2, Sun, Sunrise, ArrowRight, Calendar, Filter, XCircle, Download } from 'lucide-react';
import { MissionTaskCard } from './missions/MissionTaskCard';
import { MissionSkeleton } from './missions/MissionSkeleton';
import { MissionStats } from './missions/MissionStats';
import { MissionTimeline, getTaskWebData } from './missions/MissionTimeline';
import { MissionScheduler } from './missions/MissionScheduler';
import { CustomMissionForm } from './missions/CustomMissionForm';
import { MISSIONS_TOUR } from '../tourSteps/missionsTour';
import { localizeText } from '../utils';
import { useMissionsReducer } from '../hooks/useMissionsReducer';

interface MissionsProps {
    missions?: Task[]; // Legacy prop
    dailyMissions: Task[]; // Active missions (Daily + Custom)
    postponedMissions: Task[];
    missionHistory: Task[];
    customMissions: Task[];
    loading?: boolean;
    onComplete: (task: Task) => void;
    onPostpone: (task: Task) => void;
    onSchedule: (task: Task, date: string) => void;
    onRestore: (task: Task, date: string) => void; // New: For restoring missions with priority
    onAddCustom: (title: string, desc: string, date: string) => void;
    onDelete: (taskId: string) => void;
    onRefresh?: () => void;
    simulatedDate?: string | null;
    dayIndex: number;
    partnerName: string;
    tourCompleted?: boolean;
    onCompleteTour?: () => void;
}

export const Missions: React.FC<MissionsProps> = ({
    dailyMissions,
    postponedMissions,
    missionHistory,
    onComplete,
    onPostpone,
    onSchedule,
    onRestore,
    onAddCustom,
    onDelete,
    simulatedDate,
    dayIndex,
    customMissions,
    partnerName,
    loading = false,
    tourCompleted = false,
    onCompleteTour
}) => {
    // Use reducer for all state management
    const { state, dispatch } = useMissionsReducer();

    // Destructure state for easier access
    const { activeTab } = state.tabs;
    const { showCustomForm, schedulingTask, scheduleMode } = state.modals;
    const { category: filterCategory, week: filterWeek, month: filterMonth } = state.filters;
    const { mode: archiveMode } = state.archive;
    const { isExporting } = state.ui;

    // Localize all mission lists
    const localizedDailyMissions = React.useMemo(() =>
        dailyMissions.map(m => ({
            ...m,
            title: localizeText(m.title, partnerName),
            description: localizeText(m.description, partnerName)
        })), [dailyMissions, partnerName]);

    const localizedPostponedMissions = React.useMemo(() =>
        postponedMissions.map(m => ({
            ...m,
            title: localizeText(m.title, partnerName),
            description: localizeText(m.description, partnerName)
        })), [postponedMissions, partnerName]);

    const localizedCustomMissions = React.useMemo(() =>
        customMissions.map(m => ({
            ...m,
            title: localizeText(m.title, partnerName),
            description: localizeText(m.description, partnerName)
        })), [customMissions, partnerName]);

    const localizedHistory = React.useMemo(() =>
        missionHistory.map(m => ({
            ...m,
            title: localizeText(m.title, partnerName),
            description: localizeText(m.description, partnerName)
        })), [missionHistory, partnerName]);

    const formattedDate = (() => {
        if (!simulatedDate) return 'Dnešní mise';
        const date = new Date(simulatedDate);
        if (isNaN(date.getTime())) return 'Dnešní mise';
        return date.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long' });
    })();

    // Calculate stats and filtered data for timeline
    // Note: Stats calculation is now internal to MissionStats component
    // except if we need stats for other things (we don't appear to)


    const filteredHistory = localizedHistory.filter(task => {
        if (task.failed) return false;
        if (filterCategory !== 'all' && task.category !== filterCategory) return false;

        const { week, month } = getTaskWebData(task.completedDate, simulatedDate, dayIndex);

        if (filterWeek !== 'all' && week !== filterWeek) return false;
        if (filterMonth !== 'all' && month !== filterMonth) return false;

        return true;
    });

    const filteredMissed = localizedHistory.filter(task => {
        if (!task.failed) return false;
        if (filterCategory !== 'all' && task.category !== filterCategory) return false;

        const { week, month } = getTaskWebData(task.completedDate, simulatedDate, dayIndex);
        if (filterWeek !== 'all' && week !== filterWeek) return false;
        if (filterMonth !== 'all' && month !== filterMonth) return false;

        return true;
    });

    const resetFilters = () => {
        dispatch({ type: 'RESET_FILTERS' });
    };

    // Get unique values for dropdowns (Using missionHistory which now contains both completed and failed missions)
    const availableCategories = Array.from(new Set(missionHistory.map(m => m.category)));
    const availableWeeks = Array.from(new Set(missionHistory.map(m => getTaskWebData(m.completedDate, simulatedDate, dayIndex).week))).filter(w => w > 0).sort((a: number, b: number) => a - b);
    const availableMonths = Array.from(new Set(missionHistory.map(m => getTaskWebData(m.completedDate, simulatedDate, dayIndex).month))).filter(m => m > 0).sort((a: number, b: number) => a - b);

    const openScheduleModal = (task: Task, mode: 'restore' | 'postpone') => {
        dispatch({ type: 'OPEN_SCHEDULE_MODAL', task, mode });
    };

    const confirmSchedule = (dateStr: string) => {
        if (schedulingTask) {
            // Use onRestore for restore mode, onSchedule for postpone mode
            if (scheduleMode === 'restore') {
                onRestore(schedulingTask, dateStr);
            } else {
                onSchedule(schedulingTask, dateStr);
            }
            dispatch({ type: 'CLOSE_SCHEDULE_MODAL' });
        }
    };

    const confirmToBacklog = () => {
        if (schedulingTask) {
            onPostpone(schedulingTask);
            dispatch({ type: 'CLOSE_SCHEDULE_MODAL' });
        }
    };

    return (
        <div className="space-y-6 pb-20">
            {/* Enhanced Header - Simplified to Yellow/Slate */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#f6c453]/10 via-slate-500/5 to-slate-500/10 border border-[#f6c453]/20 p-6 shadow-lg shadow-[#f6c453]/5 group">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2Y2YzQ1MyIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30 group-hover:opacity-40 transition-opacity"></div>

                <div className="relative flex items-center gap-3">
                    <div className="p-3 bg-[#f6c453]/10 rounded-xl backdrop-blur-sm group-hover:scale-110 group-hover:rotate-12 transition-transform">
                        <Target className="w-6 h-6 text-[#f6c453]" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black italic uppercase accent-text tracking-tight inline-block pr-3 group-hover:translate-x-1 transition-transform">
                            Denní Mise
                        </h2>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                            Operace • Den {dayIndex}
                        </p>
                    </div>
                </div>
            </div>

            <header className="px-2 space-y-4">
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-xl font-black accent-text italic uppercase tracking-tighter leading-none">Operační Plán</h2>
                        <div className="flex items-center gap-2 mt-2">
                            <CalendarDays className="w-3 h-3 opacity-30" />
                            <p className="text-[10px] font-black opacity-30 uppercase tracking-widest">{formattedDate} • Den {dayIndex} / 280</p>
                        </div>
                    </div>
                    {/* Add Custom Mission Button */}
                    <button
                        onClick={() => dispatch({ type: 'TOGGLE_CUSTOM_FORM' })}
                        className={`p-3 rounded-2xl border transition-all active:scale-90 ${showCustomForm ? 'bg-red-500/20 text-red-500 border-red-500/30' : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-[#f6c453]/30 group'}`}
                    >
                        {showCustomForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />}
                    </button>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-[#2d3748] p-1 rounded-2xl flex text-[10px] font-black uppercase tracking-widest">
                    <button
                        onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', value: 'active' })}
                        className={`flex-1 py-3 rounded-xl transition-all ${activeTab === 'active' ? 'accent-bg text-[#1f2933] shadow-md' : 'text-white/40 hover:text-white'}`}
                    >
                        Aktivní
                    </button>
                    <button
                        onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', value: 'postponed' })}
                        className={`flex-1 py-3 rounded-xl transition-all ${activeTab === 'postponed' ? 'accent-bg text-[#1f2933] shadow-md' : 'text-white/40 hover:text-white'}`}
                    >
                        Záloha
                    </button>
                    <button
                        onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', value: 'history' })}
                        className={`flex-1 py-3 rounded-xl transition-all ${activeTab === 'history' ? 'bg-white/10 text-white shadow-md' : 'text-white/40 hover:text-white'}`}
                    >
                        Archiv
                    </button>
                </div>

                {/* Advisory Notice */}
                <div className="bg-[#f6c453]/10 border border-[#f6c453]/20 rounded-2xl p-4 flex gap-3 items-start animate-fade-in">
                    <Heart className="w-5 h-5 text-[#f6c453] shrink-0" />
                    <p className="text-[10px] leading-relaxed font-bold text-[#f6c453]/80 uppercase tracking-wide">
                        <span className="text-[#f6c453]">Důležité:</span> Pokud se mise týká partnerky, pamatuj, že ji nesmíš do ničeho nutit. Vše musí probíhat v pohodě a na základě jejího souhlasu.
                    </p>
                </div>
            </header>

            {/* SCHEDULE MODAL */}
            <MissionScheduler
                task={schedulingTask}
                mode={scheduleMode}
                onClose={() => dispatch({ type: 'CLOSE_SCHEDULE_MODAL' })}
                onConfirm={confirmSchedule}
                onPostponeToBacklog={confirmToBacklog}
                simulatedDate={simulatedDate}
            />

            {/* CUSTOM MISSION FORM */}
            <CustomMissionForm
                isVisible={showCustomForm}
                onToggle={(value) => dispatch({ type: 'SET_CUSTOM_FORM', value })}
                onSubmit={onAddCustom}
                simulatedDate={simulatedDate}
            />

            {/* CONTENT AREA */}
            <div className="space-y-4 animate-fade-in pb-20">

                {/* ACTIVE TAB */}
                {
                    activeTab === 'active' && (
                        <>
                            {loading ? (
                                <>
                                    <MissionSkeleton />
                                    <MissionSkeleton />
                                    <MissionSkeleton />
                                </>
                            ) : (
                                <>
                                    {/* Daily Missions */}
                                    {localizedDailyMissions.map((mission) => (
                                        <MissionTaskCard
                                            key={mission.id}
                                            task={mission}
                                            onComplete={onComplete}
                                            onOpenScheduleModal={openScheduleModal}
                                        />
                                    ))}

                                    {/* Scheduled Custom Missions for Today */}
                                    {localizedCustomMissions
                                        .filter(m => m.scheduledDate === simulatedDate)
                                        .map((mission) => (
                                            <MissionTaskCard
                                                key={mission.id}
                                                task={mission}
                                                onComplete={onComplete}
                                                onOpenScheduleModal={openScheduleModal}
                                                onDelete={onDelete}
                                            />
                                        ))}

                                    {dailyMissions.length === 0 && customMissions.filter(m => m.scheduledDate === simulatedDate).length === 0 && (
                                        <div className="text-center py-20 opacity-30">
                                            <Target className="w-12 h-12 mx-auto mb-4" />
                                            <p className="text-xs font-black uppercase tracking-widest">Žádné aktivní rozkazy</p>
                                            <p className="text-[10px] mt-2">Vytvoř vlastní misi nebo si odpočiň, veliteli.</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )
                }

                {/* POSTPONED TAB */}
                {
                    activeTab === 'postponed' && (
                        <>
                            {localizedPostponedMissions.map((mission) => (
                                <MissionTaskCard
                                    key={mission.id}
                                    task={mission}
                                    isPostponed
                                    onOpenScheduleModal={openScheduleModal}
                                />
                            ))}

                            {postponedMissions.length === 0 && (
                                <div className="text-center py-20 opacity-30">
                                    <Clock className="w-12 h-12 mx-auto mb-4" />
                                    <p className="text-xs font-black uppercase tracking-widest">Záloha je prázdná</p>
                                </div>
                            )}
                        </>
                    )
                }

                {/* HISTORY TAB */}
                {
                    activeTab === 'history' && (
                        <div className="space-y-6">

                            {/* STATS PANEL */}
                            {archiveMode === 'completed' && (
                                <MissionStats missions={filteredHistory} simulatedDate={simulatedDate} />
                            )}

                            {/* TOGGLE COMPLETED / MISSED */}
                            <div className="flex p-1 bg-white/5 rounded-xl mx-auto max-w-xs">
                                <button
                                    onClick={() => dispatch({ type: 'SET_ARCHIVE_MODE', value: 'completed' })}
                                    className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 ${archiveMode === 'completed' ? 'bg-[#f6c453]/20 text-[#f6c453] shadow-sm' : 'text-white/30 hover:text-white'}`}
                                >
                                    <CheckCircle2 className="w-3 h-3" /> Splněné
                                </button>
                                <button
                                    onClick={() => dispatch({ type: 'SET_ARCHIVE_MODE', value: 'missed' })}
                                    className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 ${archiveMode === 'missed' ? 'bg-red-500/20 text-red-400 shadow-sm' : 'text-white/30 hover:text-white'}`}
                                >
                                    <XCircle className="w-3 h-3" /> Nesplněné
                                </button>
                            </div>

                            {/* FILTERS UI */}
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-3">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest accent-text flex items-center gap-2">
                                        <Filter className="w-3 h-3" /> Filtr archivu
                                    </h4>
                                    {(filterCategory !== 'all' || filterWeek !== 'all' || filterMonth !== 'all') && (
                                        <button onClick={resetFilters} className="text-[10px] text-red-400 hover:underline">
                                            Zrušit filtry
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    {/* CATEGORY */}
                                    <select
                                        value={filterCategory}
                                        onChange={(e) => dispatch({ type: 'SET_FILTER_CATEGORY', value: e.target.value as TaskCategory | 'all' })}
                                        className="bg-[#1f2933] text-white text-[10px] p-2 rounded-xl border border-white/10 outline-none focus:border-[#f6c453]"
                                    >
                                        <option value="all">Všechny kategorie</option>
                                        {availableCategories.map(c => (
                                            <option key={c} value={c}>{(c as string).replace('_', ' ').toUpperCase()}</option>
                                        ))}
                                    </select>

                                    {/* MONTH */}
                                    <select
                                        value={filterMonth}
                                        onChange={(e) => {
                                            dispatch({ type: 'SET_FILTER_MONTH', value: e.target.value === 'all' ? 'all' : Number(e.target.value) });
                                        }}
                                        className="bg-[#1f2933] text-white text-[10px] p-2 rounded-xl border border-white/10 outline-none focus:border-[#f6c453]"
                                    >
                                        <option value="all">Všechny měsíce</option>
                                        {availableMonths.map(m => (
                                            <option key={m} value={m}>{m}. Měsíc</option>
                                        ))}
                                    </select>

                                    {/* WEEK */}
                                    <select
                                        value={filterWeek}
                                        onChange={(e) => dispatch({ type: 'SET_FILTER_WEEK', value: e.target.value === 'all' ? 'all' : Number(e.target.value) })}
                                        className="bg-[#1f2933] text-white text-[10px] p-2 rounded-xl border border-white/10 outline-none focus:border-[#f6c453]"
                                    >
                                        <option value="all">Všechny týdny</option>
                                        {availableWeeks
                                            .filter((w: number) => filterMonth === 'all' || Math.ceil(w / 4) === filterMonth)
                                            .map((w: number) => (
                                                <option key={w} value={w}>{w}. Týden</option>
                                            ))}
                                    </select>
                                </div>
                            </div>

                            {/* MISSION LIST / TIMELINE */}
                            {archiveMode === 'completed' ? (
                                filteredHistory.length === 0 ? (
                                    <div className="text-center py-20 opacity-30">
                                        <Archive className="w-12 h-12 mx-auto mb-4" />
                                        <p className="text-xs font-black uppercase tracking-widest">Žádné splněné mise</p>
                                    </div>
                                ) : (
                                    <MissionTimeline missions={filteredHistory} simulatedDate={simulatedDate} dayIndex={dayIndex} />
                                )
                            ) : (
                                // MISSED MISSIONS LIST
                                filteredMissed.length === 0 ? (
                                    <div className="text-center py-20 opacity-30">
                                        <Target className="w-12 h-12 mx-auto mb-4" />
                                        <p className="text-xs font-black uppercase tracking-widest">Žádné nesplněné mise</p>
                                        <p className="text-[10px] mt-2">Všehno jsi zvládl, skvělá práce!</p>
                                    </div>
                                ) : (
                                    filteredMissed.map((mission, idx) => (
                                        <MissionTaskCard
                                            key={`${mission.id}_missed_${idx}`}
                                            task={mission}
                                            isMissed
                                            onOpenScheduleModal={openScheduleModal}
                                        />
                                    ))
                                )
                            )}
                        </div>
                    )
                }

            </div >
        </div >
    );
};
