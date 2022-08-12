import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { Tasks } from "../tasks/tasks.entity";

@Entity("users")

export class Users extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        nullable:false,
        unique: true,
        length:20
    })
    user_name:string;

    @Column({
        nullable:false,
    })
    password:string;

    @OneToMany(() => Tasks, tasks => tasks.user)
    tasks:Tasks[]
}
