/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#1F6B3A',
        'brand-light': '#6FBF4A',
        'brand-yellow': '#F2C94C',
        'brand-white': '#FFFFFF',
      }
    },
  },
  plugins: [],
}