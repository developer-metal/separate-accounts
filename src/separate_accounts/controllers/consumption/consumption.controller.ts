import { Body, Controller, Get, HttpStatus, Logger, Param, Post, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreationConsumptionDto, MasterDetailsConsumptDto } from '../../../separate_accounts/dto/consumption.dto';
import { ConsumptionService } from 'src/separate_accounts/services/consumption/consumption.service';

@Controller('consumption')
export class ConsumptionController {
    private readonly logger = new Logger();
    private consumptionService: ConsumptionService;
    constructor(_consumptionService: ConsumptionService) {
      this.consumptionService = _consumptionService;
    }
  
    @Post()
    @ApiOperation({ summary: 'creacion de gatos por persona', description: '' })
    async createConsumption(@Res() response: any, @Body() saveAccount: MasterDetailsConsumptDto): Promise<any> {
      try {
          const responseSave = await this.consumptionService.validarCuentaCerrada(saveAccount);
          return response.status(HttpStatus.CREATED).send({
            code: HttpStatus.CREATED,
            payload: responseSave
          });
      } catch (error) {
        this.logger.error(`[controller - createConsumption ] Error ${JSON.stringify(error.response.statusCode)}`);
        return response.status(error.response.statusCode).send({
          time: new Date().toISOString(),
          error: {
            code: error.response.statusCode,
            message: error.response.message
          }
        });
      }
    }
    @Get()
    @ApiOperation({ summary: 'Grupo de gatos por persona por cuenta', operationId: 'cuenta id' })
    async groupByPersonsByAccount(@Res() response: any): Promise<any> {
      try {
        this.logger.log(`[controller - groupByPersonsByAccount ] Ok`);
        const payloadHtml = await this.consumptionService.groupByPersonsByAccountService();
        return response.status(HttpStatus.OK).send(payloadHtml);
      } catch (error) {
        this.logger.error(`[controller - groupByPersonsByAccount - Error ] `);
        return response.status(error.response.statusCode).send({
          time: new Date().toISOString(),
          error: {
            code: error.response.statusCode,
            message: error.response.message
          }
        });
      }
   }

}
