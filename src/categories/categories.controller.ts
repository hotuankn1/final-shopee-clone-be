import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService,
    ) { }
    
    @Get()
    getAll() {
        return this.categoriesService.getAll()
    }
}
