import { ICategory } from "../models/ICategory"

export interface ICategoryService {
    getAll() : Promise<ICategory[]>
}
