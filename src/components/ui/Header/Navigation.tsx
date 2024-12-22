import React from 'react';
import { motion } from 'framer-motion';
import { Minimize2 } from 'lucide-react';

export function Navigation() {
  return (
    <nav>
      <motion.div
        className="bg-white/50 backdrop-blur-sm border border-white/20 rounded-lg p-1"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-md text-blue-700">
          <Minimize2 className="w-4 h-4" />
          <span className="text-sm font-medium">Compress</span>
        </button>
      </motion.div>
    </nav>
  );
}