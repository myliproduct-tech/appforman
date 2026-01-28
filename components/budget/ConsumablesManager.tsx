import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, Trash2, Plus, Check, Info } from 'lucide-react';
import { BudgetPlan } from '../../types';
import { DEFAULT_CONSUMABLES } from '../../constants';

interface ConsumablesManagerProps {
    budgetPlan?: BudgetPlan;
    onUpdateConsumable?: (id: string, quantity: number) => void;
    onAddCustomConsumable?: (name: string, quantity: number, frequency: '1x' | '2x', times: string[]) => void;
    onDeleteConsumable?: (id: string) => void;
    onConfirmConsumption?: (id: string) => void;
    effectiveDate?: string;
    onClose: () => void;
}

export const ConsumablesManager: React.FC<ConsumablesManagerProps> = ({
    budgetPlan,
    onUpdateConsumable,
    onAddCustomConsumable,
    onDeleteConsumable,
    onConfirmConsumption,
    effectiveDate,
    onClose
}) => {
    const [newConsumableName, setNewConsumableName] = useState('');
    const [newConsumableQty, setNewConsumableQty] = useState('');
    const [newFrequency, setNewFrequency] = useState<'1x' | '2x'>('1x');
    const [newTime1, setNewTime1] = useState('09:00');
    const [newTime2, setNewTime2] = useState('21:00');
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
        <div className="fixed inset-0 z-[70] bg-[#1f2933] flex flex-col animate-fade-in">
            <div className="max-w-md mx-auto w-full h-full flex flex-col bg-[#1f2933]">
                <div className="flex justify-between items-center bg-[#1f2933] px-4 py-6 z-30 border-b border-white/10 shadow-xl">
                    <div>
                        <h2 className="text-2xl font-black italic uppercase text-[#f6c453] tracking-tighter">Počet v balení</h2>
                        <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Spotřební materiál</p>
                    </div>
                    <button onClick={onClose} className="p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                        <X className="w-6 h-6 text-[#f5f7fa]" />
                    </button>
                </div>

                <div className="overflow-y-auto px-4 pt-4 flex-1 pb-10 custom-scrollbar">
                    <div className="space-y-4">
                        {/* Existing Consumables */}
                        {consumables.map((item) => {
                            const isLowStock = item.quantity < 5;
                            const isEditing = editingConsumable?.id === item.id;
                            const today = effectiveDate?.split('T')[0] || new Date().toISOString().split('T')[0];
                            const lastConfirmed = item.lastConfirmedDate?.split('T')[0];
                            const isConfirmedToday = lastConfirmed === today;

                            return (
                                <div key={item.id} className={`bg-[#2d3748] p-5 rounded-[2rem] border ${isLowStock ? 'border-rose-500/30 bg-rose-500/5' : isConfirmedToday ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-white/5'} shadow-lg`}>
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1">
                                            <h4 className="font-bold text-[#f5f7fa] text-sm leading-snug">{item.name}</h4>
                                            {isLowStock && (
                                                <div className="flex items-center gap-1 mt-1">
                                                    <AlertTriangle className="w-3 h-3 text-[#f6c453]" />
                                                    <span className="text-[10px] font-black text-[#f6c453] uppercase tracking-widest">Doplň zásoby!</span>
                                                </div>
                                            )}
                                            {isConfirmedToday && (
                                                <div className="flex items-center gap-1 mt-1">
                                                    <Check className="w-3 h-3 text-emerald-400" />
                                                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Potvrzeno dnes</span>
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
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => setEditingConsumable({ id: item.id, qty: item.quantity.toString() })}
                                                        className="flex-shrink-0 px-4 py-3 bg-white/5 border border-white/10 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all text-white"
                                                    >
                                                        Upravit
                                                    </button>
                                                    {onConfirmConsumption && item.quantity > 0 && (
                                                        <button
                                                            onClick={() => onConfirmConsumption(item.id)}
                                                            disabled={isConfirmedToday}
                                                            className={`flex-shrink-0 px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${isConfirmedToday
                                                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-not-allowed'
                                                                : 'bg-[#f6c453] text-[#1f2933] hover:bg-[#ffcf60]'
                                                                }`}
                                                        >
                                                            {isConfirmedToday ? '✓ Vzala' : 'Vzala dnes'}
                                                        </button>
                                                    )}
                                                </div>
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
                                <input
                                    type="number"
                                    value={newConsumableQty}
                                    onChange={(e) => setNewConsumableQty(e.target.value)}
                                    className="w-full bg-[#1f2933] border border-white/10 rounded-xl px-4 py-3 text-white font-bold text-sm focus:border-[#f6c453]/50 focus:outline-none"
                                    placeholder="Počet"
                                />

                                {/* Notification Frequency */}
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-2 block">
                                        Frekvence připomínek
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setNewFrequency('1x')}
                                            className={`py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${newFrequency === '1x'
                                                ? 'bg-[#f6c453] text-[#1f2933]'
                                                : 'bg-white/5 text-white/50 border border-white/10'
                                                }`}
                                        >
                                            1x denně
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setNewFrequency('2x')}
                                            className={`py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${newFrequency === '2x'
                                                ? 'bg-[#f6c453] text-[#1f2933]'
                                                : 'bg-white/5 text-white/50 border border-white/10'
                                                }`}
                                        >
                                            2x denně
                                        </button>
                                    </div>
                                </div>

                                {/* Notification Times */}
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-2 block">
                                        Čas připomínek
                                    </label>
                                    <div className={`grid gap-2 ${newFrequency === '2x' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                        {/* Time 1 */}
                                        <div className="flex items-center justify-between bg-[#1f2933] border border-white/10 rounded-xl px-4 py-2">
                                            <div className="flex items-center gap-1 font-mono w-full justify-center">
                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    value={newTime1.split(':')[0]}
                                                    onChange={(e) => {
                                                        const h = e.target.value.replace(/\D/g, '').slice(0, 2);
                                                        const m = newTime1.split(':')[1];
                                                        setNewTime1(`${h.padStart(1, '0')}:${m}`);
                                                    }}
                                                    onBlur={(e) => {
                                                        const h = e.target.value.replace(/\D/g, '').padStart(2, '0');
                                                        const m = newTime1.split(':')[1];
                                                        setNewTime1(`${h}:${m}`);
                                                    }}
                                                    className="w-8 bg-white/5 border-none p-1 text-[#f6c453] text-lg font-black text-center outline-none rounded-lg"
                                                    placeholder="00"
                                                />
                                                <span className="text-[#f6c453] font-black text-lg animate-pulse">:</span>
                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    value={newTime1.split(':')[1]}
                                                    onChange={(e) => {
                                                        const m = e.target.value.replace(/\D/g, '').slice(0, 2);
                                                        const h = newTime1.split(':')[0];
                                                        setNewTime1(`${h}:${m.padStart(1, '0')}`);
                                                    }}
                                                    onBlur={(e) => {
                                                        const m = e.target.value.replace(/\D/g, '').padStart(2, '0');
                                                        const h = newTime1.split(':')[0];
                                                        setNewTime1(`${h}:${m}`);
                                                    }}
                                                    className="w-8 bg-white/5 border-none p-1 text-[#f6c453] text-lg font-black text-center outline-none rounded-lg"
                                                    placeholder="00"
                                                />
                                            </div>
                                        </div>

                                        {/* Time 2 (if 2x) */}
                                        {newFrequency === '2x' && (
                                            <div className="flex items-center justify-between bg-[#1f2933] border border-white/10 rounded-xl px-4 py-2">
                                                <div className="flex items-center gap-1 font-mono w-full justify-center">
                                                    <input
                                                        type="text"
                                                        inputMode="numeric"
                                                        value={newTime2.split(':')[0]}
                                                        onChange={(e) => {
                                                            const h = e.target.value.replace(/\D/g, '').slice(0, 2);
                                                            const m = newTime2.split(':')[1];
                                                            setNewTime2(`${h.padStart(1, '0')}:${m}`);
                                                        }}
                                                        onBlur={(e) => {
                                                            const h = e.target.value.replace(/\D/g, '').padStart(2, '0');
                                                            const m = newTime2.split(':')[1];
                                                            setNewTime2(`${h}:${m}`);
                                                        }}
                                                        className="w-8 bg-white/5 border-none p-1 text-[#f6c453] text-lg font-black text-center outline-none rounded-lg"
                                                        placeholder="00"
                                                    />
                                                    <span className="text-[#f6c453] font-black text-lg animate-pulse">:</span>
                                                    <input
                                                        type="text"
                                                        inputMode="numeric"
                                                        value={newTime2.split(':')[1]}
                                                        onChange={(e) => {
                                                            const m = e.target.value.replace(/\D/g, '').slice(0, 2);
                                                            const h = newTime2.split(':')[0];
                                                            setNewTime2(`${h}:${m.padStart(1, '0')}`);
                                                        }}
                                                        onBlur={(e) => {
                                                            const m = e.target.value.replace(/\D/g, '').padStart(2, '0');
                                                            const h = newTime2.split(':')[0];
                                                            setNewTime2(`${h}:${m}`);
                                                        }}
                                                        className="w-8 bg-white/5 border-none p-1 text-[#f6c453] text-lg font-black text-center outline-none rounded-lg"
                                                        placeholder="00"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        if (onAddCustomConsumable && newConsumableName.trim() && newConsumableQty) {
                                            const times = newFrequency === '1x' ? [newTime1] : [newTime1, newTime2];
                                            onAddCustomConsumable(newConsumableName, parseInt(newConsumableQty), newFrequency, times);
                                            setNewConsumableName('');
                                            setNewConsumableQty('');
                                            setNewFrequency('1x');
                                            setNewTime1('09:00');
                                            setNewTime2('21:00');
                                        }
                                    }}
                                    className="w-full px-5 py-3 bg-[#f6c453] text-[#1f2933] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#ffcf60] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                    disabled={!newConsumableName.trim() || !newConsumableQty}
                                >
                                    Přidat
                                </button>
                            </div>
                        </div>

                        {/* Info Box */}
                        <div className="bg-[#f6c453]/10 border border-[#f6c453]/20 rounded-[2rem] p-5">
                            <div className="flex items-start gap-3">
                                <Info className="w-4 h-4 text-[#f6c453] shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-[10px] text-white/70 leading-relaxed font-medium">
                                        <span className="font-black uppercase tracking-widest block mb-1 text-[#f6c453]">Manuální potvrzování</span>
                                        Klikni na "Vzala dnes" po užití vitamínu/čaje. Odečte se 1 kus a uloží se potvrzení. Dostaneš denní připomínku, pokud ještě nebylo potvrzeno. Když zbude méně než 5 kusů, položka se automaticky odškrtne v inventáři.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
