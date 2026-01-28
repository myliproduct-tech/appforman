import React, { useState } from 'react';
import { X, ClipboardList, Zap, ChevronRight, CheckSquare, Square, Plus, Trash2, Printer, Heart, Shirt, Car, Utensils, Moon, Bath, Layers, Gamepad2, ShoppingCart, RotateCcw } from 'lucide-react';
import { GEAR_CHECKLIST } from '../../constants';
import { CustomGearItem } from '../../types';

interface InventoryChecklistProps {
    gearChecklist: string[];
    onToggleGear: (id: string) => void;
    customGear: CustomGearItem[];
    onAddCustomGear?: (item: CustomGearItem) => void;
    onDeleteCustomGear?: (id: string) => void;
    onToggleCustomGear?: (id: string) => void;
    isDevMode?: boolean;
    onCompleteAll?: () => void;
    onResetAll?: () => void;
    partnerName?: string;
    onClose: () => void;
}

export const InventoryChecklist: React.FC<InventoryChecklistProps> = ({
    gearChecklist,
    onToggleGear,
    customGear,
    onAddCustomGear,
    onDeleteCustomGear,
    onToggleCustomGear,
    isDevMode,
    onCompleteAll,
    onResetAll,
    partnerName,
    onClose
}) => {
    const [newItemName, setNewItemName] = useState('');
    const [collapsedCats, setCollapsedCats] = useState<Record<string, boolean>>({});

    const toggleCategory = (cat: string) => {
        setCollapsedCats(prev => ({ ...prev, [cat]: !prev[cat] }));
    };

    const totalItems = GEAR_CHECKLIST.reduce((acc, cat) => acc + cat.items.length, 0) + customGear.length;
    const checkedItems = gearChecklist.length + customGear.filter(i => i.bought).length;
    const progressPercent = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

    // Tactical Color Logic
    const getProgressColor = (percent: number) => {
        if (percent === 100) return '#10b981'; // emerald-500
        if (percent >= 75) return '#84cc16'; // lime-500
        if (percent >= 50) return '#eab308'; // yellow-500
        if (percent >= 25) return '#f97316'; // orange-500
        return '#ef4444'; // red-500
    };

    const progressColor = getProgressColor(progressPercent);

    const handleAddCustomItem = () => {
        if (newItemName.trim() && onAddCustomGear) {
            onAddCustomGear({
                id: `custom_${Date.now()}`,
                label: newItemName,
                category: 'Vlastní',
                bought: false
            });
            setNewItemName('');
        }
    };

    const handlePrintMissing = async () => {
        const missingStandard = GEAR_CHECKLIST.flatMap(cat =>
            cat.items
                .filter(item => !gearChecklist.includes(item.id))
                .map(item => ({ ...item, category: cat.category }))
        );

        const missingCustom = customGear.filter(c => !c.bought);

        // Dynamically load html2pdf.js from CDN
        const loadHtml2Pdf = () => {
            return new Promise((resolve, reject) => {
                if ((window as any).html2pdf) {
                    resolve((window as any).html2pdf);
                    return;
                }

                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
                script.onload = () => resolve((window as any).html2pdf);
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        try {
            const html2pdf = await loadHtml2Pdf() as any;

            // Create temporary container for the report
            const element = document.createElement('div');
            element.style.padding = '40px';
            element.style.color = '#1f2933';
            element.style.fontFamily = 'Arial, sans-serif';
            element.style.backgroundColor = '#ffffff';

            element.innerHTML = `
                <div style="border-bottom: 2px solid #f6c453; padding-bottom: 20px; margin-bottom: 30px;">
                    <h1 style="font-size: 24px; font-weight: 900; font-style: italic; color: #1f2933; margin: 0; text-transform: uppercase;">Chybějící Položky - Report</h1>
                    <div style="font-size: 10px; color: #666; margin-top: 5px; text-transform: uppercase; letter-spacing: 0.1em;">Taktický Seznam Zásobování</div>
                </div>

                <div style="display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 12px; font-weight: bold; color: #4a5568;">
                    <span>Datum: ${new Date().toLocaleDateString('cs-CZ')}</span>
                    <span>Stav mise: ${progressPercent}% Hotovo</span>
                </div>

                ${GEAR_CHECKLIST.map(cat => {
                const missingInCat = missingStandard.filter(i => i.category === cat.category);
                if (missingInCat.length === 0) return '';
                return `
                        <div style="margin-bottom: 25px;">
                            <h3 style="background: #f7fafc; padding: 8px 12px; font-size: 12px; font-weight: 900; color: #2d3748; border-left: 4px solid #f6c453; text-transform: uppercase; margin-bottom: 15px;">${cat.category}</h3>
                            <div style="display: grid; gap: 8px; padding-left: 5px;">
                                ${missingInCat.map(item => `
                                    <div style="display: flex; align-items: center; gap: 10px; font-size: 11px; color: #1f2933;">
                                        <div style="width: 12px; height: 12px; border: 1.5px solid #cbd5e0; border-radius: 3px;"></div>
                                        <span>${item.label}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
            }).join('')}

                ${missingCustom.length > 0 ? `
                    <div style="margin-bottom: 25px;">
                        <h3 style="background: #f7fafc; padding: 8px 12px; font-size: 12px; font-weight: 900; color: #2d3748; border-left: 4px solid #f6c453; text-transform: uppercase; margin-bottom: 15px;">Vlastní Výbava</h3>
                        <div style="display: grid; gap: 8px; padding-left: 5px;">
                            ${missingCustom.map(item => `
                                <div style="display: flex; align-items: center; gap: 10px; font-size: 11px; color: #1f2933;">
                                    <div style="width: 12px; height: 12px; border: 1.5px solid #cbd5e0; border-radius: 3px;"></div>
                                    <span>${item.label}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <div style="margin-top: 50px; border-top: 1px solid #edf2f7; pt-20px; text-align: center; font-size: 9px; font-style: italic; color: #a0aec0;">
                    Generováno aplikací Partner v Akci
                </div>
            `;

            const opt = {
                margin: 10,
                filename: `chybejici-polozky-${new Date().toISOString().split('T')[0]}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, letterRendering: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            // Generate and save PDF
            await html2pdf().set(opt).from(element).save();

        } catch (error) {
            console.error('Chyba při generování PDF:', error);
            alert('Nepodařilo se vygenerovat PDF. Zkuste to prosím znovu.');
        }
    };

    const getDisplayCategoryName = (originalName: string) => {
        if (originalName.includes("Velitelka") && partnerName) {
            return `Logistika: ${partnerName}`;
        }
        return originalName;
    }

    const getCategoryIcon = (categoryName: string) => {
        if (categoryName.includes("Velitelka")) return <Heart className="w-4 h-4" />;
        if (categoryName.includes("Výstroj")) return <Shirt className="w-4 h-4" />;
        if (categoryName.includes("Vozidla")) return <Car className="w-4 h-4" />;
        if (categoryName.includes("Palivový")) return <Utensils className="w-4 h-4" />;
        if (categoryName.includes("Spánkový")) return <Moon className="w-4 h-4" />;
        if (categoryName.includes("Dekontaminace")) return <Bath className="w-4 h-4" />;
        if (categoryName.includes("Přebalování")) return <Layers className="w-4 h-4" />;
        if (categoryName.includes("Simulátory")) return <Gamepad2 className="w-4 h-4" />;
        return <ShoppingCart className="w-4 h-4" />;
    };

    return (
        <div className="fixed inset-0 z-[60] bg-[#1f2933] overflow-y-auto animate-fade-in p-4">
            <div className="max-w-md mx-auto min-h-full flex flex-col">
                <div className="flex justify-between items-center mb-8 sticky top-0 bg-[#1f2933] py-4 z-10 text-[#f5f7fa]">
                    <div>
                        <h2 className="text-2xl font-black italic uppercase text-[#f6c453] tracking-tighter">Taktický Inventář</h2>
                        <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Kompletní výbava Juniora</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 bg-white/5 rounded-2xl border border-white/10 active:scale-95 hover:bg-white/10 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Dev Mode Action */}
                {isDevMode && (
                    <div className="flex gap-2 mb-6">
                        {onCompleteAll && (
                            <button
                                onClick={onCompleteAll}
                                className="flex-1 bg-red-500/20 text-red-500 border border-red-500/30 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-red-500/30 transition-all shadow-lg"
                            >
                                <Zap className="w-4 h-4" /> [DEV] Splnit Vše
                            </button>
                        )}
                        {onResetAll && (
                            <button
                                onClick={onResetAll}
                                className="flex-1 bg-white/5 text-white/50 border border-white/10 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all shadow-lg"
                            >
                                <RotateCcw className="w-4 h-4" /> [DEV] Odškrtnout
                            </button>
                        )}
                    </div>
                )}

                {/* Overall Progress */}
                <div className="glass-card p-6 rounded-[2rem] border-white/5 mb-8 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{ background: `radial-gradient(circle at top right, ${progressColor}, transparent)` }}
                    />
                    <div className="flex justify-between items-end mb-3 relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60 text-[#f5f7fa]">Status připravenosti</span>
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
                    <p className="text-[10px] font-black opacity-30 uppercase tracking-widest mt-3 text-right text-[#f5f7fa] relative z-10">
                        {checkedItems} / {totalItems} Položek zajištěno
                    </p>
                </div>

                <div className="space-y-6 pb-6">
                    {GEAR_CHECKLIST.map((category, cIdx) => {
                        const isCollapsed = collapsedCats[category.category];
                        const checkedInCat = category.items.filter(i => gearChecklist.includes(i.id)).length;
                        const isDone = checkedInCat === category.items.length;

                        return (
                            <div key={cIdx} className="space-y-3">
                                <div
                                    onClick={() => toggleCategory(category.category)}
                                    className="flex items-center justify-between px-2 cursor-pointer group"
                                >
                                    <div className="flex items-center gap-2 text-[#f5f7fa]">
                                        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-0' : 'rotate-90'} opacity-40`} />
                                        <div className={`transition-colors ${isDone ? 'text-emerald-500' : 'text-[#f6c453]'}`}>
                                            {getCategoryIcon(category.category)}
                                        </div>
                                        <h3 className={`text-[11px] font-black uppercase tracking-[0.15em] transition-colors ${isDone ? 'text-emerald-400' : 'opacity-80'}`}>
                                            {getDisplayCategoryName(category.category)}
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
                                            const isChecked = gearChecklist.includes(item.id);
                                            return (
                                                <div
                                                    key={item.id}
                                                    onClick={() => onToggleGear(item.id)}
                                                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${isChecked
                                                        ? 'bg-emerald-500/10 border-emerald-500/20'
                                                        : 'bg-white/5 border-white/5 hover:border-white/10'
                                                        }`}
                                                >
                                                    {isChecked ? (
                                                        <CheckSquare className="w-5 h-5 text-emerald-500" />
                                                    ) : (
                                                        <Square className="w-5 h-5 opacity-20 text-white" />
                                                    )}
                                                    <div className="flex-1">
                                                        <span className={`text-xs font-bold transition-all block ${isChecked ? 'text-emerald-400/60 line-through' : 'text-[#f5f7fa]'}`}>
                                                            {item.label}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* CUSTOM GEAR SECTION */}
                <div className="space-y-4 mb-8 border-t border-white/5 pt-6 text-[#f5f7fa]">
                    <div
                        onClick={() => toggleCategory('custom')}
                        className="flex items-center justify-between px-2 cursor-pointer group"
                    >
                        <div className="flex items-center gap-2">
                            <Plus className="w-4 h-4 text-[#f6c453]" />
                            <h3 className="text-[11px] font-black uppercase tracking-[0.15em] opacity-80">Vlastní Položky</h3>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Print Button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); handlePrintMissing(); }}
                                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 active:scale-95 transition-all hover:bg-white/10"
                            >
                                <Printer className="w-3 h-3 text-emerald-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#f5f7fa]">Export PDF</span>
                            </button>
                            <RotateCcw className={`w-3.5 h-3.5 transition-transform duration-300 opacity-30 group-hover:opacity-100 ${collapsedCats['custom'] ? '-rotate-90' : 'rotate-0'}`} />
                        </div>
                    </div>

                    {!collapsedCats['custom'] && (
                        <div className="animate-slide-up space-y-4">
                            <div className="flex gap-2 mb-4">
                                <input
                                    value={newItemName}
                                    onChange={(e) => setNewItemName(e.target.value)}
                                    placeholder="Přidat vlastní položku..."
                                    className="flex-1 bg-[#2d3748] border-none rounded-xl px-4 py-2 text-xs font-bold text-white placeholder-white/20 focus:ring-1 focus:ring-[#f6c453] outline-none"
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddCustomItem()}
                                />
                                <button
                                    onClick={handleAddCustomItem}
                                    className="bg-[#f6c453] text-[#1f2933] p-2 rounded-xl active:scale-95 transition-all shadow-md"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid gap-2 pb-10">
                                {customGear.map(item => (
                                    <div
                                        key={item.id}
                                        className={`p-4 rounded-2xl border transition-all flex items-center gap-4 ${item.bought
                                            ? 'bg-emerald-500/10 border-emerald-500/20'
                                            : 'bg-white/5 border-white/5 hover:border-white/10'
                                            }`}
                                    >
                                        <div onClick={() => onToggleCustomGear && onToggleCustomGear(item.id)} className="cursor-pointer">
                                            {item.bought ? <CheckSquare className="w-5 h-5 text-emerald-500" /> : <Square className="w-5 h-5 opacity-20 text-white" />}
                                        </div>
                                        <div className="flex-1 flex justify-between items-center">
                                            <span className={`text-xs font-bold transition-all block ${item.bought ? 'text-emerald-400/60 line-through' : 'text-[#f5f7fa]'}`}>
                                                {item.label}
                                            </span>
                                            <button onClick={() => onDeleteCustomGear && onDeleteCustomGear(item.id)} className="p-2 opacity-30 hover:opacity-100 hover:text-rose-500 transition-all">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {customGear.length === 0 && (
                                    <p className="text-center text-[10px] opacity-30 italic py-4">Zatím žádné vlastní položky.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
