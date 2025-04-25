"use client";

import { KeyboardArrowDown } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface ScrollIndicatorProps {
  targetSectionId?: string;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  targetSectionId,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Optional translation for accessibility
  const t = useTranslations("ScrollIndicator");

  const handleClick = () => {
    if (targetSectionId && typeof window !== "undefined") {
      const targetSection = document.getElementById(targetSectionId);

      if (targetSection) {
        // Get header height based on viewport
        const headerHeight = window.innerWidth <= 600 ? 56 : 64;

        const sectionTop = targetSection.offsetTop;
        const offsetTop = sectionTop - headerHeight;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    } else {
      // If no target specified, scroll down one viewport height
      window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  // Check if we need to show the indicator based on content height
  useEffect(() => {
    const checkScroll = () => {
      if (typeof window !== "undefined") {
        // Hide indicator if user has scrolled past first section
        if (window.scrollY > window.innerHeight / 2) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };

    // Initial check
    checkScroll();

    // Add scroll listener
    window.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="scroll-indicator"
      onClick={handleClick}
      aria-label={t("scroll-down")}
      role="button"
      tabIndex={0}
    >
      <KeyboardArrowDown fontSize="large" />
    </div>
  );
};
