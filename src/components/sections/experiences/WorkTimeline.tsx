import { FC, useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  useTheme,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import {
  Work,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Launch,
} from "@mui/icons-material";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface TimelineProps {
  experiences: Experience[];
}

export const WorkTimeline: FC<TimelineProps> = ({ experiences }) => {
  const theme = useTheme();
  const t = useTranslations("Experiences");
  const experienceT = useTranslations();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isRTL = theme.direction === "rtl";

  // Sort experiences by date (newest first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = a.startDate || "";
    const dateB = b.startDate || "";
    return dateB.localeCompare(dateA);
  });

  useEffect(() => {
    if (timelineRef.current) {
      const { scrollWidth, clientWidth } = timelineRef.current;
      setMaxScroll(scrollWidth - clientWidth);
    }
  }, [timelineRef, experiences]);

  const handleScroll = (direction: "left" | "right") => {
    if (!timelineRef.current) return;

    const scrollAmount = 300; // Adjust as needed
    const newPosition =
      direction === "right"
        ? scrollPosition + scrollAmount
        : scrollPosition - scrollAmount;

    // Apply RTL adjustment if needed
    const adjustedNewPosition = isRTL
      ? direction === "right"
        ? scrollPosition - scrollAmount
        : scrollPosition + scrollAmount
      : newPosition;

    const clampedPosition = Math.max(
      0,
      Math.min(adjustedNewPosition, maxScroll)
    );
    setScrollPosition(clampedPosition);

    timelineRef.current.scrollTo({
      left: clampedPosition,
      behavior: "smooth",
    });
  };

  return (
    <Box className="w-full relative mt-8 mb-12">
      {/* Timeline navigation arrows (desktop only) */}
      {!isMobile && (
        <>
          <IconButton
            className="absolute top-1/2 left-0 -translate-y-1/2 z-10"
            onClick={() => handleScroll("left")}
            disabled={scrollPosition <= 0}
            sx={{
              backgroundColor: theme.palette.background.paper,
              boxShadow: theme.shadows[3],
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
              },
              opacity: scrollPosition <= 0 ? 0.5 : 1,
            }}
            aria-label={t("scroll-left")}
          >
            {isRTL ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>

          <IconButton
            className="absolute top-1/2 right-0 -translate-y-1/2 z-10"
            onClick={() => handleScroll("right")}
            disabled={scrollPosition >= maxScroll}
            sx={{
              backgroundColor: theme.palette.background.paper,
              boxShadow: theme.shadows[3],
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
              },
              opacity: scrollPosition >= maxScroll ? 0.5 : 1,
            }}
            aria-label={t("scroll-right")}
          >
            {isRTL ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
        </>
      )}

      {/* Scrollable timeline container */}
      <Box
        ref={timelineRef}
        className="relative flex overflow-x-auto hide-scrollbar py-8 px-4"
        sx={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          // Add some space for the arrows
          paddingX: !isMobile ? 8 : 2,
        }}
      >
        {/* Timeline line */}
        <Box
          className="absolute h-1 bg-gray-300 dark:bg-gray-600"
          sx={{
            top: "5rem",
            left: !isMobile ? "2rem" : "1rem",
            right: !isMobile ? "2rem" : "1rem",
            zIndex: 1,
          }}
        />

        {/* Timeline items */}
        <Box className="flex justify-between w-full min-w-max">
          {sortedExperiences.map((experience) => {
            // Get translated content or fall back to legacy content
            const companyName = experience.companyNameKey
              ? experienceT(experience.companyNameKey)
              : experience.companyName || "";

            const summary = experience.summaryKey
              ? experienceT(experience.summaryKey)
              : experience.summary || "";

            // Format date display
            const dateDisplay = `${experience.startDate} - ${
              experience.endDate || t("present")
            }`;

            return (
              <Box
                key={experience.id}
                className="relative flex flex-col items-center mx-4"
                sx={{
                  minWidth: isMobile ? "200px" : "250px",
                  maxWidth: isMobile ? "200px" : "300px",
                }}
              >
                {/* Timeline dot */}
                <Box
                  className="w-8 h-8 rounded-full bg-primary-main flex items-center justify-center z-10"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    boxShadow: theme.shadows[3],
                  }}
                >
                  <Work sx={{ color: "#fff" }} />
                </Box>

                {/* Date label */}
                <Typography
                  variant="subtitle2"
                  className="mt-2 mb-4 text-center font-medium"
                >
                  {dateDisplay}
                </Typography>

                {/* Experience card */}
                <Paper
                  elevation={3}
                  className="w-full p-4 flex flex-col"
                  sx={{
                    height: "100%",
                    borderTop: `4px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <Typography variant="h6" className="!font-semibold !mb-2">
                    {companyName}
                  </Typography>

                  {summary && (
                    <Typography variant="body2" className="!mb-3 flex-grow">
                      {summary}
                    </Typography>
                  )}

                  {experience.url && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Launch />}
                      component={Link}
                      href={experience.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="!mt-auto"
                    >
                      {t("visit-company")}
                    </Button>
                  )}
                </Paper>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Mobile swipe indicator */}
      {isMobile && (
        <Typography
          variant="caption"
          className="text-center block mt-2 opacity-70"
        >
          {t("swipe-hint")}
        </Typography>
      )}

      {/* Add custom styling for the scrollbar hiding */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </Box>
  );
};
