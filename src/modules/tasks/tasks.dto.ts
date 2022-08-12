import { IsInt, IsNotEmpty, IsString } from "class-validator"
import {ApiProperty} from "@nestjs/swagger"


export class createTasksDto{
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title:string;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    userId:number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    statusId:number;
}