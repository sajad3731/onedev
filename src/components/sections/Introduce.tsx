"use client";

import { Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC } from "react";

export const Introduce: FC = () => {
  const t = useTranslations("Introduce");

  const handleClick = () => {
    if (typeof window === "undefined") return;
    const targetSection = document.getElementById("about");

    if (targetSection) {
      // Get header height based on viewport
      const headerHeight = window.innerWidth <= 600 ? 56 : 64;

      const sectionTop = targetSection.offsetTop;
      const offsetTop = sectionTop - headerHeight;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="px-5 flex flex-col gap-y-5 justify-center items-center h-full w-full">
      <Typography variant="h4" className="text-center">
        {t("welcome")}
      </Typography>
      <Typography variant="h5" className="text-center">
        {t("my-name")}
      </Typography>
      <Typography variant="h6" className="text-center">
        {t("carrie")}
      </Typography>
      <Button onClick={handleClick}>{t("know-more")}</Button>
    </div>
  );
};
