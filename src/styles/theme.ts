import { enUS, faIR } from "@mui/material/locale"; // MUI locale packs for RTL/LTR if needed
import { createTheme, type ThemeOptions } from "@mui/material/styles";
import { tokens } from "./tokens";

const sharedValues: Omit<ThemeOptions, "components"> = {
  breakpoints: {
    values: tokens.breakpoints,
  },
  spacing: (factor: number) => tokens.spacing[factor] || factor * 8,
};

// ============================ EN THEME ============================ //
export const lightTheme = createTheme(
  {
    palette: {
      primary: {
        main: tokens.colors.primary.DEFAULT,
      },
      background: {
        default: tokens.colors.neutral[50],
      },
    },
    direction: "ltr",
    typography: { fontFamily: "var(--font-roboto)" },
    ...sharedValues,
  },
  enUS // apply English localizations (ltr)
);

export const darkTheme = createTheme(
  {
    palette: {
      mode: "dark",
      primary: {
        main: tokens.colors.primary.light, // for example
      },
      background: {
        default: tokens.colors.neutral[900],
      },
      text: {
        primary: "#fff",
      },
    },
    direction: "ltr",
    typography: { fontFamily: "var(--font-roboto)" },
    ...sharedValues,
  },
  enUS
);

// ============================ FA THEME ============================ //
export const lightThemeRTL = createTheme(
  {
    palette: {
      primary: {
        main: tokens.colors.primary.DEFAULT,
      },
      background: {
        default: tokens.colors.neutral[50],
      },
    },
    direction: "rtl",
    typography: { fontFamily: "var(--font-iransans)" },
    ...sharedValues,
  },
  faIR // apply Persian (Farsi) localizations (rtl)
);

export const darkThemeRTL = createTheme(
  {
    palette: {
      mode: "dark",
      primary: {
        main: tokens.colors.primary.light, // for example
      },
      background: {
        default: tokens.colors.neutral[900],
      },
      text: {
        primary: "#fff",
      },
    },
    direction: "rtl",
    typography: { fontFamily: "var(--font-iransans)" },
    ...sharedValues,
  },
  faIR
);
