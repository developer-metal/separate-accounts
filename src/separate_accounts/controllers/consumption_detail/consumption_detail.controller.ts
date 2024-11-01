import { Body, Controller, HttpStatus, Logger, Post, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreationConsumptionDto } from '../../../separate_accounts/dto/consumption.dto';

@Controller('consumption-detail')
export class ConsumptionDetailController {

  /*  private readonly logger = new Logger();


    @Post()
    @ApiOperation({ summary: 'creacion de gatos por persona', description: '' })
    async createConsumption(@Res() response: any, @Body() saveAccount: CreationConsumptionDto): Promise<any> {
      try {
          const responseSave = await this._separateAccountsService.createConsumptionService(saveAccount);
          return response.status(HttpStatus.CREATED).send({
            code: HttpStatus.CREATED,
            payload: responseSave
          });
      } catch (error) {
        this.logger.error(`[controller - createAccount ] Error ${JSON.stringify(error)}`);
        return response.status(500).send({
          time: new Date().toISOString(),
          error: {
            code: error.response.status,
            message: error.response.message
          }
        });
      }
    }*/

}
