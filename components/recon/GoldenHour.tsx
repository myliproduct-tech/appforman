import React, { useState } from 'react';
import { Sun, Heart, Activity, Check } from 'lucide-react';

export const GoldenHour: React.FC = () => {
    const [showGoldenHour, setShowGoldenHour] = useState(false);

    return (
        <section className={`glass-card p-6 rounded-[2.5rem] border-yellow-500/20 bg-yellow-500/5 transition-all duration-500 ${showGoldenHour ? 'ring-2 ring-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.15)]' : ''}`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-500/20 rounded-lg animate-pulse">
                        <Sun className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                        <h3 className="text-[10px] font-black text-yellow-400 uppercase tracking-[0.2em]">Protokol Zlatá Hodinka</h3>
                        <p className="text-[10px] font-bold opacity-30 uppercase">Prvních 60 minut po výsadku</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowGoldenHour(!showGoldenHour)}
                    className="text-[10px] font-black uppercase tracking-widest bg-yellow-500/10 text-yellow-400 px-3 py-1.5 rounded-lg border border-yellow-500/20 hover:bg-yellow-500/20 transition-all active:scale-95 group"
                >
                    {showGoldenHour ? 'Zavřít Protokol' : 'Otevřít Protokol'}
                </button>
            </div>

            {showGoldenHour && (
                <div className="space-y-3 animate-slide-up mt-2">
                    <div className="bg-[#1f2933] p-4 rounded-2xl border border-yellow-500/20 flex gap-3 group/item">
                        <div className="h-full mt-1"><Heart className="w-4 h-4 text-rose-400 group-hover/item:scale-110 transition-transform" /></div>
                        <div>
                            <h4 className="text-[10px] font-black uppercase text-yellow-400">Skin-to-Skin (Bonding)</h4>
                            <p className="text-[10px] text-[#f5f7fa] opacity-70">Junior musí jít okamžitě na hruď Velitelky. Žádné měření ani vážení, to počká. Teplo a tlukot srdce jsou priorita.</p>
                        </div>
                    </div>
                    <div className="bg-[#1f2933] p-4 rounded-2xl border border-yellow-500/20 flex gap-3 group/item">
                        <div className="h-full mt-1"><Activity className="w-4 h-4 text-emerald-400 group-hover/item:scale-110 transition-transform" /></div>
                        <div>
                            <h4 className="text-[10px] font-black uppercase text-yellow-400">Dotepání pupečníku</h4>
                            <p className="text-[10px] text-[#f5f7fa] opacity-70">Nechat dotepat (cca 3-5 min). Junior získá zpět až 30% své krve a zásoby železa.</p>
                        </div>
                    </div>
                    <div className="bg-[#1f2933] p-4 rounded-2xl border border-yellow-500/20 flex gap-3 group/item">
                        <div className="h-full mt-1"><Check className="w-4 h-4 text-[#f6c453] group-hover/item:scale-110 transition-transform" /></div>
                        <div>
                            <h4 className="text-[10px] font-black uppercase text-yellow-400">Samopřisátí</h4>
                            <p className="text-[10px] text-[#f5f7fa] opacity-70">Junior se sám doplazí k prsu. Aktivuje se laktace a vyplavuje oxytocin (stahuje dělohu).</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
