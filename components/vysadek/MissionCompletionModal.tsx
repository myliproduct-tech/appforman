import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Trophy, Download, X, Star, Medal, Target, Flame, Baby, Calendar } from 'lucide-react';
import { DatePickerModal } from '../common/DatePickerModal';
import html2canvas from 'html2canvas';
import { UserStats } from '../../types';
import { getRankBasedOnPoints } from '../../utils';

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
    const selectedName = babyNames.find(n => n.gender === babyGender && n.selected);
    const [babyName, setBabyName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [birthHour, setBirthHour] = useState(new Date().getHours().toString().padStart(2, '0'));
    const [birthMinute, setBirthMinute] = useState(new Date().getMinutes().toString().padStart(2, '0'));
    const [isExporting, setIsExporting] = useState(false);
    const reportRef = useRef<HTMLDivElement>(null);

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
            const safeName = babyName.toLowerCase().trim().replace(/\s+/g, '-');
            const dateStr = birthDate || new Date().toISOString().split('T')[0];

            const canvas = await html2canvas(reportRef.current, {
                scale: 2, // Increased for sharpness
                backgroundColor: '#0f1419',
                useCORS: true,
                allowTaint: false,
                logging: false,
                onclone: (clonedDoc) => {
                    // 1. SELECT TARGET
                    const reportArea = clonedDoc.getElementById('mission-report-area');
                    if (reportArea) {
                        const s = reportArea.style;
                        s.width = '420px'; // Slightly wider for better layout
                        s.margin = '0';
                        s.padding = '24px';
                        s.background = '#0f1419';
                        s.borderRadius = '0';
                    }

                    // 2. TIME DISPLAY FIX: Combine inputs into one text block
                    const timeBlock = clonedDoc.getElementById('time-display-block');
                    if (timeBlock) {
                        const hourInput = timeBlock.querySelector('input:first-child') as HTMLInputElement;
                        const minuteInput = timeBlock.querySelector('input:last-child') as HTMLInputElement;
                        const h = hourInput?.value || '00';
                        const m = minuteInput?.value || '00';

                        const replacement = clonedDoc.createElement('div');
                        replacement.innerText = `${h} : ${m}`;
                        replacement.style.color = '#f6c453';
                        replacement.style.fontSize = '18px'; // Perfectly matched with date
                        replacement.style.fontWeight = 'bold';
                        replacement.style.textAlign = 'center';
                        replacement.style.width = '100%';
                        replacement.style.fontFamily = 'monospace';

                        timeBlock.innerHTML = '';
                        timeBlock.appendChild(replacement);

                        // Remove border/background from parent container in export for cleaner look
                        const timeParent = timeBlock.parentElement;
                        if (timeParent) {
                            timeParent.style.background = 'transparent';
                            timeParent.style.border = 'none';
                        }
                    }

                    // 3. TOTAL SANITIZATION: Iterate EVERY element and strip everything that can cause capture errors
                    const allElements = clonedDoc.querySelectorAll('*');
                    allElements.forEach((el) => {
                        const s = (el as HTMLElement).style;
                        if (s) {
                            // Strip problematic backgrounds (Gradients are the main culprit for createPattern)
                            s.backgroundImage = 'none';
                            if (s.background && s.background.includes('gradient')) {
                                s.background = 'none';
                                s.backgroundColor = '#0a0c10';
                            }

                            // Strip all visual effects that trigger complex canvas patterns
                            s.boxShadow = 'none';
                            s.textShadow = 'none';
                            s.filter = 'none';
                            s.backdropFilter = 'none';
                            s.borderRadius = '0';
                            s.borderImage = 'none';
                            s.mask = 'none';
                            s.clipPath = 'none';

                            // Ensure visibility
                            if (s.opacity === '0') s.opacity = '1';
                        }
                    });

                    // 4. REMOVE SVGs completely (Security/Taint source)
                    const svgs = clonedDoc.querySelectorAll('svg');
                    svgs.forEach(svg => svg.remove());

                    // 5. Hide interactive UI
                    const elementsToHide = clonedDoc.querySelectorAll('[data-html2canvas-ignore]');
                    elementsToHide.forEach(el => (el as HTMLElement).style.display = 'none');

                    // 6. Convert other inputs (Unit Name) to plain text
                    const inputs = clonedDoc.querySelectorAll('input');
                    inputs.forEach(input => {
                        const val = (input as HTMLInputElement).value;
                        const parent = input.parentElement;
                        if (parent) {
                            const replacement = clonedDoc.createElement('div');
                            replacement.innerText = val || '---';
                            replacement.style.color = '#f6c453';
                            replacement.style.fontSize = '22px';
                            replacement.style.fontWeight = 'bold';
                            replacement.style.textAlign = 'center';
                            replacement.style.padding = '10px';
                            parent.appendChild(replacement);
                            (input as HTMLElement).style.display = 'none';
                        }
                    });

                    const dateButtons = clonedDoc.querySelectorAll('button[type="button"]');
                    dateButtons.forEach(btn => {
                        const htmlBtn = btn as HTMLElement;
                        const val = htmlBtn.innerText || '---';
                        const parent = htmlBtn.parentElement;
                        if (parent) {
                            const replacement = clonedDoc.createElement('div');
                            replacement.innerText = val;
                            replacement.style.color = '#f6c453';
                            replacement.style.fontSize = '18px';
                            replacement.style.fontWeight = 'bold';
                            replacement.style.textAlign = 'center';
                            parent.appendChild(replacement);
                            htmlBtn.style.display = 'none';
                        }
                    });

                    // 7. Stop all animations
                    const animated = clonedDoc.querySelectorAll('[class*="animate-"]');
                    animated.forEach(el => {
                        (el as HTMLElement).style.animation = 'none';
                        (el as HTMLElement).style.transition = 'none';
                    });
                }
            });

            // Reliable capture to image
            const dataUrl = canvas.toDataURL('image/png', 1.0);
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `report-terminal-v29-${safeName}-${dateStr}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setTimeout(() => setIsExporting(false), 500);

        } catch (error: any) {
            console.error('v2.9 export critical failure:', error);
            alert(`Ukládání selhalo (v2.9): ${error?.message || 'Chyba vnitřního vykreslování'}.\nVáš prohlížeč neumožňuje vytvořit obrázek z tohoto obsahu.`);
            setIsExporting(false);
        }
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in p-2 md:p-4">
            <div className="relative max-w-lg w-full max-h-[98vh] overflow-y-auto bg-[#0f1419] rounded-[2rem] border-2 border-amber-500/30 shadow-2xl no-scrollbar">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    data-html2canvas-ignore
                    className="absolute top-4 right-4 z-10 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10"
                >
                    <X className="w-5 h-5 text-white/50" />
                </button>

                <div ref={reportRef} id="mission-report-area" className="p-4 md:p-6 space-y-4 md:space-y-6 bg-[#0f1419] relative overflow-hidden">
                    {/* Header */}
                    <div className="text-center space-y-2 relative pb-4">
                        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
                        <div className="flex justify-center">
                            <Trophy className="w-10 h-10 text-amber-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-black uppercase tracking-[0.2em] text-amber-500 italic">
                            MISE_DOKONČENA
                        </h2>
                        <div className="text-[7px] font-bold text-white/20 uppercase tracking-[0.3em]">
                            OFICIÁLNÍ_ZÁZNAM_OPERACE
                        </div>
                    </div>

                    {/* Unit ID Terminal */}
                    <div className="relative p-4 md:p-6 bg-[#0a0c10] rounded-[1.2rem] border border-white/5 shadow-2xl group">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-500/40 rounded-tl-lg"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-500/40 rounded-tr-lg"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-500/40 rounded-bl-lg"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-500/40 rounded-br-lg"></div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-1.5">
                                    <Baby className="w-3 h-3 text-amber-500" /> IDENTIFIKACE_CÍLE
                                </label>
                                <input
                                    type="text"
                                    value={babyName}
                                    onChange={(e) => setBabyName(e.target.value)}
                                    placeholder="JMÉNO DÍTĚTE..."
                                    className="w-full bg-[#12161b] border border-white/5 rounded-xl px-4 py-3 text-lg font-black text-white focus:outline-none focus:border-amber-500/30 transition-all uppercase"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-1.5">
                                        <Calendar className="w-3 h-3" /> DATUM_VÝSADKU
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setShowDatePicker(true)}
                                        className="w-full px-3 py-3 bg-[#12161b] border border-white/5 rounded-xl text-left"
                                    >
                                        <span className={`text-[11px] font-black tracking-widest ${birthDate ? 'text-amber-500' : 'text-white/10'}`}>
                                            {birthDate ? new Date(birthDate).toLocaleDateString('cs-CZ') : 'NASTAVIT'}
                                        </span>
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-1.5">
                                        <Target className="w-3 h-3" /> ČAS_PŘÍCHODU
                                    </label>
                                    <div className="flex items-center justify-between bg-[#12161b] border border-white/5 rounded-xl px-3 py-2">
                                        <div id="time-display-block" className="flex items-center gap-1 font-mono">
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                value={birthHour}
                                                onChange={(e) => setBirthHour(e.target.value.replace(/\D/g, '').slice(0, 2))}
                                                className="w-7 bg-black/40 border-none p-1 text-amber-500 text-sm font-black text-center outline-none"
                                                placeholder="00"
                                            />
                                            <span className="text-amber-500 font-black text-xs animate-pulse">:</span>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                value={birthMinute}
                                                onChange={(e) => setBirthMinute(e.target.value.replace(/\D/g, '').slice(0, 2))}
                                                className="w-7 bg-black/40 border-none p-1 text-amber-500 text-sm font-black text-center outline-none"
                                                placeholder="00"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-2">
                        {[
                            { label: 'BODY', value: stats.points, icon: Star },
                            { label: 'OPERACE', value: completedMissions, icon: Target },
                            { label: 'ODZNAKY', value: achievementCount, icon: Medal },
                            { label: 'SÉRIE', value: stats.streak, icon: Flame }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/5 p-2 rounded-xl text-center">
                                <item.icon className="w-3 h-3 text-white/20 mx-auto mb-1.5" />
                                <p className="text-lg font-black text-white leading-none mb-1">{item.value}</p>
                                <p className="text-[6px] font-black uppercase text-white/20">{item.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Final Rank Plate */}
                    <div className="bg-gradient-to-r from-amber-500/10 via-[#f6c453]/10 to-amber-500/10 p-4 rounded-2xl border border-amber-500/20 relative overflow-hidden">
                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">{currentRank.icon}</span>
                                <div>
                                    <p className="text-[7px] font-black uppercase tracking-[0.2em] text-amber-500/50 mb-0.5">DOSAŽENÁ_HODNOST</p>
                                    <p className="text-sm font-black uppercase text-white italic">{currentRank.name}</p>
                                </div>
                            </div>
                            <div className="text-[8px] font-black text-amber-500 bg-amber-500/10 px-3 h-6 rounded-full border border-amber-500/20 flex items-center justify-center min-w-[70px] leading-none">POTVRZENO</div>
                        </div>
                    </div>

                    {/* Final Comm */}
                    {babyName && (
                        <div className="bg-black/20 p-4 rounded-2xl border border-white/5 relative">
                            <p className="text-[9px] text-white/60 leading-relaxed italic text-center px-2">
                                Gratuluji, <span className="font-black text-amber-500">{stats.userName || 'veliteli'}</span>!
                                Mise byla úspěšná. Jednotka <span className="font-black text-amber-500">{babyName}</span> byla
                                úspěšně vysazena. Vítej v nejdůležitější roli tvého života. 🎖️
                            </p>
                        </div>
                    )}
                </div>

                {/* Download Btn */}
                <div className="p-4 border-t border-white/5 bg-[#0a0c10]/50" data-html2canvas-ignore>
                    <button
                        onClick={handleExport}
                        disabled={!babyName || isExporting}
                        className="w-full bg-amber-500 text-[#0f1419] font-black py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50 uppercase tracking-widest text-[9px]"
                    >
                        <Download className="w-4 h-4" />
                        {isExporting ? 'GENEROVÁNÍ...' : 'STÁHNOUT REPORT'}
                    </button>
                </div>
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes confetti {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
                .animate-confetti { animation: confetti linear infinite; }
            `}</style>

            <DatePickerModal
                isOpen={showDatePicker}
                onClose={() => setShowDatePicker(false)}
                onSelect={(date) => {
                    setBirthDate(date);
                    setShowDatePicker(false);
                }}
                initialDate={birthDate}
                title="VÝBĚR DATA"
            />
        </div>,
        document.body
    );
};
