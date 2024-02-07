import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrdinanceDocument = HydratedDocument<Ordinance>;

@Schema()
export class Ordinance {

    @Prop({default: false})
    Baptism: boolean;
    
    @Prop({default: false})
    AaronicPriesthood: boolean;

    @Prop({default: false})
    PriestHood: boolean;

    @Prop({default: false})
    Initiatory: boolean;

    @Prop({default: false})
    Endowment: boolean;

    @Prop({default: false})
    Sealing: boolean;
    
}

export const OrdinanceSchema = SchemaFactory.createForClass(Ordinance);
