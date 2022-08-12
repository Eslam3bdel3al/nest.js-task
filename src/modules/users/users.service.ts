import { Injectable, HttpException, UnauthorizedException } from '@nestjs/common';
import { Users } from './users.entity';
// import * as data from "../../data/data.json";
import { createUserDto } from './users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private readonly usersRepository:Repository<Users>
    ) { }


    async findUsers(){

        // return data.users;

        return await this.usersRepository.find({
            relations: ['tasks',"tasks.status"]
          });
         
    }

    async findUserById(userId){

        // let theUser = data.users.filter(usr=>usr.id == userId);
        // let tasks = this.tasksService.findUserTasks(userId)
        // return {theUser,tasks};

        let user = await this.usersRepository.findOne({where:{id: userId},relations: ['tasks',"tasks.status"]})
        return user
    }

    async addUser(userData:createUserDto){

        // let newUser = {
        //     "id": userData.id,
        //     "username": userData.userName,
        //     "password": userData.pass
        // }
        // data.users.push(newUser)

        const hashedPass = bcrypt.hashSync(userData.pass,10)

        const user = new Users();
        user.user_name = userData.userName;
        user.password = hashedPass;

        await  this.usersRepository.save(user);                      
        return "added";
    }

    async logIn(userData:createUserDto){ 
        // let theUser = data.users.filter(usr=>usr.username == userData.userName);
        // if(!theUser){
        //     throw new HttpException('user name or pass is incorrect', 404)
        // }else if (userData.pass !== theUser[0].password){
        //     throw new HttpException('user name or pass is incorrect', 404)
        // }

        // return "loged in"

        const user = await this.usersRepository.findOne({where:{user_name:userData.userName}})
        if(!user){
            throw new UnauthorizedException();
        }

        const isMatch = bcrypt.compareSync(userData.pass,user.password)

        if (!isMatch){
            throw new UnauthorizedException();
        }

        return "logged in"
    }

    async updataUser({userData,userId}){

        // let found = false;
        // data.users.forEach((usr) => {
        //     if (usr.id == userId){
        //         found = true
        //         usr.id = userId,
        //         usr.username = userData.userName,
        //         usr.password = userData.pass
        //     }
        // })
        // if(!found){
        //     throw new HttpException('User not found', 404)
        // } 

        // return "done"

        await this.usersRepository.update(userId,{
                user_name:userData.userName,
                password:userData.pass
        })
        return "updated"
    }

    async deleteUser(userId){

    //     let found = false;
    //     data.users.forEach((usr,index,arr)=>{
    //         if(usr.id == userId){
    //             found = true
    //             arr.splice(index,1)
    //         }
    //     });
    //     if(!found){
    //         throw new HttpException('User not found', 404)
    //     } 
    //     return "deleted"
    // }

        await this.usersRepository.delete(userId)
        return "deleted"
    }

}