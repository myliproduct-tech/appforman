

import React, { useState, useEffect } from 'react';
import { VysadekView } from './components/VysadekView';
import { AuthScreen } from './components/AuthScreen';
import { SplashScreen } from './components/layout/SplashScreen';
import { Onboarding } from './components/Onboarding';
import { OnboardingTour } from './components/OnboardingTour';
import { Navigation } from './components/Navigation';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Tab, Task, Achievement, UserStats } from './types';
import { localizeText, getRankBasedOnPoints, getDayIndex, getStartDateFromDue } from './utils';
import { GEAR_CHECKLIST, HOSPITAL_BAG_CHECKLIST, ACHIEVEMENTS } from './constants';
import { RANKS } from './constants';
import { EyeOff, Shield } from 'lucide-react';
import { ONBOARDING_STEPS } from './onboardingSteps';

// Layout Components
import { DevModePanel } from './components/layout/DevModePanel';
import { TabContent } from './components/layout/TabContent';
import { ModalManager } from './components/layout/ModalManager';

// Custom hooks
import { useUserStats } from './hooks/useUserStats';
import { useDevMode } from './hooks/useDevMode';
import { useConsumables } from './hooks/useConsumables';
import { useMissions } from './hooks/useMissions';
import { notificationService } from './services/NotificationService';

