'use client';

import { Check, X } from 'lucide-react';

interface PersonFormProps {
  name: string;
  onNameChange: (name: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function PersonForm({ name, onNameChange, onSave, onCancel }: PersonFormProps) {
  return (
    <div className="mb-4 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 animate-in slide-in-from-top-2">
      <input
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSave();
          if (e.key === 'Escape') onCancel();
        }}
        placeholder="Nome da pessoa"
        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 transition-all"
        autoFocus
      />
      <div className="flex gap-2">
        <button
          onClick={onSave}
          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition-colors font-medium flex items-center gap-1.5"
        >
          <Check className="w-3.5 h-3.5" />
          Guardar
        </button>
        <button
          onClick={onCancel}
          className="px-3 py-1 bg-zinc-300 dark:bg-zinc-700 text-black dark:text-zinc-50 rounded-md hover:bg-zinc-400 dark:hover:bg-zinc-600 text-sm transition-colors flex items-center gap-1.5"
        >
          <X className="w-3.5 h-3.5" />
          Cancelar
        </button>
      </div>
    </div>
  );
}
