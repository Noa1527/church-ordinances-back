import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

}

export const TeamSchema = SchemaFactory.createForClass(Team);