'use client';

import { Check, X, Undo2 } from 'lucide-react';

interface NotificationToastProps {
  message: string;
  type: 'success' | 'error';
  undoAction?: () => void;
  onClose: () => void;
}

export default function NotificationToast({
  message,
  type,
  undoAction,
  onClose,
}: NotificationToastProps) {
  return (
    <div
      className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      } animate-in slide-in-from-top-5`}
      style={{ animation: 'slideIn 0.3s ease-out' }}
    >
      <div className="flex items-center gap-2">
        {type === 'success' ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
        <span className="font-medium">{message}</span>
        {undoAction && (
          <button
            onClick={() => {
              undoAction();
              onClose();
            }}
            className="ml-2 px-2 py-1 bg-white/20 hover:bg-white/30 rounded text-xs font-medium transition-colors flex items-center gap-1"
          >
            <Undo2 className="w-3 h-3" />
            Desfazer
          </button>
        )}
      </div>
    </div>
  );
}
