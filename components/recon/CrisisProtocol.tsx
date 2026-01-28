import React, { useState } from 'react';
import { AlertTriangle, X, ChevronDown, ChevronUp } from 'lucide-react';

interface Warning {
    category: string;
    items: {
        title: string;
        description: string;
        severity: 'high' | 'medium' | 'low';
    }[];
}

const PREGNANCY_WARNINGS: Warning[] = [
    {
        category: 'CO NESMÍ PARTNERKA',
        items: [
            {
                title: 'Alkohol',
                description: 'Žádný alkohol! Ani "jedno pivo". Kup jí nealkoholické alternativy.',
                severity: 'high'
            },
            {
                title: 'Kouření (i pasivní)',
                description: 'Nekuř v její přítomnosti. Ventiluj auto/byt po kuřácích hostech.',
                severity: 'high'
            },
            {
                title: 'Těžké zvedání',
                description: 'Nakupování, stěhování nábytku - to je tvoje práce. Max 5kg pro ni.',
                severity: 'high'
            },
            {
                title: 'Léky bez konzultace',
                description: 'I běžné léky (ibuprofen, aspirin) mohou škodit. Vždy s lékařem!',
                severity: 'high'
            }
        ]
    },
    {
        category: 'NÁKUPY A VAŘENÍ',
        items: [
            {
                title: 'Syrové maso a ryby',
                description: 'Nekupuj sushi, tatarák, carpaccio. Vše musí být tepelně upravené.',
                severity: 'high'
            },
            {
                title: 'Syrová vejce',
                description: 'Žádné domácí majonézy, tiramisu, syrové těsto. Kupuj pasterizované.',
                severity: 'medium'
            },
            {
                title: 'Měkké sýry',
                description: 'Vyhni se brie, camembert, nivě. Kupuj tvrdé sýry (eidam, gouda).',
                severity: 'medium'
            },
            {
                title: 'Velké ryby',
                description: 'Tuňák, mečoun max 1× týdně. Raději losos, pstruh, treska.',
                severity: 'medium'
            },
            {
                title: 'Kofein',
                description: 'Max 2 kávy denně. Kup jí bezkofeinovou nebo čaje.',
                severity: 'low'
            },
            {
                title: 'Játra',
                description: 'Nevař játra, zvlášť v 1. trimestru. Vysoký obsah vitamínu A.',
                severity: 'medium'
            }
        ]
    },
    {
        category: 'TVOJE POVINNOSTI',
        items: [
            {
                title: 'Kočičí toaleta',
                description: 'Toxoplazmóza! Od teď čistíš záchod pro kočku TY. Denně.',
                severity: 'high'
            },
            {
                title: 'Horká voda',
                description: 'Žádné vířivky, sauny. Kontroluj teplotu vody ve vaně (max 37°C).',
                severity: 'high'
            },
            {
                title: 'Chemikálie',
                description: 'Malování, úklid s chemií, zahradničení s pesticidy - tvoje práce.',
                severity: 'medium'
            },
            {
                title: 'Stres',
                description: 'Minimalizuj konflikty, řeš problémy sám. Stres škodí miminku.',
                severity: 'medium'
            },
        ]
    },
    {
        category: 'KDY VOLAT ZÁCHRANKU',
        items: [
            {
                title: 'Krvácení',
                description: 'Jakékoli vaginální krvácení = okamžitě k lékaři nebo 155!',
                severity: 'high'
            },
            {
                title: 'Silná bolest břicha',
                description: 'Náhlá ostrá bolest, křeče - neotálej, volej záchranku.',
                severity: 'high'
            },
            {
                title: 'Únik plodové vody',
                description: 'Náhlý únik tekutiny = porod začíná. Klidně, ale rychle do nemocnice.',
                severity: 'high'
            },
            {
                title: 'Miminko se nehýbe',
                description: 'Po 28. týdnu méně než 10 pohybů za 2h = okamžitě k lékaři.',
                severity: 'high'
            },
            {
                title: 'Bolest hlavy + rozmazané vidění',
                description: 'Možná preeklampsie (vysoký tlak). Nebezpečné! Volej 155.',
                severity: 'high'
            },
            {
                title: 'Vysoká horečka',
                description: 'Nad 38°C = riziko infekce. Volej pohotovost, ne čekej do rána.',
                severity: 'high'
            }
        ]
    }
];

