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
    const [birthHour, setBirthHour] = useState(new Date().getHours().toString().padStart(2, '0'));
    const [birthMinute, setBirthMinute] = useState(new Date().getMinutes().toString().padStart(2, '0'));
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

            // Keep diacritics as requested by user
            const safeName = babyName.toLowerCase().trim().replace(/\s+/g, '-');
            const dateStr = birthDate || new Date().toISOString().split('T')[0];

            const canvas = await html2canvas(reportRef.current, {
                scale: 2,
                backgroundColor: '#1f2933',
                logging: false,
                useCORS: true,
                allowTaint: true,
                onclone: (clonedDoc) => {
                    // Hide ignored elements
                    const elementsToHide = clonedDoc.querySelectorAll('[data-html2canvas-ignore]');
                    elementsToHide.forEach(el => (el as HTMLElement).style.display = 'none');

                    // Fix for inputs: Replace with text containers in the clone for perfect rendering
                    const inputs = clonedDoc.querySelectorAll('input');
                    inputs.forEach(input => {
                        const val = (input as HTMLInputElement).value;
                        const parent = input.parentElement;
                        if (parent) {
                            const replacement = clonedDoc.createElement('div');
                            replacement.innerText = val || '---';
                            replacement.style.color = '#f6c453'; // Tactical yellow
                            replacement.style.fontSize = '14px';
                            replacement.style.fontWeight = '900';
                            replacement.style.textTransform = 'uppercase';
                            replacement.style.padding = '4px 0';
                            replacement.style.width = '100%';
                            parent.appendChild(replacement);
                            (input as HTMLElement).style.display = 'none';
                        }
                    });

                    // Fix for date button
                    const dateButtons = clonedDoc.querySelectorAll('button[type="button"]');
                    dateButtons.forEach(btn => {
                        const span = btn.querySelector('span');
                        const val = span ? span.innerText : '---';
                        const parent = btn.parentElement;
                        if (parent) {
                            const replacement = clonedDoc.createElement('div');
                            replacement.innerText = val;
                            replacement.style.color = '#f6c453';
                            replacement.style.fontSize = '14px';
                            replacement.style.fontWeight = '900';
                            replacement.style.padding = '4px 0';
                            parent.appendChild(replacement);
                            (btn as HTMLElement).style.display = 'none';
                        }
                    });
                }
            });

            canvas.toBlob((blob) => {
                if (!blob) throw new Error('Canvas to Blob failed');

                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = `black-box-${safeName}-${dateStr}.png`;
                link.href = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Cleanup
                setTimeout(() => URL.revokeObjectURL(url), 100);
                setIsExporting(false);
            }, 'image/png', 1.0);

        } catch (error) {
            console.error('Export failed:', error);
            alert('Export reportu se nezdařil. Zkuste to prosím znovu.');
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
                    data-html2canvas-ignore
                    className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
                >
                    <X className="w-5 h-5 text-white" />
                </button>

                <div ref={reportRef} className="p-4 space-y-3">
                    {/* Header */}
                    <div className="text-center space-y-1.5">
                        <div className="flex justify-center">
                            <div className="p-2 bg-amber-500/20 rounded-xl border-2 border-amber-500/40 animate-pulse">
                                <Trophy className="w-8 h-8 text-amber-400" />
                            </div>
                        </div>
                        <h2 className="text-xl font-black uppercase tracking-tighter text-amber-400 italic">
                            Mise Dokončena
                        </h2>
                    </div>

                    {/* Baby Info Form */}
                    <div className="space-y-4 bg-gradient-to-br from-[#f6c453]/10 via-amber-500/5 to-transparent p-5 rounded-[2rem] border-2 border-[#f6c453]/20 shadow-xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#f6c453]/5 rounded-full blur-3xl -z-10"></div>

                        <h3 className="text-[10px] font-black uppercase tracking-widest text-[#f6c453] mb-4 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#f6c453] animate-pulse"></div>
                            Identifikace nového přírůstku
                        </h3>

                        <div className="space-y-4">
                            <div className="relative group">
                                <label className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2 px-1 block flex items-center gap-2">
                                    <Baby className="w-3 h-3 text-[#f6c453]" /> Jméno Juniora
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={babyName}
                                        onChange={(e) => setBabyName(e.target.value)}
                                        placeholder="Zadej jméno..."
                                        className="w-full bg-[#0f1419]/80 border-2 border-white/5 rounded-2xl px-5 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-[#f6c453]/50 transition-all text-sm font-bold shadow-inner"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
                                        <Baby className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1 px-1 block flex items-center gap-2">
                                        <Calendar className="w-3 h-3 text-[#f6c453]" /> Den nula
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setShowDatePicker(true)}
                                        className="w-full px-4 py-3.5 bg-[#0f1419]/80 border-2 border-white/5 rounded-2xl text-white focus:outline-none focus:border-[#f6c453]/50 transition-all flex items-center justify-between hover:bg-white/5 active:scale-95 text-xs font-bold shadow-inner"
                                    >
                                        <span className={birthDate ? 'text-[#f6c453]' : 'text-white/20'}>
                                            {birthDate ? new Date(birthDate).toLocaleDateString('cs-CZ') : 'Zvolit datum'}
                                        </span>
                                        <Calendar className="w-4 h-4 text-[#f6c453]/40" />
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1 px-1 block flex items-center gap-2">
                                        <Target className="w-3 h-3 text-[#f6c453]" /> Čas výsadku
                                    </label>
                                    <div className="flex items-center gap-2 bg-[#0f1419]/80 border-2 border-white/5 rounded-2xl px-4 py-3.5 focus-within:border-[#f6c453]/50 transition-all shadow-inner">
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            value={birthHour}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '').slice(0, 2);
                                                if (parseInt(val) > 23) return;
                                                setBirthHour(val);
                                            }}
                                            className="w-6 bg-transparent text-[#f6c453] text-sm text-center outline-none font-black"
                                            placeholder="00"
                                        />
                                        <span className="text-white/20 text-sm font-bold">:</span>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            value={birthMinute}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '').slice(0, 2);
                                                if (parseInt(val) > 59) return;
                                                setBirthMinute(val);
                                            }}
                                            className="w-6 bg-transparent text-[#f6c453] text-sm text-center outline-none font-black"
                                            placeholder="00"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 p-3 rounded-xl border border-amber-500/20">
                            <div className="flex items-center gap-2 mb-1">
                                <Star className="w-3 h-3 text-amber-400" />
                                <p className="text-[8px] font-black uppercase tracking-widest text-amber-400">
                                    XP
                                </p>
                            </div>
                            <p className="text-xl font-black text-white">{stats.points}</p>
                        </div>

                        <div className="bg-gradient-to-br from-[#f6c453]/10 to-[#f6c453]/5 p-3 rounded-xl border border-[#f6c453]/20">
                            <div className="flex items-center gap-2 mb-1">
                                <Target className="w-3 h-3 text-[#f6c453]" />
                                <p className="text-[8px] font-black uppercase tracking-widest text-[#f6c453]">
                                    Mise
                                </p>
                            </div>
                            <p className="text-xl font-black text-white">{completedMissions}</p>
                        </div>

                        <div className="bg-gradient-to-br from-white/10 to-white/5 p-3 rounded-xl border border-white/20">
                            <div className="flex items-center gap-2 mb-1">
                                <Medal className="w-3 h-3 text-white/60" />
                                <p className="text-[8px] font-black uppercase tracking-widest text-white/60">
                                    Bachové
                                </p>
                            </div>
                            <p className="text-xl font-black text-white">{achievementCount}</p>
                        </div>

                        <div className="bg-gradient-to-br from-rose-500/10 to-rose-600/5 p-3 rounded-xl border border-rose-500/20">
                            <div className="flex items-center gap-2 mb-1">
                                <Flame className="w-3 h-3 text-rose-400" />
                                <p className="text-[8px] font-black uppercase tracking-widest text-rose-400">
                                    Série
                                </p>
                            </div>
                            <p className="text-xl font-black text-white">{stats.streak}</p>
                        </div>
                    </div>

                    {/* Final Rank */}
                    <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 p-4 rounded-xl border-2 border-amber-500/40">
                        <div className="flex items-center justify-center gap-4">
                            <div className="text-3xl">{currentRank.icon}</div>
                            <div className="text-left">
                                <p className="text-[8px] font-black uppercase tracking-widest text-amber-400">
                                    Finální hodnost
                                </p>
                                <p className="text-lg font-black uppercase tracking-tight text-amber-300">
                                    {currentRank.name}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    {babyName && (
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                            <p className="text-[11px] text-white/80 leading-relaxed italic">
                                Gratuluji, <span className="font-black text-[#f6c453]">{stats.userName || 'veliteli'}</span>!
                                Mise byla úspěšná. <span className="font-black text-[#f6c453]">{babyName}</span> je
                                v bezpečí. Vítej v nejdůležitější roli tvého života. 🎖️
                            </p>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="p-4 border-t border-white/10" data-html2canvas-ignore>
                    <button
                        onClick={handleExport}
                        disabled={!babyName || isExporting}
                        className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-[#1f2933] font-black py-3 rounded-lg shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-[10px]"
                    >
                        <Download className="w-4 h-4" />
                        {isExporting ? 'Exportuji...' : 'Stáhnout Report'}
                    </button>
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
