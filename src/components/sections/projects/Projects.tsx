"use client";

import { DialogProps, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC, useState, useEffect } from "react";
import { ProjectCard } from "./ProjectCard";
import { ProjectGalleryModal } from "./ProjectGalleryModal";

interface ProjectsProps {
  projectsData: Project[];
}

export const Projects: FC<ProjectsProps> = ({ projectsData }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const t = useTranslations("HomePage.Projects");

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on initial load
    checkMobile();

    // Listen for resize events
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const launchedProjects = projectsData.filter(
    (project) => project.status === "launched"
  );
  const removedProjects = projectsData.filter(
    (project) => project.status === "removed"
  );

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDialog: DialogProps["onClose"] = () => {
    setSelectedProject(null);
  };

  return (
    <div className="flex flex-col gap-y-10 py-5">
      <Typography variant="h4" className="!font-bold !text-center mb-8">
        {t("my-projects")}
      </Typography>

      {/* Launched Projects */}
      {launchedProjects.length > 0 && (
        <div className="flex flex-col gap-y-1">
          <Typography
            variant="h5"
            className="!font-semibold !mb-6 text-green-600"
          >
            {t("launched-projects")}
          </Typography>

          {/* Modified grid with projects-grid class for CSS targeting */}
          <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {launchedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenGallery={handleOpenModal}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      )}

      {/* Removed Projects */}
      {removedProjects.length > 0 && (
        <div className="flex flex-col gap-y-1 mt-8">
          <Typography
            variant="h5"
            className="!font-semibold !mb-6 text-amber-600"
          >
            {t("coming-soon")}
          </Typography>

          {/* Same grid class for consistent targeting */}
          <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {removedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenGallery={handleOpenModal}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      )}

      <ProjectGalleryModal
        open={!!selectedProject}
        onClose={handleCloseDialog}
        selectedProject={selectedProject}
        fullScreen={isMobile} // Use fullscreen modal on mobile
      />
    </div>
  );
};
