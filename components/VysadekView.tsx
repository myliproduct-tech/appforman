import React from 'react';
import { Timer, Droplets, Siren, MapPin, Heart, ShieldAlert, Zap, Baby, ClipboardCheck, Bed, Trophy, ChevronDown, ChevronUp, Navigation, Phone, Stethoscope, Users } from 'lucide-react';
import { ContractionTimer } from './recon/ContractionTimer';
import { AmnioticFluid } from './recon/AmnioticFluid';
import { GoldenHour } from './recon/GoldenHour';
import { MissionCompletionModal } from './vysadek/MissionCompletionModal';
import { UserStats } from '../types';
import { useVysadekReducer } from '../hooks/useVysadekReducer';
import { navigateToAddress, makePhoneCall } from '../utils';

interface Contact {
    id: string;
    name: string;
    phone: string;
}

interface VysadekViewProps {
    partnerName: string;
    hospitalTarget: string;
    amnioticFluidLog: { time: string; color: 'clear' | 'green' | 'blood' | 'unknown' } | null;
    onLogAmnioticFluid: (color: 'clear' | 'green' | 'blood' | 'unknown') => void;
    onExit: () => void;
    stats: UserStats;
    // Data pro ICE Card (duplikace do Logistiky)
    partnerPhone?: string;
    pediatricianContact?: { name: string; phone: string; address: string };
    backupContacts?: Contact[];
}

