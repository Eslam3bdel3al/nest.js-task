import { IsNotEmpty, IsString } from "class-validator";
import {ApiProperty} from "@nestjs/swagger"

export class createUserDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userName:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    pass:string
}