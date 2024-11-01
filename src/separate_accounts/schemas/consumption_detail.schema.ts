import { Prop, Schema, SchemaFactory  } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Consumption } from './consumption.schema';
import { DataConsumit } from '../dto/consumption_details.dto';
@Schema()
export class ConsumptionDetails {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Consumption'})
  consumption: Consumption;
  @Prop({ required: true })
  data_consumit: DataConsumit[];
  @Prop({ required: false })
  creationDate: string;
  @Prop({ required: false })
  updateDate: string;
}
export const consumptionDetailsSchema = SchemaFactory.createForClass(ConsumptionDetails);
consumptionDetailsSchema.index({ consumption: 1 }, { unique: true });