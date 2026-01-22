import React, { useState, useEffect } from 'react';
import { Footprints, Play, Square as StopSquare, RotateCcw, Trophy } from 'lucide-react';

interface MovementTrackerProps {
    firstKickDetected?: boolean;
    onReportFirstKick?: () => void;
}

const STORAGE_KEY = 'movementTrackerData';

interface StoredData {
    history: { start: number; duration: number; kicks: number }[];
}

export const MovementTracker: React.FC<MovementTrackerProps> = ({
    firstKickDetected = false,
    onReportFirstKick
}) => {
    // Load history from localStorage
    const loadHistory = (): { start: number; duration: number; kicks: number }[] => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const data: StoredData = JSON.parse(saved);
                return data.history || [];
            }
        } catch (error) {
            console.error('Failed to load movement tracker data:', error);
        }
        return [];
    };

    const [isTracking, setIsTracking] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsed, setElapsed] = useState(0);
    const [moveCount, setMoveCount] = useState(0);
    const [history, setHistory] = useState<{ start: number; duration: number; kicks: number }[]>(loadHistory());

    // Timer Effect
    useEffect(() => {
        let interval: any;
        if (isTracking && startTime) {
            interval = setInterval(() => {
                setElapsed(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTracking, startTime]);

    // Save history to localStorage whenever it changes
    useEffect(() => {
        try {
            const data: StoredData = { history };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save movement tracker data:', error);
        }
    }, [history]);

    const handleToggle = () => {
        if (isTracking && startTime) {
            // Stop
            const duration = Math.floor((Date.now() - startTime) / 1000);
            if (duration > 0) {
                setHistory(prev => [{ start: startTime!, duration, kicks: moveCount }, ...prev].slice(0, 3));
            }
            setIsTracking(false);
            setStartTime(null);
            setElapsed(0);
            setMoveCount(0);
        } else {
            // Start
            setStartTime(Date.now());
            setIsTracking(true);
        }
    };

    const handleReset = () => {
        setHistory([]);
        setIsTracking(false);
        setStartTime(null);
        setElapsed(0);
        setMoveCount(0);
    };

    const handleKickIncrement = () => {
        setMoveCount(prev => prev + 1);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-[#1f2933] rounded-2xl p-6 border-2 border-white/20">
            <div className="mb-6 pb-4 border-b border-white/20">
                <h3 className="text-lg font-black italic uppercase text-[#f6c453] tracking-tighter">Monitoring Pohybů</h3>
                <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Sledování aktivity Juniora</p>
            </div>

            {/* First Kick Alert */}
            {!firstKickDetected && onReportFirstKick && (
                <div className="bg-[#f6c453]/20 border border-[#f6c453]/50 rounded-xl p-4 mb-4">
                    <p className="text-sm text-white/90 mb-3">
                        Cítíš první pohyb Juniora? Nahlásit to je důležitý milník!
                    </p>
                    <button
                        onClick={onReportFirstKick}
                        className="w-full bg-[#f6c453] text-[#1f2933] py-3 rounded-xl font-black uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:bg-[#ffcf60] transition-all active:scale-95"
                    >
                        <Trophy className="w-5 h-5" />
                        Nahlásit První Kopanec!
                    </button>
                </div>
            )}

            {/* Timer Display */}
            <div className="bg-black/30 rounded-xl p-6 mb-4">
                <div className="text-center mb-4">
                    <div className="text-5xl font-mono font-black text-white mb-2">
                        {formatTime(elapsed)}
                    </div>
                    <p className="text-xs uppercase tracking-widest opacity-50">
                        {isTracking ? 'Sledování probíhá...' : 'Připraven'}
                    </p>
                </div>

                {/* Kick Counter */}
                {isTracking && (
                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={handleKickIncrement}
                            className="bg-[#f6c453] text-[#1f2933] px-8 py-4 rounded-xl font-black uppercase tracking-wider text-sm hover:bg-[#ffcf60] transition-all active:scale-95"
                        >
                            + Pohyb
                        </button>
                        <div className="text-center">
                            <div className="text-3xl font-black text-[#f6c453] tracking-tighter">{moveCount}</div>
                            <p className="text-xs uppercase tracking-widest opacity-50">Počet</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="flex gap-3 mb-6">
                <button
                    onClick={handleToggle}
                    className={`flex-1 py-4 rounded-xl font-black uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${isTracking
                        ? 'bg-rose-500 text-white hover:bg-rose-600'
                        : 'bg-[#f6c453] text-[#1f2933] hover:bg-[#ffcf60]'
                        }`}
                >
                    {isTracking ? (
                        <>
                            <StopSquare className="w-5 h-5" />
                            Stop
                        </>
                    ) : (
                        <>
                            <Play className="w-5 h-5" />
                            Start
                        </>
                    )}
                </button>
                <button
                    onClick={handleReset}
                    className="px-6 py-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all active:scale-95"
                >
                    <RotateCcw className="w-5 h-5" />
                </button>
            </div>

            {/* Info */}
            <div className="bg-[#f6c453]/10 border border-[#f6c453]/20 rounded-xl p-4 mb-4">
                <p className="text-xs text-white/80 leading-relaxed">
                    <strong className="text-[#f6c453]">Tip:</strong> Zdravé miminko by mělo mít alespoň 10 pohybů za 2 hodiny.
                    Pokud je pohybů méně, kontaktuj lékaře.
                </p>
            </div>

            {/* History */}
            {history.length > 0 && (
                <div className="space-y-2">
                    <p className="text-xs uppercase tracking-widest opacity-50 mb-2">Historie (3 poslední)</p>
                    {history.map((session, idx) => (
                        <div key={idx} className="bg-black/30 rounded-lg p-3 flex justify-between items-center text-sm">
                            <span className="font-mono">{new Date(session.start).toLocaleTimeString()}</span>
                            <div className="flex gap-3 text-xs opacity-70">
                                <span>Délka: {Math.floor(session.duration / 60)}m {session.duration % 60}s</span>
                                <span className="text-[#f6c453] font-bold">🦶 {session.kicks}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
