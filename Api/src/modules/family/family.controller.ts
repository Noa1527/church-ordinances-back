import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { FamilyService } from './family.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateFamilyDto } from './dto/create-family.dto';
import { AdminGuard } from '../auth/guards/admin.guard';
import { Regions } from '../user/dto/create-user.dto';

@Controller('family')
export class FamilyController {

    constructor(private readonly _familyService: FamilyService) {}

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createFamilyDto: CreateFamilyDto) {
        return this._familyService.create(createFamilyDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query('region') region: Regions) {
        return this._familyService.findAll(region);
    }
}
