'use client';

import { useState, useEffect } from 'react';
import { Person } from '@/app/types/schedule';
import { AlertCircle, Clock } from 'lucide-react';
import { formatDate } from '@/app/lib/schedule';

const TIME_PRESETS = [
  { label: 'Manhã', start: '09:00', end: '13:00' },
  { label: 'Tarde', start: '14:00', end: '18:00' },
  { label: 'Noite', start: '19:00', end: '23:00' },
  { label: 'Dia Completo', start: '09:00', end: '18:00' },
];

interface ShiftFormFieldsProps {
  people: Person[];
  personId: string;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  error: string;
  selectedPerson: Person | undefined;
  onPersonChange: (personId: string) => void;
  onDateChange: (date: string) => void;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
  onTypeChange: (type: string) => void;
}

export default function ShiftFormFields({
  people,
  personId,
  date,
  startTime,
  endTime,
  type,
  error,
  selectedPerson,
  onPersonChange,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
  onTypeChange,
}: ShiftFormFieldsProps) {
  const [dateFocused, setDateFocused] = useState(false);
  const [dateDisplay, setDateDisplay] = useState(date ? formatDate(date) : '');

  useEffect(() => {
    if (date && !dateFocused) {
      const formatted = formatDate(date);
      if (formatted !== dateDisplay) {
        setDateDisplay(formatted);
      }
    }
  }, [date, dateFocused]);

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

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-black dark:text-zinc-50 mb-1">
          Pessoa
        </label>
        <select
          value={personId}
          onChange={(e) => onPersonChange(e.target.value)}
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Selecione uma pessoa</option>
          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-black dark:text-zinc-50 mb-1">Data</label>
        {dateFocused ? (
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            onBlur={handleDateBlur}
            lang="pt-PT"
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        ) : (
          <input
            type="text"
            value={dateDisplay}
            onFocus={handleDateFocus}
            onChange={() => {}} // Prevent React warning
            readOnly
            placeholder="dd/mm/yyyy"
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            required
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-black dark:text-zinc-50 mb-1">
            Hora de Início
          </label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => onStartTimeChange(e.target.value)}
            step="60"
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
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
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            Horários rápidos:
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {TIME_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                onStartTimeChange(preset.start);
                onEndTimeChange(preset.end);
              }}
              className="px-3 py-1.5 text-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-zinc-700 dark:text-zinc-300 font-medium"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-black dark:text-zinc-50 mb-1">
          Tipo de Turno (opcional)
        </label>
        <input
          type="text"
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          placeholder="ex: manhã, tarde, noite"
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {selectedPerson && (
        <div className="flex items-center gap-2 p-2 bg-zinc-50 dark:bg-zinc-900 rounded-md">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedPerson.color }} />
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Cor da pessoa: {selectedPerson.name}
          </span>
        </div>
      )}
    </>
  );
}
