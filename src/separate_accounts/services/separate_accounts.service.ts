import { ConflictException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AccountCloudDto, CreateSeparateAccountDto } from '../dto/account.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { accounstProviders } from '../model/accounst.providers';
import { CreationConsumptionDto } from '../dto/consumption.dto';
import { consumptionsProviders } from '../model/consumption.providers';
import { consumptionDetailsProviders } from '../model/consumptionDetail.providers';
import { CreationConsumptionDetailsDto } from '../dto/consumption_details.dto';
import { ConsumptionService } from './consumption/consumption.service';

@Injectable()
export class SeparateAccountsService {

  private readonly logger = new Logger();
  private accounstModel: Model<CreateSeparateAccountDto>;
  private consumptionModel: Model<CreationConsumptionDto>;
  private detailsConsumModel: Model<CreationConsumptionDetailsDto>;
  private consumptionService: ConsumptionService;

  constructor(@InjectModel(accounstProviders.name) _accounstMode: Model<CreateSeparateAccountDto>,
  @InjectModel(consumptionsProviders.name) _consumptionModel: Model<CreationConsumptionDto>,
  @InjectModel(consumptionDetailsProviders.name) _detailsConsumModel: Model<CreationConsumptionDetailsDto>,
  readonly _consumptionService: ConsumptionService){
    this.accounstModel = _accounstMode;
    this.consumptionModel = _consumptionModel;
    this.detailsConsumModel = _detailsConsumModel;
    this.consumptionService = _consumptionService;

  }
  async createAccountService(createSeparateAccountDto: CreateSeparateAccountDto):Promise<any> {
      try {
        this.logger.log(`[service - createAccountService - create ] Ok`);
        const response_create = { message: 'Cuenta Creada' };
        const accountBody = {...createSeparateAccountDto, status_account: true};
        const accountSave = new this.accounstModel(accountBody);
        await accountSave.save();
        return response_create;
    } catch (error) {
      this.logger.error(`[createAccountService - create ] Error ${error} `);
       if (error.code === 11000) {
        throw new ConflictException (`La cuenta ya está en uso`);
        } else {
            throw error;
        }
    }
  }

  async cerrarCuentaService(id, accountClouse: AccountCloudDto):Promise<any> {
    try {
      let contentTotal: Array<any> = [];
      this.logger.log(`[service - cerrarCuentaService - update ] Ok`);
      let response_update = { message: `Cuenta ${accountClouse?.status_account ? 'Abierta' : 'Cerrada'}` };
      const accountBody = {...accountClouse, status_account: accountClouse?.status_account};
      await this.accounstModel.findByIdAndUpdate(id, accountBody, { new: true });
      const accounts: any = await this.consumptionModel.find({ accounts: id }).exec();
    
      if (accounts.length > 0) {
        for (const element of accounts) {
      
          let respoAccount: any = await this.detailsConsumModel.find({consumption: element?._id},{ _id: 0, data_consumit: 1 }).exec();

         respoAccount.forEach((doc) => {
          contentTotal = contentTotal.concat(doc.data_consumit);
          });
         
        }       
      }
      const dataAccount = { data_consumit: contentTotal };
      const totalResponse = this.consumptionService.totalConsumption(dataAccount);
      this.logger.log(`[service - cerrarCuentaService - update ] Total General ${totalResponse}`);
      const accountBodyUpdate = { ...response_update, Total_General: totalResponse };
      return accountBodyUpdate;
    } catch (error) {
      this.logger.error(`[cerrarCuentaService - update ] Error ${error} `);
        throw error;
      }
    }
  
  }