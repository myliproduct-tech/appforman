import React, { useState, useEffect, useRef } from 'react';
import { Clock, Play, Square, Trash2, Activity, Info, AlertTriangle, X } from 'lucide-react';
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
            const now = Date.now();
            setStartTime(now);
            setIsActive(true);
        } else {
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

    const analyzeHistory = () => {
        if (contractions.length < 1) return null; // Changed from 3 to 1 to show info for any record

        const recent = contractions.slice(0, 5);
        const avgInterval = recent.reduce((acc, c) => acc + (c.interval || 0), 0) / (recent.length - 1 || 1);
        const avgDuration = recent.reduce((acc, c) => acc + c.duration, 0) / recent.length;

        // Critical - Intervals under 6 mins, sustained
        if (avgInterval <= 360 && avgDuration >= 45) {
            return {
                level: 'critical',
                title: 'KRITICKÝ STAV: ODJEZD',
                message: 'ČAS VYRAZIT DO PORODNICE!'
            };
        }
        // Active Alert - Intervals under 10 mins
        else if (avgInterval <= 600) {
            return {
                level: 'warning',
                title: 'AKTIVNÍ POHOTOVOST',
                message: 'Kontrakce jsou pravidelné a zkracují se. Buďte připraveni k přesunu.'
            };
        }
        // Early Stage - Any record
        return {
            level: 'info',
            title: 'RANNÁ FÁZE',
            message: 'Kontrakce zaznamenány. Sledujte trend a snažte se odpočívat.'
        };
    };

    const status = analyzeHistory();

    return (
        <div className="fixed inset-0 z-[80] bg-[#1f2933] flex flex-col animate-fade-in overflow-hidden">
            <div className="max-w-2xl mx-auto w-full h-full flex flex-col bg-[#1f2933]">
                <div className="flex justify-between items-center bg-[#1f2933] px-4 py-8 z-30 border-b border-white/5 shadow-xl shrink-0">
                    <div className="flex items-center gap-3">
                        <div>
                            <h2 className="text-xl font-black italic uppercase text-[#f6c453] tracking-tighter">
                                Měřič Kontrakcí
                            </h2>
                            <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">
                                Logistika porodu • Taktický časovač
                            </p>
                        </div>
                    </div>

                    <button onClick={onClose} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10">
                        <X className="w-6 h-6 text-[#f6c453]" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 pt-6 pb-24 custom-scrollbar">
                    <div className="space-y-6">
                        {/* Status Advisor - Styled like Intro card */}
                        <div className={`glass-card p-6 rounded-3xl border-2 ${status?.level === 'critical' ? 'bg-red-500/10 border-red-500/30' :
                            status?.level === 'warning' ? 'bg-amber-500/5 border-amber-500/20' : 'bg-[#f6c453]/5 border-[#f6c453]/20'}`}>
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-xl shrink-0 ${status?.level === 'critical' ? 'bg-red-500/20' :
                                    status?.level === 'warning' ? 'bg-amber-500/20' : 'bg-[#f6c453]/20'}`}>
                                    {status?.level === 'critical' ? (
                                        <AlertTriangle className="w-6 h-6 text-red-400" />
                                    ) : (
                                        <Info className="w-6 h-6 text-[#f6c453]" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg font-black mb-1">
                                        {status ? (status.level === 'critical' ? <span className="text-red-500 uppercase animate-pulse">{status.title}</span> :
                                            <span className="text-white uppercase italic">{status.title}</span>) :
                                            <span className="text-white font-black italic">Instrukce měření</span>}
                                    </h3>
                                    <p className={`text-sm leading-relaxed italic font-bold ${status?.level === 'critical' ? 'text-red-400 text-lg not-italic mt-2' : 'text-white/70'}`}>
                                        {status ? status.message : "Sledujte pravidelnost a délku kontrakcí. Při intervalu pod 5-7 minut se připravte k odjezdu."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Main Timer Display - Large Card Styling */}
                        <div className="glass-card p-10 rounded-3xl border-white/10 flex flex-col items-center gap-6 shadow-xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#f6c453]/5 to-transparent blur-3xl"></div>
                            <div className="relative text-7xl font-black tabular-nums accent-text italic tracking-tighter mb-4">
                                {formatTime(currentTime)}
                            </div>

                            <button
                                onClick={handleToggle}
                                className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-2xl ${isActive ? 'bg-rose-600 shadow-rose-600/40' : 'bg-[#f6c453] shadow-[#f6c453]/40'}`}
                            >
                                {isActive ? (
                                    <Square className="w-10 h-10 text-[#1f2933] fill-current" />
                                ) : (
                                    <Play className="w-10 h-10 text-[#1f2933] fill-current ml-1" />
                                )}
                            </button>
                            <p className="relative z-10 text-[11px] font-black uppercase tracking-[0.4em] opacity-40 text-white mt-2">
                                {isActive ? 'Probíhá aktivní měření' : 'Měřič připraven'}
                            </p>
                        </div>

                        {/* History Section - Styled like Trimester tips */}
                        <div className="glass-card p-6 rounded-3xl border-white/10 shadow-lg">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#f6c453]/10 rounded-lg">
                                        <Activity className="w-5 h-5 text-[#f6c453]" />
                                    </div>
                                    <h3 className="text-lg font-black text-white italic uppercase tracking-tight">Historie měření</h3>
                                </div>
                                {contractions.length > 0 && (
                                    <button
                                        onClick={handleClear}
                                        className="p-2.5 rounded-xl bg-white/5 hover:bg-rose-500/10 text-rose-400 group transition-all border border-white/10 hover:border-rose-500/20"
                                    >
                                        <Trash2 className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                )}
                            </div>

                            <div className="space-y-3">
                                {contractions.length === 0 ? (
                                    <div className="bg-white/5 p-12 rounded-2xl border border-dashed border-white/10 text-center">
                                        <Clock className="w-10 h-10 mx-auto mb-3 opacity-10 text-[#f6c453]" />
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-20">Žádná data v archivu</p>
                                    </div>
                                ) : (
                                    contractions.map((c, i) => (
                                        <div key={c.id} className="bg-white/5 p-5 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-[#f6c453]/30 transition-all hover:bg-white/[0.07]">
                                            <div className="flex items-center gap-6">
                                                <div className="text-left border-r border-white/10 pr-6">
                                                    <span className="text-[10px] font-black text-white/20 uppercase block mb-0.5">Start</span>
                                                    <span className="text-sm font-black text-white/90">{new Date(c.startTime).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-black text-white/20 uppercase block mb-0.5">Trvání</span>
                                                    <span className="text-sm font-black text-[#f6c453]">{formatTime(c.duration)}</span>
                                                </div>
                                            </div>

                                            {c.interval && (
                                                <div className="text-right">
                                                    <span className="text-[10px] font-black text-white/20 uppercase block mb-1.5">Interval</span>
                                                    <span className="text-[11px] font-black text-[#1f2933] bg-[#f6c453] px-4 py-1.5 rounded-full uppercase tracking-tighter">
                                                        {formatInterval(c.interval)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Bottom Tactics Card */}
                        <div className="bg-gradient-to-r from-[#f6c453]/10 to-transparent rounded-2xl p-6 border-l-4 border-[#f6c453] mb-10">
                            <p className="text-[11px] text-white/60 leading-relaxed font-bold uppercase tracking-wide">
                                ⚡ <span className="text-[#f6c453]">Taktická poznámka:</span> Pravidelné kontrakce jsou signálem k přesunu na základnu. Měj připravené zavazadlo a auto v pohotovosti.
                            </p>
                        </div>
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
