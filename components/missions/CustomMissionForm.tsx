import React, { useState } from 'react';
import { Command, Plus, X, FileText, Calendar } from 'lucide-react';
import { DatePickerModal } from '../common/DatePickerModal';

interface CustomMissionFormProps {
    isVisible: boolean;
    onToggle: (visible: boolean) => void;
    onSubmit: (title: string, desc: string, date: string) => void;
    simulatedDate?: string | null;
}

const CustomMissionFormComponent: React.FC<CustomMissionFormProps> = ({
    isVisible,
    onToggle,
    onSubmit,
    simulatedDate
}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [scheduledDate, setScheduledDate] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onSubmit(title, description, scheduledDate);
            setTitle('');
            setDescription('');
            setScheduledDate('');
            onToggle(false);
        }
    };

    if (!isVisible) {
        return (
            <button
                onClick={() => onToggle(true)}
                className="w-full py-6 bg-white/[0.03] border-2 border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 hover:bg-white/[0.06] hover:border-[#f6c453]/30 transition-all group"
            >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#f6c453]/10 transition-all">
                    <Plus className="w-6 h-6 text-white/40 group-hover:text-[#f6c453]" />
                </div>
                <div>
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">Vydat vlastní rozkaz</span>
                </div>
            </button>
        );
    }

    return (
        <div className="glass-card p-8 rounded-[2.5rem] border-[#f6c453]/30 bg-[#f6c453]/5 animate-in slide-in-from-top-4 duration-500">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#f6c453] flex items-center justify-center shadow-lg shadow-[#f6c453]/20">
                        <Command className="w-6 h-6 text-[#1f2933]" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-wider">Nový Rozkaz</h3>
                        <p className="text-[10px] font-bold text-[#f6c453] uppercase tracking-widest opacity-60 text-left">Definuj vlastní misi</p>
                    </div>
                </div>
                <button
                    onClick={() => onToggle(false)}
                    className="p-3 hover:bg-white/5 rounded-2xl transition-colors"
                >
                    <X className="w-6 h-6 text-white/20" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Název Rozkazu</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Napiš co je potřeba udělat..."
                        className="w-full bg-[#1f2933] border border-white/10 rounded-2xl p-5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#f6c453] transition-all font-bold"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4 flex items-center gap-2">
                        <FileText className="w-3 h-3" /> Detaily (volitelné)
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Podrobnější instrukce..."
                        className="w-full bg-[#1f2933] border border-white/10 rounded-2xl p-5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#f6c453] transition-all font-medium text-sm min-h-[100px] resize-none"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#f6c453] mb-2">Termín (volitelné)</label>
                    <button
                        type="button"
                        onClick={() => setShowDatePicker(true)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#f6c453] transition-all flex items-center justify-between hover:bg-white/15"
                    >
                        <span className={scheduledDate ? 'text-white' : 'text-white/40'}>
                            {scheduledDate ? new Date(scheduledDate).toLocaleDateString('cs-CZ', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            }) : 'Vyberte datum'}
                        </span>
                        <Calendar className="w-5 h-5 text-[#f6c453]" />
                    </button>
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={() => onToggle(false)}
                        className="flex-1 py-5 bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all border border-white/5"
                    >
                        Zrušit
                    </button>
                    <button
                        type="submit"
                        className="flex-[2] py-5 bg-[#f6c453] text-[#1f2933] rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-[#f6c453]/20 active:scale-95 transition-all"
                    >
                        Vydat Rozkaz
                    </button>
                </div>
            </form>

            {/* Date Picker Modal */}
            <DatePickerModal
                isOpen={showDatePicker}
                onClose={() => setShowDatePicker(false)}
                onSelect={(date) => {
                    setScheduledDate(date);
                    setShowDatePicker(false);
                }}
                initialDate={scheduledDate}
                title="Termín splnění"
            />
        </div>
    );
};

export const CustomMissionForm = React.memo(CustomMissionFormComponent);
