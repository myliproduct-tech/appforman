import React, { Component, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    sectionName?: string;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error Boundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Pokud je poskytnut custom fallback, použij ho
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Jinak zobraz default error UI
            return (
                <div className="flex flex-col items-center justify-center min-h-[400px] p-8 glass-card rounded-3xl border-red-500/20 bg-red-500/5">
                    <AlertTriangle className="w-16 h-16 text-red-400 mb-4" />
                    <h2 className="text-xl font-black text-red-400 uppercase tracking-wider mb-2">
                        Něco se pokazilo
                    </h2>
                    <p className="text-sm text-white/60 text-center mb-4">
                        {this.props.sectionName ? `Sekce "${this.props.sectionName}" má problém.` : 'Tato sekce má problém.'}
                    </p>
                    <p className="text-xs text-white/40 text-center mb-6">
                        Ostatní části aplikace by měly fungovat normálně.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-red-500/30 transition-all active:scale-95"
                    >
                        Obnovit aplikaci
                    </button>
                    {this.state.error && (
                        <details className="mt-6 text-xs text-white/30">
                            <summary className="cursor-pointer hover:text-white/50">
                                Technické detaily
                            </summary>
                            <pre className="mt-2 p-4 bg-black/20 rounded-lg overflow-auto max-w-md">
                                {this.state.error.toString()}
                            </pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}
