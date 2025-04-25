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
