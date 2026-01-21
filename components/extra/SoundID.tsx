import React, { useState, useEffect } from 'react';
import { X, Play, Volume2, CheckCircle, XCircle, Trophy, TrendingUp } from 'lucide-react';

// Helper to get correct asset path
const getAssetPath = (filename: string): string => {
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    if (pathname.includes('/appforman/')) {
        return `${origin}/appforman/${filename}`;
    }
    return `${origin}/${filename}`;
};

type CryType = 'NEH' | 'OWH' | 'EHA' | 'EAIRH' | 'HEH';

interface CryPattern {
    id: CryType;
    name: string;
    description: string;
    soundDescription: string;
    explanation: string;
    color: string;
    frequency: number[]; // Simulated frequency pattern for visualization
    soundFile: string; // Path to actual audio file
}

interface GameStats {
    totalAttempts: number;
    correctAnswers: number;
    streak: number;
    bestStreak: number;
}

const CRY_PATTERNS: CryPattern[] = [
    {
        id: 'NEH',
        name: 'Hlad',
        description: 'Zvuk vzniká sacím reflexem',
        soundDescription: 'Jazyk je na patře, slyšíš "N" na začátku',
        explanation: 'Slyšíš to \'N\' na začátku? To je sací reflex. Miminko má hlad a připravuje se na sání.',
        color: 'from-[#f6c453] to-slate-400',
        frequency: [40, 60, 80, 95, 85, 70, 50, 65, 80, 90, 75, 60, 45, 55, 70, 85, 95, 80, 60, 40],
        soundFile: getAssetPath('sounds/Hlad.mp3')
    },
    {
        id: 'OWH',
        name: 'Únava',
        description: 'Podobné zívání',
        soundDescription: 'Protáhlý zvuk, miminko je ospalé',
        explanation: 'Protáhlý zvuk připomínající zívání. Miminko je unavené a potřebuje spánek.',
        color: 'from-[#f6c453] to-slate-400',
        frequency: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25],
        soundFile: getAssetPath('sounds/unava.mp3')
    },
    {
        id: 'EHA',
        name: 'Odříhnutí',
        description: 'Potřeba uvolnit vzduch',
        soundDescription: 'Krátké, trhané zvuky z hrudníku',
        explanation: 'Krátké, trhané zvuky znamenají napětí v hrudníku. Miminko potřebuje odříhnout.',
        color: 'from-[#f6c453] to-slate-400',
        frequency: [50, 30, 70, 40, 80, 35, 75, 45, 85, 40, 70, 50, 60, 45, 75, 55, 65, 50, 55, 45],
        soundFile: getAssetPath('sounds/eha.mp3')
    },
    {
        id: 'EAIRH',
        name: 'Plyny',
        description: 'Napětí v břiše',
        soundDescription: 'Sténání s napětím v dolní části',
        explanation: 'Miminko má plyny a potřebuje pomoct s jejich uvolněním. Může pomoci masáž bříška nebo "kolo".',
        color: 'from-[#f6c453] to-slate-400',
        frequency: [45, 50, 55, 60, 70, 75, 80, 85, 80, 75, 70, 65, 60, 55, 50, 55, 60, 65, 60, 50],
        soundFile: getAssetPath('sounds/prdy.mp3')
    },
    {
        id: 'HEH',
        name: 'Nepohodlí',
        description: 'Mokrá plena nebo zima',
        soundDescription: 'Syčivý zvuk na začátku',
        explanation: 'Syčivý zvuk "H" na začátku naznačuje nepohodlí - mokrá plena, zima nebo něco tlačí.',
        color: 'from-[#f6c453] to-slate-400',
        frequency: [45, 55, 50, 60, 55, 65, 60, 70, 65, 75, 70, 65, 60, 55, 50, 55, 60, 55, 50, 45],
        soundFile: getAssetPath('sounds/nepohodli.mp3')
    }
];

