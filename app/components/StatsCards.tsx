'use client';

interface StatsCardsProps {
  totalPeople: number;
  totalShifts: number;
  shiftsThisWeek: number;
}

export default function StatsCards({ totalPeople, totalShifts, shiftsThisWeek }: StatsCardsProps) {
  return (
    <div className="flex gap-4 text-sm">
      <div className="bg-white dark:bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <div className="text-zinc-500 dark:text-zinc-400 text-xs">Pessoas</div>
        <div className="text-lg font-semibold text-black dark:text-zinc-50">{totalPeople}</div>
      </div>
      <div className="bg-white dark:bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <div className="text-zinc-500 dark:text-zinc-400 text-xs">Total Turnos</div>
        <div className="text-lg font-semibold text-black dark:text-zinc-50">{totalShifts}</div>
      </div>
      <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="text-blue-600 dark:text-blue-400 text-xs">Esta Semana</div>
        <div className="text-lg font-semibold text-blue-700 dark:text-blue-300">
          {shiftsThisWeek}
        </div>
      </div>
    </div>
  );
}
