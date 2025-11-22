'use client';

import { Person } from '@/app/types/schedule';
import { Edit, Trash2 } from 'lucide-react';

interface PersonCardProps {
  person: Person;
  shiftCount: number;
  isSelected: boolean;
  isDeleting: boolean;
  isEditing: boolean;
  editName: string;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onSave: () => void;
  onCancel: () => void;
  onNameChange: (name: string) => void;
  animationDelay?: number;
}

export default function PersonCard({
  person,
  shiftCount,
  isSelected,
  isDeleting,
  isEditing,
  editName,
  onSelect,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  onNameChange,
  animationDelay = 0,
}: PersonCardProps) {
  return (
    <div
      ref={(el) => {
        if (isSelected && el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 100);
        }
      }}
      className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer transform ${
        isDeleting
          ? 'opacity-0 scale-95 -translate-x-4 pointer-events-none'
          : isSelected
            ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 shadow-md ring-2 ring-blue-200 dark:ring-blue-800 hover:scale-[1.02]'
            : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm hover:scale-[1.02]'
      }`}
      onClick={onSelect}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editName}
            onChange={(e) => onNameChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSave();
              if (e.key === 'Escape') onCancel();
            }}
            className="w-full px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSave();
              }}
              className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
            >
              Guardar
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCancel();
              }}
              className="px-2 py-1 bg-zinc-300 dark:bg-zinc-700 text-black dark:text-zinc-50 rounded text-xs hover:bg-zinc-400 dark:hover:bg-zinc-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div
              className="w-4 h-4 rounded-full flex-shrink-0"
              style={{ backgroundColor: person.color }}
            />
            <span className="font-medium text-black dark:text-zinc-50">{person.name}</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">({shiftCount} turnos)</span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="px-2 py-1 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded flex items-center gap-1"
              title="Editar pessoa"
            >
              <Edit className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="px-2 py-1 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded flex items-center gap-1"
              title="Remover pessoa"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
