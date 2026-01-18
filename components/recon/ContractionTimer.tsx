import React, { useState, useEffect } from 'react';
import { Timer, Play, Square as StopSquare, RotateCcw, AlertTriangle } from 'lucide-react';

interface ContractionRecord {
    start: number;
    end: number;
    duration: number; // in seconds
    interval: number; // in minutes (from previous start)
}

export const ContractionTimer: React.FC = () => {
    const [isTiming, setIsTiming] = useState(false);
    const [contractionStart, setContractionStart] = useState<number | null>(null);
    const [contractions, setContractions] = useState<ContractionRecord[]>([]);
    const [elapsed, setElapsed] = useState(0);

    // Timer Effect
    useEffect(() => {
        let interval: any;
        if (isTiming && contractionStart) {
            interval = setInterval(() => {
                setElapsed(Math.floor((Date.now() - contractionStart) / 1000));
            }, 1000);
        } else {
            setElapsed(0);
        }
        return () => clearInterval(interval);
    }, [isTiming, contractionStart]);

    const handleToggle = () => {
        if (isTiming && contractionStart) {
            // Stop
            const end = Date.now();
            const duration = Math.floor((end - contractionStart) / 1000);
            const prevStart = contractions.length > 0 ? contractions[0].start : null;
            const interval = prevStart ? Math.floor((contractionStart - prevStart) / 60000) : 0;

            setContractions(prev => [{ start: contractionStart, end, duration, interval }, ...prev].slice(0, 5));
            setIsTiming(false);
            setContractionStart(null);
        } else {
            // Start
            setContractionStart(Date.now());
            setIsTiming(true);
        }
    };

    const handleReset = () => {
        setContractions([]);
        setIsTiming(false);
        setContractionStart(null);
        setElapsed(0);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Analysis
    const avgDuration = contractions.length > 0
        ? Math.round(contractions.reduce((sum, c) => sum + c.duration, 0) / contractions.length)
        : 0;
    const avgInterval = contractions.filter(c => c.interval > 0).length > 0
        ? Math.round(contractions.filter(c => c.interval > 0).reduce((sum, c) => sum + c.interval, 0) / contractions.filter(c => c.interval > 0).length)
        : 0;

    const isAlert = avgInterval > 0 && avgInterval <= 5 && avgDuration >= 60;

    return (
        <div className="bg-[#1f2933] rounded-2xl p-6 border border-white/10">
            <div className="mb-6 pb-4 border-b border-white/5">
                <h3 className="text-lg font-black italic uppercase text-red-400 tracking-tighter">Časovač Kontrakcí</h3>
                <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Měření intervalů výsadku</p>
            </div>

            {/* Timer Display */}
            <div className="bg-black/30 rounded-xl p-8 mb-4 text-center">
                <div className="text-6xl font-mono font-black text-white mb-2">
                    {formatTime(elapsed)}
                </div>
                <p className="text-xs uppercase tracking-widest opacity-50">
                    {isTiming ? 'Měření probíhá...' : 'Připraven'}
                </p>
            </div>

            {/* Controls */}
            <div className="flex gap-3 mb-6">
                <button
                    onClick={handleToggle}
                    className={`flex-1 py-4 rounded-xl font-black uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${isTiming
                        ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-500/20'
                        : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20'
                        }`}
                >
                    {isTiming ? (
                        <>
                            <StopSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            Stop
                        </>
                    ) : (
                        <>
                            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            Start
                        </>
                    )}
                </button>
                <button
                    onClick={handleReset}
                    className="px-6 py-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all active:scale-95 group"
                >
                    <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                </button>
            </div>

            {/* Analysis */}
            {contractions.length > 0 && (
                <>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-black/30 rounded-xl p-4 text-center">
                            <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Průměrná Délka</p>
                            <p className="text-2xl font-black text-[#f6c453]">{avgDuration}s</p>
                        </div>
                        <div className="bg-black/30 rounded-xl p-4 text-center">
                            <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Průměrný Interval</p>
                            <p className="text-2xl font-black text-[#f6c453]">{avgInterval > 0 ? `${avgInterval}m` : '-'}</p>
                        </div>
                    </div>

                    {/* Alert */}
                    {isAlert && (
                        <div className="bg-rose-500/20 border border-rose-500/50 rounded-xl p-4 mb-4 flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-black uppercase text-sm text-rose-400 mb-1">VAROVÁNÍ!</p>
                                <p className="text-xs text-white/80">
                                    Kontrakce jsou pravidelné (≤5 min) a dlouhé (≥60s). Kontaktuj porodnici!
                                </p>
                            </div>
                        </div>
                    )}

                    {/* History */}
                    <div className="space-y-2">
                        <p className="text-xs uppercase tracking-widest opacity-50 mb-2">Historie (5 posledních)</p>
                        {contractions.map((c, idx) => (
                            <div key={idx} className="bg-black/30 rounded-lg p-3 flex justify-between items-center text-sm">
                                <span className="font-mono">{new Date(c.start).toLocaleTimeString()}</span>
                                <div className="flex gap-4 text-xs opacity-70">
                                    <span>Délka: {c.duration}s</span>
                                    {c.interval > 0 && <span>Interval: {c.interval}m</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
