import React, { useState } from 'react';
import { Shield, ChevronRight, Lock, Mail, Github, Chrome } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (email: string) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  // Password validation criteria
  const validations = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    digit: /[0-9]/.test(password)
  };

  const isPasswordStrong = Object.values(validations).every(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 3 && isPasswordStrong) {
      onLogin(email.trim().toLowerCase());
    }
  };

  const handleGoogleLogin = () => {
    // Simulace Gmail přihlášení pro demo účely
    onLogin('pilot.gmail@example.com');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#1f2933] relative overflow-hidden">
      {/* Background FX - Tactical scanning effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#f6c453] opacity-[0.05] rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-500 opacity-[0.05] rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02]"></div>
      </div>

      <div className="w-full max-w-sm space-y-8 relative z-10 animate-fade-in">
        {/* Logo Section */}
        <div className="text-center space-y-3">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-[#2d3748] rounded-[2.5rem] mx-auto flex items-center justify-center border-2 border-[#f6c453]/20 shadow-[0_0_60px_rgba(246,196,83,0.15)] relative z-10 overflow-hidden group">
              <Shield className="w-12 h-12 accent-text group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#f6c453]/10 to-transparent"></div>
            </div>
            <div className="absolute -inset-2 bg-[#f6c453]/5 blur-xl rounded-full animate-pulse"></div>
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black accent-text uppercase italic tracking-tighter leading-none">Partner v Akci</h1>
            <p className="text-[#f6c453] text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Operativní Centrála</p>
          </div>
        </div>

        {/* Auth Content */}
        <div className="glass-card p-1 rounded-[3rem] border-[#f6c453]/10 shadow-2xl overflow-hidden">
          <div className="bg-[#1f2933]/40 backdrop-blur-xl p-8 rounded-[2.9rem]">

            {/* Mode Toggle Tabs */}
            <div className="flex bg-[#2d3748]/50 p-1 rounded-2xl mb-8 border border-white/5">
              <button
                onClick={() => setIsRegister(false)}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!isRegister ? 'bg-[#f6c453] text-[#1f2933] shadow-lg' : 'text-white/40 hover:text-white/60'}`}
              >
                Přihlásit
              </button>
              <button
                onClick={() => setIsRegister(true)}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isRegister ? 'bg-[#f6c453] text-[#1f2933] shadow-lg' : 'text-white/40 hover:text-white/60'}`}
              >
                Registrovat
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-[0.25em] text-[#f6c453] ml-4 opacity-70">
                  {isRegister ? 'Nová identifikace' : 'Identifikace'}
                </label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#f6c453] transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="velitel@rodina.cz"
                    className="w-full bg-[#161c22]/50 border border-white/10 rounded-[1.5rem] pl-14 pr-6 py-5 text-[#f5f7fa] placeholder:opacity-20 focus:outline-none focus:ring-2 focus:ring-[#f6c453]/50 focus:bg-[#161c22] transition-all font-medium text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-[0.25em] text-[#f6c453] ml-4 opacity-70 flex items-center gap-2">
                  <Lock className="w-3 h-3" /> {isRegister ? 'Nové silné heslo' : 'Heslo'}
                </label>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#f6c453] transition-colors" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#161c22]/50 border border-white/10 rounded-[1.5rem] pl-14 pr-6 py-5 text-[#f5f7fa] placeholder:opacity-20 focus:outline-none focus:ring-2 focus:ring-[#f6c453]/50 focus:bg-[#161c22] transition-all font-medium text-sm"
                    required
                  />
                </div>

                {/* Password Requirements Checklist */}
                <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 mt-3 px-4">
                  {[
                    { label: 'Min. 8 znaků', met: validations.length },
                    { label: 'Velké písmeno', met: validations.upper },
                    { label: 'Malé písmeno', met: validations.lower },
                    { label: 'Číslice', met: validations.digit }
                  ].map((req, i) => (
                    <div key={i} className={`flex items-center gap-1.5 transition-all duration-300 ${req.met ? 'opacity-100' : 'opacity-30'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${req.met ? 'bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.5)]' : 'bg-white'}`} />
                      <span className={`text-[8px] font-bold uppercase tracking-wider ${req.met ? 'text-emerald-400' : 'text-white'}`}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={email.length < 4 || !isPasswordStrong}
                className="w-full bg-gradient-to-r from-[#bb8712] to-[#f6c453] text-[#1f2933] font-black uppercase tracking-[0.25em] text-[11px] py-5 rounded-[1.5rem] shadow-xl shadow-[#f6c453]/20 active:scale-[0.98] hover:brightness-110 transition-all disabled:opacity-30 disabled:grayscale flex items-center justify-center gap-2 group"
              >
                {isRegister ? 'Zahájit nábor' : 'Vstoupit do centrály'}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Social Auth */}
            <div className="mt-8 space-y-6">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <span className="relative px-4 bg-transparent text-[8px] font-black uppercase tracking-[0.3em] text-white/20">nebo taktický přístup</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] group"
                >
                  <div className="w-5 h-5 flex items-center justify-center bg-white rounded-full p-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Chrome className="w-full h-full text-[#4285F4]" strokeWidth={3} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Pokračovat přes Gmail</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-6 opacity-30">
            <div className="flex flex-col items-center gap-1">
              <Shield className="w-4 h-4" />
              <span className="text-[7px] font-black uppercase tracking-widest">Secure</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Lock className="w-4 h-4" />
              <span className="text-[7px] font-black uppercase tracking-widest">Privacy</span>
            </div>
          </div>
          <p className="text-[9px] text-white/20 uppercase tracking-[0.4em] font-medium">
            E-2-E Encryption • Offline First Protocol
          </p>
        </div>
      </div>
    </div>
  );
};
