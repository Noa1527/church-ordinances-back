import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, subject: string, content: string) {
    await this.mailerService.sendMail({
      to: to,
      subject: subject,
      text: content,
      // Si vous voulez utiliser un template HTML à la place :
      // html: '<b>Hello world</b>',
    });
  }
}
