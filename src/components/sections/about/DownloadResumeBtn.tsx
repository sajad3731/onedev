"use client";

import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC } from "react";

export const DownloadResumeBtn: FC = () => {
  const t = useTranslations("About");

  const handleDownload = () => {
    // Creating a link to the PDF file in the public directory
    const link = document.createElement("a");
    link.href = "/سجاد مهدیان.pdf";
    link.setAttribute("download", "سجاد مهدیان.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button variant="contained" className="w-[170px]" onClick={handleDownload}>
      {t("download-resume")}
    </Button>
  );
};
