import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './ui/Header';
import { DropZone } from './DropZone';
import { UploadZone } from './DropZone/UploadZone';
import { DocumentHistory } from './DocumentHistory';
import { compressPDF } from '../services/compression';
import { getCompressedDocuments, getDownloadUrl } from '../services/documents';
import { downloadFile, downloadMultipleFiles } from '../utils/download';
import { useAuth } from '../hooks/useAuth';
import type { CompressionLevel, CompressedDocument, FileWithPreview, UploadState } from '../types';

interface PDFCompressorProps {
  userId: string;
}

export function PDFCompressor({ userId }: PDFCompressorProps) {
  const { signOut } = useAuth();
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('medium');
  const [uploadState, setUploadState] = useState<UploadState>({
    progress: 0,
    status: 'idle'
  });
  const [documents, setDocuments] = useState<CompressedDocument[]>([]);
  const [showUploadZone, setShowUploadZone] = useState(false);
  const [recentlyCompressed, setRecentlyCompressed] = useState<CompressedDocument[]>([]);

  const loadDocuments = useCallback(async () => {
    try {
      const docs = await getCompressedDocuments(userId);
      setDocuments(docs);
    } catch (error) {
      console.error('Failed to load documents:', error);
    }
  }, [userId]);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  const handleFilesSelect = useCallback((newFiles: FileWithPreview[]) => {
    setFiles(newFiles);
    setShowUploadZone(true);
  }, []);

  const handleCompress = useCallback(async () => {
    if (files.length === 0) return;

    setUploadState({ progress: 0, status: 'uploading' });
    setRecentlyCompressed([]);

    try {
      const compressedDocs: CompressedDocument[] = [];

      for (const fileWrapper of files) {
        const doc = await compressPDF(
          fileWrapper.file,
          compressionLevel,
          userId,
          (progress) => {
            setUploadState(state => ({
              ...state,
              progress: progress / files.length + (files.indexOf(fileWrapper) * (100 / files.length))
            }));
          }
        );
        compressedDocs.push(doc);
      }

      setRecentlyCompressed(compressedDocs);
      await loadDocuments();

      setUploadState({
        progress: 100,
        status: 'complete'
      });
    } catch (error) {
      setUploadState({
        progress: 0,
        status: 'error',
        error: error instanceof Error ? error.message : 'Failed to compress PDFs'
      });
    }
  }, [files, compressionLevel, userId, loadDocuments]);

  const handleDownloadCompressed = useCallback(async () => {
    if (recentlyCompressed.length === 0) return;

    try {
      if (recentlyCompressed.length === 1) {
        const url = await getDownloadUrl(recentlyCompressed[0].storage_path);
        await downloadFile(url, recentlyCompressed[0].compressedName);
      } else {
        const downloadUrls = await Promise.all(
          recentlyCompressed.map(async (doc) => ({
            url: await getDownloadUrl(doc.storage_path),
            filename: doc.compressedName
          }))
        );
        await downloadMultipleFiles(downloadUrls);
      }
    } catch (error) {
      console.error('Failed to download compressed files:', error);
    }
  }, [recentlyCompressed]);

  const handleDownloadSingle = useCallback(async (doc: CompressedDocument) => {
    try {
      const url = await getDownloadUrl(doc.storage_path);
      await downloadFile(url, doc.compressedName);
    } catch (error) {
      console.error('Failed to download document:', error);
    }
  }, []);

  const handleClearHistory = useCallback(() => {
    setDocuments([]);
  }, []);

  const resetState = useCallback(() => {
    setFiles([]);
    setUploadState({ progress: 0, status: 'idle' });
    setShowUploadZone(false);
    setRecentlyCompressed([]);
  }, []);

  return (
    <>
      <Header onSignOut={signOut} onLogoClick={resetState} />
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto px-4 py-8"
      >
        <AnimatePresence mode="wait">
          {!showUploadZone ? (
            <DropZone 
              key="dropzone"
              onFilesSelect={handleFilesSelect}
              className="mb-8"
            />
          ) : (
            <UploadZone
              key="uploadzone"
              files={files}
              compressionLevel={compressionLevel}
              onCompressionChange={setCompressionLevel}
              uploadState={uploadState}
              onCompress={handleCompress}
              onCancel={resetState}
              onDownload={handleDownloadCompressed}
              onCompressMore={resetState}
            />
          )}
        </AnimatePresence>

        <DocumentHistory 
          documents={documents}
          onDownload={handleDownloadSingle}
          onClear={handleClearHistory}
        />
      </motion.main>
    </>
  );
}