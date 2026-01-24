

import React, { useEffect, useRef } from 'react';
import { PARTNER_RECON, PREGNANCY_CIPHER, HOSPITAL_BAG_CHECKLIST, COMMUNICATION_MANUAL } from '../constants';
import { BabyName, CommunicationEntry, MedicalInfo, CustomGearItem } from '../types';
import { Search, Heart, ShieldAlert, Zap, Thermometer, User, Lock, Unlock, MessageSquareCode, Navigation, MapPin, Activity, Phone, Timer, Footprints, Play, Square as StopSquare, RotateCcw, Car, Shield, Stethoscope, ShieldBan, Users, PartyPopper, Music, Headphones, Volume2, Sun, Clock, Droplets, Check, X as XIcon, FlaskConical, AlertTriangle, FileWarning, Siren, Plus, Trash2, Menu, IdCard, Download, Share2, BriefcaseMedical, CheckSquare, Square, Trophy, FileSignature, Baby, Truck, Settings, Compass, Layers, ArrowUp, ArrowDown, ClipboardList, Disc, Minimize, Weight, Info, Cross, Flag, MessageSquare, ChevronRight, Guitar, Music2, Mic2, Leaf } from 'lucide-react';
import { localizeText, navigateToAddress, makePhoneCall } from '../utils';
import html2canvas from 'html2canvas';
import { ContractionTimer } from './recon/ContractionTimer';
import { MovementTracker } from './recon/MovementTracker';
import { BabyNameGenerator } from './recon/BabyNameGenerator';
import { HospitalBag } from './recon/HospitalBag';
import { CommunicationManual } from './recon/CommunicationManual';
import { GoldenHour } from './recon/GoldenHour';
import { ICECard } from './recon/ICECard';
import { CrisisProtocol } from './recon/CrisisProtocol';
import { MedicalInfoModal } from './recon/MedicalInfo';
import { OnboardingTour } from './OnboardingTour';
import { useReconReducer } from '../hooks/useReconReducer';

interface Contact {
    id: string;
    name: string;
    phone: string;
}

interface ReconProps {
    currentWeek: number;
    partnerName: string; // Added prop
    userName: string | null; // Added prop
    hospitalTarget?: string;
    backupContacts?: Contact[];
    partnerPhone?: string;
    pediatricianContact?: { name: string; phone: string; address: string; };
    visitorStatus?: 'bunker' | 'family' | 'open';
    musicPreference?: string;
    parkingInfo?: string;
    gbsStatus?: 'positive' | 'negative' | 'unknown';
    bloodPressureLog?: { sys: number; dia: number; date: string }[];
    amnioticFluidLog?: { time: string; color: 'clear' | 'green' | 'blood' | 'unknown' } | null;
    hospitalBagChecklist?: string[];
    babyNames?: BabyName[];
    onSaveHospital?: (target: string) => void;
    onSaveBackupContacts?: (contacts: Contact[]) => void;
    onSavePartnerPhone?: (phone: string) => void;
    onSavePediatrician?: (name: string, phone: string, address: string) => void;
    onSaveVisitorStatus?: (status: 'bunker' | 'family' | 'open') => void;
    onSaveMusicPreference?: (genre: string) => void;
    onSaveParking?: (info: string) => void;
    onSaveGbsStatus?: (status: 'positive' | 'negative' | 'unknown') => void;
    onSaveBabyNames?: (names: BabyName[]) => void;
    onLogBloodPressure?: (sys: number, dia: number) => void;
    onLogAmnioticFluid?: (color: 'clear' | 'green' | 'blood' | 'unknown') => void;
    onToggleHospitalBag?: (id: string) => void;
    firstKickDetected?: boolean;
    onReportFirstKick?: () => void;
    customHospitalBagGear?: CustomGearItem[];
    onAddCustomHospitalBagGear?: (item: CustomGearItem) => void;
    onDeleteCustomHospitalBagGear?: (id: string) => void;
    onToggleCustomHospitalBagGear?: (id: string) => void;
    isDevMode?: boolean;
    onCompleteAllBag?: () => void;
    onResetAllBag?: () => void;
    tourCompleted?: boolean;
    onCompleteTour?: () => void;
    medicalInfo?: MedicalInfo;
    onSaveMedicalInfo?: (info: MedicalInfo) => void;
    onViewManual?: () => void;
    onEntryRead?: (entryIndex: number) => void; // New: callback when manual entry is expanded
    onViewEmergency?: () => void;
}

