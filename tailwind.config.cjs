/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B6B',
          light: '#FF8E8E',
          dark: '#FF5252',
        },
        secondary: {
          DEFAULT: '#4ECDC4',
          light: '#6EDDD5',
          dark: '#2EBDB4',
        },
        accent: {
          DEFAULT: '#FFE66D',
          light: '#FFED8A',
          dark: '#FFE14A',
        },
      },
    },
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
} 