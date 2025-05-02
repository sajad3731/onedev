import { Divider, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { DownloadResumeBtn } from "./DownloadResumeBtn";

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
      <Typography className="text-justify !leading-[40px]">
        {t("guiding-to-resume")}
      </Typography>
      <div className="flex flex-col sm:flex-row items-center gap-5 justify-center mt-10">
        {/* <Button
            variant="outlined"
            className="w-[170px]"
            LinkComponent="a"
            href="https://jobinja.ir/user/sajad_mahdian"
          >
            {t("jobinja-link")}
          </Button> */}
        <DownloadResumeBtn />
        {/* <Button
            variant="outlined"
            className="w-[170px]"
            LinkComponent="a"
            href="www.google.com"
          >
            {t("jobvision-link")}
          </Button> */}
      </div>
    </div>
  );
};
