import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IOrder } from 'src/interfaces/order';
import { IOrderPerson } from 'src/interfaces/order'; // Add this import


export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order implements IOrder {
  @Prop() tourId: string;
  @Prop() userId: string;
  @Prop({ type: Object}) orderPerson: IOrderPerson;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
