import React, { useEffect } from 'react';
import { UserStats } from '../types';
import { PREGNANCY_STAGES, BABY_SIZES, RANKS, WEEKLY_INTEL, PARTNER_RECON, DESERTER_RANK } from '../constants';
import { Flame, Target, Trophy, Activity, Dna, X, ChevronRight, FileText, AlertTriangle, Shield } from 'lucide-react';

import { localizeText, getRankBasedOnPoints } from '../utils';
import { useDashboardReducer } from '../hooks/useDashboardReducer';
import { Modal } from './common/Modal';

interface DashboardProps {
  stats: UserStats;
  currentWeek: number;
  effectiveDate: string;
  onNavigateMissions: () => void;
  onNavigateAchievements: () => void;
  onToggleDevMode?: () => void;
  onActivateVysadek?: () => void;
  isDevMode?: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats, currentWeek, effectiveDate, onNavigateMissions, onNavigateAchievements, onToggleDevMode, onActivateVysadek, isDevMode }) => {
  // Use reducer for modal state management
  const { state, dispatch } = useDashboardReducer();
  const { showIntelModal, showMissionModal } = state.modals;

  // Play sonar sound when Vysadek button appears (week 36+) and user hasn't clicked it yet
  useEffect(() => {
    if (currentWeek >= 36 && !stats.vysadekClicked && stats.soundEnabled) {
      // Small delay to ensure audio context is unlocked (especially on mobile)
      const timeout = setTimeout(() => {
        import('../utils/soundUtils').then(({ playSound }) => {
          playSound('sonar.wav');
        });
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [currentWeek, stats.vysadekClicked, stats.soundEnabled]);

  const currentMilestone = PREGNANCY_STAGES.find(s => currentWeek <= s.week) || PREGNANCY_STAGES[PREGNANCY_STAGES.length - 1];
  const progress = Math.min(100, (currentWeek / 40) * 100);

  const sizeKeys = Object.keys(BABY_SIZES).map(Number).sort((a, b) => b - a);
  const sizeInfo = BABY_SIZES[sizeKeys.find(k => currentWeek >= k) || 4];

  // No longer need IconComponent mapping for emoji

  // Localize milestone text
  const localizedMilestone = localizeText(currentMilestone.milestone, stats.partnerName);
  const localizedDescription = localizeText(currentMilestone.description, stats.partnerName);

  // DESERTER LOGIC
  const checkDeserterStatus = () => {
    try {
      // 0. Safeguard: If no successful missions in history, you can't be a deserter
      const successfulMissions = stats.missionHistory.filter(m => !m.failed);
      if (successfulMissions.length === 0) return false;

      // 1. Determine "Last Activity Date" - use successful missions OR manually failed missions
      // Auto-failed missions (manualFail === false) don't count as activity
      const activeMissions = stats.missionHistory.filter(m => !m.failed || m.manualFail === true);
      const lastActiveMission = activeMissions[0]; // missionHistory is newest first

      let lastDate: Date;
      if (lastActiveMission && lastActiveMission.completedDate) {
        lastDate = new Date(lastActiveMission.completedDate);
        // Validate the date
        if (isNaN(lastDate.getTime())) {
          console.warn('Invalid completedDate in last active mission:', lastActiveMission.completedDate);
          lastDate = new Date(); // Fallback to now
        }
      } else {
        // Fallback to account creation date
        lastDate = stats.accountCreated ? new Date(stats.accountCreated) : new Date();
      }

      // 2. Use effectiveDate (simulated) vs last mission date
      // Normalize both to start of day for accurate full-day difference
      const simulatedNow = new Date(effectiveDate);
      if (isNaN(simulatedNow.getTime())) {
        console.warn('Invalid effectiveDate:', effectiveDate);
        return false; // Can't determine deserter status with invalid date
      }
      simulatedNow.setHours(0, 0, 0, 0);

      const activityDate = new Date(lastDate);
      activityDate.setHours(0, 0, 0, 0);

      // Calculate difference in days
      const diffTime = simulatedNow.getTime() - activityDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      // DEBUG: Log deserter check
      console.log('🔍 DESERTER CHECK:', {
        effectiveDate,
        lastActiveMissionDate: lastActiveMission?.completedDate,
        lastActiveMissionManualFail: lastActiveMission?.manualFail,
        lastDate: lastDate.toISOString(),
        simulatedNow: simulatedNow.toISOString(),
        activityDate: activityDate.toISOString(),
        diffDays,
        isDeserter: diffDays >= 7,
        totalMissions: stats.missionHistory.length,
        successfulMissions: successfulMissions.length,
        activeMissions: activeMissions.length
      });

      // 3. Threshold: >= 7 days of inactivity (8th day of nothing)
      return diffDays >= 7;
    } catch (error) {
      console.error('Error in checkDeserterStatus:', error);
      return false; // Safe fallback
    }
  };

  const isDeserter = checkDeserterStatus();



  // Get current Rank Info (Override if Deserter)
  const realRank = getRankBasedOnPoints(stats.points);
  const currentRank = isDeserter ? DESERTER_RANK : realRank;

  // Calculate Progress to next rank
  const nextRank = RANKS.find(r => r.level === realRank.level + 1); // Use real rank for progress calc
  const prevRankPoints = realRank.minPoints;
  const nextRankPoints = nextRank ? nextRank.minPoints : 10000;

  const rankProgressPercent = nextRank
    ? Math.min(100, Math.max(0, ((stats.points - prevRankPoints) / (nextRankPoints - prevRankPoints)) * 100))
    : 100;

  return (
    <div className="space-y-6 pb-8">
      {/* Enhanced Header - Simplified to Yellow/Slate */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#f6c453]/10 via-slate-500/5 to-slate-500/10 border border-[#f6c453]/20 p-6 shadow-lg shadow-[#f6c453]/5 group">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2Y2YzQ1MyIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30 group-hover:opacity-40 transition-opacity"></div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#f6c453]/10 rounded-xl backdrop-blur-sm group-hover:scale-110 group-hover:rotate-3 transition-transform">
              <Shield className="w-6 h-6 text-[#f6c453]" />
            </div>
            <div>
              <h2 className="text-2xl font-black italic uppercase accent-text tracking-tight inline-block pr-3 group-hover:translate-x-1 transition-transform">
                Centrum Velení
              </h2>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                Operace Probíhá • Týden {currentWeek}
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Streak Badge */}
        <div className="bg-white/5 p-4 rounded-3xl border border-white/5 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:bg-[#f6c453]/5 hover:border-[#f6c453]/20 transition-all duration-300 animate-glow-gold tap-effect card-tactical" data-tour="streak">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-[#f6c453]/10 rounded-lg group-hover:scale-110 group-hover:rotate-12 transition-transform">
              <Flame className="w-4 h-4 fill-[#f6c453] text-[#f6c453]" />
            </div>
            <span className="text-[9px] uppercase font-black opacity-40 tracking-widest group-hover:opacity-60 transition-opacity">Streak</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black accent-text italic group-hover:scale-110 transition-transform inline-block origin-left">{stats.streak}</span>
            <span className="text-[10px] font-bold opacity-30 uppercase">Dní</span>
          </div>
        </div>

        {/* Intel Report - Moved next to streak */}
        <div
          onClick={() => dispatch({ type: 'SET_INTEL_MODAL', value: true })}
          className="bg-white/5 p-4 rounded-3xl border border-white/5 flex flex-col justify-between shadow-lg relative overflow-hidden cursor-pointer active:scale-95 transition-all group hover:bg-[#f6c453]/5 hover:border-[#f6c453]/20 tap-effect card-tactical"
          data-tour="intel"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-[#f6c453]/10 rounded-lg group-hover:scale-110 transition-transform">
              <Dna className="w-4 h-4 text-[#f6c453]" />
            </div>
            <span className="text-[9px] uppercase font-black opacity-40 tracking-widest group-hover:opacity-60 transition-opacity">Intel</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-tight accent-text">Týden {currentWeek}</span>
            <ChevronRight className="w-3 h-3 text-[#f6c453] opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>

      {currentWeek >= 36 && (
        <button
          className="w-full bg-rose-600 hover:bg-rose-500 text-white font-black py-5 rounded-[2rem] shadow-[0_0_20px_rgba(225,29,72,0.4)] mb-4 flex items-center justify-center gap-3 animate-pulse active:scale-95 transition-all text-sm uppercase tracking-[0.2em] border-2 border-rose-400/30"
          onClick={onActivateVysadek}
        >
          <AlertTriangle className="w-5 h-5 text-white animate-bounce" />
          <span>VÝSADEK (RODÍME)</span>
          <AlertTriangle className="w-5 h-5 text-white animate-bounce" />
        </button>
      )}

      <button
        onClick={onNavigateAchievements}
        className={`w-full text-left glass-card p-6 rounded-[2.5rem] relative overflow-hidden group transition-all duration-500 hover:bg-white/5 active:scale-[0.98] animate-glow-gold tap-effect card-tactical ${isDeserter ? 'border-red-500/50 shadow-[0_0_30px_rgba(220,38,38,0.2)] bg-red-900/10' : ''}`}
        data-tour="rank-card"
      >
        {isDeserter ? (
          <div className="absolute top-0 right-0 w-40 h-40 bg-red-500 opacity-[0.1] rounded-full blur-3xl -mr-16 -mt-16 animate-pulse"></div>
        ) : (
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#f6c453] opacity-[0.03] rounded-full blur-3xl -mr-16 -mt-16 group-hover:opacity-[0.07] transition-opacity"></div>
        )}

        <div className="flex justify-between items-start mb-6">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider border ${isDeserter ? 'bg-red-500/20 text-red-500 border-red-500/30' : 'bg-[#f6c453]/10 text-[#f6c453] border-[#f6c453]/20'}`}>
                {isDeserter ? 'DEGRADACE' : `Level ${currentRank.level}`}
              </span>
            </div>
            <h3 className={`text-xl font-black italic tracking-tight uppercase leading-none mb-2 ${isDeserter ? 'text-red-500' : 'accent-text'}`}>
              {currentRank.name}
            </h3>
            <p className={`text-[10px] leading-relaxed font-medium ${isDeserter ? 'text-red-200/60' : 'opacity-60'}`}>
              {currentRank.status}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className={`p-3 rounded-2xl border flex flex-col items-center justify-center min-w-[60px] ${isDeserter ? 'bg-red-500/10 border-red-500/20' : 'bg-white/5 border-white/5'}`}>
              {isDeserter ? <AlertTriangle className="w-6 h-6 text-red-500 mb-1 animate-bounce" /> : <Trophy className="w-6 h-6 accent-text opacity-80 mb-1" />}
              <span className={`text-[10px] font-black ${isDeserter ? 'text-red-500' : 'opacity-50'}`}>{stats.points} XP</span>
            </div>
            <ChevronRight className="w-5 h-5 accent-text opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Progress Bar for Rank */}
        <div className="space-y-1">
          <div className={`flex justify-between text-[10px] font-black uppercase tracking-wider ${isDeserter ? 'text-red-500/50' : 'opacity-30'}`}>
            <span>{realRank.minPoints} XP</span>
            <span>{nextRank ? `${nextRank.minPoints} XP` : 'MAX'}</span>
          </div>
          <div className={`w-full h-3 rounded-full p-0.5 border overflow-hidden ${isDeserter ? 'bg-red-900/20 border-red-500/20' : 'bg-white/5 border-white/5'}`}>
            <div
              className={`h-full rounded-full transition-all duration-1000 ${isDeserter ? 'bg-red-500 w-full animate-pulse' : 'gold-shimmer'}`}
              style={{ width: isDeserter ? '100%' : `${rankProgressPercent}% ` }}
            />
          </div>
        </div>
      </button>


      {/* INTEL MODAL */}
      <Modal
        isOpen={showIntelModal}
        onClose={() => dispatch({ type: 'SET_INTEL_MODAL', value: false })}
        title={`Protokol: Týden ${currentWeek}`}
        subtitle="Top Secret Level 5"
        color="#f6c453"
        footer={
          <button
            onClick={() => dispatch({ type: 'SET_INTEL_MODAL', value: false })}
            className="w-full py-4 mt-6 bg-[#f6c453] text-[#1f2933] font-black uppercase tracking-widest text-xs rounded-xl hover:bg-[#ffcf60] active:scale-95 transition-all"
          >
            Potvrdit přijetí zprávy
          </button>
        }
      >
        <div className="space-y-4">
          {(WEEKLY_INTEL[currentWeek] || "Data corrupted.").split('\n').filter(line => line.trim().length > 0).map((line, i) => (
            <div key={i} className="flex gap-3 text-[#f5f7fa]">
              <span className="text-[#f6c453]/50 font-mono text-xs pt-1">{'>>'}</span>
              <p className="text-sm leading-relaxed font-medium opacity-90">{line}</p>
            </div>
          ))}
        </div>
      </Modal>

      <div className="grid grid-cols-2 gap-4 animate-slide-up">
        <div className="glass-card p-5 rounded-[2rem] border-white/5 relative overflow-hidden flex flex-col justify-between tap-effect card-tactical">
          <div className="text-3xl mb-3">
            {sizeInfo.emoji}
          </div>
          <div>
            <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.15em] mb-1">Jednotka: Junior</p>
            <p className="font-bold text-[#f5f7fa] text-lg leading-tight">{sizeInfo.name}</p>
          </div>
        </div>
        <button
          onClick={onNavigateMissions}
          className="glass-card p-5 rounded-[2rem] border-white/5 relative overflow-hidden flex flex-col justify-between text-left hover:bg-white/5 transition-all group active:scale-95 tap-effect card-tactical"
          data-tour="missions-dashboard-link"
        >
          <div className="flex justify-between items-start mb-3">
            <Target className="w-8 h-8 accent-text opacity-40 group-hover:opacity-100 transition-opacity" />
            <ChevronRight className="w-5 h-5 accent-text opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.15em] mb-1">Mise Splněny</p>
            <p className="font-bold text-[#f5f7fa] text-lg">{stats.completedTasks.length}</p>
          </div>
        </button>
      </div>

      <section
        onClick={() => dispatch({ type: 'SET_MISSION_MODAL', value: true })}
        className={`glass-card p-7 rounded-[2.5rem] border-white/5 cursor-pointer active:scale-95 transition-all group relative overflow-hidden tap-effect card-tactical animate-slide-up ${isDeserter ? 'border-red-500/50 shadow-[0_0_30px_rgba(220,38,38,0.2)]' : ''}`}
      >
        {isDeserter && <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none"></div>}

        <div className="flex justify-between items-end mb-5 px-1 relative z-10">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Průběh Mise</h2>
          <span className="accent-text font-black text-4xl italic tracking-tighter leading-none flex items-center gap-2">
            {currentWeek}<span className="text-xl">. týden</span>
            <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-[#f6c453]" />
          </span>
        </div>
        <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden border border-white/5 relative z-10">
          <div
            className={`h-full transition-all duration-1000 ease-out ${isDeserter ? 'bg-red-500' : 'accent-bg'}`}
            style={{ width: `${Math.min(progress, 100)}% ` }}
          />
        </div>
        <div className="mt-6 flex gap-4 items-start relative z-10">
          {isDeserter ? <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 animate-bounce" /> : <Activity className="w-5 h-5 accent-text opacity-40 shrink-0" />}

          <div className="space-y-1">
            <p className={`text-sm leading-tight font-black uppercase italic tracking-wide ${isDeserter ? 'text-red-500' : 'text-[#f5f7fa]'}`}>
              {isDeserter ? 'KRITICKÉ SELHÁNÍ: DEZERCE' : localizedMilestone}
            </p>
            <p className="text-[#f5f7fa] text-xs opacity-50 font-medium">
              {isDeserter ? 'Okamžitě se vrať k plnění povinností!' : localizedDescription}
            </p>
          </div>
        </div>
      </section>

      {/* MISSION MODAL */}
      <Modal
        isOpen={showMissionModal}
        onClose={() => dispatch({ type: 'SET_MISSION_MODAL', value: false })}
        title={isDeserter ? 'JSI DEZERTÉR!' : `Týden ${currentWeek}`}
        subtitle={isDeserter ? 'Vojenský Soud' : 'Taktické Hlášení'}
        color={isDeserter ? '#ef4444' : '#f6c453'}
        footer={
          <button
            onClick={() => dispatch({ type: 'SET_MISSION_MODAL', value: false })}
            className={`w-full py-4 mt-6 text-[#1f2933] font-black uppercase tracking-widest text-xs rounded-xl active:scale-95 transition-all ${isDeserter ? 'bg-red-500 hover:bg-red-400' : 'bg-[#f6c453] hover:bg-[#ffcf60]'}`}
          >
            {isDeserter ? 'Rozkaz, pane!' : 'Rozumím'}
          </button>
        }
      >
        <div className="space-y-6">
          {isDeserter ? (
            <div className="text-center space-y-4">
              <p className="text-red-400 font-bold uppercase tracking-widest text-sm">Porušení přísahy</p>
              <p className="text-white/80">
                Vojáku, tvá neaktivita ohrožuje morálku celé jednotky. Už 7 dní jsi nesplnil žádný rozkaz.
                Tvá hodnost byla degradována.
              </p>
              <p className="text-white font-black uppercase">
                PRO OBNOVENÍ HODNOSTI OKAMŽITĚ SPLŇ MISI!
              </p>
            </div>
          ) : (
            (PARTNER_RECON[currentWeek] || PARTNER_RECON[40] || "Data missing").split('\n').map((line, i) => {
              if (line.trim().length === 0) return null;
              const isHeader = line.startsWith('-');

              return (
                <div key={i} className={`text-[#f5f7fa] ${isHeader ? 'pl-0 mt-4' : 'pl-4'}`}>
                  {isHeader ? (
                    <p className="text-[#f6c453] font-black uppercase text-[10px] tracking-widest mb-1 opacity-80">
                      {line.replace('-', '').trim().split(':')[0]}
                    </p>
                  ) : null}
                  <p className={`text-sm leading-relaxed font-medium ${isHeader ? 'text-white' : 'opacity-80'}`}>
                    {isHeader ? line.split(':')[1] : line}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </Modal>
    </div>
  );
};
