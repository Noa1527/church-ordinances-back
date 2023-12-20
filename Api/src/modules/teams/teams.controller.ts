import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from 'src/modules/teams/teams.schema';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() team: Partial<Team>): Promise<Team> {
    return this.teamsService.create(team);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  findAll(): Promise<Team[]> {
    return this.teamsService.findAll();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Team> {
    return this.teamsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':seq')
  update(@Param('seq') seq: string, @Body() team: Partial<Team>): Promise<Team> {
    return this.teamsService.update(seq, team);
  }
}