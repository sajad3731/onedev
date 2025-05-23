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
  IconButtonProps,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";

interface ExpandMoreProps extends IconButtonProps {
  expand: "true" | "false";
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  return <IconButton {...props} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => expand === "false",
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => expand === "true",
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

interface ExperienceCardProps {
  experience: Experience;
}

export const ExperienceCard: FC<ExperienceCardProps> = ({ experience }) => {
  const [expanded, setExpanded] = useState<"true" | "false">("false");

  const t = useTranslations("Experiences");
  const experienceT = useTranslations();

  const handleExpandClick = () => {
    setExpanded(expanded === "true" ? "false" : "true");
  };

  return (
    <Card>
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
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded === "true"} timeout="auto" unmountOnExit>
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
