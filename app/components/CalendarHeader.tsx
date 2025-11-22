'use client';

import { formatDate } from '@/app/lib/schedule';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarHeaderProps {
  weekStart: string;
  weekEnd: string;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
}

export default function CalendarHeader({
  weekStart,
  weekEnd,
  onPreviousWeek,
  onNextWeek,
  onToday,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onPreviousWeek}
          className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-black dark:text-zinc-50 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-200 font-medium hover:shadow-sm flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </button>
        <button
          onClick={onToday}
          className="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 flex items-center gap-1.5"
        >
          <CalendarIcon className="w-4 h-4" />
          Hoje
        </button>
        <button
          onClick={onNextWeek}
          className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-black dark:text-zinc-50 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-200 font-medium hover:shadow-sm flex items-center gap-1.5"
        >
          Seguinte
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-md flex items-center gap-2">
        <CalendarIcon className="w-4 h-4" />
        {formatDate(weekStart)} - {formatDate(weekEnd)}
      </div>
    </div>
  );
}
