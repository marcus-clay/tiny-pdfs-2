import { PDFCoClient } from './api/pdf-co-client';
import type { CompressionLevel } from '../types';
import { ValidationError } from '../utils/errors';

const COMPRESSION_SETTINGS: Record<CompressionLevel, { imageQuality: number; imageResolutionDpi: number }> = {
  high: { imageQuality: 60, imageResolutionDpi: 150 },
  medium: { imageQuality: 75, imageResolutionDpi: 200 },
  low: { imageQuality: 90, imageResolutionDpi: 300 }
};

export async function compressPDF(
  file: File,
  level: CompressionLevel,
  onProgress: (progress: number) => void
): Promise<Blob> {
  const client = new PDFCoClient();

  try {
    // Validate file
    if (!file.type || file.type.toLowerCase() !== 'application/pdf') {
      throw new ValidationError('Invalid file type. Please upload a PDF file.');
    }

    // Upload the file
    onProgress(20);
    const fileUrl = await client.uploadFile(file);
    console.log('File uploaded successfully:', { fileUrl });

    // Compress the file
    onProgress(50);
    const compressedUrl = await client.startCompression(fileUrl, COMPRESSION_SETTINGS[level]);
    console.log('File compressed successfully:', { compressedUrl });

    // Download the compressed file
    onProgress(80);
    const compressedFile = await client.downloadFile(compressedUrl);
    onProgress(100);

    return compressedFile;
  } catch (error) {
    console.error('PDF compression failed:', error);
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`PDF compression failed: ${message}`);
  }
}