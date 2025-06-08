import type { StaticImageData } from "next/image";

export type ProjectStatus = "launched" | "removed";

export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  thumbnailUrl: StaticImageData;
  status: ProjectStatus;
  url?: string;
  launchDate?: string;
  images: StaticImageData[];
  // Deprecated fields - keeping for backward compatibility
  /** @deprecated Use titleKey instead */
  title?: string;
  /** @deprecated Use descriptionKey instead */
  description?: string;
}

export interface Experience {
  id: string;
  companyNameKey: string;
  summaryKey: string;
  thumbnailUrl: StaticImageData;
  url?: string;
  startDate?: string;
  endDate?: string;
  responsibilityKeys: string[];
  descriptionKey?: string[];
}

export interface ContactForm {
  name: string;
  phoneNumber: string;
  email: string;
  message: string;
}

export interface NavigationItem {
  label: string;
  sectionId: string;
  icon?: React.ReactNode;
}

export interface ThemeConfig {
  mode: "light" | "dark";
  direction: "ltr" | "rtl";
}
