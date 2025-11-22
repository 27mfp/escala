'use client';

import { useState, useEffect } from 'react';
import { formatDate } from '@/app/lib/schedule';

interface DateInputProps {
  value: string;
  onChange: (date: string) => void;
  label?: string;
  required?: boolean;
  className?: string;
}

export default function DateInput({
  value,
  onChange,
  label,
  required,
  className = '',
}: DateInputProps) {
  const displayValue = value ? formatDate(value) : '';
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(displayValue);

  useEffect(() => {
    if (!isFocused && value) {
      setInputValue(formatDate(value));
    }
  }, [value, isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
    // Convert to YYYY-MM-DD for the native input
    if (value) {
      setInputValue(value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    const inputVal = e.target.value;

    // Try to parse dd/mm/yyyy format
    const ddmmyyyy = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(inputVal);
    if (ddmmyyyy) {
      const [, day, month, year] = ddmmyyyy;
      const isoDate = `${year}-${month}-${day}`;
      if (!isNaN(Date.parse(isoDate))) {
        onChange(isoDate);
        setInputValue(formatDate(isoDate));
        return;
      }
    }

    // If it's already in YYYY-MM-DD format, use it
    const yyyymmdd = /^(\d{4})-(\d{2})-(\d{2})$/.exec(inputVal);
    if (yyyymmdd) {
      onChange(inputVal);
      setInputValue(formatDate(inputVal));
      return;
    }

    // If invalid, reset to formatted value
    if (value) {
      setInputValue(formatDate(value));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    // If it's in YYYY-MM-DD format (from native input), update immediately
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
      onChange(val);
    }
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-black dark:text-zinc-50 mb-1">
          {label} <span className="text-xs text-zinc-500 dark:text-zinc-400">(dd/mm/yyyy)</span>
        </label>
      )}
      {isFocused ? (
        <input
          type="date"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          lang="pt-PT"
          className={`w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
          required={required}
        />
      ) : (
        <input
          type="text"
          value={inputValue}
          onFocus={handleFocus}
          placeholder="dd/mm/yyyy"
          className={`w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
          required={required}
        />
      )}
    </div>
  );
}
