import { Product } from "src/products/products.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Order } from "./orders.entity";

@Entity()
export class OrderProduct {
    @ManyToOne(() => Order, (order) => order.orderProducts)
    order: Order

    @ManyToOne(() => Product, (product) => product.orderProducts)
    product: Product

    @PrimaryColumn({default: 1})
    orderId: number;

    @PrimaryColumn()
    productId: number;

    @Column()
    amount: number;

    @Column()
    price: number;
}