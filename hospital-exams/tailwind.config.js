/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0f172a', // slate-900 base
          card: '#111827', // gray-900
          soft: '#0b1220',
        },
      },
    },
  },
  plugins: [],
};
