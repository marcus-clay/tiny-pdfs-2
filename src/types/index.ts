export type CompressionLevel = 'high' | 'medium' | 'low';

export interface FileWithPreview {
  file: File;
  id: string;
  preview?: string;
}

export interface UploadState {
  progress: number;
  status: 'idle' | 'uploading' | 'processing' | 'complete' | 'error';
  error?: string;
}

export interface CompressedDocument {
  id: string;
  originalName: string;
  compressedName: string;
  originalSize: number;
  compressedSize: number;
  compressionLevel: CompressionLevel;
  timestamp: Date;
  storage_path: string;
}

export interface ClearHistoryState {
  status: 'idle' | 'clearing' | 'completed';
}