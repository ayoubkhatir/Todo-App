import { asc, desc, eq, ilike, or, sql } from "drizzle-orm";
import { tasksTable } from "../db/schema.js";
import type { CreateTask, Task, TasksQuery } from "../types/TaskTypes.js";
import { db } from "../db/index.js";

const tasksss: Task[] = [
  {
    id: "1",
    title: "Task 1",
    done: false,
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Task 2",
    done: false,
    createdAt: new Date(),
  },
];

interface ITasksRepository {
  findAll: (query: TasksQuery) => Promise<Task[]>;
  findById: (id: string) => Promise<Task | undefined>;
  create: (createdTask: CreateTask) => Promise<Task>;
  delete: (id: string) => Promise<Task>;
}

export class TasksRepository implements ITasksRepository {
  async findAll({ search, sortBy = "createdAt", sort = "desc" }: TasksQuery) {
    const searchCondition = search
      ? or(
          ilike(tasksTable.title, `%${search}%`),
          sql`${tasksTable.id}::text ILIKE ${`%${search}%`}`,
        )
      : undefined;

    const sortCondition =
      sort === "desc" ? desc(tasksTable[sortBy]) : asc(tasksTable[sortBy]);

    return db
      .select()
      .from(tasksTable)
      .where(searchCondition)
      .orderBy(sortCondition);
  }

  async findById(id: string) {
    const [task] = await db
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.id, id));
    return task;
  }

  async create(createdTask: CreateTask) {
    const [task] = await db.insert(tasksTable).values(createdTask).returning();
    return task;
  }

  async delete(id: string) {
    const [deletedTask] = await db
      .delete(tasksTable)
      .where(eq(tasksTable.id, id))
      .returning();
    return deletedTask;
  }
}

export const tasksRepository = new TasksRepository();
