import React from 'react';
import { motion } from 'framer-motion';

export function DocumentThumbnail() {
  return (
    <motion.div 
      className="relative w-12 h-16 bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      {/* Paper texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
      
      {/* Fake text lines */}
      <div className="absolute inset-0 p-2 flex flex-col gap-1">
        <div className="h-1 w-8 bg-gray-200 rounded" />
        <div className="h-1 w-6 bg-gray-200 rounded" />
        <div className="h-1 w-7 bg-gray-200 rounded" />
      </div>

      {/* Page fold */}
      <div className="absolute top-0 right-0 w-4 h-4">
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[16px] border-r-[16px] border-t-gray-200 border-r-white" />
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[14px] border-r-[14px] border-t-white border-r-gray-100" />
      </div>
    </motion.div>
  );
}