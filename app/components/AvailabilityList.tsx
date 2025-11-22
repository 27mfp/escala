'use client';

import { Person } from '@/app/types/schedule';
import { CheckCircle, XCircle, User } from 'lucide-react';
import { getShifts } from '@/app/lib/storage';
import { getShiftsForPerson, formatDate, formatTime } from '@/app/lib/schedule';

interface AvailabilityListProps {
  people: Person[];
  type: 'available' | 'busy';
  date: string;
  startTime: string;
  endTime: string;
}

export default function AvailabilityList({
  people,
  type,
  date,
  startTime,
  endTime,
}: AvailabilityListProps) {
  const isAvailable = type === 'available';
  const Icon = isAvailable ? CheckCircle : XCircle;
  const bgColor = isAvailable ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20';
  const borderColor = isAvailable
    ? 'border-green-200 dark:border-green-800'
    : 'border-red-200 dark:border-red-800';
  const iconColor = isAvailable ? 'text-green-500' : 'text-red-500';

  const getConflictingShifts = (personId: string) => {
    const shifts = getShifts();
    const personShifts = getShiftsForPerson(personId, shifts);
    return personShifts.filter((shift) => {
      if (shift.date !== date) return false;
      const [h1, m1] = startTime.split(':').map(Number);
      const [h2, m2] = endTime.split(':').map(Number);
      const [h3, m3] = shift.startTime.split(':').map(Number);
      const [h4, m4] = shift.endTime.split(':').map(Number);
      const time1Start = h1 * 60 + m1;
      const time1End = h2 * 60 + m2;
      const time2Start = h3 * 60 + m3;
      const time2End = h4 * 60 + m4;
      return time1Start < time2End && time2Start < time1End;
    });
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
          {isAvailable ? 'Disponíveis' : 'Ocupadas'} ({people.length})
        </h3>
      </div>
      <div className="space-y-2">
        {people.length === 0 ? (
          <div className="p-6 text-center bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <User
              className={`w-8 h-8 mx-auto mb-2 ${isAvailable ? 'text-green-400 dark:text-green-600' : 'text-red-400 dark:text-red-600'}`}
            />
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              {isAvailable ? 'Nenhuma pessoa disponível' : 'Nenhuma pessoa ocupada'}
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">neste horário</p>
          </div>
        ) : (
          people.map((person) => {
            const conflictingShifts = !isAvailable ? getConflictingShifts(person.id) : [];
            return (
              <div
                key={person.id}
                className={`p-3 ${bgColor} border ${borderColor} rounded-lg transition-all hover:shadow-sm`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: person.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-black dark:text-zinc-50 block">
                      {person.name}
                    </span>
                    {conflictingShifts.length > 0 && (
                      <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                        {conflictingShifts.map((shift, idx) => (
                          <span key={shift.id}>
                            {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                            {idx < conflictingShifts.length - 1 && ', '}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
