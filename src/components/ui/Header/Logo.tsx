import React from 'react';
import { motion } from 'framer-motion';
import { FileMinusIcon } from 'lucide-react';

interface LogoProps {
  onClick?: () => void;
}

export function Logo({ onClick }: LogoProps) {
  return (
    <motion.button 
      className="flex items-center gap-2 focus:outline-none"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="p-2 bg-[#F2604B] rounded-xl">
        <FileMinusIcon className="w-6 h-6 text-white" />
      </div>
      <span className="text-xl font-bold text-dark">
        TinyPDFs
      </span>
    </motion.button>
  );
}