import { Header } from "@/components/header/Header";
import { Box, Toolbar, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { type FC } from "react";

export async function generateMetadata(
  params: Promise<{ locale: "fa" | "en" }>
) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.HomePage" });

  return {
    title: t("title"),
  };
}

const HomePage: FC = () => {
  const t = useTranslations("HomePage");

  return (
    <Box
      // Let MUI define background/text via the palette:
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
      }}
    >
      <Header />
      <main>
        <Toolbar />
        <Typography>{t("title")}</Typography>
      </main>
    </Box>
  );
};

export default HomePage;
