import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/shemas/order';
import { OrderService } from 'src/services/order/order.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/services/users/users.service';
import { User, UserSchema } from 'src/shemas/user';
import { Tour, TourSchema } from 'src/shemas/tour';

// @Module({
//   imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }, name: Order.name, schema: OrderSchema ])],

//   controllers: [OrderController],
//   providers: [OrderService, JwtService, UsersService]
// })
// export class OrderModule {}

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: User.name, schema: UserSchema},
      { name: Tour.name, schema: TourSchema},
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, JwtService, UsersService],
})
export class OrderModule {}
