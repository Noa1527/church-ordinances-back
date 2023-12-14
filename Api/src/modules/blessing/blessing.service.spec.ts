import { Test, TestingModule } from '@nestjs/testing';
import { BlessingService } from './blessing.service';

describe('BlessingService', () => {
  let service: BlessingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlessingService],
    }).compile();

    service = module.get<BlessingService>(BlessingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
