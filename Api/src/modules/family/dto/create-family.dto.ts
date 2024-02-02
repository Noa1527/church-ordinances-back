import { IsEnum, IsString } from 'class-validator';
import { Regions } from 'src/modules/user/dto/create-user.dto';

export class CreateFamilyDto {

    @IsString()
    readonly name: string;

    @IsEnum(Regions)
    readonly region: Regions;

    @IsString()
    readonly code?: string;
}
