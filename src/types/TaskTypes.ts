import { z } from "zod";
import { tasksTable } from "../db/schema.js";

export type Task = {
  createdAt: Date | null;
  done: boolean;
  id: string;
  title: string;
};
export type CreateTask = {
  title: string;
};

export type TasksQuery = {
  search?: string;
  sortBy?: "createdAt" | "title" | "id";
  sort?: "asc" | "desc";
};

export const querySchema = z.object({
  search: z.string().optional(),
  sort: z.enum(["asc", "desc"]).default("desc"),
  sortBy: z.enum(["title", "createdAt", "id"]).default("createdAt"),
});
