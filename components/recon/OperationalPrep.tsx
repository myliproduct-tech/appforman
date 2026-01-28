import React, { useState } from 'react';
import { CheckSquare, Square, Wrench, XIcon, Trophy, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { CustomGearItem } from '../../types';

interface OperationalPrepProps {
    checklist?: string[];
    onToggle?: (id: string) => void;
    customOperationalPrepGear?: CustomGearItem[];
    onAddCustomOperationalPrepGear?: (item: CustomGearItem) => void;
    onDeleteCustomOperationalPrepGear?: (id: string) => void;
    onToggleCustomOperationalPrepGear?: (id: string) => void;
    onClose?: () => void;
}

const PREP_TASKS = [
    { id: 'paint-room', label: 'Vymalovat pokoj', detail: 'stihnout s předstihem kvůli odvětrání' },
    { id: 'assemble-crib', label: 'Sestavit postýlku a komodu', detail: 'zkontrolovat dotažení šroubů' },
    { id: 'wash-clothes', label: 'Vyprat a vyžehlit výbavičku', detail: 'použít dětský prášek' },
    { id: 'changing-table', label: 'Sestavit přebalovací pult', detail: 'připravit do výšky pasu' },
    { id: 'car-seat', label: 'Nainstalovat autosedačku', detail: 'vyzkoušet montáž do auta nanečisto' },
    { id: 'hospital-bag', label: 'Sbalit tašku do porodnice', detail: 'mít ji připravenou u dveří' },
    { id: 'freeze-meals', label: 'Uvařit jídlo do mrazáku', detail: 'připravit zásoby na první dny' },
    { id: 'buy-diapers', label: 'Nakoupit pleny a hygienu', detail: 'udělat zásobu č. 1 a 2' },
    { id: 'baby-monitor', label: 'Zapojit monitor dechu a chůvičku', detail: 'otestovat funkčnost a dosah' },
    { id: 'deep-clean', label: 'Generální úklid bytu', detail: 'vyluxovat, vytřít, utřít prach' },
    { id: 'pediatrician', label: 'Zajistit pediatra', detail: 'domluvit registraci předem' },
    { id: 'fuel-tank', label: 'Natankovat plnou nádrž', detail: 'udržovat auto v pohotovosti' }
];

export const OperationalPrep: React.FC<OperationalPrepProps> = ({
    checklist = [],
    onToggle,
    customOperationalPrepGear = [],
    onAddCustomOperationalPrepGear,
    onDeleteCustomOperationalPrepGear,
    onToggleCustomOperationalPrepGear,
    onClose
}) => {
    const [collapsedCats, setCollapsedCats] = useState<Record<string, boolean>>({});
    const [newItemLabel, setNewItemLabel] = useState('');

    const toggleCategory = (cat: string) => {
        setCollapsedCats(prev => ({ ...prev, [cat]: !prev[cat] }));
    };

    const handleAddCustomItem = () => {
        if (newItemLabel.trim() && onAddCustomOperationalPrepGear) {
            onAddCustomOperationalPrepGear({
                id: `custom-prep-${Date.now()}`,
                label: newItemLabel.trim(),
                bought: false
            });
            setNewItemLabel('');
        }
    };

    const completedCount = checklist.length + customOperationalPrepGear.filter(i => i.bought).length;
    const totalCount = PREP_TASKS.length + customOperationalPrepGear.length;
    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    // Tactical Color Logic
    const getProgressColor = (percent: number) => {
        if (percent === 100) return '#10b981'; // emerald-500
        if (percent >= 75) return '#84cc16'; // lime-500
        if (percent >= 50) return '#eab308'; // yellow-500
        if (percent >= 25) return '#f97316'; // orange-500
        return '#ef4444'; // red-500
    };

    const progressColor = getProgressColor(progressPercent);

    return (
        <div className="fixed inset-0 z-[70] bg-[#1f2933] flex flex-col animate-fade-in">
            <div className="max-w-md mx-auto w-full h-full flex flex-col bg-[#1f2933]">
                {/* Header */}
                <div className="flex justify-between items-center bg-[#1f2933] px-4 py-6 z-30 border-b border-white/10 shadow-xl">
                    <div>
                        <h2 className="text-xl font-black italic uppercase text-[#f6c453] tracking-tighter">Operační Příprava</h2>
                        <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Logistický checklist</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 bg-white/5 rounded-xl border border-white/10"
                    >
                        <XIcon className="w-6 h-6 text-[#f6c453]" />
                    </button>
                </div>

                <div className="overflow-y-auto px-4 pt-4 flex-1 pb-10 custom-scrollbar">
                    {/* Progress Bar */}
                    <div className="glass-card p-6 rounded-[2rem] border-white/5 mb-8 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden">
                        <div
                            className="absolute inset-0 opacity-10 pointer-events-none"
                            style={{ background: `radial-gradient(circle at top right, ${progressColor}, transparent)` }}
                        />
                        <div className="flex justify-between items-end mb-3 relative z-10">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60 text-white/70">Stav přípravy</span>
                            <span className="text-2xl font-black italic" style={{ color: progressColor }}>{progressPercent}%</span>
                        </div>
                        <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/5 relative z-10">
                            <div
                                className="h-full transition-all duration-700"
                                style={{
                                    width: `${progressPercent}%`,
                                    backgroundColor: progressColor,
                                    boxShadow: `0 0 15px ${progressColor}60`
                                }}
                            />
                        </div>
                    </div>

                    {/* Checklist Items */}
                    <div className="space-y-6 pb-6">
                        <div className="space-y-3">
                            <div
                                onClick={() => toggleCategory('default')}
                                className="flex items-center justify-between px-2 cursor-pointer group"
                            >
                                <div className="flex items-center gap-2">
                                    <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${collapsedCats['default'] ? 'rotate-0' : 'rotate-90'} opacity-40`} />
                                    <Wrench className="w-4 h-4 text-[#f6c453]" />
                                    <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-white/80">Základní úkoly</h3>
                                </div>
                                <span className="text-[9px] font-mono opacity-40 text-white">
                                    {checklist.length}/{PREP_TASKS.length}
                                </span>
                            </div>

                            {!collapsedCats['default'] && (
                                <div className="grid gap-2 animate-slide-up">
                                    {PREP_TASKS.map((task) => {
                                        const isChecked = checklist.includes(task.id);
                                        return (
                                            <div
                                                key={task.id}
                                                onClick={() => onToggle && onToggle(task.id)}
                                                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${isChecked
                                                    ? 'bg-emerald-500/10 border-emerald-500/20'
                                                    : 'bg-white/5 border-white/5 hover:border-white/10'
                                                    }`}
                                            >
                                                {isChecked ? (
                                                    <CheckSquare className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                                ) : (
                                                    <Square className="w-5 h-5 opacity-20 flex-shrink-0 mt-0.5" />
                                                )}
                                                <div className="flex-1">
                                                    <span className={`text-xs font-bold transition-all block ${isChecked ? 'text-emerald-400/60 line-through' : 'text-[#f5f7fa]'}`}>
                                                        {task.label}
                                                    </span>
                                                    <span className="text-[10px] text-white/40 mt-1 block">
                                                        {task.detail}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Custom Items Section */}
                        <div className="space-y-3">
                            <div
                                onClick={() => toggleCategory('custom')}
                                className="flex items-center justify-between px-2 cursor-pointer group"
                            >
                                <div className="flex items-center gap-2">
                                    <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${collapsedCats['custom'] ? 'rotate-0' : 'rotate-90'} opacity-40`} />
                                    <Plus className="w-4 h-4 text-[#f6c453]" />
                                    <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-white/80">Vlastní úkoly</h3>
                                </div>
                                <span className="text-[9px] font-mono opacity-40 text-white">
                                    {customOperationalPrepGear.filter(i => i.bought).length}/{customOperationalPrepGear.length}
                                </span>
                            </div>

                            {!collapsedCats['custom'] && (
                                <div className="space-y-4 animate-slide-up">
                                    <div className="flex gap-2">
                                        <input
                                            value={newItemLabel}
                                            onChange={(e) => setNewItemLabel(e.target.value)}
                                            placeholder="Další úkol přípravy..."
                                            className="flex-1 bg-[#2d3748] border-none rounded-xl px-4 py-3 text-xs font-bold text-white placeholder-white/20 focus:ring-1 focus:ring-[#f6c453] outline-none"
                                            onKeyDown={(e) => e.key === 'Enter' && handleAddCustomItem()}
                                        />
                                        <button
                                            onClick={handleAddCustomItem}
                                            className="bg-[#f6c453] text-[#1f2933] px-4 rounded-xl active:scale-95 transition-all shadow-md font-black text-xs"
                                        >
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="grid gap-2 pb-6">
                                        {customOperationalPrepGear.map(item => (
                                            <div
                                                key={item.id}
                                                className={`p-4 rounded-2xl border transition-all flex items-center gap-4 ${item.bought
                                                    ? 'bg-emerald-500/10 border-emerald-500/20'
                                                    : 'bg-white/5 border-white/5 hover:border-white/10'
                                                    }`}
                                            >
                                                <div onClick={() => onToggleCustomOperationalPrepGear && onToggleCustomOperationalPrepGear(item.id)} className="cursor-pointer">
                                                    {item.bought ? <CheckSquare className="w-5 h-5 text-emerald-500" /> : <Square className="w-5 h-5 opacity-20 text-white" />}
                                                </div>
                                                <div className="flex-1 flex justify-between items-center">
                                                    <span className={`text-xs font-bold transition-all block ${item.bought ? 'text-emerald-400/60 line-through' : 'text-[#f5f7fa]'}`}>
                                                        {item.label}
                                                    </span>
                                                    <button onClick={() => onDeleteCustomOperationalPrepGear && onDeleteCustomOperationalPrepGear(item.id)} className="p-2 opacity-30 hover:opacity-100 hover:text-rose-500 transition-all">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Completion Message */}
                    {progressPercent === 100 && (
                        <div className="p-8 glass-card rounded-[3rem] text-center bg-emerald-500/10 border-emerald-500/20 mb-10 animate-slide-up">
                            <Trophy className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                            <h4 className="font-black text-[#f5f7fa] uppercase italic text-xl">Základna připravena!</h4>
                            <p className="text-xs opacity-60 mt-2">Vše je ready pro příchod Juniora.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
