"use client";

import { Container, Stack, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useTranslations } from "next-intl";
import { FC, useEffect, useState } from "react";
import { LangSwitchBtn } from "./LangSwitchBtn";
import { NavItem } from "./NavItems";
import { ThemeModeSwitchBtn } from "./ThemeModeSwitchBtn";
import { MobileBottomNav } from "./MobileBottomNav";
import { FloatingActionButton } from "./FloatingActionButton";

export const Header: FC = () => {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Add useEffect to handle client-side mounting and scroll detection
  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 250; // Adjust this value as needed (200-300px)

      // Update scroll state for header styling
      setIsScrolled(scrollPosition > scrollThreshold);

      // Track active section
      const headerHeight = isScrolled ? 64 : 80; // Adjust based on header height
      const sections = ["home", "projects", "about", "contact"];

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (!section) continue;

        const sectionTop = section.offsetTop - headerHeight;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    // Initial call to set correct state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  const t = useTranslations("Header");

  // Define navigation items with their corresponding section IDs
  const navItems = [
    { label: t("contact"), sectionId: "contact" },
    { label: t("projects"), sectionId: "projects" },
    { label: t("about"), sectionId: "about" },
    { label: t("home"), sectionId: "home" },
  ];

  return (
    <Box sx={{ display: "flex", direction: "ltr" }}>
      <AppBar
        component="nav"
        className="!hidden sm:!block"
        elevation={isScrolled ? 5 : 0}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          // Dynamic styling based on scroll state
          backgroundColor: "transparent",
          backdropFilter: isScrolled ? "blur(10px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(10px)" : "none", // Safari support
          // boxShadow: isScrolled ? "0 2px 8px rgba(0, 0, 0, 0.1)" : "none",
          transition: "all 0.3s ease-in-out",
          // Dark mode support
          ...(isScrolled && {
            "@media (prefers-color-scheme: dark)": {
              backgroundColor: "rgba(30, 30, 30, 0.8)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
            },
          }),
          // MUI dark theme support
          "&.MuiAppBar-root": {
            backgroundColor: isScrolled
              ? (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(30, 30, 30, 0.2)"
                    : "rgba(255, 255, 255, 0.2)"
              : "transparent",
          },
          height: isScrolled ? 64 : 100,
        }}
      >
        <Toolbar
          className="!h-full px-2 bg-transparent"
          sx={{
            transition: "all 0.3s ease-in-out",
          }}
        >
          <Container maxWidth="xl">
            <Stack
              direction="row"
              justifyContent="space-between"
              className="w-full relative"
            >
              {/* Logo for mobile - centered */}
              <Box
                sx={{
                  display: { xs: "flex", sm: "none" },
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <Typography
                  className="!font-extrabold cursor-default"
                  sx={{
                    color: "text.primary",
                    transition: "all 0.3s ease-in-out",
                    fontSize: isScrolled ? 20 : 30,
                  }}
                >
                  oneDev
                </Typography>
              </Box>

              {/* Settings group (language & theme) */}
              <Stack direction="row" alignItems="center" gap={1}>
                <LangSwitchBtn />
                <ThemeModeSwitchBtn />
              </Stack>

              {/* Logo for desktop - centered */}
              <div className="absolute aspect-[3/1] hidden lg:inline-block left-1/2 top-1/2 -translate-1/2">
                <Typography
                  className="!font-extrabold cursor-default"
                  sx={{
                    color: "text.primary",
                    transition: "all 0.3s ease-in-out",
                    fontSize: isScrolled ? 20 : 30,
                  }}
                >
                  oneDev
                </Typography>
              </div>

              {/* Desktop navigation */}
              <div className="hidden sm:inline-flex items-center gap-x-2">
                {navItems.map((item) => (
                  <NavItem
                    key={item.label}
                    disableElevation
                    disableRipple
                    sectionId={item.sectionId}
                    sx={{
                      color: "text.primary",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        backgroundColor: isScrolled
                          ? "rgba(0, 0, 0, 0.04)"
                          : "rgba(255, 255, 255, 0.1)",
                      },
                      fontSize: isScrolled ? 16 : 18,
                    }}
                  >
                    {item.label}
                  </NavItem>
                ))}
              </div>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>

      {/* Mobile Bottom Navigation */}
      {mounted && <MobileBottomNav activeSection={activeSection} />}
      {mounted && <FloatingActionButton />}
    </Box>
  );
};
