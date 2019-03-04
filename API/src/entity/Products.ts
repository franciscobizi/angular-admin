import "reflect-metadata";
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";

@Entity()
export class Products {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: string;

    @Column()
    amount: string;

    @Column()
    userid: number;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date; 

}