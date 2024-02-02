import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CreateLeaderRoleDto } from './dto/create-leader-role.dto';
import { LeaderRoleService } from './leader_role.service';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('leader-role')
export class LeaderRoleController {

    constructor(private readonly _leaderRoleService: LeaderRoleService) {}

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create( @Body() createLeaderRoleDto: CreateLeaderRoleDto) {
        return this._leaderRoleService.create(createLeaderRoleDto);
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        return this._leaderRoleService.findAll();
    }

}
