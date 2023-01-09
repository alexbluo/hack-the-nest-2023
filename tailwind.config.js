const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./components/*.{ts,tsx}", "./pages/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["var(--font-libre-franklin)", ...fontFamily.sans],
      header: ["var(--font-hanken-grotesk)", ...fontFamily.sans],
    },
    colors: {
      "blue-light": "#61a7cf",
      "blue-mid": "#2386bf",
      "blue-dark": "#005274",
      orange: "#ffbd59",
      black: "#000000",
      grey: "#808080",
      white: "#ffffff"
    },
  },
  plugins: [],
};
