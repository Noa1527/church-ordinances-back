import { Module } from '@nestjs/common';
import { FamilyService } from './family.service';
import { FamilyController } from './family.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Family, FamilySchema } from './family.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Family.name, schema: FamilySchema },
    ]),
  ],
  providers: [FamilyService],
  controllers: [FamilyController],
  exports: [FamilyService],
})
export class FamilyModule {}
