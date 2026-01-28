import React, { useState, useEffect } from 'react';
import { BudgetPlan, CustomGearItem } from '../types';
import { Wallet, ShoppingCart, Package, ClipboardList, Calculator, X, Truck, Heart } from 'lucide-react';
import { BudgetCalculator } from './budget/BudgetCalculator';
import { UnitPriceCalculator } from './budget/UnitPriceCalculator';
import { StrollerConfigurator } from './budget/StrollerConfigurator';
import { ConsumablesManager } from './budget/ConsumablesManager';
import { ShoppingGuide } from './budget/ShoppingGuide';
import { InventoryChecklist } from './budget/InventoryChecklist';
import { OperationalPrep } from './recon/OperationalPrep';

interface BudgetProps {
    gearChecklist: string[];
    budgetPlan?: BudgetPlan;
    onToggleGear: (id: string) => void;
    onSaveBudget?: (plan: BudgetPlan) => void;
    isDevMode?: boolean;
    onCompleteAll?: () => void;
    partnerName?: string;
    currentWeek: number;
    customGear?: CustomGearItem[];
    onAddCustomGear?: (item: CustomGearItem) => void;
    onDeleteCustomGear?: (id: string) => void;
    onToggleCustomGear?: (id: string) => void;
    vehicleModel?: string;
    onSaveVehicle?: (model: string) => void;
    onConfirmVehicle?: () => void;
    onUpdateConsumable?: (id: string, quantity: number) => void;
    onAddCustomConsumable?: (name: string, quantity: number) => void;
    onDeleteConsumable?: (id: string) => void;
    onConfirmConsumption?: (id: string) => void;
    effectiveDate?: string;
    onResetAllGear?: () => void;
    operationalPrepChecklist?: string[];
    onToggleOperationalPrep?: (id: string) => void;
    customOperationalPrepGear?: CustomGearItem[];
    onAddCustomOperationalPrepGear?: (item: CustomGearItem) => void;
    onDeleteCustomOperationalPrepGear?: (id: string) => void;
    onToggleCustomOperationalPrepGear?: (id: string) => void;
    tourCompleted?: boolean;
    onCompleteTour?: () => void;
}