export const VysadekView: React.FC<VysadekViewProps> = ({
    partnerName,
    hospitalTarget,
    amnioticFluidLog,
    onLogAmnioticFluid,
    onExit,
    stats,
    partnerPhone,
    pediatricianContact,
    backupContacts = []
}) => {
    // Use reducer for state management
    const { state, dispatch } = useVysadekReducer();
    const { activeTab } = state.tabs;
    const { isProtocolOpen, showCompletionModal, babyGender } = state.ui;



    const protocolItems = [
        { title: 'Změna strategie', text: 'Někdy se musí přejít k „Plánu B“ (např. císařský řez). Je to standardní postup pro bezpečí obou. Důvěřuj týmu.' },
        { title: 'Emoční bouře', text: 'Partnerka může v bolestech říkat věci, které tak nemyslí, nebo tě odhánět. Buď její kotva a neber si to osobně.' },
        { title: 'Zásah týmu', text: 'Pokud se kolem vás najednou objeví víc lékařů, zachovej klid a ustup jim z cesty. Jsou tam, aby vše proběhlo na 100 %.' },
        { title: 'Tvá role', text: 'I když se děje něco nečekaného, tvůj klidný hlas a přítomnost jsou pro ni ten nejdůležitější lék.' }
    ];

    return (
        <div className="fixed inset-0 z-[100] bg-[#0f172a] text-white flex flex-col animate-fade-in overflow-y-auto no-scrollbar">
            {/* Krizová Hlavička */}
            <header className="p-6 bg-rose-600 shadow-2xl flex justify-between items-center sticky top-0 z-[110]">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl animate-pulse">
                        <Siren className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black italic uppercase tracking-tighter leading-none">VÝSADEK V BĚHU</h2>
                        <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mt-1">Live Operace</p>
                    </div>
                </div>
                <button
                    onClick={onExit}
                    className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/20 flex items-center gap-2 transition-all active:scale-95"
                >
                    <Zap className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase">Planý poplach</span>
                </button>
            </header>

            <main className="flex-1 p-4 space-y-6 max-w-xl mx-auto w-full pb-32">

                {/* HLAVNÍ MENU - TŘI FÁZE */}
                <div className="flex p-1 bg-white/5 rounded-[2rem] border border-white/10 shadow-inner sticky top-24 z-[105] backdrop-blur-md">
                    <button
                        onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', value: 'logistika' })}
                        className={`flex-1 py-3 rounded-[1.5rem] flex flex-col items-center justify-center gap-1 transition-all duration-300 ${activeTab === 'logistika' ? 'bg-[#f6c453] text-[#1f2933] shadow-lg scale-105' : 'text-white/40 hover:text-white/70 hover:bg-white/5'}`}
                    >
                        <ClipboardCheck className={`w-4 h-4 ${activeTab === 'logistika' ? 'animate-bounce' : ''}`} />
                        <span className="text-[10px] font-black uppercase tracking-tight">1. Logistika</span>
                    </button>
                    <button
                        onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', value: 'porod' })}
                        className={`flex-1 py-3 rounded-[1.5rem] flex flex-col items-center justify-center gap-1 transition-all duration-300 ${activeTab === 'porod' ? 'bg-rose-500 text-white shadow-lg scale-105' : 'text-white/40 hover:text-white/70 hover:bg-white/5'}`}
                    >
                        <Siren className={`w-4 h-4 ${activeTab === 'porod' ? 'animate-pulse' : ''}`} />
                        <span className="text-[10px] font-black uppercase tracking-tight">2. Porod</span>
                    </button>
                    <button
                        onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', value: 'zlatahodinka' })}
                        className={`flex-1 py-3 rounded-[1.5rem] flex flex-col items-center justify-center gap-1 transition-all duration-300 ${activeTab === 'zlatahodinka' ? 'bg-amber-500 text-[#1f2933] shadow-lg scale-105' : 'text-white/40 hover:text-white/70 hover:bg-white/5'}`}
                    >
                        <Heart className={`w-4 h-4 ${activeTab === 'zlatahodinka' ? 'animate-ping' : ''}`} />
                        <span className="text-[10px] font-black uppercase tracking-tight">3. Hodinka</span>
                    </button>
                </div>

                {/* AKTIVNÍ OBSAH */}
                <div className="animate-slide-up space-y-8">

                    {/* FÁZE 1: LOGISTIKA */}
                    {activeTab === 'logistika' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* BOX NAVIGACE */}
                                <div className="glass-card p-6 rounded-[2.5rem] border-[#f6c453]/20 bg-[#f6c453]/5 flex flex-col justify-between group">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-5 h-5 text-[#f6c453] group-hover:scale-110 transition-transform" />
                                            <h3 className="text-xs font-black text-[#f6c453] uppercase tracking-widest">Navigace</h3>
                                        </div>
                                        <div className="flex items-center gap-2 px-1">
                                            <Navigation className="w-4 h-3 text-[#f6c453]/50" />
                                            <p className="font-bold text-xs text-white/80 truncate">{hospitalTarget || 'Nezadána'}</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => navigateToAddress(hospitalTarget)}
                                        disabled={!hospitalTarget}
                                        className="mt-4 w-full bg-[#f6c453] text-[#1f2933] shadow-lg shadow-[#f6c453]/20 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50 hover:bg-[#ffcf60]"
                                    >
                                        <Navigation className="w-4 h-4 fill-current" /> Navigovat
                                    </button>
                                </div>

                                {/* BOX KONTAKTY */}
                                <div className="glass-card p-6 rounded-[2.5rem] border-white/10 bg-white/5 flex flex-col justify-between group">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Users className="w-5 h-5 text-[#f6c453] group-hover:scale-110 transition-transform" />
                                        <h3 className="text-xs font-black text-[#f6c453] uppercase tracking-widest">Kontakty</h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        {backupContacts.slice(0, 2).map((contact) => (
                                            <button
                                                key={contact.id}
                                                onClick={() => makePhoneCall(contact.phone)}
                                                className="bg-white/5 border border-white/10 p-3 rounded-2xl flex flex-col items-center gap-1 active:scale-95 transition-all text-center hover:bg-[#f6c453]/10 hover:border-[#f6c453]/20 group/btn"
                                            >
                                                <Phone className="w-4 h-4 text-[#f6c453]/60 fill-current group-hover/btn:text-[#f6c453] transition-colors" />
                                                <span className="text-[10px] font-black uppercase tracking-tighter text-white/60 truncate w-full">{contact.name}</span>
                                            </button>
                                        ))}
                                        {backupContacts.length === 0 && (
                                            <div className="col-span-2 py-4 text-center">
                                                <p className="text-[10px] text-white/20 italic">Zatím bez kontaktů</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card p-6 rounded-[2rem] border-white/5 bg-white/[0.02] space-y-6">
                                <h4 className="text-xs font-black text-[#f6c453] uppercase tracking-widest flex items-center gap-2">
                                    <ClipboardCheck className="w-5 h-5" /> Co nezapomenout při odjezdu
                                </h4>
                                <ul className="space-y-3">
                                    {[
                                        'Podložka pod partnerku do auta (pro jistotu)',
                                        'Všechny doklady (OP, těhotenská průkazka, oddací list/prohlášení)',
                                        'Taška do porodnice (už musí být v autě)',
                                        'Nabíječky na telefony a powerbanku',
                                        'Přezůvky pro tebe i pro ni'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5 group">
                                            <div className="mt-1 w-2 h-2 rounded-full bg-[#f6c453]/40 group-hover:scale-125 transition-transform shadow-[0_0_5px_rgba(246,196,83,0.5)]"></div>
                                            <span className="text-xs font-medium text-white/80">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="p-4 bg-[#f6c453]/5 rounded-2xl border border-[#f6c453]/10">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#f6c453] mb-2">Taktická poznámka:</p>
                                    <p className="text-[11px] text-white/60 leading-relaxed italic">
                                        Partnerka teď potřebuje tvůj klid a jistotu, ne stress z hledání klíčů.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* FÁZE 2: AKTIVNÍ POROD */}
                    {activeTab === 'porod' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-[2.5rem]">
                                    <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <ShieldAlert className="w-4 h-4" /> Pozor na poslíčky
                                    </h4>
                                    <p className="text-xs text-amber-200/90 leading-relaxed italic font-medium">
                                        Pravé kontrakce neustávají v teplé sprše ani při změně polohy. Jsou pravidelné a jejich intenzita postupně roste. Pokud máš pochybnost, navrhni, ať si dá teplou sprchu.
                                    </p>
                                </div>

                                <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-[2.5rem] flex items-center gap-6">
                                    <div className="text-4xl font-black text-emerald-400 italic">5-1-1</div>
                                    <div className="text-[10px] text-white/70 leading-relaxed font-bold uppercase tracking-tight">
                                        Kontrakce každých <span className="text-emerald-400 text-sm">5</span> minut,
                                        trvající <span className="text-emerald-400 text-sm">1</span> minutu,
                                        po dobu <span className="text-emerald-400 text-sm">1</span> hodiny.
                                        <span className="block mt-1 text-emerald-500/60 lowercase">= čas vyrazit do nemocnice.</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-4 flex items-center gap-2">
                                    <Timer className="w-3 h-3" /> Monitoring Kontrakcí
                                </h3>
                                <ContractionTimer />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-4 flex items-center gap-2">
                                    <Droplets className="w-3 h-3" /> Stav Plodové Vody
                                </h3>
                                <AmnioticFluid
                                    partnerName={partnerName}
                                    amnioticFluidLog={amnioticFluidLog}
                                    onLogAmnioticFluid={onLogAmnioticFluid}
                                />
                            </div>

                            {/* ROZKLIKÁVACÍ KRIZOVÝ PROTOKOL */}
                            <div className="glass-card rounded-[2rem] border-rose-500/20 bg-rose-500/5 overflow-hidden">
                                <button
                                    onClick={() => dispatch({ type: 'TOGGLE_PROTOCOL' })}
                                    className="w-full p-6 flex items-center justify-between hover:bg-rose-500/10 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <ShieldAlert className="w-5 h-5 text-rose-400" />
                                        <h4 className="text-xs font-black text-rose-400 uppercase tracking-widest">Krizový protokol: Když plány selžou</h4>
                                    </div>
                                    {isProtocolOpen ? <ChevronUp className="w-5 h-5 text-rose-400" /> : <ChevronDown className="w-5 h-5 text-rose-400" />}
                                </button>

                                {isProtocolOpen && (
                                    <div className="px-6 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
                                        {protocolItems.map((item, i) => (
                                            <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">{item.title}</p>
                                                <p className="text-[11px] text-white/70 leading-relaxed italic">{item.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="p-4 bg-rose-500/5 rounded-2xl border border-rose-500/10">
                                <p className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-2">Protokol u porodu:</p>
                                <p className="text-[11px] text-white/60 leading-relaxed italic">
                                    Věci se mohou dít rychle. Personál může zvýšit hlas nebo tě požádat o odstup – neber si to osobně, chrání život. Tvé role je být klidný bod, držet ruku a nepanikařit.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* FÁZE 3: ZLATÁ HODINKA */}
                    {activeTab === 'zlatahodinka' && (
                        <div className="space-y-6">
                            {/* Gender Selection */}
                            <div className="glass-card p-6 rounded-[2.5rem] border-amber-500/20 bg-amber-500/[0.02]">
                                <h4 className="text-xs font-black uppercase tracking-widest text-[#f6c453] mb-4 flex items-center gap-2">
                                    <Baby className="w-5 h-5 transition-transform group-hover:scale-110" />
                                    Pohlaví Juniora
                                </h4>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => dispatch({ type: 'SET_BABY_GENDER', value: 'boy' })}
                                        className={`flex-1 py-4 rounded-xl font-black text-sm transition-all border-2 flex items-center justify-center gap-2 ${babyGender === 'boy'
                                            ? 'bg-blue-500 text-white border-blue-400 shadow-lg shadow-blue-500/30 scale-105'
                                            : 'bg-white/5 text-white/40 border-white/10 hover:bg-white/10'
                                            }`}
                                    >
                                        <Baby className="w-6 h-6" />
                                        <span>Kluk</span>
                                    </button>
                                    <button
                                        onClick={() => dispatch({ type: 'SET_BABY_GENDER', value: 'girl' })}
                                        className={`flex-1 py-4 rounded-xl font-black text-sm transition-all border-2 flex items-center justify-center gap-2 ${babyGender === 'girl'
                                            ? 'bg-pink-500 text-white border-pink-400 shadow-lg shadow-pink-500/30 scale-105'
                                            : 'bg-white/5 text-white/40 border-white/10 hover:bg-white/10'
                                            }`}
                                    >
                                        <Baby className="w-6 h-6" />
                                        <span>Holka</span>
                                    </button>
                                </div>
                            </div>

                            <div className="glass-card p-6 rounded-[2.5rem] border-amber-500/20 bg-amber-500/[0.02]">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-[#f6c453]/20 rounded-2xl group-hover:scale-110 transition-transform">
                                        <Baby className="w-6 h-6 text-[#f6c453]" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black uppercase tracking-widest text-[#f6c453]">První společné chvíle</h4>
                                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Live Protokol</p>
                                    </div>
                                </div>

                                <GoldenHour />

                                <div className="mt-8 p-5 bg-white/5 rounded-2xl border border-white/5 group">
                                    <h5 className="text-[10px] font-black uppercase tracking-widest text-[#f6c453] mb-3 flex items-center gap-1.5"><Bed className="w-3 h-3 group-hover:translate-x-1 transition-transform" /> Přežití v nemocnici:</h5>
                                    <p className="text-[11px] text-white/70 leading-relaxed font-medium">
                                        Měj u sebe rychlou energii (hroznový cukr, energy tyčinku). Čekání může být dlouhé. Měj drobné na automat na kávu. Buď připraven na vedro v sále. Pokud tě pošlou domů se vyspat (po porodu), udělej to – tvá síla bude brzy potřeba.
                                    </p>
                                </div>
                            </div>

                            <div className="pt-10">
                                <button
                                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black py-6 rounded-[2.5rem] shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-4 active:scale-95 transition-all text-sm uppercase tracking-[0.3em] border-2 border-emerald-400/30 group"
                                    onClick={() => dispatch({ type: 'SET_COMPLETION_MODAL', value: true })}
                                >
                                    <Trophy className="w-6 h-6 text-emerald-300 group-hover:animate-bounce" />
                                    <span>Mise výsadek dokončena</span>
                                    <Trophy className="w-6 h-6 text-emerald-300 group-hover:animate-bounce" />
                                </button>
                                <p className="text-center text-[10px] text-white/20 font-bold uppercase tracking-widest mt-6 italic">Vítej na světě, Juniori! ✨</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Mission Completion Modal */}
            {showCompletionModal && (
                <MissionCompletionModal
                    stats={stats}
                    babyGender={babyGender}
                    babyNames={stats.babyNames || []}
                    onClose={() => dispatch({ type: 'SET_COMPLETION_MODAL', value: false })}
                />
            )}
        </div>
    );
};
