import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, Cpu, Terminal, Wifi, Lock, Activity } from 'lucide-react';

export const SplashScreen: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [messages, setMessages] = useState<string[]>([]);

    const bootSequence = [
        "INITIALIZING CORE SYSTEM...",
        "LOADING TACTICAL INTEL...",
        "CALIBRATING BIOMETRIC SENSORS...",
        "ESTABLISHING SECURE CONNECTION...",
        "DECRYPTING MISSION DATA...",
        "SYSTEM OPTIMIZED. READY FOR DEPLOYMENT."
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        bootSequence.forEach((msg, index) => {
            setTimeout(() => {
                setMessages(prev => [...prev, msg]);
            }, index * 300);
        });

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-[1000] bg-[#1f2933] flex flex-col items-center justify-center p-6 text-[#f6c453]">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2Y2YzQ1MyIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

            <div className="relative w-full max-w-sm space-y-12">
                {/* Logo Section */}
                <div className="flex flex-col items-center space-y-4 animate-pulse-slow">
                    <div className="p-5 rounded-3xl bg-[#f6c453]/10 border border-[#f6c453]/30 shadow-[0_0_30px_rgba(246,196,83,0.1)]">
                        <Shield className="w-16 h-16" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl font-black italic uppercase tracking-tighter">PARTNER V AKCI</h1>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50">Tactical Support System</p>
                    </div>
                </div>

                {/* Console Output */}
                <div className="space-y-2 font-mono text-[10px] bg-black/20 p-4 rounded-xl border border-white/5 h-32 overflow-hidden">
                    {messages.map((msg, i) => (
                        <div key={i} className="flex gap-2 items-center animate-slide-up">
                            <span className="opacity-40">[{new Date().toLocaleTimeString('cs-CZ', { hour12: false })}]</span>
                            <span className="text-[#f6c453]/80 font-bold">{msg}</span>
                        </div>
                    ))}
                    <div className="w-1.5 h-3 bg-[#f6c453] animate-pulse inline-block align-middle ml-1"></div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Loading Assets</span>
                        <span className="text-xl font-black italic tracking-tighter">{progress}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                        <div
                            className="h-full bg-[#f6c453] rounded-full transition-all duration-100 ease-out shadow-[0_0_15px_rgba(246,196,83,0.5)]"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Version & Status */}
                <div className="flex justify-between items-center px-2 opacity-30">
                    <div className="flex items-center gap-2">
                        <Cpu className="w-3 h-3" />
                        <span className="text-[8px] font-black uppercase tracking-widest">v2.4.0 Stable</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Wifi className="w-3 h-3" />
                        <span className="text-[8px] font-black uppercase tracking-widest">Secure Link Active</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
