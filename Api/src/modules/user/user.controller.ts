import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // @get all users
    @UseGuards(JwtAuthGuard, AdminGuard)
    @Get()
    async findAll() {
        return this.userService.findAll();
    }

}
