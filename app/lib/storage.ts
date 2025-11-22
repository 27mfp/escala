import { Person, Shift, Schedule } from '@/app/types/schedule';

const STORAGE_KEYS = {
  PEOPLE: 'escala_people',
  SHIFTS: 'escala_shifts',
} as const;

// Person CRUD operations
export function getPeople(): Person[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEYS.PEOPLE);
  return stored ? JSON.parse(stored) : [];
}

export function savePerson(person: Person): void {
  const people = getPeople();
  const existingIndex = people.findIndex((p) => p.id === person.id);

  if (existingIndex >= 0) {
    people[existingIndex] = person;
  } else {
    people.push(person);
  }

  localStorage.setItem(STORAGE_KEYS.PEOPLE, JSON.stringify(people));
}

export function deletePerson(personId: string): void {
  const people = getPeople().filter((p) => p.id !== personId);
  localStorage.setItem(STORAGE_KEYS.PEOPLE, JSON.stringify(people));

  // Also delete all shifts for this person
  const shifts = getShifts().filter((s) => s.personId !== personId);
  localStorage.setItem(STORAGE_KEYS.SHIFTS, JSON.stringify(shifts));
}

// Shift CRUD operations
export function getShifts(): Shift[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEYS.SHIFTS);
  return stored ? JSON.parse(stored) : [];
}

export function saveShift(shift: Shift): void {
  const shifts = getShifts();
  const existingIndex = shifts.findIndex((s) => s.id === shift.id);

  if (existingIndex >= 0) {
    shifts[existingIndex] = shift;
  } else {
    shifts.push(shift);
  }

  localStorage.setItem(STORAGE_KEYS.SHIFTS, JSON.stringify(shifts));
}

export function deleteShift(shiftId: string): void {
  const shifts = getShifts().filter((s) => s.id !== shiftId);
  localStorage.setItem(STORAGE_KEYS.SHIFTS, JSON.stringify(shifts));
}

// Get complete schedule
export function getSchedule(): Schedule {
  return {
    people: getPeople(),
    shifts: getShifts(),
  };
}

// Generate a random color for a person
export function generatePersonColor(): string {
  const colors = [
    '#3b82f6', // blue
    '#ef4444', // red
    '#10b981', // green
    '#f59e0b', // amber
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#84cc16', // lime
    '#f97316', // orange
    '#6366f1', // indigo
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
