import { ConflictException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { peopleProviders } from '../model/people.providers';
import { PeopleDto } from '../dto/people.dto';

@Injectable()
export class PeopleService {

  private readonly logger = new Logger();
  private peopleModel: Model<PeopleDto>;

  constructor(@InjectModel(peopleProviders.name) _peopleModel: Model<PeopleDto>){
    this.peopleModel = _peopleModel;
  }
  async createPeopleService(peopleDto: PeopleDto):Promise<any> {
      try {
        this.logger.log(`[service - createPeopleService - create ] Ok`);
        const message_create = { message: 'Informacion de persona registrada con exito.' };
        const peopleBody = {...peopleDto, status_register: true};
        const peopleSave = new this.peopleModel(peopleBody);
        await peopleSave.save();
        return message_create;
    } catch (error) {
      this.logger.error(`[createPeopleService - create ] Error ${error} `);
       if (error.code === 11000) {
        throw new ConflictException (`La persona Ya se encuentra registrada`);
        } else {
            throw error;
        }
    }
  }
  
 /* findAll() {
    return `This action returns all separateAccounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} separateAccount`;
  }

  update(id: number, updateSeparateAccountDto: UpdateSeparateAccountDto) {
    return `This action updates a #${id} separateAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} separateAccount`;
  }*/
}
