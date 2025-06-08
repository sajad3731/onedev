import {
  Button,
  ButtonProps,
  Card,
  CardProps,
  Typography,
  TypographyProps,
  Chip,
  ChipProps,
} from "@mui/material";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// Enhanced Button component
interface StyledButtonProps extends Omit<ButtonProps, "variant"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const StyledButton = forwardRef<HTMLButtonElement, StyledButtonProps>(
  (
    { variant = "primary", size = "md", className, children, ...props },
    ref
  ) => {
    const baseClasses =
      "rounded-xl font-medium transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50";

    const variantClasses = {
      primary:
        "bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg",
      secondary:
        "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
      outline:
        "border-2 border-primary text-primary hover:bg-primary hover:text-white",
      ghost: "text-primary hover:bg-primary/10",
    };

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <Button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

StyledButton.displayName = "StyledButton";

// Enhanced Card component
interface StyledCardProps extends CardProps {
  variant?: "default" | "outlined" | "elevated";
  interactive?: boolean;
}

export const StyledCard = forwardRef<HTMLDivElement, StyledCardProps>(
  (
    { variant = "default", interactive = false, className, children, ...props },
    ref
  ) => {
    const baseClasses = "rounded-2xl transition-all duration-300";

    const variantClasses = {
      default: "bg-white dark:bg-gray-800 shadow-sm",
      outlined: "border border-gray-200 dark:border-gray-700",
      elevated: "shadow-lg hover:shadow-xl",
    };

    const interactiveClasses = interactive
      ? "hover:-translate-y-1 hover:shadow-xl cursor-pointer focus-within:ring-2 focus-within:ring-primary/50"
      : "";

    return (
      <Card
        ref={ref}
        elevation={0}
        className={cn(
          baseClasses,
          variantClasses[variant],
          interactiveClasses,
          className
        )}
        {...props}
      >
        {children}
      </Card>
    );
  }
);

StyledCard.displayName = "StyledCard";

// Enhanced Typography component
interface StyledTypographyProps extends TypographyProps {
  gradient?: boolean;
}

export const StyledTypography = forwardRef<
  HTMLSpanElement,
  StyledTypographyProps
>(({ gradient = false, className, children, ...props }, ref) => {
  const gradientClasses = gradient
    ? "bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent font-bold"
    : "";

  return (
    <Typography ref={ref} className={cn(gradientClasses, className)} {...props}>
      {children}
    </Typography>
  );
});

StyledTypography.displayName = "StyledTypography";

// Enhanced Chip component
interface StyledChipProps extends ChipProps {
  variant?: "filled" | "outlined" | "soft";
  colorScheme?: "primary" | "success" | "warning" | "error" | "info";
}

export const StyledChip = forwardRef<HTMLDivElement, StyledChipProps>(
  (
    { variant = "filled", colorScheme = "primary", className, ...props },
    ref
  ) => {
    const baseClasses =
      "rounded-lg font-medium transition-all duration-200 hover:scale-105";

    const variantClasses = {
      filled: `bg-${colorScheme} text-white`,
      outlined: `border-2 border-${colorScheme} text-${colorScheme} bg-transparent`,
      soft: `bg-${colorScheme}/10 text-${colorScheme} border border-${colorScheme}/20`,
    };

    return (
      <Chip
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], className)}
        {...props}
      />
    );
  }
);

StyledChip.displayName = "StyledChip";
