"use client";

import { Divider, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC, useState, useEffect } from "react";
import { ExperienceCard } from "./ExperienceCard";

interface ExperiencesProps {
  experiencesData: Experience[];
}

export const Experiences: FC<ExperiencesProps> = ({ experiencesData }) => {
  const [isMobile, setIsMobile] = useState(false);
  const t = useTranslations("Experiences");

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on initial load
    checkMobile();

    // Listen for resize events
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <div className="flex flex-col gap-y-10 py-5">
      <Divider className="!my-10">
        <Typography variant="h4" className="!font-bold">
          {t("title")}
        </Typography>
      </Divider>

      {experiencesData.length > 0 ? (
        <div className="experiences-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiencesData.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              isMobile={isMobile}
            />
          ))}
        </div>
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
