import { BaseEntity, Column, Entity, ManyToOne, OneToOne,JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../status/status.entity";
import { Users } from "../users/users.entity";


@Entity("tasks")
export class Tasks extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        nullable:false,
    })
    title:string;

    @Column({
        nullable:false,
    })
    userId:number;

    @Column({
        nullable:false,
        default:2
    })
    statusId:number;

    @ManyToOne( () => Users, user => user.tasks)
    user:number

    @OneToOne(() => Status, status => status.id)
    @JoinColumn()
    status:number
}