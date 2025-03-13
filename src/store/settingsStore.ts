import { create } from "zustand";

type ThemeMode = "light" | "dark";

interface SettingsState {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

export const useSettingsStore = create<SettingsState>((set) => {
  // Retrieve the initial theme mode from localStorage or default to 'light'
  const initialThemeMode =
    ((typeof window !== "undefined" &&
      localStorage.getItem("themeMode")) as ThemeMode) || "light";

  return {
    themeMode: initialThemeMode,
    setThemeMode: (mode: ThemeMode) => {
      // Update the theme mode in state and localStorage
      set({ themeMode: mode });
      if (typeof window !== "undefined") {
        localStorage.setItem("themeMode", mode);
      }
    },
  };
});
