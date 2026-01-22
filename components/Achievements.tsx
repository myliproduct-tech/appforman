import React, { useRef, useState, useEffect } from 'react';
import { UserStats, Achievement } from '../types';
import { ACHIEVEMENTS } from '../constants';
import { Lock, Download, Share2, X, Trophy, Calendar, Medal, Sprout, Flame, Bot, Star, Crown, Package, Search, Backpack, Wrench, Car, Milk, Waves, BookOpen, Volume2, Headphones, Moon, ShieldCheck, ShieldAlert, Flag, TrendingUp, Zap, Tag, Wallet, FileText, UserPlus, Settings, Heart } from 'lucide-react';
import html2canvas from 'html2canvas';

interface AchievementsProps {
    stats: UserStats;
}

export const Achievements: React.FC<AchievementsProps> = ({ stats }) => {
    const [selectedAchievement, setSelectedAchievement] = useState<{ achievement: Achievement, unlockedDate?: string } | null>(null);

    // Filter states
    const [filterStatus, setFilterStatus] = useState<'all' | 'unlocked' | 'locked'>('all');
    const [filterRarity, setFilterRarity] = useState<'all' | 'common' | 'rare' | 'epic' | 'legendary'>('all');

    // Helper to check unlock status
    const getUnlockInfo = (id: string) => {
        return stats.badges.find(b => b.id === id);
    };

    // Filter achievements
    const filteredAchievements = ACHIEVEMENTS.filter(achievement => {
        const unlocked = getUnlockInfo(achievement.id);
        const isUnlocked = !!unlocked;

        // Status filter
        if (filterStatus === 'unlocked' && !isUnlocked) return false;
        if (filterStatus === 'locked' && isUnlocked) return false;

        // Rarity filter
        if (filterRarity !== 'all' && achievement.rarity !== filterRarity) return false;

        return true;
    });

    const hasActiveFilters = filterStatus !== 'all' || filterRarity !== 'all';

    const resetFilters = () => {
        setFilterStatus('all');
        setFilterRarity('all');
    };

    return (
        <div className="space-y-6 pb-24">
            {/* Enhanced Header - Simplified to Yellow/Slate */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#f6c453]/10 via-slate-500/5 to-slate-500/10 border border-[#f6c453]/20 p-6 shadow-lg shadow-[#f6c453]/5 group">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2Y2YzQ1MyIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30 group-hover:opacity-40 transition-opacity"></div>

                <div className="relative flex items-center gap-3">
                    <div className="p-3 bg-[#f6c453]/10 rounded-xl backdrop-blur-sm group-hover:scale-110 group-hover:rotate-12 transition-transform">
                        <Trophy className="w-6 h-6 text-[#f6c453]" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black italic uppercase accent-text tracking-tight inline-block pr-3 group-hover:translate-x-1 transition-transform">
                            Zeď Slávy
                        </h2>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                            Trofeje • {stats.badges.length}/{ACHIEVEMENTS.length}
                        </p>
                    </div>
                </div>
            </div>

            {/* FILTER PANEL */}
            <div className="px-4 space-y-3">
                <div className="glass-card p-4 rounded-2xl border border-white/20 group hover:border-[#f6c453]/20 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors">Filtry</h3>
                        {hasActiveFilters && (
                            <button
                                onClick={resetFilters}
                                className="text-[10px] text-red-400 hover:scale-105 active:scale-95 transition-all font-bold uppercase tracking-wider"
                            >
                                Zrušit
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {/* Status Filter */}
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value as any)}
                            className="bg-[#1f2933] text-white text-[10px] font-bold p-3 rounded-xl border-2 border-white/20 outline-none focus:border-[#f6c453] uppercase tracking-wider transition-all"
                        >
                            <option value="all">Všechny</option>
                            <option value="unlocked">Odemčené</option>
                            <option value="locked">Zamčené</option>
                        </select>

                        {/* Rarity Filter */}
                        <select
                            value={filterRarity}
                            onChange={(e) => setFilterRarity(e.target.value as any)}
                            className="bg-[#1f2933] text-white text-[10px] font-bold p-3 rounded-xl border-2 border-white/20 outline-none focus:border-[#f6c453] uppercase tracking-wider transition-all"
                        >
                            <option value="all">Všechny Vzácnosti</option>
                            <option value="common">Common</option>
                            <option value="rare">Rare</option>
                            <option value="epic">Epic</option>
                            <option value="legendary">Legendary</option>
                        </select>
                    </div>

                    {/* Results Counter */}
                    <div className="mt-3 pt-3 border-t border-white/20">
                        <p className="text-[10px] font-mono text-white/40 text-center">
                            Zobrazeno: <span className="text-[#f6c453] font-black">{filteredAchievements.length}</span> / {ACHIEVEMENTS.length}
                        </p>
                    </div>
                </div>
            </div>

            {/* ACHIEVEMENT GRID */}
            <div className="grid grid-cols-2 gap-4 px-4">
                {
                    filteredAchievements.length === 0 ? (
                        <div className="col-span-2 text-center py-20 opacity-30">
                            <Trophy className="w-12 h-12 mx-auto mb-4" />
                            <p className="text-xs font-black uppercase tracking-widest">Žádné odznaky</p>
                            <p className="text-[10px] mt-2">Zkus změnit filtry</p>
                        </div>
                    ) : (
                        filteredAchievements.map(achievement => {
                            const unlocked = getUnlockInfo(achievement.id);
                            const isUnlocked = !!unlocked;

                            return (
                                <div
                                    key={achievement.id}
                                    onClick={() => setSelectedAchievement({ achievement, unlockedDate: unlocked?.unlockedDate })}
                                    className={`relative aspect-[3/4] rounded-2xl p-5 flex flex-col items-center justify-between border-2 transition-all active:scale-95 cursor-pointer group
                ${isUnlocked
                                            ? 'bg-[#1f2933] border-[#f6c453]/30 shadow-lg shadow-[#f6c453]/5'
                                            : 'bg-black/20 border-white/20 opacity-60 grayscale'
                                        }`}
                                >
                                    {/* Rarity Glow for Unlocked */}
                                    {isUnlocked && (
                                        <div className="absolute inset-0 bg-gradient-to-b from-[#f6c453]/20 to-transparent opacity-20 pointer-events-none rounded-2xl" />
                                    )}

                                    <div className="relative z-10 w-full flex justify-between items-start mb-2">
                                        {isUnlocked ? (
                                            <span className="text-[10px] font-black uppercase tracking-widest opacity-50">{achievement.rarity}</span>
                                        ) : (
                                            <Lock className="w-4 h-4 text-white/20" />
                                        )}
                                    </div>

                                    <div className="relative z-10 mb-3 group-hover:scale-110 transition-transform duration-300">
                                        {(() => {
                                            const Icon = {
                                                Medal, Sprout, Flame, Bot, Star, Crown, Package, Search, Backpack, Wrench, Car, Milk, Waves, BookOpen, Volume2, Headphones, Moon, ShieldCheck, ShieldAlert, Flag, TrendingUp, Zap, Tag, Wallet, FileText, UserPlus, Settings, Heart
                                            }[achievement.icon] || Trophy;
                                            return <Icon className={`w-12 h-12 ${isUnlocked ? 'accent-text' : 'text-white/20'}`} />;
                                        })()}
                                    </div>

                                    <div className="relative z-10 text-center w-full mt-auto">
                                        <h3 className={`font-black uppercase text-xs mb-1 tracking-wider leading-tight ${isUnlocked ? 'text-white' : 'text-white/40'}`}>
                                            {achievement.title}
                                        </h3>
                                        {isUnlocked && unlocked.unlockedDate && (
                                            <p className="text-[10px] font-mono opacity-50">
                                                {(() => {
                                                    const date = new Date(unlocked.unlockedDate);
                                                    return isNaN(date.getTime()) ? 'Neznámo' : date.toLocaleDateString();
                                                })()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )
                }
            </div>

            {/* DETAIL MODAL (COLLECTIBLE CARD) */}
            {
                selectedAchievement && (
                    <AchievementModal
                        achievement={selectedAchievement.achievement}
                        unlockedDate={selectedAchievement.unlockedDate}
                        userName={stats.userName || 'Rekrut'}
                        stats={stats}
                        onClose={() => setSelectedAchievement(null)}
                    />
                )
            }
        </div>
    );
};

// --- MODAL COMPONENT ---
export interface ModalProps {
    achievement: Achievement | null;
    unlockedDate?: string;
    userName: string;
    stats: UserStats; // Pro progress bar
    onClose: () => void;
}

const AchievementModalComponent: React.FC<ModalProps> = ({ achievement, unlockedDate, userName, stats, onClose }) => {
    // Safety check - if no achievement, don't render
    if (!achievement) {
        return null;
    }

    const isUnlocked = !!unlockedDate;
    const cardRef = useRef<HTMLDivElement>(null);
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        if (!cardRef.current || !isUnlocked) return;
        setDownloading(true);
        try {
            const canvas = await html2canvas(cardRef.current, {
                backgroundColor: '#1f2933',
                scale: 2,
                useCORS: true
            });
            const link = document.createElement('a');
            link.download = `Odznak-${achievement.id}.jpg`;
            link.href = canvas.toDataURL('image/jpeg', 0.9);
            link.click();
        } catch (e) {
            console.error(e);
            alert('Chyba při stahování karty.');
        } finally {
            setDownloading(false);
        }
    };

    const getRarityColor = (r: string) => {
        switch (r) {
            case 'legendary': return 'text-[#f6c453] border-[#f6c453]/80 bg-[#f6c453]/10';
            case 'epic': return 'text-[#f6c453] border-[#f6c453]/60 bg-[#f6c453]/5';
            case 'rare': return 'text-[#f6c453] border-[#f6c453]/40 bg-[#f6c453]/5';
            default: return 'text-white/70 border-white/20 bg-white/5';
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
            <div className="w-full max-w-sm flex flex-col gap-6" onClick={e => e.stopPropagation()}>

                {/* THE CARD (Ref Target) */}
                <div ref={cardRef} className="min-h-[600px] max-h-[85vh] bg-[#1f2933] rounded-[2rem] border-4 border-double border-[#f6c453]/30 relative overflow-y-auto flex flex-col shadow-2xl">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>

                    {/* Rarity Header */}
                    <div className={`p-4 border-b flex justify-between items-center ${getRarityColor(achievement.rarity).split(' ')[2]}`}>
                        <div className="flex items-center gap-2">
                            <Trophy className={`w-4 h-4 ${getRarityColor(achievement.rarity).split(' ')[0]}`} />
                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${getRarityColor(achievement.rarity).split(' ')[0]}`}>
                                {achievement.rarity}
                            </span>
                        </div>
                        {isUnlocked && <div className="text-[10px] font-mono opacity-50">#{achievement.id.slice(0, 4).toUpperCase()}</div>}
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col items-center justify-center p-6 py-8 text-center relative pointer-events-none">
                        {/* Glow */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 blur-[60px] opacity-20 rounded-full ${getRarityColor(achievement.rarity).split(' ')[0].replace('text', 'bg')}`}></div>

                        <div className="relative z-10 mb-4 relative z-10 drop-shadow-2xl filter">
                            {(() => {
                                const Icon = {
                                    Medal, Sprout, Flame, Bot, Star, Crown, Package, Search, Backpack, Wrench, Car, Milk, Waves, BookOpen, Volume2, Headphones, Moon, ShieldCheck, ShieldAlert, Flag, TrendingUp, Zap, Tag, Wallet, FileText, UserPlus, Settings, Heart
                                }[achievement.icon] || Trophy;
                                return <Icon className={`w-20 h-20 ${getRarityColor(achievement.rarity).split(' ')[0]}`} />;
                            })()}
                        </div>

                        <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2 leading-tight relative z-10">
                            {achievement.title}
                        </h2>
                        <p className="text-sm font-medium text-white/70 leading-relaxed max-w-[250px] relative z-10">
                            {achievement.description}
                        </p>

                        {/* XP Reward */}
                        <div className="mt-4 px-4 py-2 bg-[#f6c453]/10 border border-[#f6c453]/30 rounded-lg relative z-10">
                            <p className="text-xs font-black uppercase text-[#f6c453] tracking-wider">+{achievement.xpReward} XP</p>
                        </div>
                    </div>

                    {/* How to Unlock & Progress */}
                    {!isUnlocked && (
                        <div className="px-6 pb-6 space-y-3 relative z-10">
                            {/* How to Unlock */}
                            <div className="bg-black/30 border-2 border-white/20 rounded-xl p-4">
                                <p className="text-[10px] font-black uppercase text-[#f6c453] tracking-widest mb-2">JAK ZÍSKAT:</p>
                                <p className="text-xs text-white/80 leading-relaxed">{achievement.howToUnlock}</p>
                            </div>


                            {/* Progress Bar */}
                            {achievement.progress && stats && (() => {
                                const progressData = achievement.progress(stats);
                                const progressPercent = (progressData.current / progressData.total) * 100;
                                return (
                                    <div className="bg-black/30 border-2 border-white/20 rounded-xl p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-[10px] font-black uppercase text-white/50 tracking-widest">PROGRESS:</p>
                                            <p className="text-xs font-mono text-[#f6c453]">{progressData.current}/{progressData.total}</p>
                                        </div>
                                        <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-[#f6c453] to-[#ffcf60] transition-all duration-500"
                                                style={{ width: `${progressPercent}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                    )}

                    {/* Footer */}
                    <div className="p-6 bg-black/20 border-t border-white/20 space-y-3">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-black uppercase text-white/30 tracking-widest mb-1">Držitel</p>
                                <p className="text-sm font-bold text-white uppercase tracking-wider">{userName}</p>
                            </div>
                            {isUnlocked && unlockedDate && (
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase text-white/30 tracking-widest mb-1">Získáno</p>
                                    <p className="text-xs font-mono text-[#f6c453]">
                                        {(() => {
                                            const date = new Date(unlockedDate);
                                            return isNaN(date.getTime()) ? 'Neznámo' : date.toLocaleDateString();
                                        })()}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    {isUnlocked && (
                        <button
                            onClick={handleDownload}
                            disabled={downloading}
                            className="flex-1 bg-[#f6c453] text-[#1f2933] py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-[#ffcf60] active:scale-95 transition-all shadow-lg"
                        >
                            {downloading ? 'Generuji...' : <><Download className="w-4 h-4" /> Uložit Kartu</>}
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="w-14 bg-white/10 text-white rounded-2xl flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

            </div>
        </div>
    );
};

export const AchievementModal = React.memo(AchievementModalComponent);
