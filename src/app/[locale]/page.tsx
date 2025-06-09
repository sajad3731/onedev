import { About } from "@/components/sections/about/About";
import { Contact } from "@/components/sections/contact/Contact";
import { Experiences } from "@/components/sections/experiences/Experiences";
import { Introduce } from "@/components/sections/introduce/Introduce";
import { Projects } from "@/components/sections/projects/Projects";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Box, Container } from "@mui/material";
import { getTranslations } from "next-intl/server";
import { type FC, Suspense } from "react";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { NavigationBar } from "@/components/navigation/NavigationBar";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Common");

  return (
    <ErrorBoundary>
      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <NavigationBar />

        <main>
          {/* Hero Section */}
          <section id="home">
            <div className="absolute inset-0 bg-[url('/images/common-bg.svg')] bg-repeat opacity-40 dark:opacity-20 z-0" />
            <Container maxWidth="lg" className="h-full z-50 relative">
              <div className="content-overlay h-full">
                <Introduce />
                <ScrollIndicator targetSectionId="about" />
              </div>
            </Container>
          </section>

          {/* About Section */}
          <Container
            component="section"
            maxWidth="lg"
            id="about"
            className="!pt-4 sm:!pt-8 !mt-0 sm:!mt-4"
          >
            <ErrorBoundary fallback={<div>{t("failed-to-load-about")}</div>}>
              <About />
            </ErrorBoundary>
          </Container>

          {/* Experiences Section */}
          <Container
            component="section"
            maxWidth="lg"
            id="experience"
            className="!pt-4 sm:!pt-8"
          >
            <ErrorBoundary
              fallback={<div>{t("failed-to-load-experiences")}</div>}
            >
              <Suspense
                fallback={<LoadingSpinner message={t("loading-experiences")} />}
              >
                <Experiences />
              </Suspense>
            </ErrorBoundary>
          </Container>

          {/* Projects Section */}
          <Container
            component="section"
            maxWidth="lg"
            id="projects"
            className="!pt-4 sm:!pt-8"
          >
            <ErrorBoundary fallback={<div>{t("failed-to-load-projects")}</div>}>
              <Suspense
                fallback={<LoadingSpinner message={t("loading-projects")} />}
              >
                <Projects />
              </Suspense>
            </ErrorBoundary>
          </Container>

          {/* Contact Section */}
          <Container
            component="section"
            maxWidth="lg"
            id="contact"
            className="pb-[100px] !pt-4 sm:!pt-8"
          >
            <ErrorBoundary fallback={<div>{t("failed-to-load-skills")}</div>}>
              <Contact />
            </ErrorBoundary>
          </Container>
        </main>
      </Box>
    </ErrorBoundary>
  );
};

export default HomePage;
