
import React, { useState, useEffect, useRef } from 'react';
import { Clock, Play, Square, Trash2, ChevronLeft, Activity, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Contraction } from '../../types';

interface ContractionTimerProps {
    onClose: () => void;
    contractions: Contraction[];
    onUpdate: (contractions: Contraction[]) => void;
}

export const ContractionTimer: React.FC<ContractionTimerProps> = ({ onClose, contractions = [], onUpdate }) => {
    const [isActive, setIsActive] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Update current timer display
    useEffect(() => {
        if (isActive && startTime) {
            timerRef.current = setInterval(() => {
                setCurrentTime(Math.floor((Date.now() - startTime) / 1000));
            }, 100);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
            setCurrentTime(0);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, startTime]);

    const handleToggle = () => {
        if (!isActive) {
            // Start
            const now = Date.now();
            setStartTime(now);
            setIsActive(true);
        } else {
            // Stop and save
            const now = Date.now();
            const duration = Math.floor((now - (startTime || now)) / 1000);

            const lastContraction = contractions.length > 0 ? contractions[0] : null;
            let interval: number | undefined = undefined;

            if (lastContraction) {
                const lastStart = new Date(lastContraction.startTime).getTime();
                interval = Math.floor((startTime! - lastStart) / 1000);
            }

            const newContraction: Contraction = {
                id: `ct_${Date.now()}`,
                startTime: new Date(startTime!).toISOString(),
                duration,
                interval
            };

            onUpdate([newContraction, ...contractions]);
            setIsActive(false);
            setStartTime(null);
        }
    };

    const handleClear = () => {
        if (confirm('Opravdu chcete smazat celou historii měření?')) {
            onUpdate([]);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const formatInterval = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        if (mins < 1) return 'Méně než minuta';
        if (mins === 1) return '1 minuta';
        if (mins < 5) return `${mins} minuty`;
        return `${mins} minut`;
    };

    // 5-1-1 Rule check (simplified)
    // Contractions every 5 mins or less, lasting 1 min, for 1 hour
    const analyzeHistory = () => {
        if (contractions.length < 3) return null;

        const recent = contractions.slice(0, 5);
        const avgInterval = recent.reduce((acc, c) => acc + (c.interval || 0), 0) / (recent.length - 1 || 1);
        const avgDuration = recent.reduce((acc, c) => acc + c.duration, 0) / recent.length;

        if (avgInterval <= 300 && avgDuration >= 45) {
            return {
                level: 'critical',
                message: 'PRAVIDLO 5-1-1 SPLNĚNO: Kontrakce jsou pravidelné a dostatečně dlouhé. Připravte se k výsadku (odjezd do porodnice)!'
            };
        } else if (avgInterval <= 600) {
            return {
                level: 'warning',
                message: 'Kontrakce se zkracují. Pokračujte v monitorování a buďte v pohotovosti.'
            };
        }
        return null;
    };

    const status = analyzeHistory();

    return (
        <div className="fixed inset-0 z-[80] bg-[#1f2933] overflow-y-auto animate-fade-in pb-20">
            <div className="max-w-md mx-auto px-4 py-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                    <button onClick={onClose} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 group">
                        <ChevronLeft className="w-5 h-5 text-[#f6c453] group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div className="text-right">
                        <h2 className="text-xl font-black italic uppercase accent-text tracking-tighter">
                            Měřič Kontrakcí
                        </h2>
                        <p className="text-[9px] font-black opacity-30 uppercase tracking-[0.2em]">
                            Monitorování porodu • Taktický časovač
                        </p>
                    </div>
                </div>

                {/* Status Advisor */}
                {status ? (
                    <div className={`p-4 rounded-2xl border flex gap-3 items-start animate-bounce-subtle ${status.level === 'critical' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-[#f6c453]/10 border-[#f6c453]/30 text-[#f6c453]'}`}>
                        {status.level === 'critical' ? <AlertTriangle className="w-5 h-5 shrink-0" /> : <Info className="w-5 h-5 shrink-0" />}
                        <p className="text-[10px] font-bold uppercase leading-relaxed tracking-wide">
                            {status.message}
                        </p>
                    </div>
                ) : (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-3 items-start opacity-60">
                        <Info className="w-5 h-5 text-[#f6c453] shrink-0" />
                        <p className="text-[10px] font-bold uppercase leading-relaxed tracking-wide text-white/70">
                            Tip: Pravidlo 5-1-1 říká, že pokud jsou kontrakce každých 5 minut, trvají 1 minutu a trvá to už 1 hodinu, je čas jet do porodnice.
                        </p>
                    </div>
                )}

                {/* Main Timer Display */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f6c453]/20 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <div className="relative glass-card rounded-[3rem] p-10 border-[#f6c453]/20 flex flex-col items-center gap-6 shadow-2xl">
                        <div className="text-6xl font-black tabular-nums accent-text italic tracking-tighter">
                            {formatTime(currentTime)}
                        </div>

                        <button
                            onClick={handleToggle}
                            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-2xl ${isActive ? 'bg-red-500 shadow-red-500/30' : 'bg-[#f6c453] shadow-[#f6c453]/30'}`}
                        >
                            {isActive ? (
                                <Square className="w-10 h-10 text-[#1f2933] fill-current" />
                            ) : (
                                <Play className="w-10 h-10 text-[#1f2933] fill-current ml-1" />
                            )}
                        </button>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
                            {isActive ? 'Probíhá kontrakce' : 'Připraven k měření'}
                        </p>
                    </div>
                </div>

                {/* History Table */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                            <Activity className="w-4 h-4 text-[#f6c453]" /> Historie Protokolu
                        </h3>
                        {contractions.length > 0 && (
                            <button
                                onClick={handleClear}
                                className="text-[9px] font-black uppercase text-red-400/50 hover:text-red-400 transition-colors flex items-center gap-1"
                            >
                                <Trash2 className="w-3 h-3" /> Vymazat
                            </button>
                        )}
                    </div>

                    <div className="space-y-2">
                        {contractions.length === 0 ? (
                            <div className="text-center py-10 opacity-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                                <Clock className="w-10 h-10 mx-auto mb-2 opacity-50" />
                                <p className="text-[10px] font-black uppercase tracking-widest">Zatím žádná data</p>
                            </div>
                        ) : (
                            contractions.map((c, i) => (
                                <div key={c.id} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between animate-slide-up group hover:bg-white/10 transition-all">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">
                                            {new Date(c.startTime).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                        </span>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#f6c453]"></div>
                                            <span className="text-sm font-black text-white/90">Trvání: {formatTime(c.duration)}</span>
                                        </div>
                                    </div>

                                    {c.interval && (
                                        <div className="text-right">
                                            <span className="text-[9px] font-black text-[#f6c453]/40 uppercase tracking-widest block mb-1">Interval</span>
                                            <span className="text-[10px] font-bold text-[#f6c453] bg-[#f6c453]/10 px-3 py-1 rounded-full uppercase tracking-wide">
                                                {formatInterval(c.interval)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite ease-in-out;
        }
      `}</style>
        </div>
    );
};
