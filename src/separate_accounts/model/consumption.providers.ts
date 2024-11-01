import { consumptionSchema } from '../schemas/consumption.schema';
export const consumptionsProviders = {
  name: 'Consumption',
  useFactory: () => consumptionSchema
};