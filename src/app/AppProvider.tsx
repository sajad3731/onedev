"use client";

import {
  darkTheme,
  darkThemeRTL,
  lightTheme,
  lightThemeRTL,
} from "@/styles/theme";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "next-themes";
import { useServerInsertedHTML } from "next/navigation";
import { FC, useMemo, useState } from "react";

import "@/styles/globals.css";

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

export const AppProvider: FC<ThemeRegistryProps> = ({
  children,
  params: { locale },
}) => {
  const { theme: themeMode } = useTheme();

  // console.log({ themeMode });

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

  const currentTheme = useMemo(() => {
    const isRtl = locale === "fa";
    if (themeMode === "dark") {
      return isRtl ? darkThemeRTL : darkTheme;
    } else {
      return isRtl ? lightThemeRTL : lightTheme;
    }
  }, [locale, themeMode]);

  console.log({ currentTheme });

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={currentTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </AppRouterCacheProvider>
  );
};
