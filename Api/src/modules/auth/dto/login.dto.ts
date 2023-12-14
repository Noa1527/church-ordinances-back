import { IsString, IsEmail, MinLength, IsBoolean, IsMongoId } from 'class-validator';

export class LoginDto {

    @IsMongoId()
    readonly _id: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    @MinLength(8)
    readonly password: string;

    @IsBoolean()
    readonly isAdmin: boolean;
}