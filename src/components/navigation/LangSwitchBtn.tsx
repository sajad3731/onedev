"use client";

import { IconButton } from "@mui/material";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

export const LangSwitchBtn: FC = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = pathname.split("/")[1];
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll state for styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 250;
      setIsScrolled(scrollPosition > scrollThreshold);
    };

    handleScroll(); // Initial call
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      className="w-[37px]"
      onClick={handleLanguageChange}
      sx={{
        transition: "all 0.3s ease-in-out",
        fontSize: isScrolled ? 18 : 20,
      }}
    >
      {locale === "en" ? "FA" : "EN"}
    </IconButton>
  );
};
