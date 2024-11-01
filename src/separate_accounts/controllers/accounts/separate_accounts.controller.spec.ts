import { Test, TestingModule } from '@nestjs/testing';
import { SeparateAccountsController } from './separate_accounts.controller';
import { SeparateAccountsService } from '../../services/separate_accounts.service';

describe('SeparateAccountsController', () => {
  let controller: SeparateAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeparateAccountsController],
      providers: [SeparateAccountsService],
    }).compile();

    controller = module.get<SeparateAccountsController>(SeparateAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
