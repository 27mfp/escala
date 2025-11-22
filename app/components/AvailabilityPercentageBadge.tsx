'use client';

import { TrendingUp } from 'lucide-react';

interface AvailabilityPercentageBadgeProps {
  percentage: number;
}

export default function AvailabilityPercentageBadge({
  percentage,
}: AvailabilityPercentageBadgeProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
        {percentage}% disponível
      </span>
    </div>
  );
}
