import React from 'react';
import { Task, TaskCategory } from '../../types';
import {
    Shield, Wrench, Wallet, ShoppingBag, Map, Search, Stethoscope,
    Heart, FileText, Hammer, ClipboardList, Truck, Baby, Trophy,
    Cpu, Command, Target, CheckCircle2, Circle, CalendarDays, XCircle, Clock, RotateCcw, Trash2, HeartOff
} from 'lucide-react';

interface MissionTaskCardProps {
    task: Task;
    isHistory?: boolean;
    isPostponed?: boolean;
    isMissed?: boolean;
    onComplete?: (task: Task) => void;
    onOpenScheduleModal?: (task: Task, mode: 'restore' | 'postpone') => void;
    onDelete?: (taskId: string) => void;
}

export const getCategoryIcon = (category: TaskCategory) => {
    switch (category) {
        case 'perimetr': return <Shield className="w-4 h-4" />;
        case 'údržba': return <Wrench className="w-4 h-4" />;
        case 'trezor': return <Wallet className="w-4 h-4" />;
        case 'zásoby': return <ShoppingBag className="w-4 h-4" />;
        case 'strategie': return <Map className="w-4 h-4" />;
        case 'průzkum': return <Search className="w-4 h-4" />;
        case 'medik': return <Stethoscope className="w-4 h-4" />;
        case 'servis': return <Heart className="w-4 h-4" />;
        case 'briefing': return <FileText className="w-4 h-4" />;
        case 'stavba': return <Hammer className="w-4 h-4" />;
        case 'logistika': return <ClipboardList className="w-4 h-4" />;
        case 'transport': return <Truck className="w-4 h-4" />;
        case 'junior_update': return <Baby className="w-4 h-4" />;
        case 'velká_mise': return <Trophy className="w-4 h-4" />;
        case 'hardware': return <Cpu className="w-4 h-4" />;
        case 'vlastní_rozkaz': return <Command className="w-4 h-4" />;
        default: return <Target className="w-4 h-4" />;
    }
};

export const getCategoryColor = (category: TaskCategory) => {
    switch (category) {
        case 'vlastní_rozkaz': return 'bg-white/10 text-white border-white/20';
        case 'perimetr': return 'bg-red-500/10 text-red-400 border-red-500/20';
        case 'údržba': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
        case 'trezor': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
        case 'zásoby': return 'bg-amber-600/10 text-amber-500 border-amber-600/20';
        case 'strategie': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
        case 'průzkum': return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
        case 'medik': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
        case 'servis': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
        case 'briefing': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
        case 'stavba': return 'bg-stone-500/10 text-stone-400 border-stone-500/20';
        case 'logistika': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
        case 'transport': return 'bg-cyan-600/10 text-cyan-400 border-cyan-600/20';
        case 'junior_update': return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
        case 'velká_mise': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
        case 'hardware': return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
        default: return 'bg-white/5 text-white/40 border-white/5';
    }
};

