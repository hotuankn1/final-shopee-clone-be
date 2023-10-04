import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProduct } from './order-products.entity';
import { OrdersController } from './orders.controller';
import { Order } from './orders.entity';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderProduct])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
