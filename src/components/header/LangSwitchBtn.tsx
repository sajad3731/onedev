"use client";

import { IconButton } from "@mui/material";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export const LangSwitchBtn = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = pathname.split("/")[1];

  const handleLanguageChange = () => {
    const newPathname = pathname.replace(
      `/${currentLocale}`,
      `/${locale === "en" ? "fa" : "en"}`
    );
    router.push(newPathname);
  };

  return (
    <IconButton
      size="small"
      color="inherit"
      className="w-[37px]"
      onClick={handleLanguageChange}
    >
      {locale === "en" ? "FA" : "EN"}
    </IconButton>
  );
};
