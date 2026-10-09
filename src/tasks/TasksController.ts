import { HTTPException } from "hono/http-exception";
import { ErrorCode, type SuccessResponse } from "../types/ApiTypes.js";
import type {
  CreateTask,
  Task,
  TasksQuery,
  UpdateTask,
} from "../types/TaskTypes.js";
import { TasksRepository, tasksRepository } from "./TasksRepo.js";

interface ITasksController {
  getTasks: (query: TasksQuery) => Promise<SuccessResponse<Task[] | undefined>>;
  getTask: (id: string) => Promise<SuccessResponse<Task | undefined>>;
  createTask: (createdTask: CreateTask) => Promise<SuccessResponse<null>>;
  updateTask: (
    updatedTask: UpdateTask,
    id: string,
  ) => Promise<SuccessResponse<Task>>;
  deleteTask: (id: string) => Promise<SuccessResponse<null>>;
}

export class TasksController implements ITasksController {
  constructor(private readonly tasksRepository: TasksRepository) {}
  async getTasks(
    query: TasksQuery,
  ): Promise<SuccessResponse<Task[] | undefined>> {
    try {
      const tasks = await this.tasksRepository.findAll(query);
      return {
        success: true,
        message: "tasks found successfully",
        data: tasks,
      };
    } catch (error) {
      if (error instanceof HTTPException) throw error;
      throw new HTTPException(500, { message: "something went wrong" });
    }
  }

  async getTask(id: string): Promise<SuccessResponse<Task | undefined>> {
    try {
      const task = await this.tasksRepository.findById(id);
      if (!task) {
        throw new HTTPException(404, { message: "task not found" });
      }
      return {
        success: true,
        message: "task found successfully",
        data: task,
      };
    } catch (error) {
      if (error instanceof HTTPException) throw error;
      throw new HTTPException(500, { message: "something went wrong" });
    }
  }

  async createTask(createdTask: CreateTask): Promise<SuccessResponse<null>> {
    try {
      const task = await this.tasksRepository.create(createdTask);
      if (!task) {
        throw new HTTPException(400, { message: "task creation failed" });
      }
      return {
        success: true,
        message: "task created successfully",
        data: null,
      };
    } catch (error) {
      if (error instanceof HTTPException) throw error;
      throw new HTTPException(500, { message: "something went wrong" });
    }
  }

  async updateTask(
    updatedTask: UpdateTask,
    id: string,
  ): Promise<SuccessResponse<Task>> {
    try {
      const task = await this.tasksRepository.update(updatedTask, id);
      if (!task) {
        throw new HTTPException(404, { message: "task update failed" });
      }
      return {
        success: true,
        message: "task update successfully",
        data: task,
      };
    } catch (error) {
      if (error instanceof HTTPException) throw error;
      throw new HTTPException(500, { message: "something went wrong" });
    }
  }

  async deleteTask(id: string): Promise<SuccessResponse<null>> {
    try {
      const task = await this.tasksRepository.delete(id);
      if (!task) {
        throw new HTTPException(400, { message: "task deletion failed" });
      }
      return {
        success: true,
        message: "task deleted successfully",
        data: null,
      };
    } catch (error) {
      if (error instanceof HTTPException) throw error;
      throw new HTTPException(500, { message: "something went wrong" });
    }
  }
}

export const tasksController = new TasksController(tasksRepository);
