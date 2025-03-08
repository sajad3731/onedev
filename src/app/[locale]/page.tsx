import { LangSwitchBtn } from "@/components/LangSwitchBtn";
import { Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { type FC, use } from "react";
import { getTranslations } from "next-intl/server";
import { ThemeModeSwitchBtn } from "@/components/ThemeModeSwitchBtn";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
}

const HomePage: FC<HomePageProps> = ({ params }) => {
  const { locale } = use<{ locale: string }>(params);

  setRequestLocale(locale);

  const t = useTranslations("HomePage");

  return (
    <>
      <header>
        <Stack direction="row" justifyContent="center">
          <LangSwitchBtn />
          <ThemeModeSwitchBtn />
        </Stack>
      </header>
      <main>
        <Typography>{t("title")}</Typography>
      </main>
    </>
  );
};

export default HomePage;
