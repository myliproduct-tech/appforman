import React from 'react';

interface SkeletonProps {
    className?: string;
    width?: string | number;
    height?: string | number;
    variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton: React.FC<SkeletonProps> = ({
    className = '',
    width,
    height,
    variant = 'rectangular'
}) => {
    const baseStyles = "bg-white/10 animate-pulse-slow";
    const variantStyles = {
        text: "h-3 w-full rounded-md",
        circular: "rounded-full",
        rectangular: "rounded-2xl"
    };

    const style: React.CSSProperties = {
        width: width,
        height: height,
    };

    return (
        <div
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            style={style}
        />
    );
};
