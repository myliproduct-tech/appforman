import React, { useState } from 'react';
import { FileSignature, XIcon, Baby, Trash2, Heart } from 'lucide-react';

export interface BabyName {
    id: string;
    name: string;
    rating: number;
    gender: 'boy' | 'girl';
    selected?: boolean;
}

interface BabyNameGeneratorProps {
    babyNames: BabyName[];
    onSaveBabyNames?: (names: BabyName[]) => void;
    autoExpand?: boolean; // If true, show the list immediately without the button
    onClose?: () => void; // Callback to close the modal
}

export const BabyNameGenerator: React.FC<BabyNameGeneratorProps> = ({
    babyNames,
    onSaveBabyNames,
    autoExpand = false,
    onClose
}) => {
    const [showNameList, setShowNameList] = useState(autoExpand);
    const [newNameInput, setNewNameInput] = useState('');
    const [newGenderInput, setNewGenderInput] = useState<'boy' | 'girl'>('boy');

    const handleAddName = () => {
        if (newNameInput.trim() && onSaveBabyNames) {
            const newName: BabyName = {
                id: Date.now().toString(),
                name: newNameInput.trim(),
                rating: 3, // Start in middle
                gender: newGenderInput
            };
            onSaveBabyNames([...babyNames, newName]);
            setNewNameInput('');
        }
    };

    const handleRateName = (id: string, rating: number) => {
        if (onSaveBabyNames) {
            const updated = babyNames.map(n => n.id === id ? { ...n, rating } : n);
            onSaveBabyNames(updated);
        }
    };

    const handleDeleteName = (id: string) => {
        if (onSaveBabyNames) {
            onSaveBabyNames(babyNames.filter(n => n.id !== id));
        }
    };

    const handleSelectName = (id: string, gender: 'boy' | 'girl') => {
        if (onSaveBabyNames) {
            const clickedName = babyNames.find(n => n.id === id);
            const isCurrentlySelected = clickedName?.selected;

            // If clicking on already selected name, deselect it
            if (isCurrentlySelected) {
                const updated = babyNames.map(n => n.id === id ? { ...n, selected: false } : n);
                onSaveBabyNames(updated);
            } else {
                // Deselect all names of the same gender, then select the clicked one
                const updated = babyNames.map(n => {
                    if (n.gender === gender) {
                        return n.id === id ? { ...n, selected: true } : { ...n, selected: false };
                    }
                    return n;
                });
                onSaveBabyNames(updated);
            }
        }
    };

    // Sort names: Best (1) to Worst (5)
    const sortedNames = [...babyNames].sort((a, b) => a.rating - b.rating);

    return (
        <>
            {/* BABY NAMES MODAL */}
            {showNameList && (
                <>
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <div>
                                <h2 className="text-xl font-black italic uppercase text-[#f6c453] tracking-tighter">
                                    Nominace Juniora
                                </h2>
                                <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">
                                    Výběr kódového označení
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => onClose ? onClose() : setShowNameList(false)}
                            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10"
                        >
                            <XIcon className="w-6 h-6 text-[#f6c453]" />
                        </button>
                    </div>

                    {/* Content Card */}
                    <div className="glass-card p-6 rounded-[2rem] border-white/10 animate-slide-up mb-4">

                        {/* Add New Name */}
                        <div className="bg-[#2d3748] p-4 rounded-2xl border border-white/5 space-y-3 mb-6">
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={newNameInput}
                                        onChange={(e) => setNewNameInput(e.target.value)}
                                        placeholder="Nové jméno..."
                                        className="w-full bg-[#1f2933] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#f6c453]"
                                    />
                                </div>
                                <div className="flex bg-[#1f2933] rounded-xl p-1 border border-white/10">
                                    <button
                                        onClick={() => setNewGenderInput('boy')}
                                        className={`px-3 rounded-lg transition-all ${newGenderInput === 'boy' ? 'bg-blue-500/20 text-blue-400' : 'opacity-30'}`}
                                    >
                                        <Baby className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setNewGenderInput('girl')}
                                        className={`px-3 rounded-lg transition-all ${newGenderInput === 'girl' ? 'bg-pink-500/20 text-pink-400' : 'opacity-30'}`}
                                    >
                                        <Baby className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={handleAddName}
                                disabled={!newNameInput.trim()}
                                className="w-full bg-[#f6c453] text-[#1f2933] py-3 rounded-xl font-black uppercase text-[10px] tracking-widest disabled:opacity-50 active:scale-95 transition-all"
                            >
                                Přidat Kandidáta
                            </button>
                        </div>

                        {/* Name List */}
                        <div className="space-y-3">
                            {sortedNames.length === 0 ? (
                                <p className="text-center text-[10px] opacity-30 uppercase tracking-widest py-4">Seznam je prázdný</p>
                            ) : (
                                sortedNames.map(name => (
                                    <div key={name.id} className="bg-[#1f2933] p-4 rounded-2xl border border-white/5">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${name.gender === 'boy' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-pink-500/10 border-pink-500/30 text-pink-400'}`}>
                                                    <span className="font-black text-xs">{name.name.charAt(0)}</span>
                                                </div>
                                                <span className="font-bold text-sm">{name.name}</span>
                                            </div>
                                            <button onClick={() => handleDeleteName(name.id)} className="text-rose-500/40 hover:text-rose-500">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Rating Scale 1-5 */}
                                        <div className="flex justify-between items-center bg-black/20 p-2 rounded-xl">
                                            {[1, 2, 3, 4, 5].map(rating => (
                                                <button
                                                    key={rating}
                                                    onClick={() => handleRateName(name.id, rating)}
                                                    className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all border ${name.rating === rating
                                                        ? rating === 1 ? 'bg-emerald-500 text-[#1f2933] border-emerald-500 scale-110'
                                                            : rating === 5 ? 'bg-rose-500 text-white border-rose-500 scale-110'
                                                                : 'bg-[#f6c453] text-[#1f2933] border-[#f6c453] scale-110'
                                                        : 'bg-white/5 text-white/30 border-transparent hover:bg-white/10'
                                                        }`}
                                                >
                                                    {rating}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex justify-between px-1 mt-1">
                                            <span className="text-[10px] font-black text-emerald-500/50 uppercase">Nejlepší</span>
                                            <span className="text-[10px] font-black text-rose-500/50 uppercase">Nejhorší</span>
                                        </div>

                                        {/* Selection Button */}
                                        <button
                                            onClick={() => handleSelectName(name.id, name.gender)}
                                            className={`w-full mt-3 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 border-2 ${name.selected
                                                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white border-rose-400 shadow-lg shadow-rose-500/30'
                                                : 'bg-white/5 text-white/40 border-white/10 hover:bg-white/10 hover:text-white/60'
                                                }`}
                                        >
                                            <Heart className={`w-4 h-4 ${name.selected ? 'fill-current' : ''}`} />
                                            {name.selected ? 'Vybrán!' : 'Vybírám si tebe'}
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
