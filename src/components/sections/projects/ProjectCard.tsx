import {
  Typography,
  CardContent,
  CardMedia,
  CardActions,
  Card,
  Button,
} from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FC, memo } from "react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onOpenGallery: (project: Project) => void;
  isMobile?: boolean;
}

export const ProjectCard: FC<ProjectCardProps> = memo(
  ({ project, onOpenGallery, isMobile = false }) => {
    const {
      titleKey,
      descriptionKey,
      thumbnailUrl,
      url,
      title: legacyTitle,
      description: legacyDescription,
    } = project;
    const t = useTranslations("Projects");
    const projectT = useTranslations();

    const title = titleKey ? projectT(titleKey) : legacyTitle || "";
    const description = descriptionKey
      ? projectT(descriptionKey)
      : legacyDescription || "";

    const displayDescription =
      isMobile && description.length > 80
        ? `${description.substring(0, 80)}...`
        : description;

    return (
      <Card
        variant="outlined"
        sx={{
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: ({ palette }) =>
              palette.mode === "dark" ? `0 5px 10px #000` : `0 5px 10px #eee`,
            transform: "translateY(-2px)",
          },
        }}
      >
        <CardMedia className="h-48 relative">
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </CardMedia>

        <CardContent className="flex-grow flex flex-col p-4 h-[180px]">
          <Typography className="!text-xl !font-semibold !mb-2 text-justify">
            {title}
          </Typography>
          <Typography className="!text-gray-600 dark:!text-gray-400 !mb-4 flex-grow text-justify">
            {displayDescription}
          </Typography>
        </CardContent>

        <CardActions className="p-4 pt-0 gap-2">
          <Button
            variant="contained"
            size="small"
            component={Link}
            href={url || "#"}
            // target="_blank"
            rel="noopener noreferrer"
            className={isMobile ? "flex-1" : ""}
          >
            {t("visit-project")}
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => onOpenGallery(project)}
            className={isMobile ? "flex-1" : ""}
          >
            {t("view-gallery")}
          </Button>
        </CardActions>
      </Card>
    );
  }
);

ProjectCard.displayName = "ProjectCard";
