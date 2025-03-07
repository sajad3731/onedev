import { createTheme } from "@mui/material/styles";
import { faIR, enUS } from "@mui/material/locale"; // MUI locale packs for RTL/LTR if needed

// ============================ EN THEME ============================ //
export const lightTheme = createTheme(
  {
    cssVariables: true,
    palette: { mode: "light" },
    direction: "ltr",
    typography: { fontFamily: "var(--font-roboto)" },
  },
  enUS // apply English localizations (ltr)
);

export const darkTheme = createTheme(
  {
    cssVariables: true,
    palette: { mode: "dark" },
    direction: "ltr",
    typography: { fontFamily: "var(--font-roboto)" },
  },
  enUS
);

// ============================ FA THEME ============================ //
export const lightThemeRTL = createTheme(
  {
    cssVariables: true,
    palette: { mode: "light" },
    direction: "rtl",
    typography: { fontFamily: "var(--font-iransans)" },
  },
  faIR // apply Persian (Farsi) localizations (rtl)
);

export const darkThemeRTL = createTheme(
  {
    cssVariables: true,
    palette: { mode: "dark" },
    direction: "rtl",
    typography: { fontFamily: "var(--font-iransans)" },
  },
  faIR
);

// "use client";
// import createCache from "@emotion/cache";
// import { createTheme, Theme } from "@mui/material/styles";
// import rtlPlugin from "stylis-plugin-rtl";
// import { prefixer } from "stylis";

// const theme = (outerTheme: Theme) =>
//   createTheme({
//     typography: {
//       fontFamily: outerTheme.typography.fontFamily,
//     },
//     direction: outerTheme.direction,
//     palette: {
//       mode: outerTheme.palette.mode,
//     },
//   });

// export const cacheRtl = createCache({
//   key: "muirtl",
//   stylisPlugins: [prefixer, rtlPlugin],
// });

// export default theme;
