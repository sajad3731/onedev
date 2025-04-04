import { tokens } from "@/styles/tokens";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // This enables class-based dark mode toggling
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    preflight: false, // Disable Tailwind base styles (use MUI CssBaseline instead)&#8203;:contentReference[oaicite:14]{index=14}
  },
  theme: {
    extend: {
      spacing: tokens.spacing,
    },
    screens: Object.fromEntries(
      Object.entries(tokens.breakpoints).map(([key, value]) => [
        key,
        `${value}px`,
      ])
    ),
  },
  plugins: [],
};
