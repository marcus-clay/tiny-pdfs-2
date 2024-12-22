import React from 'react';
import { motion } from 'framer-motion';
import { Minimize2, GitMerge, Scissors } from 'lucide-react';
import { MenuItem } from './MenuItem';
import { ConvertDropdown } from './ConvertDropdown';

export function Navigation() {
  return (
    <nav>
      <motion.div
        className="flex items-center gap-1"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <MenuItem
          icon={Minimize2}
          label="Compress"
          isActive={true}
        />
        <MenuItem
          icon={GitMerge}
          label="Merge"
        />
        <MenuItem
          icon={Scissors}
          label="Split"
        />
        <ConvertDropdown />
      </motion.div>
    </nav>
  );
}