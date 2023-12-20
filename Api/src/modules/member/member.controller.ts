import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MemberService } from './member.service';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './member.schema';

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
    async findAll() {
        return this.memberService.findAll();
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Get('leaders')
    findLeaders(): Promise<Member[]> {
       return this.memberService.findLeaders();
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Get('womenLeaders')
    findWomenLeaders(): Promise<Member[]> {
        return this.memberService.findWomenLeaders();
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
}
