import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService : ProductsService){}

    @Get()
    getListProductLine(@Query('page') page: number, @Query('pageSize') pageSize: number, @Query('search') search: string, @Query('categoryId') categoryId: number){
        return this.productsService.getListProductLine(page, pageSize, search, categoryId)
    }

    @Get('/:id')
    async getById(@Param('id') id: string) {
        const product = await this.productsService.getById(parseInt(id))
        if(!product) {
            throw new NotFoundException('product not found')
        }
        return product
    }
}
