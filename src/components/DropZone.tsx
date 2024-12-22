import React, { useCallback } from 'react';
import { FileUp } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import type { FileWithPreview } from '../types';

interface DropZoneProps {
  onFilesSelect: (files: FileWithPreview[]) => void;
  className?: string;
}

export function DropZone({ onFilesSelect, className = '' }: DropZoneProps) {
  const processFiles = useCallback((fileList: FileList) => {
    const files: FileWithPreview[] = Array.from(fileList)
      .filter(file => file.type === 'application/pdf')
      .map(file => ({
        file,
        id: uuidv4()
      }));

    if (files.length > 0) {
      onFilesSelect(files);
    }
  }, [onFilesSelect]);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const onFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
      e.target.value = ''; // Reset input
    }
  }, [processFiles]);

  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors ${className}`}
    >
      <input
        type="file"
        accept=".pdf"
        onChange={onFileInput}
        className="hidden"
        id="file-input"
        multiple
      />
      <label
        htmlFor="file-input"
        className="cursor-pointer flex flex-col items-center gap-4"
      >
        <FileUp className="w-12 h-12 text-gray-400" />
        <div>
          <p className="text-lg font-medium text-gray-700">
            Drag and drop your PDFs here
          </p>
          <p className="text-sm text-gray-500">
            or click to select files
          </p>
        </div>
      </label>
    </div>
  );
}