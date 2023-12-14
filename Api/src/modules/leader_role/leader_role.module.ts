import { Module } from '@nestjs/common';
import { LeaderRoleService } from './leader_role.service';
import { LeaderRoleController } from './leader_role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaderRoles, LeaderRolesSchema } from './leader_role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LeaderRoles.name, schema: LeaderRolesSchema }]),
  ],
  providers: [LeaderRoleService],
  controllers: [LeaderRoleController],
  exports: [LeaderRoleService],
})
export class LeaderRoleModule {}
