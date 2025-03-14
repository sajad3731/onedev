// "use client";

// import { useEffect, useState, useMemo } from "react";
// import { Button } from "@mui/material";
// import { useLocale } from "next-intl";
// import { useTheme } from "next-themes";

// export const ThemeModeSwitchBtn = () => {
//   const { theme: themeMode, setTheme } = useTheme();
//   const locale = useLocale();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const handleThemeChange = () => {
//     setTheme(themeMode !== "light" ? "light" : "dark");
//   };

//   const btnText = useMemo(() => {
//     if (locale === "fa") {
//       return themeMode === "dark" ? "روشن" : "تیره";
//     } else {
//       return themeMode === "dark" ? "Light" : "Dark";
//     }
//   }, [locale, themeMode]);

//   if (!mounted) {
//     return null;
//   }

//   return <Button onClick={handleThemeChange}>{btnText}</Button>;
// };

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
    <Stack>
      {btnText.map(({ label, value }) => (
        <Button
          key={label + value}
          onClick={() => handleThemeChange(value as "light" | "dark")}
        >
          {label}
        </Button>
      ))}
    </Stack>
  );
};
