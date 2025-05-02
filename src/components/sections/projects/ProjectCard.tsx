import {
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { PhotoLibrary } from "@mui/icons-material";

interface ProjectCardProps {
  project: Project;
  onOpenGallery: (project: Project) => void;
  isMobile?: boolean;
}

export const ProjectCard: FC<ProjectCardProps> = ({
  project,
  onOpenGallery,
  isMobile = false,
}) => {
  const { title, description, thumbnailUrl, status, url, launchDate } = project;
  const t = useTranslations("Projects");

  // Shorter description for mobile
  const displayDescription =
    isMobile && description.length > 80
      ? `${description.substring(0, 80)}...`
      : description;

  return (
    <Card className="h-full flex flex-col transition-transform hover:scale-102 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <CardMedia component="div" className="relative h-full">
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <Button
              disableElevation
              color="inherit"
              variant="contained"
              onClick={() => onOpenGallery(project)}
              startIcon={<PhotoLibrary />}
            >
              {status === "launched" ? t("view-images") : t("view-concept")}
            </Button>
          </div>
        </CardMedia>
      </div>

      <CardContent className="flex-grow flex flex-col p-4">
        <Typography className="!text-xl !font-semibold !mb-2">
          {title}
        </Typography>
        <Typography className="!text-gray-600 !mb-4 flex-grow">
          {displayDescription}
        </Typography>

        {status === "launched" && url ? (
          <Button
            disableElevation
            component={Link}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            fullWidth={isMobile}
            size={isMobile ? "small" : "medium"}
          >
            {t("visit-project")}
          </Button>
        ) : status === "launched" ? (
          <Button
            disableElevation
            color="secondary"
            onClick={() => onOpenGallery(project)}
            variant="contained"
            fullWidth={isMobile}
            size={isMobile ? "small" : "medium"}
          >
            {t("view-gallery")}
          </Button>
        ) : (
          <div className="flex flex-row gap-x-1 items-center text-amber-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <Typography variant="caption">
              {t("launching")} {launchDate}
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
