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
      sx={{
        position: "fixed",
        bottom: 108, // Above the mobile nav
        right: isRtl ? undefined : 10,
        left: isRtl ? 10 : undefined,
        zIndex: 1200,
        display: { xs: "flex", sm: "none" }, // Only show on mobile
        flexDirection: "column",
        alignItems: "center",
        backgroundColor:
          muiTheme.palette.mode === "dark"
            ? "rgba(40, 40, 40, 0.3)"
            : "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        borderRadius: "50px",
        padding: "8px",
        boxShadow:
          muiTheme.palette.mode === "dark"
            ? "0 8px 24px rgba(0, 0, 0, 0.4)"
            : "0 8px 24px rgba(0, 0, 0, 0.15)",
        border:
          muiTheme.palette.mode === "dark"
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* Settings Menu Items */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          animation: isOpen
            ? "slideInBottomToTop 300ms cubic-bezier(0.34, 1.56, 0.64, 1) 1 normal"
            : "slideInBottomToTop 300ms cubic-bezier(0.34, 1.56, 0.64, 1) 1 reverse",
        }}
      >
        <IconButton size="small" onClick={handleLanguageChange}>
          <LanguageIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={handleThemeChange}>
          <ThemeIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Main Floating Action Button */}
      <IconButton
        color="primary"
        onClick={toggleMenu}
        sx={{
          width: 50,
          height: 50,
        }}
      >
        {isOpen ? (
          <CloseIcon
            sx={{
              fontSize: 28,
              transition: "transform 0.3s ease-in-out",
            }}
          />
        ) : (
          <SettingsIcon
            sx={{
              fontSize: 28,
              transition: "transform 0.3s ease-in-out",
            }}
          />
        )}
      </IconButton>
    </Box>
  );
};
