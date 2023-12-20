import { Body, Controller, HttpCode, HttpStatus, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() loginData: any) {
        return this.authService.login(loginData.email, loginData.password);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update-password')
    async updatePassword(@Request() req: any) {
        const {  currentPassword, newPassword } = req.body;
        const { userId } = req.user;
        return this.authService.updatePassword(userId, newPassword, currentPassword);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update-is-admin')
    async updateIsAdmin(@Request() req: any) {
        const { email, isAdmin } = req.body;
        return this.authService.updateIsAdmin(email, isAdmin);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update-is-active')
    async updateIsActive(@Request() req: any) {
        const { email, isActive } = req.body;
        return this.authService.updateIsActive(email, isActive);
    }
}
