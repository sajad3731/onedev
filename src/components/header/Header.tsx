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
import * as React from "react";
import { LangSwitchBtn } from "./LangSwitchBtn";
import { NavItem } from "./NavItems";
import { ThemeModeSwitchBtn } from "./ThemeModeSwitchBtn";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

export const Header: React.FC<Props> = ({ window }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const t = useTranslations("Header");

  const navItems = [t("home"), t("about"), t("contact")];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <div className="relative h-12 aspect-[16/7] mx-auto my-3">
        <Typography className="uppercase">onedev</Typography>
      </div>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
              <p className="font-extrabold ">oneDev</p>
            </div>
            <div className="hidden sm:inline-flex items-center gap-x-2">
              {navItems.map((item) => (
                <NavItem
                  color="inherit"
                  key={item}
                  disableElevation
                  disableRipple
                >
                  {item}
                </NavItem>
              ))}
            </div>
          </Stack>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
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
      </nav>
    </Box>
  );
};
