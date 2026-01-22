import React, { useState, useRef } from 'react';
import { Siren, XIcon, Navigation, Stethoscope, Users, IdCard, Phone, Trash2, Plus, Download, Menu } from 'lucide-react';
import html2canvas from 'html2canvas';
import { navigateToAddress, makePhoneCall } from '../../utils';

interface Contact {
    id: string;
    name: string;
    phone: string;
}

interface ICECardProps {
    partnerName: string;
    userName: string | null;
    hospitalTarget?: string;
    partnerPhone?: string;
    backupContacts?: Contact[];
    onSaveHospital?: (target: string) => void;
    onSaveBackupContacts?: (contacts: Contact[]) => void;
    userBloodType?: string;
    partnerBloodType?: string;
}

export const ICECard: React.FC<ICECardProps> = ({
    partnerName,
    userName,
    hospitalTarget = '',
    partnerPhone = '',
    backupContacts = [],
    onSaveHospital,
    onSaveBackupContacts,
    userBloodType,
    partnerBloodType
}) => {
    const [showIceCard, setShowIceCard] = useState(false);
    const [iceTab, setIceTab] = useState<'target' | 'contacts' | 'card'>('target');

    // Target state
    const [isEditingTarget, setIsEditingTarget] = useState(!hospitalTarget);
    const [targetInput, setTargetInput] = useState(hospitalTarget);


    // Contacts state
    const [isAddingContact, setIsAddingContact] = useState(false);
    const [newContactName, setNewContactName] = useState('');
    const [newContactPhone, setNewContactPhone] = useState('');

    // Card export state
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleSaveTarget = () => {
        if (onSaveHospital && targetInput.trim()) {
            onSaveHospital(targetInput.trim());
            setIsEditingTarget(false);
        }
    };

    const handleNavigate = () => {
        if (hospitalTarget) {
            window.open(`https://www.google.com/maps/search/${encodeURIComponent(hospitalTarget)}`, '_blank');
        }
    };


    const handleCall = (phone: string) => {
        if (phone) {
            window.location.href = `tel:${phone}`;
        }
    };

    const handleAddContact = () => {
        if (newContactName.trim() && newContactPhone.trim() && onSaveBackupContacts) {
            const newContact: Contact = {
                id: Date.now().toString(),
                name: newContactName.trim(),
                phone: newContactPhone.trim()
            };
            onSaveBackupContacts([...backupContacts, newContact]);
            setNewContactName('');
            setNewContactPhone('');
            setIsAddingContact(false);
        }
    };

    const handleDeleteContact = (id: string) => {
        if (onSaveBackupContacts) {
            onSaveBackupContacts(backupContacts.filter(c => c.id !== id));
        }
    };

    const handleDownloadCard = async () => {
        if (!cardRef.current) return;
        setIsGeneratingImage(true);
        try {
            const canvas = await html2canvas(cardRef.current, { scale: 2, backgroundColor: '#ffffff' });
            const link = document.createElement('a');
            link.download = 'ice-card.jpg';
            link.href = canvas.toDataURL('image/jpeg', 0.95);
            link.click();
        } catch (error) {
            console.error('Failed to generate image:', error);
        } finally {
            setIsGeneratingImage(false);
        }
    };

    return (
        <section className={`glass-card p-0 rounded-[2.5rem] border-red-500/20 bg-red-500/5 transition-all duration-500 overflow-hidden relative shadow-[0_0_30px_rgba(239,68,68,0.1)]`}>
            {/* Main Trigger Button (Visible when closed) */}
            {!showIceCard && (
                <div onClick={() => setShowIceCard(true)} className="p-8 flex items-center justify-between cursor-pointer active:bg-red-500/10 transition-colors group">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30 animate-pulse group-hover:scale-110 group-hover:rotate-6 transition-transform">
                            <Siren className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-red-500 uppercase tracking-tight leading-none mb-1 group-hover:translate-x-1 transition-transform">Krizový Štítek</h3>
                            <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest">Navigace • Kontakty</p>
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-red-500/20 flex items-center justify-center group-hover:bg-red-500/10 transition-colors">
                        <Menu className="w-5 h-5 text-red-500" />
                    </div>
                </div>
            )}

            {/* Expanded Modal Content */}
            {showIceCard && (
                <div className="bg-[#1f2933] animate-fade-in h-[500px] flex flex-col">
                    {/* Header */}
                    <div className="p-5 border-b border-white/20 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Siren className="w-5 h-5 text-red-500 animate-bounce" />
                            <h3 className="text-sm font-black text-red-500 uppercase tracking-widest">Krizový Štítek</h3>
                        </div>
                        <button onClick={() => setShowIceCard(false)} className="p-2 bg-black/20 rounded-lg text-white/50 hover:text-white hover:bg-red-500/20 transition-all active:scale-95">
                            <XIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {/* NAVIGACE TAB */}
                        {iceTab === 'target' && (
                            <div className="space-y-6 animate-slide-up">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-3 border border-blue-500/30">
                                        <Navigation className="w-8 h-8 text-blue-500" />
                                    </div>
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight">Cíl Výsadku</h2>
                                    <p className="text-xs opacity-50 uppercase tracking-widest">Taktická navigace</p>
                                </div>

                                <div className="bg-[#2d3748] p-4 rounded-2xl border border-white/20 space-y-3">
                                    {isEditingTarget ? (
                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                value={targetInput}
                                                onChange={(e) => setTargetInput(e.target.value)}
                                                placeholder="Název porodnice / Adresa"
                                                className="w-full bg-[#1f2933] border-2 border-white/20 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-blue-400"
                                            />
                                            <button
                                                onClick={handleSaveTarget}
                                                className="w-full bg-blue-500 text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest"
                                            >
                                                Uložit Cíl
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex justify-between items-center px-2">
                                                <p className="font-bold text-lg truncate text-white">{hospitalTarget || 'Nezadáno'}</p>
                                                <button onClick={() => setIsEditingTarget(true)} className="text-[10px] opacity-40 uppercase tracking-widest hover:opacity-100">Změnit</button>
                                            </div>
                                            <button
                                                onClick={handleNavigate}
                                                disabled={!hospitalTarget}
                                                className="w-full bg-blue-500 text-white shadow-lg shadow-blue-500/20 py-5 rounded-xl font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
                                            >
                                                <Navigation className="w-5 h-5 fill-current" /> Navigovat
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}


                        {/* CONTACTS TAB */}
                        {iceTab === 'contacts' && (
                            <div className="space-y-6 animate-slide-up">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-3 border border-purple-500/30">
                                        <Users className="w-8 h-8 text-purple-500" />
                                    </div>
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight">Tým Podpory</h2>
                                    <p className="text-xs opacity-50 uppercase tracking-widest">Záložní kontakty</p>
                                </div>

                                {/* Contact List */}
                                <div className="space-y-3">
                                    {backupContacts.map((contact) => (
                                        <div key={contact.id} className="bg-[#2d3748] p-4 rounded-2xl border border-white/20 flex items-center justify-between">
                                            <div>
                                                <p className="font-bold text-white text-sm">{contact.name}</p>
                                                <p className="text-xs opacity-50 font-mono">{contact.phone}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleCall(contact.phone)} className="p-3 bg-purple-500 rounded-xl text-white shadow-lg shadow-purple-500/20 active:scale-90 transition-transform">
                                                    <Phone className="w-4 h-4 fill-current" />
                                                </button>
                                                <button onClick={() => handleDeleteContact(contact.id)} className="p-3 bg-white/5 rounded-xl text-rose-500 border border-white/20 hover:bg-rose-500/10 active:scale-90 transition-transform">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Add New Contact Form */}
                                    {isAddingContact ? (
                                        <div className="bg-[#2d3748] p-4 rounded-2xl border border-purple-500/30 animate-fade-in space-y-3">
                                            <input
                                                type="text"
                                                value={newContactName}
                                                onChange={(e) => setNewContactName(e.target.value)}
                                                placeholder="Jméno (např. Děda)"
                                                className="w-full bg-[#1f2933] p-3 rounded-xl text-sm border-2 border-white/20"
                                            />
                                            <input
                                                type="tel"
                                                value={newContactPhone}
                                                onChange={(e) => setNewContactPhone(e.target.value)}
                                                placeholder="Telefon"
                                                className="w-full bg-[#1f2933] p-3 rounded-xl text-sm border-2 border-white/20"
                                            />
                                            <div className="flex gap-2">
                                                <button onClick={handleAddContact} className="flex-1 bg-purple-500 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest">Uložit</button>
                                                <button onClick={() => setIsAddingContact(false)} className="px-4 bg-white/5 text-white/50 rounded-xl font-bold text-xs uppercase">Zrušit</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setIsAddingContact(true)}
                                            className="w-full py-4 border border-dashed border-white/20 rounded-2xl text-white/40 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/5 hover:text-white transition-all"
                                        >
                                            <Plus className="w-4 h-4" /> Přidat Kontakt
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* PRINTABLE CARD TAB */}
                        {iceTab === 'card' && (
                            <div className="animate-slide-up flex flex-col items-center">
                                <div className="text-center mb-6">
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight">Tisková Karta</h2>
                                    <p className="text-xs opacity-50 uppercase tracking-widest">Na lednici / Do peněženky</p>
                                </div>

                                {/* The Card - Designed for Print/Export */}
                                <div
                                    ref={cardRef}
                                    className="w-full bg-white text-black p-6 rounded-xl shadow-2xl relative overflow-hidden mb-6 max-w-[320px]"
                                >
                                    <div className="absolute inset-0 bg-[#f0f0f0] opacity-50 pointer-events-none"></div>
                                    <div className="relative z-10 space-y-4">
                                        <div className="flex justify-between items-center border-b-2 border-red-600 pb-2">
                                            <h2 className="text-lg font-black uppercase tracking-tighter text-red-600 leading-none">IN CASE OF<br />EMERGENCY</h2>
                                            <Siren className="w-6 h-6 text-red-600" />
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 block mb-0.5">Cíl (Porodnice)</label>
                                            <p className="font-bold text-base leading-tight break-words">{hospitalTarget || '--- NEZADÁNO ---'}</p>
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 block mb-0.5">Partneři</label>
                                            <div className="flex items-baseline justify-between gap-2">
                                                <p className="font-bold text-sm leading-tight">{userName || '---'}</p>
                                                {userBloodType && (
                                                    <span className="text-xs font-mono bg-red-100 text-red-700 px-2 py-0.5 rounded">{userBloodType}</span>
                                                )}
                                            </div>
                                            <div className="flex items-baseline justify-between gap-2 mt-1">
                                                <p className="font-bold text-sm leading-tight">{partnerName}</p>
                                                {partnerBloodType && (
                                                    <span className="text-xs font-mono bg-red-100 text-red-700 px-2 py-0.5 rounded">{partnerBloodType}</span>
                                                )}
                                            </div>
                                            <p className="text-xs font-mono mt-1">{partnerPhone || '---'}</p>
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 block mb-1">Záložní Tým (Backup)</label>
                                            {backupContacts.length > 0 ? (
                                                <ul className="text-xs space-y-1">
                                                    {backupContacts.slice(0, 3).map(c => (
                                                        <li key={c.id} className="flex justify-between border-b border-black/10 pb-0.5 last:border-0">
                                                            <span className="font-bold truncate pr-2">{c.name}</span>
                                                            <span className="font-mono">{c.phone}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-xs opacity-50 italic">--- Žádné kontakty ---</p>
                                            )}
                                        </div>

                                        <div className="pt-2 border-t-2 border-red-600 text-center">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-red-600">OPERACE VÝSADEK - PRIORITA ALFA</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleDownloadCard}
                                    disabled={isGeneratingImage}
                                    className="w-full bg-white text-black py-4 rounded-xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all disabled:opacity-50"
                                >
                                    {isGeneratingImage ? 'Generuji...' : <><Download className="w-4 h-4" /> Uložit jako JPG</>}
                                </button>
                                <p className="text-[10px] opacity-40 mt-3 text-center px-4">
                                    Tip: Obrázek si vytiskni a dej na lednici nebo do peněženky pro případ vybitého telefonu.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Bottom Navigation */}
                    <div className="p-2 grid grid-cols-3 gap-2 border-t border-white/20 bg-black/20">
                        <button
                            onClick={() => setIceTab('target')}
                            className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all ${iceTab === 'target' ? 'bg-blue-500 text-white shadow-lg' : 'text-white/30 hover:bg-white/5'}`}
                        >
                            <Navigation className="w-5 h-5 mb-1" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Cíl</span>
                        </button>
                        <button
                            onClick={() => setIceTab('contacts')}
                            className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all ${iceTab === 'contacts' ? 'bg-purple-500 text-white shadow-lg' : 'text-white/30 hover:bg-white/5'}`}
                        >
                            <Users className="w-5 h-5 mb-1" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Tým</span>
                        </button>
                        <button
                            onClick={() => setIceTab('card')}
                            className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all ${iceTab === 'card' ? 'bg-white text-black shadow-lg' : 'text-white/30 hover:bg-white/5'}`}
                        >
                            <IdCard className="w-5 h-5 mb-1" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Štítek</span>
                        </button>
                    </div>
                </div>
            )
            }
        </section >
    );
};
