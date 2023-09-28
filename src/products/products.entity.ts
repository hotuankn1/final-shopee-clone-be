import { Category } from "src/categories/categories.entity";
import { OrderProduct } from "src/orders/order-products.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    series: number;

    @Column()
    color: string;

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