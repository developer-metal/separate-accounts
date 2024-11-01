import { accountsSchema } from '../schemas/accounts.schema';

export const accounstProviders = {
  name: 'Accounts',
  useFactory: () => accountsSchema
};
