/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize:{
        'xss' : '9px'
      },
      borderRadius: {
        '4xl': '2rem',          // --border-radius
        'm-4xl': '1rem',          // --card-border-radius
      },
      width:{
        '30' : '30vw'
      },
      height:{
        '102' : '40rem'
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none',     /* Firefox */
          '&::-webkit-scrollbar': {
            display: 'none'              /* Chrome, Safari */
          }
        }
      });
    }
  ],
}

