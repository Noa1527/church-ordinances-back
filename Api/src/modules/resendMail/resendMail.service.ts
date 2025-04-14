import { Injectable } from '@nestjs/common';
import { InjectResend } from 'nest-resend';
import { Resend} from 'resend';

@Injectable()
export class ResendService {
    public constructor(@InjectResend() private readonly resendClient: Resend) {}

    // public async sendEmail() {
    //     try {
    //         return await this.resendClient.emails.send({
    //             from: 'mickael.raveneau@devnightspace.com',
    //             to: 'mickael.raveneau@devnightspace.com',
    //             subject: 'Howdy!',
    //             html: '<strong>YAY!</strong>',
    //         });
    //     } catch (error) {
    //         console.error('Error sending email:', error);
    //         throw error;
    //     }
    // }
    
}
