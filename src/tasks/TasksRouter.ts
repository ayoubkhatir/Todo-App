import { Hono } from "hono";
import { tasksController } from "./TasksController.js";
import { zValidator } from "@hono/zod-validator";
import { querySchema } from "../types/TaskTypes.js";

export const TasksRouter = new Hono()
  .get("", zValidator("query", querySchema), async (c) => {
    const query = c.req.valid("query");
    const response = await tasksController.getTasks(query);
    
    return c.json({ response });
  })
  .post();
