import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICategoryService } from 'src/types/services/ICategoryService';
import { Repository } from 'typeorm';
import { Category } from './categories.entity';

@Injectable()
export class CategoriesService implements ICategoryService {
    constructor(@InjectRepository(Category) private repo: Repository<Category>){}

    getAll() {
        return this.repo.find();
    }
}
