import { tasksTable } from "../db/schema.js";

export type Task = typeof tasksTable.$inferSelect