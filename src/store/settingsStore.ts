import { create } from "zustand";

type ColorMode = "light" | "dark" | "system";
type Locale = "en" | "fa";

interface SettingsStore {
  colorMode: ColorMode;
  locale: Locale;
  setTheme: (colorMode: ColorMode) => void;
  setLocale: (locale: Locale) => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  colorMode: "system",
  locale: "en",
  setTheme: (colorMode) => set({ colorMode }),
  setLocale: (locale) => set({ locale }),
}));
