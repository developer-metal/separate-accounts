import { Prop, Schema, SchemaFactory  } from '@nestjs/mongoose';
@Schema()
export class People {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  rut: string;
  @Prop({ required: false })
  status_register: boolean;
  @Prop({ required: false })
  creationDate: string;
  @Prop({ required: false })
  updateDate: string;
}
export const peopleSchema = SchemaFactory.createForClass(People);
peopleSchema.index({ name: 1 }, { unique: true });