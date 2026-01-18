import React from 'react';

interface CardProps {
    title?: string;
    subtitle?: string;
    icon?: React.ReactNode;
    color?: string;
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'glass' | 'gradient';
    size?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
    title,
    subtitle,
    icon,
    color = '#f6c453',
    onClick,
    children,
    className = '',
    variant = 'glass',
    size = 'md'
}) => {
    const sizeClasses = {
        sm: 'p-4 rounded-2xl',
        md: 'p-6 rounded-[2rem]',
        lg: 'p-8 rounded-[2.5rem]'
    };

    const variantClasses = {
        default: 'bg-[#2d3748] border border-white/10',
        glass: 'glass-card border-white/5',
        gradient: 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10'
    };

    const baseClasses = `${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
    const interactiveClasses = onClick
        ? 'cursor-pointer hover:bg-white/5 active:scale-95 transition-all'
        : '';

    return (
        <div
            className={`${baseClasses} ${interactiveClasses} relative overflow-hidden`}
            onClick={onClick}
            style={color && variant === 'glass' ? {
                borderColor: `${color}20`,
                backgroundColor: `${color}02`
            } : undefined}
        >
            {/* Header */}
            {(title || icon) && (
                <div className="flex items-center gap-3 mb-4">
                    {icon && (
                        <div
                            className="p-3 rounded-2xl"
                            style={{
                                backgroundColor: `${color}20`,
                                borderColor: `${color}30`
                            }}
                        >
                            {icon}
                        </div>
                    )}
                    {title && (
                        <div>
                            {subtitle && (
                                <p
                                    className="text-[10px] font-black uppercase tracking-widest mb-1"
                                    style={{ color }}
                                >
                                    {subtitle}
                                </p>
                            )}
                            <h3
                                className="text-xs font-black uppercase tracking-widest"
                                style={{ color }}
                            >
                                {title}
                            </h3>
                        </div>
                    )}
                </div>
            )}

            {/* Content */}
            <div>
                {children}
            </div>
        </div>
    );
};
