import { IsDateString, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import {IOrder} from '../interfaces/order';

export class OrderDto implements IOrder {
  // @IsInt()
  // @Min(18)
  // @Max(100)
  // @IsNotEmpty() 
  age: string;
  // @IsNotEmpty()
  // @IsDateString()
  birthDay: string;
  // @IsNotEmpty() 
  cardNumber: string;
  // @IsNotEmpty() 
  tourId: string;
  // @IsNotEmpty() 
  userId: string;

  constructor(age: string, birthDay: string, cardNumber: string, tourId: string, orderId:string, userId: string) {
    this.age = age;
    this.birthDay = birthDay;
    this.cardNumber = cardNumber;
    this.tourId = tourId;
    this.userId = userId;
  }
}