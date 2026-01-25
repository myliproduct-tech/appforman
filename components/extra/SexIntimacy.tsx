import React from 'react';
import { X, Heart, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { localizeText } from '../../utils';

interface SexIntimacyProps {
    onClose: () => void;
    partnerName: string; // Added prop
}

export const SexIntimacy: React.FC<SexIntimacyProps> = ({ onClose, partnerName }) => {
    return (
        <div className="fixed inset-0 z-[80] bg-[#1f2933] overflow-y-auto animate-fade-in p-4">
            <div className="max-w-2xl mx-auto min-h-full flex flex-col py-8">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div>
                            <h2 className="text-xl font-black italic uppercase text-[#f6c453] tracking-tighter">
                                Soukromý Sektor
                            </h2>
                            <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">
                                Důvěrné informace
                            </p>
                        </div>
                    </div>

                    <button onClick={onClose} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10">
                        <X className="w-6 h-6 text-[#f6c453]" />
                    </button>
                </div>

                <div className="space-y-6 flex-1">
                    {/* Intro */}
                    <div className="glass-card p-6 rounded-3xl bg-[#f6c453]/5 border-[#f6c453]/20">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-[#f6c453]/20 rounded-xl shrink-0">
                                <Heart className="w-6 h-6 text-[#f6c453]" />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-white mb-2">Intimita je důležitá</h3>
                                <p className="text-sm text-white/70 leading-relaxed">
                                    Těhotenství je velká změna pro vás oba. Komunikace a vzájemné porozumění jsou klíčové pro udržení blízkosti a intimity.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Safety Info */}
                    <div className="glass-card p-6 rounded-3xl border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle className="w-5 h-5 text-[#f6c453]" />
                            <h3 className="text-lg font-black text-white">Je to bezpečné?</h3>
                        </div>
                        <div className="space-y-3 text-sm text-white/70 leading-relaxed">
                            <p>
                                <strong className="text-white">Ano, sex během těhotenství je bezpečný</strong> ve většině případů, pokud není lékařem doporučeno jinak.
                            </p>
                            <p>
                                Miminko je chráněno plodovou vodou a silnými svaly dělohy. Nemůžeš mu ublížit.
                            </p>
                        </div>
                    </div>

                    {/* When to Avoid */}
                    <div className="glass-card p-6 rounded-3xl bg-[#f6c453]/5 border-[#f6c453]/20">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="w-5 h-5 text-[#f6c453]" />
                            <h3 className="text-lg font-black text-white">Kdy být opatrný</h3>
                        </div>
                        <div className="space-y-2 text-sm text-white/70">
                            <p className="font-bold text-[#f6c453]">Konzultuj s lékařem, pokud:</p>
                            <ul className="space-y-2 ml-4">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#f6c453] mt-1">•</span>
                                    <span>Hrozí předčasný porod</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#f6c453] mt-1">•</span>
                                    <span>Placenta je nízko (placenta previa)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#f6c453] mt-1">•</span>
                                    <span>Odtéká plodová voda</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#f6c453] mt-1">•</span>
                                    <span>Krvácení nebo bolesti</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Tips by Trimester */}
                    <div className="glass-card p-6 rounded-3xl border-white/10">
                        <h3 className="text-lg font-black text-white mb-4">Podle trimestru</h3>
                        <div className="space-y-4">
                            <div className="bg-white/5 p-4 rounded-2xl">
                                <h4 className="text-sm font-black text-[#f6c453]/80 mb-2">1. Trimestr (1-12 týdnů)</h4>
                                <p className="text-sm text-white/70 leading-relaxed">
                                    {localizeText("Partnerka může mít nevolnost, únavu a citlivá prsa. Buď trpělivý a nabídni jiné formy intimity (objetí, masáže).", partnerName)}
                                </p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-2xl">
                                <h4 className="text-sm font-black text-[#f6c453] mb-2">2. Trimestr (13-26 týdnů)</h4>
                                <p className="text-sm text-white/70 leading-relaxed">
                                    Často nejlepší období - energie se vrací, nevolnost mizí. Libido může být vyšší díky hormonům.
                                </p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-2xl">
                                <h4 className="text-sm font-black text-[#f6c453]/80 mb-2">3. Trimestr (27-40 týdnů)</h4>
                                <p className="text-sm text-white/70 leading-relaxed">
                                    {localizeText("Rostoucí bříško může být nepohodlné. Zkuste polohy na boku nebo partnerka nahoře. Komunikujte, co je pohodlné.", partnerName)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Communication Tips */}
                    <div className="glass-card p-6 rounded-3xl bg-[#f6c453]/5 border-[#f6c453]/20">
                        <div className="flex items-center gap-3 mb-4">
                            <Info className="w-5 h-5 text-[#f6c453]" />
                            <h3 className="text-lg font-black text-white">Tipy pro komunikaci</h3>
                        </div>
                        <div className="space-y-3 text-sm text-white/70">
                            <div className="flex items-start gap-3">
                                <span className="text-[#f6c453] font-bold shrink-0">1.</span>
                                <p><strong className="text-white">Mluvte otevřeně</strong> o svých potřebách a obavách</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-[#f6c453] font-bold shrink-0">2.</span>
                                <p><strong className="text-white">Respektuj její pocity</strong> - libido se může měnit</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-[#f6c453] font-bold shrink-0">3.</span>
                                <p><strong className="text-white">Intimita ≠ sex</strong> - objetí, polibky a masáže jsou také důležité</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-[#f6c453] font-bold shrink-0">4.</span>
                                <p><strong className="text-white">Buď trpělivý</strong> - tělo prochází velkými změnami</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-[#f6c453] font-bold shrink-0">5.</span>
                                <p><strong className="text-white">Ukaž jí, že je krásná</strong> - sebevědomí může klesnout</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Note */}
                    <div className="bg-[#f6c453]/10 rounded-xl p-4 border border-[#f6c453]/30">
                        <p className="text-xs text-[#f6c453]/80 text-center leading-relaxed">
                            💕 Každý pár je jiný. Najděte si to, co funguje pro vás. Hlavní je vzájemná láska a respekt.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
