'use client';

import { Calendar as CalendarIcon } from 'lucide-react';
import { formatDate, formatTime } from '@/app/lib/schedule';

interface PeriodSummaryProps {
  date: string;
  startTime: string;
  endTime: string;
}

export default function PeriodSummary({ date, startTime, endTime }: PeriodSummaryProps) {
  return (
    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-center gap-2">
      <CalendarIcon className="w-4 h-4 text-blue-700 dark:text-blue-300 flex-shrink-0" />
      <p className="text-sm text-blue-800 dark:text-blue-200">
        <strong>Período selecionado:</strong> {formatDate(date)} das {formatTime(startTime)} às{' '}
        {formatTime(endTime)}
      </p>
    </div>
  );
}
