import React, { useState } from 'react';
import { MessageSquare, XIcon, MessageSquareCode, ChevronRight, Info, ChevronDown } from 'lucide-react';
import { COMMUNICATION_MANUAL } from '../../constants';
import { CommunicationEntry } from '../../types';
import { localizeText } from '../../utils';

interface CommunicationManualProps {
    partnerName: string; // Added prop
    showModal?: boolean;
    onClose?: () => void;
    onEntryRead?: (entryIndex: number) => void; // Callback when entry is expanded
}

export const CommunicationManual: React.FC<CommunicationManualProps> = ({ partnerName, showModal: externalShowModal, onClose, onEntryRead }) => {
    const [internalShowModal, setInternalShowModal] = useState(false);
    const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

    const showCommManual = externalShowModal !== undefined ? externalShowModal : internalShowModal;
    const setShowCommManual = (value: boolean) => {
        if (externalShowModal !== undefined && onClose) {
            if (!value) onClose();
        } else {
            setInternalShowModal(value);
        }
    };

    const toggleEntry = (idx: number) => {
        const isExpanding = expandedIdx !== idx;
        setExpandedIdx(isExpanding ? idx : null);

        // Track that this entry was read when expanding
        if (isExpanding && onEntryRead) {
            onEntryRead(idx);
        }
    };

    return (
        <>
            {/* Communication Manual Modal */}
            {showCommManual && (
                <div className="fixed inset-0 z-[70] bg-[#1f2933] animate-fade-in flex flex-col">
                    <div className="w-full max-w-xl mx-auto flex-1 flex flex-col overflow-hidden">
                        <div className="flex justify-between items-center p-4 pt-6 border-b border-white/20 pb-4 shrink-0">
                            <div>
                                <h3 className="text-xl font-black italic uppercase text-[#f6c453] tracking-tighter">Komunikační Manuál</h3>
                                <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Dekódování potřeb partnerky</p>
                            </div>
                            <button onClick={() => { setShowCommManual(false); setExpandedIdx(null); }} className="p-3 bg-white/5 rounded-xl border-2 border-white/20 hover:bg-white/10 transition-colors">
                                <XIcon className="w-6 h-6 text-[#f6c453]" />
                            </button>
                        </div>

                        {/* Scrollable content area */}
                        <div className="flex-1 overflow-y-auto px-4">
                            {/* Simplified List Area */}
                            <div className="space-y-3 py-4">
                                {COMMUNICATION_MANUAL.map((entry, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => toggleEntry(idx)}
                                        className={`p-4 rounded-2xl border transition-all cursor-pointer group ${expandedIdx === idx
                                            ? 'bg-[#f6c453]/10 border-[#f6c453]/40 shadow-lg shadow-[#f6c453]/5'
                                            : 'bg-white/5 border-white/20 hover:border-white/20'}`}
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-xl transition-colors ${expandedIdx === idx ? 'bg-[#f6c453]/20' : 'bg-white/5'}`}>
                                                    <MessageSquareCode className={`w-4 h-4 ${expandedIdx === idx ? 'text-[#f6c453]' : 'text-white/40'}`} />
                                                </div>
                                                <span className={`text-xs font-bold leading-relaxed ${expandedIdx === idx ? 'text-[#f6c453]' : 'text-white/70 group-hover:text-white'}`}>
                                                    "{localizeText(entry.situation, partnerName)}"
                                                </span>
                                            </div>
                                            {expandedIdx === idx ? (
                                                <ChevronDown className="w-4 h-4 text-[#f6c453] shrink-0" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 opacity-20 shrink-0 group-hover:opacity-40 transition-opacity" />
                                            )}
                                        </div>

                                        {/* Expanded Content (Accordion) */}
                                        {expandedIdx === idx && (
                                            <div className="mt-4 pt-4 border-t border-[#f6c453]/10 animate-slide-up">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-2 h-2 rounded-full bg-[#f6c453] shadow-[0_0_8px_rgba(246,196,83,0.5)]"></div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#f6c453]">Skutečný význam</span>
                                                </div>
                                                <p className="text-sm leading-relaxed text-white/90 font-medium pl-4 border-l-2 border-[#f6c453]/20">
                                                    {localizeText(entry.meaning, partnerName)}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Universal Tactical Tip Footer - Sticky at bottom of scroll area */}
                            <div className="sticky bottom-0 left-0 right-0 pb-4 pt-6 bg-gradient-to-t from-[#1f2933] via-[#1f2933]/95 to-transparent">
                                <div className="p-5 bg-[#f6c453]/5 border border-[#f6c453]/20 rounded-[2rem] flex items-start gap-4 shadow-2xl backdrop-blur-xl">
                                    <div className="p-3 bg-[#f6c453]/20 rounded-2xl shrink-0">
                                        <Info className="w-5 h-5 text-[#f6c453]" />
                                    </div>
                                    <div>
                                        <h5 className="text-[10px] font-black uppercase tracking-widest text-[#f6c453] mb-1">Taktický tip pro tátu</h5>
                                        <p className="text-[11px] text-white/70 italic leading-relaxed font-semibold">
                                            {localizeText("Většina těchto vět nevyžaduje technické řešení. Vyžadují jen přítomnost, naslouchání a potvrzení, že to, co partnerka cítí, je naprosto v pořádku.", partnerName)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
