import { quizSubmissions, type InsertQuizSubmission } from "@shared/schema";

export interface IStorage {
  createQuizSubmission(submission: InsertQuizSubmission): Promise<void>;
}

export class MemStorage implements IStorage {
  private submissions: InsertQuizSubmission[] = [];

  async createQuizSubmission(submission: InsertQuizSubmission): Promise<void> {
    this.submissions.push(submission);
    // In a real app without DB, we might log this or send an email
    console.log("New quiz submission:", submission);
  }
}

export const storage = new MemStorage();
