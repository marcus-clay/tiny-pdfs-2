import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DropZoneOverlayProps {
  isVisible: boolean;
}

export function DropZoneOverlay({ isVisible }: DropZoneOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-blue-500/5 backdrop-blur-sm rounded-xl pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
}