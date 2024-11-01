import { Test, TestingModule } from '@nestjs/testing';
import { SeparateAccountsService } from './separate_accounts.service';

describe('SeparateAccountsService', () => {
  let service: SeparateAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeparateAccountsService],
    }).compile();

    service = module.get<SeparateAccountsService>(SeparateAccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
