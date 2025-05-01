import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC } from "react";

export const Introduce: FC = () => {
  const t = useTranslations("HomePage");
  return (
    <div className="px-5 flex flex-col gap-y-5 justify-center items-center h-full w-full">
      <Typography variant="h4" className="text-center">
        {t("Introduce.welcome")}
      </Typography>
      <Typography variant="h5" className="text-center">
        {t("Introduce.my-name")}
      </Typography>
      <Typography variant="h6" className="text-center">
        {t("Introduce.carrie")}
      </Typography>
    </div>
  );
};
