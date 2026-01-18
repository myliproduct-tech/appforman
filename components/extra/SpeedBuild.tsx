import React, { useState, useEffect, useRef } from 'react';
import { X, Zap, Timer, Trophy, ChevronRight, CheckCircle2, AlertTriangle, ShieldCheck, Car, Baby, ShoppingBag, LucideIcon } from 'lucide-react';

interface SpeedBuildTask {
    id: string;
    title: string;
    description: string;
    parTime: number; // in seconds
    Icon: LucideIcon;
}

const TASKS: SpeedBuildTask[] = [
    {
        id: 'car-seat',
        title: 'Instalace Autosedačky',
        description: 'Bleskové zajištění sektoru Junior v transportním vozidle.',
        parTime: 15,
        Icon: Car
    },
    {
        id: 'diaper-change',
        title: 'Bleskové Přebalování',
        description: 'Sanitární očista v polních podmínkách pod časovým tlakem.',
        parTime: 60,
        Icon: Baby
    },
    {
        id: 'stroller-fold',
        title: 'Skládání Kočárku',
        description: 'Rychlá dekonstrukce transportního modulu do zavazadlového prostoru.',
        parTime: 12,
        Icon: ShoppingBag
    }
];

export const SpeedBuild: React.FC<{
    onClose: () => void,
    onSyncScores?: (scores: Record<string, number>) => void
}> = ({ onClose, onSyncScores }) => {
    const [gameState, setGameState] = useState<'intro' | 'active' | 'success'>('intro');
    const [activeTask, setActiveTask] = useState<SpeedBuildTask | null>(null);
    const [timer, setTimer] = useState(0);
    const [bestScores, setBestScores] = useState<Record<string, number>>({});

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem('speedBuildBestScores');
        if (saved) setBestScores(JSON.parse(saved));
    }, []);

    const startTask = (task: SpeedBuildTask) => {
        setActiveTask(task);
        setTimer(0);
        setGameState('active');

        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTimer(prev => prev + 1);
        }, 100); // Tenths of a second
    };

    const finishTask = () => {
        if (!activeTask) return;

        if (timerRef.current) clearInterval(timerRef.current);
        setGameState('success');

        const finalTime = timer / 10;
        if (!bestScores[activeTask.id] || finalTime < bestScores[activeTask.id]) {
            const newScores = { ...bestScores, [activeTask.id]: finalTime };
            setBestScores(newScores);
            localStorage.setItem('speedBuildBestScores', JSON.stringify(newScores));
            if (onSyncScores) onSyncScores(newScores);
        }
    };

    if (gameState === 'intro') {
        return (
            <div className="fixed inset-0 z-[80] bg-[#1f2933] overflow-y-auto p-4 animate-fade-in">
                <div className="max-w-2xl mx-auto min-h-full flex flex-col">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-[#f6c453]/10 rounded-xl">
                                <Zap className="w-6 h-6 text-[#f6c453]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black italic uppercase accent-text tracking-tighter">
                                    Rychlé Nasazení
                                </h2>
                                <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">
                                    Speed Training • Strategie
                                </p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-3 rounded-xl bg-white/5 border border-white/10">
                            <X className="w-6 h-6 text-[#f6c453]" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {TASKS.map(task => (
                            <button
                                key={task.id}
                                onClick={() => startTask(task)}
                                className="w-full glass-card p-6 rounded-3xl border border-white/5 hover:border-[#f6c453]/30 transition-all text-left flex items-center gap-6 group"
                            >
                                <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-[#f6c453]/10 transition-all">
                                    <task.Icon className="w-8 h-8 text-[#f6c453] group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="text-lg font-black uppercase tracking-tight">{task.title}</h3>
                                        {bestScores[task.id] && (
                                            <div className="text-xs font-black text-[#f6c453]">
                                                🏆 {bestScores[task.id].toFixed(1)}s
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-white/50">{task.description}</p>
                                    <div className="flex items-center gap-2 mt-3 text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-white/30">CÍLOVÝ ČAS: {task.parTime}S</span>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 opacity-20 group-hover:opacity-100 transition-all text-[#f6c453]" />
                            </button>
                        ))}
                    </div>

                    <div className="mt-auto pt-8">
                        <div className="bg-[#f6c453]/5 border border-[#f6c453]/20 rounded-2xl p-4 text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#f6c453]/70">
                                💡 Trénink dělá mistra. Buď připraven na cokoliv.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (gameState === 'active' && activeTask) {
        return (
            <div className="fixed inset-0 z-[80] bg-[#1f2933] flex flex-col p-4 animate-fade-in">
                <div className="max-w-xl mx-auto w-full flex-1 flex flex-col justify-center py-8">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-4 text-6xl font-black italic tracking-tighter mb-4">
                            <Timer className="w-12 h-12 text-[#f6c453] animate-pulse" />
                            <span className="text-[#f6c453]">{(timer / 10).toFixed(1)}</span>
                            <span className="text-white/20 text-3xl">s</span>
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-widest opacity-80 mb-2">{activeTask.title}</h2>
                        <p className="text-white/40 uppercase tracking-widest text-[10px]">Operační čas běží...</p>
                    </div>

                    <div className="relative group perspective-1000 mb-12">
                        <div className="glass-card p-10 rounded-[3rem] border border-[#f6c453]/20 flex flex-col items-center text-center">
                            <div className="p-8 bg-[#f6c453]/10 rounded-full mb-6">
                                <activeTask.Icon className="w-16 h-16 text-[#f6c453]" />
                            </div>
                            <p className="text-white/60 text-lg leading-relaxed max-w-xs italic">
                                "{activeTask.description}"
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={finishTask}
                        className="w-full bg-[#f6c453] text-black py-8 rounded-[2.5rem] font-black uppercase text-2xl shadow-2xl shadow-[#f6c453]/20 active:scale-95 transition-all"
                    >
                        MISE SPLNĚNA
                    </button>

                    <button
                        onClick={() => {
                            if (timerRef.current) clearInterval(timerRef.current);
                            setGameState('intro');
                        }}
                        className="mt-8 text-white/30 text-xs font-black uppercase tracking-widest hover:text-white transition-colors"
                    >
                        PŘERUŠIT OPERACI (ABORT)
                    </button>
                </div>
            </div>
        );
    }

    if (gameState === 'success' && activeTask) {
        const finalTime = timer / 10;
        const isNewBest = finalTime === bestScores[activeTask.id];
        const isUnderPar = finalTime <= activeTask.parTime;

        return (
            <div className="fixed inset-0 z-[80] bg-[#1f2933] flex flex-col justify-center p-6 animate-fade-in">
                <div className="max-w-md mx-auto w-full glass-card p-10 rounded-[3rem] border border-[#f6c453]/30 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#f6c453]/10 to-transparent pointer-events-none"></div>

                    <div className="relative">
                        <div className="w-24 h-24 bg-[#f6c453] rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-[#f6c453]/40">
                            <Trophy className="w-12 h-12 text-black" />
                        </div>

                        <h2 className="text-3xl font-black italic uppercase accent-text mb-2">Výsledek</h2>
                        <p className="text-white/50 uppercase tracking-widest text-[10px] mb-8">{activeTask.title}</p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                                <div className="text-xs text-white/30 uppercase font-black mb-1">Dosažený Čas</div>
                                <div className="text-3xl font-black text-[#f6c453]">{finalTime.toFixed(1)}s</div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                                <div className="text-xs text-white/30 uppercase font-black mb-1">Standard (PAR)</div>
                                <div className="text-3xl font-black text-white/80">{activeTask.parTime}s</div>
                            </div>
                        </div>

                        <div className="space-y-3 mb-8">
                            {isNewBest && (
                                <div className="flex items-center gap-3 bg-emerald-500/10 text-emerald-400 p-3 rounded-xl border border-emerald-500/20 text-sm font-black uppercase">
                                    <Zap className="w-5 h-5" /> NOVÝ OSOBNÍ REKORD!
                                </div>
                            )}
                            {isUnderPar ? (
                                <div className="flex items-center gap-3 bg-blue-500/10 text-blue-400 p-3 rounded-xl border border-blue-500/20 text-sm font-black uppercase">
                                    < ShieldCheck className="w-5 h-5" /> ČAS V LIMITU
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 bg-amber-500/10 text-amber-500 p-3 rounded-xl border border-amber-500/20 text-sm font-black uppercase">
                                    <AlertTriangle className="w-5 h-5" /> NAD LIMITEM STANDARDU
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setGameState('intro')}
                            className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white/90 transition-all mb-4"
                        >
                            DALŠÍ TRÉNINK
                        </button>

                        <button
                            onClick={onClose}
                            className="text-[#f6c453] font-black uppercase tracking-widest text-xs opacity-50 hover:opacity-100 transition-opacity"
                        >
                            KONEC VÝCVIKU
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};
