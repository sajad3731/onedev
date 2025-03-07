/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // This enables class-based dark mode toggling
  content: [
    "./app/**/*.tsx", // Adjusted for Next.js 15 App Router
    "./components/**/*.tsx",
    "./src/**/*.tsx", // In case you use a 'src' directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
