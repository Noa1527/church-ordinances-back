import { IsString } from 'class-validator';

export class CreateFamilyDto {

    @IsString()
    readonly name: string;

}
