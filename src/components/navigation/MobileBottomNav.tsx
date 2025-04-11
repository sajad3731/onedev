import {
  ContactMail as ContactMailIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Work as WorkIcon,
  Brightness4 as ThemeIcon,
  Translate as LanguageIcon,
} from "@mui/icons-material";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Menu,
  MenuItem,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";

interface MobileBottomNavProps {
  activeSection?: string;
}

export const MobileBottomNav: FC<MobileBottomNavProps> = ({
  activeSection = "home",
}) => {
  const [value, setValue] = useState(activeSection);
  const [langMenuAnchor, setLangMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Header");

  // Main navigation items
  const navItems = [
    { label: t("home"), value: "home", icon: <HomeIcon /> },
    { label: t("projects"), value: "projects", icon: <WorkIcon /> },
    { label: t("about"), value: "about", icon: <InfoIcon /> },
    { label: t("contact"), value: "contact", icon: <ContactMailIcon /> },
  ];

  // Handle language menu
  const handleLangMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLangMenuAnchor(event.currentTarget);
  };

  const handleLangMenuClose = () => {
    setLangMenuAnchor(null);
  };

  const handleLanguageChange = (newLocale: string) => {
    const currentLocale = pathname.split("/")[1];
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
    handleLangMenuClose();
  };

  // Handle theme switch
  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.cookie = `theme=${theme}; path=/; max-age=31536000`;
    router.refresh();
  };

  // Handle navigation change
  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    // Special handling for settings buttons
    if (newValue === "language") {
      return; // Don't change active tab, just show menu
    }

    if (newValue === "theme") {
      handleThemeChange();
      return; // Don't change active tab
    }

    setValue(newValue);

    // Handle navigation to section
    if (typeof window !== "undefined") {
      const section = document.getElementById(newValue);
      if (section) {
        const headerHeight = window.innerWidth <= 600 ? 56 : 64;
        const sectionTop = section.offsetTop;
        const offsetTop = sectionTop - headerHeight;

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

  // Update active section based on scroll position
  useEffect(() => {
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
          setValue(sectionId);
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
        {/* Add language selector */}
        <BottomNavigationAction
          label={locale === "en" ? "Lang" : "زبان"}
          value="language"
          icon={<LanguageIcon />}
          onClick={handleLangMenuOpen}
        />

        {/* Add theme toggle */}
        <BottomNavigationAction
          label={theme === "light" ? "Dark" : "Light"}
          value="theme"
          icon={<ThemeIcon />}
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

      {/* Language menu */}
      <Menu
        anchorEl={langMenuAnchor}
        open={Boolean(langMenuAnchor)}
        onClose={handleLangMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <MenuItem
          onClick={() => handleLanguageChange("en")}
          selected={locale === "en"}
        >
          English
        </MenuItem>
        <MenuItem
          onClick={() => handleLanguageChange("fa")}
          selected={locale === "fa"}
        >
          فارسی
        </MenuItem>
      </Menu>
    </Paper>
  );
};