const App: React.FC = () => {
    // Auth and Session management
    const [currentUser, setCurrentUser] = useState<string | null>(() => {
        const saved = localStorage.getItem('currentUser');
        /* 
        // Deaktivováno pro testování nové přihlašovací obrazovky
        if (!saved) {
            const adminEmail = 'myli.product@gmail.com';
            localStorage.setItem('currentUser', adminEmail);
            return adminEmail;
        } 
        */
        return saved;
    });

    // UI State
    const [activeTab, setActiveTab] = useState<Tab>('dashboard');
    const [isVysadekMode, setIsVysadekMode] = useState(false);
    const [showRankModal, setShowRankModal] = useState<{ show: boolean, rank: typeof RANKS[0] | null }>({ show: false, rank: null });
    const [achievementQueue, setAchievementQueue] = useState<Achievement[]>([]);
    const [showAchievementModal, setShowAchievementModal] = useState<Achievement | null>(null);
    const [showFailureModal, setShowFailureModal] = useState<Task | null>(null);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [pendingTourAchievements, setPendingTourAchievements] = useState<Achievement[]>([]); // Achievements unlocked during tour
    const [isMissionsLoading, setIsMissionsLoading] = useState(false);
    const [isBooting, setIsBooting] = useState(true);
    const [isTabTransitioning, setIsTabTransitioning] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);
    const isInitialCheckPerformed = React.useRef(false); // Ref to suppress notifications during first load check

    // Achievement Queue Management
    const addToAchievementQueue = React.useCallback((achievement: Achievement) => {
        setAchievementQueue(prev => {
            // Check if already in queue to prevent duplicates
            if (prev.some(a => a.id === achievement.id)) return prev;
            return [...prev, achievement];
        });
    }, []);

    // Show next achievement from queue when modal closes (but NOT during tour)
    useEffect(() => {
        // Don't show achievements during onboarding tour
        if (showOnboarding) return;

        if (!showAchievementModal && achievementQueue.length > 0) {
            // Need a tiny delay to ensure React state batching is finished
            const timer = setTimeout(() => {
                setAchievementQueue(prev => {
                    if (prev.length === 0) return prev;
                    const [next, ...rest] = prev;
                    setShowAchievementModal(next);
                    return rest;
                });
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [showAchievementModal, achievementQueue.length, showOnboarding]);

    // Force close achievement modal when tour starts
    useEffect(() => {
        if (showOnboarding && showAchievementModal) {
            setShowAchievementModal(null);
        }
    }, [showOnboarding, showAchievementModal]);

    // Custom Hooks
    const { stats, setStats, isLoaded } = useUserStats(currentUser);
    const devMode = useDevMode();
    const effectiveDate = devMode.getEffectiveDate(stats.dueDate);

    // Initial boot sequence
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsBooting(false);
        }, 2200);
        return () => clearTimeout(timer);
    }, []);

    // Conditional mobile console (Eruda) loading
    useEffect(() => {
        if (currentUser === 'myli.product@gmail.com') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/eruda';
            script.onload = () => {
                if ((window as any).eruda) {
                    (window as any).eruda.init();
                    console.log('🛠️ Dev Console initialized for admin');
                }
            };
            document.body.appendChild(script);

            return () => {
                // We don't necessarily need to remove it, but we could
            };
        }
    }, [currentUser]);

    // Force disable dev mode if user is not admin
    useEffect(() => {
        if (currentUser !== 'myli.product@gmail.com' && devMode.isDevMode) {
            devMode.setIsDevMode(false);
        }
    }, [currentUser, devMode.isDevMode]);

    // Register Service Worker for PWA
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered:', registration);
                    })
                    .catch(err => {
                        console.log('SW registration failed:', err);
                    });
            });
        }

        // Listen for install prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstallPrompt(true);
        });

        // Detect if already installed
        window.addEventListener('appinstalled', () => {
            setShowInstallPrompt(false);
            setDeferredPrompt(null);
        });
    }, []);

    // Handle PWA install
    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        }

        setDeferredPrompt(null);
        setShowInstallPrompt(false);
    };

    // Audio unlock for mobile browsers
    useEffect(() => {
        let unlocked = false;

        const unlockAudio = () => {
            if (unlocked) return;

            // Create and play silent audio to unlock audio context on mobile
            const silentAudio = new Audio();
            silentAudio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADhAC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAAA4T/jRkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+xBkAA/wAABpAAAACAAADSAAAAATEFT0pdAAAH0AAACwAAAAETEFT0pdgAAB9AAALAABhAFT0pdgAAH0AAAsAAGEAVPSl2AAAH0AAAwAAYQBU9KXQAAAfQAACwAAYQBU9KYQAAB9AAALAABhAFT0pdAAAH0AAAsAAGEAVNSl0AAAfQAACwAAYQBU1KXQAAUAAALAABhAFTUpdAAABQAAAsAAGEAVNSl0AAAFAAACwAAYQBU1KXQAAAUAAALAABhAFTUpdAAAFAAACwAAYQBU1KXQAAAUAAALAAA';
            silentAudio.play().then(() => {
                console.log('🔊 Audio unlocked for mobile');
                unlocked = true;
            }).catch(() => {
                // Ignore errors - audio will unlock on next interaction
            });

            // Remove listeners after first unlock
            document.removeEventListener('touchstart', unlockAudio);
            document.removeEventListener('click', unlockAudio);
        };

        // Listen for first user interaction
        document.addEventListener('touchstart', unlockAudio, { once: true });
        document.addEventListener('click', unlockAudio, { once: true });

        return () => {
            document.removeEventListener('touchstart', unlockAudio);
            document.removeEventListener('click', unlockAudio);
        };
    }, []);


    // Tab transition handler
    const handleTabChange = (tab: Tab) => {
        if (tab === activeTab) return;
        setIsTabTransitioning(true);
        setActiveTab(tab);
        setTimeout(() => {
            setIsTabTransitioning(false);
        }, 800); // Increased tactical delay for visibility
    };

    // Night Mode State
    const [nightMode, setNightMode] = useState<boolean>(() => {
        const saved = localStorage.getItem('nightMode');
        return saved ? JSON.parse(saved) : false;
    });

    // Sync dayOffset with real calendar progress when NOT in dev mode
    useEffect(() => {
        if (!devMode.isDevMode && stats.dueDate) {
            const updateDayIndex = () => {
                const startDate = getStartDateFromDue(stats.dueDate);
                const realDayIndex = getDayIndex(startDate);

                if (realDayIndex !== devMode.dayOffset) {
                    console.log(`🕒 Time sync: Day ${devMode.dayOffset} -> ${realDayIndex}`);
                    devMode.setDayOffset(realDayIndex);
                }
            };

            // Run immediately
            updateDayIndex();

            // Periodic check (every 30 seconds should be enough to catch midnight without overhead)
            const interval = setInterval(updateDayIndex, 30000);
            return () => clearInterval(interval);
        }
    }, [devMode.isDevMode, stats.dueDate, devMode.dayOffset]);

    // Save nightMode to localStorage
    useEffect(() => {
        localStorage.setItem('nightMode', JSON.stringify(nightMode));
    }, [nightMode]);

    const currentDayIndex = devMode.dayOffset;
    const currentWeekCount = devMode.currentWeek;

    // Achievement unlock handler - save during tour, show after
    const handleAchievementUnlock = React.useCallback((achievement: Achievement | null) => {
        if (!achievement) return;

        // If onboarding not completed yet, save for later (even if tour hasn't started)
        if (!stats.onboardingCompleted) {
            setPendingTourAchievements(prev => {
                if (prev.some(a => a.id === achievement.id)) return prev;
                return [...prev, achievement];
            });
            return;
        }

        // Otherwise show immediately (unless it's the initial bulk check during load)
        if (isInitialCheckPerformed.current) {
            addToAchievementQueue(achievement);
        } else {
            // During boot/sync, we just update the badges list silently
            // (The badges are added to stats in checkAchievements, we just don't want the modal)
            console.log(`🎖️ Silently unlocked existing achievement: ${achievement.id}`);
        }
    }, [stats.onboardingCompleted, addToAchievementQueue]);

    // Consumables & Missions hooks
    const consumables = useConsumables(stats, setStats, effectiveDate);
    const missions = useMissions(
        stats,
        setStats,
        effectiveDate,
        currentDayIndex,
        setShowRankModal,
        handleAchievementUnlock,
        setShowFailureModal
    );

    // Sync missed missions when day changes or when switching tabs
    useEffect(() => {
        if (!currentUser) return;
        const failedRestored = missions.syncMissedMissions(currentDayIndex);
        if (failedRestored) {
            setShowFailureModal(failedRestored);
        }

        // Notify about new missions if enabled
        if (stats.notificationsEnabled) {
            notificationService.send(
                '📍 Nový den, nové rozkazy',
                'Máš k dispozici nové denní mise. Podívej se na Briefing!'
            );
        }
    }, [currentDayIndex, currentUser, activeTab]);

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
    };

    useEffect(() => {
        if (stats.email && !stats.nightWatchTriggered) {
            const hour = new Date().getHours();
            if (hour >= 0 && hour < 4) {
                setStats(prev => {
                    const newStats = { ...prev, nightWatchTriggered: true };
                    const { updatedStats, newUnlocks } = missions.checkAchievements(newStats);
                    setStats(updatedStats);
                    newUnlocks.forEach(ach => handleAchievementUnlock(ach));
                    return updatedStats;
                });
            }
        }
    }, [stats.email, stats.nightWatchTriggered, showOnboarding, missions.checkAchievements, handleAchievementUnlock]);



    // Check for new achievements when stats change (but not during onboarding)
    // Centralized check - runs whenever points, history or time (week) change
    useEffect(() => {
        if (stats.userName && stats.email && isLoaded) {
            const { updatedStats, newUnlocks } = missions.checkAchievements(stats, currentWeekCount);

            if (newUnlocks.length > 0) {
                // Determine if we should show modals
                // If it's the very first time we check after isLoaded=true, we skip notifications
                const shouldNotify = isInitialCheckPerformed.current;

                setStats(updatedStats);

                if (shouldNotify) {
                    newUnlocks.forEach(ach => handleAchievementUnlock(ach));
                } else {
                    console.log('🛡️ Suppressed initial achievement notifications during sync');
                }
            }

            // Mark initial check as done AFTER the first run when data is loaded
            if (!isInitialCheckPerformed.current) {
                // Small tactical delay to ensure initial state settle
                setTimeout(() => {
                    isInitialCheckPerformed.current = true;
                    console.log('🚀 Achievement monitoring active (silent initialization phase finished)');
                }, 1000);
            }
        }
    }, [
        isLoaded, // Dependency added to ensure we wait for data
        stats.points,
        stats.missionHistory.length,
        stats.badges.length,
        stats.speedBuildScores,
        (stats.manualEntriesRead || []).length,
        stats.soundIDStats,
        stats.email,
        currentWeekCount,
        showOnboarding,
        stats.babyNames,
        stats.iceCardViewed,
        stats.emergencyProtocolsViewed,
        stats.firstKickDetected,
        stats.hospitalBagChecklist,
        stats.gearChecklist,
        stats.backupContacts,
        stats.manualViewsCount,
        stats.customMissions,
        stats.budgetPlan,
        stats.vehicleConfirmed,
        stats.completedTasks.length,
        stats.onboardingFinished,
        stats.streak,
        stats.customGear,
        stats.nightWatchTriggered,
        missions.checkAchievements,
        handleAchievementUnlock
    ]);

    // Onboarding tour handlers
    useEffect(() => {
        if (stats.email && !stats.onboardingCompleted) {
            const timer = setTimeout(() => setShowOnboarding(true), 500);
            return () => clearTimeout(timer);
        }
    }, [stats.email, stats.onboardingCompleted]);

    const handleCompleteTour = () => {
        setStats(prev => {
            const newStats = { ...prev, onboardingCompleted: true, onboardingFinished: true };
            const { updatedStats, newUnlocks } = missions.checkAchievements(newStats);
            newUnlocks.forEach(ach => addToAchievementQueue(ach));
            return updatedStats;
        });
        setShowOnboarding(false);

        // Show all achievements that were unlocked during tour
        setTimeout(() => {
            pendingTourAchievements.forEach(ach => addToAchievementQueue(ach));
            setPendingTourAchievements([]); // Clear pending
        }, 200); // Small delay to ensure tour is fully closed
    };

    const handleSkipTour = () => {
        // Skip tour without giving achievement - only mark as completed to hide it
        setStats(prev => ({ ...prev, onboardingCompleted: true, onboardingFinished: false }));
        setShowOnboarding(false);

        // Still show pending achievements even if tour was skipped
        setTimeout(() => {
            pendingTourAchievements.forEach(ach => addToAchievementQueue(ach));
            setPendingTourAchievements([]);
        }, 200);
    };

    const handleRestartTour = () => {
        setActiveTab('dashboard');
        // Clear any pending achievements from previous tour run
        setPendingTourAchievements([]);
        setShowOnboarding(true);
    };

    // Simulate loading only when switching to Missions tab
    useEffect(() => {
        if (activeTab === 'missions') {
            setIsMissionsLoading(true);
            const timer = setTimeout(() => setIsMissionsLoading(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [activeTab]);

    // Dev tools handlers
    const handleCompleteAllGear = () => {
        const allIds = GEAR_CHECKLIST.flatMap(c => c.items.map(i => i.id));
        setStats(prev => ({ ...prev, gearChecklist: allIds }));
    };

    const handleCompleteAllHospitalBag = () => {
        const allIds = HOSPITAL_BAG_CHECKLIST.flatMap(c => c.items.map(i => i.id));
        setStats(prev => {
            const newStats = { ...prev, hospitalBagChecklist: allIds };
            const { updatedStats, newUnlocks } = missions.checkAchievements(newStats);
            newUnlocks.forEach(ach => addToAchievementQueue(ach));
            return updatedStats;
        });
    };

    const handleResetAllGear = () => {
        setStats(prev => ({ ...prev, gearChecklist: [] }));
    };

    const handleResetAllHospitalBag = () => {
        setStats(prev => ({ ...prev, hospitalBagChecklist: [] }));
    };

    if (isBooting || (currentUser && !isLoaded)) {
        return <SplashScreen />;
    }


    // Auth screen check
    if (!currentUser) {
        return (
            <AuthScreen
                onLogin={(email) => {
                    localStorage.setItem('currentUser', email);
                    setCurrentUser(email);
                }}
            />
        );
    }

    // Onboarding process check
    const isDueDateValid = stats.dueDate ? !isNaN(new Date(stats.dueDate).getTime()) : false;
    if (!stats.userName || !stats.partnerName || !stats.dueDate || !isDueDateValid) {
        return (
            <Onboarding
                onComplete={(name, dueDate, partnerName) => {
                    // Calculate initial day index based on due date using centralized utility
                    const startDate = getStartDateFromDue(dueDate);
                    const initialDayIndex = getDayIndex(startDate);

                    setStats(prev => ({
                        ...prev,
                        userName: name,
                        partnerName: partnerName,
                        dueDate: dueDate,
                        lastProcessedDayIndex: initialDayIndex, // Start tracking from today
                    }));

                    // Also sync devMode state
                    devMode.setDayOffset(initialDayIndex);
                }}
            />
        );
    }

    return (
        <div className={`min-h-screen bg-[#1f2933] text-white ${nightMode ? 'night-vision-mode' : ''} ${devMode.isDevMode ? 'dev-mode-selection' : ''} pb-20`}>
            {/* 1. Dev Mode Panel - Admin Only */}
            {currentUser === 'myli.product@gmail.com' && (
                <DevModePanel
                    isDevMode={devMode.isDevMode}
                    dayOffset={devMode.dayOffset}
                    setDayOffset={devMode.setDayOffset}
                    setIsDevMode={devMode.setIsDevMode}
                    stats={stats}
                    setStats={setStats}
                    onRankUp={(rank) => setShowRankModal({ show: true, rank })}
                    onAchievementUnlock={setShowAchievementModal}
                    checkAchievements={missions.checkAchievements}
                />
            )}

            {/* 2. Main Content Tabs */}
            <TabContent
                activeTab={activeTab}
                stats={stats}
                setStats={setStats}
                currentWeekCount={currentWeekCount}
                currentDayIndex={currentDayIndex}
                effectiveDate={effectiveDate}
                devMode={devMode}
                isMissionsLoading={isMissionsLoading || isTabTransitioning}
                missions={missions}
                consumables={consumables}
                handleCompleteAllHospitalBag={handleCompleteAllHospitalBag}
                handleResetAllHospitalBag={handleResetAllHospitalBag}
                handleResetAllGear={handleResetAllGear}
                handleCompleteAllGear={handleCompleteAllGear}
                setActiveTab={handleTabChange}
                setIsVysadekMode={setIsVysadekMode}
                setShowAchievementModal={setShowAchievementModal}
            />

            {/* 3. Navigation Bar */}
            <Navigation
                activeTab={activeTab}
                setActiveTab={handleTabChange}
                onLogout={handleLogout}
                onOpenVysadek={() => setIsVysadekMode(true)}
                soundEnabled={stats.soundEnabled || false}
                onToggleSound={(enabled) => setStats(prev => ({ ...prev, soundEnabled: enabled }))}
                notificationsEnabled={stats.notificationsEnabled || false}
                onToggleNotifications={(enabled) => setStats(prev => ({ ...prev, notificationsEnabled: enabled }))}
                nightMode={nightMode}
                onToggleNightMode={setNightMode}
                dueDate={stats.dueDate}
                onUpdateDueDate={(date) => setStats(prev => ({ ...prev, dueDate: date }))}
                onDeleteAllData={() => {
                    if (confirm('Opravdu chceš smazat všechna data? Tato akce je nevratná!')) {
                        localStorage.clear();
                        window.location.reload();
                    }
                }}
                onRestartTour={handleRestartTour}
            />

            {/* 4. Modal Overlays */}
            <ModalManager
                showRankModal={showRankModal}
                setShowRankModal={setShowRankModal}
                showAchievementModal={showAchievementModal}
                setShowAchievementModal={setShowAchievementModal}
                showFailureModal={showFailureModal}
                setShowFailureModal={setShowFailureModal}
                stats={stats}
            />

            {/* 5. Onboarding Tutorial */}
            {showOnboarding && (
                <OnboardingTour
                    steps={ONBOARDING_STEPS}
                    partnerName={stats.partnerName}
                    onComplete={handleCompleteTour}
                    onSkip={handleSkipTour}
                    onNavigate={setActiveTab}
                />
            )}

            {/* 6. PWA Install Prompt */}
            {showInstallPrompt && (
                <div className="fixed bottom-24 left-4 right-4 mx-auto max-w-md z-50 animate-slide-up">
                    <div className="bg-gradient-to-br from-[#f6c453]/10 via-slate-500/5 to-slate-500/10 border-2 border-[#f6c453]/30 rounded-2xl p-4 shadow-2xl backdrop-blur-lg">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-[#f6c453]/10 rounded-lg">
                                <Shield className="w-6 h-6 text-[#f6c453]" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-black uppercase text-[#f6c453] mb-1">Přidat na plochu</h3>
                                <p className="text-xs text-white/70 mb-3">Nainstaluj aplikaci pro rychlý přístup a offline režim</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleInstallClick}
                                        className="flex-1 bg-[#f6c453] text-[#1f2933] py-2 px-4 rounded-lg font-bold text-xs uppercase hover:bg-[#ffcf60] transition-all active:scale-95"
                                    >
                                        Instalovat
                                    </button>
                                    <button
                                        onClick={() => setShowInstallPrompt(false)}
                                        className="px-4 py-2 bg-white/10 text-white rounded-lg font-bold text-xs uppercase hover:bg-white/20 transition-all"
                                    >
                                        Později
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 7. Hidden Dev Trigger - Admin Only */}
            {currentUser === 'myli.product@gmail.com' && !devMode.isDevMode && (
                <button
                    onClick={() => devMode.setIsDevMode(true)}
                    className="fixed top-4 right-4 opacity-0 hover:opacity-100 transition-opacity z-50"
                >
                    <EyeOff className="w-4 h-4 text-yellow-400" />
                </button>
            )}

            {/* 7. Special Vysadek Mode */}
            <VysadekOverlay
                isVysadekMode={isVysadekMode}
                stats={stats}
                setStats={setStats}
                onExit={() => setIsVysadekMode(false)}
            />

            <style>{`
                @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .animate-spin-slow { animation: spin-slow 8s linear infinite; }
                
                /* Night Vision Mode */
                .night-vision-mode {
                    /* Toto změní barvy na červené/oranžové */
                    filter: sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.9) brightness(0.8);
                    background-color: #000 !important;
                }
                /* Toto přebarví zvýrazněné texty (zlaté) na sytě červenou */
                .night-vision-mode .accent-text, 
                .night-vision-mode .text-\\[\\#f6c453\\] {
                    color: #ff3300 !important;
                }
                .night-vision-mode .accent-bg {
                    background-color: #ff3300 !important;
                }
            `}</style>
        </div>
    );
};

const VysadekOverlay: React.FC<{
    isVysadekMode: boolean;
    stats: UserStats;
    setStats: React.Dispatch<React.SetStateAction<UserStats>>;
    onExit: () => void;
}> = ({ isVysadekMode, stats, setStats, onExit }) => {
    if (!isVysadekMode) return null;
    return (
        <VysadekView
            partnerName={stats.partnerName}
            hospitalTarget={stats.hospitalTarget}
            amnioticFluidLog={stats.amnioticFluidLog}
            partnerPhone={stats.partnerPhone}
            pediatricianContact={stats.pediatricianContact}
            backupContacts={stats.backupContacts}
            stats={stats}
            onLogAmnioticFluid={(color) => setStats(prev => ({
                ...prev,
                amnioticFluidLog: { time: new Date().toISOString(), color }
            }))}
            onExit={onExit}
        />
    );
};

export default App;
