import React from 'react';
import { Droplets, Check, Siren } from 'lucide-react';

interface AmnioticFluidProps {
    partnerName: string;
    amnioticFluidLog: { time: string; color: 'clear' | 'green' | 'blood' | 'unknown' } | null;
    onLogAmnioticFluid: (color: 'clear' | 'green' | 'blood' | 'unknown') => void;
}

export const AmnioticFluid: React.FC<AmnioticFluidProps> = ({ partnerName, amnioticFluidLog, onLogAmnioticFluid }) => {
    return (
        <div className="glass-card p-6 rounded-[2rem] border-[#f6c453]/20 animate-slide-up bg-[#f6c453]/5 group">
            <div className="flex items-center gap-3 mb-4">
                <Droplets className="w-5 h-5 text-[#f6c453] group-hover:scale-110 transition-transform" />
                <div>
                    <h4 className="text-xs font-black text-[#f6c453] uppercase tracking-widest">Analýza Plodové Vody</h4>
                    <p className="text-[10px] opacity-60">Praskla voda? Vyhodnoť barvu.</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                    onClick={() => onLogAmnioticFluid('clear')}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${amnioticFluidLog?.color === 'clear' ? 'bg-emerald-500/20 border-emerald-500' : 'bg-[#1f2933] border-white/5 hover:bg-emerald-500/10'}`}
                >
                    <div className="w-8 h-8 rounded-full bg-white/90 border-2 border-[#f6c453]/30 shadow-inner group-hover:scale-110 transition-transform"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-center">Čirá / Růžová</span>
                </button>
                <button
                    onClick={() => onLogAmnioticFluid('green')}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${amnioticFluidLog?.color === 'green' ? 'bg-lime-500/20 border-lime-500' : 'bg-[#1f2933] border-white/5 hover:bg-lime-500/10'}`}
                >
                    <div className="w-8 h-8 rounded-full bg-lime-700 border-2 border-lime-500"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-center text-lime-500">Zelená / Zakalená</span>
                </button>
            </div>

            {amnioticFluidLog?.color === 'clear' && (
                <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 animate-fade-in">
                    <h5 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1 flex items-center gap-2"><Check className="w-3 h-3" /> Stav: Normální</h5>
                    <p className="text-[10px] text-emerald-200/70 leading-relaxed">
                        Zaznamenáno: {new Date(amnioticFluidLog.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.<br />
                        Pokud {partnerName} nemá kontrakce, v klidu se připravte a vyražte do porodnice (max do 2h).
                    </p>
                </div>
            )}

            {amnioticFluidLog?.color === 'green' && (
                <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/20 animate-fade-in animate-pulse">
                    <h5 className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1 flex items-center gap-2"><Siren className="w-3 h-3" /> PRIORITA ALFA!</h5>
                    <p className="text-[10px] text-rose-200/70 leading-relaxed font-bold">
                        Zaznamenáno: {new Date(amnioticFluidLog.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.<br />
                        Voda obsahuje smolku (mekonium). Hrozí hypoxie Juniora. OKAMŽITÝ TRANSPORT DO NEMOCNICE!
                    </p>
                </div>
            )}
        </div>
    );
};
