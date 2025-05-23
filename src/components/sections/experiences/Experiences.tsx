"use client";

import { Divider, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { WorkTimeline } from "./WorkTimeline";

interface ExperiencesProps {
  experiencesData: Experience[];
}

export const Experiences: FC<ExperiencesProps> = ({ experiencesData }) => {
  const t = useTranslations("Experiences");

  return (
    <div className="flex flex-col gap-y-10 py-5">
      <Divider className="!my-10">
        <Typography variant="h4" className="!font-bold">
          {t("title")}
        </Typography>
      </Divider>

      {experiencesData.length > 0 ? (
        <WorkTimeline experiences={experiencesData} />
      ) : (
        <div className="text-center py-8">
          <Typography variant="body1" color="text.secondary">
            {t("no-experiences-available")}
          </Typography>
        </div>
      )}
    </div>
  );
};
