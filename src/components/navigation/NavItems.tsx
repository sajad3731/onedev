import Button, { type ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import React from "react";

const CustomButton = styled(Button)({
  "&:hover": {
    backgroundColor: "transparent", // Prevents background color change on hover
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

  return (
    <CustomButton variant="text" onClick={handleClick} {...props}>
      {children}
    </CustomButton>
  );
};
