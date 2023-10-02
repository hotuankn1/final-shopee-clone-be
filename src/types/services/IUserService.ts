import { IUser } from "../models/IUser";

export interface IUserService {
    createUser(email: string, password: string): Promise<IUser> 
    getById (id: number): Promise<IUser>
    getByEmail (email: string): Promise<IUser[]>
    updateUser(id: number, attrs: Partial<IUser>)
    removeUser (id: number): Promise<IUser>
}