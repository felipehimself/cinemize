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
        lightDark: '#3b3b3b',
        darker: '#1F1F1F',
        light: '#fff',
        lightWhite: '#fffcfc',
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
      backgroundImage: {
        'dark-pattern': "linear-gradient(to bottom, #000 0%, #000 50%, #3b3b3b 50%, #3b3b3b 100%)",
        'light-pattern': "linear-gradient(to bottom, #fff 0%, #fff 50%, #fffcfc 50%, #fffcfc 100%)"

      }
    },
  },
  plugins: [require('tw-elements/dist/plugin'),function changeContainerWidth ({ addComponents }) {
    addComponents({
      '.container': {
        maxWidth: '100%',
        '@screen sm': {
          maxWidth: '640px',
        },
        '@screen md': {
          maxWidth: '768px',
        },
        '@screen lg': {
          maxWidth: '1100px',
        },
      }
    })
  } ],
}

// function changeContainerWidth ({ addComponents }) {
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