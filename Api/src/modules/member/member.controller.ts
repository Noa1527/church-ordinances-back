import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { MemberService } from './member.service';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './member.schema';
import { Regions } from '../user/dto/create-user.dto';

@Controller('member')
export class MemberController {
    constructor(private readonly memberService: MemberService) {}

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createMemberDto: CreateMemberDto) {
        return this.memberService.create(createMemberDto);
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Get()
    async findAll(@Query('region') region: Regions) {
        return this.memberService.findAll(region);
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Get('leaders')
    findLeaders(@Query('region') region: Regions): Promise<Member[]> {
       return this.memberService.findLeaders(region);
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Get('womenLeaders')
    findWomenLeaders(@Query('region') region: Regions): Promise<Member[]> {
        return this.memberService.findWomenLeaders(region);
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Get('/:id([0-9a-fA-F]{24})')
    async findOneById(@Param('id') id: string) { 
        return this.memberService.findOneById(id);
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Put('/:id')
    async updateOne(@Param('id') id: string, @Body() createMemberDto: CreateMemberDto) {
        return this.memberService.update(id, createMemberDto);
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Get('resendMail')
    @HttpCode(HttpStatus.OK)
    async resendMail(@Body() mail: any) {
        return this.memberService.sendAnEmail(mail);
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Get('resendMailLesson')
    @HttpCode(HttpStatus.OK)
    async resendMailLesson(@Body() mail: any) {
        return this.memberService.sendAnEmailLesson(mail);
    }
}