export const Budget: React.FC<BudgetProps> = ({
    gearChecklist,
    budgetPlan,
    onToggleGear,
    onSaveBudget,
    isDevMode,
    onCompleteAll,
    partnerName,
    currentWeek,
    customGear = [],
    onAddCustomGear,
    onDeleteCustomGear,
    onToggleCustomGear,
    vehicleModel = '',
    onSaveVehicle,
    onConfirmVehicle,
    onUpdateConsumable,
    onAddCustomConsumable,
    onDeleteConsumable,
    onConfirmConsumption,
    effectiveDate,
    onResetAllGear,
    operationalPrepChecklist = [],
    onToggleOperationalPrep,
    customOperationalPrepGear = [],
    onAddCustomOperationalPrepGear,
    onDeleteCustomOperationalPrepGear,
    onToggleCustomOperationalPrepGear,
    tourCompleted = false,
    onCompleteTour
}) => {
    const [showInventory, setShowInventory] = useState(false);
    const [showGuide, setShowGuide] = useState(false);
    const [showCalculator, setShowCalculator] = useState(false);
    const [showStrollerConfig, setShowStrollerConfig] = useState(false);
    const [showConsumables, setShowConsumables] = useState(false);
    const [showOperationalPrep, setShowOperationalPrep] = useState(false);
    const [calcTab, setCalcTab] = useState<'budget' | 'unit'>('budget');

    return (
        <div className="space-y-6 pb-20">
            {/* Enhanced Header - Simplified to Yellow/Slate */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#f6c453]/10 via-slate-500/5 to-slate-500/10 border border-[#f6c453]/20 p-6 shadow-lg shadow-[#f6c453]/5 group">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2Y2YzQ1MyIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30 group-hover:opacity-40 transition-opacity"></div>

                <div className="relative flex items-center gap-3">
                    <div className="p-3 bg-[#f6c453]/10 rounded-xl backdrop-blur-sm group-hover:scale-110 group-hover:rotate-12 transition-transform">
                        <Wallet className="w-6 h-6 text-[#f6c453]" />
                    </div>
                    <div>
                        <h2 className="text-lg xs:text-xl sm:text-2xl font-black italic uppercase accent-text tracking-tight inline-block pr-3 group-hover:translate-x-1 transition-transform">
                            Logistika
                        </h2>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                            Správa • Týden {currentWeek}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 px-2">
                <button
                    onClick={() => setShowInventory(true)}
                    className="bg-[#f6c453] text-[#1f2933] px-2 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex flex-col items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                >
                    <ClipboardList className="w-5 h-5" />
                    <span>Inventář</span>
                </button>
                <button
                    onClick={() => setShowCalculator(true)}
                    className="bg-[#1f2933] text-[#f5f7fa] border-2 border-white/20 px-2 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex flex-col items-center justify-center gap-2 shadow-lg active:scale-95 transition-all hover:bg-white/5 group"
                >
                    <Calculator className="w-5 h-5 text-[#f6c453] group-hover:scale-110 group-hover:rotate-6 transition-transform" />
                    <span>Kalkulačka</span>
                </button>
                <button
                    onClick={() => setShowGuide(true)}
                    className="bg-white/5 border-2 border-white/20 text-white px-2 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex flex-col items-center justify-center gap-2 shadow-lg active:scale-95 transition-all hover:border-[#f6c453]/30 group"
                >
                    <ShoppingCart className="w-5 h-5 text-[#f6c453] group-hover:scale-110 group-hover:-rotate-6 transition-transform" />
                    <span>Nákupčí</span>
                </button>
            </div>

            {/* STROLLER CONFIGURATOR BUTTON */}
            <button
                onClick={() => setShowStrollerConfig(true)}
                className="w-full bg-[#1f2933] text-[#f5f7fa] border-2 border-white/20 px-3 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all mb-2 hover:bg-white/5 group"
            >
                <Truck className="w-5 h-5 opacity-60 text-[#f6c453] group-hover:scale-110 group-hover:translate-x-1 transition-transform" />
                <span>Konfigurátor Vozidla</span>
            </button>

            {/* CONSUMABLES BUTTON */}
            <button
                onClick={() => setShowConsumables(true)}
                className="w-full bg-[#1f2933] text-[#f5f7fa] border-2 border-white/20 px-3 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all mb-2 hover:bg-white/5 group"
            >
                <Package className="w-5 h-5 opacity-60 text-[#f6c453] group-hover:scale-110 group-hover:rotate-12 transition-transform" />
                <span>Počet v balení</span>
            </button>

            {/* OPERATIONAL PREP BUTTON */}
            <button
                onClick={() => setShowOperationalPrep(true)}
                className="w-full bg-[#1f2933] text-[#f5f7fa] border-2 border-white/20 px-3 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all mb-2 hover:bg-white/5 group"
            >
                <ClipboardList className="w-5 h-5 opacity-60 text-[#f6c453] group-hover:scale-110 group-hover:-rotate-3 transition-transform" />
                <span>Operační Příprava</span>
            </button>

            {/* CALCULATOR MODAL */}
            {showCalculator && (
                <div className="fixed inset-0 z-[70] bg-[#1f2933] overflow-y-auto animate-fade-in p-4 flex flex-col">
                    <div className="flex justify-between items-start mb-6 text-[#f5f7fa]">
                        <div>
                            <h2 className="text-xl font-black italic uppercase accent-text tracking-tighter">Finanční Centrum</h2>
                            <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Správa kreditů</p>
                        </div>
                        <button onClick={() => setShowCalculator(false)} className="p-3 bg-white/5 rounded-2xl border-2 border-white/20 active:scale-95">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex bg-[#2d3748] p-1 rounded-2xl mb-6">
                        <button
                            onClick={() => setCalcTab('budget')}
                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${calcTab === 'budget' ? 'bg-[#f6c453] text-[#1f2933] shadow-lg' : 'text-white/40'}`}
                        >
                            Rozpočet Mise
                        </button>
                        <button
                            onClick={() => setCalcTab('unit')}
                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${calcTab === 'unit' ? 'bg-[#f6c453] text-[#1f2933] shadow-lg' : 'text-white/40'}`}
                        >
                            Cena za kus
                        </button>
                    </div>

                    {calcTab === 'budget' ? (
                        <BudgetCalculator budgetPlan={budgetPlan} onSaveBudget={(plan) => { if (onSaveBudget) onSaveBudget(plan); setShowCalculator(false); }} />
                    ) : (
                        <UnitPriceCalculator />
                    )}
                </div>
            )
            }

            {/* STROLLER CONFIG MODAL */}
            {
                showStrollerConfig && (
                    <StrollerConfigurator
                        vehicleModel={vehicleModel}
                        onSaveVehicle={onSaveVehicle}
                        onConfirmVehicle={onConfirmVehicle}
                        onClose={() => setShowStrollerConfig(false)}
                    />
                )
            }

            {/* STRATEGIC GUIDE MODAL */}
            {
                showGuide && (
                    <ShoppingGuide
                        currentWeek={currentWeek}
                        gearChecklist={gearChecklist}
                        onClose={() => setShowGuide(false)}
                    />
                )
            }

            {/* GEAR INVENTORY MODAL */}
            {
                showInventory && (
                    <InventoryChecklist
                        gearChecklist={gearChecklist}
                        onToggleGear={onToggleGear}
                        customGear={customGear}
                        onAddCustomGear={onAddCustomGear}
                        onDeleteCustomGear={onDeleteCustomGear}
                        onToggleCustomGear={onToggleCustomGear}
                        isDevMode={isDevMode}
                        onCompleteAll={onCompleteAll}
                        onResetAll={onResetAllGear}
                        partnerName={partnerName}
                        onClose={() => setShowInventory(false)}
                    />
                )
            }

            {/* CONSUMABLES MODAL */}
            {
                showConsumables && (
                    <ConsumablesManager
                        budgetPlan={budgetPlan}
                        onUpdateConsumable={onUpdateConsumable}
                        onAddCustomConsumable={onAddCustomConsumable}
                        onDeleteConsumable={onDeleteConsumable}
                        onConfirmConsumption={onConfirmConsumption}
                        effectiveDate={effectiveDate}
                        onClose={() => setShowConsumables(false)}
                    />
                )
            }

            {/* OPERATIONAL PREP MODAL */}
            {
                showOperationalPrep && (
                    <OperationalPrep
                        checklist={operationalPrepChecklist}
                        onToggle={onToggleOperationalPrep}
                        customOperationalPrepGear={customOperationalPrepGear}
                        onAddCustomOperationalPrepGear={onAddCustomOperationalPrepGear}
                        onDeleteCustomOperationalPrepGear={onDeleteCustomOperationalPrepGear}
                        onToggleCustomOperationalPrepGear={onToggleCustomOperationalPrepGear}
                        onClose={() => setShowOperationalPrep(false)}
                    />
                )
            }

            {/* Strategy Card */}
            <div className="p-7 glass-card rounded-[3rem] bg-gradient-to-br from-slate-500/10 to-slate-500/5 border-white/20">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-[#f6c453]/10 rounded-2xl">
                        <Wallet className="w-6 h-6 text-[#f6c453]" />
                    </div>
                    <div>
                        <h4 className="font-black text-sm uppercase tracking-widest text-[#f6c453]">Strategická úspora</h4>
                        <p className="text-[10px] opacity-40 font-black uppercase">Jak nevykrvácet</p>
                    </div>
                </div>
                <p className="text-xs text-[#f5f7fa]/60 leading-relaxed italic">
                    "Pamatuj, že Juniorovi je úplně jedno, jestli má dupačky z Pařížské nebo ze sekáče. Co mu není jedno, je tvoje pohoda a bezpečná autosedačka. Alokuj zdroje tam, kde na tom skutečně záleží."
                </p>
            </div>
        </div >
    );
};

