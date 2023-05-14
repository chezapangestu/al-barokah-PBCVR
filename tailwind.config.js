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
          50: '#FBF8F4',
          100: '#F6F1E9',
          200: '#EEE4D3',
          300: '#E5D6BD',
          400: '#DCC9A7',
          500: '#D3BA90',
          600: '#BF9C5E',
          700: '#99773D',
          800: '#665029',
          900: '#332814',
          950: '#1A140A',
        },
      },
    },
    fontFamily: {
      mushaf: 'Mushaf, sans-serif',
    },
  },
  plugins: [],
}
