'use client';

import { Plus, Edit, X } from 'lucide-react';

interface ShiftFormHeaderProps {
  isEditing: boolean;
  onCancel?: () => void;
}

export default function ShiftFormHeader({ isEditing, onCancel }: ShiftFormHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold text-black dark:text-zinc-50 flex items-center gap-2">
        {isEditing ? (
          <>
            <Edit className="w-5 h-5" />
            Editar Turno
          </>
        ) : (
          <>
            <Plus className="w-5 h-5" />
            Criar Novo Turno
          </>
        )}
      </h2>
      {isEditing && onCancel && (
        <button
          onClick={onCancel}
          className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors flex items-center gap-1"
        >
          <X className="w-4 h-4" />
          Cancelar edição
        </button>
      )}
    </div>
  );
}
