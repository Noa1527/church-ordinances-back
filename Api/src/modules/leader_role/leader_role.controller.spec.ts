import { Test, TestingModule } from '@nestjs/testing';
import { LeaderRoleController } from './leader_role.controller';

describe('LeaderRoleController', () => {
  let controller: LeaderRoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaderRoleController],
    }).compile();

    controller = module.get<LeaderRoleController>(LeaderRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
