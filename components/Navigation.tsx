import React, { useState } from 'react';
import { Tab } from '../types';
import { Home, Target, Radar, Award, Wallet, Menu, XIcon, LogOut, Settings, Rocket, Bug, Info, Sparkles, MessageSquare } from 'lucide-react';
import { Settings as SettingsComponent } from './Settings';

interface NavigationProps {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
    onLogout: () => void;
    onOpenVysadek?: () => void;
    soundEnabled: boolean;
    onToggleSound: (enabled: boolean) => void;
    notificationsEnabled: boolean;
    onToggleNotifications: (enabled: boolean) => void;
    nightMode: boolean;
    onToggleNightMode: (enabled: boolean) => void;
    dueDate: string;
    onUpdateDueDate: (date: string) => void;
    onDeleteAllData: () => void;
    onRestartTour: () => void; // New: Restart onboarding tour
}

interface NavItemProps {
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
    dataTour?: string;
}

const NavItem: React.FC<NavItemProps> = ({ active, onClick, icon, label, dataTour }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center gap-1.5 transition-all duration-300 flex-1 min-h-[48px] justify-center active:scale-90 group ${active ? 'accent-text scale-110' : 'text-[#f5f7fa] opacity-25 hover:opacity-60'}`}
        data-tour={dataTour}
        aria-label={label}
        aria-current={active ? 'page' : undefined}
    >
        <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
            {icon}
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.1em]">{label}</span>
    </button>
);

export const Navigation: React.FC<NavigationProps> = ({
    activeTab,
    setActiveTab,
    onLogout,
    onOpenVysadek,
    soundEnabled,
    onToggleSound,
    notificationsEnabled,
    onToggleNotifications,
    nightMode,
    onToggleNightMode,
    dueDate,
    onUpdateDueDate,
    onDeleteAllData,
    onRestartTour
}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showAppInfo, setShowAppInfo] = useState(false);

    const handleFeedback = () => {
        window.open('mailto:myli.product@gmail.com?subject=Zpětná vazba - Operace Výsadek', '_blank');
    };

    return (
        <>
            <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#1f2933]/95 backdrop-blur-2xl border-t border-white/5 px-2 py-3 flex justify-between items-center z-40">
                <NavItem
                    active={activeTab === 'dashboard'}
                    onClick={() => setActiveTab('dashboard')}
                    icon={<Home className="w-6 h-6" />}
                    label="Hlavní"
                />


                <NavItem
                    active={activeTab === 'recon'}
                    onClick={() => setActiveTab('recon')}
                    icon={<Radar className="w-6 h-6" />}
                    label="Bojiště"
                    dataTour="recon-tab"
                />
                <NavItem
                    active={activeTab === 'budget'}
                    onClick={() => setActiveTab('budget')}
                    icon={<Wallet className="w-6 h-6" />}
                    label="Logistika"
                    dataTour="budget-tab"
                />
                <NavItem
                    active={activeTab === 'extra'}
                    onClick={() => setActiveTab('extra')}
                    icon={<Sparkles className="w-6 h-6" />}
                    label="Extra"
                    dataTour="extra-tab"
                />
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="flex flex-col items-center gap-1.5 transition-all flex-1 min-h-[48px] justify-center text-[#f5f7fa] opacity-25 hover:opacity-40"
                    data-tour="menu-button"
                    aria-label="Otevřít menu"
                    aria-expanded={showMenu}
                >
                    <Menu className="w-6 h-6" />
                    <span className="text-[10px] font-black uppercase tracking-[0.1em]">Menu</span>
                </button>
            </nav>

            {/* Settings Menu Modal */}
            {showMenu && (
                <div className="fixed inset-0 z-[80] bg-[#1f2933] overflow-y-auto animate-fade-in p-4">
                    <div className="max-w-md mx-auto min-h-full flex flex-col">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6 sticky top-0 bg-[#1f2933] py-4 z-10 border-b border-white/5">
                            <div>
                                <h2 className="text-xl font-black italic uppercase text-white tracking-tighter">Menu</h2>
                                <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Nastavení a možnosti</p>
                            </div>
                            <button
                                onClick={() => setShowMenu(false)}
                                className="p-3 bg-white/5 rounded-2xl border border-white/10"
                            >
                                <XIcon className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Menu Items */}
                        <div className="space-y-3 pb-10">
                            {/* Logout */}
                            <button
                                onClick={() => {
                                    setShowMenu(false);
                                    onLogout();
                                }}
                                className="w-full p-5 rounded-2xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 transition-all flex items-center gap-4 text-left"
                            >
                                <div className="p-3 bg-rose-500/20 rounded-xl">
                                    <LogOut className="w-6 h-6 text-rose-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-black uppercase text-rose-400 tracking-tight">Odchod</h3>
                                    <p className="text-[10px] text-white/40 mt-1">Odhlásit se z aplikace</p>
                                </div>
                            </button>



                            {/* Settings */}
                            <button
                                onClick={() => {
                                    setShowMenu(false);
                                    setShowSettings(true);
                                }}
                                className="w-full p-5 rounded-2xl border border-[#f6c453]/30 bg-[#f6c453]/10 hover:bg-[#f6c453]/20 transition-all flex items-center gap-4 text-left active:scale-[0.98] group"
                            >
                                <div className="p-3 bg-[#f6c453]/20 rounded-xl group-hover:rotate-12 transition-transform">
                                    <Settings className="w-6 h-6 text-[#f6c453]" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-black uppercase text-[#f6c453] tracking-tight">Nastavení</h3>
                                    <p className="text-[10px] text-white/40 mt-1">Zvuky, termín, data</p>
                                </div>
                            </button>

                            {/* Early Deployment */}
                            {onOpenVysadek && (
                                <button
                                    onClick={() => {
                                        setShowMenu(false);
                                        onOpenVysadek();
                                    }}
                                    className="w-full p-5 rounded-2xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 transition-all flex items-center gap-4 text-left active:scale-[0.98] group"
                                    aria-label="Přístup k protokolu narození"
                                >
                                    <div className="p-3 bg-rose-500/20 rounded-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                                        <Rocket className="w-6 h-6 text-rose-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-black uppercase text-rose-400 tracking-tight">Dřívější Výsadek</h3>
                                        <p className="text-[10px] text-white/40 mt-1">Přístup k protokolu narození</p>
                                    </div>
                                </button>
                            )}

                            {/* Feedback */}
                            <button
                                onClick={() => {
                                    setShowMenu(false);
                                    handleFeedback();
                                }}
                                className="w-full p-5 rounded-2xl border border-[#f6c453]/30 bg-[#f6c453]/10 hover:bg-[#f6c453]/20 transition-all flex items-center gap-4 text-left active:scale-[0.98] group"
                            >
                                <div className="p-3 bg-[#f6c453]/20 rounded-xl group-hover:scale-110 transition-transform">
                                    <MessageSquare className="w-6 h-6 text-[#f6c453]" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-black uppercase text-[#f6c453] tracking-tight">Zpětná Vazba</h3>
                                    <p className="text-[10px] text-white/40 mt-1">Napsat názor nebo nahlásit chybu</p>
                                </div>
                            </button>

                            {/* Information */}
                            <button
                                onClick={() => setShowAppInfo(true)}
                                className="w-full p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center gap-4 text-left active:scale-[0.98] group"
                            >
                                <div className="p-3 bg-white/10 rounded-xl group-hover:scale-110 transition-transform">
                                    <Info className="w-6 h-6 text-white/60" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-black uppercase text-white/60 tracking-tight">Informace</h3>
                                    <p className="text-[10px] text-white/40 mt-1">O aplikaci a verzi</p>
                                </div>
                            </button>

                            {/* App Info Modal Inside Menu */}
                            {showAppInfo && (
                                <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-6 animate-fade-in">
                                    <div className="bg-[#1f2933] border-2 border-[#f6c453]/50 rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl animate-scale-in relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#f6c453]/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>

                                        <div className="flex flex-col items-center text-center space-y-4">
                                            <div className="p-4 bg-[#f6c453]/10 rounded-2xl mb-2">
                                                <Info className="w-8 h-8 text-[#f6c453]" />
                                            </div>

                                            <div>
                                                <h3 className="text-2xl font-black italic uppercase text-white tracking-tighter">Operace Výsadek</h3>
                                                <p className="text-[10px] font-black text-[#f6c453] uppercase tracking-[0.3em] mt-1">Taktický Asistent</p>
                                            </div>

                                            <div className="w-full space-y-2 pt-4">
                                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                                    <span className="text-[10px] font-black uppercase text-white/30 tracking-widest">Verze</span>
                                                    <span className="text-xs font-bold text-white/80">v3.4.1 (Stable)</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                                    <span className="text-[10px] font-black uppercase text-white/30 tracking-widest">Autor</span>
                                                    <span className="text-xs font-bold text-[#f6c453]">My.Li</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                                    <span className="text-[10px] font-black uppercase text-white/30 tracking-widest">Status</span>
                                                    <span className="text-xs font-bold text-emerald-400">Operačně schopen</span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => setShowAppInfo(false)}
                                                className="w-full bg-[#f6c453] text-[#1f2933] py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-[1.02] active:scale-95 transition-all mt-4 shadow-lg shadow-[#f6c453]/20"
                                            >
                                                Rozumím
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* App Info Footer */}
                        <div className="mt-auto pt-6 pb-4 text-center border-t border-white/5">
                            <p className="text-xs font-black uppercase tracking-widest text-white/30 italic">Operace Výsadek</p>
                            <p className="text-[10px] text-white/20 mt-1">v3.4.1 • My.Li</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Settings Modal */}
            {showSettings && (
                <SettingsComponent
                    onClose={() => setShowSettings(false)}
                    soundEnabled={soundEnabled}
                    onToggleSound={onToggleSound}
                    notificationsEnabled={notificationsEnabled}
                    onToggleNotifications={onToggleNotifications}
                    nightMode={nightMode}
                    onToggleNightMode={onToggleNightMode}
                    dueDate={dueDate}
                    onUpdateDueDate={onUpdateDueDate}
                    onDeleteAllData={onDeleteAllData}
                    onRestartTour={onRestartTour}
                />
            )}
        </>
    );
};
