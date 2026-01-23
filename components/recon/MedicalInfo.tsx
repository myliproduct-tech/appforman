import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { XIcon, Heart, Calendar, Plus, Trash2, FileText } from 'lucide-react';
import { MedicalInfo, CheckupDate } from '../../types';
import { DatePickerModal } from '../common/DatePickerModal';

interface MedicalInfoProps {
    medicalInfo?: MedicalInfo;
    onSaveMedicalInfo?: (info: MedicalInfo) => void;
}

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-'];

export const MedicalInfoModal: React.FC<MedicalInfoProps> = ({
    medicalInfo = {},
    onSaveMedicalInfo
}) => {
    const [showModal, setShowModal] = useState(false);
    const [partnerBloodType, setPartnerBloodType] = useState(medicalInfo.partnerBloodType || '');
    const [userBloodType, setUserBloodType] = useState(medicalInfo.userBloodType || '');
    const [checkupDates, setCheckupDates] = useState<CheckupDate[]>(medicalInfo.checkupDates || []);
    const [notes, setNotes] = useState(medicalInfo.notes || '');

    // New checkup form
    const [isAddingCheckup, setIsAddingCheckup] = useState(false);
    const [newCheckupDate, setNewCheckupDate] = useState('');
    const [newCheckupNote, setNewCheckupNote] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Sync local state when prop changes (e.g. after initial load)
    React.useEffect(() => {
        if (medicalInfo) {
            setPartnerBloodType(medicalInfo.partnerBloodType || '');
            setUserBloodType(medicalInfo.userBloodType || '');
            setCheckupDates(medicalInfo.checkupDates || []);
            setNotes(medicalInfo.notes || '');
        }
    }, [medicalInfo]);

    const handleSave = (
        updatedPartnerBT?: string,
        updatedUserBT?: string,
        updatedDates?: CheckupDate[],
        updatedNotes?: string
    ) => {
        if (onSaveMedicalInfo) {
            onSaveMedicalInfo({
                partnerBloodType: updatedPartnerBT !== undefined ? updatedPartnerBT : partnerBloodType,
                userBloodType: updatedUserBT !== undefined ? updatedUserBT : userBloodType,
                checkupDates: updatedDates !== undefined ? updatedDates : checkupDates,
                notes: updatedNotes !== undefined ? updatedNotes : notes
            });
        }
    };

    const handleAddCheckup = () => {
        if (newCheckupDate) {
            const newCheckup: CheckupDate = {
                id: Date.now().toString(),
                date: newCheckupDate,
                note: newCheckupNote || 'Kontrola'
            };
            const updatedDates = [...checkupDates, newCheckup].sort((a, b) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            );
            setCheckupDates(updatedDates);
            setNewCheckupDate('');
            setNewCheckupNote('');
            setIsAddingCheckup(false);
            handleSave(undefined, undefined, updatedDates);
        }
    };

    const handleDeleteCheckup = (id: string) => {
        const updatedDates = checkupDates.filter(c => c.id !== id);
        setCheckupDates(updatedDates);
        handleSave(undefined, undefined, updatedDates);
    };

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="group relative overflow-hidden rounded-3xl border py-5 transition-all duration-300 bg-white/5 border-white/10 hover:border-pink-500/30 hover:bg-pink-500/5 active:scale-95 tap-effect card-tactical"
            >
                <div className="relative flex flex-col items-center gap-3 transition-transform group-hover:-translate-y-1">
                    <div className="p-2.5 rounded-2xl transition-all bg-white/5 group-hover:bg-pink-500/10">
                        <Heart className="w-5 h-5 text-white/40 group-hover:text-pink-500/60 transition-colors" />
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-black uppercase tracking-tighter text-white/70">
                            Medicínské
                        </p>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 text-white">
                            Info
                        </p>
                    </div>
                </div>
            </button>

            {/* Modal - Fullscreen Page Layout */}
            {showModal && ReactDOM.createPortal(
                <div className="fixed inset-0 z-[150] bg-[#1f2933] animate-fade-in">
                    <div className="h-screen flex flex-col">
                        {/* Fixed Header */}
                        <div className="flex justify-between items-center p-4 pt-6 border-b border-white/5 pb-4 shrink-0">
                            <div>
                                <h3 className="text-xl font-black italic uppercase text-[#f6c453] tracking-tighter">Medicínské Info</h3>
                                <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Zdravotní údaje</p>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                            >
                                <XIcon className="w-6 h-6 text-[#f6c453]" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="w-full max-w-xl mx-auto p-4 space-y-4 pb-10">
                                <div className="space-y-3">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-white/60">Krevní skupiny</h4>

                                    {/* Partner Blood Type */}
                                    <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2 block">Partnerka</label>
                                        <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
                                            {BLOOD_TYPES.map(type => (
                                                <button
                                                    key={type}
                                                    onClick={() => { setPartnerBloodType(type); handleSave(type); }}
                                                    className={`py-2 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all ${partnerBloodType === type
                                                        ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20'
                                                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                                                        }`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* User Blood Type */}
                                    <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2 block">Partner (Ty)</label>
                                        <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
                                            {BLOOD_TYPES.map(type => (
                                                <button
                                                    key={type}
                                                    onClick={() => { setUserBloodType(type); handleSave(undefined, type); }}
                                                    className={`py-2 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all ${userBloodType === type
                                                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                                                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                                                        }`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Checkup Dates */}
                                <div className="space-y-3">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-white/60">Data kontrol</h4>

                                    <div className="space-y-3">
                                        {checkupDates.map(checkup => (
                                            <div key={checkup.id} className="bg-white/5 rounded-2xl p-2 border border-white/10 flex items-center justify-between gap-2">
                                                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                                    <Calendar className="w-4 h-4 text-pink-400 shrink-0" />
                                                    <div className="min-w-0">
                                                        <p className="text-[10px] font-bold text-white truncate">{new Date(checkup.date).toLocaleDateString('cs-CZ')}</p>
                                                        <p className="text-[9px] text-white/50 truncate">{checkup.note}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteCheckup(checkup.id)}
                                                    className="p-2 bg-white/5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-all shrink-0"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}

                                        {/* Add New Checkup */}
                                        {isAddingCheckup ? (
                                            <div className="bg-pink-500/10 rounded-2xl p-4 border border-pink-500/30 space-y-3">
                                                <div>
                                                    <label className="block text-xs font-bold uppercase tracking-wider text-pink-400 mb-2">Datum kontroly</label>
                                                    <button
                                                        onClick={() => setShowDatePicker(true)}
                                                        className="w-full bg-[#1f2933] border border-pink-400/50 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-pink-400 text-white flex items-center justify-between hover:border-pink-400 transition-all"
                                                        style={{ minHeight: '44px' }}
                                                    >
                                                        <span className={newCheckupDate ? 'text-white' : 'text-white/40'}>
                                                            {newCheckupDate ? new Date(newCheckupDate).toLocaleDateString('cs-CZ', {
                                                                day: 'numeric',
                                                                month: 'long',
                                                                year: 'numeric'
                                                            }) : 'Vyberte datum'}
                                                        </span>
                                                        <Calendar className="w-5 h-5 text-pink-400" />
                                                    </button>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={newCheckupNote}
                                                    onChange={(e) => setNewCheckupNote(e.target.value)}
                                                    placeholder="Poznámka (např. Ultrazvuk)"
                                                    className="w-full bg-[#1f2933] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400"
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={handleAddCheckup}
                                                        className="flex-1 bg-pink-500 text-white py-2 sm:py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-pink-600 transition-all"
                                                    >
                                                        Uložit
                                                    </button>
                                                    <button
                                                        onClick={() => setIsAddingCheckup(false)}
                                                        className="px-3 sm:px-4 bg-white/5 text-white/50 rounded-xl font-bold text-xs uppercase hover:bg-white/10 transition-all"
                                                    >
                                                        Zrušit
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setIsAddingCheckup(true)}
                                                className="w-full py-4 border border-dashed border-white/20 rounded-2xl text-white/40 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/5 hover:text-white transition-all"
                                            >
                                                <Plus className="w-4 h-4" /> Přidat kontrolu
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Notes */}
                                <div className="space-y-3">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-white/60">Poznámky</h4>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => { setNotes(e.target.value); handleSave(undefined, undefined, undefined, e.target.value); }}
                                        placeholder="Další medicínské poznámky..."
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400 min-h-[80px] resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* Date Picker Modal - Also in Portal */}
            {ReactDOM.createPortal(
                <DatePickerModal
                    isOpen={showDatePicker}
                    onClose={() => setShowDatePicker(false)}
                    onSelect={(date) => {
                        setNewCheckupDate(date);
                        setShowDatePicker(false);
                    }}
                    initialDate={newCheckupDate}
                    title="Datum kontroly"
                />,
                document.body
            )}
        </>
    );
};
