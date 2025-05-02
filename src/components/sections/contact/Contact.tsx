import { Email, Phone, Telegram, WhatsApp } from "@mui/icons-material";
import { Button, Container, Divider, Typography, Box } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { SendMessage } from "./SendMessage";

export const Contact: FC = () => {
  const t = useTranslations("Contact");

  // Format phone number for different services
  const phoneNumber = "+989213723236";
  const whatsappLink = `https://wa.me/${phoneNumber.replace("+", "")}`;
  const telegramLink = `https://t.me/sajad_mahdian`; // Using your username for Telegram
  const emailAddress = "sajad.mahdian@gmail.com";

  return (
    <Container maxWidth="lg" className="py-8">
      <div className="flex flex-col gap-y-6 w-full">
        <Divider className="!my-10">
          <Typography variant="h4" className="!font-bold">
            {t("title")}
          </Typography>
        </Divider>

        <Box className="mb-6">
          <Typography className="mb-4">{t("contact-me")}</Typography>
          <Typography className="mb-4">{t("send-direct-message")}</Typography>
        </Box>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4 items-start">
            <Button
              variant="outlined"
              startIcon={<WhatsApp />}
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              size="large"
              fullWidth
              className="justify-start"
            >
              WhatsApp
            </Button>

            <Button
              variant="outlined"
              startIcon={<Telegram />}
              href={telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              size="large"
              fullWidth
              className="justify-start"
            >
              Telegram
            </Button>

            <Button
              variant="outlined"
              startIcon={<Email />}
              href={`mailto:${emailAddress}`}
              size="large"
              fullWidth
              className="!lowercase justify-start"
            >
              {emailAddress}
            </Button>

            <Button
              variant="outlined"
              startIcon={<Phone />}
              href={`tel:${phoneNumber}`}
              size="large"
              fullWidth
              className="justify-start"
            >
              {phoneNumber}
            </Button>
          </div>

          <SendMessage />
        </div>
      </div>
    </Container>
  );
};
