import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tasks } from "../tasks/tasks.entity";

@Entity("status")
export class Status extends BaseEntity{
    @PrimaryGeneratedColumn()
    @OneToOne( () => Tasks , tasks => tasks.status)
    id:number;

    @Column({
        nullable:false,
    })
    title:string;

}