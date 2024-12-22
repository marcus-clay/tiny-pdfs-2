import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileUp, Download, ArrowRight, Loader2 } from 'lucide-react';
import { CompressionOptions } from '../CompressionOptions/CompressionOptions';
import { CompressionStatus } from '../UploadStatus/CompressionStatus';
import type { FileWithPreview, CompressionLevel, UploadState } from '../../types';

interface UploadZoneProps {
  files: FileWithPreview[];
  compressionLevel: CompressionLevel;
  onCompressionChange: (level: CompressionLevel) => void;
  uploadState: UploadState;
  onCompress: () => void;
  onCancel: () => void;
  onDownload?: () => void;
  onCompressMore?: () => void;
}

export function UploadZone({ 
  files, 
  compressionLevel,
  onCompressionChange,
  uploadState,
  onCompress, 
  onCancel,
  onDownload,
  onCompressMore
}: UploadZoneProps) {
  const [totalSize] = React.useState(() => 
    files.reduce((sum, file) => sum + file.file.size, 0)
  );
  const [compressedSize, setCompressedSize] = React.useState<number>();
  
  const isProcessing = uploadState.status === 'uploading';
  const isComplete = uploadState.status === 'complete';

  React.useEffect(() => {
    if (isComplete) {
      const simulatedCompressedSize = Math.round(
        totalSize * (
          compressionLevel === 'high' ? 0.3 :
          compressionLevel === 'medium' ? 0.5 :
          0.7
        )
      );
      setCompressedSize(simulatedCompressedSize);
    }
  }, [isComplete, totalSize, compressionLevel]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative p-8 rounded-xl border-2 border-dashed
        bg-gradient-to-br from-primary/5 to-secondary/5
        border-primary/20"
    >
      <div className="flex flex-col items-center gap-6">
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="w-12 h-12 flex items-center justify-center"
            >
              <Loader2 
                className="w-full h-full text-primary animate-spin"
                strokeWidth={2}
              />
            </motion.div>
          ) : isComplete ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="w-12 h-12 flex items-center justify-center"
            >
              <Download 
                className="w-full h-full text-primary"
                strokeWidth={2}
              />
            </motion.div>
          ) : (
            <motion.div
              key="ready"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="w-12 h-12 flex items-center justify-center"
            >
              <FileUp 
                className="w-full h-full text-primary"
                strokeWidth={2}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={isProcessing ? 'processing' : isComplete ? 'complete' : 'ready'}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <p className="text-lg font-medium text-dark">
              {isProcessing 
                ? `${files.length} ${files.length === 1 ? 'file is' : 'files are'} being compressed`
                : isComplete
                  ? `${files.length} ${files.length === 1 ? 'file' : 'files'} ready to download`
                  : `${files.length} ${files.length === 1 ? 'file' : 'files'} ready to compress`
              }
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Total size: {(totalSize / 1024 / 1024).toFixed(1)} MB
            </p>
          </motion.div>
        </AnimatePresence>

        {!isProcessing && !isComplete && (
          <CompressionOptions
            level={compressionLevel}
            onChange={onCompressionChange}
          />
        )}

        <div className="w-full max-w-md space-y-4">
          <AnimatePresence mode="wait">
            <CompressionStatus
              state={uploadState}
              originalSize={totalSize}
              compressedSize={compressedSize}
              onDownload={onDownload}
              onCompressMore={onCompressMore}
              onCancel={onCancel}
            />
          </AnimatePresence>

          {!isComplete && !isProcessing && (
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onCompress}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 
                  bg-button text-white rounded-lg font-medium
                  hover:bg-button/90 transition-colors"
              >
                <span>Start Compression</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onCancel}
                className="px-6 py-2.5 text-gray-400 hover:text-dark rounded-lg
                  hover:bg-gray-50/50 transition-colors"
              >
                Cancel
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}