import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: string;
    showCloseButton?: boolean;
    footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    size = 'md',
    color = '#f6c453',
    showCloseButton = true,
    footer
}) => {
    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl'
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className={`bg-[#1f2933] w-full ${sizeClasses[size]} rounded-[2rem] border overflow-hidden flex flex-col max-h-[80vh] shadow-2xl`}
                style={{ borderColor: `${color}30` }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    className="p-6 border-b flex justify-between items-start"
                    style={{
                        backgroundColor: `${color}10`,
                        borderColor: `${color}10`
                    }}
                >
                    <div>
                        {subtitle && (
                            <div className="flex items-center gap-2 mb-2">
                                <span
                                    className="text-[10px] font-black uppercase tracking-[0.2em]"
                                    style={{ color }}
                                >
                                    {subtitle}
                                </span>
                            </div>
                        )}
                        <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">
                            {title}
                        </h2>
                    </div>
                    {showCloseButton && (
                        <button
                            onClick={onClose}
                            className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                        >
                            <X className="w-5 h-5 text-white/50" />
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto flex-1">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="p-6 pt-0 border-t border-white/20 mt-auto bg-[#1f2933]">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};
