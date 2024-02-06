import { Injectable } from '@nestjs/common';
import { Ordinance, OrdinanceDocument } from './ordinance.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateOrdinanceDto } from './dto/update-odinance.dto';
import { CreateOrdinanceDto } from './dto/create-ordinance.dto';

@Injectable()
export class OrdinanceService {
    constructor(@InjectModel(Ordinance.name) private ordinanceModel: Model<OrdinanceDocument>) {}

    async create(ordinance: CreateOrdinanceDto): Promise<OrdinanceDocument> {
        const newOrdinance = new this.ordinanceModel(ordinance);
        return newOrdinance.save();
    }
    
    async update(id: string, ordinance: UpdateOrdinanceDto): Promise<OrdinanceDocument> {
        console.log('ordi odi',ordinance);
        return this.ordinanceModel.findByIdAndUpdate(id, { ...ordinance }, { new: true }).exec();
    }
}
