/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Verdana', 'sans-serif'], // Add Verdana to the sans family
      },
      colors: {
        'clr-beige': '#F9EFDB',
        'clr-dark-beige': '#EBD9B4',
        'clr-green': '#9DBC98',
        'clr-dark-green': '#638889',
        'clr-mid-green' : '#87a383'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

