import React, { useState } from 'react';
import { X, Volume2, VolumeX, Calendar, Trash2, AlertTriangle, Bell, BellOff, Settings as SettingsIcon } from 'lucide-react';
import { DatePickerModal } from './common/DatePickerModal';
import { notificationService } from '../services/NotificationService';

interface SettingsProps {
    onClose: () => void;
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

export const Settings: React.FC<SettingsProps> = ({
    onClose,
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
    const [editingDueDate, setEditingDueDate] = useState(false);
    const [dueDateInput, setDueDateInput] = useState(dueDate);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleSaveDueDate = () => {
        if (dueDateInput) {
            onUpdateDueDate(dueDateInput);
            setEditingDueDate(false);
        }
    };

    const handleDeleteData = () => {
        onDeleteAllData();
        setShowDeleteConfirm(false);
    };

    return (
        <>
            <div className="fixed inset-0 z-[100] bg-[#1f2933]/98 backdrop-blur-xl flex flex-col animate-fade-in overflow-hidden">
                <div className="max-w-md mx-auto w-full h-full flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center bg-[#1f2933] px-6 py-8 z-30 border-b border-white/10 shadow-xl shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-[#f6c453]/10 rounded-xl">
                                <SettingsIcon className="w-5 h-5 text-[#f6c453]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black italic uppercase accent-text tracking-tighter leading-none">
                                    Nastavení
                                </h2>
                                <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em] mt-1">
                                    System Config
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 active:scale-95 group"
                            aria-label="Zavřít nastavení"
                        >
                            <X className="w-5 h-5 text-[#f6c453] group-hover:rotate-90 transition-transform" />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto px-4 pt-6 pb-32 custom-scrollbar">
                        <div className="space-y-3 relative z-10">
                            {/* Sound Toggle */}
                            <div className="bg-white/5 rounded-2xl border border-white/10 p-4 transition-all hover:bg-white/10 group border-l-4 border-l-[#f6c453]/20">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2.5 rounded-xl transition-all duration-300 ${soundEnabled ? 'bg-[#f6c453]/20 scale-105' : 'bg-white/5'}`}>
                                            {soundEnabled ? (
                                                <Volume2 className="w-5 h-5 text-[#f6c453]" />
                                            ) : (
                                                <VolumeX className="w-5 h-5 text-white/40" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black uppercase text-white tracking-tight leading-none">
                                                Zvuky
                                            </h3>
                                            <p className="text-[10px] text-white/40 mt-1 uppercase font-bold tracking-wider">
                                                Audio FX
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => onToggleSound(!soundEnabled)}
                                        className={`relative w-12 h-7 rounded-full transition-all duration-300 active:scale-90 ${soundEnabled ? 'bg-[#f6c453]' : 'bg-white/10 border border-white/10'
                                            }`}
                                        role="switch"
                                        aria-checked={soundEnabled}
                                    >
                                        <div
                                            className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-md ${soundEnabled ? 'left-6' : 'left-1'
                                                }`}
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Night Mode Toggle */}
                            <div className="bg-white/5 rounded-2xl border border-white/10 p-4 transition-all hover:bg-white/10 group border-l-4 border-l-orange-500/20">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2.5 rounded-xl transition-all duration-300 ${nightMode ? 'bg-orange-500/20 scale-105' : 'bg-white/5'}`}>
                                            <svg className={`w-5 h-5 ${nightMode ? 'text-orange-400' : 'text-white/40'} transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black uppercase text-white tracking-tight leading-none">
                                                Noční mód
                                            </h3>
                                            <p className="text-[10px] text-white/40 mt-1 uppercase font-bold tracking-wider">
                                                Night Vision
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => onToggleNightMode(!nightMode)}
                                        className={`relative w-12 h-7 rounded-full transition-all duration-300 active:scale-90 ${nightMode ? 'bg-orange-500' : 'bg-white/10 border border-white/10'
                                            }`}
                                        role="switch"
                                        aria-checked={nightMode}
                                    >
                                        <div
                                            className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-md ${nightMode ? 'left-6' : 'left-1'
                                                }`}
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Notifications Toggle */}
                            <div className="bg-white/5 rounded-2xl border border-white/10 p-4 transition-all hover:bg-white/10 group border-l-4 border-l-blue-500/20">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2.5 rounded-xl transition-all duration-300 ${notificationsEnabled ? 'bg-blue-500/20 scale-105' : 'bg-white/5'}`}>
                                            {notificationsEnabled ? (
                                                <Bell className="w-5 h-5 text-blue-400" />
                                            ) : (
                                                <BellOff className="w-5 h-5 text-white/40" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black uppercase text-white tracking-tight leading-none">
                                                Notifikace
                                            </h3>
                                            <p className="text-[10px] text-white/40 mt-1 uppercase font-bold tracking-wider">
                                                Comms Link
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={async () => {
                                            if (!notificationsEnabled) {
                                                const granted = await notificationService.requestPermission();
                                                if (granted) {
                                                    onToggleNotifications(true);
                                                    notificationService.send('Taktické spojení navázáno', 'Notifikace jsou připraveny k akci.');
                                                }
                                            } else {
                                                onToggleNotifications(false);
                                            }
                                        }}
                                        className={`relative w-12 h-7 rounded-full transition-all duration-300 active:scale-90 ${notificationsEnabled ? 'bg-blue-500' : 'bg-white/10 border border-white/10'
                                            }`}
                                        role="switch"
                                        aria-checked={notificationsEnabled}
                                    >
                                        <div
                                            className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-md ${notificationsEnabled ? 'left-6' : 'left-1'
                                                }`}
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Due Date Editor */}
                            <div className="bg-white/5 rounded-2xl border border-white/10 p-4 group transition-all hover:bg-white/10 border-l-4 border-l-[#f6c453]/20">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="p-2.5 bg-[#f6c453]/20 rounded-xl group-hover:scale-105 transition-transform">
                                        <Calendar className="w-5 h-5 text-[#f6c453]" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-black uppercase text-white tracking-tight leading-none">
                                            Termín Mise
                                        </h3>
                                        <p className="text-[10px] text-white/40 mt-1 uppercase font-bold tracking-wider">
                                            Deadline ET
                                        </p>
                                    </div>
                                </div>

                                {editingDueDate ? (
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => setShowDatePicker(true)}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white text-xs font-bold focus:outline-none focus:border-[#f6c453] transition-all flex items-center justify-between hover:bg-white/10"
                                        >
                                            <span>
                                                {dueDateInput ? new Date(dueDateInput).toLocaleDateString('cs-CZ', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                }) : 'Vyberte datum'}
                                            </span>
                                            <Calendar className="w-4 h-4 text-[#f6c453]" />
                                        </button>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleSaveDueDate}
                                                className="flex-1 bg-[#f6c453] text-[#1f2933] py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#ffcf60] transition-all active:scale-95 shadow-lg shadow-[#f6c453]/10"
                                            >
                                                Uložit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditingDueDate(false);
                                                    setDueDateInput(dueDate);
                                                }}
                                                className="flex-1 bg-white/5 border border-white/20 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all text-white active:scale-95"
                                            >
                                                Zrušit
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <div className="text-xl font-black text-[#f6c453] font-mono tracking-tighter">
                                            {new Date(dueDate).toLocaleDateString('cs-CZ')}
                                        </div>
                                        <button
                                            onClick={() => setEditingDueDate(true)}
                                            className="px-3 py-1.5 bg-[#f6c453]/10 text-[#f6c453] border border-[#f6c453]/30 rounded-lg font-black uppercase text-[10px] tracking-wider hover:bg-[#f6c453]/20 transition-all active:scale-95"
                                        >
                                            Nastavit
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Restart Tour */}
                            <div className="bg-white/5 rounded-2xl border border-white/10 p-4 transition-all hover:bg-white/10 group border-l-4 border-l-green-500/20">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-green-500/20 rounded-xl group-hover:scale-105 transition-transform">
                                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-black uppercase text-white tracking-tight leading-none">
                                                Výcvikový Kemp
                                            </h3>
                                            <p className="text-[10px] text-white/40 mt-1 uppercase font-bold tracking-wider">
                                                Re-run Briefing
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            onRestartTour();
                                            onClose();
                                        }}
                                        className="px-3 py-1.5 bg-green-500/10 text-green-400 border border-green-500/30 rounded-lg font-black uppercase text-[10px] tracking-wider hover:bg-green-500/20 transition-all active:scale-95"
                                    >
                                        Spustit
                                    </button>
                                </div>
                            </div>

                            {/* Delete All Data */}
                            <div className="bg-red-500/5 rounded-2xl border-2 border-red-500/20 p-4 border-l-4 border-l-red-500/50">
                                <div className="flex items-center justify-between gap-4 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-red-500/20 rounded-xl">
                                            <Trash2 className="w-5 h-5 text-red-500" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-black uppercase text-red-500 tracking-tight leading-none">
                                                Smazat Protokol
                                            </h3>
                                            <p className="text-[10px] text-white/40 mt-1 uppercase font-bold tracking-wider">
                                                Wipe All Data
                                            </p>
                                        </div>
                                    </div>
                                    {!showDeleteConfirm && (
                                        <button
                                            onClick={() => setShowDeleteConfirm(true)}
                                            className="px-3 py-1.5 bg-red-500/10 text-red-500 border border-red-500/30 rounded-lg font-black uppercase text-[10px] tracking-wider hover:bg-red-500/20 transition-all active:scale-95"
                                        >
                                            Smazat
                                        </button>
                                    )}
                                </div>

                                {showDeleteConfirm ? (
                                    <div className="space-y-3">
                                        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
                                            <div className="flex items-start gap-3">
                                                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-sm text-white/90 font-bold mb-1">
                                                        ⚠️ Varování
                                                    </p>
                                                    <p className="text-xs text-white/70 leading-relaxed">
                                                        Tato akce je nevratná! Všechny mise, achievementy, statistiky a nastavení budou trvale smazány.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-4">
                                            <button
                                                onClick={handleDeleteData}
                                                className="flex-1 bg-red-500/80 text-white py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-red-500/20"
                                            >
                                                Ano, Smazat
                                            </button>
                                            <button
                                                onClick={() => setShowDeleteConfirm(false)}
                                                className="flex-1 bg-white/5 border border-white/20 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all text-white active:scale-95"
                                            >
                                                Zrušit
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setShowDeleteConfirm(true)}
                                        className="w-full bg-red-500/20 text-red-400 py-3 rounded-xl font-black uppercase text-sm hover:bg-red-500/30 transition-all border border-red-500/30"
                                    >
                                        Smazat Všechna Data
                                    </button>
                                )}
                            </div>

                            {/* Info Footer */}
                            <div className="mt-8 bg-black/20 border border-white/5 rounded-2xl p-4 flex items-center justify-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-[#f6c453] animate-pulse" />
                                <p className="text-[9px] text-white/30 text-center leading-relaxed font-black uppercase tracking-[0.2em]">
                                    Auto-Save: Active • Secure Link
                                </p>
                                <div className="w-1 h-1 rounded-full bg-[#f6c453] animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Date Picker Modal */}
            <DatePickerModal
                isOpen={showDatePicker}
                onClose={() => setShowDatePicker(false)}
                onSelect={(date) => {
                    setDueDateInput(date);
                    setShowDatePicker(false);
                }}
                initialDate={dueDateInput}
                title="Předpokládaný termín"
            />
        </>
    );
};
