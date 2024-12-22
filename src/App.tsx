import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './hooks/useAuth';
import { AuthForm } from './components/auth/AuthForm';
import { PDFCompressor } from './components/PDFCompressor';
import { LoadingSpinner } from './components/LoadingSpinner';

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
    >
      {user ? <PDFCompressor userId={user.id} /> : <AuthForm />}
    </motion.div>
  );
}