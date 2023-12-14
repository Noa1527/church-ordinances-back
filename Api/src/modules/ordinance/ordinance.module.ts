import { Module } from '@nestjs/common';
import { OrdinanceService } from './ordinance.service';
import { OrdinanceController } from './ordinance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ordinance, OrdinanceSchema } from './ordinance.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ordinance.name, schema: OrdinanceSchema }]),

  ],
  providers: [OrdinanceService],
  controllers: [OrdinanceController]
})
export class OrdinanceModule {}
