/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050a05',
        void: '#0a0f0a',
        card: '#0f1a0f',
        neon: '#39ff14',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Tamil', 'sans-serif'],
        tamil: ['Noto Sans Tamil', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
