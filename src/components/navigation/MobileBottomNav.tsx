import {
  ContactMail as ContactMailIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Work as WorkIcon,
  Timeline as ExperienceIcon,
} from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC, SyntheticEvent, useEffect, useState } from "react";

interface MobileBottomNavProps {
  activeSection?: string;
}

export const MobileBottomNav: FC<MobileBottomNavProps> = ({
  activeSection = "home",
}) => {
  const [value, setValue] = useState(activeSection);
  const t = useTranslations("Header");

  // Main navigation items (removed settings, added experiences)
  const navItems = [
    { label: t("home"), value: "home", icon: <HomeIcon /> },
    { label: t("about"), value: "about", icon: <InfoIcon /> },
    { label: t("experiences"), value: "experience", icon: <ExperienceIcon /> },
    { label: t("projects"), value: "projects", icon: <WorkIcon /> },
    { label: t("contact"), value: "contact", icon: <ContactMailIcon /> },
  ];

  // Handle navigation change
  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);

    // Handle navigation to section
    if (typeof window !== "undefined") {
      const section = document.getElementById(newValue);
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

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const headerHeight = window.innerWidth <= 600 ? 56 : 64;

      // Find which section is currently in view
      const sections = ["home", "about", "experience", "projects", "contact"];
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (!section) continue;

        const sectionTop = section.offsetTop - headerHeight;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setValue(sectionId);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Paper
      elevation={0}
      sx={{
        position: "fixed",
        bottom: 12, // Add space from bottom
        left: 12, // Add space from left
        right: 12, // Add space from right
        zIndex: 1100,
        display: { xs: "block", sm: "none" }, // Only show on mobile
        borderRadius: "50px", // More rounded for mobile
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(30, 30, 30, 0.95)"
            : "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)"
            : "0 8px 32px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)",
        border: (theme) =>
          theme.palette.mode === "dark"
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(0, 0, 0, 0.08)",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        sx={{
          height: "72px", // Slightly taller for better touch targets
          backgroundColor: "transparent",
          borderRadius: "50px", // Match parent border radius
          "& .MuiBottomNavigationAction-root": {
            padding: "8px 4px",
            minWidth: "auto",
            borderRadius: "50px",
            margin: "4px",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.04)",
              transform: "translateY(-1px)",
            },
            "&.Mui-selected": {
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.12)"
                  : "rgba(0, 0, 0, 0.06)",
              "& .MuiBottomNavigationAction-label": {
                fontSize: "12px",
                fontWeight: 600,
              },
            },
            "& .MuiBottomNavigationAction-label": {
              fontSize: "11px",
              fontWeight: 500,
              marginTop: "4px",
            },
            "& .MuiSvgIcon-root": {
              fontSize: "22px",
            },
          },
        }}
      >
        {/* Main navigation items */}
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.value}
            label={item.label}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};
