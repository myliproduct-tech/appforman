import React, { useState } from 'react';
import { Tag, Hash, Info } from 'lucide-react';

export const UnitPriceCalculator: React.FC = () => {
    const [packPrice, setPackPrice] = useState<string>('');
    const [packCount, setPackCount] = useState<string>('');

    const unitPrice = (parseFloat(packPrice) > 0 && parseFloat(packCount) > 0) ? (parseFloat(packPrice) / parseFloat(packCount)) : 0;

    const getUnitRating = (price: number) => {
        if (price === 0) return { text: 'Zadej data', color: 'text-white opacity-50' };
        if (price < 4) return { text: 'TAKTICKÁ VÝHRA (SKLADOVAT!)', color: 'text-[#f6c453]' };
        if (price < 6) return { text: 'STANDARDNÍ CENA', color: 'text-[#f6c453]/80' };
        return { text: 'PŘEDRAŽENO (JEN V NOUZI)', color: 'text-rose-500' };
    };

    const rating = getUnitRating(unitPrice);

    return (
        <div className="flex-1 flex flex-col animate-slide-up">
            <div className="glass-card p-8 rounded-[2.5rem] border-[#f6c453]/20 mb-6 text-center relative overflow-hidden flex-1 flex flex-col justify-center items-center">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-2">Výsledek analýzy</p>
                <div className="text-6xl font-black text-white tabular-nums tracking-tighter mb-4">
                    {unitPrice.toFixed(2)} <span className="text-2xl text-white/30">Kč/ks</span>
                </div>
                <div className={`px-4 py-2 rounded-xl bg-black/30 border border-white/5 ${rating.color} font-black text-[10px] uppercase tracking-widest`}>
                    {rating.text}
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-[#2d3748] p-4 rounded-2xl border border-white/5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#f6c453] mb-2 flex items-center gap-2">
                        <Tag className="w-3 h-3" /> Cena za balení
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={packPrice}
                            onChange={(e) => setPackPrice(e.target.value)}
                            placeholder="0"
                            className="w-full bg-[#1f2933] border border-white/10 rounded-xl px-4 py-4 text-xl font-bold text-white focus:border-[#f6c453] outline-none tabular-nums"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs font-bold">Kč</span>
                    </div>
                </div>

                <div className="bg-[#2d3748] p-4 rounded-2xl border border-white/5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#f6c453] mb-2 flex items-center gap-2">
                        <Hash className="w-3 h-3" /> Počet kusů v balení
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={packCount}
                            onChange={(e) => setPackCount(e.target.value)}
                            placeholder="0"
                            className="w-full bg-[#1f2933] border border-white/10 rounded-xl px-4 py-4 text-xl font-bold text-white focus:border-[#f6c453] outline-none tabular-nums"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs font-bold">ks</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-[#f6c453]/10 border border-[#f6c453]/20">
                <div className="flex items-start gap-3">
                    <Info className="w-4 h-4 text-[#f6c453] shrink-0 mt-0.5" />
                    <p className="text-[10px] text-white/70 leading-relaxed">
                        <span className="font-bold text-[#f6c453]">Tip Velitele:</span> V akci se snaž dostat pod 4 Kč/ks. U novorozeneckých plen (vel. 1 a 2) spotřebuješ až 10 ks denně. Rozdíl 1 Kč na pleně udělá 300 Kč měsíčně.
                    </p>
                </div>
            </div>
        </div>
    );
};
