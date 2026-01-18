import React, { useState } from 'react';
import { X, Truck, Check, Compass, Layers, ArrowUp, Disc, Activity, Weight, Minimize, Info, Star, ExternalLink } from 'lucide-react';

interface StrollerModel {
    name: string;
    brand: string;
    type: 'city' | 'mixed' | 'offroad';
    weight: number;
    priceRange: string;
    rating: number;
    pros: string[];
    cons: string[];
    heurekaLink: string;
}

const STROLLER_MODELS: StrollerModel[] = [
    {
        name: 'Fox 5',
        brand: 'Bugaboo',
        type: 'mixed',
        weight: 9.9,
        priceRange: '18-25k',
        rating: 5,
        pros: ['Lehký (9.9kg)', 'Kompaktní skládání', 'Kvalitní materiály', 'Snadná manévrovatelnost'],
        cons: ['Vysoká cena', 'Malý nákupní košík', 'Drahé příslušenství'],
        heurekaLink: 'https://kocarky.heureka.cz/bugaboo-fox-5/'
    },
    {
        name: 'Priam',
        brand: 'Cybex',
        type: 'city',
        weight: 11.5,
        priceRange: '25-35k',
        rating: 5,
        pros: ['Luxusní design', 'Skvělé odpružení', 'Velký košík', 'Mnoho barevných variant'],
        cons: ['Velmi drahý', 'Těžší (11.5kg)', 'Komplikované skládání'],
        heurekaLink: 'https://kocarky.heureka.cz/cybex-priam/'
    },
    {
        name: 'City Mini GT2',
        brand: 'Baby Jogger',
        type: 'mixed',
        weight: 10.2,
        priceRange: '12-18k',
        rating: 4,
        pros: ['Dobrý poměr cena/výkon', 'Rychlé skládání', 'Nafukovací kola', 'Kompaktní'],
        cons: ['Menší sedačka', 'Horší odpružení', 'Plastový vzhled'],
        heurekaLink: 'https://kocarky.heureka.cz/baby-jogger-city-mini-gt2/'
    },
    {
        name: 'Day+',
        brand: 'Joolz',
        type: 'city',
        weight: 10.8,
        priceRange: '20-28k',
        rating: 5,
        pros: ['Ekologické materiály', 'Moderní design', 'Skvělá manévrovatelnost', 'Velká korba'],
        cons: ['Drahý', 'Menší kola (horší na nerovnosti)', 'Omezená dostupnost'],
        heurekaLink: 'https://kocarky.heureka.cz/joolz-day/'
    },
    {
        name: 'Urban Glide 2',
        brand: 'Thule',
        type: 'offroad',
        weight: 11.8,
        priceRange: '15-20k',
        rating: 5,
        pros: ['Skvělý na běhání', 'Velká nafukovací kola', 'Ruční brzda', 'Odolný'],
        cons: ['Těžký (11.8kg)', 'Velký (nevejde se všude)', 'Drahé opravy kol'],
        heurekaLink: 'https://kocarky.heureka.cz/thule-urban-glide-2/'
    },
    {
        name: 'Evo',
        brand: 'Mutsy',
        type: 'mixed',
        weight: 10.5,
        priceRange: '15-22k',
        rating: 4,
        pros: ['Holandská kvalita', 'Velký košík', 'Pohodlná sedačka', 'Dobrá cena'],
        cons: ['Těžší skládání', 'Méně známá značka', 'Omezené příslušenství'],
        heurekaLink: 'https://kocarky.heureka.cz/mutsy-evo/'
    }
];

interface StrollerConfiguratorProps {
    vehicleModel?: string;
    onSaveVehicle?: (model: string) => void;
    onConfirmVehicle?: () => void;
    onClose: () => void;
}

