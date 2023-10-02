import { Category } from "src/categories/categories.entity";
import { OrderProduct } from "src/orders/order-products.entity";
import { IProduct } from "src/types/models/IProduct"; 
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product implements IProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    series: string;

    @Column()
    color: "white" | "green" | "black" | "red";

    @Column()
    inventoryAmount: number;

    @Column()
    price: number;

    @Column()
    image: string

    @Column()
    categoryId: number;

    @ManyToOne(() => Category, (category) => category.products )
    category: Category;

    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
    orderProducts: OrderProduct[]
}