'use client';

import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { formatDate } from '@/app/lib/schedule';

interface AvailabilityFiltersProps {
  date: string;
  startTime: string;
  endTime: string;
  onDateChange: (date: string) => void;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
}

const QUICK_TIME_PRESETS = [
  { label: 'Manhã', start: '09:00', end: '13:00' },
  { label: 'Tarde', start: '14:00', end: '18:00' },
  { label: 'Noite', start: '19:00', end: '23:00' },
  { label: 'Dia Completo', start: '09:00', end: '18:00' },
];

export default function AvailabilityFilters({
  date,
  startTime,
  endTime,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
}: AvailabilityFiltersProps) {
  const [dateFocused, setDateFocused] = useState(false);
  const [dateDisplay, setDateDisplay] = useState(date ? formatDate(date) : '');

  const applyPreset = (preset: { start: string; end: string }) => {
    onStartTimeChange(preset.start);
    onEndTimeChange(preset.end);
  };

  const handleDateFocus = () => {
    setDateFocused(true);
  };

  const handleDateBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setDateFocused(false);
    const inputVal = e.target.value;

    // Try to parse dd/mm/yyyy format
    const ddmmyyyy = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(inputVal);
    if (ddmmyyyy) {
      const [, day, month, year] = ddmmyyyy;
      const isoDate = `${year}-${month}-${day}`;
      if (!isNaN(Date.parse(isoDate))) {
        onDateChange(isoDate);
        setDateDisplay(formatDate(isoDate));
        return;
      }
    }

    // If it's already in YYYY-MM-DD format, use it
    if (/^\d{4}-\d{2}-\d{2}$/.test(inputVal)) {
      onDateChange(inputVal);
      setDateDisplay(formatDate(inputVal));
      return;
    }

    // If invalid, reset to formatted value
    if (date) {
      setDateDisplay(formatDate(date));
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // If it's in YYYY-MM-DD format (from native input), update immediately
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
      onDateChange(val);
      setDateDisplay(formatDate(val));
    } else {
      setDateDisplay(val);
    }
  };

  // Update display when date prop changes externally
  useEffect(() => {
    if (date && formatDate(date) !== dateDisplay && !dateFocused) {
      setDateDisplay(formatDate(date));
    }
  }, [date, dateFocused, dateDisplay]);

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Filtros de Período</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-black dark:text-zinc-50 mb-1 flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5" />
            Data
          </label>
          {dateFocused ? (
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              onBlur={handleDateBlur}
              lang="pt-PT"
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          ) : (
            <input
              type="text"
              value={dateDisplay}
              onFocus={handleDateFocus}
              onChange={() => {}} // Prevent React warning
              readOnly
              placeholder="dd/mm/yyyy"
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-black dark:text-zinc-50 mb-1">
            Hora de Início
          </label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => onStartTimeChange(e.target.value)}
            step="60"
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black dark:text-zinc-50 mb-1">
            Hora de Fim
          </label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => onEndTimeChange(e.target.value)}
            step="60"
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-zinc-500 dark:text-zinc-400 self-center">
          Horários rápidos:
        </span>
        {QUICK_TIME_PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => applyPreset(preset)}
            className="px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors text-zinc-700 dark:text-zinc-300"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
