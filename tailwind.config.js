/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      
      colors: {
        dark: '#000',
        darker: '#1F1F1F',
        light: '#fff'
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [require('tw-elements/dist/plugin'), ],
}

// function ({ addComponents }) {
//   addComponents({
//     '.container': {
//       maxWidth: '100%',
//       '@screen sm': {
//         maxWidth: '640px',
//       },
//       '@screen md': {
//         maxWidth: '768px',
//       },
//       '@screen lg': {
//         maxWidth: '1280px',
//       },
//       '@screen xl': {
//         maxWidth: '1400px',
//       },
//     }
//   })
// }