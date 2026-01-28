import React, { useState } from 'react';
import { X, Lock, Users, PartyPopper, Copy, Check, Share2, Clock, Hand, Cigarette, Heart, Sparkles, ShieldAlert } from 'lucide-react';
import { localizeText } from '../../utils';

type VisitMode = 'bunker' | 'family' | 'open';

interface VisitInstructionsProps {
    onClose: () => void;
    partnerName: string; // Added prop
    initialMode?: VisitMode;
    onSaveMode?: (mode: VisitMode) => void;
}

const VISIT_MODES = [
    {
        id: 'bunker' as VisitMode,
        icon: Lock,
        name: 'Bunker Mode',
        subtitle: 'Žádné návštěvy',
        color: 'red',
        gradient: 'from-red-500/20 to-orange-500/20',
        border: 'border-red-500/30',
        description: 'Potřebujeme klid a čas na sžití s miminkem. Budeme vás kontaktovat, až budeme připraveni.'
    },
    {
        id: 'family' as VisitMode,
        icon: Users,
        name: 'Family Mode',
        subtitle: 'Pouze rodina',
        color: 'amber',
        gradient: 'from-amber-500/20 to-yellow-500/20',
        border: 'border-amber-500/30',
        description: 'Návštěvy pouze nejbližší rodiny a přátel, s dodržením pravidel.'
    },
    {
        id: 'open' as VisitMode,
        icon: PartyPopper,
        name: 'Open Mode',
        subtitle: 'Návštěvy vítány',
        color: 'emerald',
        gradient: 'from-emerald-500/20 to-green-500/20',
        border: 'border-emerald-500/30',
        description: 'Návštěvy vítány! Prosíme o dodržení základních pravidel.'
    }
];

const VISIT_RULES = [
    { icon: Hand, text: 'Umyjte si ruce před dotykem s miminkem', emoji: '✋' },
    { icon: Cigarette, text: 'Pokud jste nemocní, návštěvu odložte', emoji: '🤧' },
    { icon: Heart, text: 'Respektujte spánek miminka', emoji: '😴' },
    { icon: Cigarette, text: 'Bez kouření před návštěvou (min 30 min)', emoji: '🚭' },
    { icon: Heart, text: 'Bez líbání miminka (riziko infekcí)', emoji: '💋' },
    { icon: Sparkles, text: 'Bez silných parfémů a vůní', emoji: '🌸' },
    { icon: Clock, text: 'Návštěva max 30-60 minut', emoji: '⏰' },
    { icon: Share2, text: 'Domluvte se předem', emoji: '📞' }
];

