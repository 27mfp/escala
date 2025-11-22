'use client';

import { getDayName } from '@/app/lib/schedule';

interface CalendarWeekHeaderProps {
  dates: string[];
  selectedDate?: string;
  onDateSelect?: (date: string) => void;
}

export default function CalendarWeekHeader({
  dates,
  selectedDate,
  onDateSelect,
}: CalendarWeekHeaderProps) {
  return (
    <div className="grid grid-cols-7 gap-2 mb-2">
      {dates.map((date) => {
        const isToday = date === new Date().toISOString().split('T')[0];
        const isSelected = selectedDate === date;
        const dayNumber = new Date(date + 'T00:00:00').getDate();

        return (
          <div
            key={date}
            className={`text-center py-2 rounded-lg cursor-pointer transition-colors ${
              isSelected
                ? 'bg-blue-100 dark:bg-blue-900/30'
                : isToday
                  ? 'bg-blue-50 dark:bg-blue-900/10'
                  : 'hover:bg-zinc-50 dark:hover:bg-zinc-900'
            }`}
            onClick={() => onDateSelect?.(date)}
          >
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">{getDayName(date)}</div>
            <div
              className={`text-sm font-medium ${
                isToday ? 'text-blue-600 dark:text-blue-400' : 'text-black dark:text-zinc-50'
              }`}
            >
              {dayNumber}
            </div>
          </div>
        );
      })}
    </div>
  );
}
