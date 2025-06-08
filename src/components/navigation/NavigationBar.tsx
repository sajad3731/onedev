"use client";

import { Box } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useScrollVisibility } from "@/hooks/useScrollVisibility";
import { useActiveSection } from "@/hooks/useActiveSection";
import { DesktopNavigationBar } from "./DesktopNavigationBar";
import { MobileNavigationBar } from "./MobileNavigationBar";

export const NavigationBar: FC = () => {
  const [mounted, setMounted] = useState(false);
  const isScrolled = useScrollVisibility(250);
  const activeSection = useActiveSection();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box sx={{ display: "flex", direction: "ltr" }}>
      <DesktopNavigationBar
        isScrolled={isScrolled}
        activeSection={activeSection}
      />
      {mounted && <MobileNavigationBar activeSection={activeSection} />}
    </Box>
  );
};
