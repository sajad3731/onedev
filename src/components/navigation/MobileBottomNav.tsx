import {
  ContactMail as ContactMailIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Work as WorkIcon,
  Timeline as ExperienceIcon,
} from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC, useEffect, useState, useRef } from "react";

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
  const [isScrolling, setIsScrolling] = useState(false);
  const userClickedRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    // Set flag to prevent scroll-based updates for a short time
    userClickedRef.current = true;
    setActiveValue(sectionId);

    // Clear any existing click timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    // Reset the flag after scroll animation completes
    clickTimeoutRef.current = setTimeout(() => {
      userClickedRef.current = false;
    }, 1000); // Allow 1 second for smooth scroll to complete

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
      setIsScrolling(true);

      // Hide navigation when scrolling
      setIsVisible(false);

      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set new timeout to show navigation when scrolling stops
      const newTimeout = setTimeout(() => {
        setIsVisible(true);
        setIsScrolling(false);
      }, 150); // Show after 150ms of no scrolling

      setScrollTimeout(newTimeout);

      // Only update active section if user didn't recently click
      if (!userClickedRef.current && !isScrolling) {
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
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, [scrollTimeout, isScrolling]);

  // Sync with prop changes (only if user didn't recently click)
  useEffect(() => {
    if (!userClickedRef.current) {
      setActiveValue(activeSection);
    }
  }, [activeSection]);

  return (
    <Box
      className={`
        fixed bottom-3 left-1/2 -translate-x-1/2 z-[1100] 
        sm:hidden transition-all duration-300 ease-in-out
        ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }
      `}
      style={{
        width: "fit-content",
        maxWidth: "calc(100vw - 24px)",
      }}
    >
      {/* Navigation Container */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-sm shadow-lg border border-gray-200/50 dark:border-white/20 min-h-[64px] w-fit">
        {navItems.map((item) => {
          const isActive = activeValue === item.value;

          return (
            <div key={item.value} className="relative">
              <IconButton
                onClick={() => handleNavClick(item.value)}
                className="!w-12 !h-12 !min-w-12 !rounded-full !transition-all !duration-300 !ease-in-out hover:!scale-105"
                aria-label={item.label}
                sx={{
                  color: ({ palette }) =>
                    isActive ? palette.info.main : palette.action.active,
                  backgroundColor: ({ palette }) =>
                    isActive ? `${palette.info.main}15` : "transparent",
                  "& .MuiSvgIcon-root": {
                    fontSize: "22px",
                    transition: "all 0.2s ease-in-out",
                  },
                }}
              >
                {item.icon}
              </IconButton>

              {/* Active indicator - small dot below the button */}
              {isActive && (
                <Box
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full animate-pulse shadow-sm"
                  sx={{
                    backgroundColor: ({ palette }) => palette.primary.main,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </Box>
  );
};
