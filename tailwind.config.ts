import { tokens } from "@/styles/tokens";

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: tokens.colors.primary.DEFAULT,
          light: tokens.colors.primary.light,
          dark: tokens.colors.primary.dark,
        },
        neutral: tokens.colors.neutral,
      },
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
