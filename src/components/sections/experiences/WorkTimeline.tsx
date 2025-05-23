import { FC } from "react";
import {
  Box,
  Typography,
  Paper,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material";
import { Work, Launch } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface TimelineProps {
  experiences: Experience[];
}

export const WorkTimeline: FC<TimelineProps> = ({ experiences }) => {
  const theme = useTheme();
  const t = useTranslations("Experiences");
  const experienceT = useTranslations();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isRTL = theme.direction === "rtl";

  // Sort experiences by date (newest first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = a.startDate || "";
    const dateB = b.startDate || "";
    return dateB.localeCompare(dateA);
  });

  return (
    <Box className="w-full relative mt-8 mb-12">
      {/* Vertical Timeline Container */}
      <Box className="relative mx-auto max-w-4xl">
        {/* Vertical timeline line */}
        <Box
          className="absolute bg-gray-300 dark:bg-gray-600"
          sx={{
            width: "2px",
            height: "100%",
            left: isMobile ? "20px" : "50%",
            transform: isMobile ? "none" : "translateX(-50%)",
            zIndex: 1,
          }}
        />

        {/* Timeline items */}
        <Box className="relative">
          {sortedExperiences.map((experience, index) => {
            // Get translated content
            const companyName = experience.companyNameKey
              ? experienceT(experience.companyNameKey)
              : experience.companyName || "";

            const summary = experience.summaryKey
              ? experienceT(experience.summaryKey)
              : experience.summary || "";

            // Get description
            let description: string[] = [];
            if (
              experience.descriptionKeys &&
              experience.descriptionKeys.length > 0
            ) {
              description = experience.descriptionKeys.map((key) =>
                experienceT(key)
              );
            } else if (experience.description) {
              description = experience.description;
            }

            // Format date display
            const dateDisplay = `${experience.startDate} - ${
              experience.endDate || t("present")
            }`;

            // Determine card position (alternate for desktop, all left for mobile)
            const isLeft = isMobile || index % 2 === 0;
            const isRight = !isMobile && index % 2 === 1;

            return (
              <Box
                key={experience.id}
                className="relative flex items-center mb-12 last:mb-0"
                sx={{
                  flexDirection: isMobile
                    ? "row"
                    : isRight
                    ? "row-reverse"
                    : "row",
                  minHeight: "120px",
                }}
              >
                {/* Timeline dot */}
                <Box
                  className="absolute bg-primary-main rounded-full flex items-center justify-center z-10"
                  sx={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: theme.palette.primary.main,
                    boxShadow: theme.shadows[4],
                    left: isMobile ? "4px" : "50%",
                    transform: isMobile
                      ? "translateX(-50%)"
                      : "translate(-50%, 0)",
                    border: `4px solid ${theme.palette.background.default}`,
                  }}
                >
                  <Work sx={{ color: "#fff", fontSize: "20px" }} />
                </Box>

                {/* Content container */}
                <Box
                  className="flex-1"
                  sx={{
                    paddingLeft: isMobile ? "60px" : isLeft ? "0" : "60px",
                    paddingRight: isMobile ? "0" : isLeft ? "60px" : "0",
                    maxWidth: isMobile ? "100%" : "calc(50% - 30px)",
                    marginLeft: isMobile ? "0" : isLeft ? "0" : "auto",
                    marginRight: isMobile ? "0" : isLeft ? "auto" : "0",
                  }}
                >
                  {/* Date badge */}
                  <Box
                    className="inline-block mb-3"
                    sx={{
                      textAlign: isMobile ? "left" : isLeft ? "right" : "left",
                    }}
                  >
                    <Typography
                      variant="caption"
                      className="px-3 py-1 rounded-full font-medium"
                      sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.primary.contrastText,
                        display: "inline-block",
                      }}
                    >
                      {dateDisplay}
                    </Typography>
                  </Box>

                  {/* Experience card */}
                  <Paper
                    elevation={3}
                    className="p-6"
                    sx={{
                      position: "relative",
                      borderLeft:
                        isMobile || isLeft
                          ? `4px solid ${theme.palette.primary.main}`
                          : "none",
                      borderRight:
                        !isMobile && isRight
                          ? `4px solid ${theme.palette.primary.main}`
                          : "none",
                      "&::before": !isMobile
                        ? {
                            content: '""',
                            position: "absolute",
                            top: "24px",
                            [isLeft ? "right" : "left"]: "-12px",
                            width: 0,
                            height: 0,
                            borderTop: "12px solid transparent",
                            borderBottom: "12px solid transparent",
                            [isLeft
                              ? "borderRight"
                              : "borderLeft"]: `12px solid ${theme.palette.background.paper}`,
                            zIndex: 2,
                          }
                        : {},
                      "&::after": !isMobile
                        ? {
                            content: '""',
                            position: "absolute",
                            top: "22px",
                            [isLeft ? "right" : "left"]: "-16px",
                            width: 0,
                            height: 0,
                            borderTop: "14px solid transparent",
                            borderBottom: "14px solid transparent",
                            [isLeft
                              ? "borderRight"
                              : "borderLeft"]: `14px solid ${theme.palette.divider}`,
                            zIndex: 1,
                          }
                        : {},
                    }}
                  >
                    {/* Company name */}
                    <Typography
                      variant="h6"
                      className="!font-bold !mb-2"
                      sx={{
                        textAlign: isMobile
                          ? "left"
                          : isLeft
                          ? "right"
                          : "left",
                      }}
                    >
                      {companyName}
                    </Typography>

                    {/* Summary */}
                    {summary && (
                      <Typography
                        variant="body1"
                        className="!mb-4 !text-gray-700 dark:!text-gray-300"
                        sx={{
                          textAlign: "justify",
                          lineHeight: 1.6,
                        }}
                      >
                        {summary}
                      </Typography>
                    )}

                    {/* Description list */}
                    {description && description.length > 0 && (
                      <Box className="mb-4">
                        <Typography
                          variant="subtitle2"
                          className="!font-semibold !mb-3 !text-gray-800 dark:!text-gray-200"
                        >
                          {t("responsibilities")}:
                        </Typography>
                        <Box
                          component="ul"
                          className="space-y-2"
                          sx={{
                            paddingLeft: isRTL ? 0 : "20px",
                            paddingRight: isRTL ? "20px" : 0,
                            margin: 0,
                            listStyle: "none",
                            "& li": {
                              position: "relative",
                              paddingLeft: isRTL ? 0 : "12px",
                              paddingRight: isRTL ? "12px" : 0,
                              fontSize: "0.875rem",
                              lineHeight: 1.5,
                              color: theme.palette.text.secondary,
                              "&::before": {
                                content: '"•"',
                                position: "absolute",
                                [isRTL ? "right" : "left"]: 0,
                                color: theme.palette.primary.main,
                                fontWeight: "bold",
                              },
                            },
                          }}
                        >
                          {description.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </Box>
                      </Box>
                    )}

                    {/* Visit company button */}
                    {experience.url && (
                      <Box
                        sx={{
                          textAlign: isMobile
                            ? "left"
                            : isLeft
                            ? "right"
                            : "left",
                        }}
                      >
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Launch />}
                          component={Link}
                          href={experience.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            textTransform: "none",
                            borderRadius: "6px",
                          }}
                        >
                          {t("visit-company")}
                        </Button>
                      </Box>
                    )}
                  </Paper>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Timeline end indicator */}
      <Box
        className="flex justify-center mt-8"
        sx={{
          marginLeft: isMobile ? "20px" : "0",
        }}
      >
        <Box
          className="w-4 h-4 rounded-full"
          sx={{
            backgroundColor: theme.palette.primary.main,
            boxShadow: theme.shadows[2],
          }}
        />
      </Box>
    </Box>
  );
};
