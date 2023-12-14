import { IsBoolean } from 'class-validator';

export class CreateBlessingDto {
    @IsBoolean()
    is_got: boolean;
}