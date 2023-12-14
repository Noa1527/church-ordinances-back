import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type FamilyDocument = HydratedDocument<Family>;
export type FamilyDocuments = FamilyDocument[];

@Schema({ timestamps: true, collection: 'familes' })
export class Family {
    
    @Prop({ type: String, required: true })
    name: string;

}
export const FamilySchema = SchemaFactory.createForClass(Family);