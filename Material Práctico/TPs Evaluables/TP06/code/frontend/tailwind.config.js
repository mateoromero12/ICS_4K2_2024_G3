/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'jade': {
          '50': '#CAF0F8',
          '100': '#CAF0F8',
          '200': '#90E0EF',
          '300': '#90E0EF',
          '400': '#00B4D8',
          '500': '#00B4D8',
          '600': '#0077B6',
          '700': '#0077B6',
          '800': '#03045E',
          '900': '#03045E',
          '950': '#03045E',
        },
      },
      screens: {
        'xs': '350px',   
        'sm': '480px',   
        'md': '768px',   
        'lg': '1024px',  
        'xl': '1366px',  
        '2xl': '1600px', 
        '3xl': '1920px',
      }
    },
  },
  plugins: [],
};
