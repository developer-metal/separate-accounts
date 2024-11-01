import { peopleSchema } from '../schemas/people.schema';

export const peopleProviders = {
  name: 'People',
  useFactory: () => peopleSchema
};
