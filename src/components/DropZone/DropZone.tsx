import React from 'react';
import { motion } from 'framer-motion';
import { FileUp } from 'lucide-react';
import { useDropZone } from './useDropZone';
import { DropZoneOverlay } from './DropZoneOverlay';
import type { FileWithPreview } from '../../types';

interface DropZoneProps {
  onFilesSelect: (files: FileWithPreview[]) => void;
  className?: string;
}

export function DropZone({ onFilesSelect, className = '' }: DropZoneProps) {
  const {
    isDragging,
    inputRef,
    handleDrop,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleFileInput
  } = useDropZone(onFilesSelect);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      className={`
        relative min-h-[240px] border-2 border-dashed rounded-xl
        ${isDragging ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}
        transition-colors duration-200
        ${className}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileInput}
        className="hidden"
        id="file-input"
        multiple
      />
      
      <label
        htmlFor="file-input"
        className="absolute inset-0 cursor-pointer flex flex-col items-center justify-center p-8"
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isDragging ? 1.05 : 1 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{ 
              y: isDragging ? -8 : 0,
              scale: isDragging ? 1.1 : 1
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <FileUp className="w-12 h-12 text-blue-500" />
          </motion.div>
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700">
              Drag and drop your PDFs here
            </p>
            <p className="text-sm text-gray-500 mt-1">
              or click to select files
            </p>
          </div>
        </motion.div>
      </label>

      <DropZoneOverlay isVisible={isDragging} />
    </div>
  );
}