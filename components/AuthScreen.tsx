
import React, { useState } from 'react';
import { Shield, ChevronRight, Lock } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (email: string) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 3) {
      onLogin(email.trim().toLowerCase());
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#1f2933] relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#f6c453] opacity-[0.03] rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500 opacity-[0.03] rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-sm space-y-8 relative z-10 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="w-24 h-24 bg-[#2d3748] rounded-[2rem] mx-auto flex items-center justify-center border border-[#f6c453]/20 shadow-[0_0_50px_rgba(246,196,83,0.1)] mb-6">
            <Shield className="w-10 h-10 accent-text" strokeWidth={2} />
          </div>
          <h1 className="text-3xl font-black accent-text uppercase italic tracking-tighter">Partner v Akci</h1>
          <p className="text-[#f5f7fa] opacity-50 text-sm font-medium tracking-wide">
            Systém pro řízení rodinné operace
          </p>
        </div>

        <div className="glass-card p-8 rounded-[2.5rem] border-white/5 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f6c453] ml-2">
                Identifikace (Email)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="velitel@rodina.cz"
                className="w-full bg-[#1f2933] border border-white/10 rounded-2xl px-6 py-4 text-[#f5f7fa] placeholder:opacity-20 focus:outline-none focus:ring-2 focus:ring-[#f6c453] transition-all font-medium"
                required
              />
            </div>
            
            <div className="space-y-2 opacity-50 pointer-events-none">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f5f7fa]/40 ml-2 flex items-center gap-2">
                <Lock className="w-3 h-3" /> Přístupový kód
              </label>
               <input
                type="password"
                placeholder="Volitelné"
                className="w-full bg-[#1f2933] border border-white/5 rounded-2xl px-6 py-4 text-[#f5f7fa] placeholder:opacity-20"
                disabled
              />
            </div>

            <button
              type="submit"
              disabled={email.length < 4}
              className="w-full bg-gradient-to-r from-[#bb8712] to-[#f6c453] text-[#1f2933] font-black uppercase tracking-[0.2em] text-xs py-5 rounded-2xl shadow-lg shadow-[#f6c453]/10 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Vstoupit do systému <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] text-[#f5f7fa] opacity-20 uppercase tracking-widest">
          Secure Connection • Encrypted Local Storage
        </p>
      </div>
    </div>
  );
};
