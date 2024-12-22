/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F2604B',    // Red (for icons and badges)
        button: '#344FDC',     // Blue (for buttons)
        secondary: '#4B66FF',  // Lighter Blue
        accent: '#FFD76F',     // Yellow
        dark: '#121212',       // Dark grey
        gray: {
          400: '#A4A4A4',      // Mid grey
        }
      }
    },
  },
  plugins: [],
};