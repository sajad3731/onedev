import Button, { type ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import React from "react";

const CustomButton = styled(Button)({
  "&:hover": {
    backgroundColor: "transparent", // Prevents background color change on hover
  },
});

export const NavItem: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <CustomButton variant="text" {...props}>
      {children}
    </CustomButton>
  );
};
