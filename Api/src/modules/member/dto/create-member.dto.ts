import { IsString, IsEmail, IsPhoneNumber, IsEnum, IsOptional, ValidateNested, IsMongoId } from 'class-validator';
import { Gender } from '../member.schema';
import { Type } from 'class-transformer';
import { CreateOrdinanceDto } from 'src/modules/ordinance/dto/create-ordinance.dto';
import { CreateBlessingDto } from 'src/modules/blessing/dto/create-blessing.dto';
import { CreateLeaderRoleDto } from 'src/modules/leader_role/dto/create-leader-role.dto';
import { CreateFamilyDto } from 'src/modules/family/dto/create-family.dto';
import { Regions } from 'src/modules/user/dto/create-user.dto';
import { LeaderRoleController } from 'src/modules/leader_role/leader_role.controller';
import { ObjectId } from 'mongoose';
import { LeaderRoles } from 'src/modules/leader_role/leader_role.schema';

export class CreateMemberDto {

    @IsString()
    readonly firstName: string;
    
    @IsString()
    readonly lastName: string;

    @IsEmail()
    readonly email: string;

    @IsString() 
    readonly birthDate: string;

    @IsPhoneNumber('FR')
    readonly phone: string;

    @IsEnum(Gender)
    gender: Gender;
    
    @IsEnum(Regions)
    regions: Regions;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateOrdinanceDto)
    ordinance?: CreateOrdinanceDto; 
    
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateBlessingDto)
    blessing?: CreateBlessingDto;

    // @IsOptional()
    // @ValidateNested()
    // @Type(() => CreateLeaderRoleDto)
    // leaderRoles?: CreateLeaderRoleDto;
    @IsMongoId()
    leaderRoles?: LeaderRoles;
    
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateFamilyDto)
    _family?: CreateFamilyDto;
}
