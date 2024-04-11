/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      tiny: '.5rem',
      xs: '.75rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    extend: {
      colors: {
        primary: {
          base: 'rgb(17 24 39)',
          hover: 'rgb(31 41 55)',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      scale: {
        101: '1.01',
        102: '1.02',
      },
      boxShadow: {
        ds1: '10px 4px 20px rgba(0, 0, 0, 0.25)',
        ds2: '0px 0px 20px rgba(155, 155, 155, 0.2)',
      },
      height: {},
    },
  },
  plugins: [require('flowbite/plugin')],
};
