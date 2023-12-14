import { Module } from '@nestjs/common';
import { BlessingService } from './blessing.service';
import { BlessingController } from './blessing.controller';
import { Blessing, BlessingSchema } from './blessing.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blessing.name, schema: BlessingSchema }]),

  ],
  providers: [BlessingService],
  controllers: [BlessingController]
})
export class BlessingModule {}