export const StrollerConfigurator: React.FC<StrollerConfiguratorProps> = ({ vehicleModel = '', onSaveVehicle, onConfirmVehicle, onClose }) => {
    const [strollerPrefs, setStrollerPrefs] = useState({
        terrain: 'city' as 'city' | 'mixed' | 'offroad',
        storage: 'small' as 'small' | 'big',
        lift: true,
    });
    const [configTab, setConfigTab] = useState<'recommendation' | 'comparison'>('recommendation');

    const getStrollerRecommendation = () => {
        const { terrain, storage, lift } = strollerPrefs;

        const inputs = [
            terrain === 'city' ? 'Asfalt (Město)' : terrain === 'mixed' ? 'Mix (Parky)' : 'Terén (Les)',
            storage === 'small' ? 'Malý kufr' : 'Velký kufr',
            !lift ? 'Schody (Pěchota)' : 'Výtah (Mechanizace)'
        ];

        let className = "";
        let wheels = "";
        let suspension = "";
        let weightLimit = "";
        let folding = "";
        let tip = "";

        if (terrain === 'city') {
            className = "Městský Kompakt";
            wheels = "Menší, bezúdržbová (pěna), plně otočná";
            suspension = "Základní (priorita manévrovatelnost)";
        } else if (terrain === 'mixed') {
            className = "Univerzální Crossover";
            wheels = "Větší (gelová/pěnová)";
            suspension = "Odpružení všech kol (město i park)";
        } else {
            className = "Těžký Off-road Speciál";
            wheels = "Nafukovací velká (trojkolka/čtyřkolka)";
            suspension = "Aktivní tlumiče + Ruční brzda nutná!";
        }

        if (storage === 'small') {
            folding = "Podvozek 'na placku', skládací korba (Kritické!)";
        } else {
            folding = "Standardní (robustnost má přednost)";
        }

        if (!lift) {
            weightLimit = "POD 12 kg (Celý set). Ideálně < 10 kg.";
        } else {
            weightLimit = "Neomezeno (klidně 14+ kg pro stabilitu)";
        }

        if (!lift) {
            tip = "Jelikož to budeš tahat do schodů, kašli na design a řeš každé kilo váhy! Polský tank tě zničí.";
        } else if (storage === 'small') {
            tip = "Máš malý kufr. Než zaplatíš, vyzkoušej, jestli se tam kočár vejde i s nákupem.";
        } else if (terrain === 'offroad') {
            tip = "Na tankodromu potřebuješ nafukovací kola a ruční brzdu. S plastovými z toho budeš mít kostitřas.";
        } else {
            tip = "Máš ideální podmínky (Výtah + Hangár). Můžeš vybírat podle barvy a vychytávek.";
        }

        return { inputs, className, wheels, suspension, weightLimit, folding, tip };
    };

    const generateGoogleShoppingUrl = () => {
        const { terrain, storage, lift } = strollerPrefs;
        let searchTerms = ['kočárek', 'hluboká korba'];

        if (terrain === 'city') searchTerms.push('městský');
        else if (terrain === 'mixed') searchTerms.push('kombinovaný');
        else searchTerms.push('terénní');

        if (!lift) searchTerms.push('lehký', 'do 10kg');
        if (storage === 'small') searchTerms.push('kompaktní', 'skládací');

        const query = searchTerms.join(' ');
        return `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(query)}&hl=cs&gl=CZ`;
    };

    const configResult = getStrollerRecommendation();

    return (
        <div className="fixed inset-0 z-[70] bg-[#1f2933] overflow-y-auto animate-fade-in p-4 flex items-center justify-center">
            <div className="w-full max-w-sm glass-card p-6 rounded-[2rem] border-white/10 shadow-2xl relative max-h-full overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-black italic uppercase text-[#f6c453] tracking-tight">Konfigurátor Vozidla</h3>
                    <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><X className="w-5 h-5" /></button>
                </div>

                <div className="flex bg-[#2d3748] p-1 rounded-2xl mb-6">
                    <button
                        onClick={() => setConfigTab('recommendation')}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${configTab === 'recommendation' ? 'bg-[#f6c453] text-[#1f2933] shadow-lg' : 'text-white/40'}`}
                    >
                        Doporučení
                    </button>
                    <button
                        onClick={() => setConfigTab('comparison')}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${configTab === 'comparison' ? 'bg-[#f6c453] text-[#1f2933] shadow-lg' : 'text-white/40'}`}
                    >
                        Porovnání modelů
                    </button>
                </div>

                <div className="space-y-6">
                    {configTab === 'recommendation' && (
                        <>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#f6c453] mb-3 block flex items-center gap-2"><Compass className="w-3 h-3" /> 1. Operační Terén</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {(['city', 'mixed', 'offroad'] as const).map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setStrollerPrefs({ ...strollerPrefs, terrain: t })}
                                            className={`py-3 rounded-xl text-[10px] font-bold uppercase transition-all border ${strollerPrefs.terrain === t ? 'bg-[#f6c453] text-[#1f2933] border-[#f6c453]' : 'bg-[#1f2933] border-white/10 opacity-50'}`}
                                        >
                                            {t === 'city' ? 'Město' : t === 'mixed' ? 'Mix' : 'Terén'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#f6c453] mb-3 block flex items-center gap-2"><Layers className="w-3 h-3" /> 2. Kapacita Hangáru (Kufr)</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button onClick={() => setStrollerPrefs({ ...strollerPrefs, storage: 'small' })} className={`py-3 rounded-xl text-[10px] font-bold uppercase transition-all border ${strollerPrefs.storage === 'small' ? 'bg-[#f6c453] text-[#1f2933] border-[#f6c453]' : 'bg-[#1f2933] border-white/10 opacity-50'}`}>Malý (Hatchback)</button>
                                    <button onClick={() => setStrollerPrefs({ ...strollerPrefs, storage: 'big' })} className={`py-3 rounded-xl text-[10px] font-bold uppercase transition-all border ${strollerPrefs.storage === 'big' ? 'bg-[#f6c453] text-[#1f2933] border-[#f6c453]' : 'bg-[#1f2933] border-white/10 opacity-50'}`}>Velký (Combi/SUV)</button>
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#f6c453] mb-3 block flex items-center gap-2"><ArrowUp className="w-3 h-3" /> 3. Vertikální Mobilita</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button onClick={() => setStrollerPrefs({ ...strollerPrefs, lift: true })} className={`py-3 rounded-xl text-[10px] font-bold uppercase transition-all border ${strollerPrefs.lift ? 'bg-[#f6c453] text-[#1f2933] border-[#f6c453]' : 'bg-[#1f2933] border-white/10 opacity-50'}`}>Máme Výtah</button>
                                    <button onClick={() => setStrollerPrefs({ ...strollerPrefs, lift: false })} className={`py-3 rounded-xl text-[10px] font-bold uppercase transition-all border ${!strollerPrefs.lift ? 'bg-[#f6c453] text-[#1f2933] border-[#f6c453]' : 'bg-[#1f2933] border-white/10 opacity-50'}`}>Schody (Pěchota)</button>
                                </div>
                            </div>

                            <div className="bg-[#1f2933] border border-white/10 rounded-3xl p-5 mt-6 relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#f6c453]/10 rounded-full blur-3xl"></div>
                                <div className="text-center mb-6 relative z-10">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Doporučená třída</span>
                                    <h2 className="text-xl font-black italic uppercase text-[#f6c453] mt-1 tracking-tight">{configResult.className}</h2>
                                    <div className="flex justify-center gap-2 mt-3 flex-wrap">
                                        {configResult.inputs.map((inp, idx) => (
                                            <span key={idx} className="bg-white/5 border border-white/10 px-2 py-1 rounded-md text-[10px] font-bold text-white/60 uppercase">{inp}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                                    <div className="bg-black/20 p-3 rounded-2xl border border-white/5 flex flex-col justify-between">
                                        <div className="flex items-center gap-2 mb-1 opacity-50">
                                            <Disc className="w-3 h-3 text-[#f6c453]" />
                                            <span className="text-[10px] uppercase font-bold tracking-wider">Kola</span>
                                        </div>
                                        <p className="text-[10px] font-bold text-white leading-tight">{configResult.wheels}</p>
                                    </div>
                                    <div className="bg-black/20 p-3 rounded-2xl border border-white/5 flex flex-col justify-between">
                                        <div className="flex items-center gap-2 mb-1 opacity-50">
                                            <Activity className="w-3 h-3 text-[#f6c453]" />
                                            <span className="text-[10px] uppercase font-bold tracking-wider">Odpružení</span>
                                        </div>
                                        <p className="text-[10px] font-bold text-white leading-tight">{configResult.suspension}</p>
                                    </div>
                                    <div className="bg-black/20 p-3 rounded-2xl border border-white/5 flex flex-col justify-between">
                                        <div className="flex items-center gap-2 mb-1 opacity-50">
                                            <Weight className="w-3 h-3 text-[#f6c453]" />
                                            <span className="text-[10px] uppercase font-bold tracking-wider">Váha</span>
                                        </div>
                                        <p className="text-[10px] font-bold text-white leading-tight">{configResult.weightLimit}</p>
                                    </div>
                                    <div className="bg-black/20 p-3 rounded-2xl border border-white/5 flex flex-col justify-between">
                                        <div className="flex items-center gap-2 mb-1 opacity-50">
                                            <Minimize className="w-3 h-3 text-[#f6c453]" />
                                            <span className="text-[10px] uppercase font-bold tracking-wider">Skládání</span>
                                        </div>
                                        <p className="text-[10px] font-bold text-white leading-tight">{configResult.folding}</p>
                                    </div>
                                </div>

                                <div className="bg-[#f6c453]/10 border border-[#f6c453]/30 p-4 rounded-2xl relative z-10">
                                    <div className="flex items-start gap-3">
                                        <div className="p-1.5 bg-[#f6c453]/20 rounded-lg">
                                            <Info className="w-3 h-3 text-[#f6c453] shrink-0" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-[#f6c453] uppercase tracking-widest mb-1">Taktický Tip Velitele</p>
                                            <p className="text-[10px] text-white/70 leading-relaxed font-medium">"{configResult.tip}"</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        const url = generateGoogleShoppingUrl();
                                        window.open(url, '_blank');
                                    }}
                                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 mt-6"
                                >
                                    <Check className="w-5 h-5" />
                                    Vyhledat na Google Shopping
                                </button>
                            </div>
                        </>
                    )}

                    {configTab === 'comparison' && (
                        <>
                            <div className="p-5 glass-card rounded-3xl bg-[#f6c453]/5 border-[#f6c453]/20 space-y-3 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#f6c453]/20 rounded-xl">
                                        <Truck className="w-4 h-4 text-[#f6c453]" />
                                    </div>
                                    <h4 className="font-black text-[10px] uppercase tracking-widest text-white/70">Vybraný model vozidla</h4>
                                </div>
                                <input
                                    type="text"
                                    value={vehicleModel}
                                    onChange={(e) => onSaveVehicle && onSaveVehicle(e.target.value)}
                                    placeholder="Např. Bugaboo Fox 5 / Cybex Priam..."
                                    className="w-full bg-[#1f2933] border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold text-white placeholder-white/10 focus:ring-1 focus:ring-[#f6c453] outline-none shadow-inner"
                                />
                                <button
                                    onClick={() => {
                                        if (onConfirmVehicle) onConfirmVehicle();
                                        onClose();
                                    }}
                                    className="w-full bg-[#f6c453] text-[#1f2933] py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 hover:bg-[#ffcf60]"
                                >
                                    <Check className="w-4 h-4" /> Potvrdit model
                                </button>
                                <p className="text-[10px] text-white/30 italic px-1 leading-relaxed">
                                    Sem si zapiš model, který jsi nakonec vybral jako hlavní transportní modul pro operaci.
                                </p>
                            </div>

                            <div className="h-px bg-white/5 w-full"></div>

                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                                {STROLLER_MODELS
                                    .filter(model => model.type === strollerPrefs.terrain || strollerPrefs.terrain === 'mixed')
                                    .map(model => (
                                        <div key={model.name} className="glass-card p-4 rounded-2xl border-white/10 hover:border-[#f6c453]/30 transition-all bg-white/5">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h4 className="font-black text-sm text-white">{model.brand} {model.name}</h4>
                                                    <p className="text-[10px] opacity-60 mt-1">{model.weight}kg • {model.priceRange} Kč</p>
                                                </div>
                                                <div className="flex gap-0.5">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Star key={i} className={`w-3 h-3 ${i < model.rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/10'}`} />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 text-[10px] mb-3">
                                                <div>
                                                    <p className="text-emerald-400 font-bold mb-1.5 flex items-center gap-1 uppercase tracking-tighter">
                                                        <Check className="w-3 h-3" /> Výhody:
                                                    </p>
                                                    {model.pros.map((pro, i) => (
                                                        <p key={i} className="opacity-70 leading-relaxed">• {pro}</p>
                                                    ))}
                                                </div>
                                                <div>
                                                    <p className="text-rose-400 font-bold mb-1.5 flex items-center gap-1 uppercase tracking-tighter">
                                                        <X className="w-3 h-3" /> Nevýhody:
                                                    </p>
                                                    {model.cons.map((con, i) => (
                                                        <p key={i} className="opacity-70 leading-relaxed">• {con}</p>
                                                    ))}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => window.open(model.heurekaLink, '_blank')}
                                                className="w-full bg-[#f6c453]/10 hover:bg-[#f6c453]/20 text-[#f6c453] py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-[#f6c453]/20"
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                                Detail na Heureka.cz
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
