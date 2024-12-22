import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Battery, BatteryLow } from 'lucide-react';
import type { CompressionLevel } from '../../types';

interface CompressionOptionsProps {
  level: CompressionLevel;
  onChange: (level: CompressionLevel) => void;
}

const COMPRESSION_OPTIONS = [
  { value: 'high' as const, label: 'High', icon: Zap, color: 'text-primary' },
  { value: 'medium' as const, label: 'Medium', icon: Battery, color: 'text-secondary' },
  { value: 'low' as const, label: 'Low', icon: BatteryLow, color: 'text-gray-400' }
] as const;

export function CompressionOptions({ level, onChange }: CompressionOptionsProps) {
  return (
    <div className="flex gap-2">
      {COMPRESSION_OPTIONS.map(({ value, label, icon: Icon, color }) => (
        <motion.button
          key={value}
          onClick={() => onChange(value)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg text-sm
            ${level === value 
              ? 'bg-white shadow-sm border border-gray-100' 
              : 'hover:bg-white/50'
            }
          `}
        >
          <Icon className={`w-4 h-4 ${color}`} />
          <span className={level === value ? 'text-dark' : 'text-gray-400'}>
            {label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}