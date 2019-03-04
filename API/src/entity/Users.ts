import "reflect-metadata";
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn} from "typeorm";
import { Products } from "./Products";

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date; 

}