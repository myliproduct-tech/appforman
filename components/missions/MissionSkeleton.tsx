import React from 'react';
import { Skeleton } from '../ui/Skeleton';

export const MissionSkeleton: React.FC = () => {
    return (
        <div className="glass-card p-6 rounded-[2rem] border border-white/5 space-y-4">
            {/* Header: Category and Points */}
            <div className="flex items-start justify-between mb-3">
                <Skeleton width="100px" height="24px" className="rounded-xl" />
                <div className="flex items-center gap-2">
                    <Skeleton width="40px" height="16px" className="rounded-md" />
                    <Skeleton variant="circular" width="20px" height="20px" />
                </div>
            </div>

            {/* Title */}
            <Skeleton width="70%" height="28px" className="mb-2" />

            {/* Description Lines */}
            <div className="space-y-2 mb-6">
                <Skeleton variant="text" />
                <Skeleton variant="text" width="90%" />
                <Skeleton variant="text" width="40%" />
            </div>

            {/* Actions: Buttons */}
            <div className="flex gap-2">
                <Skeleton className="flex-1 h-[52px] rounded-xl" />
                <Skeleton width="52px" height="52px" className="rounded-xl" />
            </div>
        </div>
    );
};
