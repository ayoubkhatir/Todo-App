import { Hono } from "hono";

export const TasksRouter = new Hono().get("",(c)=>{
    return c.json("")
})

