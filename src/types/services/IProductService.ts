import { IPagination } from "../models/IPagination";
import { IProduct } from "../models/IProduct";
import { IProductLine } from "../models/IProductline";


export interface IProductService {
    getListProductLine (page: number, pageSize: number, search: string ,categoryId: number ): Promise<IPagination<IProductLine>>,
    getById (id: number) : Promise<IProduct>
}