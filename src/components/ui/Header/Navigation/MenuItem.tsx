import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function MenuItem({ icon: Icon, label, isActive = false, onClick }: MenuItemProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
        transition-colors duration-200
        ${isActive 
          ? 'text-dark' 
          : 'text-gray-400 hover:text-dark hover:bg-gray-50/50'
        }
      `}
    >
      <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : ''}`} />
      <span>{label}</span>
      {isActive && (
        <motion.div
          layoutId="active-indicator"
          className="absolute -bottom-1 left-4 right-4 h-0.5 bg-primary rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
}