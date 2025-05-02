"use client";

import { Send } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const SendMessage: FC = () => {
  const t = useTranslations("Contact.form");
  const vt = useTranslations("Validation");

  const validationSchema = z.object({
    name: z
      .string()
      .min(2, vt("least-character", { fieldName: t("name"), count: 2 })),
    phoneNumber: z
      .number({
        required_error: vt("is-required", { fieldName: t("phone-number") }),
        invalid_type_error: vt("invalid-type", {
          fieldName: t("phone-number"),
          fieldType: t("number"),
        }),
      })
      .refine((val) => val.toString().length >= 10, {
        message: vt("least-digit", {
          fieldName: t("phone-number"),
          count: 10,
        }),
      }),
    email: z.string().email(vt("invalid-email")),
    message: z
      .string()
      .min(10, vt("least-character", { fieldName: t("message"), count: 10 }))
      .max(
        500,
        vt("exceed-character", {
          fieldName: t("message"),
          count: 1000,
        })
      ),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: "",
      phoneNumber: undefined as unknown as number, // Handle initial empty state
      email: "",
      message: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ContactForm> = (data) => {
    reset();
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
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
            />
          )}
        />
        <Controller
          name="email"
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
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          className="!mt-4"
          endIcon={<Send />}
          tabIndex={5}
          fullWidth
          loading={false}
        >
          {t("send-message")}
        </Button>
      </form>
    </div>
  );
};
