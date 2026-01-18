import React from 'react';
import { Skeleton } from '../ui/Skeleton';

export const DashboardSkeleton: React.FC = () => {
    return (
        <div className="space-y-6 animate-pulse-slow">
            {/* Header Skeleton */}
            <div className="glass-card p-6 rounded-3xl border border-white/5 h-24">
                <div className="flex items-center gap-3">
                    <Skeleton variant="circular" width={48} height={48} />
                    <div className="space-y-2">
                        <Skeleton width={150} height={20} />
                        <Skeleton width={100} height={12} />
                    </div>
                </div>
            </div>

            {/* Streak and Intel Grid */}
            <div className="grid grid-cols-2 gap-3">
                <Skeleton height={100} className="rounded-3xl" />
                <Skeleton height={100} className="rounded-3xl" />
            </div>

            {/* Main Rank Card */}
            <Skeleton height={180} className="rounded-[2.5rem]" />

            {/* Small Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
                <Skeleton height={120} className="rounded-[2rem]" />
                <Skeleton height={120} className="rounded-[2rem]" />
            </div>

            {/* Progress Section */}
            <Skeleton height={150} className="rounded-[2.5rem]" />
        </div>
    );
};
