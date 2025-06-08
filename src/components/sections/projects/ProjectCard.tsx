import { Typography, CardContent, CardMedia, CardActions } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FC, memo } from "react";
import { StyledCard, StyledButton } from "@/components/common/StyledComponents";
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
      <StyledCard
        variant="outlined"
        interactive
        className="h-full flex flex-col"
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
          <StyledButton
            variant="primary"
            size="sm"
            component={Link}
            href={url || "#"}
            // target="_blank"
            rel="noopener noreferrer"
            className={isMobile ? "flex-1" : ""}
          >
            {t("visit-project")}
          </StyledButton>
          <StyledButton
            variant="outline"
            size="sm"
            onClick={() => onOpenGallery(project)}
            className={isMobile ? "flex-1" : ""}
          >
            {t("view-gallery")}
          </StyledButton>
        </CardActions>
      </StyledCard>
    );
  }
);

ProjectCard.displayName = "ProjectCard";
