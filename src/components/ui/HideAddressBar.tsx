"use client";

import { useEffect } from "react";

export const HideAddressBar = () => {
  useEffect(() => {
    const hideAddressBar = () => {
      // Only run on mobile devices and if page is not in a hash navigation
      if (
        typeof window !== "undefined" &&
        !window.location.hash &&
        (window.addEventListener as unknown) &&
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        // Check if we're in standalone mode (PWA)
        const isStandalone =
          window.matchMedia("(display-mode: standalone)").matches ||
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window.navigator as any).standalone ||
          document.referrer.includes("android-app://");

        // If not in standalone mode, try to hide address bar
        if (!isStandalone) {
          setTimeout(() => {
            // Only hide if we haven't scrolled yet (prevent interrupting user scroll)
            if (window.pageYOffset < 20) {
              window.scrollTo(0, 1);
            }
          }, 100);
        }
      }
    };

    // Hide on initial load
    hideAddressBar();

    // Also hide when page becomes visible (for browser tab switching)
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        setTimeout(hideAddressBar, 100);
      }
    });

    // Clean up event listener
    return () => {
      document.removeEventListener("visibilitychange", hideAddressBar);
    };
  }, []);

  return null; // This component doesn't render anything
};
