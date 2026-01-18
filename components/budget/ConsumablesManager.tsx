import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, Trash2, Plus, Check, Info } from 'lucide-react';
import { BudgetPlan } from '../../types';
import { DEFAULT_CONSUMABLES } from '../../constants';

interface ConsumablesManagerProps {
    budgetPlan?: BudgetPlan;
    onUpdateConsumable?: (id: string, quantity: number) => void;
    onAddCustomConsumable?: (name: string, quantity: number) => void;
    onDeleteConsumable?: (id: string) => void;
    onClose: () => void;
}

export const ConsumablesManager: React.FC<ConsumablesManagerProps> = ({
    budgetPlan,
    onUpdateConsumable,
    onAddCustomConsumable,
    onDeleteConsumable,
    onClose
}) => {
    const [newConsumableName, setNewConsumableName] = useState('');
    const [newConsumableQty, setNewConsumableQty] = useState('');
    const [editingConsumable, setEditingConsumable] = useState<{ id: string, qty: string } | null>(null);

    const consumables = budgetPlan?.consumables || [];

    // Initialize consumables if not exists (Side effect handled in component for now)
    useEffect(() => {
        if (consumables.length === 0 && onUpdateConsumable) {
            DEFAULT_CONSUMABLES.forEach((def, index) => {
                // Using a slight delay to avoid rapid state updates in parent if needed, 
                // but usually fine to call immediately. Here we follow the original logic.
                onUpdateConsumable(def.id, 0);
            });
        }
    }, [consumables.length, onUpdateConsumable]);

    return (
        <div className="fixed inset-0 z-[70] bg-[#1f2933] overflow-y-auto animate-fade-in p-4">
            <div className="max-w-md mx-auto">
                <div className="flex justify-between items-center mb-8 sticky top-0 bg-[#1f2933] py-4 z-10 text-[#f5f7fa]">
                    <div>
                        <h2 className="text-2xl font-black italic uppercase text-[#f6c453] tracking-tighter">Počet v balení</h2>
                        <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Spotřební materiál</p>
                    </div>
                    <button onClick={onClose} className="p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Existing Consumables */}
                    {consumables.map((item) => {
                        const isLowStock = item.quantity < 5;
                        const isEditing = editingConsumable?.id === item.id;

                        return (
                            <div key={item.id} className={`bg-[#2d3748] p-5 rounded-[2rem] border ${isLowStock ? 'border-rose-500/30 bg-rose-500/5' : 'border-white/5'} shadow-lg`}>
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-[#f5f7fa] text-sm leading-snug">{item.name}</h4>
                                        {isLowStock && (
                                            <div className="flex items-center gap-1 mt-1">
                                                <AlertTriangle className="w-3 h-3 text-[#f6c453]" />
                                                <span className="text-[10px] font-black text-[#f6c453] uppercase tracking-widest">Doplň zásoby!</span>
                                            </div>
                                        )}
                                    </div>
                                    {item.isCustom && onDeleteConsumable && (
                                        <button
                                            onClick={() => onDeleteConsumable(item.id)}
                                            className="p-2 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-all text-white/60"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                <div className="flex items-center gap-3">
                                    {isEditing ? (
                                        <>
                                            <input
                                                type="number"
                                                value={editingConsumable.qty}
                                                onChange={(e) => setEditingConsumable({ id: item.id, qty: e.target.value })}
                                                className="flex-1 min-w-0 bg-[#1f2933] border border-white/10 rounded-xl px-4 py-3 text-white font-bold text-sm focus:border-rose-500/50 focus:outline-none"
                                                placeholder="Počet"
                                                autoFocus
                                            />
                                            <button
                                                onClick={() => {
                                                    if (onUpdateConsumable && editingConsumable.qty) {
                                                        onUpdateConsumable(item.id, parseInt(editingConsumable.qty));
                                                        setEditingConsumable(null);
                                                    }
                                                }}
                                                className="px-4 py-3 bg-rose-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 transition-all"
                                            >
                                                <Check className="w-4 h-4" />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex-1 min-w-0 bg-[#1f2933] border border-white/10 rounded-xl px-4 py-3">
                                                <div className="flex items-baseline gap-2">
                                                    <span className={`text-2xl font-black tabular-nums ${isLowStock ? 'text-rose-400' : 'text-[#f6c453]'}`}>
                                                        {item.quantity}
                                                    </span>
                                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40 text-white">ks</span>
                                                </div>
                                                <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mt-1 text-white">
                                                    Zbývá
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setEditingConsumable({ id: item.id, qty: item.quantity.toString() })}
                                                className="flex-shrink-0 px-4 py-3 bg-white/5 border border-white/10 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all text-white"
                                            >
                                                Upravit
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* Add Custom Vitamin */}
                    <div className="bg-[#2d3748] p-5 rounded-[2rem] border border-dashed border-white/10">
                        <h4 className="font-bold text-[#f5f7fa] text-sm mb-3 flex items-center gap-2">
                            <Plus className="w-4 h-4 text-[#f6c453]" />
                            Přidat vlastní vitamín
                        </h4>
                        <div className="space-y-3">
                            <input
                                type="text"
                                value={newConsumableName}
                                onChange={(e) => setNewConsumableName(e.target.value)}
                                className="w-full bg-[#1f2933] border border-white/10 rounded-xl px-4 py-3 text-white font-bold text-sm focus:border-[#f6c453]/50 focus:outline-none"
                                placeholder="Název vitamínu..."
                            />
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={newConsumableQty}
                                    onChange={(e) => setNewConsumableQty(e.target.value)}
                                    className="flex-1 min-w-0 bg-[#1f2933] border border-white/10 rounded-xl px-4 py-3 text-white font-bold text-sm focus:border-[#f6c453]/50 focus:outline-none"
                                    placeholder="Počet"
                                />
                                <button
                                    onClick={() => {
                                        if (onAddCustomConsumable && newConsumableName.trim() && newConsumableQty) {
                                            onAddCustomConsumable(newConsumableName, parseInt(newConsumableQty));
                                            setNewConsumableName('');
                                            setNewConsumableQty('');
                                        }
                                    }}
                                    className="flex-shrink-0 px-5 py-3 bg-[#f6c453] text-[#1f2933] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#ffcf60] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                    disabled={!newConsumableName.trim() || !newConsumableQty}
                                >
                                    Přidat
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="bg-[#f6c453]/10 border border-[#f6c453]/20 rounded-[2rem] p-5">
                        <div className="flex items-start gap-3">
                            <Info className="w-4 h-4 text-[#f6c453] shrink-0 mt-0.5" />
                            <div>
                                <p className="text-[10px] text-white/70 leading-relaxed font-medium">
                                    <span className="font-black uppercase tracking-widest block mb-1 text-[#f6c453]">Automatický odpočet</span>
                                    Každý den se automaticky odečte 1 kus od čajů a vitamínů. Když zbude méně než 5 kusů, položka se automaticky odškrtne v inventáři jako připomínka k nákupu.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
