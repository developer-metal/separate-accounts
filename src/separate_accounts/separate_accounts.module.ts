import { Module } from '@nestjs/common';
import { SeparateAccountsService } from './services/separate_accounts.service';
import { SeparateAccountsController } from './controllers/accounts/separate_accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { accounstProviders } from './model/accounst.providers';
import { peopleProviders } from './model/people.providers';
import { consumptionsProviders } from './model/consumption.providers';
import { consumptionDetailsProviders } from './model/consumptionDetail.providers';
import { PeopleController } from './controllers/people/people.controller';
import { PeopleService } from './services/people.service';
import { ConsumptionController } from './controllers/consumption/consumption.controller';
import { ConsumptionDetailController } from './controllers/consumption_detail/consumption_detail.controller';
import { ConsumptionService } from './services/consumption/consumption.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([accounstProviders, peopleProviders, consumptionsProviders, consumptionDetailsProviders])
  ],
  controllers: [SeparateAccountsController, PeopleController, ConsumptionController, ConsumptionDetailController],
  providers: [SeparateAccountsService, PeopleService, ConsumptionService],
})
export class SeparateAccountsModule {}
