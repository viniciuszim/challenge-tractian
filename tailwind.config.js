/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#17192D",
        blue: {
          500: "#2188FF",
          900: "#023B78",
        },
      },
    },
  },
  plugins: [],
};
