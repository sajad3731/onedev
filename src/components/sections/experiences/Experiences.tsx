"use client";

import { Alert, Divider, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC, memo } from "react";
import { WorkTimeline } from "./WorkTimeline";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { useExperiences } from "@/hooks/useDataManager";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export const Experiences: FC = memo(() => {
  const { experiences, loading, error } = useExperiences();
  const t = useTranslations("Experiences");
  const common_t = useTranslations("Common");

  if (loading) {
    return (
      <div className="flex flex-col gap-y-10 py-5">
        <Divider className="!my-10">
          <Typography variant="h4" className="!font-bold">
            {t("title")}
          </Typography>
        </Divider>
        <LoadingSpinner message={common_t("loading-experiences")} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-y-10 py-5">
        <Divider className="!my-10">
          <Typography variant="h4" className="!font-bold">
            {t("title")}
          </Typography>
        </Divider>
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col gap-y-10 py-5">
        <Divider className="!my-10">
          <Typography variant="h4" className="!font-bold">
            {t("title")}
          </Typography>
        </Divider>

        {experiences.length > 0 ? (
          <WorkTimeline experiences={experiences} />
        ) : (
          <div className="text-center py-8">
            <Typography variant="body1" color="text.secondary">
              {t("no-experiences-available")}
            </Typography>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
});

Experiences.displayName = "Experiences";
