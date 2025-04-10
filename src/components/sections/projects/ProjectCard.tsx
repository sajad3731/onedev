import { Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface ProjectCardProps {
  project: Project;
  onOpenGallery: (project: Project) => void;
}

export const ProjectCard: FC<ProjectCardProps> = ({
  project,
  onOpenGallery,
}) => {
  const { title, description, thumbnailUrl, status, url, launchDate } = project;
  const t = useTranslations("HomePage.Projects");

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-48 overflow-hidden">
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
          >
            {status === "launched" ? t("view-images") : t("view-concept")}
          </Button>
        </div>
      </div>

      <div className="p-6">
        <Typography className="!text-xl !font-semibold !mb-2">
          {title}
        </Typography>
        <Typography className="!text-gray-600 !mb-4">{description}</Typography>
        {status === "launched" && url ? (
          <Button
            disableElevation
            component={Link}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
          >
            {t("visit-project")}
          </Button>
        ) : status === "launched" ? (
          <Button
            disableElevation
            color="secondary"
            onClick={() => onOpenGallery(project)}
            variant="contained"
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
      </div>
    </div>
  );
};
