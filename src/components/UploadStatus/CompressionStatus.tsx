import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, FileUp, Download, RefreshCw, X } from 'lucide-react';
import type { UploadState } from '../../types';
import { formatFileSize } from '../../utils/format';

interface CompressionStatusProps {
  state: UploadState;
  originalSize?: number;
  compressedSize?: number;
  onDownload?: () => void;
  onCompressMore?: () => void;
  onCancel?: () => void;
}

export function CompressionStatus({ 
  state, 
  originalSize, 
  compressedSize,
  onDownload,
  onCompressMore,
  onCancel
}: CompressionStatusProps) {
  const isComplete = state.status === 'complete';
  const isProcessing = state.status === 'uploading';

  if (!isProcessing && !isComplete) return null;

  const savedSize = originalSize && compressedSize 
    ? originalSize - compressedSize 
    : 0;
  
  const savingsPercentage = originalSize && compressedSize
    ? Math.round((savedSize / originalSize) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`
        flex flex-col gap-4 px-6 py-4 rounded-lg
        ${isComplete 
          ? 'bg-green-500/10 border border-green-500/20' 
          : 'bg-white/50 border border-gray-100'
        }
      `}
    >
      {isComplete ? (
        <>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full 
              flex items-center justify-center"
            >
              <Check className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-green-600">
                Compression successful
              </p>
              {originalSize && compressedSize && (
                <div className="mt-1 flex items-center gap-3 text-sm text-green-600/80">
                  <span>Saved {formatFileSize(savedSize)} ({savingsPercentage}%)</span>
                  <span>•</span>
                  <span>{formatFileSize(originalSize)} → {formatFileSize(compressedSize)}</span>
                </div>
              )}
            </div>
          </div>

          <AnimatePresence>
            <div className="flex items-center gap-3">
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onDownload}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5
                  bg-primary text-white rounded-lg font-medium
                  hover:bg-primary/90 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onCompressMore}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg
                  border border-gray-200 text-gray-600 font-medium
                  hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Compress Other Files</span>
              </motion.button>
            </div>
          </AnimatePresence>
        </>
      ) : (
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full 
            flex items-center justify-center"
          >
            <FileUp className="w-5 h-5 text-primary animate-bounce" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${state.progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Compressing... {Math.round(state.progress)}%
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCancel}
                className="flex items-center justify-center w-8 h-8 rounded-full
                  text-gray-400 hover:text-dark hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}