const MUSIC_GENRES = [
    { id: 'rock', label: 'Rock / Metal', icon: 'Guitar' },
    { id: 'classical', label: 'Klasika', icon: 'Music2' },
    { id: 'pop', label: 'Pop / Disco', icon: 'Mic2' },
    { id: 'jazz', label: 'Jazz / Lo-Fi', icon: 'Music' },
    { id: 'nature', label: 'Zvuky přírody', icon: 'Leaf' }
];

export const Recon: React.FC<ReconProps> = ({ currentWeek, partnerName, userName, hospitalTarget = '', backupContacts = [], partnerPhone, pediatricianContact, visitorStatus = 'bunker', musicPreference, parkingInfo, gbsStatus = 'unknown', bloodPressureLog = [], amnioticFluidLog, hospitalBagChecklist = [], babyNames = [], firstKickDetected = false, onSaveHospital, onSaveBackupContacts, onSavePartnerPhone, onSavePediatrician, onSaveVisitorStatus, onSaveMusicPreference, onSaveParking, onSaveGbsStatus, onSaveBabyNames, onLogBloodPressure, onLogAmnioticFluid, onToggleHospitalBag, onReportFirstKick, customHospitalBagGear = [], onAddCustomHospitalBagGear, onDeleteCustomHospitalBagGear, onToggleCustomHospitalBagGear, isDevMode, onCompleteAllBag, onResetAllBag, tourCompleted = false, onCompleteTour, medicalInfo, onSaveMedicalInfo, onViewManual, onEntryRead, onViewEmergency }) => {
    // Use reducer for all state management
    const { state, dispatch } = useReconReducer(
        hospitalTarget,
        partnerPhone,
        pediatricianContact,
        parkingInfo,
        musicPreference
    );

    // Destructure state for easier access
    const {
        modals: {
            showFirstAid,
            showGoldenHour,
            showIceCard,
            showHospitalBag,
            showNameList,
            showCommManual,
            showCrisisProtocol
        },
        forms: {
            target: { input: targetInput, isEditing: isEditingTarget },
            contact: { name: newContactName, phone: newContactPhone, isAdding: isAddingContact },
            partner: { input: partnerPhoneInput, isEditing: isEditingPartner },
            pediatrician: {
                name: pediatricianName,
                phone: pediatricianPhone,
                address: pediatricianAddress,
                isEditing: isEditingPediatrician
            },
            parking: { text: parkingText, isEditing: isEditingParking }
        },
        ui: {
            selectedCipher,
            selectedCommEntry,
            iceTab,
            activeTool,
            activeGenre,
            isGeneratingImage
        }
    } = state;

    // Ref for the printable card
    const cardRef = useRef<HTMLDivElement>(null);

    // Bag Progress
    const totalBagItems = HOSPITAL_BAG_CHECKLIST.reduce((acc, cat) => acc + cat.items.length, 0) + customHospitalBagGear.length;
    const checkedBagItems = hospitalBagChecklist.length + customHospitalBagGear.filter(i => i.bought).length;
    const bagProgressPercent = totalBagItems > 0 ? Math.round((checkedBagItems / totalBagItems) * 100) : 0;

    // Find the closest recon data (not just exact match, but the latest applicable)
    const rawRecon = PARTNER_RECON[currentWeek] || PARTNER_RECON[40] || "";
    const availableIntel = {
        intel: rawRecon.split('\n').find(l => l.startsWith('- Situace:'))?.replace('- Situace:', '').trim() || "Situace nejasná.",
        advice: rawRecon.split('\n').find(l => l.startsWith('- Rada:'))?.replace('- Rada:', '').trim() || "Drž pozice.",
        psychology: rawRecon.split('\n').find(l => l.startsWith('- Intel:'))?.replace('- Intel:', '').trim() || "Tajné.",
        physical: rawRecon.split('\n').find(l => l.startsWith('- Úkol:'))?.replace('- Úkol:', '').trim() || "Odpočívej."
    };

    const handleSaveTarget = () => {
        if (onSaveHospital) {
            onSaveHospital(targetInput);
            dispatch({ type: 'SET_TARGET_EDITING', value: false });
        }
    };

    const handleAddContact = () => {
        if (newContactName && newContactPhone && onSaveBackupContacts) {
            const newContact: Contact = {
                id: Date.now().toString(),
                name: newContactName,
                phone: newContactPhone
            };
            onSaveBackupContacts([...backupContacts, newContact]);
            dispatch({ type: 'RESET_CONTACT_FORM' });
        }
    };

    const handleDeleteContact = (id: string) => {
        if (onSaveBackupContacts) {
            const updated = backupContacts.filter(c => c.id !== id);
            onSaveBackupContacts(updated);
        }
    };

    const handleSavePartnerPhone = () => {
        if (onSavePartnerPhone) {
            onSavePartnerPhone(partnerPhoneInput);
            dispatch({ type: 'SET_PARTNER_EDITING', value: false });
        }
    }

    const handleSavePediatrician = () => {
        if (onSavePediatrician) {
            onSavePediatrician(pediatricianName, pediatricianPhone, pediatricianAddress);
            dispatch({ type: 'SET_PEDIATRICIAN_EDITING', value: false });
        }
    };


    const handlePharmacySearch = () => {
        window.open('https://www.google.com/maps/search/lékárna+nonstop/', '_blank');
    };

    const handleDownloadCard = async () => {
        if (cardRef.current && !isGeneratingImage) {
            dispatch({ type: 'SET_GENERATING_IMAGE', value: true });
            try {
                const canvas = await html2canvas(cardRef.current, {
                    backgroundColor: '#ffffff',
                    scale: 2 // Higher resolution
                });

                const link = document.createElement('a');
                link.download = `Krizovy-Stitek-${new Date().toISOString().split('T')[0]}.jpg`;
                link.href = canvas.toDataURL('image/jpeg', 0.9);
                link.click();
            } catch (error) {
                console.error("Error generating card image:", error);
                alert("Nepodařilo se vygenerovat obrázek. Zkuste to prosím znovu.");
            } finally {
                dispatch({ type: 'SET_GENERATING_IMAGE', value: false });
            }
        }
    };

    const handleVisitorStatus = (status: 'bunker' | 'family' | 'open') => {
        if (onSaveVisitorStatus) {
            onSaveVisitorStatus(status);
        }
    }

    const handleMusicSelect = (genre: string) => {
        dispatch({ type: 'SET_ACTIVE_GENRE', value: genre });
        if (onSaveMusicPreference) {
            onSaveMusicPreference(genre);
        }
    }

    const handleLogWater = (color: 'clear' | 'green' | 'blood' | 'unknown') => {
        if (onLogAmnioticFluid) {
            onLogAmnioticFluid(color);
        }
    }

    // --- RECON LOGIC ---


    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Localize content
    const localizedIntel = localizeText(availableIntel.intel, partnerName);
    const localizedAdvice = localizeText(availableIntel.advice, partnerName);
    const localizedPsych = localizeText(availableIntel.psychology, partnerName);
    const localizedPhys = localizeText(availableIntel.physical, partnerName);

    return (
        <div className="space-y-6 pb-20">
            {/* Enhanced Header - Simplified to Yellow/Slate */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#f6c453]/10 via-slate-500/5 to-slate-500/10 border border-[#f6c453]/20 p-6 shadow-lg shadow-[#f6c453]/5 group">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2Y2YzQ1MyIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30 group-hover:opacity-40 transition-opacity"></div>

                <div className="relative flex items-center gap-3">
                    <div className="p-3 bg-[#f6c453]/10 rounded-xl backdrop-blur-sm group-hover:scale-110 group-hover:rotate-12 transition-transform">
                        <Compass className="w-6 h-6 text-[#f6c453]" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black italic uppercase accent-text tracking-tight inline-block pr-3 group-hover:translate-x-1 transition-transform">
                            Průzkum Bojiště
                        </h2>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                            Intel • Týden {currentWeek}
                        </p>
                    </div>
                </div>
            </div>

            {/* TACTICAL TOOLS - Redesigned Grid Layout */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#f6c453]/30 to-transparent"></div>
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#f6c453]/60">Taktické Nástroje</h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#f6c453]/30 to-transparent"></div>
                </div>

                {/* Main Tools Grid */}
                <div className="grid grid-cols-3 gap-3 animate-slide-up">
                    {/* Movement Tracker Card */}
                    <button
                        onClick={() => dispatch({ type: 'SET_ACTIVE_TOOL', value: activeTool === 'kicks' ? 'none' : 'kicks' })}
                        className={`group relative overflow-hidden rounded-3xl border-2 transition-all duration-300 py-5 active:scale-95 tap-effect card-tactical ${activeTool === 'kicks'
                            ? 'bg-[#f6c453]/10 border-[#f6c453]/40 shadow-lg shadow-[#f6c453]/10'
                            : 'bg-white/5 border-white/20 hover:border-[#f6c453]/30 hover:bg-[#f6c453]/5'
                            }`}
                    >
                        <div className="relative flex flex-col items-center gap-3 transition-transform group-hover:-translate-y-1">
                            <div className={`p-2.5 rounded-2xl transition-all ${activeTool === 'kicks' ? 'bg-[#f6c453]/20 scale-110' : 'bg-white/5 group-hover:bg-[#f6c453]/10'}`}>
                                <Footprints className={`w-5 h-5 transition-all ${activeTool === 'kicks' ? 'text-[#f6c453]' : 'text-white/40 group-hover:text-[#f6c453]/60'}`} />
                            </div>
                            <div className="text-center">
                                <p className={`text-[10px] font-black uppercase tracking-tighter ${activeTool === 'kicks' ? 'text-[#f6c453]' : 'text-white/70'}`}>
                                    Monitoring
                                </p>
                                <p className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-30 ${activeTool === 'kicks' ? 'text-[#f6c453]' : 'text-white'}`}>
                                    Pohybů
                                </p>
                            </div>
                        </div>
                    </button>

                    {/* Communication Manual Card */}
                    <button
                        onClick={() => {
                            dispatch({ type: 'TOGGLE_MODAL', modal: 'showCommManual' });
                            if (onViewManual) onViewManual();
                        }}
                        className="group relative overflow-hidden rounded-3xl border-2 py-5 transition-all duration-300 bg-white/5 border-white/20 hover:border-[#f6c453]/30 hover:bg-[#f6c453]/5 active:scale-95 tap-effect card-tactical"
                    >
                        <div className="relative flex flex-col items-center gap-3 transition-transform group-hover:-translate-y-1">
                            <div className="p-2.5 rounded-2xl transition-all bg-white/5 group-hover:bg-[#f6c453]/10">
                                <MessageSquareCode className="w-5 h-5 text-white/40 group-hover:text-[#f6c453]/60 transition-colors" />
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] font-black uppercase tracking-tighter text-white/70">
                                    Komunikační
                                </p>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 text-white">
                                    Manuál
                                </p>
                            </div>
                        </div>
                    </button>

                    {/* Medical Info Card */}
                    <MedicalInfoModal
                        medicalInfo={medicalInfo}
                        onSaveMedicalInfo={onSaveMedicalInfo}
                    />
                </div>

                {/* Expanded Tool Content */}
                {activeTool === 'kicks' && (
                    <div className="animate-slide-up">
                        <MovementTracker
                            firstKickDetected={firstKickDetected}
                            onReportFirstKick={onReportFirstKick}
                        />
                    </div>
                )}

                {activeTool === 'music' && (
                    <div className="glass-card p-6 rounded-3xl border-2 border-white/20 animate-slide-up bg-gradient-to-br from-[#f6c453]/5 to-slate-500/5">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-[#f6c453]/20 rounded-xl">
                                <Music className="w-6 h-6 text-[#f6c453]" />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-white uppercase tracking-widest">Akustické Krytí</h4>
                                <p className="text-[10px] text-[#f6c453]/60 font-bold uppercase tracking-wider">Hudba k porodu</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {MUSIC_GENRES.map((genre) => {
                                const Icon = { Guitar, Music2, Mic2, Music, Leaf }[genre.icon] || Music;
                                return (
                                    <button
                                        key={genre.id}
                                        onClick={() => handleMusicSelect(genre.id)}
                                        className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${activeGenre === genre.id
                                            ? 'bg-[#f6c453]/20 text-[#f6c453] border-[#f6c453]/40'
                                            : 'bg-[#1f2933] border-white/10 text-white/70 hover:border-[#f6c453]/30'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-center">{genre.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </section>

            {/* EMERGENCY PROTOCOLS */}
            <section className="space-y-4">
                <div className="flex items-center gap-3 px-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-red-400/60">Nouzové Protokoly</h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
                </div>

                <ICECard
                    partnerName={partnerName}
                    userName={userName}
                    hospitalTarget={hospitalTarget}
                    partnerPhone={partnerPhone}
                    backupContacts={backupContacts}
                    onSaveHospital={onSaveHospital}
                    onSaveBackupContacts={onSaveBackupContacts}
                    userBloodType={medicalInfo?.userBloodType}
                    partnerBloodType={medicalInfo?.partnerBloodType}
                />

                <HospitalBag
                    hospitalBagChecklist={hospitalBagChecklist}
                    onToggleHospitalBag={onToggleHospitalBag}
                    customHospitalBagGear={customHospitalBagGear}
                    onAddCustomHospitalBagGear={onAddCustomHospitalBagGear}
                    onDeleteCustomHospitalBagGear={onDeleteCustomHospitalBagGear}
                    onToggleCustomHospitalBagGear={onToggleCustomHospitalBagGear}
                    isDevMode={isDevMode}
                    onCompleteAllBag={onCompleteAllBag}
                    onResetAll={onResetAllBag}
                />

                <a
                    href="https://www.google.com/maps/search/nonstop+lékárna/@?hl=cs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-red-500/10 border border-red-500/20 text-red-400 py-5 rounded-3xl font-black uppercase text-xs tracking-widest shadow-lg shadow-red-500/5 hover:bg-red-500/20 transition-all active:scale-95 flex items-center justify-center gap-3 tap-effect btn-tactical"
                >
                    <Cross className="w-5 h-5" /> SOS Lékárna
                </a>

                <button
                    onClick={() => {
                        dispatch({ type: 'TOGGLE_MODAL', modal: 'showCrisisProtocol' });
                        if (onViewEmergency) onViewEmergency();
                    }}
                    className="w-full bg-red-500/10 border border-red-500/20 text-red-500 py-5 rounded-3xl font-black uppercase text-xs tracking-widest shadow-lg shadow-red-500/5 hover:bg-red-500/20 transition-all active:scale-95 flex items-center justify-center gap-3 tap-effect btn-tactical"
                >
                    <AlertTriangle className="w-5 h-5" /> Krizový Protokol
                </button>
            </section>

            {/* Communication Manual Modal */}
            <CommunicationManual
                showModal={showCommManual}
                onClose={() => dispatch({ type: 'TOGGLE_MODAL', modal: 'showCommManual' })}
                onEntryRead={onEntryRead}
            />

            {/* Crisis Protocol Modal */}
            {
                showCrisisProtocol && (
                    <CrisisProtocol onClose={() => dispatch({ type: 'TOGGLE_MODAL', modal: 'showCrisisProtocol' })} />
                )
            }
        </div >
    );
};
