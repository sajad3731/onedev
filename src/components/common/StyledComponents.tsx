// src/components/common/StyledComponents.tsx (FIXED - TypeScript Compatible)
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

// ========================================================================================
// Enhanced Button component - Fix TypeScript conflicts
// ========================================================================================

type CustomButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type CustomButtonSize = "sm" | "md" | "lg";

interface StyledButtonProps extends Omit<ButtonProps, "variant" | "size"> {
  variant?: CustomButtonVariant;
  size?: CustomButtonSize;
}

export const StyledButton = forwardRef<HTMLButtonElement, StyledButtonProps>(
  (
    { variant = "primary", size = "md", className, children, ...props },
    ref
  ) => {
    const baseClasses =
      "rounded-xl font-medium transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50";

    const variantClasses: Record<CustomButtonVariant, string> = {
      primary:
        "bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg",
      secondary:
        "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
      outline:
        "border-2 border-primary text-primary hover:bg-primary hover:text-white",
      ghost: "text-primary hover:bg-primary/10",
    };

    const sizeClasses: Record<CustomButtonSize, string> = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    // Map custom sizes to MUI sizes
    const muiSize: ButtonProps["size"] =
      size === "sm" ? "small" : size === "lg" ? "large" : "medium";

    return (
      <Button
        ref={ref}
        size={muiSize}
        variant="text" // Use MUI's text variant as base
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

// ========================================================================================
// Enhanced Card component - Fix TypeScript conflicts
// ========================================================================================

type CustomCardVariant = "default" | "outlined" | "elevated";

interface StyledCardProps extends Omit<CardProps, "variant"> {
  variant?: CustomCardVariant;
  interactive?: boolean;
}

export const StyledCard = forwardRef<HTMLDivElement, StyledCardProps>(
  (
    { variant = "default", interactive = false, className, children, ...props },
    ref
  ) => {
    const baseClasses = "rounded-2xl transition-all duration-300";

    const variantClasses: Record<CustomCardVariant, string> = {
      default: "bg-white dark:bg-gray-800 shadow-sm",
      outlined: "border border-gray-200 dark:border-gray-700",
      elevated: "shadow-lg hover:shadow-xl",
    };

    const interactiveClasses = interactive
      ? "hover:-translate-y-1 hover:shadow-xl cursor-pointer focus-within:ring-2 focus-within:ring-primary/50"
      : "";

    // Map custom variants to MUI variants
    const muiVariant: CardProps["variant"] =
      variant === "outlined" ? "outlined" : "elevation";

    return (
      <Card
        ref={ref}
        variant={muiVariant}
        elevation={variant === "elevated" ? 8 : variant === "default" ? 1 : 0}
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

// ========================================================================================
// Enhanced Typography component
// ========================================================================================

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

// ========================================================================================
// Enhanced Chip component - Fix TypeScript conflicts
// ========================================================================================

type CustomChipVariant = "filled" | "outlined" | "soft";
type CustomChipColor = "primary" | "success" | "warning" | "error" | "info";

interface StyledChipProps extends Omit<ChipProps, "variant"> {
  variant?: CustomChipVariant;
  colorScheme?: CustomChipColor;
}

export const StyledChip = forwardRef<HTMLDivElement, StyledChipProps>(
  (
    { variant = "filled", colorScheme = "primary", className, ...props },
    ref
  ) => {
    const baseClasses =
      "rounded-lg font-medium transition-all duration-200 hover:scale-105";

    // Define color schemes
    const colorSchemes: Record<
      CustomChipColor,
      { main: string; light: string; dark: string }
    > = {
      primary: { main: "#1976d2", light: "#42a5f5", dark: "#1565c0" },
      success: { main: "#2e7d32", light: "#4caf50", dark: "#1b5e20" },
      warning: { main: "#ed6c02", light: "#ff9800", dark: "#e65100" },
      error: { main: "#d32f2f", light: "#f44336", dark: "#c62828" },
      info: { main: "#0288d1", light: "#03a9f4", dark: "#01579b" },
    };

    const colors = colorSchemes[colorScheme];

    // Create variant styles
    const getVariantStyles = () => {
      switch (variant) {
        case "filled":
          return {
            backgroundColor: colors.main,
            color: "white",
            "&:hover": {
              backgroundColor: colors.dark,
            },
          };
        case "outlined":
          return {
            borderColor: colors.main,
            color: colors.main,
            backgroundColor: "transparent",
            border: `2px solid ${colors.main}`,
            "&:hover": {
              backgroundColor: `${colors.main}10`,
            },
          };
        case "soft":
          return {
            backgroundColor: `${colors.main}15`,
            color: colors.main,
            border: `1px solid ${colors.main}30`,
            "&:hover": {
              backgroundColor: `${colors.main}25`,
            },
          };
        default:
          return {};
      }
    };

    // Map custom variant to MUI variant
    const muiVariant: ChipProps["variant"] =
      variant === "outlined" ? "outlined" : "filled";

    return (
      <Chip
        ref={ref}
        variant={muiVariant}
        className={cn(baseClasses, className)}
        sx={getVariantStyles()}
        {...props}
      />
    );
  }
);

StyledChip.displayName = "StyledChip";

// ========================================================================================
// Alternative: Simple styled components without custom variants
// ========================================================================================

// If you prefer simpler components without custom variants, use these instead:

interface SimpleButtonProps extends ButtonProps {
  loading?: boolean;
}

export const SimpleButton = forwardRef<HTMLButtonElement, SimpleButtonProps>(
  ({ loading = false, disabled, children, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "rounded-xl font-medium transition-all duration-300 hover:-translate-y-0.5",
          "focus:outline-none focus:ring-2 focus:ring-primary/50",
          loading && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {loading ? "Loading..." : children}
      </Button>
    );
  }
);

SimpleButton.displayName = "SimpleButton";

interface SimpleCardProps extends CardProps {
  interactive?: boolean;
}

export const SimpleCard = forwardRef<HTMLDivElement, SimpleCardProps>(
  ({ interactive = false, className, children, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "rounded-2xl transition-all duration-300",
          interactive && "hover:-translate-y-1 hover:shadow-xl cursor-pointer",
          interactive && "focus-within:ring-2 focus-within:ring-primary/50",
          className
        )}
        {...props}
      >
        {children}
      </Card>
    );
  }
);

SimpleCard.displayName = "SimpleCard";
