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
        success: "#52C41A",
        error: "#ED3833",
        "Neutral-Colors-Gray-150": "#E3EAEF",
        "Neutral-Colors-Gray-200": "#D8DFE6",
        "Neutral-Colors-Gray-500": "#88929C",
        "Neutral-Colors-Gray-950": "#24292F",
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
