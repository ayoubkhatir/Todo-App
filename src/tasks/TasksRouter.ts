import { Hono } from "hono";
import { tasksController } from "./TasksController.js";
import { zValidator } from "@hono/zod-validator";
import {
  createdTaskSchema,
  querySchema,
  TaskID,
  updateTaskSchema,
} from "../types/TaskTypes.js";

export const TasksRouter = new Hono()
  .get("", zValidator("query", querySchema), async (c) => {
    const query = c.req.valid("query");
    const response = await tasksController.getTasks(query);
    return c.json(response);
  })
  .get("/:taskId", zValidator("param", TaskID), async (c) => {
    const { taskId } = c.req.valid("param");
    const response = await tasksController.getTask(taskId);
    return c.json(response);
  })
  //create
  .post("", zValidator("json", createdTaskSchema), async (c) => {
    const createdTask = c.req.valid("json");
    const response = await tasksController.createTask(createdTask);
    return c.json(response);
  })
  //update
  .patch(
    "/:taskId",
    zValidator("param", TaskID),
    zValidator("json", updateTaskSchema),
    async (c) => {
      const { taskId } = c.req.valid("param");
      const updatedTask = c.req.valid("json");
      const response = await tasksController.updateTask(updatedTask, taskId);
      return c.json(response);
    },
  )
  .delete("/:taskId", zValidator("param", TaskID), async (c) => {
    const { taskId } = c.req.valid("param");
    const response = await tasksController.deleteTask(taskId);
    return c.json(response);
  });
