import React from 'react';
import { motion } from 'framer-motion';
import { AuthLogo } from './Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto px-4 py-12"
    >
      <div className="mb-8 text-center">
        <AuthLogo />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-gray-600 font-medium"
        >
          Shrink Your PDFs, Save Space, Share Faster.
        </motion.p>
      </div>
      {children}
    </motion.div>
  );
}