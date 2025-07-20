/** @type {import('tailwindcss').Config} */

console.log("Tailwind CSS configuration loaded");
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellowish: {
          100: "#f0e3c5",
          200: "#e0cda1",
          300: "#d1b77c",
          400: "#c1a158",
          500: "#ac935b",
          600: "#8a7547",
          700: "#685733",
          800: "#46391f",
          900: "#241b0b",
        },
        black: {
          100: "#d4d4d4",
          200: "#a9a9a9",
          300: "#7e7e7e",
          400: "#535353",
          500: "#282828",
          600: "#1f1f1f",
          700: "#1a1a1a",
          800: "#161616",
          900: "#141414",
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
