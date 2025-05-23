import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { Chip, useMediaQuery, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { ExperienceCard } from "./ExperienceCard";

interface TimelineProps {
  experiences: Experience[];
}

export const WorkTimeline: FC<TimelineProps> = ({ experiences }) => {
  const theme = useTheme();
  const t = useTranslations("Experiences");

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Sort experiences by date (newest first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = a.startDate || "";
    const dateB = b.startDate || "";
    return dateB.localeCompare(dateA);
  });

  return (
    <Timeline position={isMobile ? "right" : "alternate"} className="!px-0">
      {sortedExperiences.map((experience) => {
        // Format date display
        const dateDisplay = `${experience.startDate || ""} - ${
          experience.endDate || t("present")
        }`;

        return (
          <TimelineItem
            key={experience.id}
            sx={{
              ...(isMobile && {
                "&::before": {
                  content: "none",
                },
              }),
            }}
          >
            {!isMobile && (
              <TimelineOppositeContent color="text.secondary">
                <Chip
                  label={dateDisplay}
                  size="small"
                  color="primary"
                  className="font-medium"
                  sx={{
                    fontWeight: "500",
                    boxShadow: theme.shadows[1],
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[2],
                    },
                  }}
                />
              </TimelineOppositeContent>
            )}
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              {/* Date badge */}
              {isMobile && (
                <Chip
                  label={dateDisplay}
                  size="small"
                  color="primary"
                  className="font-medium mb-2"
                  sx={{
                    fontWeight: "500",
                    boxShadow: theme.shadows[1],
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[2],
                    },
                  }}
                />
              )}

              {/* Experience card */}
              <ExperienceCard experience={experience} />
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};
