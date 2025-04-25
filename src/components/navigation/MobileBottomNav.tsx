import {
  ContactMail as ContactMailIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Work as WorkIcon,
  Brightness4 as ThemeIcon,
  Translate as LanguageIcon,
  Settings as SettingsIcon,
  ViewDay as SnapScrollIcon,
} from "@mui/icons-material";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Menu,
  MenuItem,
  Switch,
  Typography,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useScrollSettings } from "@/components/hooks/useScrollSettings";

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
  const { snapScrollEnabled, toggleSnapScroll } = useScrollSettings();
  const t = useTranslations("Header");

  // Main navigation items
  const navItems = [
    { label: t("home"), value: "home", icon: <HomeIcon /> },
    { label: t("projects"), value: "projects", icon: <WorkIcon /> },
    { label: t("about"), value: "about", icon: <InfoIcon /> },
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
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        display: { xs: "block", sm: "none" }, // Only show on mobile
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        sx={{
          height: "64px",
          "& .MuiBottomNavigationAction-root": {
            padding: "6px 0",
            minWidth: "auto",
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
            padding: "8px 0",
          },
        }}
      >
        {/* Theme Setting */}
        <MenuItem onClick={handleThemeChange} sx={{ height: "48px" }}>
          <ListItemIcon>
            <ThemeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={theme === "light" ? t("dark-mode") : t("light-mode")}
          />
        </MenuItem>

        {/* Snap Scrolling Setting */}
        <MenuItem onClick={toggleSnapScroll} sx={{ height: "48px" }}>
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

        <Divider />

        {/* Language Options */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ px: 2, py: 1, display: "block" }}
        >
          {t("select-language")}
        </Typography>

        <MenuItem
          onClick={() => handleLanguageChange("en")}
          selected={locale === "en"}
          sx={{ height: "40px" }}
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
          sx={{ height: "40px" }}
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
