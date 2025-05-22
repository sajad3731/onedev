import { Divider, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface ExperiencesProps {
  experiencesData: Experience[];
}

export const Experiences: FC<ExperiencesProps> = ({ experiencesData }) => {
  const t = useTranslations("Experiences");

  return (
    <div className="flex flex-col gap-y-10 py-5">
      <Divider className="!my-10">
        <Typography variant="h4" className="!font-bold">
          {t("title")}
        </Typography>
      </Divider>

      {experiencesData.length > 0 && (
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* {launchedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenGallery={handleOpenModal}
            isMobile={isMobile}
          />
        ))} */}
        </div>
      )}

      {/* <ProjectGalleryModal
        open={!!selectedProject}
        onClose={handleCloseDialog}
        selectedProject={selectedProject}
        fullScreen={isMobile} // Use fullscreen modal on mobile
      /> */}
    </div>
  );
};
