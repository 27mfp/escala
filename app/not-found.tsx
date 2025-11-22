'use client';

import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
            <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-6xl font-bold text-black dark:text-zinc-50 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Página não encontrada
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            A página que procura não existe ou foi movida.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md"
          >
            <Home className="w-5 h-5" />
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
