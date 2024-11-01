import { Prop, Schema, SchemaFactory  } from '@nestjs/mongoose';
@Schema()
export class Accounts {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  place: string;
  @Prop({ required: true })
  status_account: boolean;
  @Prop({ required: false })
  total_account: string;
  @Prop({ required: false })
  creationDate: string;
  @Prop({ required: false })
  updateDate: string;
}
export const accountsSchema = SchemaFactory.createForClass(Accounts);
accountsSchema.index({ name: 1 }, { unique: true });