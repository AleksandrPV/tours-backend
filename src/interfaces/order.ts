import mongoose, * as monggoose from 'mongoose';
export interface IOrderPerson {
  age: string,
  birthDay: string,
  cardNumber: string,
  lastName: string,
  firstName: string,
  citizenship: string
}

export interface IOrder {
  tourId: string,
  userId: string,
  _id?: string,
  orderPerson: IOrderPerson
}