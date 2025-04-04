interface Tokens {
  colors: { primary: Record<string, string>; neutral: Record<number, string> };
  spacing: Record<number | `${number}.${number}`, string>;
  breakpoints: Record<"xs" | "sm" | "md" | "lg" | "xl", number>;
}

export const tokens: Tokens = {
  colors: {
    primary: {
      DEFAULT: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    neutral: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      800: "#2d2d2d",
      900: "#1e1e1e",
    },
  },
  spacing: {
    0: "0px",
    0.5: "4px",
    1: "8px",
    1.5: "12px",
    2: "16px",
    2.5: "20px",
    3: "24px",
    3.5: "28px",
    4: "32px",
    5: "40px",
    6: "48px",
    7: "56px",
    8: "64px",
    9: "72px",
    10: "80px",
  },
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};
