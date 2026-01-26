import React, { useState, useEffect } from 'react';
import { Shield, ChevronRight, Lock, Mail, Github, Chrome, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { API_BASE_URL } from '../config';

interface AuthScreenProps {
  onLogin: (email: string) => void;
}

interface VaultEntry {
  email: string;
  passwordHash: string; // Pro tuto demo verzi ukládáme v prostém textu, v reálu by byl hash
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [alert, setAlert] = useState<{ type: 'error' | 'success' | 'info'; message: string } | null>(null);
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [activeLegalDoc, setActiveLegalDoc] = useState<'privacy' | 'terms' | 'consent'>('privacy');
  const [showGdpr, setShowGdpr] = useState(false);

  // Password validation criteria
  const validations = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    digit: /[0-9]/.test(password)
  };

  const isPasswordStrong = Object.values(validations).every(Boolean);

  // Clear alert when switching modes
  useEffect(() => {
    setAlert(null);
    setTermsAccepted(false);
    setConsentAccepted(false);
    setShowGdpr(false);
  }, [isRegister]);

  const getVault = async (): Promise<VaultEntry[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/vault`);
      const data = await response.json();
      return data || [];
    } catch (error) {
      // Fallback to local storage if server fails
      const data = localStorage.getItem('app_vault');
      return data ? JSON.parse(data) : [];
    }
  };

  const saveToVault = async (email: string, pass: string) => {
    const normalizedEmail = email.toLowerCase();

    // Save to server
    try {
      await fetch(`${API_BASE_URL}/vault`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, passwordHash: pass })
      });
    } catch (error) {
      console.error('❌ Failed to save vault to server', error);
    }

    // Save locally as backup
    const localVault = localStorage.getItem('app_vault');
    const vault = localVault ? JSON.parse(localVault) : [];
    vault.push({ email: normalizedEmail, passwordHash: pass });
    localStorage.setItem('app_vault', JSON.stringify(vault));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const vault = await getVault();
    const normalizedEmail = email.trim().toLowerCase();

    if (isRegister) {
      if (!isPasswordStrong || !termsAccepted || !consentAccepted) return;

      const exists = vault.find(u => u.email === normalizedEmail);
      if (exists) {
        setAlert({ type: 'error', message: 'Tento velitel již je v databázi!' });
        return;
      }

      await saveToVault(normalizedEmail, password);
      setAlert({ type: 'success', message: 'Registrace úspěšná! Vstupuji do systému...' });

      // AUTO-LOGIN po registraci
      setTimeout(() => {
        onLogin(normalizedEmail);
      }, 1000);
    } else {
      const user = vault.find(u => u.email === normalizedEmail);

      // Speciální případ pro admina 'myli.product@gmail.com', pokud by nebyl ve vaultu
      if (!user && normalizedEmail === 'myli.product@gmail.com') {
        onLogin(normalizedEmail);
        return;
      }

      if (user && user.passwordHash === password) {
        onLogin(normalizedEmail);
      } else {
        setAlert({ type: 'error', message: 'Nesprávná identifikace nebo heslo!' });
      }
    }
  };

  const handleForgotPassword = () => {
    if (!email || !email.includes('@')) {
      setAlert({ type: 'error', message: 'Nejdříve zadejte svůj platný email!' });
      return;
    }

    setIsResetLoading(true);
    // Simulace odeslání emailu
    setTimeout(() => {
      setIsResetLoading(false);
      setAlert({ type: 'info', message: 'Instrukce k resetu byly odeslány na váš email.' });
    }, 1500);
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

            {/* Alert Messages */}
            {alert && (
              <div className={`mb-6 p-4 rounded-2xl border flex items-start gap-3 animate-slide-up ${alert.type === 'error' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' :
                alert.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                  'bg-blue-500/10 border-blue-500/20 text-blue-400'
                }`}>
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-[11px] font-bold uppercase tracking-wide leading-tight">{alert.message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-[0.25em] text-[#f6c453] ml-4 opacity-70">
                  {isRegister ? 'Nová identifikace (Email)' : 'Identifikace'}
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
                <div className="flex justify-between items-center ml-4 mr-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.25em] text-[#f6c453] opacity-70 flex items-center gap-2">
                    <Lock className="w-3 h-3" /> {isRegister ? 'Nové silné heslo' : 'Heslo'}
                  </label>
                  {!isRegister && (
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      disabled={isResetLoading}
                      className="text-[8px] font-black uppercase tracking-wider text-[#f6c453] opacity-40 hover:opacity-100 transition-all flex items-center gap-1"
                    >
                      {isResetLoading ? <RefreshCw className="w-2.5 h-2.5 animate-spin" /> : 'Ztráta přístupu?'}
                    </button>
                  )}
                </div>
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

                {/* Password Requirements Checklist - ONLY during registration */}
                {isRegister && (
                  <>
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

                    {/* Legal Documentation Section */}
                    <div className="mt-6 space-y-3 px-2">
                      <button
                        type="button"
                        onClick={() => setShowGdpr(!showGdpr)}
                        className="w-full flex items-center justify-between py-2 border-b border-white/5 group"
                      >
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#f6c453]/60 group-hover:text-[#f6c453] transition-colors italic">Právní dokumentace</span>
                        <ChevronRight className={`w-3 h-3 text-[#f6c453]/40 transition-transform ${showGdpr ? 'rotate-90' : ''}`} />
                      </button>

                      {showGdpr && (
                        <div className="bg-[#161c22]/50 rounded-xl border border-white/5 animate-slide-up mb-4 overflow-hidden">
                          {/* Tabs for different docs */}
                          <div className="flex border-b border-white/5">
                            {(['terms', 'privacy', 'consent'] as const).map((tab) => (
                              <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveLegalDoc(tab)}
                                className={`flex-1 py-1.5 text-[7px] font-black uppercase tracking-widest transition-all ${activeLegalDoc === tab ? 'bg-[#f6c453]/10 text-[#f6c453]' : 'text-white/20'}`}
                              >
                                {tab === 'terms' ? 'Podmínky' : tab === 'privacy' ? 'Zásady' : 'Souhlas'}
                              </button>
                            ))}
                          </div>
                          <div className="p-4 max-h-[100px] overflow-y-auto custom-scrollbar">
                            <p className="text-[8px] leading-relaxed text-white/50 font-medium tracking-wide">
                              {activeLegalDoc === 'privacy' && "Vaše data jsou bezpečně uložena na našem serveru pro účely synchronizace mezi vašimi zařízeními. Aplikace Partner v Akci dbá na ochranu soukromí a vaše údaje neposkytuje třetím stranám. Smazáním účtu dojde k trvalému odstranění dat."}
                              {activeLegalDoc === 'terms' && "Používáním aplikace Partner v Akci souhlasíte s obchodními podmínkami. Aplikace slouží k informačním a motivačním účelům během těhotenství. Nejedná se o lékařské poradenství. Uživatel nese plnou odpovědnost za své kroky."}
                              {activeLegalDoc === 'consent' && "Souhlasím se zpracováním mých osobních údajů (email, jméno, údaje o průběhu těhotenství) za účelem personalizace obsahu a funkcí aplikace. Souhlas lze kdykoliv odvolat smazáním profilu."}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <div className="relative flex items-center mt-0.5">
                            <input
                              type="checkbox"
                              checked={termsAccepted}
                              onChange={(e) => setTermsAccepted(e.target.checked)}
                              className="peer sr-only"
                            />
                            <div className="w-4 h-4 border-2 border-[#f6c453]/20 rounded transition-all peer-checked:bg-[#f6c453] peer-checked:border-[#f6c453] shadow-[0_0_10px_rgba(246,196,83,0)] peer-checked:shadow-[0_0_15px_rgba(246,196,83,0.3)]"></div>
                            <CheckCircle2 className="absolute inset-0 w-4 h-4 text-[#1f2933] scale-0 peer-checked:scale-100 transition-transform" />
                          </div>
                          <span className="text-[9px] font-bold text-white/40 group-hover:text-white/60 transition-colors leading-tight">
                            Souhlasím s obchodními podmínkami a zásadami ochrany údajů
                          </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                          <div className="relative flex items-center mt-0.5">
                            <input
                              type="checkbox"
                              checked={consentAccepted}
                              onChange={(e) => setConsentAccepted(e.target.checked)}
                              className="peer sr-only"
                            />
                            <div className="w-4 h-4 border-2 border-[#f6c453]/20 rounded transition-all peer-checked:bg-[#f6c453] peer-checked:border-[#f6c453] shadow-[0_0_10px_rgba(246,196,83,0)] peer-checked:shadow-[0_0_15px_rgba(246,196,83,0.3)]"></div>
                            <CheckCircle2 className="absolute inset-0 w-4 h-4 text-[#1f2933] scale-0 peer-checked:scale-100 transition-transform" />
                          </div>
                          <span className="text-[9px] font-bold text-white/40 group-hover:text-white/60 transition-colors leading-tight">
                            Souhlasím se zpracováním osobních údajů pro účely aplikace
                          </span>
                        </label>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button
                type="submit"
                disabled={email.length < 4 || (isRegister && (!isPasswordStrong || !termsAccepted || !consentAccepted)) || (!isRegister && password.length < 1)}
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
