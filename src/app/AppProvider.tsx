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

interface ThemeRegistryProps {
  children: React.ReactNode;
  params: {
    locale: "fa" | "en";
    themeCookie: "light" | "dark";
  };
}

const createEmotionCache = () => {
  const cache = createCache({ key: "mui" });
  cache.compat = true;
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
  const [mounted, setMounted] = useState(false);
  const isRtl = locale === "fa";

  const cache = useMemo(() => {
    return isRtl ? createRtlEmotionCache() : createEmotionCache();
  }, [isRtl]);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    if (themeCookie === "dark") {
      return isRtl ? darkThemeRTL : darkTheme;
    } else {
      return isRtl ? lightThemeRTL : lightTheme;
    }
  }, [themeCookie, isRtl]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

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
