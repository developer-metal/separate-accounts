import { Body, Controller, HttpStatus, Logger, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PeopleDto } from 'src/separate_accounts/dto/people.dto';
import { PeopleService } from '../../../separate_accounts/services/people.service';

@Controller('people')
@ApiTags('Personas cuentas')
export class PeopleController {
    private readonly logger = new Logger();
    private _peopleService: PeopleService;
    constructor(_peopleService: PeopleService) {
      this._peopleService = _peopleService; 
    }
    @Post()
    @ApiOperation({ summary: 'creacion de Persona cuenta', description: '' })
    async createPeople(@Res() response: any, @Body() dataPeople: PeopleDto): Promise<any> {
      try {
          const responseSave = await this._peopleService.createPeopleService(dataPeople);
          this.logger.log(`[controller - createPeople ] OK`);
          return response.status(HttpStatus.CREATED).send({
            code: HttpStatus.CREATED,
            payload: responseSave
          });
      } catch (error) {
        this.logger.error(`[controller - createPeople ] Error ${JSON.stringify(error)}`);
        return response.status(500).send({
          time: new Date().toISOString(),
          error: {
            code: error.response.status,
            message: error.response.message
          }
        });
      }
    }
}
