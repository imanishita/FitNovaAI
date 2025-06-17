/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",            // include root HTML
    "./src/**/*.{js,ts,jsx,tsx}" // include all component files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00c853",      // you can define custom colors
        secondary: "#4ca1af",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
