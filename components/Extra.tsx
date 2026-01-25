import React, { useState } from 'react';
import { Gamepad2, Users, MessageSquare, Sparkles, Zap, X, Radio, Settings as SettingsIcon, Baby, Heart, Rocket } from 'lucide-react';
import { SpeedBuild } from './extra/SpeedBuild';
import { SoundID } from './extra/SoundID';
import { VisitInstructions } from './extra/VisitInstructions';
import { SexIntimacy } from './extra/SexIntimacy';
import { BabyNameGenerator } from './recon/BabyNameGenerator';
import { BabyName } from '../types';

type MiniGame = 'speed-build' | 'sound-id' | null;

interface ExtraProps {
    currentWeek?: number;
    onReward?: (pts: number) => void;
    userStats?: any;
    onUpdateStats?: (updates: any) => void;
    babyNames?: BabyName[];
    onSaveBabyNames?: (names: BabyName[]) => void;
    isDevMode?: boolean;
    effectiveDate?: string;
    dayIndex?: number;
}

export const Extra: React.FC<ExtraProps> = ({
    currentWeek = 20,
    onReward = () => { },
    userStats,
    onUpdateStats = () => { },
    babyNames = [],
    onSaveBabyNames,
    isDevMode,
    effectiveDate,
    dayIndex
}) => {
    const [showTrainingCamp, setShowTrainingCamp] = useState(false);
    const [selectedGame, setSelectedGame] = useState<MiniGame>(null);
    const [showVisitInstructions, setShowVisitInstructions] = useState(false);
    const [showBabyNames, setShowBabyNames] = useState(false);
    const [showSexIntimacy, setShowSexIntimacy] = useState(false);

    // If a mini-game is selected, show it
    if (selectedGame === 'speed-build') {
        return <SpeedBuild
            onClose={() => setSelectedGame(null)}
            onSyncScores={(scores) => onUpdateStats({ speedBuildScores: scores })}
        />;
    }
    if (selectedGame === 'sound-id') {
        return <SoundID
            onClose={() => setSelectedGame(null)}
            onSyncStats={(stats) => onUpdateStats({ soundIDStats: stats })}
        />;
    }


    // If Visit Instructions is shown
    if (showVisitInstructions) {
        return <VisitInstructions
            onClose={() => setShowVisitInstructions(false)}
            partnerName={userStats?.partnerName || ''}
        />;
    }

    // If Baby Names is shown
    if (showBabyNames) {
        return (
            <div className="fixed inset-0 z-[80] bg-[#1f2933] overflow-y-auto animate-fade-in p-4">
                <div className="max-w-2xl mx-auto min-h-full flex flex-col">
                    <BabyNameGenerator
                        babyNames={babyNames}
                        onSaveBabyNames={onSaveBabyNames}
                        autoExpand={true}
                        onClose={() => setShowBabyNames(false)}
                    />
                </div>
            </div>
        );
    }

    // If Sex & Intimacy is shown
    if (showSexIntimacy) {
        return <SexIntimacy
            onClose={() => setShowSexIntimacy(false)}
            partnerName={userStats?.partnerName || ''}
        />;
    }

    // Training Camp Menu
    if (showTrainingCamp) {
        return (
            <div className="fixed inset-0 z-[80] bg-[#1f2933] overflow-y-auto animate-fade-in p-4">
                <div className="max-w-2xl mx-auto min-h-full flex flex-col">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/20">
                        <div className="flex items-center gap-3">
                            <div>
                                <h2 className="text-xl font-black italic uppercase accent-text tracking-tighter">
                                    Výcvikový Kemp
                                </h2>
                                <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">
                                    Strategický výcvik • Mini-hry
                                </p>
                            </div>
                        </div>

                        <button onClick={() => setShowTrainingCamp(false)} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border-2 border-white/20">
                            <X className="w-6 h-6 text-[#f6c453]" />
                        </button>
                    </div>

                    <div className="space-y-4 flex-1">
                        {/* Speed Build Card */}
                        <button
                            onClick={() => setSelectedGame('speed-build')}
                            className="w-full bg-white/5 hover:bg-[#f6c453]/5 border-2 border-white/10 hover:border-[#f6c453]/30 rounded-2xl p-6 text-left transition-all active:scale-98 group"
                        >
                            <div className="flex items-start gap-4 transition-transform group-hover:translate-x-1">
                                <div className="p-4 bg-[#f6c453]/10 rounded-xl text-[#f6c453] group-hover:scale-110 group-hover:rotate-6 transition-transform">
                                    <Zap className="w-8 h-8" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-black uppercase text-white tracking-tight mb-1 group-hover:text-[#f6c453] transition-colors">
                                        Rychlé nasazení
                                    </h3>
                                    <p className="text-sm text-white/70 mb-3">
                                        Trénuj rychlost při instalaci autosedačky, přebalování a dalších úkolech
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-[#f6c453]/80">
                                        <span className="px-2 py-1 bg-[#f6c453]/20 rounded uppercase font-black">3 kategorie</span>
                                        <span className="px-2 py-1 bg-[#f6c453]/20 rounded uppercase font-black">Stopky</span>
                                    </div>
                                </div>
                            </div>
                        </button>

                        {/* Sound ID Card */}
                        <button
                            onClick={() => setSelectedGame('sound-id')}
                            className="w-full bg-white/5 hover:bg-[#f6c453]/5 border-2 border-white/10 hover:border-[#f6c453]/30 rounded-2xl p-6 text-left transition-all active:scale-98 group"
                        >
                            <div className="flex items-start gap-4 transition-transform group-hover:translate-x-1">
                                <div className="p-4 bg-[#f6c453]/10 rounded-xl text-[#f6c453] group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                                    <Radio className="w-8 h-8" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-black uppercase text-white tracking-tight mb-1 group-hover:text-[#f6c453] transition-colors">
                                        Akustický Radar
                                    </h3>
                                    <p className="text-sm text-white/70 mb-3">
                                        Nauč se rozpoznávat různé typy pláče podle Dunstan Baby Language
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-[#f6c453]/80">
                                        <span className="px-2 py-1 bg-[#f6c453]/20 rounded uppercase font-black">4 typy pláče</span>
                                        <span className="px-2 py-1 bg-[#f6c453]/20 rounded uppercase font-black">Audio analýza</span>
                                    </div>
                                </div>
                            </div>
                        </button>




                    </div>

                    <div className="mt-8 bg-[#f6c453]/10 rounded-xl p-4 border border-[#f6c453]/30">
                        <p className="text-xs text-[#f6c453]/80 text-center leading-relaxed">
                            💡 Vyber mini-hru a trénuj své dovednosti!
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Main Extra Screen
    return (
        <div className="space-y-6 pb-24">
            {/* Enhanced Header - Simplified to Yellow/Slate */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#f6c453]/10 via-slate-500/5 to-slate-500/10 border border-[#f6c453]/20 p-6 shadow-lg shadow-[#f6c453]/5 group">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2Y2YzQ1MyIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30 group-hover:opacity-40 transition-opacity"></div>

                <div className="relative flex items-center gap-3">
                    <div className="p-3 bg-[#f6c453]/10 rounded-xl backdrop-blur-sm group-hover:scale-110 group-hover:rotate-12 transition-transform">
                        <Rocket className="w-6 h-6 text-[#f6c453]" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black italic uppercase accent-text tracking-tight inline-block pr-3 group-hover:translate-x-1 transition-transform">
                            Extra Obsah
                        </h2>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                            Training & Intel • Bonusy
                        </p>
                    </div>
                </div>
            </div>

            {/* All Features as Tiles - Simplified */}
            <div className="grid grid-cols-2 gap-4 px-2">
                {/* Training Camp Card */}
                <button
                    onClick={() => setShowTrainingCamp(true)}
                    className="group relative overflow-hidden rounded-2xl bg-white/5 border-2 border-white/10 p-6 text-left hover:border-[#f6c453]/40 hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
                >
                    <div className="relative flex flex-col items-center gap-3">
                        <div className="p-4 bg-[#f6c453]/10 rounded-xl group-hover:bg-[#f6c453]/20 transition-all text-[#f6c453]">
                            <Gamepad2 className="w-8 h-8 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-sm font-black uppercase text-white/90 tracking-tight group-hover:text-[#f6c453] transition-colors">
                                Výcvikový Kemp
                            </h3>
                            <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">
                                Mini-hry
                            </p>
                        </div>
                    </div>
                </button>

                {/* Visit Instructions Card */}
                <button
                    onClick={() => setShowVisitInstructions(true)}
                    className="group relative overflow-hidden rounded-2xl bg-white/5 border-2 border-white/10 p-6 text-left hover:border-[#f6c453]/40 hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
                >
                    <div className="relative flex flex-col items-center gap-3">
                        <div className="p-4 bg-[#f6c453]/10 rounded-xl group-hover:bg-[#f6c453]/20 transition-all text-[#f6c453]">
                            <Users className="w-8 h-8 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-sm font-black uppercase text-white/90 tracking-tight group-hover:text-[#f6c453] transition-colors">
                                Protokol Návštěv
                            </h3>
                            <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">
                                Pravidla pro civilisty
                            </p>
                        </div>
                    </div>
                </button>

                {/* Baby Names Card */}
                <button
                    onClick={() => setShowBabyNames(true)}
                    className="group relative overflow-hidden rounded-2xl bg-white/5 border-2 border-white/10 p-6 text-left hover:border-[#f6c453]/40 hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
                >
                    <div className="relative flex flex-col items-center gap-3">
                        <div className="p-4 bg-[#f6c453]/10 rounded-xl group-hover:bg-[#f6c453]/20 transition-all text-[#f6c453]">
                            <Baby className="w-8 h-8 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-sm font-black uppercase text-white/90 tracking-tight group-hover:text-[#f6c453] transition-colors">
                                Nominace Juniora
                            </h3>
                            <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">
                                Výběr kódového označení
                            </p>
                        </div>
                    </div>
                </button>

                {/* Sex & Intimacy Card */}
                <button
                    onClick={() => setShowSexIntimacy(true)}
                    className="group relative overflow-hidden rounded-2xl bg-white/5 border-2 border-white/10 p-6 text-left hover:border-[#f6c453]/40 hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
                >
                    <div className="relative flex flex-col items-center gap-3">
                        <div className="p-4 bg-[#f6c453]/10 rounded-xl group-hover:bg-[#f6c453]/20 transition-all text-[#f6c453]">
                            <Heart className="w-8 h-8 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-sm font-black uppercase text-white/90 tracking-tight group-hover:text-[#f6c453] transition-colors">
                                Soukromý Sektor
                            </h3>
                            <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">
                                Důvěrné informace
                            </p>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};
