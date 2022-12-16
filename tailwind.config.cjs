/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2e3235",
        secondary: "#464a4d",
      },
      fontFamily: {
        sans: ["CascadiaMono", "sans-serif"],
      },
    },
  },
  plugins: [],
};
