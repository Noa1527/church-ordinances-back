import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {

    @Prop()
    comment: Text;

    @Prop({ type: String, ref: 'User' })
    author: string;

    @Prop({ type: String, ref: 'Member' })
    member: string;

}

export const CommentSchema = SchemaFactory.createForClass(Comment);
