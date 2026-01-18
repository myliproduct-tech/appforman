import React from 'react';
import { Skeleton } from '../ui/Skeleton';

export const BudgetSkeleton: React.FC = () => {
    return (
        <div className="space-y-6 animate-pulse-slow">
            {/* Header Skeleton */}
            <Skeleton height={100} className="rounded-3xl" />

            {/* Price Calculator and Main Action */}
            <div className="grid grid-cols-2 gap-3">
                <Skeleton height={120} className="rounded-3xl" />
                <Skeleton height={120} className="rounded-3xl" />
            </div>

            {/* Budget Progress Card */}
            <Skeleton height={200} className="rounded-[2.5rem]" />

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-3 gap-3">
                <Skeleton height={80} className="rounded-2xl" />
                <Skeleton height={80} className="rounded-2xl" />
                <Skeleton height={80} className="rounded-2xl" />
                <Skeleton height={80} className="rounded-2xl" />
                <Skeleton height={80} className="rounded-2xl" />
                <Skeleton height={80} className="rounded-2xl" />
            </div>
        </div>
    );
};
