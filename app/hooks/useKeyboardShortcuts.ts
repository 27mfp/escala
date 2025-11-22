import { useEffect } from 'react';

type View = 'calendar' | 'people' | 'availability';

interface UseKeyboardShortcutsProps {
  onViewChange: (view: View) => void;
  onEscape?: () => void;
  enabled?: boolean;
}

export function useKeyboardShortcuts({
  onViewChange,
  onEscape,
  enabled = true,
}: UseKeyboardShortcutsProps) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.key === '1') {
        onViewChange('calendar');
      } else if (e.key === '2') {
        onViewChange('people');
      } else if (e.key === '3') {
        onViewChange('availability');
      } else if (e.key === 'Escape' && onEscape) {
        onEscape();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onViewChange, onEscape, enabled]);
}
