import { Hono } from "hono";

const tasks = [
    {id:1,title:"the task 1",done:false,createdAt:new Date},
    {id:2,title:"the task 2",done:true,createdAt:new Date},
    {id:3,title:"the task 3",done:false,createdAt:new Date}
]

export const TasksRouter = new Hono()
.get("",(c)=>{
    return c.json(tasks)
})