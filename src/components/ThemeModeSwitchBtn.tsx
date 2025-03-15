"use client";

import { useEffect, useState, useMemo } from "react";
import { Button, Stack } from "@mui/material";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";

export const ThemeModeSwitchBtn = () => {
  const { setTheme } = useTheme();
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (newValue: "light" | "dark") => {
    setTheme(newValue);
  };

  const btnText = useMemo(() => {
    if (locale === "fa") {
      return [
        { label: "روشن", value: "light" },
        { label: "تیره", value: "dark" },
      ];
    } else {
      return [
        { label: "light", value: "light" },
        { label: "dark", value: "dark" },
      ];
    }
  }, [locale]);

  if (!mounted) {
    return null;
  }

  return (
    <Stack className="gap-y-1">
      {btnText.map(({ label, value }) => (
        <Button
          variant="outlined"
          key={label + value}
          onClick={() => handleThemeChange(value as "light" | "dark")}
        >
          {label}
        </Button>
      ))}
    </Stack>
  );
};
