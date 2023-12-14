import { IsBoolean, IsEnum } from 'class-validator';
import { Roles } from '../leader_role.schema';

export class CreateLeaderRoleDto {

    @IsEnum(Roles)
    roles: Roles;
    
}