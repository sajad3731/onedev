import type { Project, ProjectStatus } from "@/types";
import { DataManager } from "./DataManager";

export class ProjectsService {
  private static dataManager = DataManager.getInstance();

  static async getAll(): Promise<Project[]> {
    return this.dataManager.getProjectsData();
  }

  static async getById(id: string): Promise<Project | undefined> {
    return this.dataManager.getProjectById(id);
  }

  static async getByStatus(status: ProjectStatus): Promise<Project[]> {
    const projects = await this.getAll();
    return projects.filter((project) => project.status === status);
  }

  static async getLaunched(): Promise<Project[]> {
    return this.dataManager.getActiveProjects();
  }

  static async searchByTitle(query: string): Promise<Project[]> {
    const projects = await this.getAll();
    return projects.filter(
      (project) =>
        project.titleKey.toLowerCase().includes(query.toLowerCase()) ||
        (project.title &&
          project.title.toLowerCase().includes(query.toLowerCase()))
    );
  }
}
