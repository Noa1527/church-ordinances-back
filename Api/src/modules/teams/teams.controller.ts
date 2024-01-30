import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from 'src/modules/teams/teams.schema';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Regions } from '../user/dto/create-user.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  // @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() team: Partial<Team>): Promise<Team> {
    return this.teamsService.create(team);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query('region') region: Regions): Promise<Team[]> {
    return this.teamsService.findAll(region);
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