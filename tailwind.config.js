/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wp: {
          black: "#000000",
          gray: "#abb8c3",
          white: "#ffffff",
          pink: "#f78da7",
          red: "#cf2e2e",
          orange: "#ff6900",
          yellow: "#fcb900",
          "green-light": "#7bdcb5",
          green: "#00d084",
          "blue-light": "#8ed1fc",
          blue: "#0693e3",
          purple: "#9b51e0",
          primary: "#4BaF47",
        }
      }
    },
  },
  plugins: [],
}