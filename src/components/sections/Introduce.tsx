import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IntroduceProps {}

export const Introduce: React.FC<IntroduceProps> = () => {
  const t = useTranslations("HomePage");
  return (
    <div className="px-10 flex flex-col gap-y-5 justify-center items-center">
      <Typography variant="h4" className="text-justify">
        {t("Introduce.welcome")}
      </Typography>
      <Typography variant="h5" className="text-justify">
        {t("Introduce.my-name")}
      </Typography>
      <Typography variant="h6" className="text-justify">
        {t("Introduce.carrie")}
      </Typography>
    </div>
    // <Image
    //   src="/images/introduce-section-banner.png"
    //   alt="My name is Sajad Mahdian. A software engineer personal website"
    //   fill
    //   className="w-full h-auto"
    //   sizes={`
    //           (max-width: ${tokens.breakpoints.sm}px) 250px,
    //           (max-width: ${tokens.breakpoints.md}px) 350px,
    //           (max-width: ${tokens.breakpoints.lg}px) 500px,
    //           (max-width: ${tokens.breakpoints.xl}px) 700px,
    //           900px
    //         `}
    // />
  );
};
