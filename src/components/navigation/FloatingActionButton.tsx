"use client";

import { Fab, Tooltip, Zoom } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

export const FloatingActionButton = () => {
  const [isVisible, setIsVisible] = useState(true);
  const t = useTranslations("Header");

  // Hide FAB when at contact section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const contactSection = document.getElementById("contact");

      if (contactSection) {
        const headerHeight = window.innerWidth <= 600 ? 56 : 64;
        const contactTop = contactSection.offsetTop - headerHeight;
        const contactBottom = contactTop + contactSection.offsetHeight;

        // Hide when in contact section
        setIsVisible(
          scrollPosition < contactTop || scrollPosition >= contactBottom
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    // Scroll to contact section
    if (typeof window !== "undefined") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const headerHeight = window.innerWidth <= 600 ? 56 : 64;
        const contactTop = contactSection.offsetTop - headerHeight;

        window.scrollTo({
          top: contactTop,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <Zoom in={isVisible}>
      <Fab
        color="primary"
        aria-label="contact"
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: { xs: 80, sm: 24 }, // Position above bottom navigation on mobile
          right: 24,
          zIndex: 1100,
        }}
      >
        <Tooltip title={t("contact")}>
          <EmailIcon />
        </Tooltip>
      </Fab>
    </Zoom>
  );
};
