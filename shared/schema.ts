import { pgTable, text, serial, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const quizSubmissions = pgTable("quiz_submissions", {
  id: serial("id").primaryKey(),
  answers: jsonb("answers").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertQuizSubmissionSchema = createInsertSchema(quizSubmissions).omit({ 
  id: true, 
  createdAt: true 
});

export type QuizSubmission = typeof quizSubmissions.$inferSelect;
export type InsertQuizSubmission = z.infer<typeof insertQuizSubmissionSchema>;
