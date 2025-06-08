import { useTranslations } from "next-intl";
import { FC, memo, useMemo } from "react";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import type { NavigationItem } from "@/types";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const CustomButton = styled(Button)({
  "&:hover": {
    backgroundColor: "transparent",
  },
});

interface NavigationItemsProps {
  isScrolled: boolean;
  activeSection: string;
}

export const NavigationItems: FC<NavigationItemsProps> = memo(
  ({ isScrolled, activeSection }) => {
    const t = useTranslations("Header");
    const scrollToSection = useScrollToSection();

    const navItems: NavigationItem[] = useMemo(
      () => [
        { label: t("contact"), sectionId: "contact" },
        { label: t("projects"), sectionId: "projects" },
        { label: t("experiences"), sectionId: "experience" },
        { label: t("about"), sectionId: "about" },
        { label: t("home"), sectionId: "home" },
      ],
      [t]
    );

    const handleNavClick = (sectionId: string) => {
      scrollToSection(sectionId);
    };

    return (
      <div className="hidden sm:inline-flex items-center gap-x-2">
        {navItems.map((item) => {
          const isActive = activeSection === item.sectionId;

          return (
            <CustomButton
              variant="text"
              key={item.label}
              disableElevation
              disableRipple
              onClick={() => handleNavClick(item.sectionId)}
              sx={{
                color: "text.primary",
                transition: "all 0.3s ease-in-out",
                borderRadius: "12px",
                padding: "8px 16px",
                backgroundColor: isActive
                  ? (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.05)"
                  : "transparent",
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
                fontWeight: isActive ? 600 : 500,
                textShadow: !isScrolled
                  ? (theme) =>
                      theme.palette.mode === "dark"
                        ? "0 1px 4px rgba(0, 0, 0, 0.6)"
                        : "0 1px 4px rgba(0, 0, 0, 0.25)"
                  : "none",
              }}
            >
              {item.label}
            </CustomButton>
          );
        })}
      </div>
    );
  }
);

NavigationItems.displayName = "NavigationItems";
