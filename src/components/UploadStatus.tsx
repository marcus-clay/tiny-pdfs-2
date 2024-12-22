import React from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import type { UploadState } from '../types';

interface UploadStatusProps {
  state: UploadState;
  fileName: string;
}

export function UploadStatus({ state, fileName }: UploadStatusProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{fileName}</span>
        {state.status === 'complete' && (
          <Check className="w-5 h-5 text-green-500" />
        )}
        {state.status === 'error' && (
          <AlertCircle className="w-5 h-5 text-red-500" />
        )}
      </div>
      <ProgressBar progress={state.progress} />
      {state.error && (
        <p className="text-sm text-red-500 mt-2">{state.error}</p>
      )}
    </div>
  );
}