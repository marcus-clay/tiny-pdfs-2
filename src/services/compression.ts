import { compressPDF as pdfCoCompress } from './pdf-co';
import { uploadCompressedFile, saveDocumentMetadata } from './documents';
import type { CompressionLevel, CompressedDocument } from '../types';

export async function compressPDF(
  file: File,
  level: CompressionLevel,
  userId: string,
  onProgress: (progress: number) => void
): Promise<CompressedDocument> {
  try {
    // Compress the PDF using PDF.co
    const compressedBlob = await pdfCoCompress(file, level, onProgress);
    const compressedFile = new File([compressedBlob], `compressed_${file.name}`, {
      type: 'application/pdf'
    });

    // Upload to Supabase Storage
    const storagePath = await uploadCompressedFile(compressedFile, level, userId);

    // Save metadata to Supabase Database
    const doc = await saveDocumentMetadata({
      userId,
      originalName: file.name,
      compressedName: compressedFile.name,
      originalSize: file.size,
      compressedSize: compressedFile.size,
      compressionLevel: level,
      storagePath,
    });

    return doc;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Compression service error: ${message}`);
  }
}