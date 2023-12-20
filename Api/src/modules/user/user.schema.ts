import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export enum Gender {
  Male = 'H',
  Female = 'F',
}

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({required: true})
    firstName: string;

    @Prop({required: true})
    lastName: string;
    
    @Prop({required: true})
    email: string;
    
    @Prop({required: true})
    password: string;
    
    @Prop({default: false, required: false})
    isAdmin: Boolean;

    @Prop({default: false, required: false})
    isActive: Boolean;

    @Prop({default: Date.now})
    createdAt: Date;

    @Prop({type: String, enum: Object.values(Gender)})
    gender: Gender;

    @Prop([{ type: String, ref: 'Comment' }])
    comments: string[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'LeaderRoles' })
    leaderRoles: mongoose.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
