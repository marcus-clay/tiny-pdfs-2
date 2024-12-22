import React from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
import type { UploadState } from '../../types';

interface UploadStatusProps {
  state: UploadState;
  fileName: string;
}

export function UploadStatus({ state, fileName }: UploadStatusProps) {
  if (state.status === 'idle') return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-4 px-4 py-3 bg-white/50 rounded-lg border border-gray-100"
    >
      <div className="flex-1">
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${state.progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {state.status === 'complete' && (
        <Check className="w-5 h-5 text-green-500" />
      )}
      {state.status === 'error' && (
        <AlertCircle className="w-5 h-5 text-red-500" />
      )}
    </motion.div>
  );
}