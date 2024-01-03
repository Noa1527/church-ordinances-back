import { Injectable, BadRequestException } from '@nestjs/common';
import { Member, MemberDocument } from './member.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { CreateMemberDto } from './dto/create-member.dto';
import { OrdinanceService } from '../ordinance/ordinance.service';
import { BlessingService } from '../blessing/blessing.service';
import { LeaderRoleService } from '../leader_role/leader_role.service';
import { Roles } from '../leader_role/leader_role.schema';
import { FamilyService } from '../family/family.service';
import { Regions } from '../user/dto/create-user.dto';

@Injectable()
export class MemberService {
    constructor(
        @InjectModel(Member.name) private memberModel: Model<MemberDocument>, 
        private readonly ordinanceService: OrdinanceService,
        private readonly blessingService: BlessingService,
        private readonly leaderRoleService: LeaderRoleService,
        private readonly _familyService: FamilyService
    ) {}

    async create(member: CreateMemberDto): Promise<Member> {
        const newMember = new this.memberModel(member);
        newMember.birthDate = this.convertBirthDate(member.birthDate);
    
        const createAndAssignId = async (service: OrdinanceService | BlessingService | LeaderRoleService | FamilyService, property: string) => {
            if (member[property]) {
                const newItem = await service.create(member[property]);
                newMember[property] = newItem._id;
            }
        }
    
        await createAndAssignId(this.ordinanceService, 'ordinance');
        await createAndAssignId(this.blessingService, 'blessing');
        await createAndAssignId(this.leaderRoleService, 'leaderRoles');
        await createAndAssignId(this._familyService, '_family');
    
        return newMember.save();
    }
    
    async update(id: string, member: CreateMemberDto): Promise<Member> {
        console.log('------> ici <-------',member);
        
        const updatedMember = await this.memberModel.findById(id);
        updatedMember.birthDate = this.convertBirthDate(member.birthDate);
    
        const updateAndAssignId = async (service: OrdinanceService | BlessingService | LeaderRoleService, property: string) => {
            if (member[property]) {
                const updatedItem = await service.update(updatedMember[property].toString(), member[property]);
                updatedMember[property] = updatedItem._id;
            }
        }
    
        await updateAndAssignId(this.ordinanceService, 'ordinance');
        await updateAndAssignId(this.blessingService, 'blessing');
        await updateAndAssignId(this.leaderRoleService, 'leaderRoles');
    
        if (member._family) {
            const updatedFamily = await this._familyService.update(updatedMember._family.toString(), member._family);
            updatedMember._family = new Types.ObjectId(updatedFamily._id);
        }

        if (member.regions) {
            updatedMember.regions = member.regions;
        }
        console.log('------> ici <-------',updatedMember);
        
        return updatedMember.save();
    }


    private convertBirthDate(birthDate: string): Date {
        const [day, month, year] = birthDate.split("/"); // birthDate is string here
        if (day.length !== 2 || month.length !== 2 || year.length !== 4) {
            throw new BadRequestException("birthDate must be in format DD/MM/YYYY");
        }

        return new Date(`${year}-${month}-${day}`);
    }

    async findAll(region: Regions) {
        return await this.memberModel.find({regions: region})
        .populate(['ordinance', 'blessing', 'leaderRoles', '_family'])
        .sort({ firstName: 1 })
        .exec();
    }

    async findOneById(id: string) { 
      return await this.memberModel.findById(id)
      .populate(['ordinance', 'blessing', 'leaderRoles', '_family'])
      .exec();
    }

    async findOneByFirstName(firstName: string) {
        return await this.memberModel.findOne({ firstName }).exec();
    }

    async findOneByLastName(lastName: string) {
        return await this.memberModel.findOne({ lastName }).exec();
    }

    async findOneByEmail(email: string) {
        return await this.memberModel.findOne({ email }).exec();
    }
    
    async findLeaders(region: Regions): Promise<Member[]> {
        let leaders = await this.memberModel.find({ regions: region })
            .populate({
                path: 'leaderRoles',
                match: { roles: { $in: [Roles.BranchPresident, Roles.EldersQuorum] } }
            })
            .populate('ordinance blessing')
            .sort({ firstName: 1 })
            .exec(); 
        return leaders.filter(member => member.leaderRoles !== null);
    }
    
    async findWomenLeaders(region: Regions): Promise<Member[]> {
        let leaders = await this.memberModel.find({ regions: region })
            .populate({
                path: 'leaderRoles',
                match: { roles: { $in: [Roles.ReliefSociety, Roles.Primary, Roles.YoungWomen] } }
            })
            .populate('ordinance blessing')
            .sort({ firstName: 1 })
            .exec(); 
        return leaders.filter(member => member.leaderRoles !== null);
    }
}
