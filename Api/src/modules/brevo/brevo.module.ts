import { Module } from '@nestjs/common';
import { BrevoService } from './brevo.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [BrevoService],
  exports: [BrevoService],
  imports: [
    HttpModule
  ],
})
export class BrevoModule {}
