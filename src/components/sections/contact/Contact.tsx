import { Email, Phone, Telegram, WhatsApp } from "@mui/icons-material";
import { Button, Container, Divider, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { SendMessage } from "./SendMessage";

export const Contact: FC = () => {
  const t = useTranslations("Contact");

  return (
    <Container maxWidth="lg" className="">
      <div className="flex flex-col gap-y-6 w-full py-5">
        <Divider className="!my-10">
          <Typography variant="h4" className="!font-bold">
            {t("title")}
          </Typography>
        </Divider>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="flex flex-col gap-3 items-start">
            <Button LinkComponent="a" href="tel:+989213723236" size="large">
              <WhatsApp className="mt-[-5px] mx-2" />
              921-372-32-36
            </Button>
            <Button LinkComponent="a" href="tel:+989213723236" size="large">
              <Telegram className="mt-[-5px] mx-2" />
              921-372-32-36
            </Button>
            <Button
              LinkComponent="a"
              href="mailto:sajad.mahdian@gmail.com"
              className="!lowercase"
              size="large"
            >
              <Email className="mt-[-5px] mx-2" />
              sajad.mahdian@gmail.com
            </Button>
            <Button LinkComponent="a" href="tel:+989213723236" size="large">
              <Phone className="mt-[-5px] mx-2" />
              921-372-32-36
            </Button>
          </div>
          <SendMessage />
        </div>
      </div>
    </Container>
  );
};
