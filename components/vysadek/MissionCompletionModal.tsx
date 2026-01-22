import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Trophy, Download, X, Star, Medal, Target, Flame, Baby, Calendar, Heart } from 'lucide-react';
import { DatePickerModal } from '../common/DatePickerModal';
import html2canvas from 'html2canvas';
import { UserStats } from '../../types';
import { getRankBasedOnPoints } from '../../utils';

// Import BabyName interface from BabyNameGenerator
interface BabyName {
    id: string;
    name: string;
    rating: number;
    gender: 'boy' | 'girl';
    selected?: boolean;
}

interface MissionCompletionModalProps {
    stats: UserStats;
    babyGender: 'boy' | 'girl';
    babyNames: BabyName[];
    onClose: () => void;
}

export const MissionCompletionModal: React.FC<MissionCompletionModalProps> = ({ stats, babyGender, babyNames, onClose }) => {
    // Find selected name for the chosen gender
    const selectedName = babyNames.find(n => n.gender === babyGender && n.selected);
    const [babyName, setBabyName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [birthTime, setBirthTime] = useState(new Date().toTimeString().slice(0, 5));
    const [isExporting, setIsExporting] = useState(false);
    const reportRef = useRef<HTMLDivElement>(null);

    // Auto-fill baby name if a name is selected
    React.useEffect(() => {
        if (selectedName && !babyName) {
            setBabyName(selectedName.name);
        }
    }, [selectedName, babyName]);

    const currentRank = getRankBasedOnPoints(stats.points);
    const completedMissions = stats.completedTasks.length;
    const achievementCount = stats.badges.length;

    const handleExport = async () => {
        if (!reportRef.current || !babyName) return;

        try {
            setIsExporting(true);
            const canvas = await html2canvas(reportRef.current, {
                scale: 2,
                backgroundColor: '#0f172a',
                logging: false,
                useCORS: true
            });

            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `black-box-${babyName.toLowerCase().replace(/\s+/g, '-')}-${birthDate}.png`;
            link.href = imgData;
            link.click();
            setIsExporting(false);
        } catch (error) {
            console.error('Export failed:', error);
            setIsExporting(false);
        }
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in p-4">
            {/* Confetti Animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full animate-confetti opacity-80"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `-${Math.random() * 20}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#1f2933] to-[#0f1419] rounded-3xl border-2 border-amber-500/30 shadow-2xl">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
                >
                    <X className="w-5 h-5 text-white" />
                </button>

                {/* Report Content */}
                <div ref={reportRef} className="p-8 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <div className="flex justify-center">
                            <div className="p-4 bg-amber-500/20 rounded-3xl border-2 border-amber-500/40 animate-pulse">
                                <Trophy className="w-16 h-16 text-amber-400" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-amber-400 italic">
                            Mise Dokončena
                        </h2>
                        <p className="text-sm text-white/60 font-bold uppercase tracking-widest">
                            Black Box Report • Operace Partner v Akci
                        </p>
                    </div>

                    {/* Baby Info Form */}
                    <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h3 className="text-xs font-black uppercase tracking-widest text-[#f6c453] mb-4">
                            Informace o jednotce
                        </h3>

                        <div className="space-y-3">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">
                                    Jméno Juniora
                                </label>
                                <input
                                    type="text"
                                    value={babyName}
                                    onChange={(e) => setBabyName(e.target.value)}
                                    placeholder="Zadej jméno..."
                                    className="w-full bg-[#0f1419] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-[#f6c453] mb-2">Datum narození</label>
                                    <button
                                        type="button"
                                        onClick={() => setShowDatePicker(true)}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#f6c453] transition-all flex items-center justify-between hover:bg-white/15 active:scale-95"
                                    >
                                        <span className={birthDate ? 'text-white' : 'text-white/40'}>
                                            {birthDate ? new Date(birthDate).toLocaleDateString('cs-CZ', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            }) : 'Vyberte datum'}
                                        </span>
                                        <Calendar className="w-5 h-5 text-[#f6c453]" />
                                    </button>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">
                                        Čas narození
                                    </label>
                                    <input
                                        type="time"
                                        value={birthTime}
                                        onChange={(e) => setBirthTime(e.target.value)}
                                        className="w-full bg-[#0f1419] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 p-6 rounded-2xl border border-amber-500/20">
                            <div className="flex items-center gap-3 mb-3">
                                <Star className="w-5 h-5 text-amber-400" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                                    Celkové XP
                                </p>
                            </div>
                            <p className="text-4xl font-black text-white">{stats.points}</p>
                        </div>

                        <div className="bg-gradient-to-br from-[#f6c453]/10 to-[#f6c453]/5 p-6 rounded-2xl border border-[#f6c453]/20">
                            <div className="flex items-center gap-3 mb-3">
                                <Target className="w-5 h-5 text-[#f6c453]" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#f6c453]">
                                    Mise splněny
                                </p>
                            </div>
                            <p className="text-4xl font-black text-white">{completedMissions}</p>
                        </div>

                        <div className="bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-2xl border border-white/20">
                            <div className="flex items-center gap-3 mb-3">
                                <Medal className="w-5 h-5 text-white/60" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/60">
                                    Achievementy
                                </p>
                            </div>
                            <p className="text-4xl font-black text-white">{achievementCount}</p>
                        </div>

                        <div className="bg-gradient-to-br from-rose-500/10 to-rose-600/5 p-6 rounded-2xl border border-rose-500/20">
                            <div className="flex items-center gap-3 mb-3">
                                <Flame className="w-5 h-5 text-rose-400" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-rose-400">
                                    Nejdelší série
                                </p>
                            </div>
                            <p className="text-4xl font-black text-white">{stats.streak}</p>
                        </div>
                    </div>

                    {/* Final Rank */}
                    <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 p-6 rounded-2xl border-2 border-amber-500/40">
                        <div className="text-center space-y-3">
                            <p className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                                Finální hodnost
                            </p>
                            <div className="text-5xl">{currentRank.icon}</div>
                            <p className="text-xl font-black uppercase tracking-tight text-amber-300">
                                {currentRank.name}
                            </p>
                        </div>
                    </div>

                    {/* Message */}
                    {babyName && (
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                            <p className="text-sm text-white/80 leading-relaxed italic">
                                Gratuluji, <span className="font-black text-[#f6c453]">{stats.userName || 'veliteli'}</span>!
                                Tvoje mise byla úspěšná. <span className="font-black text-[#f6c453]">{babyName}</span> je
                                v bezpečí a ty jsi dokázal, že jsi skutečný <span className="font-black text-[#f6c453]">TÁTA</span>.
                                Vítej v nejdůležitější roli tvého života. 🎖️
                            </p>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="p-6 border-t border-white/10 space-y-3">
                    <button
                        onClick={handleExport}
                        disabled={!babyName || isExporting}
                        className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-[#1f2933] font-black py-4 rounded-xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
                    >
                        <Download className="w-5 h-5" />
                        {isExporting ? 'Exportuji...' : 'Stáhnout Black Box Report'}
                    </button>

                    <p className="text-center text-[10px] text-white/30 italic">
                        Report bude uložen jako obrázek PNG
                    </p>
                </div>
            </div>

            {/* CSS for confetti animation */}
            <style>{`
                @keyframes confetti {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
                .animate-confetti {
                    animation: confetti linear infinite;
                }
            `}</style>

            {/* Date Picker Modal */}
            <DatePickerModal
                isOpen={showDatePicker}
                onClose={() => setShowDatePicker(false)}
                onSelect={(date) => {
                    setBirthDate(date);
                    setShowDatePicker(false);
                }}
                initialDate={birthDate}
                title="Datum narození"
            />
        </div>,
        document.body
    );
};
