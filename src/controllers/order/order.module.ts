import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from 'src/shemas/order';
import { OrderService } from 'src/services/order/order.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
