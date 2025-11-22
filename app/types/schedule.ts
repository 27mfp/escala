export interface Person {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

export interface Shift {
  id: string;
  personId: string;
  date: string; // ISO date string (YYYY-MM-DD)
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  type?: string; // Optional shift type (e.g., "manhã", "tarde", "noite")
  createdAt: string;
  updatedAt: string;
}

export interface Schedule {
  people: Person[];
  shifts: Shift[];
}

export type AvailabilityStatus = 'available' | 'busy' | 'unknown';

export interface AvailabilityCheck {
  personId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: AvailabilityStatus;
  conflictingShiftId?: string;
}
