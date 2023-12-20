import { Body, Controller, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { OrdinanceService } from './ordinance.service';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOrdinanceDto } from './dto/create-ordinance.dto';
import { UpdateOrdinanceDto } from './dto/update-odinance.dto';

@Controller('ordinance')
export class OrdinanceController {
    constructor(private readonly ordinanceService: OrdinanceService) {}

    // create ordinance
    @UseGuards(JwtAuthGuard, AdminGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create( @Body() createOrdonanceDto: CreateOrdinanceDto) {
        return this.ordinanceService.create(createOrdonanceDto);
    }

    // update ordinance
    @UseGuards(JwtAuthGuard, AdminGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateOrdinanceDto: UpdateOrdinanceDto) {
        return this.ordinanceService.update(id, updateOrdinanceDto);
    }
}
