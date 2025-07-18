import { Box, CircularProgress, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
  fullPage?: boolean;
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  message,
  size = 40,
  fullPage = false,
}) => {
  const t = useTranslations("Common");

  message = message || t("loading");

  const content = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      p={3}
    >
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );

  if (fullPage) {
    return (
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="background.default"
        zIndex={9999}
      >
        {content}
      </Box>
    );
  }

  return content;
};