const MissionTaskCardComponent: React.FC<MissionTaskCardProps> = ({
    task,
    isHistory,
    isPostponed,
    isMissed,
    onComplete,
    onOpenScheduleModal,
    onDelete
}) => {
    const isBigMission = task.category === 'velká_mise';

    return (
        <div
            className={`glass-card p-6 rounded-[2rem] border transition-all relative overflow-hidden group tap-effect card-tactical animate-scale-in
      ${isHistory ? 'border-emerald-500/20 bg-emerald-500/5 opacity-80' :
                    isPostponed ? 'border-amber-500/20 bg-amber-500/5' :
                        isMissed ? 'border-red-500/20 bg-red-500/5 opacity-60 grayscale-[0.5]' :
                            'hover:bg-white/[0.05] border-white/5'}
      ${isBigMission && !isHistory && !isMissed ? 'shadow-[0_0_30px_rgba(168,85,247,0.15)] border-purple-500/30' : ''}
    `}
        >
            <div className="flex items-start justify-between mb-3">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${getCategoryColor(task.category)}`}>
                    {getCategoryIcon(task.category)} {task.category.replace('_', ' ').toUpperCase()}
                </div>
                <div className="flex items-center gap-2">
                    {task.priority === 'highest' && (
                        <div className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                            ⚠️ NEJVYŠŠÍ PRIORITA
                        </div>
                    )}
                    <span className={`font-black text-sm ${isHistory ? 'text-emerald-400' : isMissed ? 'text-red-400 decoration-line-through' : 'accent-text'}`}>+{task.points} XP</span>
                    {isHistory ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : isMissed ? <XCircle className="w-5 h-5 text-red-500" /> : <Circle className="w-5 h-5 opacity-20" />}
                </div>
            </div>

            <h3 className={`font-black ${isBigMission ? 'text-xl text-purple-200' : 'text-lg text-[#f5f7fa]'} leading-tight mb-2 tracking-tight ${isHistory || isMissed ? 'opacity-50' : ''}`}>
                {task.title}
            </h3>

            <p className={`text-xs leading-relaxed mb-6 font-medium ${isHistory || isMissed ? 'text-[#f5f7fa]/30' : 'text-[#f5f7fa] opacity-60'}`}>
                {task.description}
            </p>

            {isHistory && (
                <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500/50 flex items-center gap-2">
                    <CalendarDays className="w-3 h-3" />
                    Splněno: {task.completedDate ? new Date(task.completedDate).toLocaleDateString('cs-CZ') : 'Neznámo'}
                </div>
            )}

            {isMissed && (
                <div className="mt-2 space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-red-500/50 flex items-center gap-2">
                        <XCircle className="w-3 h-3" />
                        Nesplněno: {task.completedDate ? new Date(task.completedDate).toLocaleDateString('cs-CZ') : 'Neznámo'}
                    </div>
                    {task.restoredCount && task.restoredCount >= 1 && (
                        <div className="p-3 bg-black/40 border border-red-500/20 rounded-2xl">
                            <p className="text-[10px] text-red-400 font-bold leading-tight">
                                <HeartOff className="w-4 h-4 inline mr-1" /> ŠANCE PROMARNĚNA
                                <span className="block text-[10px] opacity-60 font-medium mt-1 lowercase first-letter:uppercase">Tato mise už jednou byla obnovena. Zklamal jsi svou partnerku a šance je navždy pryč.</span>
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* MISSED ACTIONS (RESTORE) */}
            {isMissed && (!task.restoredCount || task.restoredCount < 1) && onOpenScheduleModal && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                    <button
                        onClick={() => onOpenScheduleModal(task, 'restore')}
                        className="flex-1 py-4 bg-white/5 text-[#f6c453] rounded-xl font-black uppercase tracking-[0.2em] text-[10px] border border-[#f6c453]/20 active:scale-95 transition-all hover:bg-[#f6c453]/10 flex items-center justify-center gap-2 min-h-[48px] tap-effect btn-tactical"
                    >
                        <HeartOff className="w-5 h-5 text-red-500" /> Obnovit misi
                    </button>
                </div>
            )}

            {/* ACTIVE ACTIONS */}
            {!isHistory && !isPostponed && !isMissed && (
                <div className="flex gap-2">
                    <button
                        onClick={() => onComplete && onComplete(task)}
                        className={`flex-1 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] active:scale-95 transition-all shadow-lg tap-effect btn-tactical
            ${isBigMission ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-500/20' : 'accent-bg text-[#1f2933] shadow-[#f6c453]/10'}`}
                    >
                        {isBigMission ? 'Splnit Velkou Misi' : 'Splnit'}
                    </button>
                    <button
                        onClick={() => onOpenScheduleModal && onOpenScheduleModal(task, 'postpone')}
                        className="px-5 py-4 bg-white/5 text-[#f5f7fa] rounded-xl border border-white/10 active:scale-95 transition-all hover:bg-white/10 min-h-[48px] min-w-[48px] flex items-center justify-center tap-effect btn-tactical"
                        title="Odložit"
                    >
                        <Clock className="w-6 h-6 opacity-60" />
                    </button>
                    {task.category === 'vlastní_rozkaz' && onDelete && (
                        <button
                            onClick={() => onDelete(task.id)}
                            className="px-4 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20 active:scale-95 transition-all hover:bg-red-500/20"
                            title="Zrušit"
                        >
                            <Trash2 className="w-5 h-5 opacity-80" />
                        </button>
                    )}
                </div>
            )}

            {/* POSTPONED ACTIONS */}
            {isPostponed && onOpenScheduleModal && (
                <div className="flex gap-2">
                    <button
                        onClick={() => onOpenScheduleModal(task, 'restore')}
                        className="flex-1 py-4 bg-white/5 text-[#f5f7fa] rounded-xl font-black uppercase tracking-[0.2em] text-[10px] border border-white/10 active:scale-95 transition-all hover:bg-white/10 flex items-center justify-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" /> Obnovit do služby
                    </button>
                </div>
            )}
        </div>
    );
};

export const MissionTaskCard = React.memo(MissionTaskCardComponent);
