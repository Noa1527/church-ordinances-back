import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from 'src/modules/teams/teams.schema';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Regions } from '../user/dto/create-user.dto';
import { CreateTeamDto } from './dto/create-team.sto';
import { ConfigureTeamsDto } from './dto/configure-teams.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from '../user/user.schema';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('config')
  async configureTeams(
    @Body() config: ConfigureTeamsDto,
    @CurrentUser() user: User
  ): Promise<any> {
    console.log('config', config);
    console.log({ message: `Configuration appliquée : ${config.maxTeams} équipes dans la région ${user.regions}` });
    
    return this.teamsService.syncTeamsForRegion(user.regions, config.maxTeams);
     
  }

  @Post()
  create(@Body() team: CreateTeamDto): Promise<Team> {
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
  update(
    @Param('seq') seq: string, 
    @Body() team: Partial<Team>
  ): Promise<Team> {
    return this.teamsService.update(seq, team);
  }
}