import { Injectable } from '@nestjs/common';
import { Family, FamilyDocument } from './family.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFamilyDto } from './dto/create-family.dto';

@Injectable()
export class FamilyService {

    constructor( 
        @InjectModel(Family.name) private _familyModel: Model<FamilyDocument> 
    ) {}

    async create(family: Partial<Family>): Promise<FamilyDocument> {
       return this._familyModel.create(family);
    }

    async findAll(userRegion: string): Promise<FamilyDocument[]> {
        return this._familyModel.find({ region: userRegion, isDeleted: false }).sort({ name: 1 }).exec();
    }

    async update(id: string, family: Partial<Family>): Promise<FamilyDocument> {
        return this._familyModel.findByIdAndUpdate(id, { ...family }, { new: true });
    }

    async delete(id: string) {  
        return await this._familyModel
        .findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    }
}
