import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EnvService } from 'src/env/env.service';
import { z } from 'zod';

const sendEmailSchema = z.object({
  to: z.string().email(),
  subject: z.string(),
  text: z.string().optional(),
  html: z.string().optional()
})

type SendEmailSchema = z.infer<typeof sendEmailSchema>

@Injectable()
export class MailService {
  constructor (private envService: EnvService) {}

  private transporter = nodemailer.createTransport({
    host: this.envService.get('MAIL_HOST'),
    port: this.envService.get('MAIL_PORT'),
    secure: false, 
  });

  async sendMail({ to, subject, text, html }: SendEmailSchema): Promise<void> {
    await this.transporter.sendMail({
      from: 'no-reply@example.com',
      to,
      subject,
      text,
      html,
    });
  }
}
