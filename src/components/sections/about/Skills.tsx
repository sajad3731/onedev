import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC, memo, useMemo } from "react";

// Import resume data directly - no async needed
import resumeData from "@/data/my-resume.json";

// Technology icons mapping
const techIcons: Record<string, string> = {
  React: "⚛️",
  Redux: "🔄",
  TypeScript: "📘",
  Next: "▲",
  JavaScript: "📜",
  "HTML/CSS": "🎨",
  Git: "🌿",
  Tailwind: "🎭",
  "material UI": "🎨",
  i18n: "🌍",
  formik: "📝",
  "responsive design": "📱",
  Axios: "🌐",
  reachart: "📊",
  "react hook form": "📋",
  yup: "✅",
};

// Skill level mappings with qualitative indicators
const skillLevelMap = {
  استادی: {
    level: "Skills.excellentProficiency",
    color: "#4caf50",
    bgColor: "#4caf5015",
    borderColor: "#4caf5030",
  },
  ماهر: {
    level: "Skills.goodProficiency",
    color: "#2196f3",
    bgColor: "#2196f315",
    borderColor: "#2196f330",
  },
  کارآمد: {
    level: "Skills.partialProficiency",
    color: "#ff9800",
    bgColor: "#ff980015",
    borderColor: "#ff980030",
  },
};

interface SkillItemProps {
  skill: { name: string; level: string };
}

const SkillItem: FC<SkillItemProps> = memo(({ skill }) => {
  const skillLevel = skillLevelMap[skill.level as keyof typeof skillLevelMap];
  const icon = techIcons[skill.name] || "💻";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        padding: "12px 16px",
        borderRadius: "12px",
        background: skillLevel.bgColor,
        border: `1px solid ${skillLevel.borderColor}`,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: `0 1px 5px ${skillLevel.color}20`,
          border: `1px solid ${skillLevel.color}50`,
        },
      }}
    >
      <Box
        sx={{
          fontSize: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          backgroundColor: `${skillLevel.color}20`,
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      <Typography
        variant="body2"
        fontWeight="500"
        sx={{
          flex: 1,
          minWidth: 0,
        }}
      >
        {skill.name}
      </Typography>
    </Box>
  );
});

SkillItem.displayName = "SkillItem";

export const Skills: FC = memo(() => {
  const t = useTranslations("About");

  // Group skills by level directly from imported data - no async needed
  const skillsByLevel = useMemo(() => {
    const skills = resumeData.skills || [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return skills.reduce((acc: Record<string, any[]>, skill: any) => {
      const level = skill.level;
      if (!acc[level]) {
        acc[level] = [];
      }
      acc[level].push(skill);
      return acc;
    }, {});
  }, []); // Empty dependency array since resumeData is static

  const levelOrder = useMemo(() => ["استادی", "ماهر", "کارآمد"], []);

  return (
    <Box sx={{ mt: 3, mb: 3 }}>
      <Typography variant="h5" fontWeight="600" gutterBottom>
        {t("skills-title")}
      </Typography>

      {levelOrder.map((level) => {
        const levelSkills = skillsByLevel[level];
        if (!levelSkills || levelSkills.length === 0) return null;

        const levelConfig = skillLevelMap[level as keyof typeof skillLevelMap];

        return (
          <div key={level} className="mb-6 sm:px-6">
            <Box
              display="flex"
              alignItems="center"
              gap={1.5}
              mb={2}
              sx={{
                padding: "10px 16px",
                borderRadius: "10px",
                backgroundColor: levelConfig.bgColor,
                border: `1px solid ${levelConfig.borderColor}`,
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight="600"
                sx={{
                  color: levelConfig.color,
                  fontSize: "15px",
                }}
              >
                {t(`${levelConfig.level}`)}
              </Typography>
              <Box sx={{ flex: 1 }} />
            </Box>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {levelSkills.map((skill: { name: string; level: string }) => (
                <SkillItem key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        );
      })}
    </Box>
  );
});

Skills.displayName = "Skills";
