import React, { useState } from 'react';
import { BriefcaseMedical, XIcon, CheckSquare, Square, Trophy, Zap, RotateCcw, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { HOSPITAL_BAG_CHECKLIST } from '../../constants';
import { CustomGearItem } from '../../types';
import { localizeText } from '../../utils';

interface HospitalBagProps {
    partnerName: string; // Added prop
    hospitalBagChecklist: string[];
    onToggleHospitalBag?: (id: string) => void;
    customHospitalBagGear?: CustomGearItem[];
    onAddCustomHospitalBagGear?: (item: CustomGearItem) => void;
    onDeleteCustomHospitalBagGear?: (id: string) => void;
    onToggleCustomHospitalBagGear?: (id: string) => void;
    isDevMode?: boolean;
    onCompleteAllBag?: () => void;
    onResetAll?: () => void;
}

export const HospitalBag: React.FC<HospitalBagProps> = ({
    partnerName,
    hospitalBagChecklist,
    onToggleHospitalBag,
    customHospitalBagGear = [],
    onAddCustomHospitalBagGear,
    onDeleteCustomHospitalBagGear,
    onToggleCustomHospitalBagGear,
    isDevMode,
    onCompleteAllBag,
    onResetAll
}) => {
    const [showHospitalBag, setShowHospitalBag] = useState(false);
    const [collapsedCats, setCollapsedCats] = useState<Record<string, boolean>>({});
    const [newItemLabel, setNewItemLabel] = useState('');

    const toggleCategory = (cat: string) => {
        setCollapsedCats(prev => ({ ...prev, [cat]: !prev[cat] }));
    };

    const handleAddCustomItem = () => {
        if (newItemLabel.trim() && onAddCustomHospitalBagGear) {
            onAddCustomHospitalBagGear({
                id: `custom-bag-${Date.now()}`,
                label: newItemLabel.trim(),
                bought: false
            });
            setNewItemLabel('');
        }
    };

    // Bag Progress
    const totalBagItems = HOSPITAL_BAG_CHECKLIST.reduce((acc, cat) => acc + cat.items.length, 0) + customHospitalBagGear.length;
    const checkedBagItems = hospitalBagChecklist.length + customHospitalBagGear.filter(i => i.bought).length;
    const bagProgressPercent = totalBagItems > 0 ? Math.round((checkedBagItems / totalBagItems) * 100) : 0;

    // Tactical Color Logic
    const getProgressColor = (percent: number) => {
        if (percent === 100) return '#10b981'; // emerald-500
        if (percent >= 75) return '#84cc16'; // lime-500
        if (percent >= 50) return '#eab308'; // yellow-500
        if (percent >= 25) return '#f97316'; // orange-500
        return '#ef4444'; // red-500
    };

    const progressColor = getProgressColor(bagProgressPercent);

    return (
        <>
            <button
                onClick={() => setShowHospitalBag(true)}
                className="w-full bg-rose-500/10 border border-rose-500/20 text-rose-400 py-5 rounded-3xl font-black uppercase text-xs tracking-widest shadow-lg shadow-rose-500/5 hover:bg-rose-500/20 transition-all active:scale-95 flex items-center justify-center gap-3 mb-4"
            >
                <BriefcaseMedical className="w-5 h-5" />
                <span>Evakuační Batoh</span>
                {bagProgressPercent > 0 && (
                    <span
                        className="px-2 py-0.5 rounded text-[10px] text-white font-mono"
                        style={{ backgroundColor: progressColor + '40', border: `1px solid ${progressColor}40` }}
                    >
                        {bagProgressPercent}%
                    </span>
                )}
            </button>

            {/* Hospital Bag Modal */}
            {showHospitalBag && (
                <div className="fixed inset-0 z-[70] bg-[#1f2933] overflow-y-auto animate-fade-in pb-10">
                    <div className="max-w-md mx-auto min-h-full flex flex-col">
                        <div className="flex justify-between items-center sticky top-0 bg-[#1f2933] px-4 py-6 z-30 border-b border-white/10">
                            <div>
                                <h2 className="text-xl font-black italic uppercase text-[#f6c453] tracking-tighter">Evakuační Batoh</h2>
                                <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Pohotovostní zavazadlo</p>
                            </div>
                            <button
                                onClick={() => setShowHospitalBag(false)}
                                className="p-3 bg-white/5 rounded-xl border-2 border-white/20"
                            >
                                <XIcon className="w-6 h-6 text-[#f6c453]" />
                            </button>
                        </div>

                        <div className="px-4 pt-4 flex-1">
                            {/* Dev Mode Action */}
                            {isDevMode && (
                                <div className="flex gap-2 mb-6">
                                    {onCompleteAllBag && (
                                        <button
                                            onClick={onCompleteAllBag}
                                            className="flex-1 bg-red-500/20 text-red-500 border border-red-500/30 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-red-500/30 transition-all font-mono"
                                        >
                                            <Zap className="w-4 h-4" /> [DEV] Splnit
                                        </button>
                                    )}
                                    {onResetAll && (
                                        <button
                                            onClick={onResetAll}
                                            className="flex-1 bg-white/5 text-white/50 border-2 border-white/20 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all font-mono"
                                        >
                                            <RotateCcw className="w-4 h-4" /> [DEV] Odškrtnout
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Bag Progress */}
                            <div className="glass-card p-6 rounded-[2rem] border-white/20 mb-8 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden">
                                <div
                                    className="absolute inset-0 opacity-10 pointer-events-none"
                                    style={{ background: `radial-gradient(circle at top right, ${progressColor}, transparent)` }}
                                />
                                <div className="flex justify-between items-end mb-3 relative z-10">
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60 text-white/70">Stav sbalení</span>
                                    <span className="text-2xl font-black italic" style={{ color: progressColor }}>{bagProgressPercent}%</span>
                                </div>
                                <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/20 relative z-10">
                                    <div
                                        className="h-full transition-all duration-700"
                                        style={{
                                            width: `${bagProgressPercent}%`,
                                            backgroundColor: progressColor,
                                            boxShadow: `0 0 15px ${progressColor}60`
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="space-y-6 pb-10">
                                {HOSPITAL_BAG_CHECKLIST.map((category, cIdx) => {
                                    const isCollapsed = collapsedCats[category.category];
                                    const checkedInCat = category.items.filter(i => hospitalBagChecklist.includes(i.id)).length;
                                    const isDone = checkedInCat === category.items.length;

                                    return (
                                        <div key={cIdx} className="space-y-3">
                                            <div
                                                onClick={() => toggleCategory(category.category)}
                                                className="flex items-center justify-between px-2 cursor-pointer group"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-0' : 'rotate-90'} opacity-40`} />
                                                    <BriefcaseMedical className={`w-4 h-4 transition-colors ${isDone ? 'text-emerald-500' : 'text-[#f6c453]'}`} />
                                                    <h3 className={`text-[11px] font-black uppercase tracking-[0.15em] transition-colors ${isDone ? 'text-emerald-400' : 'text-white/80'}`}>
                                                        {localizeText(category.category, partnerName)}
                                                    </h3>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[9px] font-mono opacity-40 text-white">
                                                        {checkedInCat}/{category.items.length}
                                                    </span>
                                                </div>
                                            </div>

                                            {!isCollapsed && (
                                                <div className="grid gap-2 animate-slide-up">
                                                    {category.items.map((item) => {
                                                        const isChecked = hospitalBagChecklist.includes(item.id);
                                                        return (
                                                            <div
                                                                key={item.id}
                                                                onClick={() => onToggleHospitalBag && onToggleHospitalBag(item.id)}
                                                                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${isChecked
                                                                    ? 'bg-emerald-500/10 border-emerald-500/20'
                                                                    : 'bg-white/5 border-white/20 hover:border-white/20'
                                                                    }`}
                                                            >
                                                                {isChecked ? (
                                                                    <CheckSquare className="w-5 h-5 text-emerald-500" />
                                                                ) : (
                                                                    <Square className="w-5 h-5 opacity-20 text-white" />
                                                                )}
                                                                <span className={`text-xs font-bold transition-all ${isChecked ? 'text-emerald-400/60 line-through' : 'text-[#f5f7fa]'}`}>
                                                                    {localizeText(item.label, partnerName)}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                {/* Custom Items Section */}
                                <div className="space-y-4 pt-6 border-t border-white/20">
                                    <div
                                        onClick={() => toggleCategory('custom')}
                                        className="flex items-center justify-between px-2 cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-2">
                                            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${collapsedCats['custom'] ? 'rotate-0' : 'rotate-90'} opacity-40`} />
                                            <Plus className="w-4 h-4 text-[#f6c453]" />
                                            <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-white/80">Vlastní vybavení</h3>
                                        </div>
                                        <span className="text-[9px] font-mono opacity-40 text-white">
                                            {customHospitalBagGear.filter(i => i.bought).length}/{customHospitalBagGear.length}
                                        </span>
                                    </div>

                                    {!collapsedCats['custom'] && (
                                        <div className="space-y-4 animate-slide-up">
                                            <div className="flex gap-2">
                                                <input
                                                    value={newItemLabel}
                                                    onChange={(e) => setNewItemLabel(e.target.value)}
                                                    placeholder="Další věc do batohu..."
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
                                                {customHospitalBagGear.map(item => (
                                                    <div
                                                        key={item.id}
                                                        className={`p-4 rounded-2xl border transition-all flex items-center gap-4 ${item.bought
                                                            ? 'bg-emerald-500/10 border-emerald-500/20'
                                                            : 'bg-white/5 border-white/20 hover:border-white/20'
                                                            }`}
                                                    >
                                                        <div onClick={() => onToggleCustomHospitalBagGear && onToggleCustomHospitalBagGear(item.id)} className="cursor-pointer">
                                                            {item.bought ? <CheckSquare className="w-5 h-5 text-emerald-500" /> : <Square className="w-5 h-5 opacity-20 text-white" />}
                                                        </div>
                                                        <div className="flex-1 flex justify-between items-center">
                                                            <span className={`text-xs font-bold transition-all block ${item.bought ? 'text-emerald-400/60 line-through' : 'text-[#f5f7fa]'}`}>
                                                                {item.label}
                                                            </span>
                                                            <button onClick={() => onDeleteCustomHospitalBagGear && onDeleteCustomHospitalBagGear(item.id)} className="p-2 opacity-30 hover:opacity-100 hover:text-rose-500 transition-all">
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

                            {/* 100% Completion Celebration */}
                            {bagProgressPercent === 100 && (
                                <div className="p-8 glass-card rounded-[3rem] text-center bg-emerald-500/10 border-emerald-500/20 mb-10 animate-slide-up">
                                    <Trophy className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                                    <h4 className="font-black text-[#f5f7fa] uppercase italic text-xl">Výsadek připraven!</h4>
                                    <p className="text-xs opacity-60 mt-2">Zavazadlo je kompletní a připraveno u dveří.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