export const VisitInstructions: React.FC<VisitInstructionsProps> = ({
    onClose,
    partnerName,
    initialMode = 'family',
    onSaveMode
}) => {
    const [selectedMode, setSelectedMode] = useState<VisitMode>(initialMode);
    const [copied, setCopied] = useState(false);

    const handleModeSelect = (mode: VisitMode) => {
        setSelectedMode(mode);
        onSaveMode?.(mode);
    };

    const generateMessage = () => {
        const mode = VISIT_MODES.find(m => m.id === selectedMode);
        if (!mode) return '';

        let message = `🏥 Návštěvy u nás 🏥\n\n`;
        message += `${localizeText(mode.description, partnerName)}\n\n`;

        if (selectedMode !== 'bunker') {
            message += `📋 Pravidla návštěv:\n`;
            VISIT_RULES.forEach(rule => {
                message += `${rule.emoji} ${localizeText(rule.text, partnerName)}\n`;
            });
            message += `\nDěkujeme za pochopení! ❤️`;
        } else {
            message += `Děkujeme za pochopení a respekt k našemu rozhodnutí. ❤️`;
        }

        return message;
    };

    const handleCopy = async () => {
        const message = generateMessage();
        try {
            await navigator.clipboard.writeText(message);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const currentMode = VISIT_MODES.find(m => m.id === selectedMode);

    return (
        <div className="fixed inset-0 z-[80] bg-[#1f2933] flex flex-col animate-fade-in overflow-hidden">
            <div className="max-w-2xl mx-auto w-full h-full flex flex-col bg-[#1f2933]">
                <div className="flex justify-between items-center bg-[#1f2933] px-4 py-8 z-30 border-b border-white/5 shadow-xl shrink-0">
                    <div className="flex items-center gap-3">
                        <div>
                            <h3 className="text-xl font-black italic uppercase text-[#f6c453] tracking-tighter">Pravidla Návštěv</h3>
                            <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Ochrana perimetru</p>
                        </div>
                    </div>

                    <button onClick={onClose} className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                        <X className="w-6 h-6 text-[#f6c453]" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24 custom-scrollbar">
                    {/* Mode Selection */}
                    <div className="space-y-4 mb-8">
                        <h3 className="text-sm font-black uppercase tracking-widest text-white/60 mb-4">
                            Vyberte režim návštěv
                        </h3>
                        <div className="grid gap-3">
                            {VISIT_MODES.map((mode) => {
                                const Icon = mode.icon;
                                const isSelected = selectedMode === mode.id;
                                return (
                                    <button
                                        key={mode.id}
                                        onClick={() => handleModeSelect(mode.id)}
                                        className={`w-full bg-gradient-to-br ${mode.gradient} border-2 ${mode.border} rounded-2xl p-4 text-left transition-all ${isSelected ? 'scale-[1.02] shadow-lg border-[#f6c453]/50' : 'opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`p-2.5 bg-${mode.color}-500/20 rounded-xl`}>
                                                <Icon className={`w-5 h-5 text-${mode.color}-400`} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-base font-black uppercase text-white tracking-tight mb-0.5">
                                                    {mode.name}
                                                </h4>
                                                <p className="text-[10px] text-white/60 uppercase tracking-wider mb-1">
                                                    {mode.subtitle}
                                                </p>
                                                <p className="text-xs text-white/70 leading-relaxed font-medium">
                                                    {localizeText(mode.description, partnerName)}
                                                </p>
                                            </div>
                                            {isSelected && (
                                                <div className={`p-1.5 bg-${mode.color}-500/30 rounded-lg`}>
                                                    <Check className={`w-4 h-4 text-${mode.color}-400`} />
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tactics */}
                    <div className="mt-8">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-4">Taktika obrany</h3>
                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#f6c453]/20 rounded-xl">
                                        <ShieldAlert className="w-4 h-4 text-[#f6c453]" />
                                    </div>
                                    <span className="text-xs font-bold leading-relaxed text-white/90">
                                        Několik týdnů po porodu
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#f6c453]/20 rounded-xl">
                                        <ShieldAlert className="w-4 h-4 text-[#f6c453]" />
                                    </div>
                                    <span className="text-xs font-bold leading-relaxed text-white/90">
                                        Jen zdraví lidé (bez rýmy!)
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#f6c453]/20 rounded-xl">
                                        <ShieldAlert className="w-4 h-4 text-[#f6c453]" />
                                    </div>
                                    <span className="text-xs font-bold leading-relaxed text-white/90">
                                        Nevolají, ale píší předem
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tactics Alternative */}
                    <div className="mt-8">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#f6c453] mb-4">Boje v poli (Jak to říct)</h4>
                        <div className="space-y-4">
                            <div className="p-5 rounded-2xl bg-[#f6c453]/5 border border-[#f6c453]/20">
                                <p className="text-xs italic text-white/70 leading-relaxed">
                                    {localizeText("\"Moc rádi vás uvidíme, ale teď potřebujeme čas se sžít. Ozveme se, až budeme připraveni na návštěvy.\"", partnerName)}
                                </p>
                            </div>
                            <div className="p-5 rounded-2xl bg-[#f6c453]/5 border border-[#f6c453]/20">
                                <p className="text-xs italic text-white/70 leading-relaxed">
                                    {localizeText("\"Díky za pochopení, že teď návštěvy omezujeme jen na nejbližší rodinu.\"", partnerName)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Rules Section (only show if not bunker mode) */}
                    {selectedMode !== 'bunker' && (
                        <div className="space-y-4 my-8">
                            <h3 className="text-sm font-black uppercase tracking-widest text-white/60 mb-4">
                                Základní pravidla
                            </h3>
                            <div className="grid gap-3">
                                {VISIT_RULES.map((rule, idx) => {
                                    const Icon = rule.icon;
                                    return (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl"
                                        >
                                            <span className="text-2xl">{rule.emoji}</span>
                                            <p className="text-sm text-white/80 flex-1">{localizeText(rule.text, partnerName)}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Message Preview */}
                    <div className="space-y-4 my-8">
                        <h3 className="text-sm font-black uppercase tracking-widest text-white/60 mb-4">
                            Náhled zprávy
                        </h3>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <pre className="text-sm text-white/80 whitespace-pre-wrap font-sans">
                                {generateMessage()}
                            </pre>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-8 mb-10">
                        <button
                            onClick={handleCopy}
                            className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${copied
                                ? 'bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/30'
                                : 'accent-bg text-[#1f2933] hover:scale-[1.02] shadow-lg shadow-[#f6c453]/10'
                                }`}
                        >
                            {copied ? (
                                <>
                                    <Check className="w-5 h-5" />
                                    Zkopírováno!
                                </>
                            ) : (
                                <>
                                    <Copy className="w-5 h-5" />
                                    Kopírovat zprávu
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
