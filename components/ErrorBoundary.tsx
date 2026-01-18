import React, { useState } from 'react';
import { AlertTriangle, RefreshCw, Copy, MessageSquare, Check } from 'lucide-react';

interface Props {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    copied: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        copied: false
    };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, copied: false };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error Boundary caught:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, copied: false });
    };

    handleCopyDetails = async () => {
        const errorDetails = `
=== KRITICKÁ CHYBA ===
Zpráva: ${this.state.error?.message || 'Neznámá chyba'}
Stack: ${this.state.error?.stack || 'Není k dispozici'}
Čas: ${new Date().toLocaleString()}
UA: ${navigator.userAgent}
        `.trim();

        try {
            await navigator.clipboard.writeText(errorDetails);
            this.setState({ copied: true });
            setTimeout(() => this.setState({ copied: false }), 2000);
        } catch (err) {
            console.error('Failed to copy error details:', err);
        }
    };

    handleReportViaEmail = () => {
        const subject = encodeURIComponent('KRITICKÁ CHYBA: Operace Junior');
        const body = encodeURIComponent(`Ahoj,\n\nv aplikaci se vyskytla kritická chyba:\n\n"${this.state.error?.message}"\n\nDetaily chyby:\n${this.state.error?.stack || 'Není k dispozici'}\n\nČas: ${new Date().toLocaleString()}\nUA: ${navigator.userAgent}\n\nProsím o prověření. 🙏`);
        window.location.href = `mailto:podpora@operacejunior.cz?subject=${subject}&body=${body}`;
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f1419] via-[#1f2933] to-[#0f1419] p-6 overflow-y-auto">
                    <div className="max-w-md w-full bg-[#1f2933] rounded-[2rem] border border-red-500/30 p-8 text-center my-8">
                        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
                        <h2 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tight">Kritická Chyba</h2>
                        <p className="text-white/60 mb-2 text-sm leading-relaxed">
                            Něco se pokazilo. Zkus obnovit stránku nebo nahlásit chybu naší podpoře.
                        </p>

                        {this.state.error && (
                            <div className="mb-6">
                                <p className="text-red-400/80 text-xs font-mono p-4 bg-black/40 rounded-xl border border-red-500/10 text-left overflow-x-auto whitespace-pre-wrap">
                                    {this.state.error.message}
                                </p>
                            </div>
                        )}

                        <div className="space-y-3">
                            <button
                                onClick={this.handleReset}
                                className="w-full py-4 bg-red-500 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-red-400 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Zkusit znovu
                            </button>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={this.handleCopyDetails}
                                    className={`py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 border ${this.state.copied
                                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                            : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                                        }`}
                                >
                                    {this.state.copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                    {this.state.copied ? 'Zkopírováno' : 'Kopírovat'}
                                </button>

                                <button
                                    onClick={this.handleReportViaEmail}
                                    className="py-3 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    <MessageSquare className="w-3 h-3" />
                                    Email Podpora
                                </button>
                            </div>
                        </div>

                        <p className="mt-6 text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold">
                            Týmová podpora • Pro chytré táty
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
