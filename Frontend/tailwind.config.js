/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': 'hsla(0, 0%, 100%, 0.55)',  // Couleur de fond semi-transparente
        'custom-teal': '#008080',               // Couleur teal personnalisée
        'custom-black': '#000000',              // Couleur noire personnalisée
      },
    },
  },
  plugins: [],
}
