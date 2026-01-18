import React, { useState } from 'react';

interface TooltipProps {
    content: string;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
    disabled?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
    content,
    children,
    position = 'top',
    delay = 500,
    disabled = false
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (disabled) return;
        const id = setTimeout(() => setIsVisible(true), delay);
        setTimeoutId(id);
    };

    const handleMouseLeave = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
        setIsVisible(false);
    };

    const getPositionClasses = () => {
        switch (position) {
            case 'top':
                return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
            case 'bottom':
                return 'top-full left-1/2 -translate-x-1/2 mt-2';
            case 'left':
                return 'right-full top-1/2 -translate-y-1/2 mr-2';
            case 'right':
                return 'left-full top-1/2 -translate-y-1/2 ml-2';
            default:
                return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
        }
    };

    const getArrowClasses = () => {
        switch (position) {
            case 'top':
                return 'top-full left-1/2 -translate-x-1/2 border-t-[#2d3748] border-x-transparent border-b-transparent';
            case 'bottom':
                return 'bottom-full left-1/2 -translate-x-1/2 border-b-[#2d3748] border-x-transparent border-t-transparent';
            case 'left':
                return 'left-full top-1/2 -translate-y-1/2 border-l-[#2d3748] border-y-transparent border-r-transparent';
            case 'right':
                return 'right-full top-1/2 -translate-y-1/2 border-r-[#2d3748] border-y-transparent border-l-transparent';
            default:
                return 'top-full left-1/2 -translate-x-1/2 border-t-[#2d3748] border-x-transparent border-b-transparent';
        }
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}

            {isVisible && !disabled && (
                <div className={`absolute z-[9999] ${getPositionClasses()} animate-fade-in`}>
                    <div className="bg-[#2d3748] text-white text-[10px] font-medium px-3 py-2 rounded-lg shadow-xl border border-white/10 whitespace-nowrap max-w-[200px]">
                        {content}
                    </div>
                    {/* Arrow */}
                    <div className={`absolute w-0 h-0 border-4 ${getArrowClasses()}`} />
                </div>
            )}
        </div>
    );
};
