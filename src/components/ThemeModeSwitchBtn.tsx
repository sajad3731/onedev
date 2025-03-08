"use client";

import { useSettingsStore } from "@/store/settingsStore";
import { Button } from "@mui/material";
import { useLocale } from "next-intl";
import { useMemo } from "react";

export const ThemeModeSwitchBtn = () => {
  const { themeMode, setThemeMode } = useSettingsStore();
  const locale = useLocale();

  const handleThemeChange = () => {
    setThemeMode(themeMode !== "light" ? "light" : "dark");
  };

  const btnText = useMemo(() => {
    if (locale === "fa") {
      if (themeMode === "dark") {
        return "روشن";
      } else {
        return "تیره";
      }
    } else {
      if (themeMode === "dark") {
        return "Light";
      } else {
        return "Dark";
      }
    }
  }, [locale, themeMode]);

  return <Button onClick={handleThemeChange}>{btnText}</Button>;
};
