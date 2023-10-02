export interface IOrderProduct {
    productId: number;
    amount: number
}


export interface IOrder {
    id: number;
    purchasedDate?: Date;
    status: 'pending' | "completed";
    orderProducts: IOrderProduct[]
}