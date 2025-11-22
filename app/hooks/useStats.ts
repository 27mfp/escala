import { useState, useEffect } from 'react';
import { getShifts, getPeople } from '@/app/lib/storage';
import { getShiftsForDateRange, getWeekDates } from '@/app/lib/schedule';

interface Stats {
  totalPeople: number;
  totalShifts: number;
  shiftsThisWeek: number;
}

export function useStats(refreshKey: number) {
  const [stats, setStats] = useState<Stats>({ totalPeople: 0, totalShifts: 0, shiftsThisWeek: 0 });

  useEffect(() => {
    const people = getPeople();
    const shifts = getShifts();
    const today = new Date();
    const weekDates = getWeekDates(today);
    const shiftsThisWeek = getShiftsForDateRange(weekDates[0], weekDates[6], shifts).length;

    setStats({
      totalPeople: people.length,
      totalShifts: shifts.length,
      shiftsThisWeek,
    });
  }, [refreshKey]);

  return stats;
}
