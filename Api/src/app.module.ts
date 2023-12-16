import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { CommentModule } from './modules/comment/comment.module';
import { MemberModule } from './modules/member/member.module';
import { OrdinanceModule } from './modules/ordinance/ordinance.module';
import { BlessingModule } from './modules/blessing/blessing.module';
import { LeaderRoleModule } from './modules/leader_role/leader_role.module';
import { AuthModule } from './modules/auth/auth.module';
import { TeamsModule } from './modules/teams/teams.module';
import { FamilyModule } from './modules/family/family.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UserModule,
    CommentModule,
    MemberModule,
    OrdinanceModule,
    BlessingModule,
    LeaderRoleModule,
    AuthModule,
    TeamsModule,
    FamilyModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
