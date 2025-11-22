import { useState, useEffect } from 'react';

interface Notification {
  message: string;
  type: 'success' | 'error';
  undoAction?: () => void;
}

export function useNotification() {
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if (notification) {
      const timeout = notification.undoAction ? 5000 : 3000;
      const timer = setTimeout(() => setNotification(null), timeout);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (
    message: string,
    type: 'success' | 'error' = 'success',
    undoAction?: () => void
  ) => {
    setNotification({ message, type, undoAction });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return {
    notification,
    showNotification,
    hideNotification,
  };
}
