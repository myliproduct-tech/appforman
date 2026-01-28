import React from 'react';
import { Dashboard } from '../Dashboard';
import { Missions } from '../Missions';
import { Recon } from '../Recon';
import { Budget } from '../Budget';
import { Extra } from '../Extra';
import { Achievements } from '../Achievements';
import { DashboardSkeleton } from '../dashboard/DashboardSkeleton';
import { ReconSkeleton } from '../recon/ReconSkeleton';
import { BudgetSkeleton } from '../budget/BudgetSkeleton';
import { MissionSkeleton } from '../missions/MissionSkeleton';
import { Tab, UserStats } from '../../types';
import { ErrorBoundary } from '../common/ErrorBoundary';

interface TabContentProps {
    activeTab: Tab;
    stats: UserStats;
    setStats: React.Dispatch<React.SetStateAction<UserStats>>;
    currentWeekCount: number;
    currentDayIndex: number;
    effectiveDate: string;
    devMode: any;
    isMissionsLoading: boolean;
    missions: any;
    consumables: any;
    handleCompleteAllHospitalBag: () => void;
    handleResetAllHospitalBag: () => void;
    handleResetAllGear: () => void;
    handleCompleteAllGear: () => void;
    setActiveTab: (tab: Tab) => void;
    setIsVysadekMode: (val: boolean) => void;
    setShowAchievementModal: (achievement: any) => void;
}

