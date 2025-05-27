import {
  ContactMail as ContactMailIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Work as WorkIcon,
  Timeline as ExperienceIcon,
} from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC, useEffect, useState } from "react";

interface MobileBottomNavProps {
  activeSection?: string;
}

export const MobileBottomNav: FC<MobileBottomNavProps> = ({
  activeSection = "home",
}) => {
  const [activeValue, setActiveValue] = useState(activeSection);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const t = useTranslations("Header");

  // Main navigation items
  const navItems = [
    { label: t("home"), value: "home", icon: <HomeIcon /> },
    { label: t("about"), value: "about", icon: <InfoIcon /> },
    { label: t("experiences"), value: "experience", icon: <ExperienceIcon /> },
    { label: t("projects"), value: "projects", icon: <WorkIcon /> },
    { label: t("contact"), value: "contact", icon: <ContactMailIcon /> },
  ];

  // Handle navigation click
  const handleNavClick = (sectionId: string) => {
    setActiveValue(sectionId);

    if (typeof window !== "undefined") {
      const section = document.getElementById(sectionId);
      if (section) {
        const headerHeight = window.innerWidth <= 600 ? 56 : 64;
        const sectionTop = section.offsetTop;
        const offsetTop = sectionTop - headerHeight;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  // Handle scroll detection - show when scrolling stops
  useEffect(() => {
    const handleScroll = () => {
      // Hide navigation when scrolling
      setIsVisible(false);

      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set new timeout to show navigation when scrolling stops
      const newTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 150); // Show after 150ms of no scrolling

      setScrollTimeout(newTimeout);

      // Update active section based on scroll position
      const headerHeight = window.innerWidth <= 600 ? 56 : 64;
      const sections = ["home", "about", "experience", "projects", "contact"];

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (!section) continue;

        const sectionTop = section.offsetTop - headerHeight;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
          setActiveValue(sectionId);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  // Sync with prop changes
  useEffect(() => {
    setActiveValue(activeSection);
  }, [activeSection]);

  return (
    <Box
      className={`
        fixed bottom-3 left-1/2 transform -translate-x-1/2 z-[1100] 
        sm:hidden transition-all duration-300 ease-in-out
        ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }
      `}
      sx={{
        width: "fit-content",
        maxWidth: "calc(100vw - 24px)",
      }}
    >
      {/* Navigation Container with light background */}
      <Box
        className="
          flex items-center gap-2 px-3 py-2 rounded-full
          bg-white/90 dark:bg-white/10 backdrop-blur-md
          shadow-lg border border-gray-200/50 dark:border-white/20
        "
        sx={{
          minHeight: "64px",
          width: "fit-content",
          // Light theme colors
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          // Dark theme overrides
          ".dark &": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          },
        }}
      >
        {navItems.map((item) => {
          const isActive = activeValue === item.value;

          return (
            <IconButton
              key={item.value}
              onClick={() => handleNavClick(item.value)}
              className={`
                w-12 h-12 rounded-full transition-all duration-300 ease-in-out
                ${
                  isActive
                    ? "bg-blue-500 text-white scale-110 shadow-lg"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 hover:scale-105"
                }
              `}
              sx={{
                position: "relative",
                "&:active": {
                  transform: "scale(0.95)",
                },
                // Active state styling
                ...(isActive && {
                  backgroundColor: "#3b82f6 !important",
                  color: "white !important",
                  transform: "scale(1.1)",
                  boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: "-2px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(45deg, transparent 30%, currentColor 50%, transparent 70%)",
                    opacity: 0.1,
                    animation: "pulse 2s ease-in-out infinite",
                  },
                }),
              }}
              aria-label={item.label}
            >
              {/* Icon with smooth transition */}
              <Box
                className="transition-transform duration-200"
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: isActive ? "24px" : "22px",
                    transition: "all 0.2s ease-in-out",
                  },
                }}
              >
                {item.icon}
              </Box>

              {/* Active indicator dot */}
              {isActive && (
                <Box className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse" />
              )}
            </IconButton>
          );
        })}
      </Box>
    </Box>
  );
};
