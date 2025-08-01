/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{tsx,ts,js,jsx}",
  ],
  theme: {
  extend: {
    colors: {
      primary: '#065f46',      // Emerald-800
      'primary-dark': '#064e3b',
      accent: '#14b8a6',        // Teal-500
    },
  },
},
darkMode: 'class',

  plugins: [],
}

