import { Prop, Schema, SchemaFactory  } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Accounts } from './accounts.schema';
import { People } from './people.schema';
@Schema()
export class Consumption {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Accounts'})
  accounts: Accounts;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'People'})
  persons: People;
  @Prop({ required: true })
  total: string;
  @Prop({ required: false, default: false })
  propina: boolean;
  @Prop({ required: false })
  creationDate: string;
  @Prop({ required: false })
  updateDate: string;
}
export const consumptionSchema = SchemaFactory.createForClass(Consumption);