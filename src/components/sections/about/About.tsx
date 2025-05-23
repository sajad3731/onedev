import { Chip, Divider, Grid, Paper, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { DownloadResumeBtn } from "./DownloadResumeBtn";

export const About: FC = () => {
  const t = useTranslations("About");
  const skills = [
    { name: "React", level: "استادی" },
    { name: "Redux", level: "استادی" },
    { name: "TypeScript", level: "استادی" },
    { name: "Next.js", level: "کارآمد" },
    { name: "Material UI", level: "ماهر" },
    { name: "Tailwind", level: "ماهر" },
    { name: "i18n", level: "استادی" },
    { name: "JavaScript", level: "ماهر" },
    { name: "HTML/CSS", level: "ماهر" },
    { name: "Responsive Design", level: "استادی" },
    { name: "Git", level: "استادی" },
    { name: "Formik", level: "ماهر" },
    { name: "React Hook Form", level: "ماهر" },
    { name: "Yup", level: "استادی" },
    { name: "Axios", level: "ماهر" },
    { name: "Recharts", level: "ماهر" },
  ];

  // Group skills by proficiency level
  const skillsByLevel = skills.reduce((acc, skill) => {
    const level = skill.level;
    if (!acc[level]) {
      acc[level] = [];
    }
    acc[level].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="flex flex-col gap-y-5">
      <Divider className="!my-10">
        <Typography variant="h4" className="!font-bold">
          {t("title")}
        </Typography>
      </Divider>

      <Typography className="text-justify !leading-[40px]">
        {t("description")}
      </Typography>

      <Paper elevation={0} className="p-5 my-5 bg-gray-50 dark:bg-gray-800">
        <Typography variant="h6" className="!mb-4 !font-semibold">
          {t("skills-title")}
        </Typography>

        <Grid container spacing={3}>
          {Object.entries(skillsByLevel).map(([level, levelSkills]) => (
            <Grid size={{ xs: 12, md: 4 }} key={level}>
              <Typography variant="subtitle1" className="!mb-2 !font-medium">
                {level}:
              </Typography>
              <div className="flex flex-wrap gap-2">
                {levelSkills.map((skill) => (
                  <Chip
                    key={skill.name}
                    label={skill.name}
                    color="primary"
                    variant="outlined"
                    size="medium"
                    className="!m-1"
                  />
                ))}
              </div>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Typography className="text-justify !leading-[40px]">
        {t("guiding-to-resume")}
      </Typography>

      <div className="flex flex-col sm:flex-row items-center gap-5 justify-center mt-6 mb-10">
        <DownloadResumeBtn />
      </div>
    </div>
  );
};
