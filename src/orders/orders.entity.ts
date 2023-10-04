import { IOrder } from "src/types/models/IOrder"; 
import { User } from "src/users/users.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderProduct } from "./order-products.entity";

@Entity()
export class Order implements IOrder {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: 'timestamptz', nullable: true })
    purchasedDate?: Date;

    @Column()
    status: 'pending' | "completed";

    @Column()
    userId: number

    @ManyToOne(() => User, (user) => user.orders)
    user: User

    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
    orderProducts: OrderProduct[]

}