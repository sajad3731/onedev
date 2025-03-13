import { createTheme } from "@mui/material/styles";
import { faIR, enUS } from "@mui/material/locale"; // MUI locale packs for RTL/LTR if needed
import { blue, grey, pink } from "@mui/material/colors";

// ============================ EN THEME ============================ //
export const lightTheme = createTheme(
  {
    cssVariables: true,
    palette: {
      mode: "light",
      primary: {
        main: blue[500],
      },
      background: {
        default: grey[50],
        paper: grey[100],
      },
      text: {
        primary: grey[900],
      },
    },
    direction: "ltr",
    typography: { fontFamily: "var(--font-roboto)" },
  },
  enUS // apply English localizations (ltr)
);

export const darkTheme = createTheme(
  {
    cssVariables: true,
    palette: {
      mode: "dark",
      primary: {
        main: pink[200],
      },
      background: {
        default: grey[900],
        paper: grey[800],
      },
      text: {
        primary: "#fff",
      },
    },
    direction: "ltr",
    typography: { fontFamily: "var(--font-roboto)" },
  },
  enUS
);

// ============================ FA THEME ============================ //
export const lightThemeRTL = createTheme(
  {
    cssVariables: true,
    palette: {
      mode: "light",
      primary: {
        main: blue[500],
      },
      background: {
        default: grey[50],
        paper: grey[100],
      },
      text: {
        primary: grey[900],
      },
    },
    direction: "rtl",
    typography: { fontFamily: "var(--font-iransans)" },
  },
  faIR // apply Persian (Farsi) localizations (rtl)
);

export const darkThemeRTL = createTheme(
  {
    cssVariables: true,
    palette: {
      mode: "dark",
      primary: {
        main: pink[200],
      },
      background: {
        default: grey[900],
        paper: grey[800],
      },
      text: {
        primary: "#fff",
      },
    },
    direction: "rtl",
    typography: { fontFamily: "var(--font-iransans)" },
  },
  faIR
);
