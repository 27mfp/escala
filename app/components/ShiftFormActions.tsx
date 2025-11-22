'use client';

import { Shift } from '@/app/types/schedule';
import { Save, Copy, X as XIcon } from 'lucide-react';

interface ShiftFormActionsProps {
  shift: Shift | null | undefined;
  onCancel?: () => void;
  onDuplicate?: () => void;
}

export default function ShiftFormActions({ shift, onCancel, onDuplicate }: ShiftFormActionsProps) {
  return (
    <div className="flex gap-2">
      <button
        type="submit"
        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <Save className="w-4 h-4" />
        {shift ? 'Atualizar Turno' : 'Criar Turno'}
      </button>
      {shift && onDuplicate && (
        <button
          type="button"
          onClick={onDuplicate}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md flex items-center gap-2"
          title="Duplicar este turno"
        >
          <Copy className="w-4 h-4" />
          Duplicar
        </button>
      )}
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-zinc-300 dark:bg-zinc-700 text-black dark:text-zinc-50 rounded-md hover:bg-zinc-400 dark:hover:bg-zinc-600 transition-all duration-200 flex items-center gap-2"
        >
          <XIcon className="w-4 h-4" />
          Cancelar
        </button>
      )}
    </div>
  );
}
