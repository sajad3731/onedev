import type { Project, Experience } from "@/types";

export class DataManager {
  private static instance: DataManager;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private cache = new Map<string, any>();

  static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }

  private async loadProjectsData(): Promise<Project[]> {
    if (this.cache.has("projects-raw")) {
      return this.cache.get("projects-raw");
    }

    const { projectsData } = await import("@/data/projectsData");
    this.cache.set("projects-raw", projectsData);
    return projectsData;
  }

  private async loadExperiencesData(): Promise<Experience[]> {
    if (this.cache.has("experiences-raw")) {
      return this.cache.get("experiences-raw");
    }

    const { experiencesData } = await import("@/data/experiencesData");
    this.cache.set("experiences-raw", experiencesData);
    return experiencesData;
  }

  async getResumeData() {
    if (this.cache.has("resume")) {
      return this.cache.get("resume");
    }

    const resumeData = await import("@/data/my-resume.json");
    this.cache.set("resume", resumeData.default);
    return resumeData.default;
  }

  async getProjectsData(): Promise<Project[]> {
    return this.loadProjectsData();
  }

  async getExperiencesData(): Promise<Experience[]> {
    return this.loadExperiencesData();
  }

  async getActiveProjects(): Promise<Project[]> {
    const projects = await this.getProjectsData();
    return projects.filter((project) => project.status === "launched");
  }

  async getProjectById(id: string): Promise<Project | undefined> {
    const projects = await this.getProjectsData();
    return projects.find((project) => project.id === id);
  }

  async getRecentExperiences(limit = 5): Promise<Experience[]> {
    const experiences = await this.getExperiencesData();
    return experiences
      .sort((a, b) => (b.startDate || "").localeCompare(a.startDate || ""))
      .slice(0, limit);
  }

  async getSkillsByLevel() {
    const resume = await this.getResumeData();
    const skills = resume.skills || [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return skills.reduce((acc: Record<string, any[]>, skill: any) => {
      const level = skill.level;
      if (!acc[level]) {
        acc[level] = [];
      }
      acc[level].push(skill);
      return acc;
    }, {});
  }

  clearCache(key?: string) {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }
}
