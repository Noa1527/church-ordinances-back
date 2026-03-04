import { Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { Family } from 'src/modules/family/family.schema';
import { Member } from 'src/modules/member/member.schema';

export class CreateTeamDto {

    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    seq: number;

    @IsString()
    region: string;

    @Type(() => Member)
    _members: Member[] = [];

    @Type(() => Family)
    _families: Family[] = [];

  // même chose pour _families
}
