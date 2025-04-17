// src/components/hooks/useScrollSettings.ts
"use client";

import { useEffect, useState } from "react";

export function useScrollSettings() {
  const [snapScrollEnabled, setSnapScrollEnabled] = useState(true);

  // Initialize from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPreference = localStorage.getItem("snapScrollEnabled");
      if (savedPreference !== null) {
        setSnapScrollEnabled(savedPreference === "true");
      }
    }
  }, []);

  // Apply the scroll settings to the container
  useEffect(() => {
    if (typeof window !== "undefined") {
      const container = document.querySelector(
        ".scroll-snap-container"
      ) as HTMLElement;
      if (container) {
        if (snapScrollEnabled) {
          container.style.scrollSnapType = "y proximity";
        } else {
          container.style.scrollSnapType = "none";
        }
      }

      // Save preference
      localStorage.setItem("snapScrollEnabled", String(snapScrollEnabled));
    }
  }, [snapScrollEnabled]);

  const toggleSnapScroll = () => {
    setSnapScrollEnabled((prev) => !prev);
  };

  return {
    snapScrollEnabled,
    toggleSnapScroll,
  };
}
