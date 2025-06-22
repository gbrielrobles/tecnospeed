import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer'

@Injectable()
export class MailerServices {
    transport: nodemailer.Transporter;
    private readonly logger: Logger = new Logger(MailerServices.name);
    constructor() {
        this.transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.PLUG_EMAIL_USERNAME,
                pass: process.env.PLUG_EMAIL_PASSWORD,
            },
        })           
    }

    async send(to: string, subject: string, message: string, file?: string, html?: string) {
        this.logger.log('sending email');
        await this.transport.sendMail({
            from: `Atendimento <${process.env.PLUG_EMAIL_USERNAME}>`,
            to: to,
            subject: subject,
            html: html,
            text: message,
            attachments: [
                {
                    filename: 'carta-van.pdf',
                    content: file,
                    encoding: 'base64',
                    contentType: 'application/pdf'
                }
            ]
        })
    }
} 