import { supabase } from '../lib/supabase';
import type { CompressionLevel, CompressedDocument } from '../types';

export async function uploadCompressedFile(
  file: File,
  compressionLevel: CompressionLevel,
  userId: string
): Promise<string> {
  const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const timestamp = Date.now();
  const storagePath = `${userId}/compressed/${timestamp}_${cleanFileName}`;
  
  const { error: uploadError } = await supabase.storage
    .from('pdfs')
    .upload(storagePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    console.error('Storage upload error:', uploadError);
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  return storagePath;
}

export async function saveDocumentMetadata({
  userId,
  originalName,
  compressedName,
  originalSize,
  compressedSize,
  compressionLevel,
  storagePath,
}: {
  userId: string;
  originalName: string;
  compressedName: string;
  originalSize: number;
  compressedSize: number;
  compressionLevel: CompressionLevel;
  storagePath: string;
}): Promise<CompressedDocument> {
  const { data, error } = await supabase
    .from('compressed_documents')
    .insert({
      user_id: userId,
      original_name: originalName,
      compressed_name: compressedName,
      original_size: originalSize,
      compressed_size: compressedSize,
      compression_level: compressionLevel,
      storage_path: storagePath,
    })
    .select()
    .single();

  if (error) {
    console.error('Database insert error:', error);
    throw new Error(`Failed to save document metadata: ${error.message}`);
  }

  return {
    id: data.id,
    originalName: data.original_name,
    compressedName: data.compressed_name,
    originalSize: Number(data.original_size),
    compressedSize: Number(data.compressed_size),
    compressionLevel: data.compression_level,
    timestamp: new Date(data.created_at),
    storage_path: data.storage_path
  };
}

export async function getCompressedDocuments(userId: string): Promise<CompressedDocument[]> {
  const { data, error } = await supabase
    .from('compressed_documents')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Database query error:', error);
    throw new Error(`Failed to fetch documents: ${error.message}`);
  }

  return data.map(record => ({
    id: record.id,
    originalName: record.original_name,
    compressedName: record.compressed_name,
    originalSize: Number(record.original_size),
    compressedSize: Number(record.compressed_size),
    compressionLevel: record.compression_level,
    timestamp: new Date(record.created_at),
    storage_path: record.storage_path
  }));
}

export async function getDownloadUrl(storagePath: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from('pdfs')
    .createSignedUrl(storagePath, 3600);

  if (error || !data?.signedUrl) {
    console.error('Signed URL generation error:', error);
    throw new Error('Failed to generate download URL');
  }

  return data.signedUrl;
}