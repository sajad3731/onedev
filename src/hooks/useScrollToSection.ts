import { useCallback } from "react";

export function useScrollToSection() {
  const scrollToSection = useCallback((sectionId: string) => {
    if (typeof window === "undefined") return;

    const section = document.getElementById(sectionId);
    if (!section) return;

    const headerHeight = window.innerWidth <= 600 ? 56 : 64;
    const sectionTop = section.offsetTop;
    const offsetTop = sectionTop - headerHeight;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }, []);

  return scrollToSection;
}
