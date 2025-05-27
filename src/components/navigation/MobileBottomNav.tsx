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
  const [lastScrollY, setLastScrollY] = useState(0);

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

  // Handle scroll detection for hiding/showing navigation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY);

      // Only trigger hide/show if scroll difference is significant (prevents micro-scrolls)
      if (scrollDifference > 10) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down & past initial threshold
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up
          setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
      }

      // Update active section based on scroll position
      const headerHeight = window.innerWidth <= 600 ? 56 : 64;
      const sections = ["home", "about", "experience", "projects", "contact"];

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (!section) continue;

        const sectionTop = section.offsetTop - headerHeight;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (currentScrollY >= sectionTop && currentScrollY < sectionBottom) {
          setActiveValue(sectionId);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
      {/* Navigation Container */}
      <Box
        className="
          flex items-center gap-2 px-3 py-2 rounded-full
          bg-white/80 dark:bg-gray-900/90 backdrop-blur-md
          shadow-[0_8px_32px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05)]
          dark:shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.1)]
          border border-black/8 dark:border-white/10
        "
        sx={{
          minHeight: "64px",
          width: "fit-content",
        }}
      >
        {navItems.map((item) => {
          const isActive = activeValue === item.value;

          return (
            <IconButton
              key={item.value}
              onClick={() => handleNavClick(item.value)}
              className={`
                transition-all duration-300 ease-in-out
                ${
                  isActive
                    ? "bg-primary-100 dark:bg-primary-900/30 scale-110"
                    : "hover:bg-black/5 dark:hover:bg-white/5 hover:scale-105"
                }
              `}
              sx={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                position: "relative",
                color: isActive ? "primary.main" : "text.secondary",
                "&:hover": {
                  transform: isActive ? "scale(1.1)" : "scale(1.05)",
                },
                "&:active": {
                  transform: "scale(0.95)",
                },
                // Add subtle pulse animation for active state
                ...(isActive && {
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
                <Box
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
                  sx={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    backgroundColor: "primary.main",
                    animation: "fadeIn 0.3s ease-in-out",
                  }}
                />
              )}
            </IconButton>
          );
        })}
      </Box>
    </Box>
  );
};
