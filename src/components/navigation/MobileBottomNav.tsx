"use client";

import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface MobileBottomNavProps {
  activeSection?: string;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeSection = "home",
}) => {
  const [value, setValue] = useState(activeSection);
  const t = useTranslations("Header");

  // Navigation items with icons
  const navItems = [
    { label: t("home"), value: "home", icon: <HomeIcon /> },
    { label: t("projects"), value: "projects", icon: <WorkIcon /> },
    { label: t("about"), value: "about", icon: <InfoIcon /> },
    { label: t("contact"), value: "contact", icon: <ContactMailIcon /> },
  ];

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);

    // Handle navigation to section
    if (typeof window !== "undefined") {
      const section = document.getElementById(newValue);
      if (section) {
        // Get the header height based on viewport width
        const headerHeight = window.innerWidth <= 600 ? 56 : 64;

        // Calculate the position to scroll to
        const sectionTop = section.offsetTop;
        const offsetTop = sectionTop - headerHeight;

        // Use scrollTo with the container element
        const container = document.querySelector(".scroll-snap-container");
        if (container) {
          container.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector(".scroll-snap-container");
      if (!container) return;

      const scrollPosition = container.scrollTop;
      const headerHeight = window.innerWidth <= 600 ? 56 : 64;

      // Find which section is currently in view
      const sections = ["home", "projects", "about", "contact"];
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

    const container = document.querySelector(".scroll-snap-container");
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        display: { xs: "block", sm: "none" }, // Only show on mobile
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        sx={{
          height: "64px",
          "& .MuiBottomNavigationAction-root": {
            padding: "6px 0",
            minWidth: "auto",
          },
        }}
      >
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
