import { Injectable } from '@nestjs/common';
import { Ordinance, OrdinanceDocument } from './ordinance.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrdinanceService {
    constructor(@InjectModel(Ordinance.name) private ordinanceModel: Model<OrdinanceDocument>) {}

    async create(ordinance: Partial<Ordinance>): Promise<OrdinanceDocument> {
        const newOrdinance = new this.ordinanceModel(ordinance);
        return newOrdinance.save();
    }
    
    async update(id: string, ordinance: Partial<Ordinance>): Promise<OrdinanceDocument> {
        return this.ordinanceModel.findByIdAndUpdate(id, { ...ordinance }, { new: true });
    }
}
