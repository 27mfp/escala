'use client';

import { Calendar as CalendarIcon, Users, CheckCircle } from 'lucide-react';

type View = 'calendar' | 'people' | 'availability';

interface NavigationTabsProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export default function NavigationTabs({ currentView, onViewChange }: NavigationTabsProps) {
  return (
    <div className="mb-6 border-b border-zinc-200 dark:border-zinc-800">
      <nav className="flex gap-1">
        <button
          onClick={() => onViewChange('calendar')}
          className={`px-4 py-2 font-medium transition-all duration-200 border-b-2 relative flex items-center gap-2 ${
            currentView === 'calendar'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-t-lg'
          }`}
        >
          <CalendarIcon className="w-4 h-4" />
          Calendário
        </button>
        <button
          onClick={() => onViewChange('people')}
          className={`px-4 py-2 font-medium transition-all duration-200 border-b-2 relative flex items-center gap-2 ${
            currentView === 'people'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-t-lg'
          }`}
        >
          <Users className="w-4 h-4" />
          Pessoas e Turnos
        </button>
        <button
          onClick={() => onViewChange('availability')}
          className={`px-4 py-2 font-medium transition-all duration-200 border-b-2 relative flex items-center gap-2 ${
            currentView === 'availability'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-t-lg'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          Disponibilidade
        </button>
      </nav>
    </div>
  );
}
