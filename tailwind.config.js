/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        savate: ['Savate', 'sans-serif']
      },
       keyframes: {
        'slide-fade-in': {
          '0%': { opacity: 0, transform: 'translateX(-50px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      },
      animation: {
        'slide-fade-in': 'slide-fade-in 1s ease-out forwards',
      },
    },
  },
  plugins: [],
}
