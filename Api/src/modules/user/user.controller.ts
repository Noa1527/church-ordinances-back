import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
// import { AuthGuard } from '../auth/guards/jwt-auth.guard';
// import { AuthGuard } from '@nestjs/passport';

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
