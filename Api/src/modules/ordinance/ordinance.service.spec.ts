import { Test, TestingModule } from '@nestjs/testing';
import { OrdinanceService } from './ordinance.service';

describe('OrdinanceService', () => {
  let service: OrdinanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdinanceService],
    }).compile();

    service = module.get<OrdinanceService>(OrdinanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
