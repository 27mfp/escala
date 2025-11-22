'use client';

import { useState, useEffect } from 'react';
import { Shift, Person } from '@/app/types/schedule';
import { getShifts, getPeople, deleteShift, saveShift } from '@/app/lib/storage';
import { getShiftsForDate, getWeekDates, formatDate, formatTime } from '@/app/lib/schedule';
import CalendarHeader from './CalendarHeader';
import CalendarWeekHeader from './CalendarWeekHeader';
import CalendarDay from './CalendarDay';

interface CalendarProps {
  onShiftClick?: (shift: Shift) => void;
  selectedDate?: string;
  onDateSelect?: (date: string) => void;
  onDelete?: (shiftId: string, undoAction: () => void) => void;
  deletingId?: string | null;
}

export default function Calendar({
  onShiftClick,
  selectedDate,
  onDateSelect,
  onDelete,
  deletingId,
}: CalendarProps) {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState<string[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const dates = getWeekDates(new Date(currentDate));
    setWeekDates(dates);
  }, [currentDate]);

  const loadData = () => {
    setShifts(getShifts());
    setPeople(getPeople());
  };

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDeleteShift = (shiftId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const shift = shifts.find((s) => s.id === shiftId);
    if (!shift) return;

    const personName = getPersonName(shift.personId);
    const shiftDate = formatDate(shift.date);
    const shiftTime = `${formatTime(shift.startTime)} - ${formatTime(shift.endTime)}`;

    if (window.confirm(`Remover turno de ${personName}?\n\n${shiftDate}\n${shiftTime}`)) {
      const shiftToDelete = { ...shift };
      deleteShift(shiftId);
      loadData();

      if (onDelete) {
        onDelete(shiftId, () => {
          saveShift(shiftToDelete);
          loadData();
        });
      }
    }
  };

  const getPersonColor = (personId: string): string => {
    const person = people.find((p) => p.id === personId);
    return person?.color || '#9ca3af';
  };

  const getPersonName = (personId: string): string => {
    const person = people.find((p) => p.id === personId);
    return person?.name || 'Desconhecido';
  };

  const shiftsForDate = (date: string): Shift[] => {
    return getShiftsForDate(date, shifts);
  };

  if (weekDates.length === 0) return null;

  return (
    <div className="w-full">
      <CalendarHeader
        weekStart={weekDates[0]}
        weekEnd={weekDates[6]}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
        onToday={handleToday}
      />

      <CalendarWeekHeader
        dates={weekDates}
        selectedDate={selectedDate}
        onDateSelect={onDateSelect}
      />

      <div className="grid grid-cols-7 gap-2">
        {weekDates.map((date) => {
          const isToday = date === new Date().toISOString().split('T')[0];
          const isSelected = selectedDate === date;
          const dayShifts = shiftsForDate(date);

          return (
            <CalendarDay
              key={date}
              date={date}
              shifts={dayShifts}
              isToday={isToday}
              isSelected={isSelected}
              getPersonName={getPersonName}
              getPersonColor={getPersonColor}
              onDateSelect={() => onDateSelect?.(date)}
              onShiftClick={onShiftClick}
              onShiftDelete={handleDeleteShift}
              deletingId={deletingId}
            />
          );
        })}
      </div>
    </div>
  );
}
