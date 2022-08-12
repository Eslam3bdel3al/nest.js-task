import { Controller, Get,Post,Put, Param, ParseIntPipe, Body, Patch, Delete } from '@nestjs/common';
import { createTasksDto } from './tasks.dto';
import {TasksService} from "./tasks.service"

@Controller()
export class TasksController{
    constructor(private readonly tasksService: TasksService) {} 

    @Get("tasks/:userId")
    async findUserTasks(
        @Param("userId", ParseIntPipe) userId: number
    ) {
        return await this.tasksService.findUserTasks(userId);
    }

    @Get("task/:taskId")
    findTaskById(
        @Param("taskId", ParseIntPipe) taskId: number
    ) {
       return this.tasksService.findTaskById(taskId);   
    }

    @Post("task")
    async addTask(
        @Body() taskData:createTasksDto
    ) {
        return await this.tasksService.addTask(taskData)
    }

    @Patch("task/:taskId")
    async updateTask(
        @Param("taskId", ParseIntPipe) taskId: number,
        @Body() taskData:createTasksDto
    ){
        return await this.tasksService.updateTask({taskData,taskId})
    }

    @Delete("task/:taskId")
    async deleteTask(
        @Param("taskId", ParseIntPipe) taskId: number,
        ) {
            return await this.tasksService.deleteTask(taskId)
        }
    
}