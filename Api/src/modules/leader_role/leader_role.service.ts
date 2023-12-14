import { Injectable } from '@nestjs/common';
import { LeaderRoles, LeaderRolesDocument } from './leader_role.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LeaderRoleService {
    constructor(@InjectModel(LeaderRoles.name) private _leaderRoleModel: Model<LeaderRolesDocument>) {}

    async create(leaderRole: Partial<LeaderRoles>): Promise<LeaderRolesDocument> {
        const newLeaderRoles = new this._leaderRoleModel(leaderRole);
        return newLeaderRoles.save();
    }

    async update(id: string, leaderRole: Partial<LeaderRoles>): Promise<LeaderRolesDocument> {
        return this._leaderRoleModel.findByIdAndUpdate(id, { ...leaderRole }, { new: true });
    }

    async findOneById(id: string): Promise<LeaderRolesDocument> {
        return this._leaderRoleModel.findById(id).exec();
    }

    async findOneByName(name: string): Promise<LeaderRolesDocument> {
        return this._leaderRoleModel.findOne({ name }).exec();
    }
}
