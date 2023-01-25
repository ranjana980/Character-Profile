/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    screens: {
      // mobile
      'xs': '320px',
      // LandScape
      'sm': '640px',
      // tablets
      'md': '768px',
      // Desktop
      'lg': '1024px',
      // large dekstop
      'xl': '1280px',
    },
  },
  plugins: [],
}
