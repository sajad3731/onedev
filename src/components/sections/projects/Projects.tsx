"use client";

import { Alert, DialogProps, Divider, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC, useState, memo } from "react";
import { ProjectCard } from "./ProjectCard";
import { ProjectGalleryModal } from "./ProjectGalleryModal";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { useProjects } from "@/hooks/useDataManager";
import { useMobileDetection } from "@/hooks/useMobileDetection";
import type { Project } from "@/types";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export const Projects: FC = memo(() => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const isMobile = useMobileDetection();
  const { projects, loading, error, refetch } = useProjects();
  const t = useTranslations("Projects");

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDialog: DialogProps["onClose"] = () => {
    setSelectedProject(null);
  };

  const handleRetry = () => {
    refetch();
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-y-10 py-5">
        <Divider className="!my-10">
          <Typography variant="h4" className="!font-bold">
            {t("title")}
          </Typography>
        </Divider>
        <LoadingSpinner message="Loading projects..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-y-10 py-5">
        <Divider className="!my-10">
          <Typography variant="h4" className="!font-bold">
            {t("title")}
          </Typography>
        </Divider>
        <Alert
          severity="error"
          action={
            <button
              onClick={handleRetry}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Try Again
            </button>
          }
        >
          {error}
        </Alert>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col gap-y-10 py-5">
        <Divider className="!my-10">
          <Typography variant="h4" className="!font-bold">
            {t("title")}
          </Typography>
        </Divider>

        {projects.length > 0 ? (
          <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenGallery={handleOpenModal}
                isMobile={isMobile}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Typography variant="body1" color="text.secondary">
              No projects available at the moment.
            </Typography>
          </div>
        )}

        <ProjectGalleryModal
          open={!!selectedProject}
          onClose={handleCloseDialog}
          selectedProject={selectedProject}
          fullScreen={isMobile}
        />
      </div>
    </ErrorBoundary>
  );
});

Projects.displayName = "Projects";
