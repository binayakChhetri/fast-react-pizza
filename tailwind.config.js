/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // Here we will overwrite all the default customization of the tailwind
    fontFamily:{
      sans:'Roboto Mono, monospace'
    },

    // Here we can add our own custom styles along with the tailwind default customization
    extend: {
      fontSize:{
        huge:['80rem', { lineHeight: '1' }],
      },
      height: {
        screen:'100dvh'
      }
    },
  },
  plugins: [],
};
