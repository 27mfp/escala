import { useState, useEffect } from 'react';
import { Person } from '@/app/types/schedule';
import { getPeople, getShifts } from '@/app/lib/storage';
import { getAvailablePeople, getBusyPeople } from '@/app/lib/schedule';

export function useAvailability(date: string, startTime: string, endTime: string) {
  const [people, setPeople] = useState<Person[]>([]);
  const [availablePeople, setAvailablePeople] = useState<Person[]>([]);
  const [busyPeople, setBusyPeople] = useState<Person[]>([]);

  useEffect(() => {
    setPeople(getPeople());
  }, []);

  useEffect(() => {
    const shifts = getShifts();
    const available = getAvailablePeople(date, startTime, endTime, people, shifts);
    const busy = getBusyPeople(date, startTime, endTime, people, shifts);

    setAvailablePeople(available);
    setBusyPeople(busy);
  }, [date, startTime, endTime, people]);

  const availabilityPercentage =
    people.length > 0 ? Math.round((availablePeople.length / people.length) * 100) : 0;

  return {
    people,
    availablePeople,
    busyPeople,
    availabilityPercentage,
  };
}
