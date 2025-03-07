"use client";
import * as React from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "@/styles/theme";

interface Props {
  children: React.ReactNode;
}

// Create an Emotion cache instance
const createEmotionCache = () => {
  const cache = createCache({ key: "mui" });
  cache.compat = true; // for MUI SSR compatibility
  return cache;
};

export default function ThemeRegistry({ children }: Props) {
  const [cache] = React.useState(createEmotionCache);
  // Inject styles first in the <head> during SSR
  useServerInsertedHTML(() => {
    const styles = cache.inserted;
    if (!styles) return null;
    let css = "";
    Object.keys(styles).forEach((name) => {
      css += styles[name];
    });
    return (
      <style
        data-emotion={`${cache.key} ${Object.keys(styles).join(" ")}`}
        dangerouslySetInnerHTML={{ __html: css }}
      />
    );
  });

  // Determine current theme from Zustand store or system (we will connect this soon)
  // For now, default to lightTheme as a placeholder; we'll dynamically choose later
  const currentTheme = lightTheme;

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}
