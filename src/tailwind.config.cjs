/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./views/**/*.{html,js,ejs}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
