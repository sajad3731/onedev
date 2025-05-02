"use client";

import { Send } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC } from "react";

export const SendMessage: FC = () => {
  const t = useTranslations("Contact.form");

  return (
    <div className="flex flex-col gap-3 w-full">
      <TextField label={t("name")} name={t("name")} fullWidth />
      <TextField label={t("phone-number")} name={t("phone-number")} fullWidth />
      <TextField label={t("email")} name={t("email")} fullWidth />
      <TextField
        minRows={5}
        rows={10}
        multiline
        label={t("message")}
        name={t("message")}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        className="!mt-4"
        endIcon={<Send />}
      >
        {t("send-message")}
      </Button>
    </div>
  );
};
