import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Trash2 } from 'lucide-react';
import type { CompressedDocument, ClearHistoryState } from '../../types';
import { formatFileSize } from '../../utils/format';
import { formatDate } from '../../utils/date';
import { ClearFeedback } from './ClearFeedback';

interface DocumentHistoryProps {
  documents: CompressedDocument[];
  onDownload: (document: CompressedDocument) => void;
  onClear: () => void;
}

export function DocumentHistory({ documents, onDownload, onClear }: DocumentHistoryProps) {
  const [clearState, setClearState] = useState<ClearHistoryState>({ status: 'idle' });

  if (documents.length === 0 && clearState.status === 'idle') {
    return null;
  }

  const handleClear = async () => {
    const docsCount = documents.length;
    setClearState({ status: 'clearing' });
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onClear();
    setClearState({ status: 'completed' });
    
    setTimeout(() => {
      setClearState({ status: 'idle' });
    }, 2000);
  };

  return (
    <>
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Documents</h2>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-dark
              rounded-lg hover:bg-gray-50/50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">Clear History</span>
          </motion.button>
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200/50">
              <thead className="bg-gray-50/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Original Size
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Compressed Size
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Compression
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/30 divide-y divide-gray-200/50">
                {documents.map((doc, index) => (
                  <motion.tr
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "easeInOut",
                      duration: 0.5,
                      delay: index * 0.1
                    }}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="flex-shrink-0 h-5 w-5 text-primary" />
                        <span className="ml-2 text-sm text-gray-900 truncate max-w-xs">
                          {doc.originalName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatFileSize(doc.originalSize)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatFileSize(doc.compressedSize)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary/10 text-primary">
                        {doc.compressionLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(doc.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onDownload(doc)}
                        className="text-white bg-button hover:bg-button/90 p-2 rounded-full transition-colors"
                        title="Download"
                      >
                        <Download className="h-5 w-5" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {clearState.status !== 'idle' && (
          <ClearFeedback 
            state={clearState}
            documentsCount={documents.length}
          />
        )}
      </AnimatePresence>
    </>
  );
}