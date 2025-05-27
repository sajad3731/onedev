"use client";

import {
  Settings as SettingsIcon,
  Language as LanguageIcon,
  Brightness4 as ThemeIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import {
  Fab,
  IconButton,
  Box,
  Typography,
  useTheme as useMuiTheme,
} from "@mui/material";
import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { FC, useState, useEffect, useRef } from "react";

export const FloatingSettingsButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("Header");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const containerRef = useRef<HTMLDivElement>(null);

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
        right: 24,
        zIndex: 1200,
        display: { xs: "block", sm: "none" }, // Only show on mobile
      }}
    >
      {/* Settings Menu Items */}
      <Box
        sx={{
          position: "absolute",
          bottom: isOpen ? 80 : 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "scale(1)" : "scale(0.8)",
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transformOrigin: "bottom right",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {/* Language Toggle */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            backgroundColor:
              muiTheme.palette.mode === "dark"
                ? "rgba(40, 40, 40, 0.95)"
                : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "50px",
            padding: "8px 16px",
            boxShadow:
              muiTheme.palette.mode === "dark"
                ? "0 8px 24px rgba(0, 0, 0, 0.4)"
                : "0 8px 24px rgba(0, 0, 0, 0.15)",
            border:
              muiTheme.palette.mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.08)",
            animation: isOpen
              ? "slideInFromRight 0.3s ease-out 0.1s both"
              : "none",
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontSize: "12px", fontWeight: 500 }}
          >
            {locale === "en" ? "فارسی" : "English"}
          </Typography>
          <IconButton
            size="small"
            onClick={handleLanguageChange}
            sx={{
              width: 40,
              height: 40,
              backgroundColor: muiTheme.palette.primary.main,
              color: "white",
              "&:hover": {
                backgroundColor: muiTheme.palette.primary.dark,
                transform: "scale(1.1)",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            <LanguageIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Theme Toggle */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            backgroundColor:
              muiTheme.palette.mode === "dark"
                ? "rgba(40, 40, 40, 0.95)"
                : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "50px",
            padding: "8px 16px",
            boxShadow:
              muiTheme.palette.mode === "dark"
                ? "0 8px 24px rgba(0, 0, 0, 0.4)"
                : "0 8px 24px rgba(0, 0, 0, 0.15)",
            border:
              muiTheme.palette.mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.08)",
            animation: isOpen
              ? "slideInFromRight 0.3s ease-out 0.05s both"
              : "none",
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontSize: "12px", fontWeight: 500 }}
          >
            {theme === "light" ? t("dark-mode") : t("light-mode")}
          </Typography>
          <IconButton
            size="small"
            onClick={handleThemeChange}
            sx={{
              width: 40,
              height: 40,
              backgroundColor: muiTheme.palette.primary.main,
              color: "white",
              "&:hover": {
                backgroundColor: muiTheme.palette.primary.dark,
                transform: "scale(1.1)",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            <ThemeIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Main Floating Action Button */}
      <Fab
        color="primary"
        onClick={toggleMenu}
        sx={{
          width: 64,
          height: 64,
          backgroundColor: muiTheme.palette.primary.main,
          boxShadow:
            muiTheme.palette.mode === "dark"
              ? "0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)"
              : "0 8px 24px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          "&:hover": {
            transform: "translateY(-2px) scale(1.05)",
            boxShadow:
              muiTheme.palette.mode === "dark"
                ? "0 12px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.15)"
                : "0 12px 32px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08)",
          },
          "&:active": {
            transform: "translateY(0px) scale(0.95)",
          },
        }}
      >
        {isOpen ? (
          <CloseIcon
            sx={{
              fontSize: 28,
              transform: "rotate(90deg)",
              transition: "transform 0.3s ease-in-out",
            }}
          />
        ) : (
          <SettingsIcon
            sx={{
              fontSize: 28,
              transform: "rotate(0deg)",
              transition: "transform 0.3s ease-in-out",
            }}
          />
        )}
      </Fab>
    </Box>
  );
};
