"use client";

import { Button, Stack } from "@mui/material";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export const ThemeModeSwitchBtn = () => {
  const router = useRouter();
  const locale = useLocale();

  const handleThemeChange = (newTheme: "light" | "dark") => {
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
    router.refresh();
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
