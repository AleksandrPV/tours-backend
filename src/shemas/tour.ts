import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TourDocument = HydratedDocument<Tour>;

@Schema()
export class Tour {
  @Prop() name: string;

  @Prop() description: string;

  @Prop() tourOperator: string;

  @Prop() price: number;

  @Prop() img: string;

  @Prop() id: string;

  @Prop() type: string;

  @Prop() data: string;

}

export const TourSchema = SchemaFactory.createForClass(Tour);
