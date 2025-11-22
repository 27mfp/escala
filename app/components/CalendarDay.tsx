'use client';

import { Shift } from '@/app/types/schedule';
import ShiftCard from './ShiftCard';

interface CalendarDayProps {
  date: string;
  shifts: Shift[];
  isToday: boolean;
  isSelected: boolean;
  getPersonName: (personId: string) => string;
  getPersonColor: (personId: string) => string;
  onDateSelect?: () => void;
  onShiftClick?: (shift: Shift) => void;
  onShiftDelete?: (shiftId: string, e: React.MouseEvent) => void;
  deletingId?: string | null;
}

export default function CalendarDay({
  date,
  shifts,
  isToday,
  isSelected,
  getPersonName,
  getPersonColor,
  onDateSelect,
  onShiftClick,
  onShiftDelete,
  deletingId,
}: CalendarDayProps) {
  return (
    <div
      className={`min-h-[200px] p-2 rounded-lg border ${
        isSelected
          ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/10'
          : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900'
      }`}
    >
      <div className="space-y-2">
        {shifts.length === 0 ? (
          <div
            className="text-xs text-zinc-400 dark:text-zinc-600 text-center py-4 cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
            onClick={onDateSelect}
          >
            Sem turnos
            <div className="text-[10px] mt-1">Clique para adicionar</div>
          </div>
        ) : (
          shifts.map((shift) => (
            <ShiftCard
              key={shift.id}
              shift={shift}
              personName={getPersonName(shift.personId)}
              personColor={getPersonColor(shift.personId)}
              onClick={() => onShiftClick?.(shift)}
              onDelete={onShiftDelete ? (e) => onShiftDelete(shift.id, e) : undefined}
              isDeleting={deletingId === shift.id}
            />
          ))
        )}
      </div>
    </div>
  );
}
