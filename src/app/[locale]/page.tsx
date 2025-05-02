import { Header } from "@/components/navigation/Header";
import { About } from "@/components/sections/about/About";
import { Contact } from "@/components/sections/contact/Contact";
import { Introduce } from "@/components/sections/Introduce";
import { Projects } from "@/components/sections/projects/Projects";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { projectsData } from "@/data/projectsData";
import { Box, Container, Toolbar } from "@mui/material";
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
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Header />
      <Toolbar className="!hidden sm:!block" />
      <main>
        <section id="home">
          <div className="absolute inset-0 bg-[url('/images/common-bg.svg')] bg-repeat opacity-40 dark:opacity-20 z-0" />
          <Container maxWidth="lg" className="h-full z-50">
            <Introduce />
            <ScrollIndicator targetSectionId="about" />
          </Container>
        </section>

        <Container component="section" maxWidth="lg" id="about">
          <About />
        </Container>

        <Container component="section" maxWidth="lg" id="projects">
          <Projects projectsData={projectsData} />
        </Container>

        <Container
          component="section"
          maxWidth="lg"
          id="contact"
          className="mb-[100px]"
        >
          <Contact />
        </Container>
      </main>
    </Box>
  );
};

export default HomePage;
