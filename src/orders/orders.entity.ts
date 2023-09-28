import { User } from "src/users/users.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderProduct } from "./order-products.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    purchasedDate:Date;

    @Column()
    status: string

    @ManyToOne(() => User, (user) => user.orders)
    user: User

    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
    orderProducts: OrderProduct[]

}