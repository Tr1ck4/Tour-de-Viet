/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'light-green' : '#84A98C',
        'dark-green'  : '#335145',
        'bone-white'  : '#EBEBEB',
        'bright-yellow':'#F5B700',
      }
    },
  },
  plugins: [],
}