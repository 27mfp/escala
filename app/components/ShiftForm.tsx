'use client';

import { useState, useEffect } from 'react';
import { Shift, Person } from '@/app/types/schedule';
import { saveShift, getPeople } from '@/app/lib/storage';
import { checkAvailability, validateShiftTimes, formatDate } from '@/app/lib/schedule';
import { getShifts } from '@/app/lib/storage';
import ShiftFormFields from './ShiftFormFields';
import ShiftFormActions from './ShiftFormActions';

interface ShiftFormProps {
  shift?: Shift | null;
  defaultDate?: string;
  defaultPersonId?: string;
  onSave?: () => void;
  onCancel?: () => void;
  refreshKey?: number;
}

export default function ShiftForm({
  shift,
  defaultDate,
  defaultPersonId,
  onSave,
  onCancel,
  refreshKey,
}: ShiftFormProps) {
  const [people, setPeople] = useState<Person[]>([]);
  const [personId, setPersonId] = useState(defaultPersonId || '');
  const [date, setDate] = useState(defaultDate || new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [type, setType] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setPeople(getPeople());
  }, [refreshKey ?? 0]);

  useEffect(() => {
    if (shift) {
      setPersonId(shift.personId);
      setDate(shift.date);
      setStartTime(shift.startTime);
      setEndTime(shift.endTime);
      setType(shift.type || '');
    } else {
      if (defaultPersonId) {
        setPersonId(defaultPersonId);
      }
      if (defaultDate) {
        setDate(defaultDate);
      }
    }
  }, [shift, defaultPersonId, defaultDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!personId) {
      setError('Selecione uma pessoa');
      return;
    }

    if (!validateShiftTimes(startTime, endTime)) {
      setError('Horas inválidas. A hora de fim deve ser posterior à hora de início.');
      return;
    }

    const shifts = getShifts();
    const availability = checkAvailability(personId, date, startTime, endTime, shifts, shift?.id);

    if (availability.status === 'busy') {
      const conflictingShift = shifts.find((s) => s.id === availability.conflictingShiftId);
      const conflictDate = conflictingShift ? formatDate(conflictingShift.date) : '';
      setError(
        `Esta pessoa já tem um turno neste horário${conflictDate ? ` (${conflictDate})` : ''}.`
      );
      return;
    }

    const shiftToSave: Shift = {
      id: shift?.id || crypto.randomUUID(),
      personId,
      date,
      startTime,
      endTime,
      type: type || undefined,
      createdAt: shift?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveShift(shiftToSave);
    onSave?.();

    if (!shift) {
      if (!defaultPersonId) {
        setPersonId('');
      }
      if (!defaultDate) {
        setDate(new Date().toISOString().split('T')[0]);
      }
      setStartTime('09:00');
      setEndTime('17:00');
      setType('');
      setError('');
    }
  };

  const handleDuplicate = () => {
    if (!shift) return;
    const duplicatedShift: Shift = {
      ...shift,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPersonId(duplicatedShift.personId);
    setDate(duplicatedShift.date);
    setStartTime(duplicatedShift.startTime);
    setEndTime(duplicatedShift.endTime);
    setType(duplicatedShift.type || '');
    setError('');
  };

  const selectedPerson = people.find((p) => p.id === personId);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ShiftFormFields
        people={people}
        personId={personId}
        date={date}
        startTime={startTime}
        endTime={endTime}
        type={type}
        error={error}
        selectedPerson={selectedPerson}
        onPersonChange={setPersonId}
        onDateChange={setDate}
        onStartTimeChange={setStartTime}
        onEndTimeChange={setEndTime}
        onTypeChange={setType}
      />
      <ShiftFormActions shift={shift} onCancel={onCancel} onDuplicate={handleDuplicate} />
    </form>
  );
}
