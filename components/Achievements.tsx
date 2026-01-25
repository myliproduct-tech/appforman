import React, { useRef, useState, useEffect } from 'react';
import { UserStats, Achievement } from '../types';
import { ACHIEVEMENTS } from '../constants';
import { Lock, Download, Share2, X, Trophy, Calendar, Medal, Sprout, Flame, Bot, Star, Crown, Package, Search, Backpack, Wrench, Car, Milk, Waves, BookOpen, Volume2, Headphones, Moon, ShieldCheck, ShieldAlert, Flag, TrendingUp, Zap, Tag, Wallet, FileText, UserPlus, Settings, Heart } from 'lucide-react';
import html2canvas from 'html2canvas';
import { localizeText, getRankBasedOnPoints } from '../utils';

interface AchievementsProps {
    stats: UserStats;
    onClose?: () => void;
}

export const Achievements: React.FC<AchievementsProps> = ({ stats, onClose }) => {
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

    const unlockedCount = stats.badges.length;
    const totalCount = ACHIEVEMENTS.length;
    const progressPercent = Math.round((unlockedCount / totalCount) * 100);

    const handleDownload = async () => {
        if (cardRef.current && !isGeneratingImage) {
            setIsGeneratingImage(true);
            try {
                const canvas = await html2canvas(cardRef.current, {
                    backgroundColor: '#1f2933',
                    scale: 2,
                    useCORS: true
                });
                const link = document.createElement('a');
                link.download = `Achievement-${selectedAchievement?.title || 'Badge'}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            } catch (err) {
                console.error('Failed to generate image:', err);
            } finally {
                setIsGeneratingImage(false);
            }
        }
    };

    const getIcon = (iconName: string, isUnlocked: boolean) => {
        const icons: Record<string, any> = {
            Trophy, Medal, Sprout, Flame, Bot, Star, Crown, Package, Search, Backpack, Wrench, Car, Milk, Waves, BookOpen, Volume2, Headphones, Moon, ShieldCheck, ShieldAlert, Flag, TrendingUp, Zap, Tag, Wallet, FileText, UserPlus, Settings, Heart
        };
        const IconComponent = icons[iconName] || Trophy;
        return <IconComponent className={`w-8 h-8 ${isUnlocked ? 'text-[#f6c453]' : 'text-white/20'}`} />;
    };

    return (
        <div className="fixed inset-0 z-[60] bg-[#1f2933] flex flex-col animate-fade-in overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#f6c453]/10 rounded-2xl border border-[#f6c453]/20">
                        <Trophy className="w-6 h-6 text-[#f6c453]" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black italic uppercase text-white tracking-tighter">Zeď Slávy</h2>
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden border border-white/10">
                                <div
                                    className="h-full bg-[#f6c453] transition-all duration-1000"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                            <span className="text-[10px] font-mono text-[#f6c453] uppercase">{unlockedCount}/{totalCount} odemčeno</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
                >
                    <X className="w-6 h-6 text-white" />
                </button>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide pb-32">
                <div className="grid grid-cols-2 xs:grid-cols-3 gap-4">
                    {ACHIEVEMENTS.map((achievement) => {
                        const unlocked = stats.badges.find(b => b.id === achievement.id);
                        const isUnlocked = !!unlocked;

                        return (
                            <div
                                key={achievement.id}
                                onClick={() => isUnlocked && setSelectedAchievement(achievement)}
                                className={`relative aspect-square rounded-[2rem] p-4 flex flex-col items-center justify-center transition-all duration-500 overflow-hidden group ${isUnlocked
                                    ? 'bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 hover:border-[#f6c453]/50 cursor-pointer scale-100 hover:scale-[1.02]'
                                    : 'bg-white/5 border-2 border-dashed border-white/10 opacity-60 scale-95 grayscale'
                                    }`}
                            >
                                {/* Background Glow */}
                                {isUnlocked && (
                                    <div className="absolute inset-0 bg-[#f6c453]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                )}

                                <div className={`relative z-10 mb-3 transition-transform duration-500 ${isUnlocked ? 'group-hover:scale-110 group-hover:rotate-6' : ''}`}>
                                    {isUnlocked ? getIcon(achievement.icon, true) : <Lock className="w-8 h-8 text-white/10" />}
                                </div>

                                <div className="relative z-10 text-center w-full mt-auto">
                                    <h3 className={`font-black uppercase text-xs mb-1 tracking-wider leading-tight ${isUnlocked ? 'text-white' : 'text-white/40'}`}>
                                        {localizeText(achievement.title, stats.partnerName)}
                                    </h3>
                                    {isUnlocked && unlocked.unlockedDate && (
                                        <p className="text-[10px] font-mono opacity-50">
                                            {new Date(unlocked.unlockedDate).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Detail Modal moved to AchievementModal */}
            {selectedAchievement && (
                <AchievementModal
                    achievement={selectedAchievement}
                    userName={stats.userName || 'Rekrut'}
                    stats={stats}
                    onClose={() => setSelectedAchievement(null)}
                />
            )}
        </div>
    );
};

interface AchievementModalProps {
    achievement: Achievement;
    userName: string;
    stats: UserStats;
    onClose: () => void;
}

export const AchievementModal: React.FC<AchievementModalProps> = ({ achievement: selectedAchievement, userName, stats, onClose }) => {
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (cardRef.current && !isGeneratingImage) {
            setIsGeneratingImage(true);
            try {
                const canvas = await html2canvas(cardRef.current, {
                    backgroundColor: '#1f2933',
                    scale: 2,
                    useCORS: true
                });
                const link = document.createElement('a');
                link.download = `Achievement-${selectedAchievement?.title || 'Badge'}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            } catch (err) {
                console.error('Failed to generate image:', err);
            } finally {
                setIsGeneratingImage(false);
            }
        }
    };

    const getIcon = (iconName: string, isUnlocked: boolean) => {
        const icons: Record<string, any> = {
            Trophy, Medal, Sprout, Flame, Bot, Star, Crown, Package, Search, Backpack, Wrench, Car, Milk, Waves, BookOpen, Volume2, Headphones, Moon, ShieldCheck, ShieldAlert, Flag, TrendingUp, Zap, Tag, Wallet, FileText, UserPlus, Settings, Heart
        };
        const IconComponent = icons[iconName] || Trophy;
        return <IconComponent className={`w-8 h-8 ${isUnlocked ? 'text-[#f6c453]' : 'text-white/20'}`} />;
    };

    return (
        <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
            <div className="w-full max-w-lg">
                {/* Printable Card */}
                <div
                    ref={cardRef}
                    className="relative aspect-square rounded-[3rem] bg-[#1f2933] border-4 border-[#f6c453]/50 p-8 flex flex-col items-center justify-center text-center overflow-hidden shadow-2xl"
                >
                    {/* Decorative Elements */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#f6c453]/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#f6c453]/5 rounded-full blur-3xl" />

                    <div className="relative z-10 w-24 h-24 bg-[#f6c453]/10 rounded-[2.5rem] border-2 border-[#f6c453]/50 flex items-center justify-center mb-8 shadow-inner transform -rotate-6">
                        {React.cloneElement(getIcon(selectedAchievement.icon, true), { className: 'w-12 h-12 text-[#f6c453]' })}
                    </div>

                    <div className="relative z-10 space-y-4">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f6c453] opacity-60 mb-2">ČESTNÉ UZNÁNÍ</p>
                            <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter leading-none mb-2">
                                {localizeText(selectedAchievement.title, stats.partnerName)}
                            </h2>
                            <div className="h-0.5 w-12 bg-[#f6c453] mx-auto rounded-full" />
                        </div>
                        <p className="text-sm font-medium text-white/80 leading-relaxed px-4">
                            {localizeText(selectedAchievement.description, stats.partnerName)}
                        </p>
                    </div>

                    {/* Footer for Sharing */}
                    <div className="absolute bottom-6 left-0 right-0 px-8 flex justify-between items-end opacity-40">
                        <div className="text-left">
                            <p className="text-[8px] font-black uppercase text-[#f6c453]">Program</p>
                            <p className="text-[10px] font-black italic text-white uppercase tracking-tighter">APP FOR MAN</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[8px] font-mono text-white/60">LVL {getRankBasedOnPoints(stats.points).level}</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-8">
                    <button
                        onClick={handleDownload}
                        disabled={isGeneratingImage}
                        className="flex-1 bg-white/5 border-2 border-white/20 text-white rounded-3xl py-4 font-black uppercase text-xs tracking-widest hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                        <Download className="w-5 h-5" /> {isGeneratingImage ? 'Generuji...' : 'Uložit'}
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-[#f6c453] text-[#1f2933] rounded-3xl px-8 py-4 font-black uppercase text-xs tracking-widest hover:bg-[#ffcf60] active:scale-95 transition-all"
                    >
                        Zavřít
                    </button>
                </div>
            </div>
        </div>
    );
};
