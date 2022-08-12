import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as data from "../../data/data.json";
import { Tasks } from './tasks.entity';
import { Repository } from 'typeorm';
import { createTasksDto } from './tasks.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Tasks) private readonly tasksRepository:Repository<Tasks>
    ){}

    async findUserTasks(userId) {

    //     let theTasks = data.tasks.filter(tsk=>tsk.userId == userId);
    //     return theTasks;

        let tasks = this.tasksRepository.find({where:{userId},relations:["status"]})
        return tasks        
    }

    async findTaskById(taskId){

        // let theTask = data.tasks.filter(tsk=>tsk.id == taskId);
        // return theTask;

        let task = await this.tasksRepository.findOne({where:{id:taskId},relations:["status"]})
        return task
    }

    async addTask(taskData:createTasksDto){

        // let found = false;
        // data.users.forEach((usr) => {
        //     if (usr.id == taskData.userId){
        //         found = true
        //     }
        // })
        // if(!found){
        //     throw new HttpException('user not found', 404)
        // } 
        // let newTask = {
        //     "id": taskData.id,
        //     "title": taskData.title,
        //     "userId":taskData.userId,
        //     "statusId":taskData.statusId
        // }
        // data.tasks.push(newTask)
        // return "added";

        let task = new Tasks() 
            task.title = taskData.title,
            task.userId = taskData.userId,
            task.statusId = taskData.statusId
        

        await this.tasksRepository.save(task)
        return "added"
    }

    async updateTask({taskData,taskId}){

        // let userFound = false;
        // data.users.forEach((usr) => {
        //     if (usr.id == taskData.userId){
        //         userFound = true
        //     }
        // })
        
        // if(!userFound){
        //     throw new HttpException('user not found', 404)
        // } 

        // let found = false;
        // data.tasks.forEach((tsk) => {
        //     if (tsk.id == taskId){
        //         found = true
        //         tsk.id = taskId,
        //         tsk.title = taskData.title,
        //         tsk.userId = taskData.userId,
        //         tsk.statusId = taskData.statusId

        //     }
        // })
        // if(!found){
        //     throw new HttpException('Task not found', 404)
        // } 
        // return "done"

        await this.tasksRepository.update(taskId,{
            title:taskData.title,
            userId:taskData.userId,
            statusId:taskData.statusId
        })
        return "updated"
    }

    async deleteTask(taskId){

        // let found = false;
        // data.tasks.forEach((tsk,index,arr)=>{
        //     if(tsk.id == taskId){
        //         found = true
        //         arr.splice(index,1)
        //     }
        // });
        // if(!found){
        //     throw new HttpException('Task not found', 404)
        // } 
        // return "deleted"

        await this.tasksRepository.delete(taskId)
        return "deleted"
    }
}