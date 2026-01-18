import React from 'react';
import { X, ShoppingCart, Target, AlertTriangle, ShieldCheck } from 'lucide-react';
import { GEAR_CHECKLIST } from '../../constants';

interface ShoppingGuideProps {
    currentWeek: number;
    gearChecklist: string[];
    onClose: () => void;
}

export const ShoppingGuide: React.FC<ShoppingGuideProps> = ({ currentWeek, gearChecklist, onClose }) => {
    return (
        <div className="fixed inset-0 z-[60] bg-[#1f2933] flex flex-col animate-fade-in overflow-hidden">
            {/* Header */}
            <div className="p-4 pt-6 border-b border-white/5 flex justify-between items-center bg-[#1f2933] shrink-0 z-20 relative text-[#f5f7fa]">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#f6c453]/10 rounded-xl border border-[#f6c453]/20">
                        <ShoppingCart className="w-5 h-5 text-[#f6c453]" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black italic uppercase text-[#f6c453] tracking-tighter">Strategický Nákupčí</h2>
                        <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Seznam cílů pro {currentWeek}. týden</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-3 bg-white/5 rounded-2xl border border-white/10 active:scale-95 hover:bg-white/10 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* CONTENT AREA */}
            <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-10">
                {/* 1. SECTION: WEEKLY TACTICAL TARGETS */}
                <div className="animate-slide-up">
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <div className="p-2 bg-[#f6c453]/10 rounded-xl border border-[#f6c453]/20">
                            <Target className="w-5 h-5 text-[#f6c453]" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-tight text-white line-height-tight">Prioritní pořízení</h3>
                            <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em] mt-0.5">Věci k řešení v tomto čase</p>
                        </div>
                    </div>

                    <div className="grid gap-3">
                        {GEAR_CHECKLIST.flatMap(cat => cat.items)
                            .filter(item => {
                                const isBought = gearChecklist.includes(item.id);
                                const isException = item.id === 'g54' || item.id === 'g51';

                                if (isBought && !isException) return false;

                                // Visibility Window: 1 week before the start, until the endWeek
                                const startWeek = (item.week || 1) - 1;
                                const endWeek = item.endWeek || (item.week + 4);
                                return currentWeek >= startWeek && currentWeek <= endWeek;
                            })
                            .map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-[#2d3748] p-5 rounded-[2rem] border border-white/5 shadow-lg relative overflow-hidden group border-l-4 border-l-[#f6c453]/20 transition-all hover:bg-[#354052]"
                                >
                                    <div className="flex justify-between items-start mb-2 relative z-10 gap-4">
                                        <h4 className="font-bold text-[#f5f7fa] text-sm leading-snug flex-1">{item.label}</h4>
                                        {item.condition && (
                                            <div className={`px-2 py-0.5 rounded-lg border shrink-0 ${item.condition.includes('NOVÁ')
                                                ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                                                : 'bg-[#f6c453]/10 border-[#f6c453]/20 text-[#f6c453]'
                                                }`}>
                                                <span className="text-[10px] font-black uppercase tracking-widest">{item.condition}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Critical Warning directly on the item */}
                                    {item.warning && (
                                        <div className="mb-3 p-3 rounded-xl bg-[#f6c453]/10 border border-[#f6c453]/20 flex items-start gap-2 relative z-10 animate-pulse-slow">
                                            <AlertTriangle className="w-3 h-3 text-[#f6c453] shrink-0 mt-0.5" />
                                            <p className="text-[10px] text-[#f6c453] leading-tight font-bold">
                                                {item.warning}
                                            </p>
                                        </div>
                                    )}

                                    {/* Context Tip */}
                                    <div className="p-3 rounded-xl bg-black/20 border border-white/5 relative z-10 group-hover:bg-black/30 transition-all">
                                        <p className="text-[10px] text-white/50 leading-relaxed italic">
                                            "{item.tip || "Zajisti tento hardware včas. Později budeš mít plné ruce s jinými moduly."}"
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                        {GEAR_CHECKLIST.flatMap(cat => cat.items).filter(item => {
                            const isBought = gearChecklist.includes(item.id);
                            if (isBought && item.id !== 'g54' && item.id !== 'g51') return false;
                            const startWeek = (item.week || 1) - 1;
                            const endWeek = item.endWeek || (item.week + 4);
                            return currentWeek >= startWeek && currentWeek <= endWeek;
                        }).length === 0 && (
                                <div className="py-12 text-center border border-dashed border-white/10 rounded-[2rem] bg-white/5 opacity-30">
                                    <ShoppingCart className="w-8 h-8 mx-auto mb-3 opacity-20 text-white" />
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white">Žádné specifické nákupy pro tento týden</p>
                                </div>
                            )}
                    </div>
                </div>

                <div className="p-12 text-center opacity-20 border-t border-white/5 mt-10 text-white">
                    <ShieldCheck className="w-12 h-12 mx-auto mb-4" />
                    <p className="text-[11px] font-black uppercase tracking-widest italic">Operační briefing pro {currentWeek}. týden ukončen</p>
                    <p className="text-[10px] mt-2 max-w-[200px] mx-auto leading-relaxed opacity-60">Zobrazené informace jsou filtrovány podle relevance k současné fázi vývoje.</p>
                </div>
            </div>
        </div>
    );
};
