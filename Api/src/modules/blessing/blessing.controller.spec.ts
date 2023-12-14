import { Test, TestingModule } from '@nestjs/testing';
import { BlessingController } from './blessing.controller';

describe('BlessingController', () => {
  let controller: BlessingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlessingController],
    }).compile();

    controller = module.get<BlessingController>(BlessingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
