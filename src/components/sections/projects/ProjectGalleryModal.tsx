"use client";

import {
  Dialog,
  DialogProps,
  Typography,
  DialogTitle,
  DialogContent,
  useTheme,
  useMediaQuery,
  IconButton,
  IconProps,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FC } from "react";

interface ProjectGalleryDialog extends DialogProps {
  selectedProject: Project | null;
  fullScreen?: boolean;
}

export const ProjectGalleryModal: FC<ProjectGalleryDialog> = ({
  selectedProject,
  fullScreen = false,
  ...dialogProps
}) => {
  const t = useTranslations("HomePage.Projects");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Determine if we should use fullscreen
  const useFullScreen = fullScreen || isMobile;

  return (
    <Dialog {...dialogProps} fullScreen={useFullScreen} maxWidth="md">
      <DialogTitle className="flex justify-between items-center p-4 border-b">
        <Typography variant="h6">
          {selectedProject?.title} - {t("gallery")}
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={dialogProps.onClose as IconProps["onClick"]}
          aria-label="close"
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {selectedProject?.images.map((image, index) => (
            <div
              key={index}
              className="relative h-48 md:h-64 rounded-lg overflow-hidden"
            >
              <Image
                src={image}
                alt={`${selectedProject?.title} - Image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>

        <Typography variant="subtitle1" className="mt-4">
          {selectedProject?.status === "launched"
            ? "Detailed view of the project showing the main features and user interface elements."
            : "Concept designs and mockups for this upcoming project."}
        </Typography>

        {useFullScreen && (
          <div className="mt-6 flex justify-center">
            <IconButton
              onClick={dialogProps.onClose as IconProps["onClick"]}
              color="primary"
              size="large"
            >
              <Close />
              <Typography variant="button" className="ml-2">
                Close Gallery
              </Typography>
            </IconButton>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
