/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', 
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00c853',     // green accent
        secondary: '#4ca1af',   // blue-gray accent
        'glass': 'rgba(255, 255, 255, 0.1)',
        'glass-dark': 'rgba(0, 0, 0, 0.2)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      blur: {
        128: '128px', 
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px)' },
          '33%': { transform: 'translate(30px, -50px)' },
          '66%': { transform: 'translate(-20px, 20px)' },
        },
      },
      animation: {
        blob: 'blob 7s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};
