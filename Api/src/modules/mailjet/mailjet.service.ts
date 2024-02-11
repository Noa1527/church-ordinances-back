import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Mailjet from 'node-mailjet';
import { Member } from '../member/member.schema';

import ministeringAppointment  from './Templates/ministering-appointment';
import priesthoodLesson  from './Templates/priesthood-lesson';

type emailInformations = {
    receivers: { Name: string; Email: string }[];
    subject: string;
    text: string;
    html: string;
};

@Injectable()
export class MailjetService {
    private logger = new Logger('MAILJET');
    private mailjet: Mailjet.Client;
    private senderAddress: string;
    private senderName: string;
    private personalEmail: string;
  
    constructor(public configService: ConfigService) {
      this.mailjet = new Mailjet.Client({
        apiKey: this.configService.get<string>('API_KEY'),
        apiSecret: this.configService.get<string>('SECRET_KEY'),
      });
      this.senderAddress = this.configService.get<string>('EMAIL_SENDER');
      this.senderName = this.configService.get<string>('EMAIL_SENDER_NAME');
      this.personalEmail = this.configService.get<string>('EMAIL_PERSO');
    }

    async sendMail(infos: emailInformations) {
      console.log('sendMail',infos);
      console.log(this.senderAddress , this.senderName);
      
      const response = await this.mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: this.senderAddress, 
              Name: this.senderName,
            },
            To: infos.receivers,
            Subject: infos.subject,
            TextPart: infos.text,
            HTMLPart: infos.html,
          },
        ],
      });
      
      // Use a type assertion to tell TypeScript that response.body is of type any
      const responseBody = response.body as any;

      // Now you can access the Messages property without TypeScript errors
      return { status: responseBody.Messages[0].Status };
    }

    public sendMinisteringAppointmentMail(member: Member, mail: any,) {
      // const env = this.configService.get<string>('NODE_ENV');
  
      // if (!env || env !== 'prod') {
      //   this.logger.log(`ENV DEV: send welcome mail to ${user.mail}`);
      //   return new Promise<any>((resolve) => resolve('Dev Environment'));
      // }
  
      return this.sendMail({
        receivers: [
          { Name: `${member.firstName} ${member.lastName}`, Email: member.email },
        ],
        subject: `Entretien de service pastoral : EQUIPE ${mail.team}`,
        ...ministeringAppointment({
          date: '15/12/2021',
          // date: mail.date,
          heur: '13:30',
          // heur: mail.heur,
          url: 'url ici --->',
          // url: mail.url,
          PDC: this.personalEmail,
        }),
      });
    }

    public sendPriesthoodLessonMail(member: Member, mail: any,) {
      // const env = this.configService.get<string>('NODE_ENV');
  
      // if (!env || env !== 'prod') {
      //   this.logger.log(`ENV DEV: send welcome mail to ${user.mail}`);
      //   return new Promise<any>((resolve) => resolve('Dev Environment'));
      // }
  
      return this.sendMail({
        receivers: [
          { Name: `${member.firstName} ${member.lastName}`, Email: member.email },
        ],
        subject: `Entretien de service pastoral : EQUIPE ${mail.team}`,
        ...priesthoodLesson({
          lastname: member.lastName,
          firstname: member.firstName,
          // date: mail.date,
          date: '15/12/2021',
          lesson: 'la leçon ici --->',
          // lesson: mail.lesson,
          PDC: this.personalEmail,
        }),
      });
    }
}

// voir pour les frere qui font la sainte cene
