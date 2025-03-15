import { LangSwitchBtn } from "@/components/LangSwitchBtn";
import { ThemeModeSwitchBtn } from "@/components/ThemeModeSwitchBtn";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
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

interface HomePageProps {
  params: { locale: string };
}

const HomePage: FC<HomePageProps> = ({ params }) => {
  const { locale } = params;

  setRequestLocale(locale);

  const t = useTranslations("HomePage");

  return (
    <Box
      // Let MUI define background/text via the palette:
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
      }}
      className="p-4"
    >
      <header>
        <Stack direction="row" justifyContent="center" columnGap={2}>
          <LangSwitchBtn />
          <ThemeModeSwitchBtn />
        </Stack>
      </header>
      <main>
        <Typography>{t("title")}</Typography>
      </main>
    </Box>
  );
};

export default HomePage;
