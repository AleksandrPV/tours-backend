import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { request } from 'http';
import mongoose from 'mongoose';
import { OrderDto } from 'src/dto/order-dto';
import { IOrder } from 'src/interfaces/order';
import { IMongoUser, IUser } from 'src/interfaces/user';
import { OrderService } from 'src/services/order/order.service';
import { UsersService } from 'src/services/users/users.service';
import { Order } from 'src/shemas/order';
import { jwtConstants } from 'src/static/private/constants';

@Controller('order')
export class OrderController {

  constructor(private orderService: OrderService, private jwtService: JwtService, private userService: UsersService) {}

  @Post() 
  initTours(@Body() data: OrderDto, @Req() request): Promise<boolean> {
    const authToken = <string>this.userService.extractTokenFromHeader(request);
    const userPayload = <IMongoUser>this.jwtService.verify(authToken, { secret: jwtConstants.secret });  
    const orderData = {...data, userId: userPayload._id} as any;
    this.orderService.sendOrder(orderData);   
    return Promise.resolve(true);
  } 

  // @Get()
  // getAllOrders(): Promise<Order[]> {
  //   return this.orderService.getOrders();
  // }
 
}
