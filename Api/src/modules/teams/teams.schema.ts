import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Regions } from '../user/dto/create-user.dto';

export type TeamDocument = Team & Document;

@Schema()
export class Team {

  @Prop({required: true})
  seq: string;

  @Prop({ required: true })
  name: string;

  @Prop([String])
  members: string[];

  @Prop([String])
  families: string[];

  @Prop({type: String, enum: Object.values(Regions)})
  region: Regions;

}

export const TeamSchema = SchemaFactory.createForClass(Team);