import { Header } from "@/components/header/Header";
import { Introduce } from "@/components/sections/Introduce";
import { Projects } from "@/components/sections/projects/Projects";
import { projectsData } from "@/data/projects";
import { Box, Toolbar } from "@mui/material";
// import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { type FC } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fa" | "en" }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.HomePage" });

  return {
    title: t("title"),
  };
}

const HomePage: FC = () => {
  // const t = useTranslations("HomePage");

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
        <section className="relative w-full h-[calc(100vh-56px)] md:h-[calc(100vh-64px)] overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/common-bg.svg')] bg-repeat opacity-40 dark:opacity-20 z-0" />
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <Introduce />
          </div>
        </section>
        <section id="projects" className="py-16 bg-gray-50">
          <Projects projectsData={projectsData} />
        </section>
      </main>
    </Box>
  );
};

export default HomePage;
