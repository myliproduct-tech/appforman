import React, { useState, useEffect, useRef } from 'react';
import { Task } from '../../types';
import { X, Clock, Calendar, CalendarDays, ArrowRight, RotateCcw, Sunrise, Sun, AlertTriangle } from 'lucide-react';
import { DatePickerModal } from '../common/DatePickerModal';

interface MissionSchedulerProps {
    task: Task | null;
    mode: 'restore' | 'postpone';
    simulatedDate?: string | null;
    onClose: () => void;
    onConfirm: (dateStr: string) => void;
    onPostponeToBacklog: () => void;
}

const MissionSchedulerComponent: React.FC<MissionSchedulerProps> = ({
    task,
    mode,
    simulatedDate,
    onClose,
    onConfirm,
    onPostponeToBacklog
}) => {
    const [manualDate, setManualDate] = useState<string>('');
    const datePickerRef = useRef<HTMLInputElement>(null);
    const customDateRef = useRef<HTMLInputElement>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        if (task) {
            const base = new Date(simulatedDate || new Date());
            if (mode === 'postpone') {
                base.setDate(base.getDate() + 1);
            }
            setManualDate(base.toISOString().split('T')[0]);
        }
    }, [task, mode, simulatedDate]);

    if (!task) return null;

    const getDateShifted = (days: number) => {
        const base = simulatedDate ? new Date(simulatedDate) : new Date();
        base.setDate(base.getDate() + days);
        return base.toISOString().split('T')[0];
    };

    const formatDateLabel = (dateStr: string) => {
        if (!dateStr) return "Vybrat datum";
        const d = new Date(dateStr);
        const today = new Date(simulatedDate || new Date());
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (d.toDateString() === today.toDateString()) return `Dnes (${d.toLocaleDateString('cs-CZ')})`;
        if (d.toDateString() === tomorrow.toDateString()) return `Zítra (${d.toLocaleDateString('cs-CZ')})`;
        return d.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
            <div className="glass-card w-full max-w-lg rounded-[2.5rem] border-white/10 overflow-hidden relative animate-in fade-in zoom-in duration-300">
                <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-black text-[#f6c453] mb-2 flex items-center gap-3">
                                {mode === 'postpone' ? <Clock className="w-8 h-8 text-[#f6c453]" /> : <RotateCcw className="w-8 h-8 text-[#f6c453]" />}
                                {mode === 'postpone' ? 'Odložit rozkaz' : 'Obnovit rozkaz'}
                            </h2>
                            <p className="text-white/40 text-sm font-medium">
                                Vyberte nový termín pro: <span className="text-white font-bold">{task.title}</span>
                            </p>
                        </div>
                        <button onClick={onClose} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                            <X className="w-6 h-6 text-white" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {mode === 'postpone' ? (
                            // POSTPONE MODE - Simple confirmation
                            <>
                                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
                                    <p className="text-sm text-white/80 leading-relaxed">
                                        Mise bude přesunuta do <span className="text-amber-400 font-bold">Odložených misí</span>.
                                        Můžeš ji kdykoliv obnovit zpět do služby.
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={onClose}
                                        className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white/10 transition-all"
                                    >
                                        Zrušit
                                    </button>
                                    <button
                                        onClick={onPostponeToBacklog}
                                        className="flex-1 py-4 bg-amber-500 text-black rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-amber-500/20 active:scale-95 transition-all"
                                    >
                                        Odložit
                                    </button>
                                </div>
                            </>
                        ) : (
                            // RESTORE MODE - Date selection
                            <>
                                {/* Penalty Warning - Only show for failed missions (from history), not postponed */}
                                {task.failed && (
                                    <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 mb-4 flex items-start gap-3">
                                        <div className="p-2 bg-rose-500/20 rounded-lg">
                                            <AlertTriangle className="w-5 h-5 text-rose-400" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black uppercase text-rose-400 tracking-wider">Pozor: Poslední šance</p>
                                            <p className="text-[10px] text-white/60 leading-tight mt-0.5">
                                                Pokud tuto misi znovu nesplníte včas, bude vám strženo <span className="text-rose-400 font-bold">30 XP</span>.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Preset Options */}
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => onConfirm(getDateShifted(0))}
                                        className="p-5 bg-white/5 border border-white/5 rounded-[2rem] hover:bg-white/10 transition-all group flex flex-col items-center gap-2"
                                    >
                                        <Sunrise className="w-8 h-8 text-[#f6c453] group-hover:scale-110 transition-transform" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Dnes</span>
                                    </button>
                                    <button
                                        onClick={() => onConfirm(getDateShifted(1))}
                                        className="p-5 bg-white/5 border border-white/5 rounded-[2rem] hover:bg-white/10 transition-all group flex flex-col items-center gap-2"
                                    >
                                        <Sun className="w-8 h-8 text-amber-500 group-hover:scale-110 transition-transform" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Zítra</span>
                                    </button>
                                    <button
                                        onClick={() => onConfirm(getDateShifted(7))}
                                        className="p-5 bg-white/5 border border-white/5 rounded-[2rem] hover:bg-white/10 transition-all group flex flex-col items-center gap-2"
                                    >
                                        <CalendarDays className="w-8 h-8 text-indigo-400 group-hover:scale-110 transition-transform" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Za týden</span>
                                    </button>

                                    {/* Manual Date Picker as Tile */}
                                    <button
                                        onClick={() => setShowDatePicker(true)}
                                        className="p-5 bg-white/5 border border-white/5 rounded-[2rem] hover:bg-white/10 transition-all group flex flex-col items-center gap-2 relative overflow-hidden cursor-pointer"
                                    >
                                        <Calendar className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Vlastní</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Date Picker Modal */}
            <DatePickerModal
                isOpen={showDatePicker}
                onClose={() => setShowDatePicker(false)}
                onSelect={(date) => {
                    setManualDate(date);
                    onConfirm(date);
                    setShowDatePicker(false);
                }}
                initialDate={manualDate}
                title="Vlastní datum"
            />
        </div>
    );
};

export const MissionScheduler = React.memo(MissionSchedulerComponent);
