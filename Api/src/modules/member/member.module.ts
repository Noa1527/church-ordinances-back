import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from './member.schema';
import { Ordinance, OrdinanceSchema } from '../ordinance/ordinance.schema';
import { OrdinanceService } from '../ordinance/ordinance.service';
import { Blessing, BlessingSchema } from '../blessing/blessing.schema';
import { BlessingService } from '../blessing/blessing.service';
import { LeaderRoles, LeaderRolesSchema } from '../leader_role/leader_role.schema';
import { LeaderRoleService } from '../leader_role/leader_role.service';
import { FamilyService } from '../family/family.service';
import { Family, FamilySchema } from '../family/family.schema';
import { ResendService } from '../resendMail/resendMail.service';
import { MailjetService } from '../mailjet/mailjet.service';
import { BrevoService } from '../brevo/brevo.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Member.name, schema: MemberSchema },
      { name: Ordinance.name, schema: OrdinanceSchema },
      { name: Blessing.name, schema: BlessingSchema },
      { name: LeaderRoles.name, schema: LeaderRolesSchema},
      { name: Family.name, schema: FamilySchema},

    ]),
  ],
  providers: [
    MemberService, 
    OrdinanceService, 
    BlessingService, 
    LeaderRoleService, 
    FamilyService, 
    ResendService,
    MailjetService,
    BrevoService
  ],
  controllers: [MemberController]
})
export class MemberModule {}
