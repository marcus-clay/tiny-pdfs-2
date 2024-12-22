import React from 'react';
import type { CompressionLevel } from '../types';

interface CompressionOptionsProps {
  level: CompressionLevel;
  onChange: (level: CompressionLevel) => void;
}

export function CompressionOptions({ level, onChange }: CompressionOptionsProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium text-gray-700">Compression Level</h3>
      <div className="flex gap-4">
        {(['high', 'medium', 'low'] as const).map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`px-4 py-2 rounded-lg capitalize ${
              level === option
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}