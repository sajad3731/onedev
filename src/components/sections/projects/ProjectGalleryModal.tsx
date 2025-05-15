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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

interface ProjectGalleryDialog extends DialogProps {
  selectedProject: Project | null;
  fullScreen?: boolean;
}

export const ProjectGalleryModal: FC<ProjectGalleryDialog> = ({
  selectedProject,
  fullScreen = false,
  ...dialogProps
}) => {
  const t = useTranslations("Projects");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Determine if we should use fullscreen
  const useFullScreen = fullScreen || isMobile;

  return (
    <Dialog {...dialogProps} fullScreen={useFullScreen} maxWidth="md">
      <DialogTitle className="flex justify-between items-center p-4 border-b">
        <Typography>
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

      <DialogContent className="p-4 w-full">
        {selectedProject && selectedProject.images.length > 0 ? (
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            navigation={selectedProject.images.length > 1}
            modules={[Pagination, Navigation]}
            className="mySwiper w-full"
          >
            {selectedProject?.images.map((image, index) => (
              <SwiperSlide
                key={index}
                className="h-[300px] md:h-[400px] lg:h-[500px] relative"
              >
                <Image
                  src={image}
                  alt={`${selectedProject?.title} - Image ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Typography variant="body1" className="py-8 text-center">
            {t("no-images-available")}
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};