export const SoundID: React.FC<{
    onClose: () => void,
    onSyncStats?: (stats: GameStats) => void
}> = ({ onClose, onSyncStats }) => {
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'result'>('intro');
    const [currentPattern, setCurrentPattern] = useState<CryPattern | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<CryType | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playProgress, setPlayProgress] = useState(0);
    const [stats, setStats] = useState<GameStats>({
        totalAttempts: 0,
        correctAnswers: 0,
        streak: 0,
        bestStreak: 0
    });
    const [showExplanation, setShowExplanation] = useState(false);
    const audioRef = React.useRef<HTMLAudioElement | null>(null);

    // Load stats
    useEffect(() => {
        const saved = localStorage.getItem('soundIDStats');
        if (saved) {
            setStats(JSON.parse(saved));
        }
    }, []);

    // Handle audio playback with real audio files
    useEffect(() => {
        if (currentPattern && !audioRef.current) {
            audioRef.current = new Audio(currentPattern.soundFile);

            audioRef.current.addEventListener('ended', () => {
                setIsPlaying(false);
                setPlayProgress(0);
            });

            audioRef.current.addEventListener('timeupdate', () => {
                if (audioRef.current) {
                    const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
                    setPlayProgress(progress);
                }
            });
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [currentPattern]);

    const startNewRound = () => {
        // Ensure we don't get the same pattern twice in a row
        let randomPattern: CryPattern;
        do {
            randomPattern = CRY_PATTERNS[Math.floor(Math.random() * CRY_PATTERNS.length)];
        } while (currentPattern && randomPattern.id === currentPattern.id && CRY_PATTERNS.length > 1);

        setCurrentPattern(randomPattern);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setGameState('playing');
        setPlayProgress(0);

        // Clean up previous audio
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }

        // Auto-play sound after a short delay
        setTimeout(() => {
            playSound();
        }, 500);
    };

    const handleAnswer = (answer: CryType) => {
        if (!currentPattern || selectedAnswer) return;

        setSelectedAnswer(answer);
        const isCorrect = answer === currentPattern.id;

        // Update stats
        const newStats = {
            totalAttempts: stats.totalAttempts + 1,
            correctAnswers: stats.correctAnswers + (isCorrect ? 1 : 0),
            streak: isCorrect ? stats.streak + 1 : 0,
            bestStreak: isCorrect ? Math.max(stats.bestStreak, stats.streak + 1) : stats.bestStreak
        };

        setStats(newStats);
        localStorage.setItem('soundIDStats', JSON.stringify(newStats));
        if (onSyncStats) onSyncStats(newStats);

        // Show explanation after a delay
        setTimeout(() => {
            setShowExplanation(true);
        }, 1000);
    };

    const playSound = () => {
        if (!currentPattern || !audioRef.current) {
            // Create new audio if it doesn't exist
            if (currentPattern) {
                audioRef.current = new Audio(currentPattern.soundFile);

                audioRef.current.addEventListener('ended', () => {
                    setIsPlaying(false);
                    setPlayProgress(0);
                });

                audioRef.current.addEventListener('timeupdate', () => {
                    if (audioRef.current) {
                        const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
                        setPlayProgress(progress);
                    }
                });
            }
        }

        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(err => {
                console.error('Error playing audio:', err);
                alert('Nepodařilo se přehrát zvuk. Zkontroluj, zda jsou zvukové soubory správně nahrané.');
            });
            setIsPlaying(true);
            setPlayProgress(0);
        }
    };

    // Intro screen
    if (gameState === 'intro') {
        return (
            <div className="fixed inset-0 z-[80] bg-[#1f2933] overflow-y-auto animate-fade-in p-4">
                <div className="max-w-2xl mx-auto min-h-full flex flex-col justify-center">
                    {/* Enhanced Header - Simplified to Yellow/Slate */}
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#f6c453]/10 via-slate-500/5 to-slate-500/10 border border-[#f6c453]/20 p-6 shadow-lg shadow-[#f6c453]/5 mb-8">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2Y2YzQ1MyIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

                        <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-[#f6c453]/10 rounded-xl backdrop-blur-sm">
                                    <Volume2 className="w-6 h-6 text-[#f6c453]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black italic uppercase accent-text tracking-tight inline-block pr-3">
                                        Akustický Radar
                                    </h2>
                                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                                        Sound Analysis
                                    </p>
                                </div>
                            </div>

                            <button onClick={onClose} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10">
                                <X className="w-6 h-6 text-[#f6c453]" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-white/5 border-2 border-[#f6c453]/30 rounded-3xl p-8 text-center">
                        <div className="text-6xl mb-6">👂🔊</div>
                        <p className="text-lg text-white/80 mb-8">
                            Nauč se rozpoznávat různé typy pláče podle Dunstan Baby Language
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                            {CRY_PATTERNS.map(pattern => (
                                <div key={pattern.id} className="bg-white/5 border border-white/10 rounded-xl p-3">
                                    <div className="text-xl font-black text-[#f6c453] mb-1">{pattern.id}</div>
                                    <div className="text-sm font-bold text-white/90">{pattern.name}</div>
                                    <div className="text-xs text-white/60 mt-1">{pattern.soundDescription}</div>
                                </div>
                            ))}
                        </div>

                        {stats.totalAttempts > 0 && (
                            <div className="bg-white/5 rounded-xl p-4 mb-6">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-black text-[#f6c453]">{stats.correctAnswers}/{stats.totalAttempts}</div>
                                        <div className="text-xs text-white/60">Úspěšnost</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black text-[#f6c453]">{stats.streak}</div>
                                        <div className="text-xs text-white/60">Série</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black text-[#f6c453]">{stats.bestStreak}</div>
                                        <div className="text-xs text-white/60">Rekord</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={startNewRound}
                            className="w-full bg-[#f6c453] text-black py-4 rounded-xl font-black uppercase text-lg hover:bg-[#ffcf60] transition-all shadow-lg"
                        >
                            Začít Trénink
                        </button>
                    </div>
                </div>
            </div >
        );
    }

    // Playing screen
    if (!currentPattern) return null;

    const isCorrect = selectedAnswer === currentPattern.id;
    const accuracy = stats.totalAttempts > 0 ? Math.round((stats.correctAnswers / stats.totalAttempts) * 100) : 0;

    return (
        <div className="fixed inset-0 z-[80] bg-[#1f2933] overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="p-4 border-b border-white/10">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-black uppercase text-white tracking-tight">
                            Akustický Radar
                        </h2>
                        <p className="text-[10px] text-white/40 uppercase tracking-wider">
                            Sound Analysis
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-xs text-white/60">Série</div>
                            <div className="text-lg font-black text-[#f6c453]">{stats.streak}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-white/60">Úspěšnost</div>
                            <div className="text-lg font-black text-[#f6c453]">{accuracy}%</div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col p-2 max-w-4xl mx-auto overflow-y-auto">
                {/* Frequency Visualization - Minimal */}
                <div className="w-full mb-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-end justify-center gap-0.5 h-12 mb-2">
                        {currentPattern.frequency.map((height, i) => {
                            const isActive = isPlaying && (playProgress / 5) >= i;
                            return (
                                <div
                                    key={i}
                                    className={`flex-1 rounded-t transition-all duration-100 ${isActive
                                        ? 'bg-[#f6c453]'
                                        : 'bg-white/20'
                                        }`}
                                    style={{
                                        height: `${height}%`,
                                        opacity: isActive ? 1 : 0.3
                                    }}
                                />
                            );
                        })}
                    </div>

                    {/* Play button - Compact */}
                    <div className="text-center">
                        <button
                            onClick={playSound}
                            disabled={isPlaying || selectedAnswer !== null}
                            className={`px-4 py-2 rounded-lg font-bold uppercase text-xs transition-all flex items-center gap-2 mx-auto ${isPlaying || selectedAnswer !== null
                                ? 'bg-white/10 text-white/50 cursor-not-allowed'
                                : 'bg-[#f6c453] text-[#1f2933]'
                                }`}
                        >
                            <Volume2 className="w-4 h-4" />
                            {isPlaying ? 'Přehrávání...' : 'Přehrát'}
                        </button>
                        {isPlaying && (
                            <div className="mt-2">
                                <div className="w-full bg-white/10 rounded-full h-1">
                                    <div
                                        className="h-1 rounded-full bg-[#f6c453] transition-all"
                                        style={{ width: `${playProgress}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Answer options - Ultra Compact */}
                <div className="w-full mb-2">
                    <h3 className="text-sm font-black text-white mb-2 text-center">
                        Co miminko potřebuje?
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                        {CRY_PATTERNS.map(pattern => {
                            const isSelected = selectedAnswer === pattern.id;
                            const isCorrectAnswer = pattern.id === currentPattern.id;
                            const showResult = selectedAnswer !== null;

                            return (
                                <button
                                    key={pattern.id}
                                    onClick={() => handleAnswer(pattern.id)}
                                    disabled={selectedAnswer !== null}
                                    className={`p-3 rounded-xl border-2 transition-all ${showResult
                                        ? isCorrectAnswer
                                            ? 'border-emerald-500 bg-emerald-500/20'
                                            : isSelected
                                                ? 'border-red-500 bg-red-500/20'
                                                : 'border-white/10 bg-white/5 opacity-50'
                                        : 'border-white/20 bg-white/5 hover:border-[#f6c453]/50 hover:bg-[#f6c453]/10'
                                        } ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    <div className="flex items-start justify-between mb-1">
                                        <div className="text-lg font-black text-white">{pattern.id}</div>
                                        {showResult && isCorrectAnswer && (
                                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                                        )}
                                        {showResult && isSelected && !isCorrectAnswer && (
                                            <XCircle className="w-5 h-5 text-red-400" />
                                        )}
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-bold text-white mb-0.5">{pattern.name}</div>
                                        <div className="text-xs text-white/70">{pattern.description}</div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Explanation */}
                {showExplanation && (
                    <div className={`w-full p-6 rounded-2xl border-2 animate-fade-in ${isCorrect
                        ? 'bg-[#f6c453]/10 border-[#f6c453]/50'
                        : 'bg-red-500/10 border-red-500/50'
                        }`}>
                        <div className="flex items-start gap-4">
                            <div className="text-4xl">
                                {isCorrect ? '✅' : '❌'}
                            </div>
                            <div className="flex-1">
                                <h4 className={`text-xl font-black mb-2 ${isCorrect ? 'text-[#f6c453]' : 'text-red-400'}`}>
                                    {isCorrect ? 'Správně!' : 'Skoro to bylo!'}
                                </h4>
                                <p className="text-white/90 mb-4">
                                    {currentPattern.explanation}
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={startNewRound}
                                        className="flex-1 bg-[#f6c453] text-[#1f2933] py-3 rounded-xl font-black uppercase text-sm hover:bg-[#ffcf60] transition-all"
                                    >
                                        Další Vzorek
                                    </button>
                                    <button
                                        onClick={() => setGameState('intro')}
                                        className="flex-1 bg-white/10 border border-white/20 py-3 rounded-xl font-black uppercase text-sm hover:bg-white/20 transition-all text-white"
                                    >
                                        Menu
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
