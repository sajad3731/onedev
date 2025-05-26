import {
  ContactMail as ContactMailIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Translate as LanguageIcon,
  Settings as SettingsIcon,
  Brightness4 as ThemeIcon,
  Work as WorkIcon,
} from "@mui/icons-material";
import {
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { FC, SyntheticEvent, useEffect, useState } from "react";

interface MobileBottomNavProps {
  activeSection?: string;
}

export const MobileBottomNav: FC<MobileBottomNavProps> = ({
  activeSection = "home",
}) => {
  const [value, setValue] = useState(activeSection);
  const [settingsMenuAnchor, setSettingsMenuAnchor] =
    useState<null | HTMLElement>(null);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Header");

  // Main navigation items
  const navItems = [
    { label: t("home"), value: "home", icon: <HomeIcon /> },
    { label: t("about"), value: "about", icon: <InfoIcon /> },
    { label: t("projects"), value: "projects", icon: <WorkIcon /> },
    { label: t("contact"), value: "contact", icon: <ContactMailIcon /> },
  ];

  // Handle settings menu
  const handleSettingsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsMenuAnchor(event.currentTarget);
  };

  const handleSettingsMenuClose = () => {
    setSettingsMenuAnchor(null);
  };

  const handleLanguageChange = (newLocale: string) => {
    const currentLocale = pathname.split("/")[1];
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
    handleSettingsMenuClose();
  };

  // Handle theme switch
  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.cookie = `theme=${
      theme === "light" ? "dark" : "light"
    }; path=/; max-age=31536000`;
    router.refresh();
  };

  // Handle navigation change
  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    // Special handling for settings button
    if (newValue === "settings") {
      return; // Don't change active tab, just show menu
    }

    setValue(newValue);

    // Handle navigation to section
    if (typeof window !== "undefined") {
      const section = document.getElementById(newValue);
      if (section) {
        const headerHeight = window.innerWidth <= 600 ? 56 : 64;
        const sectionTop = section.offsetTop;
        const offsetTop = sectionTop - headerHeight;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const headerHeight = window.innerWidth <= 600 ? 56 : 64;

      // Find which section is currently in view
      const sections = ["home", "projects", "about", "contact"];
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (!section) continue;

        const sectionTop = section.offsetTop - headerHeight;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setValue(sectionId);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Paper
      elevation={0}
      sx={{
        position: "fixed",
        bottom: 12, // Add space from bottom
        left: 12, // Add space from left
        right: 12, // Add space from right
        zIndex: 1100,
        display: { xs: "block", sm: "none" }, // Only show on mobile
        borderRadius: "50px", // More rounded for mobile
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(30, 30, 30, 0.95)"
            : "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)"
            : "0 8px 32px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)",
        border: (theme) =>
          theme.palette.mode === "dark"
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(0, 0, 0, 0.08)",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        sx={{
          height: "72px", // Slightly taller for better touch targets
          backgroundColor: "transparent",
          borderRadius: "50px", // Match parent border radius
          "& .MuiBottomNavigationAction-root": {
            padding: "8px 4px",
            minWidth: "auto",
            borderRadius: "12px",
            margin: "4px 2px",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.04)",
              transform: "translateY(-1px)",
            },
            "&.Mui-selected": {
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.12)"
                  : "rgba(0, 0, 0, 0.06)",
              "& .MuiBottomNavigationAction-label": {
                fontSize: "12px",
                fontWeight: 600,
              },
            },
            "& .MuiBottomNavigationAction-label": {
              fontSize: "11px",
              fontWeight: 500,
              marginTop: "4px",
            },
            "& .MuiSvgIcon-root": {
              fontSize: "22px",
            },
          },
        }}
      >
        {/* Settings button */}
        <BottomNavigationAction
          label={t("settings")}
          value="settings"
          icon={<SettingsIcon />}
          onClick={handleSettingsMenuOpen}
        />

        {/* Main navigation items */}
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.value}
            label={item.label}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>

      {/* Settings menu */}
      <Menu
        anchorEl={settingsMenuAnchor}
        open={Boolean(settingsMenuAnchor)}
        onClose={handleSettingsMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        PaperProps={{
          sx: {
            width: "250px",
            padding: "8px",
            borderRadius: "16px",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(40, 40, 40, 0.95)"
                : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 8px 32px rgba(0, 0, 0, 0.6)"
                : "0 8px 32px rgba(0, 0, 0, 0.15)",
            border: (theme) =>
              theme.palette.mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.08)",
          },
        }}
      >
        {/* Theme Setting */}
        <MenuItem
          onClick={handleThemeChange}
          sx={{
            height: "48px",
            borderRadius: "12px",
            marginBottom: "4px",
            "&:hover": {
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          <ListItemIcon>
            <ThemeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={theme === "light" ? t("dark-mode") : t("light-mode")}
          />
        </MenuItem>

        <Divider sx={{ margin: "8px 0", borderRadius: "1px" }} />

        {/* Language Options */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ px: 2, py: 1, display: "block", fontWeight: 500 }}
        >
          {t("select-language")}
        </Typography>

        <MenuItem
          onClick={() => handleLanguageChange("en")}
          selected={locale === "en"}
          sx={{
            height: "40px",
            borderRadius: "12px",
            marginBottom: "4px",
            "&:hover": {
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          <ListItemIcon>
            {locale === "en" && (
              <LanguageIcon fontSize="small" color="primary" />
            )}
          </ListItemIcon>
          <ListItemText primary="English" />
        </MenuItem>

        <MenuItem
          onClick={() => handleLanguageChange("fa")}
          selected={locale === "fa"}
          sx={{
            height: "40px",
            borderRadius: "12px",
            "&:hover": {
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          <ListItemIcon>
            {locale === "fa" && (
              <LanguageIcon fontSize="small" color="primary" />
            )}
          </ListItemIcon>
          <ListItemText primary="فارسی" />
        </MenuItem>
      </Menu>
    </Paper>
  );
};
