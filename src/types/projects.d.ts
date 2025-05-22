declare type ProjectStatus = "launched" | "removed";

declare interface Project {
  id: string;
  titleKey: string; // Translation key for title
  descriptionKey: string; // Translation key for description
  thumbnailUrl: StaticImageData;
  status: ProjectStatus;
  url?: string; // Optional for launched projects
  launchDate?: string; // For upcoming projects
  images: StaticImageData[]; // Gallery images

  // Deprecated fields - keeping for backward compatibility during migration
  /** @deprecated Use titleKey instead */
  title?: string;
  /** @deprecated Use descriptionKey instead */
  description?: string;
}
