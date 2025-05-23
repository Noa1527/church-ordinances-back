import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { MemberService } from './member.service';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './member.schema';
import { Regions } from '../user/dto/create-user.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

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
    @Patch('/:id')
    async updateOne(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto): Promise<Member> {

        return this.memberService.update(id, updateMemberDto);
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Post('resendMail')
    @HttpCode(HttpStatus.OK)
    async resendMail(@Body() mail: any) {
        console.log('mail', mail);
        
        return this.memberService.sendAnEmail(mail);
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Get('resendMailLesson')
    @HttpCode(HttpStatus.OK)
    async resendMailLesson(@Body() mail: any) {
        return this.memberService.sendAnEmailLesson(mail);
    }
    @Delete('/:id')
    async delete(@Param('id') id: string) {
        return this.memberService.delete(id);
    }


}
