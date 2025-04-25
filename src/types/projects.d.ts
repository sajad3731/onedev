declare type ProjectStatus = "launched" | "removed";

declare interface Project {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: StaticImageData;
  status: ProjectStatus;
  url?: string; // Optional for launched projects
  launchDate?: string; // For upcoming projects
  images: StaticImageData[]; // Gallery images
}
