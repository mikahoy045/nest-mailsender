import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter;

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('MAIL_HOST'),
            port: this.configService.get<number>('MAIL_PORT'),
            secure: true, // true for 465, false for other ports
            auth: {
                user: this.configService.get<string>('MAIL_USER'), // Your SMTP username
                pass: this.configService.get<string>('MAIL_PASS'), // Your SMTP password
            },
        });
    }

    async sendEmail(to: string, subject: string, htmlContent: string): Promise<any> {
        try {
            const info = await this.transporter.sendMail({
                from: '"SOCIAL MEDIA SENSING EWS" <sms@silvanus-project.eu>',
                to: to,
                subject: subject,
                html: htmlContent,
            });
            console.log("Message sent: %s", info.messageId);
            return { message: 'Email sent successfully', messageId: info.messageId };
        } catch (error) {
            console.error("Error sending email:", error);
            throw error;
        }
    }
}