export const CrisisProtocol: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    const toggleCategory = (category: string) => {
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    const getSeverityColor = (severity: 'high' | 'medium' | 'low') => {
        switch (severity) {
            case 'high': return 'bg-red-500/10 border-red-500/30 text-red-400';
            case 'medium': return 'bg-orange-500/10 border-orange-500/30 text-orange-400';
            case 'low': return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
        }
    };

    const getSeverityLabel = (severity: 'high' | 'medium' | 'low') => {
        switch (severity) {
            case 'high': return 'VYSOKÉ RIZIKO';
            case 'medium': return 'STŘEDNÍ RIZIKO';
            case 'low': return 'NÍZKÉ RIZIKO';
        }
    };

    const getSeverityDotColor = (severity: 'high' | 'medium' | 'low') => {
        switch (severity) {
            case 'high': return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]';
            case 'medium': return 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]';
            case 'low': return 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]';
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-[#1f2933] flex flex-col animate-fade-in shadow-2xl overflow-hidden">
            <div className="max-w-2xl mx-auto w-full h-full flex flex-col">
                {/* Minimalist Header */}
                <div className="flex items-center justify-between bg-[#1f2933] px-6 py-8 z-30 border-b border-white/10 shadow-xl shrink-0">
                    <div className="flex items-center gap-3">
                        <div>
                            <h1 className="text-xl font-black italic uppercase text-[#f6c453] tracking-tighter">
                                Krizový Protokol
                            </h1>
                            <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">
                                Rizika v těhotenství
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-3 rounded-xl bg-white/5 hover:bg-black/20 transition-all border-2 border-white/20 active:scale-95 group"
                    >
                        <X className="w-6 h-6 text-[#f6c453] group-hover:rotate-90 transition-transform" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-4 pt-6 pb-24 custom-scrollbar">
                    <div className="max-w-2xl mx-auto">

                        {/* Warning banner */}
                        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-red-500/20 rounded-lg">
                                    <AlertTriangle className="w-5 h-5 text-red-500" />
                                </div>
                                <div>
                                    <p className="text-sm text-white font-bold mb-1 uppercase tracking-tight">Důležité upozornění</p>
                                    <p className="text-[11px] text-white/50 leading-relaxed">
                                        Tento seznam není vyčerpávající. Vždy konzultujte s lékařem.
                                        V případě pochybností ihned volejte tísňovou linku.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="space-y-3">
                            {PREGNANCY_WARNINGS.map((warning) => {
                                const isExpanded = expandedCategory === warning.category;

                                return (
                                    <div key={warning.category} className="bg-white/5 rounded-2xl border-2 border-white/20 overflow-hidden transition-all">
                                        {/* Category header */}
                                        <button
                                            onClick={() => toggleCategory(warning.category)}
                                            className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-all"
                                        >
                                            <h3 className="text-sm font-black uppercase text-white tracking-widest">
                                                {warning.category}
                                            </h3>
                                            {isExpanded ? (
                                                <ChevronUp className="w-5 h-5 text-white/30" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-white/30" />
                                            )}
                                        </button>

                                        {/* Items */}
                                        {isExpanded && (
                                            <div className="px-4 pb-4 space-y-3">
                                                {warning.items.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className={`p-4 rounded-xl border-2 border-white/20 ${getSeverityColor(item.severity)} bg-opacity-5`}
                                                    >
                                                        <div className="flex items-start justify-between gap-3 mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <div className={`w-1.5 h-1.5 rounded-full ${getSeverityDotColor(item.severity)}`}></div>
                                                                <h4 className="font-bold text-white text-xs uppercase tracking-tight">
                                                                    {item.title}
                                                                </h4>
                                                            </div>
                                                            <span className="text-[10px] font-black opacity-40 uppercase tracking-widest whitespace-nowrap">
                                                                {getSeverityLabel(item.severity)}
                                                            </span>
                                                        </div>
                                                        <p className="text-[11px] text-white/60 leading-relaxed font-medium">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
