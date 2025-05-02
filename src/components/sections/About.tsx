import { Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC } from "react";

export const About: FC = () => {
  const t = useTranslations("About");

  return (
    <div className="flex flex-col gap-y-5">
      <Typography>{t("description")}</Typography>
      <Typography>{t("guiding-to-resume")}</Typography>
      <div className="flex flex-row items-center gap-5 justify-center">
        <Button
          variant="outlined"
          className="w-[170px]"
          LinkComponent="a"
          href="www.google.com"
        >
          {t("jobinja-link")}
        </Button>
        <Button variant="contained" className="w-[170px]">
          {t("download-resume")}
        </Button>
        <Button
          variant="outlined"
          className="w-[170px]"
          LinkComponent="a"
          href="www.google.com"
        >
          {t("jobvision-link")}
        </Button>
      </div>
    </div>
  );
};
