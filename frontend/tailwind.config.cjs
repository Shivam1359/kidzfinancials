const colors = require('tailwindcss/colors'); // Use require for CJS

/** @type {import('tailwindcss').Config} */
module.exports = { // Use module.exports
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          // Playful Primary Color: Teal
          primary: colors.teal,
          // Playful Secondary Color: Amber
          secondary: colors.amber,
          // Keep existing neutrals for text, backgrounds etc.
          neutral: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
          },
        },
        fontFamily: {
          // Use Poppins as the primary font
          sans: ['Poppins', 'Outfit', 'system-ui', 'sans-serif'],
          // Keep Outfit as an option if needed, or remove
          outfit: ['Outfit', 'sans-serif']
        },
        boxShadow: {
          'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.04)', // Slightly softer shadow
          'hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.08)', // Slightly adjusted hover
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-in-out',
          'slide-up': 'slideUp 0.5s ease-out',
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'pop': 'pop 0.3s ease-out', // Add a pop animation
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          pop: { // Keyframes for the pop animation
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' },
            '100%': { transform: 'scale(1)' },
          },
        },
      },
    },
    plugins: [],
  }; // End module.exports 