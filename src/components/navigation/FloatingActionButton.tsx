"use client";

import {
  Close as CloseIcon,
  Language as LanguageIcon,
  Settings as SettingsIcon,
  Brightness4 as ThemeIcon,
} from "@mui/icons-material";
import { Box, IconButton, useTheme as useMuiTheme } from "@mui/material";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";

export const FloatingSettingsButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const isRtl = locale === "fa";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll detection for hiding/showing button
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY);

      // Only trigger hide/show if scroll difference is significant
      if (scrollDifference > 10) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down & past initial threshold
          setIsVisible(false);
          setIsOpen(false); // Close menu when hiding
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up
          setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = () => {
    const currentLocale = pathname.split("/")[1];
    const newLocale = locale === "en" ? "fa" : "en";
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
    setIsOpen(false);
  };

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
    router.refresh();
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (!mounted) return null;

  // Only show on mobile devices
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  if (!isMobile) return null;

  return (
    <Box
      ref={containerRef}
      className={`
        fixed bottom-[100px] z-[1200] sm:hidden
        transition-all duration-300 ease-in-out
        ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }
        ${isRtl ? "left-4" : "right-4"}
      `}
      sx={{
        display: { xs: "flex", sm: "none" },
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor:
          muiTheme.palette.mode === "dark"
            ? "rgba(25, 25, 25, 0.85)"
            : "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "24px",
        boxShadow:
          muiTheme.palette.mode === "dark"
            ? "0 12px 32px rgba(0, 0, 0, 0.6), 0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            : "0 12px 32px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
        border:
          muiTheme.palette.mode === "dark"
            ? "1px solid rgba(255, 255, 255, 0.15)"
            : "1px solid rgba(0, 0, 0, 0.08)",
        transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        overflow: "hidden",
        width: "fit-content",
        height: isOpen ? "auto" : "64px",
        padding: isOpen ? "16px 16px 8px 16px" : "8px",
      }}
    >
      {/* Settings Menu Items */}
      <Box
        className={`
          flex flex-col items-center gap-3 transition-all duration-300 ease-in-out
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        sx={{
          paddingBottom: isOpen ? "12px" : 0,
        }}
      >
        {/* Language Button */}
        <Box
          className={`
            transition-all duration-300 ease-in-out
            ${
              isOpen
                ? "transform translate-y-0 opacity-100"
                : "transform translate-y-4 opacity-0"
            }
          `}
          style={{ transitionDelay: isOpen ? "0.1s" : "0s" }}
        >
          <IconButton
            size="medium"
            onClick={handleLanguageChange}
            className="w-12 h-12 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
            sx={{
              backgroundColor:
                muiTheme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
              backdropFilter: "blur(8px)",
              border:
                muiTheme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.15)"
                  : "1px solid rgba(0, 0, 0, 0.08)",
              "&:hover": {
                backgroundColor:
                  muiTheme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(0, 0, 0, 0.1)",
                boxShadow:
                  muiTheme.palette.mode === "dark"
                    ? "0 8px 20px rgba(0, 0, 0, 0.4)"
                    : "0 8px 20px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <LanguageIcon
              fontSize="small"
              sx={{
                color: muiTheme.palette.mode === "dark" ? "#ffffff" : "#333333",
              }}
            />
          </IconButton>
        </Box>

        {/* Theme Button */}
        <Box
          className={`
            transition-all duration-300 ease-in-out
            ${
              isOpen
                ? "transform translate-y-0 opacity-100"
                : "transform translate-y-4 opacity-0"
            }
          `}
          style={{ transitionDelay: isOpen ? "0.2s" : "0s" }}
        >
          <IconButton
            size="medium"
            onClick={handleThemeChange}
            className="w-12 h-12 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
            sx={{
              backgroundColor:
                muiTheme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
              backdropFilter: "blur(8px)",
              border:
                muiTheme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.15)"
                  : "1px solid rgba(0, 0, 0, 0.08)",
              "&:hover": {
                backgroundColor:
                  muiTheme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(0, 0, 0, 0.1)",
                boxShadow:
                  muiTheme.palette.mode === "dark"
                    ? "0 8px 20px rgba(0, 0, 0, 0.4)"
                    : "0 8px 20px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <ThemeIcon
              fontSize="small"
              sx={{
                color: muiTheme.palette.mode === "dark" ? "#ffffff" : "#333333",
              }}
            />
          </IconButton>
        </Box>
      </Box>

      {/* Main Floating Action Button */}
      <IconButton
        onClick={toggleMenu}
        className="w-12 h-12 transition-all duration-300 hover:scale-105 active:scale-95"
        sx={{
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        }}
      >
        {isOpen ? (
          <CloseIcon sx={{ fontSize: 24 }} />
        ) : (
          <SettingsIcon sx={{ fontSize: 24 }} />
        )}
      </IconButton>
    </Box>
  );
};
