import { FC, useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  useTheme,
  Button,
  useMediaQuery,
  Fade,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Work,
  Launch,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

interface TimelineProps {
  experiences: Experience[];
}

export const WorkTimeline: FC<TimelineProps> = ({ experiences }) => {
  const theme = useTheme();
  const t = useTranslations("Experiences");
  const experienceT = useTranslations();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isRTL = theme.direction === "rtl";
  const [expandedExperience, setExpandedExperience] = useState<string | null>(
    null
  );

  // Refs for scroll animation
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Sort experiences by date (newest first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = a.startDate || "";
    const dateB = b.startDate || "";
    return dateB.localeCompare(dateA);
  });

  // Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);

  // Toggle expanded state for mobile
  const toggleExpand = (id: string) => {
    setExpandedExperience((prevId) => (prevId === id ? null : id));
  };

  return (
    <div>
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
          experience.responsibilityKeys &&
          experience.responsibilityKeys.length > 0
        ) {
          description = experience.responsibilityKeys.map((key) =>
            experienceT(key)
          );
        } else if (experience.description) {
          description = experience.description;
        }

        // Format date display
        const dateDisplay = `${experience.startDate || ""} - ${
          experience.endDate || t("present")
        }`;

        // Determine card position (alternate for desktop, all left for mobile)
        const isLeft = isMobile || index % 2 === 0;
        const isRight = !isMobile && index % 2 === 1;

        // Check if this experience is currently expanded
        const isExpanded = expandedExperience === experience.id;

        // Calculate animation delay based on index
        const animationDelay = `${index * 0.15}s`;

        return (
          <Fade
            key={experience.id}
            in={isInView}
            timeout={700}
            style={{ transitionDelay: animationDelay }}
          >
            <Box
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
              {/* Timeline dot with animation */}
              <Box
                className="absolute rounded-full flex items-center justify-center z-10"
                sx={{
                  width: isMobile ? "40px" : "48px",
                  height: isMobile ? "40px" : "48px",
                  backgroundColor: theme.palette.primary.main,
                  boxShadow: theme.shadows[4],
                  left: isMobile ? "4px" : "50%",
                  transform: isMobile
                    ? "translateX(-50%)"
                    : "translate(-50%, 0)",
                  border: `4px solid ${theme.palette.background.default}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: isMobile
                      ? "translateX(-50%) scale(1.1)"
                      : "translate(-50%, 0) scale(1.1)",
                    cursor: "pointer",
                  },
                  ...(isMobile && {
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: `${theme.palette.primary.main}33`,
                      animation: "ripple 1.5s infinite ease-in-out",
                      zIndex: -1,
                    },
                    "@keyframes ripple": {
                      "0%": {
                        transform: "scale(1)",
                        opacity: 1,
                      },
                      "100%": {
                        transform: "scale(2.5)",
                        opacity: 0,
                      },
                    },
                  }),
                }}
                onClick={() => isMobile && toggleExpand(experience.id)}
              >
                <Work
                  sx={{
                    color: "#fff",
                    fontSize: isMobile ? "18px" : "20px",
                  }}
                />
              </Box>

              {/* Content container */}
              <Box
                className="flex-1"
                sx={{
                  paddingLeft: isMobile ? "40px" : isLeft ? "0" : "60px",
                  paddingRight: isMobile ? "0" : isLeft ? "60px" : "0",
                  maxWidth: isMobile ? "calc(100% - 40px)" : "calc(50% - 30px)",
                  marginLeft: isMobile ? "0" : isLeft ? "0" : "auto",
                  marginRight: isMobile ? "0" : isLeft ? "auto" : "0",
                  transition: "all 0.3s ease",
                }}
              >
                {/* Date badge */}
                <Box
                  className="inline-block mb-2"
                  sx={{
                    textAlign: isMobile ? "left" : isLeft ? "right" : "left",
                  }}
                >
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
                </Box>

                {/* Experience card */}
                <Paper
                  elevation={3}
                  className={`p-4 md:p-6 transition-all duration-300 ease-in-out ${
                    isMobile && "relative overflow-hidden"
                  }`}
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
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    transform:
                      isMobile && isExpanded ? "scale(1.02)" : "scale(1)",
                    "&:hover": {
                      boxShadow: theme.shadows[6],
                      transform: "translateY(-5px)",
                    },
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
                    maxHeight: isMobile && !isExpanded ? "180px" : "none",
                  }}
                >
                  {/* Company logo/image - Only for mobile */}
                  {isMobile && experience.thumbnailUrl && (
                    <Box
                      className="absolute top-2 right-2 w-10 h-10 rounded-full overflow-hidden border-2"
                      sx={{
                        borderColor: theme.palette.primary.light,
                        opacity: 0.8,
                      }}
                    >
                      <Image
                        src={experience.thumbnailUrl}
                        alt={companyName}
                        fill
                        className="object-cover"
                      />
                    </Box>
                  )}

                  {/* Company name */}
                  <Typography
                    variant="h6"
                    className="!font-bold !mb-2"
                    sx={{
                      textAlign: isMobile ? "left" : isLeft ? "right" : "left",
                      fontSize: isMobile ? "1rem" : "1.25rem",
                      paddingRight: isMobile ? "2.5rem" : 0,
                    }}
                  >
                    {companyName}
                  </Typography>

                  {/* Summary */}
                  {summary && (
                    <Typography
                      variant="body2"
                      className="!mb-3 !text-gray-700 dark:!text-gray-300"
                      sx={{
                        textAlign: "justify",
                        lineHeight: 1.5,
                        fontSize: isMobile ? "0.875rem" : "1rem",
                      }}
                    >
                      {summary}
                    </Typography>
                  )}

                  {/* Description list - Conditional rendering for mobile */}
                  {description && description.length > 0 && (
                    <Box
                      className={`mb-4 transition-all duration-300 ease-in-out ${
                        isMobile && !isExpanded ? "opacity-70" : "opacity-100"
                      }`}
                      sx={{
                        maxHeight: isMobile && !isExpanded ? "60px" : "none",
                        overflow:
                          isMobile && !isExpanded ? "hidden" : "visible",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        className="!font-semibold !mb-2 !text-gray-800 dark:!text-gray-200"
                      >
                        {t("responsibilities")}:
                      </Typography>
                      <Box
                        component="ul"
                        className="space-y-1"
                        sx={{
                          paddingLeft: isRTL ? 0 : "20px",
                          paddingRight: isRTL ? "20px" : 0,
                          margin: 0,
                          listStyle: "none",
                          "& li": {
                            position: "relative",
                            paddingLeft: isRTL ? 0 : "16px",
                            paddingRight: isRTL ? "16px" : 0,
                            fontSize: isMobile ? "0.8125rem" : "0.875rem",
                            lineHeight: 1.5,
                            marginBottom: "8px",
                            color: theme.palette.text.secondary,
                            "&::before": {
                              content: '"•"',
                              position: "absolute",
                              [isRTL ? "right" : "left"]: 0,
                              color: theme.palette.primary.main,
                              fontWeight: "bold",
                              fontSize: "1.2em",
                            },
                          },
                        }}
                      >
                        {isMobile && !isExpanded
                          ? description
                              .slice(0, 1)
                              .map((item, idx) => <li key={idx}>{item}</li>)
                          : description.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                      </Box>
                    </Box>
                  )}

                  {/* Expand/collapse button for mobile */}
                  {isMobile && (
                    <IconButton
                      size="small"
                      onClick={() => toggleExpand(experience.id)}
                      aria-label={isExpanded ? "Show less" : "Show more"}
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%) translateY(50%)",
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: theme.shadows[2],
                        border: `1px solid ${theme.palette.divider}`,
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                        zIndex: 10,
                      }}
                    >
                      {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
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
                        marginTop: isMobile ? "20px" : "10px",
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
                          transition: "all 0.2s ease",
                          "&:hover": {
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        {t("visit-company")}
                      </Button>
                    </Box>
                  )}

                  {/* Fade overlay for collapsed mobile state */}
                  {isMobile && !isExpanded && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "60px",
                        background: `linear-gradient(to bottom, transparent, ${
                          theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff"
                        })`,
                        zIndex: 5,
                      }}
                    />
                  )}
                </Paper>
              </Box>
            </Box>
          </Fade>
        );
      })}
    </div>
  );
};
