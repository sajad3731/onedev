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
        ref={buttonRef}
        color="primary"
        aria-label="contact"
        onClick={handleClick}
        sx={{
          position: "fixed",
          // Adjusted positioning to work with rounded mobile nav
          bottom: {
            xs: 108, // Above the rounded mobile nav (72px height + 12px bottom spacing + 24px extra space)
            sm: 24, // Normal position on desktop
          },
          right: {
            xs: 24, // Consistent right spacing on mobile
            sm: 24, // Same right spacing on desktop
          },
          zIndex: 1100,
          // Enhanced styling to match the rounded theme
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? "0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)"
              : "0 8px 24px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-2px) scale(1.05)",
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 12px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.15)"
                : "0 12px 32px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08)",
          },
          "&:active": {
            transform: "translateY(0px) scale(0.95)",
          },
        }}
      >
        <Tooltip title={t("contact")} placement="left">
          <EmailIcon />
        </Tooltip>
      </Fab>
    </Zoom>
  );
};
