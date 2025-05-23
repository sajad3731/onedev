import { Email, Phone, Telegram, WhatsApp } from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC } from "react";

export const Contact: FC = () => {
  const t = useTranslations("Contact");

  const phoneNumber = "+989213723236";
  const whatsappLink = `https://wa.me/${phoneNumber.replace("+", "")}`;
  const telegramLink = `https://t.me/sajad_mahdian`;
  const emailAddress = "sajad.mahdian@gmail.com";

  return (
    <div className="flex flex-col gap-y-6 w-full">
      <Divider className="!py-10">
        <Typography variant="h4" className="!font-bold">
          {t("title")}
        </Typography>
      </Divider>

      <Box className="mb-6">
        <Typography className="mb-4">{t("contact-me")}</Typography>
      </Box>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          variant="outlined"
          startIcon={<WhatsApp />}
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          size="large"
          fullWidth
          className="justify-start py-3"
          sx={{
            borderWidth: "2px",
            "&:hover": {
              borderWidth: "2px",
              backgroundColor: "rgba(37, 211, 102, 0.1)",
            },
            borderColor: "#25d366",
            color: "#25d366",
          }}
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
          className="justify-start py-3"
          sx={{
            borderWidth: "2px",
            "&:hover": {
              borderWidth: "2px",
              backgroundColor: "rgba(0, 136, 204, 0.1)",
            },
            borderColor: "#0088cc",
            color: "#0088cc",
          }}
        >
          Telegram
        </Button>

        <Button
          variant="outlined"
          startIcon={<Email />}
          href={`mailto:${emailAddress}`}
          size="large"
          fullWidth
          className="!lowercase justify-start py-3"
          sx={{
            borderWidth: "2px",
            "&:hover": {
              borderWidth: "2px",
            },
          }}
        >
          {emailAddress}
        </Button>

        <Button
          variant="outlined"
          startIcon={<Phone />}
          href={`tel:${phoneNumber}`}
          size="large"
          fullWidth
          className="justify-start py-3"
          sx={{
            borderWidth: "2px",
            "&:hover": {
              borderWidth: "2px",
            },
          }}
        >
          {phoneNumber}
        </Button>
      </div>
    </div>
  );
};
