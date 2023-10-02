import { IProduct } from "./IProduct";

export interface IProductLine{
    series: string,
    colors: string[] ;
    products: IProduct[]
}