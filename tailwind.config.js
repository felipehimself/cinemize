/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}"
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

      }, keyframes: {
        shake: {
          '0%': { marginLeft: '0rem' },
          '25%': { marginLeft: '2px' },
          '75%' : { marginLeft: '-2px'},
          '100%' : { marginLeft: '0rem'}
          },
          spin: {
            "0%": {transform: 'rotate(0deg)'   },
            "100%": {transform: 'rotate(360deg)'}
          },
        },
        animation: {
          shake: 'shake 0.2s ease-in-out 0s 2',
          spin: 'spin 2s linear infinite',

        }
      
      }
    },
  
  plugins: [function changeContainerWidth ({ addComponents }) {
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
          // 1100px
          maxWidth: '900px',
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