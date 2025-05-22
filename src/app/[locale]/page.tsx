import { Header } from "@/components/navigation/Header";
import { About } from "@/components/sections/about/About";
import { Contact } from "@/components/sections/contact/Contact";
import { Introduce } from "@/components/sections/Introduce";
import { Projects } from "@/components/sections/projects/Projects";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { projectsData } from "@/data/projectsData";
import { Box, Container } from "@mui/material";
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
      {/* Remove the Toolbar spacer since header is now transparent initially */}
      <main>
        <section id="home">
          <div className="absolute inset-0 bg-[url('/images/common-bg.svg')] bg-repeat opacity-40 dark:opacity-20 z-0" />
          <Container maxWidth="lg" className="h-full z-50 relative">
            <div className="content-overlay h-full">
              <Introduce />
              <ScrollIndicator targetSectionId="about" />
            </div>
          </Container>
        </section>

        {/* Add padding top to subsequent sections to account for fixed header */}
        <Container
          component="section"
          maxWidth="lg"
          id="about"
          sx={{
            paddingTop: { xs: 2, sm: 4 }, // Add some padding for better spacing
            marginTop: { xs: 0, sm: 2 }, // Additional margin for desktop
          }}
        >
          <About />
        </Container>

        <Container
          component="section"
          maxWidth="lg"
          id="projects"
          sx={{
            paddingTop: { xs: 2, sm: 4 },
          }}
        >
          <Projects projectsData={projectsData} />
        </Container>

        <Container
          component="section"
          maxWidth="lg"
          id="contact"
          className="mb-[100px]"
          sx={{
            paddingTop: { xs: 2, sm: 4 },
          }}
        >
          <Contact />
        </Container>
      </main>
    </Box>
  );
};

export default HomePage;