export const TabContent: React.FC<TabContentProps> = ({
    activeTab,
    stats,
    setStats,
    currentWeekCount,
    currentDayIndex,
    effectiveDate,
    devMode,
    isMissionsLoading,
    missions,
    consumables,
    handleCompleteAllHospitalBag,
    handleResetAllHospitalBag,
    handleResetAllGear,
    handleCompleteAllGear,
    setActiveTab,
    setIsVysadekMode,
    setShowAchievementModal
}) => {
    return (
        <main className="max-w-md mx-auto px-4 pt-6">
            {activeTab === 'dashboard' && (
                <ErrorBoundary sectionName="Dashboard">
                    {isMissionsLoading ? (
                        <DashboardSkeleton />
                    ) : (
                        <Dashboard
                            stats={stats}
                            currentWeek={currentWeekCount}
                            onToggleDevMode={() => devMode.setIsDevMode(!devMode.isDevMode)}
                            onActivateVysadek={() => {
                                setIsVysadekMode(true);
                                setStats(prev => ({ ...prev, vysadekClicked: true }));
                            }}
                            onNavigateMissions={() => setActiveTab('missions')}
                            onNavigateAchievements={() => setActiveTab('achievements')}
                            isDevMode={devMode.isDevMode}
                            effectiveDate={effectiveDate}
                        />
                    )}
                </ErrorBoundary>
            )}
            {activeTab === 'missions' && (
                <ErrorBoundary sectionName="Mise">
                    {isMissionsLoading ? (
                        <>
                            <MissionSkeleton />
                            <MissionSkeleton />
                            <MissionSkeleton />
                        </>
                    ) : (
                        <Missions
                            dailyMissions={missions.activeMissions}
                            postponedMissions={stats.postponedMissions}
                            missionHistory={stats.missionHistory}
                            customMissions={stats.customMissions || []}
                            partnerName={stats.partnerName}
                            dayIndex={currentDayIndex}
                            simulatedDate={effectiveDate}
                            loading={isMissionsLoading}
                            onComplete={missions.handleCompleteMission}
                            onPostpone={missions.handlePostponeMission}
                            onSchedule={missions.handleScheduleMission}
                            onRestore={missions.handleRestoreMission}
                            onAddCustom={missions.handleAddCustomMission}
                            onDelete={missions.handleDeleteCustomMission}
                        />
                    )}
                </ErrorBoundary>
            )}
            {activeTab === 'recon' && (
                <ErrorBoundary sectionName="Bojiště">
                    {isMissionsLoading ? (
                        <ReconSkeleton />
                    ) : (
                        <Recon
                            currentWeek={currentWeekCount}
                            partnerName={stats.partnerName}
                            userName={stats.userName}
                            hospitalTarget={stats.hospitalTarget}
                            backupContacts={stats.backupContacts}
                            partnerPhone={stats.partnerPhone}
                            pediatricianContact={stats.pediatricianContact}
                            visitorStatus={stats.visitorStatus}
                            musicPreference={stats.musicPreference}
                            parkingInfo={stats.parkingInfo}
                            gbsStatus={stats.gbsStatus}
                            bloodPressureLog={stats.bloodPressureLog}
                            amnioticFluidLog={stats.amnioticFluidLog}
                            hospitalBagChecklist={stats.hospitalBagChecklist}
                            babyNames={stats.babyNames}
                            firstKickDetected={stats.firstKickDetected}
                            isDevMode={devMode.isDevMode}
                            onSaveHospital={(target) => setStats(prev => ({ ...prev, hospitalTarget: target }))}
                            onSaveBackupContacts={(contacts) => setStats(prev => ({ ...prev, backupContacts: contacts }))}
                            onSavePartnerPhone={(phone) => setStats(prev => ({ ...prev, partnerPhone: phone }))}
                            onSavePediatrician={(name, phone, address) => setStats(prev => ({ ...prev, pediatricianContact: { name, phone, address } }))}
                            onSaveVisitorStatus={(status) => setStats(prev => ({ ...prev, visitorStatus: status }))}
                            onSaveMusicPreference={(genre) => setStats(prev => ({ ...prev, musicPreference: genre }))}
                            onSaveParking={(info) => setStats(prev => ({ ...prev, parkingInfo: info }))}
                            onSaveGbsStatus={(status) => setStats(prev => ({ ...prev, gbsStatus: status }))}
                            onSaveBabyNames={(names) => setStats(prev => ({ ...prev, babyNames: names }))}
                            onLogBloodPressure={(sys, dia) => setStats(prev => ({ ...prev, bloodPressureLog: [...(prev.bloodPressureLog || []), { sys, dia, date: new Date().toISOString() }] }))}
                            onLogAmnioticFluid={(color) => setStats(prev => ({ ...prev, amnioticFluidLog: { time: new Date().toISOString(), color } }))}
                            onToggleHospitalBag={(id) => setStats(prev => {
                                const newChecklist = prev.hospitalBagChecklist.includes(id)
                                    ? prev.hospitalBagChecklist.filter(i => i !== id)
                                    : [...prev.hospitalBagChecklist, id];
                                return { ...prev, hospitalBagChecklist: newChecklist };
                            })}
                            customHospitalBagGear={stats.customHospitalBagGear || []}
                            onAddCustomHospitalBagGear={(item) => setStats(prev => ({ ...prev, customHospitalBagGear: [...(prev.customHospitalBagGear || []), item] }))}
                            onDeleteCustomHospitalBagGear={(id) => setStats(prev => ({ ...prev, customHospitalBagGear: (prev.customHospitalBagGear || []).filter(g => g.id !== id) }))}
                            onToggleCustomHospitalBagGear={(id) => setStats(prev => ({
                                ...prev,
                                customHospitalBagGear: (prev.customHospitalBagGear || []).map(g => g.id === id ? { ...g, bought: !g.bought } : g)
                            }))}
                            onReportFirstKick={() => setStats(prev => {
                                return { ...prev, firstKickDetected: true };
                            })}
                            onCompleteAllBag={handleCompleteAllHospitalBag}
                            onResetAllBag={handleResetAllHospitalBag}
                            tourCompleted={stats.tourCompleted?.recon}
                            onCompleteTour={() => setStats(prev => ({
                                ...prev,
                                tourCompleted: { ...prev.tourCompleted, recon: true }
                            }))}
                            medicalInfo={stats.medicalInfo}
                            onSaveMedicalInfo={(info) => setStats(prev => ({ ...prev, medicalInfo: info }))}
                            onViewManual={() => setStats(prev => {
                                return { ...prev, manualViewsCount: (prev.manualViewsCount || 0) + 1 };
                            })}
                            onEntryRead={(entryIndex) => setStats(prev => {
                                const currentRead = prev.manualEntriesRead || [];
                                // Add entry if not already read
                                if (!currentRead.includes(entryIndex)) {
                                    return { ...prev, manualEntriesRead: [...currentRead, entryIndex] };
                                }
                                return prev;
                            })}
                            onViewEmergency={() => setStats(prev => {
                                return { ...prev, emergencyProtocolsViewed: true };
                            })}
                            onViewICE={() => setStats(prev => {
                                return { ...prev, iceCardViewed: true };
                            })}
                        />
                    )}
                </ErrorBoundary>
            )}
            {activeTab === 'budget' && (
                <ErrorBoundary sectionName="Logistika">
                    {isMissionsLoading ? (
                        <BudgetSkeleton />
                    ) : (
                        <Budget
                            gearChecklist={stats.gearChecklist}
                            budgetPlan={stats.budgetPlan}
                            customGear={stats.customGear || []}
                            partnerName={stats.partnerName}
                            currentWeek={currentWeekCount}
                            vehicleModel={stats.vehicleModel}
                            isDevMode={devMode.isDevMode}
                            onToggleGear={(id) => setStats(prev => {
                                const newGearChecklist = prev.gearChecklist.includes(id)
                                    ? prev.gearChecklist.filter(i => i !== id)
                                    : [...prev.gearChecklist, id];
                                return { ...prev, gearChecklist: newGearChecklist };
                            })}
                            onSaveBudget={(plan) => setStats(prev => ({ ...prev, budgetPlan: plan }))}
                            onAddCustomGear={(item) => setStats(prev => ({ ...prev, customGear: [...(prev.customGear || []), item] }))}
                            onDeleteCustomGear={(id) => setStats(prev => ({ ...prev, customGear: (prev.customGear || []).filter(g => g.id !== id) }))}
                            onToggleCustomGear={(id) => setStats(prev => ({
                                ...prev,
                                customGear: (prev.customGear || []).map(g => g.id === id ? { ...g, bought: !g.bought } : g)
                            }))}
                            onSaveVehicle={(model) => setStats(prev => ({ ...prev, vehicleModel: model }))}
                            onConfirmVehicle={() => setStats(prev => ({ ...prev, vehicleConfirmed: true }))}
                            onUpdateConsumable={consumables.handleUpdateConsumable}
                            onAddCustomConsumable={consumables.handleAddCustomConsumable}
                            onDeleteConsumable={consumables.handleDeleteConsumable}
                            onConfirmConsumption={consumables.handleConfirmConsumption}
                            effectiveDate={effectiveDate}
                            onResetAllGear={handleResetAllGear}
                            onCompleteAll={handleCompleteAllGear}
                            operationalPrepChecklist={stats.operationalPrepChecklist || []}
                            onToggleOperationalPrep={(id) => setStats(prev => {
                                const newChecklist = prev.operationalPrepChecklist?.includes(id)
                                    ? prev.operationalPrepChecklist.filter(i => i !== id)
                                    : [...(prev.operationalPrepChecklist || []), id];
                                return { ...prev, operationalPrepChecklist: newChecklist };
                            })}
                            customOperationalPrepGear={stats.customOperationalPrepGear || []}
                            onAddCustomOperationalPrepGear={(item) => setStats(prev => ({ ...prev, customOperationalPrepGear: [...(prev.customOperationalPrepGear || []), item] }))}
                            onDeleteCustomOperationalPrepGear={(id) => setStats(prev => ({ ...prev, customOperationalPrepGear: (prev.customOperationalPrepGear || []).filter(g => g.id !== id) }))}
                            onToggleCustomOperationalPrepGear={(id) => setStats(prev => ({
                                ...prev,
                                customOperationalPrepGear: (prev.customOperationalPrepGear || []).map(g => g.id === id ? { ...g, bought: !g.bought } : g)
                            }))}
                        />
                    )}
                </ErrorBoundary>
            )}


            {activeTab === 'extra' && (
                <ErrorBoundary sectionName="Extra">
                    <Extra
                        currentWeek={devMode.currentWeek}
                        onReward={(pts) => setStats(prev => ({ ...prev, points: prev.points + pts }))}
                        userStats={stats}
                        onUpdateStats={(updates) => setStats(prev => ({ ...prev, ...updates }))}
                        babyNames={stats.babyNames}
                        onSaveBabyNames={(names) => setStats(prev => ({ ...prev, babyNames: names }))}
                        isDevMode={devMode.isDevMode}
                        effectiveDate={effectiveDate}
                        dayIndex={currentDayIndex}
                    />
                </ErrorBoundary>
            )}
            {activeTab === 'achievements' && (
                <ErrorBoundary sectionName="Achievementy">
                    <Achievements
                        stats={stats}
                        onClose={() => setActiveTab('dashboard')}
                    />
                </ErrorBoundary>
            )}
        </main>
    );
};
