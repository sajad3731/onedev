"use client";

import {
  Container,
  Stack,
  Typography,
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {
  Settings as SettingsIcon,
  ViewDay as SnapScrollIcon,
} from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { FC, useEffect, useState } from "react";
import { LangSwitchBtn } from "./LangSwitchBtn";
import { NavItem } from "./NavItems";
import { ThemeModeSwitchBtn } from "./ThemeModeSwitchBtn";
import { MobileBottomNav } from "./MobileBottomNav";
import { FloatingActionButton } from "./FloatingActionButton";
import { useScrollSettings } from "@/components/hooks/useScrollSettings";

export const Header: FC = () => {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [settingsMenuAnchor, setSettingsMenuAnchor] =
    useState<null | HTMLElement>(null);
  const { snapScrollEnabled, toggleSnapScroll } = useScrollSettings();

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

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsMenuAnchor(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsMenuAnchor(null);
  };

  return (
    <Box sx={{ display: "flex", direction: "ltr" }}>
      <AppBar component="nav" className="!hidden sm:!block">
        <Toolbar className="px-4">
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
                  variant="h6"
                  className="!font-extrabold cursor-default"
                >
                  oneDev
                </Typography>
              </Box>

              {/* Settings group (language & theme) */}
              <Stack direction="row" alignItems="center" gap={1}>
                <LangSwitchBtn />
                <ThemeModeSwitchBtn />
                <Box
                  onClick={handleSettingsClick}
                  sx={{
                    cursor: "pointer",
                    padding: "8px",
                    borderRadius: "50%",
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.05)",
                    },
                  }}
                >
                  <SettingsIcon />
                </Box>

                {/* Settings Menu for Desktop */}
                <Menu
                  anchorEl={settingsMenuAnchor}
                  open={Boolean(settingsMenuAnchor)}
                  onClose={handleSettingsClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem
                    onClick={toggleSnapScroll}
                    sx={{ height: "48px", minWidth: "200px" }}
                  >
                    <ListItemIcon>
                      <SnapScrollIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={t("snap-scrolling")} />
                    <Switch
                      edge="end"
                      checked={snapScrollEnabled}
                      size="small"
                      onClick={(e) => e.stopPropagation()}
                      onChange={toggleSnapScroll}
                    />
                  </MenuItem>
                </Menu>
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
          </Container>
        </Toolbar>
      </AppBar>

      {/* Mobile Bottom Navigation */}
      {mounted && <MobileBottomNav activeSection={activeSection} />}
      {mounted && <FloatingActionButton />}
    </Box>
  );
};
