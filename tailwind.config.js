/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "dark-blue":"#192F48",
        "light-gray":"#707070",
        "dark-black":"#1D1A1A",
      },
      fontFamily:{
        lato:['Lato', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
