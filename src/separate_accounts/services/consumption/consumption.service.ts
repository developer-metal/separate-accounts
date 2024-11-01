import { ConflictException, ForbiddenException, HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreationConsumptionDto, MasterDetailsConsumptDto } from '../../../separate_accounts/dto/consumption.dto';
import { peopleProviders } from '../../../separate_accounts/model/people.providers';
import { consumptionDetailsProviders } from '../../../separate_accounts/model/consumptionDetail.providers';
import { CreateSeparateAccountDto } from '../../../separate_accounts/dto/account.dto';
import { accounstProviders } from '../../../separate_accounts/model/accounst.providers';
import { PeopleDto } from '../../../separate_accounts/dto/people.dto';
import { CreationConsumptionDetailsDto } from '../../../separate_accounts/dto/consumption_details.dto';
import { Connection } from 'mongoose';
import { consumptionsProviders } from '../../../separate_accounts/model/consumption.providers';
@Injectable()
export class ConsumptionService {

    private readonly logger = new Logger();
    private consumptionModel: Model<CreationConsumptionDto>;
    private accounstModel: Model<CreateSeparateAccountDto>;
    private peopleModel: Model<PeopleDto>;
    private detailsConsumModel: Model<CreationConsumptionDetailsDto>;
    private connection: Connection;
  
    constructor(@InjectModel(consumptionsProviders.name) _consumptionModel: Model<CreationConsumptionDto>,
    @InjectModel(accounstProviders.name) _accounstMode: Model<CreateSeparateAccountDto>,
    @InjectModel(peopleProviders.name) _peopleModel: Model<PeopleDto>,
    @InjectModel(consumptionDetailsProviders.name) _detailsConsumModel: Model<CreationConsumptionDetailsDto>,
    @InjectConnection() readonly _connection: Connection){
      this.consumptionModel = _consumptionModel;
      this.accounstModel = _accounstMode;
      this.peopleModel = _peopleModel;
        this.detailsConsumModel = _detailsConsumModel;
        this.connection = _connection;
    }
    async validarCuentaCerrada(dataConsumit: MasterDetailsConsumptDto): Promise<any> {

      try {
        if (dataConsumit?.accounts) {
          const existAccounts =  await this.accounstModel.findOne({ _id: dataConsumit?.accounts }).exec();
          if (!existAccounts) {
              throw new ConflictException (`No existen cuentas registradas`);
          }
          if (existAccounts?.status_account === false) {
              throw new ForbiddenException(`La cuenta se encuentra cerrada`);
          }
        }
        const responseAccount = await this.createConsumptionService(dataConsumit);
        return responseAccount;
      } catch (error) {
        this.logger.error(`[validarCuentaCerrada - create ] Error ${error} `);
            throw error;
      }
      
    }
    async createConsumptionService(dataConsumit: MasterDetailsConsumptDto):Promise<any> {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
          let infoAccount = 'Cuenta Abierta';
          this.logger.log(`[service - createConsumptionService - create ] Ok`);
          const { accounts, persons } = dataConsumit;
          const existAccounts =  await this.accounstModel.findOne({ _id: accounts }).exec();
          if (!existAccounts) {
                throw new ConflictException (`No existen cuentas registradas`);
          }
          const existPersons =  await this.peopleModel.findOne({ _id: persons }).exec();
            if (!existPersons) {
                    throw new ConflictException (`No existen personas registradas`);
            }
        const existAccoAndPersons =  await this.consumptionModel.findOne({ persons, accounts }).exec(); 
        if (existAccoAndPersons) {
            this.logger.log(`[service - createConsumptionService ] - Gastos Actualizados`);

           let data :any= await this.detailsConsumModel.findOneAndUpdate({consumption: existAccoAndPersons?._id},  {$set: { data_consumit: dataConsumit?.data_consumit }}, { new: true, upsert: false });
           if (!data) {
            throw new ConflictException (`No se pudo actualizar los gastos`);
           }

           if (dataConsumit.hasOwnProperty("propina") && dataConsumit?.propina === true) {
            data = { ...data.toObject(), propina: dataConsumit?.propina };
           }
          
           const total: string = this.totalConsumption(data);
           const requestDetails: string = total;
           await this.consumptionModel.findOneAndUpdate({_id: data?.consumption},{ total: requestDetails });
            return { name_account: existAccounts?.name, name_person: existPersons?.name , Total: String(total), status: infoAccount};
        }  
       
        const total = this.totalConsumption(dataConsumit);
        const { data_consumit, ...datatMod } = dataConsumit;
        const dataConsu= { ...datatMod, total};
        const consumptionSave: any = new this.consumptionModel(dataConsu);
        await consumptionSave.save({session});
        

       
        const detailsTotalSave: any = new this.detailsConsumModel({consumption: consumptionSave?._id, data_consumit: dataConsumit?.data_consumit});
        await detailsTotalSave.save({session});

      
        await session.commitTransaction();
        return { name_account: existAccounts?.name, name_person: existPersons?.name , Total: String(total), status: infoAccount};
      } catch (error) {
        this.logger.error(`[createConsumptionService - create ] Error ${error} `);
        await session.abortTransaction();
            throw error;
          } finally {
            session.endSession();
          }
      }

totalConsumption(consumptionSave): string {
    const response = consumptionSave?.data_consumit?.map((valor: any) => {  
      return valor?.count * parseFloat(valor?.unit_value);
    }) ?? [];
    let total = response.reduce((a: number, b: number) => a + b, 0);
    if (consumptionSave.hasOwnProperty("propina") && consumptionSave?.propina === true) {
        const propinaFormat: string = this.propipanPersonal(total).toString();
        return propinaFormat;
    }
    return total;
  }

  propipanPersonal(total: number): number {
    this.logger.log(`[service - propipanPersonal ] OK`);
    const propina = total * 0.10;
    total += propina;
    return total;
  }

  async groupByPersonsByAccountService(): Promise<any> {
    try {
      this.logger.log(`[service - groupByPersonsByAccount - find ] Ok`);
      const response: any  = await this.detailsConsumModel.find()
      .populate(
        {
          path: 'consumption', 
          select: 'total propina',
          populate: [
          {
            path: 'accounts',  
            select: 'name'
          },
          {
            path: 'persons',
            select: 'name'
          }
        ]
    })
      .exec();

    //agrupar por cuenta y persona y por gastado
     const groupByAccountByPesons = response.map((element: any) => {
        return {
          name_account: element?.consumption?.accounts?.name,
          name_person: element?.consumption?.persons?.name,
          total: element?.consumption?.total,
          propina: element?.consumption?.propina,
          data_consumit: element?.data_consumit.map((doc: any) => {
            return { name: doc?.product_gloss, count: doc?.count, unit_value: doc?.unit_value }
          })
        };

     });

      this.logger.log(`[service - groupByPersonsByAccount - find ] ${JSON.stringify(groupByAccountByPesons)}`);
      return groupByAccountByPesons;
    } catch (error) {
      this.logger.error(`[groupByPersonsByAccount - find ] Error ${error} `);
        throw error;
      }
  }
}
