import { create } from "zustand";

type ThemeMode = "light" | "dark" | "system";
type Locale = "en" | "fa";

interface SettingsStore {
  themeMode: ThemeMode;
  locale: Locale;
  setThemeMode: (themeMode: ThemeMode) => void;
  setLocale: (locale: Locale) => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  themeMode: "system",
  locale: "en",
  setThemeMode: (themeMode) => set({ themeMode }),
  setLocale: (locale) => set({ locale }),
}));
