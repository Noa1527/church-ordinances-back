import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { BlessingService } from './blessing.service';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateBlessingDto } from './dto/create-blessing.dto';

@Controller('blessing')
export class BlessingController {

    constructor(private readonly blessingService: BlessingService) {}

     // create ordinance
     @UseGuards(JwtAuthGuard, AdminGuard)
     @Post()
     @HttpCode(HttpStatus.CREATED)
     async create( @Body() createBlessingDto: CreateBlessingDto) {
         return this.blessingService.create(createBlessingDto);
     }
}
