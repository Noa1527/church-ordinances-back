import { Type } from 'class-transformer';
import { IsString, IsEmail, MinLength, IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { CreateLeaderRoleDto } from 'src/modules/leader_role/dto/create-leader-role.dto';
import { Regions } from 'src/modules/user/dto/create-user.dto';

export enum Gender {
    Male = 'H',
    Female = 'F',
} 

export class RegisterDto {
    @IsString()
    readonly firstName: string;
    
    @IsString()
    readonly lastName: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    @MinLength(8)
    readonly password: string;

    @IsBoolean()
    readonly isAdmin: boolean;

    @IsBoolean()
    readonly isActive: boolean;

    @IsString()
    readonly gender: Gender;

    @IsString()
    readonly regions: Regions;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateLeaderRoleDto)
    leaderRoles?: CreateLeaderRoleDto; 

}