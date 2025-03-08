"use client";

import { Button, Stack } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

const locales = ["en", "fa"];

export const LangSwitchBtn = () => {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = pathname.split("/")[1];

  const handleLanguageChange = (locale: string) => {
    const newPathname = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPathname);
  };

  return (
    <Stack>
      {locales.map((locale) => (
        <Button key={locale} onClick={() => handleLanguageChange(locale)}>
          {locale === "en" ? "English" : "فارسی"}
        </Button>
      ))}
    </Stack>
  );
};
