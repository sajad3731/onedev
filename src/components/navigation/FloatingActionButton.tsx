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
        right: isRtl ? undefined : 16,
        left: isRtl ? 16 : undefined,
        zIndex: 1200,
        display: { xs: "flex", sm: "none" }, // Only show on mobile
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor:
          muiTheme.palette.mode === "dark"
            ? "rgba(25, 25, 25, 0.7)"
            : "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        borderRadius: "33px",
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
      }}
      className={isOpen ? "expand-animation" : "contract-animation"}
    >
      {/* Settings Menu Items */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          paddingBottom: isOpen ? "20px" : 0,
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          transition: "opacity 0.2s ease-in-out, visibility 0.2s ease-in-out",
        }}
      >
        {/* Language Button */}
        <Box
          className={
            isOpen
              ? "menu-item-enter menu-item-1"
              : "menu-item-exit menu-item-1"
          }
          sx={{
            opacity: 0,
          }}
        >
          <IconButton
            size="medium"
            onClick={handleLanguageChange}
            sx={{
              width: 48,
              height: 48,
              // backgroundColor:
              //   muiTheme.palette.mode === "dark"
              //     ? "rgba(255, 255, 255, 0.1)"
              //     : "rgba(0, 0, 0, 0.05)",
              // backdropFilter: "blur(8px)",
              // border:
              //   muiTheme.palette.mode === "dark"
              //     ? "1px solid rgba(255, 255, 255, 0.15)"
              //     : "1px solid rgba(0, 0, 0, 0.08)",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor:
                  muiTheme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(0, 0, 0, 0.1)",
                transform: "scale(1.05)",
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
          className={
            isOpen
              ? "menu-item-enter menu-item-2"
              : "menu-item-exit menu-item-2"
          }
          sx={{
            opacity: 0,
          }}
        >
          <IconButton
            size="medium"
            onClick={handleThemeChange}
            sx={{
              width: 48,
              height: 48,
              // backgroundColor:
              //   muiTheme.palette.mode === "dark"
              //     ? "rgba(255, 255, 255, 0.1)"
              //     : "rgba(0, 0, 0, 0.05)",
              // backdropFilter: "blur(8px)",
              // border:
              //   muiTheme.palette.mode === "dark"
              //     ? "1px solid rgba(255, 255, 255, 0.15)"
              //     : "1px solid rgba(0, 0, 0, 0.08)",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor:
                  muiTheme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(0, 0, 0, 0.1)",
                transform: "scale(1.05)",
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
        className="!rounded-full"
        sx={{
          width: 56,
          height: 56,
          transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          "&:hover": {
            transform: "scale(1.05)",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
        }}
      >
        <Box
          className={isOpen ? "icon-rotate" : "icon-rotate-reverse"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isOpen ? (
            <CloseIcon
              sx={{
                fontSize: 28,
              }}
            />
          ) : (
            <SettingsIcon
              sx={{
                fontSize: 28,
              }}
            />
          )}
        </Box>
      </IconButton>
    </Box>
  );
};
