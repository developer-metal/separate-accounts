import { consumptionDetailsSchema } from '../schemas/consumption_detail.schema';

export const consumptionDetailsProviders = {
  name: 'ConsumptionDetails',
  useFactory: () => consumptionDetailsSchema
};