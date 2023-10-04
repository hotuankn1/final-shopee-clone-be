import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IOrder, IOrderProduct } from 'src/types/models/IOrder';
import { IPagination } from 'src/types/models/IPagination';
import { IOrderService } from 'src/types/services/IOrderService';
import { Repository } from 'typeorm';
import { OrderProduct } from './order-products.entity';
import { Order } from './orders.entity';

@Injectable()
export class OrdersService implements IOrderService {
    constructor(
        @InjectRepository(Order) private orderRepo: Repository<Order>,
        @InjectRepository(OrderProduct) private orderProductRepo: Repository<OrderProduct>,
    ) { }

    async getList(page: number, pageSize: any, userId: number): Promise<IPagination<IOrder>> {
        if (!userId) {
            throw new BadRequestException('Not have any user')
        }
        const query = this.orderRepo.createQueryBuilder('order')
            .where(`order.userId = ${userId}`)
            .andWhere(`order.status = 'completed'`)
            .skip((page - 1) * pageSize)
            .take(pageSize);

        const [items, totalItems] = await query.getManyAndCount();

        const totalPages = Math.ceil(totalItems / pageSize);


        const pagination: IPagination<IOrder> = {
            totalPages,
            page,
            totalItems,
            pageSize,
            items,
        };

        return pagination
    }
    getById(id: number): Promise<IOrder> {
        if (!id) {
            return null
        }
        return this.orderRepo.findOne({
            where: {
                id: id
            },
            relations: ['orderProducts'],
        });
    }
    async createOrUpdateCart(order: IOrder, userId: number): Promise<IOrder> {
        console.log("UserId:", userId)
        if (!userId) {
            throw new BadRequestException('Not have any user')
        }
        if (!order) {
            throw new BadRequestException('Not have any updateDetails')
        }

        if (!order.id) {
            throw new BadRequestException('Not have order id')
        }


        let cart = await this.getCart(userId)
        if (cart.id != order.id) {
            throw new BadRequestException('order id mismatch with cart id')
        }

        else {
            if (order.orderProducts && order.orderProducts.length > 0) {
                await this.orderRepo.createQueryBuilder('order_product')
                    .delete()
                    .from('order_product')
                    .where(`orderId = ${order.id}`)
                    .execute();

                for (let i = 0; i < order.orderProducts.length; i++) {
                    const newOrderProduct = await this.orderProductRepo.create({
                        orderId: order.id,
                        productId: order.orderProducts[i].productId,
                        amount: order.orderProducts[i].amount,
                        price: order.orderProducts[i].price
                    })
                    await this.orderProductRepo.save(newOrderProduct)

                }
            }

            cart = await this.getCart(userId)
            return await this.orderRepo.save(cart)
        }


    }
    async getCart(userId: number): Promise<IOrder> {
        if (!userId) {
            throw new BadRequestException('Not have any user')
        }
        let cart = await this.orderRepo.findOne({
            where: {
                status: 'pending',
                userId: userId
            },
            relations: ['orderProducts'],
        })


        if (!cart) {
            cart = await this.orderRepo.create({
                userId: userId,
                status: 'pending',
                orderProducts: []
            })
        }

        console.log('Cart', cart);

        return cart
    }
    async deleteItemsFromCart(orderProducts: IOrderProduct[], userId: number): Promise<IOrder> {
        if (orderProducts.length <= 0) {
            throw new BadRequestException('Not have any order products')
        }
        if (!userId) {
            throw new BadRequestException('Not have any user')
        }
        const cart = await this.getCart(userId)
        if (!cart) {
            throw new NotFoundException('Cart not found')
        }

        let newOrderProducts: IOrderProduct[] = []

        for (let i = 0; i < orderProducts.length; i++) {
            newOrderProducts = cart.orderProducts.filter(p => p.productId !== orderProducts[i].productId);
        }

        if (newOrderProducts.length == cart.orderProducts.length) {
            throw new BadRequestException('not found order products in cart')
        }

        const newCart = { ...cart, orderProducts: newOrderProducts }
        console.log('newCart', newCart);

        await this.createOrUpdateCart(newCart, userId)
        return newCart
    }

    async completeOrder(selectedOrderProducts: IOrderProduct[], userId: number): Promise<IOrder> {
        if (selectedOrderProducts.length <= 0) {
            throw new BadRequestException('Not have any order products')
        }
        if (!userId) {
            throw new BadRequestException('Not have any user')
        }
        const currentTime = new Date()
        const order = await this.orderRepo.create({
            purchasedDate: currentTime,
            status: 'completed',
            userId: userId
        })
        console.log(order);
        await this.orderRepo.save(order)
        for (let i = 0; i < selectedOrderProducts.length; i++) {
            const completedOrderProduct = await this.orderProductRepo.create({
                amount: selectedOrderProducts[i].amount,
                orderId: order.id,
                price: selectedOrderProducts[i].price,
                productId: selectedOrderProducts[i].productId
            })
            await this.orderProductRepo.save(completedOrderProduct)
        }
        await this.deleteItemsFromCart(selectedOrderProducts, userId)


        return this.getById(order.id)
    }

}
