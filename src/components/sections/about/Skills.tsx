"use client";

import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Typography,
  useTheme,
  Chip,
} from "@mui/material";
import { FC } from "react";
import { useTranslations } from "next-intl";

// Import resume data
import resumeData from "~/public/my-resume.json";

// Skill level mappings
const skillLevelMap = {
  استادی: { value: 90, color: "#4caf50", label: "Expert" },
  ماهر: { value: 75, color: "#2196f3", label: "Advanced" },
  کارآمد: { value: 60, color: "#ff9800", label: "Intermediate" },
};

// Technology icons mapping (you can expand this)
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

interface SkillItemProps {
  skill: { name: string; level: string };
  index: number;
}

const SkillItem: FC<SkillItemProps> = ({ skill, index }) => {
  const theme = useTheme();
  const skillLevel = skillLevelMap[skill.level as keyof typeof skillLevelMap];
  const icon = techIcons[skill.name] || "💻";

  return (
    <Card
      elevation={0}
      sx={{
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, rgba(66, 66, 66, 0.1) 0%, rgba(33, 33, 33, 0.1) 100%)"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(250, 250, 250, 0.8) 100%)",
        backdropFilter: "blur(10px)",
        border: `1px solid ${
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)"
        }`,
        borderRadius: "16px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
        "&:hover": {
          transform: "translateY(-8px) scale(1.02)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 20px 40px rgba(0, 0, 0, 0.3)"
              : "0 20px 40px rgba(0, 0, 0, 0.15)",
          border: `1px solid ${skillLevel.color}`,
        },
        "@keyframes slideIn": {
          "0%": {
            opacity: 0,
            transform: "translateY(30px) scale(0.9)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0) scale(1)",
          },
        },
      }}
    >
      <CardContent sx={{ padding: "20px !important" }}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Box
            sx={{
              fontSize: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: `linear-gradient(135deg, ${skillLevel.color}20, ${skillLevel.color}10)`,
              border: `2px solid ${skillLevel.color}30`,
            }}
          >
            {icon}
          </Box>
          <Box flex={1}>
            <Typography
              variant="h6"
              fontWeight="600"
              sx={{
                fontSize: "16px",
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, #ffffff, #e0e0e0)"
                    : "linear-gradient(135deg, #333333, #666666)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {skill.name}
            </Typography>
            <Chip
              label={skill.level}
              size="small"
              sx={{
                backgroundColor: `${skillLevel.color}20`,
                color: skillLevel.color,
                fontWeight: "500",
                fontSize: "11px",
                height: "20px",
                border: `1px solid ${skillLevel.color}40`,
              }}
            />
          </Box>
        </Box>

        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="body2" color="text.secondary" fontSize="12px">
              مهارت
            </Typography>
            <Typography
              variant="body2"
              fontWeight="600"
              sx={{ color: skillLevel.color }}
            >
              {skillLevel.value}%
            </Typography>
          </Box>

          <Box position="relative">
            <LinearProgress
              variant="determinate"
              value={skillLevel.value}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 3,
                  background: `linear-gradient(90deg, ${skillLevel.color}, ${skillLevel.color}dd)`,
                  animation: "fillProgress 2s ease-out",
                },
                "@keyframes fillProgress": {
                  "0%": { transform: "scaleX(0)" },
                  "100%": { transform: "scaleX(1)" },
                },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "-2px",
                left: `${skillLevel.value}%`,
                transform: "translateX(-50%)",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: skillLevel.color,
                boxShadow: `0 0 0 3px ${skillLevel.color}30`,
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%, 100%": {
                    boxShadow: `0 0 0 3px ${skillLevel.color}30`,
                    transform: "translateX(-50%) scale(1)",
                  },
                  "50%": {
                    boxShadow: `0 0 0 6px ${skillLevel.color}20`,
                    transform: "translateX(-50%) scale(1.2)",
                  },
                },
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export const Skills: FC = () => {
  const t = useTranslations("About");
  const theme = useTheme();

  // Use skills from resume data
  const skills = resumeData.skills;

  // Group skills by level for display
  const skillsByLevel = skills.reduce((acc, skill) => {
    const level = skill.level;
    if (!acc[level]) {
      acc[level] = [];
    }
    acc[level].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  // Define order of skill levels
  const levelOrder = ["استادی", "ماهر", "کارآمد"];

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h5"
          fontWeight="700"
          sx={{
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, #ffffff, #e0e0e0)"
                : "linear-gradient(135deg, #333333, #666666)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            mb: 1,
          }}
        >
          {t("skills-title")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          تکنولوژی‌ها و ابزارهایی که با آن‌ها کار می‌کنم
        </Typography>
      </Box>

      {levelOrder.map((level) => {
        const levelSkills = skillsByLevel[level];
        if (!levelSkills || levelSkills.length === 0) return null;

        const levelConfig = skillLevelMap[level as keyof typeof skillLevelMap];

        return (
          <Box key={level} mb={5}>
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              mb={3}
              sx={{
                padding: "12px 20px",
                borderRadius: "12px",
                background:
                  theme.palette.mode === "dark"
                    ? `linear-gradient(135deg, ${levelConfig.color}15, ${levelConfig.color}05)`
                    : `linear-gradient(135deg, ${levelConfig.color}10, ${levelConfig.color}05)`,
                border: `1px solid ${levelConfig.color}30`,
              }}
            >
              <Box
                sx={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: levelConfig.color,
                  boxShadow: `0 0 0 4px ${levelConfig.color}30`,
                }}
              />
              <Typography
                variant="h6"
                fontWeight="600"
                sx={{ color: levelConfig.color }}
              >
                {level}
              </Typography>
              <Chip
                label={`${levelSkills.length} مهارت`}
                size="small"
                sx={{
                  backgroundColor: `${levelConfig.color}20`,
                  color: levelConfig.color,
                  fontSize: "11px",
                  height: "24px",
                }}
              />
            </Box>

            <Box
              display="grid"
              gridTemplateColumns={{
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={3}
            >
              {levelSkills.map((skill, index) => (
                <SkillItem key={skill.name} skill={skill} index={index} />
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
