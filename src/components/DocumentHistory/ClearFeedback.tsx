import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, CheckCircle2 } from 'lucide-react';
import type { ClearHistoryState } from '../../types';

interface ClearFeedbackProps {
  state: ClearHistoryState;
  documentsCount: number;
}

export function ClearFeedback({ state, documentsCount }: ClearFeedbackProps) {
  if (state.status === 'idle') return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-white px-6 py-4 rounded-xl shadow-lg border border-gray-100
        flex items-center gap-3"
      >
        {state.status === 'clearing' ? (
          <>
            <Trash2 className="w-5 h-5 text-primary animate-pulse" />
            <p className="text-dark">
              Clearing {documentsCount} document{documentsCount !== 1 ? 's' : ''}...
            </p>
          </>
        ) : (
          <>
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <p className="text-dark">History cleared successfully</p>
          </>
        )}
      </div>
    </motion.div>
  );
}