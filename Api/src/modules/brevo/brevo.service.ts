import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { Member } from '../member/member.schema';

import ministeringAppointment from './Templates/ministering-appointment';
import priesthoodLesson from './Templates/priesthood-lesson';

interface EmailInformations {
  receivers: { Name: string; Email: string }[];
  subject: string;
  html: string;
}

@Injectable()
export class BrevoService {
  private readonly logger = new Logger('BREVO');
  private readonly API_KEY: string;
  private readonly BASE_URL: string;
  private readonly senderEmail: string;
  private readonly senderName: string;
  private readonly personalEmail: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.API_KEY = this.configService.get<string>('BREVO_SECRET_KEY');
    this.BASE_URL = this.configService.get<string>('API_URL_BREVO');
    this.senderEmail = this.configService.get<string>('EMAIL_SENDER');
    this.senderName = this.configService.get<string>('EMAIL_SENDER_NAME');
    this.personalEmail = this.configService.get<string>('EMAIL_PERSO');

    this.logger.log(`BrevoService initialized with sender: ${this.senderName} <${this.senderEmail}>`);
  }

  private async sendMail(infos: EmailInformations) {
    console.log('url', this.BASE_URL);
    console.log('url key', this.API_KEY);
    console.log('infos', infos);

    const payload = {
      sender: {
        name: this.senderName,
        email: this.senderEmail,
      },
      to: infos.receivers.map(r => ({ email: r.Email, name: r.Name })),
      subject: infos.subject,
      htmlContent: infos.html,
    };

    const headers = {
      'api-key': this.API_KEY,
      'Content-Type': 'application/json',
      accept: 'application/json',
    };

    this.logger.log('Sending email with payload:');
    this.logger.debug(JSON.stringify(payload, null, 2));

    try {
      const response = await lastValueFrom(
        this.httpService.post(`${this.BASE_URL}/smtp/email`, payload, { headers }),
      );
      this.logger.log('Email sent successfully');
      this.logger.debug('Response data:');
      this.logger.debug(JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error) {
      this.logger.error('Error sending email via Brevo', error);
      throw error;
    }
  }

  // public sendMinisteringAppointmentMail(member: Member, mail: any) {
  //   this.logger.log(`Preparing ministering appointment mail for ${member.email}`);
  //   return this.sendMail({
  //     receivers: [{ Name: `${member.firstName} ${member.lastName}`, Email: member.email }],
  //     subject: `Entretien de service pastoral : EQUIPE ${mail.team}`,
  //     html: ministeringAppointment({
  //       date: mail.date || 'Non précisée',
  //       heur: mail.heur || 'Non précisée',
  //       url: mail.url || 'https://www.lds.org',
  //       PDC: this.personalEmail,
  //     }).html,
  //   });
  // }

  public sendPriesthoodLessonMail(member: Member, mail: any) {
    this.logger.log(`Preparing priesthood lesson mail for ${member.email}`);
    return this.sendMail({
      receivers: [{ Name: `${member.firstName} ${member.lastName}`, Email: member.email }],
      subject: `Leçon de prêtrise : ${mail.lesson}`,
      html: priesthoodLesson({
        lastname: member.lastName,
        firstname: member.firstName,
        date: '15/12/2021',
        lesson: 'la leçon ici --->',
        PDC: this.personalEmail,
      }).html,
    });
  }

  // ✅ NOUVELLE MÉTHODE POUR ENVOYER À TOUS LES MEMBRES
  // public async sendToAllMinisteringAppointment(mail: any) {
  public async sendMinisteringAppointmentMail(member: Member, mail: any) {

    if (!Array.isArray(mail.member)) {
      this.logger.error('mail.member doit être un tableau');
      return;
    }

    for (const member of mail.member) {
      if (!member?.email) {
        this.logger.warn(`Membre sans email, ignoré : ${JSON.stringify(member)}`);
        continue;
      }

      this.logger.log(`Envoi du mail à ${member.firstName} ${member.lastName} (${member.email})`);

      await this.sendMail({
        receivers: [{ Name: `${member.firstName} ${member.lastName}`, Email: member.email }],
        subject: `Entretien de service pastoral : EQUIPE ${mail.team}`,
        html: ministeringAppointment({
          date: mail.date || 'Date non précisée',
          heur: mail.heur || 'Heure non précisée',
          url: mail.url || 'https://www.lds.org',
          PDC: this.personalEmail,
        }).html,
      });
    }

    this.logger.log(`✅ Tous les mails ont été envoyés pour l'équipe ${mail.team}`);
  }
}


