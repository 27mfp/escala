import { Shift, Person, AvailabilityStatus, AvailabilityCheck } from '@/app/types/schedule';

// Check if two time ranges overlap
function timeRangesOverlap(start1: string, end1: string, start2: string, end2: string): boolean {
  const [h1, m1] = start1.split(':').map(Number);
  const [h2, m2] = end1.split(':').map(Number);
  const [h3, m3] = start2.split(':').map(Number);
  const [h4, m4] = end2.split(':').map(Number);

  const time1Start = h1 * 60 + m1;
  const time1End = h2 * 60 + m2;
  const time2Start = h3 * 60 + m3;
  const time2End = h4 * 60 + m4;

  return time1Start < time2End && time2Start < time1End;
}

// Check if a person is available for a given time slot
export function checkAvailability(
  personId: string,
  date: string,
  startTime: string,
  endTime: string,
  shifts: Shift[],
  excludeShiftId?: string
): AvailabilityCheck {
  const conflictingShift = shifts.find((shift) => {
    if (shift.personId !== personId) return false;
    if (shift.date !== date) return false;
    if (excludeShiftId && shift.id === excludeShiftId) return false;
    return timeRangesOverlap(shift.startTime, shift.endTime, startTime, endTime);
  });

  return {
    personId,
    date,
    startTime,
    endTime,
    status: conflictingShift ? 'busy' : 'available',
    conflictingShiftId: conflictingShift?.id,
  };
}

// Get all shifts for a specific date
export function getShiftsForDate(date: string, shifts: Shift[]): Shift[] {
  return shifts
    .filter((shift) => shift.date === date)
    .sort((a, b) => {
      const [h1, m1] = a.startTime.split(':').map(Number);
      const [h2, m2] = b.startTime.split(':').map(Number);
      return h1 * 60 + m1 - (h2 * 60 + m2);
    });
}

// Get all shifts for a specific person
export function getShiftsForPerson(personId: string, shifts: Shift[]): Shift[] {
  return shifts
    .filter((shift) => shift.personId === personId)
    .sort((a, b) => {
      if (a.date !== b.date) {
        return a.date.localeCompare(b.date);
      }
      const [h1, m1] = a.startTime.split(':').map(Number);
      const [h2, m2] = b.startTime.split(':').map(Number);
      return h1 * 60 + m1 - (h2 * 60 + m2);
    });
}

// Get shifts for a date range
export function getShiftsForDateRange(
  startDate: string,
  endDate: string,
  shifts: Shift[]
): Shift[] {
  return shifts.filter((shift) => {
    return shift.date >= startDate && shift.date <= endDate;
  });
}

// Get available people for a specific time slot
export function getAvailablePeople(
  date: string,
  startTime: string,
  endTime: string,
  people: Person[],
  shifts: Shift[]
): Person[] {
  return people.filter((person) => {
    const availability = checkAvailability(person.id, date, startTime, endTime, shifts);
    return availability.status === 'available';
  });
}

// Get busy people for a specific time slot
export function getBusyPeople(
  date: string,
  startTime: string,
  endTime: string,
  people: Person[],
  shifts: Shift[]
): Person[] {
  return people.filter((person) => {
    const availability = checkAvailability(person.id, date, startTime, endTime, shifts);
    return availability.status === 'busy';
  });
}

// Format date to display format (DD/MM/YYYY)
export function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Format time to display format (HH:mm) - 24 hour format
export function formatTime(timeString: string): string {
  // Ensure time is in HH:mm format (24 hour)
  const [hours, minutes] = timeString.split(':');
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
}

// Get week dates for a given date
export function getWeekDates(date: Date): string[] {
  const dateCopy = new Date(date);
  const day = dateCopy.getDay();
  const diff = dateCopy.getDate() - day + (day === 0 ? -6 : 1); // Monday as first day
  const monday = new Date(dateCopy);
  monday.setDate(diff);

  const weekDates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(monday);
    currentDate.setDate(monday.getDate() + i);
    const dateString = currentDate.toISOString().split('T')[0];
    weekDates.push(dateString);
  }

  return weekDates;
}

// Get day name in Portuguese
export function getDayName(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  return days[date.getDay()];
}

// Validate shift times
export function validateShiftTimes(startTime: string, endTime: string): boolean {
  const [h1, m1] = startTime.split(':').map(Number);
  const [h2, m2] = endTime.split(':').map(Number);

  if (h1 < 0 || h1 > 23 || m1 < 0 || m1 > 59) return false;
  if (h2 < 0 || h2 > 23 || m2 < 0 || m2 > 59) return false;

  const start = h1 * 60 + m1;
  const end = h2 * 60 + m2;

  return end > start;
}
