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
  ButtonProps,
  Button,
} from "@mui/material";
import { Close, ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
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
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Determine if we should use fullscreen
  const useFullScreen = fullScreen || isMobile;

  return (
    <Dialog {...dialogProps} fullScreen={useFullScreen} maxWidth="lg">
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
          <div className="swiper-container relative">
            {/* Custom styling for the navigation buttons */}
            <style jsx global>{`
              .swiper-button-next,
              .swiper-button-prev {
                background-color: rgba(255, 255, 255, 0.7);
                width: 40px !important;
                height: 40px !important;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #000 !important;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
              }

              .swiper-button-next::after,
              .swiper-button-prev::after {
                display: none;
              }

              .swiper-pagination {
                margin-bottom: 10px !important;
              }

              .dark .swiper-button-next,
              .dark .swiper-button-prev {
                background-color: rgba(50, 50, 50, 0.7);
                color: #fff !important;
              }

              /* Position the arrows outside the content area */
              .swiper-button-next {
                right: 5px !important;
              }

              .swiper-button-prev {
                left: 5px !important;
              }

              /* Make sure the slides don't overlap with arrows */
              .swiper-slide {
                box-sizing: border-box;
              }
            `}</style>

            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper w-full"
            >
              {/* Custom navigation buttons */}
              {selectedProject.images.length > 1 && (
                <>
                  <div className="!hidden md:!flex swiper-button-prev">
                    <ArrowBackIos
                      style={{ width: "18px", marginRight: "-5px" }}
                    />
                  </div>
                  <div className="!hidden md:!flex swiper-button-next">
                    <ArrowForwardIos style={{ width: "18px" }} />
                  </div>
                </>
              )}

              {selectedProject?.images.map((image, index) => (
                <SwiperSlide
                  key={index}
                  className="relative"
                  style={{
                    height: isMobile
                      ? "calc(100vh - 150px)"
                      : useFullScreen
                      ? "400px"
                      : "800px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={image}
                      alt={`${selectedProject?.title} - Image ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      priority={index === 0} // Load first image with priority
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <Button
              fullWidth
              variant="contained"
              className="!mt-3 md:!hidden"
              onClick={dialogProps.onClose as ButtonProps["onClick"]}
            >
              {t("close-gallery")}
            </Button>
          </div>
        ) : (
          <Typography variant="body1" className="py-8 text-center">
            {t("no-images-available")}
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};
