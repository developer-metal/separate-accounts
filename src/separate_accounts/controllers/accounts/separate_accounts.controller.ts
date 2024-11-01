import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Res, Req, HttpStatus } from '@nestjs/common';
import { SeparateAccountsService } from '../../services/separate_accounts.service';
import { AccountCloudDto, CreateSeparateAccountDto } from '../../dto/account.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('separate-accounts')
@ApiTags('Cuentas Mesa')
export class SeparateAccountsController {
  private readonly logger = new Logger();
  private _separateAccountsService: SeparateAccountsService;
  constructor(_separateAccountsService: SeparateAccountsService) {
    this._separateAccountsService = _separateAccountsService;
  }

  @Post()
  @ApiOperation({ summary: 'creacion de cuentas Mesa', description: '' })
  async createAccount(@Res() response: any, @Body() saveAccount: CreateSeparateAccountDto): Promise<any> {
    try {
        const responseSave = await this._separateAccountsService.createAccountService(saveAccount);
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
  }
  @Patch(':id')
  async cerrarCuenta(@Res() response: any, @Param('id') id: string, @Body() accountClouse: AccountCloudDto):Promise<any> {
  try {
        const statusAccount = await this._separateAccountsService.cerrarCuentaService(id, accountClouse);
        return response.status(HttpStatus.OK).send({ code: HttpStatus.OK, payload: statusAccount });
    } catch (error) {
      this.logger.error(`[controller - cerrarCuenta ] Error ${JSON.stringify(error)}`);
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
