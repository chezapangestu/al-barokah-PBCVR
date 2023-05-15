/** @type {import("tailwindcss").Config} */
module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        main: {
          50: '#F9F6F0',
          100: '#F5EFE5',
          200: '#EADCC8',
          300: '#E0CCAE',
          400: '#D6BC94',
          500: '#CBAA79',
          600: '#B98D4B',
          700: '#8C6936',
          800: '#5C4524',
          900: '#302413',
          950: '#161109',
        },
      },
    },
    fontFamily: {
      mushaf: 'Mushaf, sans-serif',
    },
  },
  plugins: [],
}
