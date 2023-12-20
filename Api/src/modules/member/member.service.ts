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
    // async create(member: CreateMemberDto): Promise<Member> {
    //     const newMember = new this.memberModel(member);
    //     newMember.birthDate = this.convertBirthDate(member.birthDate);

    //     if (member.ordinance) {
    //         const newOrdinance = await this.ordinanceService.create( member.ordinance);
    //         newMember.ordinance = newOrdinance._id;
    //     }
    //     if (member.blessing) {
    //         const newBlessing = await this.blessingService.create(member.blessing);
    //         newMember.blessing = newBlessing._id;
    //     }

    //     if (member.leaderRoles) {
    //         const newLeaderRoles = await this.leaderRoleService.create(member.leaderRoles);
    //         newMember.leaderRoles = newLeaderRoles._id;
    //     }

    //     if (member._family) {
    //         const newFamily = await this._familyService.create(member._family);
    //         newMember._family = newFamily._id;
    //     }

    //     return newMember.save();
    // }

    // async update(id: string, member: CreateMemberDto): Promise<Member> {
    //     const updatedMember = await this.memberModel.findById(id);
    //     updatedMember.birthDate = this.convertBirthDate(member.birthDate);
      
    //     if (member.ordinance) {
    //       const updatedOrdinance = await this.ordinanceService.update(updatedMember.ordinance.toString(), member.ordinance);
    //       updatedMember.ordinance = updatedOrdinance._id;
    //     }
        
    //     if (member.blessing) {
    //       const updatedBlessing = await this.blessingService.update(updatedMember.blessing.toString(), member.blessing);
    //       updatedMember.blessing = updatedBlessing._id;
    //     }
    //     if (member.leaderRoles) {
    //       const updatedLeaderRoles = await this.leaderRoleService.update(updatedMember.leaderRoles.toString(), member.leaderRoles);
    //       updatedMember.leaderRoles = updatedLeaderRoles._id;
    //     }
    //     if (member._family) {
    //       const updatedFamily = await this._familyService.update(updatedMember._family.toString(), member._family);
    //       updatedMember._family = new Types.ObjectId(updatedFamily._id);
    //     }
      
    //     return updatedMember.save();
    //   }
    async update(id: string, member: CreateMemberDto): Promise<Member> {
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
    
        return updatedMember.save();
    }

    private convertBirthDate(birthDate: string): Date {
        const [day, month, year] = birthDate.split("/"); // birthDate is string here
        if (day.length !== 2 || month.length !== 2 || year.length !== 4) {
            throw new BadRequestException("birthDate must be in format DD/MM/YYYY");
        }

        return new Date(`${year}-${month}-${day}`);
    }

    async findAll() {
        return await this.memberModel.find()
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
    
    async findLeaders(): Promise<Member[]> {
        let leaders = await this.memberModel.find()
            .populate({
                path: 'leaderRoles',
                match: { roles: { $in: [Roles.BranchPresident, Roles.EldersQuorum] } }
            })
            .populate('ordinance blessing')
            .sort({ firstName: 1 })
            .exec(); 
        return leaders.filter(member => member.leaderRoles !== null);
    }
    
    async findWomenLeaders(): Promise<Member[]> {
        let leaders = await this.memberModel.find()
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
