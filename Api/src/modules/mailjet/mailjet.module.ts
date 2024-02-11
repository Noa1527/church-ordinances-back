import { Module } from '@nestjs/common';
import { MailjetService } from './mailjet.service';

@Module({
  providers: [MailjetService],
  exports: [MailjetService],
  imports: [],
})
export class MailjetModule {}
