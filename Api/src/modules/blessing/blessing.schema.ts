import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlessingDocument = HydratedDocument<Blessing>;

@Schema()
export class Blessing {

    @Prop({default: false})
    is_got: boolean;

}

export const BlessingSchema = SchemaFactory.createForClass(Blessing);
