import Button, { type ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import React from "react";

const CustomButton = styled(Button)({
  "&:hover": {
    backgroundColor: "transparent",
  },
});

interface NavItemProps extends ButtonProps {
  sectionId?: string;
}

export const NavItem: React.FC<NavItemProps> = ({
  children,
  sectionId,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (sectionId && typeof window !== "undefined") {
      const section = document.getElementById(sectionId);
      if (section) {
        const headerHeight = window.innerWidth <= 600 ? 56 : 64;
        const sectionTop = section.offsetTop;
        const offsetTop = sectionTop - headerHeight;

        // Use window.scrollTo instead of container
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <CustomButton variant="text" onClick={handleClick} {...props}>
      {children}
    </CustomButton>
  );
};
