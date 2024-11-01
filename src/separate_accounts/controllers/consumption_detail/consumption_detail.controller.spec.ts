import { Test, TestingModule } from '@nestjs/testing';
import { ConsumptionDetailController } from './consumption_detail.controller';

describe('ConsumptionDetailController', () => {
  let controller: ConsumptionDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumptionDetailController],
    }).compile();

    controller = module.get<ConsumptionDetailController>(ConsumptionDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
