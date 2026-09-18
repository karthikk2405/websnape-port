/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0C',
        surface: '#111114',
        panel: '#16161A',
        panelDark: '#050505',
        textDark: '#F0F2F5', // Reusing the name for backward compatibility but making it light for dark mode
        mutedGray: '#8A8D93',
        primary: '#00F0FF',
        secondary: '#0044FF',
        silver: '#A9B1BD',
        gold: '#D4AF37',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
