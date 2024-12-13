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
        "Neutral-Colors-Gray-200": "#D8DFE6",
        "Neutral-Colors-White": "#FFFFFF",
        "Shapes-Border-card": "#D8DFE6",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
