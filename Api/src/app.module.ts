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
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './modules/mail/mail.service';
import { MailController } from './modules/mail/mail.controller';
import { MailModule } from './modules/mail/mail.module';
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
    MailerModule.forRoot({
      transport: {
        useFactory: async (configService: ConfigService) => ({
          service: 'gmail',
          auth: {
            user: configService.get<string>('MAILER_USER'),
            pass: configService.get<string>('MAILER_PASSWORD'),
          },
        }),
      },
    }),
    UserModule,
    CommentModule,
    MemberModule,
    OrdinanceModule,
    BlessingModule,
    LeaderRoleModule,
    AuthModule,
    TeamsModule,
    MailerModule,
    MailModule,
    FamilyModule,

  ],
  controllers: [AppController, MailController],
  providers: [AppService, MailService],
})
export class AppModule {}
