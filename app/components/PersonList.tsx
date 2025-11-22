'use client';

import { useState, useEffect } from 'react';
import { Person } from '@/app/types/schedule';
import {
  getPeople,
  savePerson,
  deletePerson,
  generatePersonColor,
  getShifts,
  saveShift,
} from '@/app/lib/storage';
import { getShiftsForPerson } from '@/app/lib/schedule';
import { Plus, Users, User } from 'lucide-react';
import PersonForm from './PersonForm';
import PersonCard from './PersonCard';

interface PersonListProps {
  onPersonSelect?: (personId: string | null) => void;
  selectedPersonId?: string | null;
  onDataChange?: () => void;
  refreshKey?: number;
  onDelete?: (personId: string, undoAction: () => void) => void;
  deletingId?: string | null;
}

export default function PersonList({
  onPersonSelect,
  selectedPersonId,
  onDataChange,
  refreshKey,
  onDelete,
  deletingId,
}: PersonListProps) {
  const [people, setPeople] = useState<Person[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    loadPeople();
  }, [refreshKey ?? 0]);

  const loadPeople = () => {
    setPeople(getPeople());
  };

  const handleAdd = () => {
    if (!newName.trim()) return;

    const newPerson: Person = {
      id: crypto.randomUUID(),
      name: newName.trim(),
      color: generatePersonColor(),
      createdAt: new Date().toISOString(),
    };

    savePerson(newPerson);
    setNewName('');
    setIsAdding(false);

    setTimeout(() => {
      loadPeople();
      if (onPersonSelect) {
        onPersonSelect(newPerson.id);
      }
    }, 100);

    onDataChange?.();
  };

  const handleEdit = (person: Person) => {
    setEditingId(person.id);
    setNewName(person.name);
  };

  const handleSave = (personId: string) => {
    const person = people.find((p) => p.id === personId);
    if (!person || !newName.trim()) return;

    const updatedPerson: Person = {
      ...person,
      name: newName.trim(),
    };

    savePerson(updatedPerson);
    setEditingId(null);
    setNewName('');
    loadPeople();
    onDataChange?.();
  };

  const handleDelete = (personId: string) => {
    const person = people.find((p) => p.id === personId);
    if (!person) return;

    const personToDelete = { ...person };
    const shiftsBeforeDelete = getShifts();
    const shiftsToDelete = shiftsBeforeDelete.filter((s) => s.personId === personId);

    if (
      window.confirm(
        `Tem a certeza que deseja remover "${person.name}"?\n\nTodos os ${shiftsToDelete.length} turno(s) associado(s) serão removidos.`
      )
    ) {
      deletePerson(personId);
      loadPeople();
      onDataChange?.();

      if (onPersonSelect && selectedPersonId === personId) {
        onPersonSelect(null);
      }

      if (onDelete) {
        onDelete(personId, () => {
          savePerson(personToDelete);
          shiftsToDelete.forEach((shift) => {
            saveShift(shift);
          });
          loadPeople();
          onDataChange?.();
        });
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setNewName('');
  };

  const getShiftCount = (personId: string) => {
    const currentShifts = getShifts();
    return getShiftsForPerson(personId, currentShifts).length;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-black dark:text-zinc-50 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Pessoas
        </h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        )}
      </div>

      {isAdding && (
        <PersonForm
          name={newName}
          onNameChange={setNewName}
          onSave={handleAdd}
          onCancel={handleCancel}
        />
      )}

      <div className="space-y-2">
        {people.length === 0 ? (
          <div className="text-center py-8 px-4">
            <User className="w-12 h-12 text-zinc-400 dark:text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-2 font-medium">
              Nenhuma pessoa adicionada ainda
            </p>
            <p className="text-zinc-400 dark:text-zinc-600 text-xs">
              Clique em "Adicionar" para começar
            </p>
          </div>
        ) : (
          people.map((person, index) => (
            <PersonCard
              key={person.id}
              person={person}
              shiftCount={getShiftCount(person.id)}
              isSelected={selectedPersonId === person.id}
              isDeleting={deletingId === person.id}
              isEditing={editingId === person.id}
              editName={newName}
              onSelect={() => onPersonSelect?.(person.id === selectedPersonId ? null : person.id)}
              onEdit={() => handleEdit(person)}
              onDelete={() => handleDelete(person.id)}
              onSave={() => handleSave(person.id)}
              onCancel={handleCancel}
              onNameChange={setNewName}
              animationDelay={index * 50}
            />
          ))
        )}
      </div>
    </div>
  );
}
