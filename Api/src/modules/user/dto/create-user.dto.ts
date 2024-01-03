import { Type } from 'class-transformer';
import { IsString, IsEmail, MinLength, IsBoolean, MaxLength, IsOptional, ValidateNested, isEnum, IsEnum,} from 'class-validator';
import { CreateLeaderRoleDto } from 'src/modules/leader_role/dto/create-leader-role.dto';

export enum Regions {
    Toul = 'Toul',
    Cholet = 'Cholet',
}
export class CreateUserDto {

    @IsString()
    readonly firstName: string;
    
    @IsString()
    readonly lastName: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(60)
    readonly password: string;

    @IsBoolean()
    readonly isAdmin: boolean;

    @IsBoolean()
    readonly isActive: boolean;

    @IsEnum(Regions)
    readonly regions: Regions;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateLeaderRoleDto)
    leaderRoles?: CreateLeaderRoleDto;
}

