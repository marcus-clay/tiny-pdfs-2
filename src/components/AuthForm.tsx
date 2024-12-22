{/* Only showing the relevant button part */}
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