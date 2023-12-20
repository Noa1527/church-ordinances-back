import { IsString, IsEmail, IsPhoneNumber, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Gender } from '../member.schema';
import { Type } from 'class-transformer';
import { CreateOrdinanceDto } from 'src/modules/ordinance/dto/create-ordinance.dto';
import { CreateBlessingDto } from 'src/modules/blessing/dto/create-blessing.dto';
import { CreateLeaderRoleDto } from 'src/modules/leader_role/dto/create-leader-role.dto';
import { CreateFamilyDto } from 'src/modules/family/dto/create-family.dto';

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

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateOrdinanceDto)
    ordinance?: CreateOrdinanceDto; 
    
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateBlessingDto)
    blessing?: CreateBlessingDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateLeaderRoleDto)
    leaderRoles?: CreateLeaderRoleDto;
    
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateFamilyDto)
    _family?: CreateFamilyDto;
}
