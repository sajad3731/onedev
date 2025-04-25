import { Header } from "@/components/navigation/Header";
import { Introduce } from "@/components/sections/Introduce";
import { Projects } from "@/components/sections/projects/Projects";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { projectsData } from "@/data/projectsData";
import { Box, Container, Toolbar, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import { type FC } from "react";
import "@/styles/scroll-snap.css";

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
        // Remove fixed height and overflow: hidden
      }}
    >
      <Header />
      <Toolbar className="!hidden sm:!block" />
      <main className="scroll-snap-container">
        {/* First section - Intro - keeps full height */}
        <section id="home" className="scroll-snap-section full-height">
          <div className="absolute inset-0 bg-[url('/images/common-bg.svg')] bg-repeat opacity-40 dark:opacity-20 z-0" />
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <Introduce />
          </div>
          {/* Add scroll indicator pointing to projects */}
          <ScrollIndicator targetSectionId="projects" />
        </section>

        {/* Second section - Projects - content based height */}
        <Container
          component="section"
          maxWidth="lg"
          id="projects"
          className="scroll-snap-section content-height"
        >
          <Projects projectsData={projectsData} />
        </Container>

        {/* About section - content based height */}
        <section id="about" className="scroll-snap-section content-height">
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <div className="container mx-auto px-4">
              <Typography variant="h2" className="font-bold mb-6">
                About Me
              </Typography>
              {/* Your about content here */}
            </div>
          </div>
        </section>

        {/* Contact section - can use full height since it's likely shorter */}
        <section id="contact" className="scroll-snap-section full-height">
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <div className="container mx-auto px-4">
              <Typography variant="h2" className="font-bold mb-6">
                Contact
              </Typography>
              {/* Your contact content here */}
            </div>
          </div>
        </section>
      </main>
    </Box>
  );
};

export default HomePage;
