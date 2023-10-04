import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { IOrder, IOrderProduct } from 'src/types/models/IOrder';
import { User } from 'src/users/users.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor (
        private readonly ordersService: OrdersService
    ){}

    @Get()
    async getList(@Query('page') page: number, @Query('pageSize') pageSize: number, @CurrentUser() userId: string){
        const pagination = await this.ordersService.getList(page, pageSize, parseInt(userId))
        return pagination
    }

    @Post('/createOrUpdateCart')
    async createOrUpdateCart(@Body() body:IOrder, @CurrentUser() userId: string){
        const order = await this.ordersService.createOrUpdateCart(body, parseInt(userId))
        return order
    }

    @Get('/cart')
    async getCart(@CurrentUser() userId: string){
        console.log('get cart');
        const cart = await this.ordersService.getCart(parseInt(userId))
        return cart
    }

    @Delete('/deleteItems')
    async deleteItemsFromCart(@Body() body: IOrderProduct[] ,@CurrentUser() userId: string){
        const order = await this.ordersService.deleteItemsFromCart(body, parseInt(userId))
        return order
    }

    @Patch('/completeOrder')
    async completeOrder(@Body() body: IOrderProduct[] ,@CurrentUser() userId: string) {
        const order = await this.ordersService.completeOrder(body, parseInt(userId))
        return order
    }

    @Get('/:id')
    async getById(@Param('id') id: string){
        console.log('getById');
        
        const order = await this.ordersService.getById(parseInt(id))
        return order
    }
}
