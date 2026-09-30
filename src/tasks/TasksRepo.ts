import type { Task } from "../types/types.js";

const tasks:Task[] = [
    {
        id:"1",
        title:"Task 1",
        done:false,
        createdAt:new Date()
    },
    {
        id:"2",
        title:"Task 2",
        done:false,
        createdAt:new Date()
    }

]


export interface ITasksRepository{
    findAll:()=>Promise<Task[]>
    findById:()=>Promise<Task>
    create:()=>Promise<Task>
    delete:()=>Promise<Task>
}

export class TasksRepository{
async getAll(){
        return tasks
    }
}