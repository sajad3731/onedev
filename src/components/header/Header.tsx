"use client";

import MenuIcon from "@mui/icons-material/Menu";
import { Stack, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { useTranslations } from "next-intl";
import { FC, useEffect, useState } from "react";
import { LangSwitchBtn } from "./LangSwitchBtn";
import { NavItem } from "./NavItems";
import { ThemeModeSwitchBtn } from "./ThemeModeSwitchBtn";

const drawerWidth = 240;

export const Header: FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Add useEffect to handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const t = useTranslations("Header");

  // Define navigation items with their corresponding section IDs
  const navItems = [
    { label: t("home"), sectionId: "home" },
    { label: t("projects"), sectionId: "projects" },
    { label: t("about"), sectionId: "about" },
    { label: t("contact"), sectionId: "contact" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleDrawerItemClick = (sectionId: string) => {
    setMobileOpen(false);

    // Only run on client side
    if (typeof window !== "undefined") {
      const section = document.getElementById(sectionId);
      if (section) {
        // Get the header height based on viewport width
        const headerHeight = window.innerWidth <= 600 ? 56 : 64;

        // Calculate the position to scroll to
        const sectionTop = section.offsetTop;
        const offsetTop = sectionTop - headerHeight;

        // Use scrollTo with the container element
        const container = document.querySelector(".scroll-snap-container");
        if (container) {
          container.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <div className="relative h-12 aspect-[16/7] mx-auto my-3 flex flex-row justify-center items-center">
        <Typography variant="h6" className="!font-extrabold cursor-default">
          oneDev
        </Typography>
      </div>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => handleDrawerItemClick(item.sectionId)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", direction: "ltr" }}>
      <AppBar component="nav">
        <Toolbar className="px-0! sm:px-[16px]!">
          <Stack
            direction="row"
            justifyContent="space-between"
            className="w-full relative"
          >
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Stack direction="row" alignItems="center">
              <LangSwitchBtn />
              <ThemeModeSwitchBtn />
            </Stack>
            <div className="absolute aspect-[3/1] hidden lg:inline-block left-1/2 top-1/2 -translate-1/2">
              <Typography
                variant="h6"
                className="!font-extrabold cursor-default"
              >
                oneDev
              </Typography>
            </div>
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
      <nav>
        {/* Only render the drawer when mounted (client-side) */}
        {mounted && (
          <Drawer
            // Remove document.body reference
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            anchor="left"
            sx={{
              direction: "rtl !important",
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                right: 0,
              },
            }}
          >
            {drawer}
          </Drawer>
        )}
      </nav>
    </Box>
  );
};
