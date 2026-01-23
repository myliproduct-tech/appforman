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
                backgroundColor: '#0f1419',
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
                            replacement.style.color = '#f6c453';
                            replacement.style.fontSize = input.classList.contains('text-xl') ? '24px' : '18px';
                            replacement.style.fontWeight = '900';
                            replacement.style.textTransform = 'uppercase';
                            replacement.style.padding = '4px 0';
                            replacement.style.fontFamily = 'monospace';
                            parent.appendChild(replacement);
                            (input as HTMLElement).style.display = 'none';
                        }
                    });

                    // Fix for date button
                    const dateButtons = clonedDoc.querySelectorAll('button[type="button"]');
                    dateButtons.forEach(btn => {
                        const val = btn.innerText || '---';
                        const parent = btn.parentElement;
                        if (parent) {
                            const replacement = clonedDoc.createElement('div');
                            replacement.innerText = val;
                            replacement.style.color = '#f6c453';
                            replacement.style.fontSize = '16px';
                            replacement.style.fontWeight = '900';
                            replacement.style.padding = '4px 0';
                            parent.appendChild(replacement);
                            (btn as HTMLElement).style.display = 'none';
                        }
                    });

                    // Handle colons in digital clock
                    const pulses = clonedDoc.querySelectorAll('.animate-pulse');
                    pulses.forEach(p => {
                        (p as HTMLElement).classList.remove('animate-pulse');
                        (p as HTMLElement).style.opacity = '1';
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

            <div className="relative max-w-2xl w-full max-h-[95vh] overflow-y-auto bg-gradient-to-br from-[#1f2933] to-[#0f1419] rounded-[2.5rem] border-2 border-amber-500/30 shadow-2xl">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    data-html2canvas-ignore
                    className="absolute top-6 right-6 z-10 p-2.5 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10"
                >
                    <X className="w-5 h-5 text-white/50" />
                </button>

                <div ref={reportRef} className="p-6 space-y-6 bg-[#0f1419] relative overflow-hidden">
                    {/* Header with Tactical Underline */}
                    <div className="text-center space-y-3 relative pb-6">
                        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
                        <div className="flex justify-center">
                            <div className="p-4 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full border border-amber-500/30 relative">
                                <Trophy className="w-12 h-12 text-amber-500" />
                                <div className="absolute -inset-2 border border-amber-500/10 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        <h2 className="text-3xl font-black uppercase tracking-[0.25em] text-amber-500 italic">
                            Mission_Completed
                        </h2>
                        <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">
                            End_of_Phase_I / Official_Record
                        </div>
                    </div>

                    {/* Unit Identification Terminal - Military Grade */}
                    <div className="relative p-8 bg-[#0a0c10] rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden group">
                        {/* Bracket Corners */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-500/40 rounded-tl-xl transition-all group-hover:w-10 group-hover:h-10"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-500/40 rounded-tr-xl transition-all group-hover:w-10 group-hover:h-10"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-amber-500/40 rounded-bl-xl transition-all group-hover:w-10 group-hover:h-10"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-500/40 rounded-br-xl transition-all group-hover:w-10 group-hover:h-10"></div>

                        <div className="absolute top-6 right-8 flex items-center gap-2">
                            <div className="text-[8px] font-black text-amber-500/30 uppercase tracking-widest">Auth_Confirmed</div>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                        </div>

                        <div className="space-y-8">
                            {/* Callsign Block */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-1 h-4 bg-amber-500 rounded-full"></div>
                                    <label className="text-xs font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                                        <Baby className="w-3.5 h-3.5 text-amber-500" /> Callsign_Identification
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={babyName}
                                        onChange={(e) => setBabyName(e.target.value)}
                                        placeholder="ENTER_NAME..."
                                        className="w-full bg-[#12161b] border-2 border-white/5 rounded-2xl px-8 py-5 text-2xl font-black text-white placeholder:text-white/5 focus:outline-none focus:border-amber-500/30 transition-all tracking-tight shadow-inner uppercase"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {/* Date Block */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-1 h-3 bg-white/20 rounded-full"></div>
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                                            <Calendar className="w-3 h-3" /> Event_Date
                                        </label>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowDatePicker(true)}
                                        className="w-full px-6 py-4 bg-[#12161b] border-2 border-white/5 rounded-2xl text-left hover:bg-white/5 transition-all shadow-inner"
                                    >
                                        <span className={`text-base font-black tracking-[0.1em] ${birthDate ? 'text-amber-500' : 'text-white/10'}`}>
                                            {birthDate ? new Date(birthDate).toLocaleDateString('cs-CZ') : 'SET_DATE'}
                                        </span>
                                    </button>
                                </div>

                                {/* Arrival Clock Block */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-1 h-3 bg-white/20 rounded-full"></div>
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                                            <Target className="w-3 h-3" /> Timestamp
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between bg-[#12161b] border-2 border-white/5 rounded-2xl px-6 py-4 shadow-inner">
                                        <div className="flex items-center gap-2 font-mono">
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                value={birthHour}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
                                                    if (parseInt(val) > 23) return;
                                                    setBirthHour(val);
                                                }}
                                                className="w-10 bg-black/60 border border-white/10 rounded-lg py-2 text-amber-500 text-xl font-black text-center outline-none ring-0 focus:border-amber-500/50"
                                                placeholder="00"
                                            />
                                            <span className="text-amber-500 font-black text-xl animate-pulse">:</span>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                value={birthMinute}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
                                                    if (parseInt(val) > 59) return;
                                                    setBirthMinute(val);
                                                }}
                                                className="w-10 bg-black/60 border border-white/10 rounded-lg py-2 text-amber-500 text-xl font-black text-center outline-none ring-0 focus:border-amber-500/50"
                                                placeholder="00"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5 opacity-20">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid - Rugged Modules */}
                    <div className="grid grid-cols-4 gap-3">
                        {[
                            { label: 'EXPERIENCE', value: stats.points, icon: Star },
                            { label: 'OPERATIONS', value: completedMissions, icon: Target },
                            { label: 'MEDALS', value: achievementCount, icon: Medal },
                            { label: 'STREAK', value: stats.streak, icon: Flame }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-[#0a0c10] border border-white/5 p-4 rounded-2xl flex flex-col items-center text-center relative group overflow-hidden">
                                <div className="absolute top-0 right-0 w-8 h-8 bg-white/5 -rotate-45 translate-x-4 -translate-y-4"></div>
                                <item.icon className="w-4 h-4 text-white/20 mb-3" />
                                <p className="text-xl font-black text-white leading-none mb-1">{item.value}</p>
                                <p className="text-[7px] font-black uppercase tracking-[0.2em] text-white/20">{item.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Final Rank Plate */}
                    <div className="bg-gradient-to-r from-[#12161b] via-[#1a1f26] to-[#12161b] p-6 rounded-[2rem] border-2 border-amber-500/20 relative shadow-2xl">
                        <div className="absolute top-0 right-12 w-16 h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-5">
                                <div className="text-5xl drop-shadow-[0_0_15px_rgba(245,158,11,0.4)] transform hover:scale-110 transition-transform">
                                    {currentRank.icon}
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-amber-500/60">Final_Active_Rank</p>
                                    <p className="text-2xl font-black uppercase tracking-tight text-white italic">
                                        {currentRank.name}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                                    AUTHORIZED
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Final Comm Log */}
                    {babyName && (
                        <div className="bg-black/40 p-5 rounded-[2rem] border border-white/5 relative">
                            <div className="absolute flex gap-1 -top-3 left-8 bg-[#0f1419] px-3 py-1 rounded-full border border-white/10">
                                <div className="w-2 h-2 rounded-full bg-amber-500/50 animate-pulse"></div>
                                <div className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em]">Deployment_Final_Comm</div>
                            </div>
                            <p className="text-xs text-white/60 leading-relaxed italic text-center px-4 pt-2 font-medium">
                                Gratuluji, <span className="font-black text-amber-500">{stats.userName || 'veliteli'}</span>!
                                Mise byla úspěšná. Jednotka <span className="font-black text-amber-500">{babyName}</span> byla
                                úspěšně vysazena. Vítej v nejdůležitější roli tvého života. 🎖️
                            </p>
                        </div>
                    )}
                </div>

                {/* Tactical Download Trigger */}
                <div className="p-6 border-t border-white/5 bg-[#0a0c10]/50" data-html2canvas-ignore>
                    <button
                        onClick={handleExport}
                        disabled={!babyName || isExporting}
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-[#0f1419] font-black py-5 rounded-2xl shadow-[0_10px_30px_rgba(245,158,11,0.2)] flex items-center justify-center gap-3 active:scale-[0.98] transition-all disabled:opacity-50 uppercase tracking-[0.25em] text-xs hover:from-amber-400 hover:to-amber-500"
                    >
                        <Download className="w-5 h-5" />
                        {isExporting ? 'Processing_Record...' : 'Generate_Final_Report'}
                    </button>
                    <p className="text-[8px] text-center text-white/20 mt-4 uppercase tracking-[0.3em]">
                        Manual_Save_Recommended / Encryption_Active
                    </p>
                </div>
            </div>

            {/* Confetti Animation CSS */}
            <style>{`
                @keyframes confetti {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
                .animate-confetti { animation: confetti linear infinite; }
            `}</style>

            {/* Date Picker Modal Integration */}
            <DatePickerModal
                isOpen={showDatePicker}
                onClose={() => setShowDatePicker(false)}
                onSelect={(date) => {
                    setBirthDate(date);
                    setShowDatePicker(false);
                }}
                initialDate={birthDate}
                title="Field_Date_Selection"
            />
        </div>,
        document.body
    );
};
