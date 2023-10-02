import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserService } from 'src/types/services/IUserService';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService implements IUserService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    createUser(email: string, password: string) {
        const user = this.repo.create({ email, password });

        return this.repo.save(user);
    }

    getById(id: number) {
        if(!id) {
            return null
        }
        return this.repo.findOne({
            where: {
                id: id
            }
        });
    }

    getByEmail(email: string) {
        return this.repo.find({
            where: {
                email: email
            }
        });
    }

    async updateUser(id: number, attrs: Partial<User>) {
        const user = await this.getById(id)

        if (!user) {
            throw new NotFoundException('User not found');
        }

        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    async removeUser(id: number) {
        const user = await this.getById(id)
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.repo.remove(user);
    }
}   
