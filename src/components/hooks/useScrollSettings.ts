"use client";

import { useEffect, useState } from "react";

export function useScrollSettings() {
  // Change default value to false to disable snap scrolling by default
  const [snapScrollEnabled, setSnapScrollEnabled] = useState(false);

  // Initialize from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPreference = localStorage.getItem("snapScrollEnabled");
      if (savedPreference !== null) {
        setSnapScrollEnabled(savedPreference === "true");
      }
      // If no saved preference exists, the default (false) will be used
    }
  }, []);

  // Apply the scroll settings to the html element
  useEffect(() => {
    if (typeof window !== "undefined") {
      const htmlElement = document.documentElement;

      if (snapScrollEnabled) {
        htmlElement.classList.add("snap-enabled");
        htmlElement.classList.remove("snap-disabled");
      } else {
        htmlElement.classList.add("snap-disabled");
        htmlElement.classList.remove("snap-enabled");
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
