import { DataManager } from "./DataManager";

export class ResumeService {
  private static dataManager = DataManager.getInstance();

  static async getBasicInfo() {
    const resume = await this.dataManager.getResumeData();
    return resume.basics;
  }

  static async getSkills() {
    const resume = await this.dataManager.getResumeData();
    return resume.skills;
  }

  static async getSkillsByLevel() {
    return this.dataManager.getSkillsByLevel();
  }

  static async getWorkExperience() {
    const resume = await this.dataManager.getResumeData();
    return resume.work;
  }

  static async getProjects() {
    const resume = await this.dataManager.getResumeData();
    return resume.projects;
  }

  static async getEducation() {
    const resume = await this.dataManager.getResumeData();
    return resume.education;
  }
}
