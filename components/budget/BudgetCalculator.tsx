import React, { useState, useEffect } from 'react';
import { Car, ShieldCheck, Home, Shirt, Package, Zap, Save } from 'lucide-react';
import { BudgetPlan } from '../../types';

interface BudgetCalculatorProps {
    budgetPlan?: BudgetPlan;
    onSaveBudget?: (plan: BudgetPlan) => void;
}

export const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ budgetPlan, onSaveBudget }) => {
    const [localPlan, setLocalPlan] = useState<BudgetPlan>({
        totalBudget: 50000,
        stroller: 0,
        carSeat: 0,
        furniture: 0,
        clothes: 0,
        cosmetics: 0,
        other: 0
    });

    useEffect(() => {
        if (budgetPlan) {
            setLocalPlan(budgetPlan);
        }
    }, [budgetPlan]);

    const totalSpent = localPlan.stroller + localPlan.carSeat + localPlan.furniture + localPlan.clothes + localPlan.cosmetics + localPlan.other;
    const remaining = localPlan.totalBudget - totalSpent;
    const percentUsed = Math.min(100, Math.round((totalSpent / localPlan.totalBudget) * 100));

    const handleSaveCalculator = () => {
        if (onSaveBudget) {
            onSaveBudget(localPlan);
        }
    };

    return (
        <>
            <div className="glass-card p-6 rounded-[2rem] border-emerald-500/20 mb-6 relative overflow-hidden animate-slide-up">
                <div className="flex justify-between items-end mb-4 relative z-10">
                    <div>
                        <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Zbývá z rozpočtu</p>
                        <p className={`text-3xl font-black tabular-nums tracking-tight ${remaining < 0 ? 'text-rose-500' : 'text-emerald-400'}`}>
                            {remaining.toLocaleString()} Kč
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Cíl</p>
                        <p className="text-lg font-bold text-white tabular-nums">{localPlan.totalBudget.toLocaleString()}</p>
                    </div>
                </div>

                <div className="w-full bg-black/30 h-4 rounded-full overflow-hidden border border-white/5 relative z-10">
                    <div
                        className={`h-full transition-all duration-700 ${remaining < 0 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                        style={{ width: `${Math.min(100, percentUsed)}%` }}
                    />
                </div>
                <div className="flex justify-between mt-2 text-[10px] uppercase font-black opacity-40 relative z-10">
                    <span>Utraceno: {totalSpent.toLocaleString()}</span>
                    <span>{percentUsed}%</span>
                </div>

                <div className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-3xl opacity-10 ${remaining < 0 ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto pb-24 px-1 animate-slide-up">
                <div className="bg-[#2d3748] p-4 rounded-2xl border border-white/5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#f6c453] mb-2 block">Celkový Limit (Target)</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={localPlan.totalBudget || ''}
                            onChange={(e) => setLocalPlan({ ...localPlan, totalBudget: parseInt(e.target.value) || 0 })}
                            className="w-full bg-[#1f2933] border border-white/10 rounded-xl px-4 py-3 text-lg font-bold text-white focus:border-[#f6c453] outline-none tabular-nums"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs font-bold">Kč</span>
                    </div>
                </div>

                <div className="grid gap-3">
                    {[
                        { label: 'Transport (Kočárek)', key: 'stroller', icon: <Car className="w-4 h-4 text-indigo-400" /> },
                        { label: 'Bezpečnost (Autosedačka)', key: 'carSeat', icon: <ShieldCheck className="w-4 h-4 text-rose-400" /> },
                        { label: 'Základna (Nábytek)', key: 'furniture', icon: <Home className="w-4 h-4 text-emerald-400" /> },
                        { label: 'Výstroj (Oblečení)', key: 'clothes', icon: <Shirt className="w-4 h-4 text-blue-400" /> },
                        { label: 'Spotřební (Kosmetika/Pleny)', key: 'cosmetics', icon: <Package className="w-4 h-4 text-amber-400" /> },
                        { label: 'Ostatní', key: 'other', icon: <Zap className="w-4 h-4 text-white" /> },
                    ].map((item) => (
                        <div key={item.key} className="flex items-center gap-3 bg-[#1f2933] p-3 rounded-2xl border border-white/5">
                            <div className="p-3 bg-white/5 rounded-xl">
                                {item.icon}
                            </div>
                            <div className="flex-1">
                                <label className="text-[10px] font-black uppercase tracking-widest opacity-50 block mb-1">{item.label}</label>
                                <input
                                    type="number"
                                    value={(localPlan as any)[item.key] || ''}
                                    onChange={(e) => setLocalPlan({ ...localPlan, [item.key]: parseInt(e.target.value) || 0 })}
                                    className="w-full bg-transparent text-white font-bold text-base outline-none placeholder-white/10 tabular-nums"
                                    placeholder="0"
                                />
                            </div>
                            <span className="text-xs font-bold text-white/30 pr-2">Kč</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#1f2933]/95 backdrop-blur-xl border-t border-white/5 z-20 max-w-md mx-auto">
                <button
                    onClick={handleSaveCalculator}
                    className="w-full bg-emerald-500 text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                    <Save className="w-4 h-4" /> Uložit Rozpočet
                </button>
            </div>
        </>
    );
};
