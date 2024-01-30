import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Regions } from "../user/dto/create-user.dto";

export type FamilyDocument = HydratedDocument<Family>;
export type FamilyDocuments = FamilyDocument[];


@Schema({ timestamps: true, collection: 'familes' })
export class Family {
    
    @Prop({ type: String, required: true })
    name: string;

    @Prop({type: String, enum: Object.values(Regions)})
    region: Regions;

}
export const FamilySchema = SchemaFactory.createForClass(Family);