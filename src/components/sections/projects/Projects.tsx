"use client";

import { DialogProps, Divider, Typography } from "@mui/material";
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

  const t = useTranslations("Projects");

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
  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDialog: DialogProps["onClose"] = () => {
    setSelectedProject(null);
  };

  return (
    <div className="flex flex-col gap-y-10 py-5">
      <Divider className="!my-10">
        <Typography variant="h4" className="!font-bold">
          {t("title")}
        </Typography>
      </Divider>

      {/* Launched Projects */}
      {launchedProjects.length > 0 && (
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
