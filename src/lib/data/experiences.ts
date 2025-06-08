import type { Experience } from "@/types";
import { DataManager } from "./DataManager";

export class ExperiencesService {
  private static dataManager = DataManager.getInstance();

  static async getAll(): Promise<Experience[]> {
    return this.dataManager.getExperiencesData();
  }

  static async getRecent(limit = 5): Promise<Experience[]> {
    return this.dataManager.getRecentExperiences(limit);
  }

  static async getByCompany(
    companyKey: string
  ): Promise<Experience | undefined> {
    const experiences = await this.getAll();
    return experiences.find((exp) => exp.companyNameKey === companyKey);
  }

  static async getByDateRange(
    startDate: string,
    endDate: string
  ): Promise<Experience[]> {
    const experiences = await this.getAll();
    return experiences.filter((exp) => {
      if (!exp.startDate || !exp.endDate) return false;
      return exp.startDate >= startDate && exp.endDate <= endDate;
    });
  }

  static async getSortedByDate(): Promise<Experience[]> {
    const experiences = await this.getAll();
    return experiences.sort((a, b) => {
      const dateA = a.startDate || "";
      const dateB = b.startDate || "";
      return dateB.localeCompare(dateA);
    });
  }
}
