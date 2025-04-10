declare type ProjectStatus = "launched" | "upcoming";

declare interface Project {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  status: ProjectStatus;
  url?: string; // Optional for launched projects
  launchDate?: string; // For upcoming projects
  images: string[]; // Gallery images
}
