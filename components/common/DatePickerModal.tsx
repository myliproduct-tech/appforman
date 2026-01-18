import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, X, Check } from 'lucide-react';

interface DatePickerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (date: string) => void;
    initialDate?: string;
    title?: string;
}

const MONTHS = [
    'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
    'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
];

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
    isOpen,
    onClose,
    onSelect,
    initialDate,
    title = 'Vyberte datum'
}) => {
    const parseInitialDate = () => {
        if (initialDate) {
            const [year, month, day] = initialDate.split('-').map(Number);
            return { day, month, year };
        }
        const today = new Date();
        return {
            day: today.getDate(),
            month: today.getMonth() + 1,
            year: today.getFullYear()
        };
    };

    const initial = parseInitialDate();
    const [selectedDay, setSelectedDay] = useState(initial.day);
    const [selectedMonth, setSelectedMonth] = useState(initial.month);
    const [selectedYear, setSelectedYear] = useState(initial.year);

    useEffect(() => {
        if (isOpen) {
            const parsed = parseInitialDate();
            setSelectedDay(parsed.day);
            setSelectedMonth(parsed.month);
            setSelectedYear(parsed.year);
        }
    }, [isOpen, initialDate]);

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month, 0).getDate();
    };

    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);

    const handleConfirm = () => {
        const formattedDate = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
        onSelect(formattedDate);
        onClose();
    };

    const scrollToValue = (value: number, setValue: (v: number) => void, max: number) => {
        return (direction: 'up' | 'down') => {
            if (direction === 'up') {
                setValue(value === max ? 1 : value + 1);
            } else {
                setValue(value === 1 ? max : value - 1);
            }
        };
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] bg-[#1f2933]/95 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#2d3748] rounded-t-3xl shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h3 className="text-lg font-black uppercase tracking-wider text-white">
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-white/40 hover:text-white transition-all"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Picker */}
                <div className="p-6">
                    <div className="flex gap-4 items-center justify-center">
                        {/* Day Picker */}
                        <div className="flex-1 flex flex-col items-center">
                            <button
                                onClick={() => scrollToValue(selectedDay, setSelectedDay, daysInMonth)('up')}
                                className="text-[#f6c453] hover:text-[#f6c453]/80 transition-all p-2"
                            >
                                <ChevronUp className="w-8 h-8" />
                            </button>
                            <div className="h-20 flex items-center justify-center bg-[#f6c453]/10 border-2 border-[#f6c453]/30 rounded-2xl px-6 my-2">
                                <span className="text-4xl font-black text-[#f6c453]">
                                    {String(selectedDay).padStart(2, '0')}
                                </span>
                            </div>
                            <button
                                onClick={() => scrollToValue(selectedDay, setSelectedDay, daysInMonth)('down')}
                                className="text-[#f6c453] hover:text-[#f6c453]/80 transition-all p-2"
                            >
                                <ChevronDown className="w-8 h-8" />
                            </button>
                            <span className="text-xs font-bold uppercase tracking-wider text-white/40 mt-2">
                                Den
                            </span>
                        </div>

                        {/* Month Picker */}
                        <div className="flex-1 flex flex-col items-center">
                            <button
                                onClick={() => scrollToValue(selectedMonth, setSelectedMonth, 12)('up')}
                                className="text-[#f6c453] hover:text-[#f6c453]/80 transition-all p-2"
                            >
                                <ChevronUp className="w-8 h-8" />
                            </button>
                            <div className="h-20 flex items-center justify-center bg-[#f6c453]/10 border-2 border-[#f6c453]/30 rounded-2xl px-4 my-2">
                                <span className="text-2xl font-black text-[#f6c453] text-center">
                                    {MONTHS[selectedMonth - 1]}
                                </span>
                            </div>
                            <button
                                onClick={() => scrollToValue(selectedMonth, setSelectedMonth, 12)('down')}
                                className="text-[#f6c453] hover:text-[#f6c453]/80 transition-all p-2"
                            >
                                <ChevronDown className="w-8 h-8" />
                            </button>
                            <span className="text-xs font-bold uppercase tracking-wider text-white/40 mt-2">
                                Měsíc
                            </span>
                        </div>

                        {/* Year Picker */}
                        <div className="flex-1 flex flex-col items-center">
                            <button
                                onClick={() => setSelectedYear(prev => prev + 1)}
                                className="text-[#f6c453] hover:text-[#f6c453]/80 transition-all p-2"
                            >
                                <ChevronUp className="w-8 h-8" />
                            </button>
                            <div className="h-20 flex items-center justify-center bg-[#f6c453]/10 border-2 border-[#f6c453]/30 rounded-2xl px-6 my-2">
                                <span className="text-3xl font-black text-[#f6c453]">
                                    {selectedYear}
                                </span>
                            </div>
                            <button
                                onClick={() => setSelectedYear(prev => prev - 1)}
                                className="text-[#f6c453] hover:text-[#f6c453]/80 transition-all p-2"
                            >
                                <ChevronDown className="w-8 h-8" />
                            </button>
                            <span className="text-xs font-bold uppercase tracking-wider text-white/40 mt-2">
                                Rok
                            </span>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="mt-6 text-center">
                        <div className="text-sm text-white/40 mb-1">Vybrané datum:</div>
                        <div className="text-xl font-bold text-white">
                            {selectedDay}. {MONTHS[selectedMonth - 1]} {selectedYear}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="p-6 pt-0 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-4 bg-white/5 text-white/60 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all active:scale-95"
                    >
                        Zrušit
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="flex-1 py-4 bg-[#f6c453] text-[#1f2933] rounded-xl font-black uppercase text-xs tracking-widest hover:bg-[#f6c453]/90 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Check className="w-4 h-4" />
                        Potvrdit
                    </button>
                </div>
            </div>
        </div>
    );
};
