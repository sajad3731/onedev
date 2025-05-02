import { Email, Phone, Telegram, WhatsApp } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { SendMessage } from "./SendMessage";

export const Contact: FC = () => {
  const t = useTranslations("Contact");

  return (
    <Container maxWidth="lg" className="">
      <div className="flex flex-col gap-y-6 w-full py-5">
        <Typography variant="h4" align="center" gutterBottom className="!my-10">
          {t("title")}
        </Typography>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="flex flex-col gap-3 items-start">
            <Button LinkComponent="a" href="www.google.com">
              <WhatsApp className="mt-[-5px] ml-2" />
              98-921-372-32-36+
            </Button>
            <Button LinkComponent="a" href="www.google.com">
              <Telegram className="mt-[-5px] ml-2" />
              98-921-372-32-36+
            </Button>
            <Button
              LinkComponent="a"
              href="www.google.com"
              className="!lowercase"
            >
              <Email className="mt-[-5px] ml-2" fontSize="small" />
              sajad.mahdian@gmail.com
            </Button>
            <Button LinkComponent="a" href="www.google.com">
              <Phone className="mt-[-5px] ml-2" />
              98-921-372-32-36+
            </Button>
          </div>
          <SendMessage />
        </div>
      </div>
    </Container>
  );
};
