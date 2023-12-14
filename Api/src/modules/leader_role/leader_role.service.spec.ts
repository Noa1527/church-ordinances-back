import { Test, TestingModule } from '@nestjs/testing';
import { LeaderRoleService } from './leader_role.service';

describe('LeaderRoleService', () => {
  let service: LeaderRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaderRoleService],
    }).compile();

    service = module.get<LeaderRoleService>(LeaderRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
