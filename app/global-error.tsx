'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log error to console
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="pt-PT">
      <body>
        <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
              </div>
              <h1 className="text-3xl font-bold text-black dark:text-zinc-50 mb-2">Erro crítico</h1>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Ocorreu um erro crítico na aplicação. Por favor, recarregue a página.
              </p>
              {error.message && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-left">
                  <p className="text-xs font-mono text-red-700 dark:text-red-300 break-all">
                    {error.message}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md"
            >
              <RefreshCw className="w-5 h-5" />
              Recarregar página
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
