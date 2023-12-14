import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { JwtService } from '@nestjs/jwt';
import { LeaderRoles, LeaderRolesSchema } from '../leader_role/leader_role.schema';
import { LeaderRoleService } from '../leader_role/leader_role.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: User.name, schema: UserSchema },
        { name: LeaderRoles.name, schema: LeaderRolesSchema}
      ]
    ),
  ],
  controllers: [UserController],
  providers: [UserService, JwtService, LeaderRoleService],
  exports: [UserService],
})
export class UserModule {}
