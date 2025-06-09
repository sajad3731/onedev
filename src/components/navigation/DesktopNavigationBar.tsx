import { AppBar, Container, Stack, Toolbar } from "@mui/material";
import { FC, memo } from "react";
import { LangSwitchBtn } from "./LangSwitchBtn";
import { ThemeModeSwitchBtn } from "./ThemeModeSwitchBtn";
import { NavigationItems } from "./NavigationItems";

interface DesktopNavigationBarProps {
  isScrolled: boolean;
  activeSection: string;
}

export const DesktopNavigationBar: FC<DesktopNavigationBarProps> = memo(
  ({ isScrolled, activeSection }) => {
    return (
      <AppBar
        component="nav"
        className="!hidden sm:!block"
        elevation={0}
        sx={{
          position: "fixed",
          top: 12,
          left: 20,
          right: 20,
          zIndex: 1200,
          borderRadius: "50px",
          backgroundColor: isScrolled
            ? (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(30, 30, 30, 0.7)"
                  : "rgba(255, 255, 255, 0.7)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(5px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(5px)" : "none",
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
          width: "calc(100% - 40px)",
          maxWidth: isScrolled ? 1200 : 1400,
          margin: "0 auto",
        }}
      >
        <Toolbar className="!h-full px-4 bg-transparent">
          <Container maxWidth="xl">
            <Stack
              direction="row"
              justifyContent="space-between"
              className="w-full relative"
              sx={{ direction: "rtl" }}
            >
              <Stack direction="row" alignItems="center" gap={1}>
                <LangSwitchBtn />
                <ThemeModeSwitchBtn />
              </Stack>
              <NavigationItems
                isScrolled={isScrolled}
                activeSection={activeSection}
              />
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
    );
  }
);

DesktopNavigationBar.displayName = "DesktopNavigationBar";
