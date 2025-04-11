"use client";

import { DialogProps, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { ProjectGalleryModal } from "./ProjectGalleryModal";

interface ProjectsProps {
  projectsData: Project[];
}

export const Projects: FC<ProjectsProps> = ({ projectsData }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const t = useTranslations("HomePage.Projects");

  const launchedProjects = projectsData.filter(
    (project) => project.status === "launched"
  );
  const upcomingProjects = projectsData.filter(
    (project) => project.status === "upcoming"
  );

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDialog: DialogProps["onClose"] = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <Typography variant="h4" className="!font-bold !text-center !mb-12">
          {t("my-projects")}
        </Typography>

        {/* Launched Projects */}
        {launchedProjects.length > 0 && (
          <div className="mb-16">
            <Typography
              variant="h5"
              className="!font-semibold !mb-6 text-green-600"
            >
              {t("launched-projects")}
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {launchedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenGallery={handleOpenModal}
                />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Projects */}
        {upcomingProjects.length > 0 && (
          <div>
            <Typography
              variant="h5"
              className="!font-semibold !mb-6 text-amber-600"
            >
              {t("coming-soon")}
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenGallery={handleOpenModal}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <ProjectGalleryModal
        open={!!selectedProject}
        onClose={handleCloseDialog}
        selectedProject={selectedProject!}
      />
    </>
  );
};
