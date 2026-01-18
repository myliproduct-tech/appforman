import React, { useState } from 'react';
import { X, Volume2, VolumeX, Calendar, Trash2, AlertTriangle, Bell, BellOff } from 'lucide-react';
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
            <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md overflow-y-auto animate-fade-in">
                <div className="min-h-full p-4 pb-24">
                    <div className="max-w-2xl mx-auto">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-3xl font-black italic uppercase text-[#f6c453] tracking-tight">
                                    Nastavení
                                </h2>
                                <p className="text-xs text-[#f6c453]/60 mt-2 uppercase tracking-[0.3em] font-black">
                                    Settings
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-3 rounded-xl bg-white/5 hover:bg-[#f6c453]/10 transition-all border border-white/10 active:scale-95 group"
                                aria-label="Zavřít nastavení"
                            >
                                <X className="w-6 h-6 text-[#f6c453] group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Sound Toggle */}
                            <div className="bg-white/5 rounded-2xl border border-white/10 p-6 group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl transition-all duration-300 ${soundEnabled ? 'bg-[#f6c453]/20 scale-110 shadow-[0_0_15px_rgba(246,196,83,0.2)]' : 'bg-white/5'}`}>
                                            {soundEnabled ? (
                                                <Volume2 className="w-6 h-6 text-[#f6c453]" />
                                            ) : (
                                                <VolumeX className="w-6 h-6 text-white/40" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black uppercase text-white tracking-tight">
                                                Zvuky
                                            </h3>
                                            <p className="text-xs text-white/60 mt-1">
                                                Zapnout/vypnout zvukové efekty
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => onToggleSound(!soundEnabled)}
                                        className={`relative w-14 h-8 rounded-full transition-all duration-300 active:scale-90 ${soundEnabled ? 'bg-[#f6c453]' : 'bg-white/20'
                                            }`}
                                        role="switch"
                                        aria-checked={soundEnabled}
                                        aria-label={`${soundEnabled ? 'Vypnout' : 'Zapnout'} zvuky`}
                                    >
                                        <div
                                            className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 shadow-sm ${soundEnabled ? 'left-7' : 'left-1'
                                                }`}
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Night Mode Toggle */}
                            <div className="bg-white/5 rounded-2xl border border-white/10 p-6 group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl transition-all duration-300 ${nightMode ? 'bg-orange-500/20 scale-110 shadow-[0_0_15px_rgba(249,115,22,0.2)]' : 'bg-white/5'}`}>
                                            <svg className={`w-6 h-6 ${nightMode ? 'text-orange-400' : 'text-white/40'} transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black uppercase text-white tracking-tight">
                                                Noční mód
                                            </h3>
                                            <p className="text-xs text-white/60 mt-1">
                                                Teplý filtr pro čtení v noci
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => onToggleNightMode(!nightMode)}
                                        className={`relative w-14 h-8 rounded-full transition-all duration-300 active:scale-90 ${nightMode ? 'bg-orange-500' : 'bg-white/20'
                                            }`}
                                        role="switch"
                                        aria-checked={nightMode}
                                        aria-label={`${nightMode ? 'Vypnout' : 'Zapnout'} noční mód`}
                                    >
                                        <div
                                            className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 shadow-sm ${nightMode ? 'left-7' : 'left-1'
                                                }`}
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Notifications Toggle */}
                            <div className="bg-white/5 rounded-2xl border border-white/10 p-6 group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl transition-all duration-300 ${notificationsEnabled ? 'bg-blue-500/20 scale-110 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-white/5'}`}>
                                            {notificationsEnabled ? (
                                                <Bell className="w-6 h-6 text-blue-400" />
                                            ) : (
                                                <BellOff className="w-6 h-6 text-white/40" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black uppercase text-white tracking-tight">
                                                Notifikace
                                            </h3>
                                            <p className="text-xs text-white/60 mt-1">
                                                Upozornění na achievementy a mise
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
                                        className={`relative w-14 h-8 rounded-full transition-all duration-300 active:scale-90 ${notificationsEnabled ? 'bg-blue-500' : 'bg-white/20'
                                            }`}
                                        role="switch"
                                        aria-checked={notificationsEnabled}
                                        aria-label={`${notificationsEnabled ? 'Vypnout' : 'Zapnout'} notifikace`}
                                    >
                                        <div
                                            className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 shadow-sm ${notificationsEnabled ? 'left-7' : 'left-1'
                                                }`}
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Due Date Editor */}
                            <div className="bg-white/5 rounded-2xl border border-white/10 p-6 group">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-[#f6c453]/20 rounded-xl group-hover:scale-110 transition-transform">
                                        <Calendar className="w-6 h-6 text-[#f6c453]" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-black uppercase text-white tracking-tight">
                                            Předpokládaný Termín
                                        </h3>
                                        <p className="text-xs text-white/60 mt-1">
                                            Upravit datum porodu
                                        </p>
                                    </div>
                                </div>

                                {editingDueDate ? (
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => setShowDatePicker(true)}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#f6c453] transition-all flex items-center justify-between hover:bg-white/15"
                                        >
                                            <span className={dueDateInput ? 'text-white' : 'text-white/40'}>
                                                {dueDateInput ? new Date(dueDateInput).toLocaleDateString('cs-CZ', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                }) : 'Vyberte datum'}
                                            </span>
                                            <Calendar className="w-5 h-5 text-[#f6c453]" />
                                        </button>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleSaveDueDate}
                                                className="flex-1 bg-[#f6c453] text-black py-3 rounded-xl font-black uppercase text-sm hover:bg-[#ffcf60] transition-all active:scale-95 shadow-lg shadow-[#f6c453]/20"
                                            >
                                                Uložit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditingDueDate(false);
                                                    setDueDateInput(dueDate);
                                                }}
                                                className="flex-1 bg-white/10 border border-white/20 py-3 rounded-xl font-black uppercase text-sm hover:bg-white/20 transition-all text-white active:scale-95"
                                            >
                                                Zrušit
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <div className="text-2xl font-black text-[#f6c453] font-mono">
                                            {new Date(dueDate).toLocaleDateString('cs-CZ')}
                                        </div>
                                        <button
                                            onClick={() => setEditingDueDate(true)}
                                            className="px-4 py-2 bg-[#f6c453]/20 text-[#f6c453] rounded-xl font-black uppercase text-xs hover:bg-[#f6c453]/30 transition-all active:scale-95"
                                        >
                                            Upravit
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Restart Tour */}
                            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-green-500/20 rounded-xl">
                                        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-black uppercase text-white tracking-tight">
                                            Zopakovat Výcvik
                                        </h3>
                                        <p className="text-xs text-white/60 mt-1">
                                            Znovu projít onboarding tour
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        onRestartTour();
                                        onClose();
                                    }}
                                    className="w-full bg-green-500/20 text-green-400 py-3 rounded-xl font-black uppercase text-sm hover:bg-green-500/30 transition-all border border-green-500/30"
                                >
                                    Spustit Tour
                                </button>
                            </div>

                            {/* Delete All Data */}
                            <div className="bg-red-500/10 rounded-2xl border-2 border-red-500/30 p-6">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-red-500/20 rounded-xl">
                                        <Trash2 className="w-6 h-6 text-red-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-black uppercase text-red-400 tracking-tight">
                                            Smazat Všechna Data
                                        </h3>
                                        <p className="text-xs text-white/60 mt-1">
                                            Trvale odstranit všechny uložené údaje
                                        </p>
                                    </div>
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
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleDeleteData}
                                                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl font-black uppercase text-sm hover:from-red-500 hover:to-red-600 transition-all shadow-lg shadow-red-500/30"
                                            >
                                                Ano, Smazat Vše
                                            </button>
                                            <button
                                                onClick={() => setShowDeleteConfirm(false)}
                                                className="flex-1 bg-white/10 border border-white/20 py-3 rounded-xl font-black uppercase text-sm hover:bg-white/20 transition-all text-white"
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
                        </div>

                        {/* Info Footer */}
                        <div className="mt-8 bg-[#f6c453]/10 border border-[#f6c453]/30 rounded-xl p-4">
                            <p className="text-xs text-[#f6c453]/80 text-center leading-relaxed font-bold uppercase tracking-wider">
                                💡 Změny se ukládají automaticky
                            </p>
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
