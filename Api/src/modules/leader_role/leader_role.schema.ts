import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum Roles {
    BranchPresident = 'Président De Branche',
    EldersQuorum = 'Prêtrise',
    ReliefSociety = 'Société Secours',
    YoungMen = 'Jeunes Gens',
    YoungWomen = 'Jeunes Filles',
    Primary = 'Primaire',
    Member = 'Membre',
}

export type LeaderRolesDocument = HydratedDocument<LeaderRoles>;

@Schema()
export class LeaderRoles {

    @Prop({type: String, enum: Object.values(Roles), default: Roles.Member})
    roles: Roles;
}

export const LeaderRolesSchema = SchemaFactory.createForClass(LeaderRoles);
