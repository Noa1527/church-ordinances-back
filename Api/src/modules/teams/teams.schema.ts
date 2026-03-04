import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Regions } from 'src/modules/user/dto/create-user.dto';
import { Member } from 'src/modules/member/member.schema';
import { Family } from 'src/modules/family/family.schema';

export type TeamDocument = Team & Document;

@Schema()
export class Team {

  @Prop({required: true})
  seq: number;

  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    type:[MongooseSchema.Types.ObjectId],
    ref: Member.name,
    default: [],
  })
  _members: (MongooseSchema.Types.ObjectId | Member)[];

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: Family.name,
    default: [],
  })
  _families: (MongooseSchema.Types.ObjectId | Family)[];

  @Prop({
    type: String, 
    enum: Object.values(Regions)
  })
  region: Regions;

}

export const TeamSchema = SchemaFactory.createForClass(Team);