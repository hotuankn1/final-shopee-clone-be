import { Exclude } from "class-transformer";
import { Order } from "src/orders/orders.entity";
import { IUser } from "src/types/models/IUser";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}