import React from 'react';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';

interface SignOutButtonProps {
  onSignOut: () => void;
}

export function SignOutButton({ onSignOut }: SignOutButtonProps) {
  return (
    <motion.button
      onClick={onSignOut}
      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 rounded-lg
        bg-button hover:bg-button/90 text-white transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <LogOut className="w-4 h-4" />
      <span className="text-sm font-medium">Sign Out</span>
    </motion.button>
  );
}