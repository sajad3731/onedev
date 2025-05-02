"use client";

import { Send } from "@mui/icons-material";
import { Button, TextField, Alert, Snackbar, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const SendMessage: FC = () => {
  const t = useTranslations("Contact.form");
  const vt = useTranslations("Validation");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const validationSchema = z.object({
    name: z
      .string()
      .min(2, vt("least-character", { fieldName: t("name"), count: 2 })),
    phoneNumber: z
      .string()
      .min(10, vt("least-digit", { fieldName: t("phone-number"), count: 10 })),
    email: z.string().email(vt("invalid-email")),
    message: z
      .string()
      .min(10, vt("least-character", { fieldName: t("message"), count: 10 }))
      .max(
        500,
        vt("exceed-character", {
          fieldName: t("message"),
          count: 500,
        })
      ),
  });

  type FormValues = z.infer<typeof validationSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      message: "",
    },
    mode: "onChange",
  });

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
    setShowError(false);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);

    try {
      // Directly open email client with form data
      const subject = `Contact from ${data.name} via Portfolio`;
      const body = `Name: ${data.name}
Phone: ${data.phoneNumber}
Email: ${data.email}

Message:
${data.message}`;

      // Creating a mailto link and programmatically clicking it
      const mailtoLink = `mailto:sajad.mahdian@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;

      setShowSuccess(true);
      reset();
    } catch (error) {
      console.error("Error sending message:", error);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("name")}
            variant="outlined"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            required
            enterKeyHint="next"
          />
        )}
      />

      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("phone-number")}
            variant="outlined"
            fullWidth
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
            required
            enterKeyHint="next"
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("email")}
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            required
            enterKeyHint="next"
          />
        )}
      />

      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            minRows={5}
            maxRows={10}
            multiline
            label={t("message")}
            fullWidth
            enterKeyHint="send"
            tabIndex={4}
            error={!!errors.message}
            helperText={errors.message?.message}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        endIcon={<Send />}
        fullWidth
        disabled={isSubmitting}
      >
        {t("send-message")}
      </Button>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
        >
          {t("success") || "Message sent successfully!"}
        </Alert>
      </Snackbar>

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" variant="filled">
          {t("error") || "Failed to send message. Please try again."}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
