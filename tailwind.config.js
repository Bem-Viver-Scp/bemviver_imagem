/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#0f172a', card: '#111827', soft: '#0b1220' },
      },
    },
  },
  plugins: [],
};
