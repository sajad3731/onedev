"use client";

import { useSettingsStore } from "@/store/settingsStore";
import {
  darkTheme,
  darkThemeRTL,
  lightTheme,
  lightThemeRTL,
} from "@/styles/theme";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useServerInsertedHTML } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface ThemeRegistryProps {
  children: React.ReactNode;
  params: { locale: "fa" | "en" };
}

// Create an Emotion cache instance
const createEmotionCache = () => {
  const cache = createCache({ key: "mui" });
  cache.compat = true; // for MUI SSR compatibility
  return cache;
};

export default function ThemeRegistry({
  children,
  params: { locale },
}: ThemeRegistryProps) {
  const [cache] = useState(createEmotionCache);
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

  const { themeMode, setThemeMode } = useSettingsStore();
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    setThemeMode(isDarkMode ? "dark" : "light");
  }, [isDarkMode, setThemeMode]);

  const currentTheme = useMemo(() => {
    const isRtl = locale === "fa";
    if (themeMode === "dark") {
      return isRtl ? darkThemeRTL : darkTheme;
    } else {
      return isRtl ? lightThemeRTL : lightTheme;
    }
  }, [locale, themeMode]);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
