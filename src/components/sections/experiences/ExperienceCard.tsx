import {
  CircleRounded,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";

interface ExperienceCardProps {
  experience: Experience;
}

export const ExperienceCard: FC<ExperienceCardProps> = ({ experience }) => {
  const [expanded, setExpanded] = useState(false);

  const t = useTranslations("Experiences");
  const experienceT = useTranslations();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      elevation={0}
      sx={{
        border: 0.5,
        borderColor: ({ palette }) => palette.action.disabledBackground,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          boxShadow: ({ palette }) =>
            palette.mode === "dark" ? `0 5px 10px #000` : `0 5px 10px #eee`,
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar src={experience.thumbnailUrl.src}>
            {experienceT(experience?.companyNameKey).substring(0, 1)}
          </Avatar>
        }
        title={
          <Typography className="text-right">
            {experienceT(experience?.companyNameKey)}
          </Typography>
        }
      />
      <CardContent>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
          className="text-right"
        >
          {experienceT(experience?.summaryKey)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className="w-full !rounded-xs">
        <IconButton
          aria-label="show more"
          className="w-full !rounded-xs"
          onClick={handleExpandClick}
        >
          <ExpandMoreIcon
            sx={{
              transition: ({ transitions }) =>
                transitions.create("transform", {
                  duration: transitions.duration.shortest,
                }),
              transform: expanded ? "rotate(180deg)" : "rotate(0)",
            }}
          />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {experience?.responsibilityKeys && (
            <div className="flex flex-col gap-y-2 items-start">
              <Typography variant="subtitle2">
                {t("responsibilities")}:
              </Typography>
              <List>
                {experience.responsibilityKeys.map((item, idx) => {
                  return (
                    <ListItem key={idx} disablePadding>
                      <ListItemIcon className="!min-w-[20px]">
                        <CircleRounded className="!text-[8px]" />
                      </ListItemIcon>
                      <ListItemText className="!my-0">
                        <Typography variant="caption">
                          {experienceT(item)}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          )}
          {experience?.descriptionKey && (
            <div className="flex flex-col gap-y-2 items-start">
              <Typography variant="subtitle2">
                {t("responsibilities")}:
              </Typography>
              <List>
                {experience.descriptionKey.map((item, idx) => {
                  return (
                    <Typography variant="subtitle1" key={idx}>
                      {experienceT(item)}
                    </Typography>
                  );
                })}
              </List>
            </div>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};
