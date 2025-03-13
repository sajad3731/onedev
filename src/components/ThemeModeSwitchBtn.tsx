"use client";

import { useEffect, useState, useMemo } from "react";
import { useSettingsStore } from "@/store/settingsStore";
import { Button } from "@mui/material";
import { useLocale } from "next-intl";

export const ThemeModeSwitchBtn = () => {
  const { themeMode, setThemeMode } = useSettingsStore();
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = () => {
    setThemeMode(themeMode !== "light" ? "light" : "dark");
  };

  const btnText = useMemo(() => {
    if (locale === "fa") {
      return themeMode === "dark" ? "روشن" : "تیره";
    } else {
      return themeMode === "dark" ? "Light" : "Dark";
    }
  }, [locale, themeMode]);

  if (!mounted) {
    return null;
  }

  return <Button onClick={handleThemeChange}>{btnText}</Button>;
};
