'use client';

import { useState } from 'react';
import Calendar from '@/app/components/Calendar';
import PersonList from '@/app/components/PersonList';
import ShiftForm from '@/app/components/ShiftForm';
import AvailabilityView from '@/app/components/AvailabilityView';
import NotificationToast from '@/app/components/NotificationToast';
import StatsCards from '@/app/components/StatsCards';
import NavigationTabs from '@/app/components/NavigationTabs';
import ShiftFormHeader from '@/app/components/ShiftFormHeader';
import { Shift } from '@/app/types/schedule';
import { getPeople } from '@/app/lib/storage';
import { useNotification } from '@/app/hooks/useNotification';
import { useStats } from '@/app/hooks/useStats';
import { useKeyboardShortcuts } from '@/app/hooks/useKeyboardShortcuts';

type View = 'calendar' | 'people' | 'availability';

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('calendar');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { notification, showNotification, hideNotification } = useNotification();
  const stats = useStats(refreshKey);

  const handleShiftClick = (shift: Shift) => {
    setSelectedShift(shift);
    setSelectedPersonId(shift.personId);
    setCurrentView('people');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    if (currentView === 'calendar') {
      setTimeout(() => setCurrentView('people'), 100);
    }
  };

  const handleShiftSave = () => {
    const wasEditing = !!selectedShift;
    setSelectedShift(null);
    setSelectedDate(null);
    setRefreshKey((k) => k + 1);
    showNotification(
      wasEditing ? 'Turno atualizado com sucesso!' : 'Turno criado com sucesso!',
      'success'
    );
    if (currentView === 'availability') {
      setRefreshKey((k) => k + 1);
    }
  };

  const handleShiftCancel = () => {
    setSelectedShift(null);
    setSelectedDate(null);
  };

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    setSelectedShift(null);
    if (view === 'calendar') {
      setSelectedDate(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useKeyboardShortcuts({
    onViewChange: handleViewChange,
    onEscape: selectedShift ? handleShiftCancel : undefined,
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {notification && (
        <NotificationToast
          message={notification.message}
          type={notification.type}
          undoAction={notification.undoAction}
          onClose={hideNotification}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-black dark:text-zinc-50 mb-2">Escalas</h1>
            </div>
            <StatsCards
              totalPeople={stats.totalPeople}
              totalShifts={stats.totalShifts}
              shiftsThisWeek={stats.shiftsThisWeek}
            />
          </div>
        </header>

        <NavigationTabs currentView={currentView} onViewChange={handleViewChange} />

        <div className="min-h-[400px]">
          {currentView === 'calendar' && (
            <div className="animate-in fade-in duration-300">
              <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
                <Calendar
                  key={refreshKey}
                  onShiftClick={handleShiftClick}
                  selectedDate={selectedDate || undefined}
                  onDateSelect={handleDateSelect}
                  onDelete={(shiftId, undoAction) => {
                    setDeletingId(shiftId);
                    setTimeout(() => {
                      setDeletingId(null);
                      setRefreshKey((k) => k + 1);
                      showNotification('Turno removido com sucesso!', 'success', undoAction);
                    }, 300);
                  }}
                  deletingId={deletingId}
                />
              </div>
            </div>
          )}

          {currentView === 'people' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 sticky top-4 shadow-sm transition-shadow hover:shadow-md">
                  <PersonList
                    key={refreshKey}
                    onPersonSelect={setSelectedPersonId}
                    selectedPersonId={selectedPersonId}
                    onDataChange={() => {
                      setRefreshKey((k) => k + 1);
                      showNotification('Pessoa atualizada com sucesso!', 'success');
                    }}
                    refreshKey={refreshKey}
                    onDelete={(personId, undoAction) => {
                      setDeletingId(personId);
                      setTimeout(() => {
                        setDeletingId(null);
                        setRefreshKey((k) => k + 1);
                        const person = getPeople().find((p) => p.id === personId);
                        if (person) {
                          showNotification(
                            `"${person.name}" removida com sucesso!`,
                            'success',
                            undoAction
                          );
                        }
                      }, 300);
                    }}
                    deletingId={deletingId}
                  />
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
                  <ShiftFormHeader isEditing={!!selectedShift} onCancel={handleShiftCancel} />
                  <ShiftForm
                    key={`shift-form-${refreshKey}`}
                    shift={selectedShift}
                    defaultDate={selectedDate || undefined}
                    defaultPersonId={selectedPersonId || undefined}
                    onSave={handleShiftSave}
                    onCancel={selectedShift ? handleShiftCancel : undefined}
                    refreshKey={refreshKey}
                  />
                </div>
              </div>
            </div>
          )}

          {currentView === 'availability' && (
            <div className="animate-in fade-in duration-300">
              <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
                <AvailabilityView key={refreshKey} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
