import { Controller, Get,Post,Put, Param, ParseIntPipe, Body, Patch, Delete } from '@nestjs/common';
import { createTasksDto } from '../tasks/tasks.dto';
import { createUserDto } from './users.dto';
import {UsersService} from "./users.service"

@Controller()
export class UsersController{
    constructor(private readonly usersService: UsersService) {} 

    @Get("users")
    async findUsers() {
        return await this.usersService.findUsers();
    }

    @Get("user/:userId")
   async  findUserById(
        @Param("userId", ParseIntPipe) userId: number
    ) {
       return await this.usersService.findUserById(userId);   
    }

    @Post("user")
    async addUser(
        @Body() userData:createUserDto
    ) {
        return await this.usersService.addUser(userData)
    }

    @Post("login")
    async logIn(
        @Body() userData:createUserDto
    ){
        console.log("controller")
        return await this.usersService.logIn(userData)
    }

    @Patch("user/:userId")
    updataUser(
        @Param("userId", ParseIntPipe) userId: number,
        @Body() userData:createTasksDto
    ){
        return this.usersService.updataUser({userData,userId})
    }

    @Delete("user/:userId")
    deleteUser(
        @Param("userId", ParseIntPipe) userId: number,
        ) {
            return this.usersService.deleteUser(userId)
        }
    
}