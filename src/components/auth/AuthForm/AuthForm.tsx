import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { Input } from '../../ui/Input';
import { AuthLayout } from '../AuthLayout';

export function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isSignUp) {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (!termsAccepted) {
        setError('You must accept the Terms of Service');
        return;
      }
    }

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <motion.h1 
            className="text-2xl font-bold text-dark"
          >
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </motion.h1>
        </motion.div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input
              id="email"
              type="email"
              label="Email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              autoComplete="email"
              autoFocus
            />

            <Input
              id="password"
              type="password"
              label="Password"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
            />

            {isSignUp && (
              <>
                <Input
                  id="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  icon={Lock}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  autoComplete="new-password"
                />

                <div className="flex items-start gap-3 mt-4">
                  <div className="flex-shrink-0 mt-1">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-button 
                        focus:ring-button/20"
                    />
                  </div>
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    By creating an account, you agree to our{' '}
                    <a href="#" className="text-button hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-button hover:underline">Privacy Policy</a>.
                    {' '}You confirm that you are at least 18 years old.
                  </label>
                </div>
              </>
            )}
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3 rounded-lg bg-red-50 border border-red-100"
              >
                <p className="text-sm text-red-600">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-button text-white py-3 px-6 rounded-xl
              hover:bg-button/90 font-medium shadow-lg shadow-button/20
              flex items-center justify-center gap-2 group
              focus:outline-none focus:ring-2 focus:ring-button/20 focus:ring-offset-2"
          >
            <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
              setPassword('');
              setConfirmPassword('');
              setTermsAccepted(false);
            }}
            className="w-full text-sm text-gray-400 hover:text-dark
              focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:ring-offset-2 rounded"
          >
            {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
          </motion.button>
        </form>
      </div>
    </AuthLayout>
  );
}