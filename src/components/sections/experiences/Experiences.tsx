"use client";

import { Divider, Typography, Box, Tab, Tabs } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC, useState, useEffect } from "react";
import { ExperienceCard } from "./ExperienceCard";
import { WorkTimeline } from "./WorkTimeline";

interface ExperiencesProps {
  experiencesData: Experience[];
}

export const Experiences: FC<ExperiencesProps> = ({ experiencesData }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState<"timeline" | "cards">("timeline");
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

  // Handle tab change
  const handleViewChange = (
    event: React.SyntheticEvent,
    newValue: "timeline" | "cards"
  ) => {
    setViewMode(newValue);
  };

  return (
    <div className="flex flex-col gap-y-10 py-5">
      <Divider className="!my-10">
        <Typography variant="h4" className="!font-bold">
          {t("title")}
        </Typography>
      </Divider>

      {/* View mode selector */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          width: "fit-content",
          mx: "auto",
          mb: 4,
        }}
      >
        <Tabs
          value={viewMode}
          onChange={handleViewChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab value="timeline" label={t("view-timeline")} />
          <Tab value="cards" label={t("view-cards")} />
        </Tabs>
      </Box>

      {experiencesData.length > 0 ? (
        <>
          {/* Timeline View */}
          {viewMode === "timeline" && (
            <WorkTimeline experiences={experiencesData} />
          )}

          {/* Cards View */}
          {viewMode === "cards" && (
            <div className="experiences-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {experiencesData.map((experience) => (
                <ExperienceCard
                  key={experience.id}
                  experience={experience}
                  isMobile={isMobile}
                />
              ))}
            </div>
          )}
        </>
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
