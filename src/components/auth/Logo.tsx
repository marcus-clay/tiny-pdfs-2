import React from 'react';
import { motion } from 'framer-motion';
import { FileMinusIcon } from 'lucide-react';

export function AuthLogo() {
  return (
    <motion.div 
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="p-3 bg-[#F2604B] rounded-xl">
        <FileMinusIcon className="w-8 h-8 text-white" />
      </div>
      <span className="text-2xl font-bold text-dark">
        TinyPDFs
      </span>
    </motion.div>
  );
}