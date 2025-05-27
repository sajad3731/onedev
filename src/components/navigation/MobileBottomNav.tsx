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

  // Main navigation items
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
      className="fixed bottom-3 left-3 right-3 z-[1100] sm:hidden rounded-full 
                 bg-white/70 dark:bg-gray-900/95 backdrop-blur-md
                 shadow-[0_8px_32px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05)]
                 dark:shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.1)]
                 border border-black/8 dark:border-white/10"
    >
      <BottomNavigation
        showLabels={false} // Hide labels by default
        value={value}
        onChange={handleChange}
        className="h-16 bg-transparent rounded-full min-w-fit"
        sx={{
          "& .MuiBottomNavigationAction-root": {
            minWidth: "auto",
            padding: "6px 8px",
            borderRadius: "24px",
            margin: "4px 2px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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
              minWidth: "auto",
              paddingLeft: "12px",
              paddingRight: "12px",
              "& .MuiBottomNavigationAction-label": {
                fontSize: "11px",
                fontWeight: 600,
                opacity: 1,
                transform: "scale(1)",
              },
              "& .MuiSvgIcon-root": {
                fontSize: "20px",
              },
            },
            // Center icons when not selected
            "&:not(.Mui-selected)": {
              "& .MuiBottomNavigationAction-wrapper": {
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              },
              "& .MuiSvgIcon-root": {
                fontSize: "22px",
                margin: "0",
              },
              "& .MuiBottomNavigationAction-label": {
                display: "none", // Hide labels for non-selected items
              },
            },
            "& .MuiBottomNavigationAction-label": {
              fontSize: "10px",
              fontWeight: 500,
              marginTop: "2px",
              transition: "all 0.2s ease-in-out",
            },
            "& .MuiSvgIcon-root": {
              transition: "all 0.2s ease-in-out",
            },
          },
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.value}
            label={item.label}
            value={item.value}
            icon={item.icon}
            showLabel={value === item.value} // Only show label for selected item
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};
