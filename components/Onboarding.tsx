
import React, { useState } from 'react';
import { Baby, Calendar } from 'lucide-react';
import { DatePickerModal } from './common/DatePickerModal';

interface OnboardingProps {
  onComplete: (name: string, dueDate: string, partnerName: string) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [partnerMode, setPartnerMode] = useState<'Velitelka' | 'Partnerka' | 'Custom'>('Velitelka');
  const [customPartnerName, setCustomPartnerName] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && dueDate) {
      const finalPartnerName = partnerMode === 'Custom' ? customPartnerName : partnerMode;
      onComplete(name, dueDate, finalPartnerName);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center p-8 bg-[#1f2933]">
      <div className="mb-10 text-center">
        <div className="w-20 h-20 bg-[#f6c453] rounded-[2rem] mx-auto mb-6 flex items-center justify-center shadow-[0_0_40px_rgba(246,196,83,0.2)]">
          <Baby className="w-10 h-10 text-[#1f2933]" strokeWidth={2.5} />
        </div>
        <h1 className="text-3xl font-black accent-text mb-2 uppercase italic tracking-tighter">Partner v akci</h1>
        <p className="text-[#f5f7fa] opacity-60 text-sm font-medium">Staň se hrdinou své nové rodiny.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-sm mx-auto w-full">
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f6c453] ml-2">Jak ti máme říkat?</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tvoje jméno"
            required
            className="w-full bg-[#2d3748] border border-white/5 rounded-2xl px-6 py-4 text-[#f5f7fa] placeholder:opacity-30 focus:outline-none focus:ring-2 focus:ring-[#f6c453] transition-all"
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f6c453] ml-2">Označení partnerky</label>
          <div className="grid grid-cols-3 gap-2">
            {['Velitelka', 'Partnerka', 'Custom'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setPartnerMode(mode as any)}
                className={`py-3 rounded-xl text-xs font-bold transition-all border ${partnerMode === mode ? 'bg-[#f6c453] text-[#1f2933] border-[#f6c453]' : 'bg-[#2d3748] text-[#f5f7fa] border-white/5 opacity-60'}`}
              >
                {mode === 'Custom' ? 'Vlastní' : mode}
              </button>
            ))}
          </div>

          {partnerMode === 'Custom' && (
            <div className="animate-slide-up">
              <input
                type="text"
                value={customPartnerName}
                onChange={(e) => setCustomPartnerName(e.target.value)}
                placeholder="Zadej jméno/oslovení (např. Láska)"
                className="w-full bg-[#2d3748] border border-white/5 rounded-2xl px-6 py-4 text-[#f5f7fa] placeholder:opacity-30 focus:outline-none focus:ring-2 focus:ring-[#f6c453] transition-all"
              />
              <p className="text-[10px] text-white/30 mt-2 px-2 italic">Tip: Jména končící na "a" (Láska, Petra) systém skloňuje automaticky. Ostatní (Karin) zůstávají většinou beze změny.</p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#f6c453] mb-2">Předpokládaný termín porodu</label>
          <button
            type="button"
            onClick={() => setShowDatePicker(true)}
            className="w-full px-4 py-3 bg-[#2d3748] border border-white/5 rounded-2xl text-[#f5f7fa] focus:outline-none focus:ring-2 focus:ring-[#f6c453] transition-all flex items-center justify-between hover:bg-[#2d3748]/80"
          >
            <span className={dueDate ? 'text-[#f5f7fa]' : 'text-[#f5f7fa]/40'}>
              {dueDate ? new Date(dueDate).toLocaleDateString('cs-CZ', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              }) : 'Vyberte datum'}
            </span>
            <Calendar className="w-5 h-5 text-[#f6c453]" />
          </button>
        </div>

        <button
          type="submit"
          disabled={!name || !dueDate || (partnerMode === 'Custom' && !customPartnerName)}
          className="w-full bg-[#f6c453] text-[#1f2933] font-black uppercase tracking-widest text-xs py-5 rounded-2xl shadow-xl active:scale-95 transition-all disabled:opacity-30 mt-4"
        >
          Spustit první misi
        </button>
      </form>

      {/* Date Picker Modal */}
      <DatePickerModal
        isOpen={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelect={(date) => {
          setDueDate(date);
          setShowDatePicker(false);
        }}
        initialDate={dueDate}
        title="Termín porodu"
      />
    </div>
  );
};
