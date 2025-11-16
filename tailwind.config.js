/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      colors: {
        beige: {
          50: '#fdfcfb',
          100: '#faf8f5',
          200: '#f5f1ea',
          300: '#ebe4d8',
          400: '#ddd3c3',
          500: '#cdbfab',
        },
        pastel: {
          pink: '#ffd6d6',
          peach: '#ffe8d6',
          cream: '#fff5e1',
        }
      },
    },
  },
  plugins: [],
}
