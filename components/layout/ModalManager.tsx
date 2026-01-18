import React from 'react';
import { Trophy } from 'lucide-react';
import { AchievementModal } from '../Achievements';
import { Achievement, Task, UserStats } from '../../types';
import { RANKS } from '../../constants';

interface ModalManagerProps {
    showRankModal: { show: boolean, rank: typeof RANKS[0] | null };
    setShowRankModal: (val: { show: boolean, rank: typeof RANKS[0] | null }) => void;
    showAchievementModal: Achievement | null;
    setShowAchievementModal: (val: Achievement | null) => void;
    showFailureModal: Task | null;
    setShowFailureModal: (val: Task | null) => void;
    stats: UserStats;
}

export const ModalManager: React.FC<ModalManagerProps> = ({
    showRankModal,
    setShowRankModal,
    showAchievementModal,
    setShowAchievementModal,
    showFailureModal,
    setShowFailureModal,
    stats
}) => {
    return (
        <>
            {showRankModal.show && showRankModal.rank && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fade-in">
                    <div className="bg-gradient-to-br from-[#1f2933] to-[#0f1419] p-8 rounded-3xl border-2 border-[#f6c453] max-w-sm mx-4 text-center animate-scale-in">
                        <Trophy className="w-16 h-16 mx-auto mb-4 text-[#f6c453] animate-bounce" />
                        <h2 className="text-2xl font-black uppercase mb-2 accent-text">Povýšení!</h2>
                        <p className="text-sm opacity-60 mb-4">Dosáhl jsi nové hodnosti</p>
                        <div className="text-4xl font-black mb-2">{showRankModal.rank.icon}</div>
                        <div className="text-xl font-black uppercase accent-text mb-6">{showRankModal.rank.name}</div>
                        <button
                            onClick={() => setShowRankModal({ show: false, rank: null })}
                            className="px-6 py-3 accent-bg text-[#1f2933] rounded-xl font-black uppercase text-sm"
                        >
                            Pokračovat
                        </button>
                    </div>
                </div>
            )}

            {showAchievementModal && (
                <AchievementModal
                    achievement={showAchievementModal}
                    userName={stats.userName || 'Rekrut'}
                    stats={stats}
                    onClose={() => setShowAchievementModal(null)}
                />
            )}

            {showFailureModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fade-in">
                    <div className="bg-gradient-to-br from-rose-900/40 to-[#1f2933] p-8 rounded-3xl border-2 border-rose-500 max-w-sm mx-4 text-center animate-scale-in">
                        <div className="text-6xl mb-4">💔</div>
                        <h2 className="text-2xl font-black uppercase mb-2 text-rose-400">Mise Selhala</h2>
                        <p className="text-sm mb-2 font-bold">{showFailureModal.title}</p>
                        <p className="text-xs opacity-60 mb-6">Zklamal jsi svou partnerku. Tato šance je navždy pryč.</p>
                        <div className="text-rose-400 font-black text-lg mb-6">-30 XP</div>
                        <button
                            onClick={() => setShowFailureModal(null)}
                            className="px-6 py-3 bg-rose-500/20 text-rose-400 rounded-xl font-black uppercase text-sm border border-rose-500/30"
                        >
                            Rozumím
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
