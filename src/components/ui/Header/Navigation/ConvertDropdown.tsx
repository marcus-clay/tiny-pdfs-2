import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, FileImage, FileText, FileSpreadsheet, 
  FilePresentation, FileCode, File
} from 'lucide-react';

const CONVERT_OPTIONS = {
  'Convert to PDF': [
    { icon: FileImage, label: 'JPG to PDF' },
    { icon: FileText, label: 'WORD to PDF' },
    { icon: FilePresentation, label: 'POWERPOINT to PDF' },
    { icon: FileSpreadsheet, label: 'EXCEL to PDF' },
    { icon: FileCode, label: 'HTML to PDF' },
  ],
  'Convert from PDF': [
    { icon: FileImage, label: 'PDF to JPG' },
    { icon: FileText, label: 'PDF to WORD' },
    { icon: FilePresentation, label: 'PDF to POWERPOINT' },
    { icon: FileSpreadsheet, label: 'PDF to EXCEL' },
    { icon: File, label: 'PDF to PDF/A' },
  ],
};

export function ConvertDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
          text-gray-400 hover:text-dark hover:bg-gray-50/50"
      >
        <File className="w-4 h-4" />
        <span>Convert</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full right-0 mt-2 w-[600px] p-6 bg-white rounded-xl
                shadow-xl border border-gray-100 grid grid-cols-2 gap-6 z-40"
            >
              {Object.entries(CONVERT_OPTIONS).map(([title, items]) => (
                <div key={title}>
                  <h3 className="font-medium text-dark mb-3">{title}</h3>
                  <div className="space-y-1">
                    {items.map(({ icon: Icon, label }) => (
                      <button
                        key={label}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg
                          text-sm text-gray-400 hover:text-dark hover:bg-gray-50
                          transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}