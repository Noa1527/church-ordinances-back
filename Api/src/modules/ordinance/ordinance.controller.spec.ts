import { Test, TestingModule } from '@nestjs/testing';
import { OrdinanceController } from './ordinance.controller';

describe('OrdinanceController', () => {
  let controller: OrdinanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdinanceController],
    }).compile();

    controller = module.get<OrdinanceController>(OrdinanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
