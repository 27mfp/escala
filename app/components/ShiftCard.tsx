'use client';

import { Shift } from '@/app/types/schedule';
import { formatTime } from '@/app/lib/schedule';
import { X } from 'lucide-react';

interface ShiftCardProps {
  shift: Shift;
  personName: string;
  personColor: string;
  onClick?: () => void;
  onDelete?: (e: React.MouseEvent) => void;
  isDeleting?: boolean;
}

export default function ShiftCard({
  shift,
  personName,
  personColor,
  onClick,
  onDelete,
  isDeleting,
}: ShiftCardProps) {
  return (
    <div
      onClick={onClick}
      className={`p-2 rounded-md text-xs cursor-pointer transition-all duration-300 group relative transform ${
        isDeleting
          ? 'opacity-0 scale-90 -translate-y-2 pointer-events-none'
          : 'hover:scale-[1.02] hover:shadow-md'
      }`}
      style={{
        backgroundColor: personColor + '20',
        borderLeft: `3px solid ${personColor}`,
      }}
    >
      <div className="flex items-start justify-between gap-1">
        <div className="flex-1 min-w-0">
          <div className="font-medium text-black dark:text-zinc-50 truncate flex items-center gap-1">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: personColor }}
            />
            {personName}
          </div>
          <div className="text-zinc-600 dark:text-zinc-400 mt-0.5 text-[11px]">
            {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
          </div>
          {shift.type && (
            <div className="text-zinc-500 dark:text-zinc-500 mt-0.5 text-[10px] italic">
              {shift.type}
            </div>
          )}
        </div>
        {onDelete && (
          <button
            onClick={onDelete}
            className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all duration-200 text-sm px-1.5 py-0.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center"
            title="Remover turno"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
