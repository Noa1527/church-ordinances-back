import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team, TeamDocument } from 'src/modules/teams/teams.schema';
import { CreateTeamDto } from './dto/create-team.sto';

@Injectable()
export class TeamsService {
  constructor(@InjectModel(Team.name) private teamModel: Model<TeamDocument>) {}

async syncTeamsForRegion(region: string, maxTeams: number): Promise<void> {
  console.log('region', region);
  console.log('maxTeams', maxTeams);
  
  const existingTeams = await this.teamModel
    .find({ region })
    .sort({ seq: 1 })
    .exec();

  const currentCount = existingTeams.length;

  // 1. Ajouter si trop peu d'équipes
  if (currentCount < maxTeams) {
    const toAdd = maxTeams - currentCount;

    const newTeams = Array.from({ length: toAdd }).map((_, i) => ({
      name: `Équipe ${currentCount + i + 1}`,
      seq: currentCount + i + 1,
      region,
      _members: [],
      _families: [],
    }));

    await this.teamModel.insertMany(newTeams);
  }

  // 2. Supprimer si trop d'équipes
  if (currentCount > maxTeams) {
    const teamsToDelete = existingTeams.slice(maxTeams); // candidates à supprimer

    const hasLinkedData = teamsToDelete.some(
      team => (team._members?.length ?? 0) > 0 || (team._families?.length ?? 0) > 0
    );

    if (hasLinkedData) {
      throw new BadRequestException(
        'Certaines équipes à supprimer contiennent encore des membres ou des familles. Veuillez les vider avant de réduire le nombre maximal.'
      );
    }

    const idsToDelete = teamsToDelete.map(team => team._id);
    await this.teamModel.deleteMany({ _id: { $in: idsToDelete } });
  }
}

  
  

  async create(team: CreateTeamDto): Promise<Team> {
    console.log('team', team);
    
    return this.teamModel.create(team);
  }

  async findAll(userRegion: string): Promise<Team[]> {
    return this.teamModel.find({region: userRegion}).populate(['_members', '_families']).exec();
  }

  async findOne(id: string): Promise<Team> {
    return this.teamModel.findById(id).exec();
  }

  async update(seq: string, team: Partial<Team>): Promise<Team> {
    return this.teamModel.findOneAndUpdate({ seq: seq }, team, { new: true }).exec();
  }
}