// import { Injectable, Logger } from '@nestjs/common';
// import { HttpService } from '@nestjs/axios';
// import { lastValueFrom } from 'rxjs';
// import { ConfigService } from '@nestjs/config';
// import { Member } from '../member/member.schema';

// import ministeringAppointment from './Templates/ministering-appointment';
// import priesthoodLesson from './Templates/priesthood-lesson';

// interface EmailInformations {
//   receivers: { Name: string; Email: string }[];
//   subject: string;
//   html: string;
// }

// @Injectable()
// export class BrevoService {
//   private readonly logger = new Logger('BREVO');
//   private readonly API_KEY: string;
//   private readonly BASE_URL: string;
//   private readonly senderEmail: string;
//   private readonly senderName: string;
//   private readonly personalEmail: string;

//   constructor(
//     private readonly httpService: HttpService,
//     private readonly configService: ConfigService,
//   ) {
//     this.API_KEY = this.configService.get<string>('BREVO_SECRET_KEY');
//     this.BASE_URL = this.configService.get<string>('API_URL_BREVO');
//     this.senderEmail = this.configService.get<string>('EMAIL_SENDER');
//     this.senderName = this.configService.get<string>('EMAIL_SENDER_NAME');
//     this.personalEmail = this.configService.get<string>('EMAIL_PERSO');

//     this.logger.log(`BrevoService initialized with sender: ${this.senderName} <${this.senderEmail}>`);
//   }

//   private async sendMail(infos: EmailInformations) {
//     console.log('url',this.BASE_URL);
//     console.log('url key',this.API_KEY);
//     console.log('infos',infos);
    
//     const payload = {
//       sender: {
//         name: this.senderName,
//         email: this.senderEmail,
//       },
//       to: infos.receivers.map(r => ({ email: r.Email, name: r.Name })),
//       subject: infos.subject,
//       htmlContent: infos.html,
//     };

//     const headers = {
//       'api-key': this.API_KEY,
//       'Content-Type': 'application/json',
//       'accept': 'application/json',
//     };

//     this.logger.log('Sending email with payload:');
//     this.logger.debug(JSON.stringify(payload, null, 2));

//     try {
//       const response = await lastValueFrom(
//         this.httpService.post(`${this.BASE_URL}/smtp/email`, payload, { headers })
//       );
//       this.logger.log('Email sent successfully');
//       this.logger.debug('Response data:');
//       this.logger.debug(JSON.stringify(response.data, null, 2));
//       return response.data;
//     } catch (error) {
//       this.logger.error('Error sending email via Brevo', error);
//       throw error;
//     }
//   }

//   public sendMinisteringAppointmentMail(member: Member, mail: any) {
//     console.log('mail =>', mail);
//     console.log('member =>', member);
    
//     this.logger.log(`Preparing ministering appointment mail for ${mail.email}`);
//     return this.sendMail({
//       receivers: [{ Name: `${mail.member.firstName} ${mail.member.lastName}`, Email: mail.member.email }],
//       subject: `Entretien de service pastoral : EQUIPE ${mail.team}`,
//       html: ministeringAppointment({
//         date: '15/12/2021',
//         heur: '13:30',
//         url: 'url ici --->',
//         PDC: this.personalEmail,
//       }).html,
//     });
//   }

//   public sendPriesthoodLessonMail(member: Member, mail: any) {
//     this.logger.log(`Preparing priesthood lesson mail for ${member.email}`);
//     return this.sendMail({
//       receivers: [{ Name: `${member.firstName} ${member.lastName}`, Email: member.email }],
//       subject: `Leçon de prêtrise : ${mail.lesson}`,
//       html: priesthoodLesson({
//         lastname: member.lastName,
//         firstname: member.firstName,
//         date: '15/12/2021',
//         lesson: 'la leçon ici --->',
//         PDC: this.personalEmail,
//       }).html,
//     });
//   }
// }

