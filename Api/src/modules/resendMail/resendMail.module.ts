import { Module } from '@nestjs/common';
import { ResendService } from './resendMail.service';
import { ConfigService } from '@nestjs/config';
import { ResendModule } from 'nest-resend';

@Module({
  imports: [
    ResendModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('RESEND_KEY')
      }),
    }),
  ],
  providers: [ResendService],
  exports: [ResendService],
})
export class ResendMailModule {}

