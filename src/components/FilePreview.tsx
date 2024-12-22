import React from 'react';
import { FileText, X } from 'lucide-react';
import { formatFileSize } from '../utils/format';
import type { FileWithPreview } from '../types';

interface FilePreviewProps {
  file: FileWithPreview;
  onRemove: (id: string) => void;
}

export function FilePreview({ file, onRemove }: FilePreviewProps) {
  return (
    <div className="relative flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <FileText className="w-8 h-8 text-blue-500 mr-3" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {file.file.name}
        </p>
        <p className="text-sm text-gray-500">
          {formatFileSize(file.file.size)}
        </p>
      </div>
      <button
        onClick={() => onRemove(file.id)}
        className="ml-2 p-1 text-gray-400 hover:text-gray-500"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}