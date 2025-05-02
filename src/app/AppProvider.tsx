"use client";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { FC, useEffect, useMemo, useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import {
  lightTheme,
  lightThemeRTL,
  darkTheme,
  darkThemeRTL,
} from "@/styles/theme";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import "@/styles/globals.css";

// 1) Add "themeCookie" to our type so we know which theme to pick
interface ThemeRegistryProps {
  children: React.ReactNode;
  params: {
    locale: "fa" | "en";
    themeCookie: "light" | "dark";
  };
}

// Create an Emotion cache instance
const createEmotionCache = () => {
  const cache = createCache({ key: "mui" });
  cache.compat = true; // For MUI SSR compatibility
  return cache;
};

const createRtlEmotionCache = () => {
  const cache = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  cache.compat = true;
  return cache;
};

export const AppProvider: FC<ThemeRegistryProps> = ({ children, params }) => {
  const { locale, themeCookie } = params;

  const isRtl = locale === "fa";

  const [cache, setCache] = useState(
    isRtl ? createRtlEmotionCache : createEmotionCache
  );

  useEffect(() => {
    if (!isRtl) return;
    setCache(isRtl ? createRtlEmotionCache : createEmotionCache);
  }, [isRtl]);

  // Inject styles in SSR
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

  // 2) Compute the final MUI theme
  const currentTheme = useMemo(() => {
    const isRtl = locale === "fa";
    if (themeCookie === "dark") {
      return isRtl ? darkThemeRTL : darkTheme;
    } else {
      return isRtl ? lightThemeRTL : lightTheme;
    }
  }, [locale, themeCookie]);

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
