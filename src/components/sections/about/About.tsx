import { Divider, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { DownloadResumeBtn } from "./DownloadResumeBtn";
import { Skills } from "./Skills";

export const About: FC = () => {
  const t = useTranslations("About");

  return (
    <div className="flex flex-col gap-y-5">
      <Divider className="!my-10">
        <Typography variant="h4" className="!font-bold">
          {t("title")}
        </Typography>
      </Divider>

      <Typography className="text-justify !leading-[40px]">
        {t("description")}
      </Typography>

      <Skills />

      <Typography className="text-justify !leading-[40px]">
        {t("guiding-to-resume")}
      </Typography>

      <div className="flex flex-col sm:flex-row items-center gap-5 justify-center mt-6 mb-10">
        <DownloadResumeBtn />
      </div>
    </div>
  );
};
