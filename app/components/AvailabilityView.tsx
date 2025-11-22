'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useAvailability } from '@/app/hooks/useAvailability';
import AvailabilityFilters from './AvailabilityFilters';
import AvailabilityList from './AvailabilityList';
import AvailabilityPercentageBadge from './AvailabilityPercentageBadge';
import PeriodSummary from './PeriodSummary';

export default function AvailabilityView() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');

  const { availablePeople, busyPeople, availabilityPercentage } = useAvailability(
    date,
    startTime,
    endTime
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-black dark:text-zinc-50 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Verificar Disponibilidade
        </h2>
        {availabilityPercentage > 0 && (
          <AvailabilityPercentageBadge percentage={availabilityPercentage} />
        )}
      </div>

      <AvailabilityFilters
        date={date}
        startTime={startTime}
        endTime={endTime}
        onDateChange={setDate}
        onStartTimeChange={setStartTime}
        onEndTimeChange={setEndTime}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <AvailabilityList
          people={availablePeople}
          type="available"
          date={date}
          startTime={startTime}
          endTime={endTime}
        />
        <AvailabilityList
          people={busyPeople}
          type="busy"
          date={date}
          startTime={startTime}
          endTime={endTime}
        />
      </div>

      <PeriodSummary date={date} startTime={startTime} endTime={endTime} />
    </div>
  );
}
