/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", ],
  theme: {
      extend: {
        colors: {
          'gflblue': '#0d2451',
        },
      },
  },
  plugins: [],
}
