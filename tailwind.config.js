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
        "Neutral-Colors-Gray-50": "#F9FAFB",
        "Neutral-Colors-Gray-100": "#F3F4F6",
        "Neutral-Colors-Gray-200": "#D8DFE6",
        "Neutral-Colors-Gray-300": "#C1CAD4",
        "Neutral-Colors-Gray-400": "#A3ADB8",
        "Neutral-Colors-Gray-600": "#707A84",
        "Neutral-Colors-Gray-700": "#545B63",
        "Neutral-Colors-Gray-800": "#3C434A",
        "Neutral-Colors-Gray-900": "#2A2E33",

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
