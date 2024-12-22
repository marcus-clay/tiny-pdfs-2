import React from 'react';
import { motion } from 'framer-motion';
import { X, FileText } from 'lucide-react';
import { formatFileSize } from '../../utils/format';
import { DocumentThumbnail } from './DocumentThumbnail';
import type { FileWithPreview } from '../../types';

interface FilePreviewProps {
  file: FileWithPreview;
  onRemove: (id: string) => void;
}

export function FilePreview({ file, onRemove }: FilePreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative flex items-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-4">
        <DocumentThumbnail />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-500" />
            <p className="text-sm font-medium text-gray-900 truncate">
              {file.file.name}
            </p>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {formatFileSize(file.file.size)}
          </p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onRemove(file.id)}
        className="ml-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100/50"
      >
        <X className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}