"use client";

import { Container, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useTranslations } from "next-intl";
import { FC, useEffect, useState } from "react";
import { LangSwitchBtn } from "./LangSwitchBtn";
import { NavItem } from "./NavItems";
import { ThemeModeSwitchBtn } from "./ThemeModeSwitchBtn";
import { MobileBottomNav } from "./MobileBottomNav";
import { FloatingSettingsButton } from "./FloatingActionButton";

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
      const sections = ["home", "about", "experience", "projects", "contact"];

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

  // Define navigation items with their corresponding section IDs (added experiences)
  const navItems = [
    { label: t("contact"), sectionId: "contact" },
    { label: t("projects"), sectionId: "projects" },
    { label: t("experiences"), sectionId: "experience" },
    { label: t("about"), sectionId: "about" },
    { label: t("home"), sectionId: "home" },
  ];

  return (
    <Box sx={{ display: "flex", direction: "ltr" }}>
      <AppBar
        component="nav"
        className="!hidden sm:!block"
        elevation={0} // Always 0 elevation to maintain clean look
        sx={{
          position: "fixed",
          top: 12,
          left: 20,
          right: 20,
          zIndex: 1200,
          borderRadius: "50px",
          // Dynamic styling based on scroll state
          backgroundColor: isScrolled
            ? (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(30, 30, 30, 0.7)"
                  : "rgba(255, 255, 255, 0.7)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(5px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(5px)" : "none", // Safari support
          boxShadow: isScrolled
            ? (theme) =>
                theme.palette.mode === "dark"
                  ? "0 8px 32px rgba(0, 0, 0, 0.4)"
                  : "0 8px 32px rgba(0, 0, 0, 0.4)"
            : "none",
          border: isScrolled
            ? (theme) =>
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid rgba(0, 0, 0, 0.05)"
            : "none",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          height: isScrolled ? 64 : 80,
          // Smooth width transition
          width: "calc(100% - 40px)", // Account for left and right spacing
          maxWidth: isScrolled ? 1200 : 1400,
          margin: "0 auto",
        }}
      >
        <Toolbar
          className="!h-full px-4 bg-transparent"
          sx={{
            transition: "all 0.3s ease-in-out",
            borderRadius: "16px", // Match parent border radius
            padding: { xs: "0 16px", sm: "0 24px" }, // Responsive padding
          }}
        >
          <Container maxWidth="xl">
            <Stack
              direction="row"
              justifyContent="space-between"
              className="w-full relative"
            >
              {/* Settings group (language & theme) */}
              <Stack direction="row" alignItems="center" gap={1}>
                <LangSwitchBtn />
                <ThemeModeSwitchBtn />
              </Stack>

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
                      borderRadius: "12px",
                      padding: "8px 16px",
                      "&:hover": {
                        backgroundColor: isScrolled
                          ? (theme) =>
                              theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.05)"
                          : "rgba(255, 255, 255, 0.15)",
                        transform: "translateY(-1px)",
                      },
                      fontSize: isScrolled ? 16 : 18,
                      fontWeight: 500,
                      textShadow: !isScrolled
                        ? (theme) =>
                            theme.palette.mode === "dark"
                              ? "0 1px 4px rgba(0, 0, 0, 0.6)"
                              : "0 1px 4px rgba(0, 0, 0, 0.25)"
                        : "none",
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
      {mounted && (
        <>
          <MobileBottomNav activeSection={activeSection} />
          <FloatingSettingsButton />
        </>
      )}
    </Box>
  );
};
