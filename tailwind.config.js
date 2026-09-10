/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#ECEAE2',
        surface: '#F7F5EF',
        panel: '#FFFFFF',
        panelDark: '#141414',
        textDark: '#121212',
        mutedGray: '#666560',
        coffee: '#C87A4B',
        terracotta: '#D46A43',
        sage: '#4A6B5D',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
