import { Type } from 'class-transformer';
import { IsString, IsEmail, MinLength, IsBoolean, MaxLength, IsMongoId, IsOptional, ValidateNested,} from 'class-validator';
import { CreateLeaderRoleDto } from 'src/modules/leader_role/dto/create-leader-role.dto';

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

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateLeaderRoleDto)
    leaderRoles?: CreateLeaderRoleDto; // Use CreateOrdinanceDto


}

