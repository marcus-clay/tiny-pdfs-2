import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon: Icon, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label 
          htmlFor={props.id} 
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
          )}
          <input
            ref={ref}
            {...props}
            className={`
              w-full px-4 py-3 ${Icon ? 'pl-12' : ''}
              bg-white/50 backdrop-blur-sm
              border border-gray-200
              rounded-xl
              text-gray-900 text-base
              placeholder:text-gray-400
              transition-all duration-200
              hover:border-gray-300
              focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : ''}
              ${className}
            `}
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500 mt-1"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';