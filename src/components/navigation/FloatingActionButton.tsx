"use client";

import { Fab, Tooltip, Zoom } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";

export const FloatingActionButton = () => {
  const [isVisible, setIsVisible] = useState(true);
  const t = useTranslations("Header");

  // Use a ref to manage the button's focus
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buttonRef = useRef<any | null>(null);

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

  useEffect(() => {
    // When hiding the button, make sure it can't receive focus
    if (!isVisible && buttonRef.current) {
      buttonRef.current.setAttribute("tabIndex", "-1");
    } else if (isVisible && buttonRef.current) {
      buttonRef.current.setAttribute("tabIndex", "0");
    }
  }, [isVisible]);

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
