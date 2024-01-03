import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { UserDocument } from './user.schema';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // @get user profile (own) authenticated
    @UseGuards(JwtAuthGuard)
    @Get('own')
    findOwn(@CurrentUser() user: UserDocument) {
        return user;
    }

    // @get all users
    @UseGuards(JwtAuthGuard, AdminGuard)
    @Get()
    async findAll() {
        return this.userService.findAll();
    }

}
