import { IOrder, IOrderProduct } from "../models/IOrder";
import { IPagination } from "../models/IPagination";


export interface IOrderService {
    getList(page: number, pageSize, userId: number) : Promise<IPagination<IOrder>>
    getById(orderId: number): Promise<IOrder>
    createOrUpdateCart(updateDetails: Partial<IOrder>, userId: number): Promise<IOrder>
    getCart(userId: number): Promise<IOrder>
    deleteItemsFromCart(orderProducts: IOrderProduct[], userId: number): Promise<IOrder>
    completeOrder(selectedOrderProducts: IOrderProduct[], userId: number): Promise<IOrder>
}