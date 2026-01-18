import React from 'react';
import { Skeleton } from '../ui/Skeleton';

export const ReconSkeleton: React.FC = () => {
    return (
        <div className="space-y-6 animate-pulse-slow">
            {/* Header Skeleton */}
            <Skeleton height={100} className="rounded-3xl" />

            {/* Tactical Tools Grid */}
            <div className="space-y-4">
                <Skeleton width="40%" height={16} className="mx-auto" />
                <div className="grid grid-cols-3 gap-3">
                    <Skeleton height={80} className="rounded-3xl" />
                    <Skeleton height={80} className="rounded-3xl" />
                    <Skeleton height={80} className="rounded-3xl" />
                </div>
            </div>

            {/* Emergency Protocols */}
            <div className="space-y-4">
                <Skeleton width="40%" height={16} className="mx-auto" />
                <Skeleton height={150} className="rounded-3xl" />
                <Skeleton height={120} className="rounded-3xl" />
                <Skeleton height={60} className="rounded-3xl" />
                <Skeleton height={60} className="rounded-3xl" />
            </div>
        </div>
    );
};
