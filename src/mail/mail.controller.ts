import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { Response } from 'express';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Post('/send-email')
    async sendEmail(@Body() body: { to: string; subject: string; htmlUP: string }, @Res() res: Response) {
        try {
            const { to, subject, htmlUP } = body;
            const result = await this.mailService.sendEmail(to, subject, htmlUP);
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: 'Failed to send email', error: error.message });
        }
    }

    @Get('/mikah')
    testControllerMethod() {
        return { message: "This is just a test endpoint." };
    }
}
