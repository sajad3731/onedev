"use client";

import { Stack, Typography } from "@mui/material";
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

  // Add useEffect to handle client-side mounting
  useEffect(() => {
    setMounted(true);

    // Track scroll position to update active section
    const handleScroll = () => {
      const container = document.querySelector(".scroll-snap-container");
      if (!container) return;

      const scrollPosition = container.scrollTop;
      const headerHeight = window.innerWidth <= 600 ? 56 : 64;

      // Find which section is currently in view
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

    const container = document.querySelector(".scroll-snap-container");
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const t = useTranslations("Header");

  // Define navigation items with their corresponding section IDs
  const navItems = [
    { label: t("home"), sectionId: "home" },
    { label: t("projects"), sectionId: "projects" },
    { label: t("about"), sectionId: "about" },
    { label: t("contact"), sectionId: "contact" },
  ];

  return (
    <Box sx={{ display: "flex", direction: "ltr" }}>
      <AppBar component="nav">
        <Toolbar className="px-4">
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
                variant="h6"
                className="!font-extrabold cursor-default"
              >
                oneDev
              </Typography>
            </Box>

            {/* Settings group (language & theme) */}
            <Stack direction="row" alignItems="center">
              <LangSwitchBtn />
              <ThemeModeSwitchBtn />
            </Stack>

            {/* Logo for desktop - centered */}
            <div className="absolute aspect-[3/1] hidden lg:inline-block left-1/2 top-1/2 -translate-1/2">
              <Typography
                variant="h6"
                className="!font-extrabold cursor-default"
              >
                oneDev
              </Typography>
            </div>

            {/* Desktop navigation */}
            <div className="hidden sm:inline-flex items-center gap-x-2">
              {navItems.map((item) => (
                <NavItem
                  color="inherit"
                  key={item.label}
                  disableElevation
                  disableRipple
                  sectionId={item.sectionId}
                >
                  {item.label}
                </NavItem>
              ))}
            </div>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Mobile Bottom Navigation */}
      {mounted && <MobileBottomNav activeSection={activeSection} />}
      {mounted && <FloatingActionButton />}
    </Box>
  );
};
