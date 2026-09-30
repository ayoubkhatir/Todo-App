import "dotenv/config";
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from "hono/cors";
import { TasksRouter } from "./tasks/TasksRouter.js";

const app = new Hono()

app.use("*",cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/tasks",TasksRouter)

export default app;