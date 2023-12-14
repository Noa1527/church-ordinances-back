import { IsString, IsEmail, MinLength, IsBoolean, MaxLength, IsMongoId,} from 'class-validator';

export class UpdateUserDto {

    @IsMongoId()
    readonly _id: string;

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

}