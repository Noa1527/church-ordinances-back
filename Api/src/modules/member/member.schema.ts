import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Regions } from '../user/dto/create-user.dto';
import { LeaderRoles } from '../leader_role/leader_role.schema';

export enum Gender {
  Male = 'H',
  Female = 'F',
}

export type MemberDocument = HydratedDocument<Member>;

@Schema()
export class Member {
    
    @Prop({required: true})
    lastName: string;

    @Prop({required: true})
    firstName: string;
    
    @Prop({required: true})
    email: string;
    
    @Prop()
    birthDate: Date;

    @Prop()
    phone: string;

    @Prop({type: String, enum: Object.values(Gender)})
    gender: Gender;

    @Prop({type: String, enum: Object.values(Regions)})
    regions: Regions;

    @Prop([{ type: String, ref: 'Comment' }])
    comments: string[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: LeaderRoles.name })
    leaderRoles: LeaderRoles;

    @Prop({ type: Date })
    aaronicPriesthoodReception: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Ordinance' })
    ordinance: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Blessing' })
    blessing: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Family' })
    _family: mongoose.Types.ObjectId;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
