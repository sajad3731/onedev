import {
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Box,
} from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Launch, WorkOutline } from "@mui/icons-material";

interface ExperienceCardProps {
  experience: Experience;
  isMobile?: boolean;
}

export const ExperienceCard: FC<ExperienceCardProps> = ({
  experience,
  isMobile = false,
}) => {
  const {
    companyNameKey,
    summaryKey,
    thumbnailUrl,
    url,
    startDate,
    endDate,
    descriptionKeys,
    // Legacy fields for backward compatibility
    companyName: legacyCompanyName,
    summary: legacySummary,
    description: legacyDescription,
  } = experience;

  const t = useTranslations("Experiences");
  const experienceT = useTranslations();

  // Get translated content or fall back to legacy content for backward compatibility
  const companyName = companyNameKey
    ? experienceT(companyNameKey)
    : legacyCompanyName || "";
  const summary = summaryKey ? experienceT(summaryKey) : legacySummary || "";

  // Handle description - either from translation keys or legacy format
  let description: string[] = [];
  if (descriptionKeys && descriptionKeys.length > 0) {
    description = descriptionKeys.map((key) => experienceT(key));
  } else if (legacyDescription) {
    description = legacyDescription;
  }

  // Format date range
  const formatDateRange = () => {
    if (!startDate) return "";

    const start = startDate;
    const end = endDate || t("present");

    return `${start} - ${end}`;
  };

  // Shorter summary for mobile
  const displaySummary =
    isMobile && summary.length > 100
      ? `${summary.substring(0, 100)}...`
      : summary;

  return (
    <Card className="h-full flex flex-col transition-transform hover:scale-102 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <CardMedia component="div" className="relative h-full">
          <Image
            src={thumbnailUrl}
            alt={companyName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            {url && (
              <Button
                disableElevation
                color="inherit"
                variant="contained"
                component={Link}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<Launch />}
              >
                {t("visit-company")}
              </Button>
            )}
          </div>
        </CardMedia>
      </div>

      <CardContent className="flex-grow flex flex-col p-4">
        <div className="flex items-center gap-2 mb-2">
          <WorkOutline color="primary" fontSize="small" />
          <Typography className="!text-xl !font-semibold text-justify">
            {companyName}
          </Typography>
        </div>

        {formatDateRange() && (
          <Chip
            label={formatDateRange()}
            size="small"
            variant="outlined"
            className="!mb-3 !w-fit"
          />
        )}

        {summary && (
          <Typography className="!text-gray-600 !mb-3 text-justify">
            {displaySummary}
          </Typography>
        )}

        {description && description.length > 0 && (
          <Box className="flex-grow">
            <Typography variant="subtitle2" className="!font-semibold !mb-2">
              {t("responsibilities")}:
            </Typography>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              {description
                .slice(0, isMobile ? 3 : description.length)
                .map((item, index) => (
                  <li key={index} className="text-justify">
                    {item}
                  </li>
                ))}
              {isMobile && description.length > 3 && (
                <li className="text-blue-600 font-medium">
                  {t("and-more", { count: description.length - 3 })}
                </li>
              )}
            </ul>
          </Box>
        )}

        {url && (
          <Button
            disableElevation
            component={Link}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            fullWidth={isMobile}
            size={isMobile ? "small" : "medium"}
            startIcon={<Launch />}
            className="!mt-4"
          >
            {t("visit-company")}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
