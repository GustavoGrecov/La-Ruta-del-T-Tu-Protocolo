import { db } from "./db";
import { quizSubmissions, type InsertQuizSubmission } from "@shared/schema";

export interface IStorage {
  createQuizSubmission(submission: InsertQuizSubmission): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async createQuizSubmission(submission: InsertQuizSubmission): Promise<void> {
    await db.insert(quizSubmissions).values(submission);
  }
}

export const storage = new DatabaseStorage();
