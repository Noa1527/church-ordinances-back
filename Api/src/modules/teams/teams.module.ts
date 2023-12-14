import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from 'src/modules/teams/teams.schema';
import { TeamsController } from './teams.controller';
import { TeamsService } from 'src/modules/teams/teams.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}