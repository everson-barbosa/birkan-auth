import { Injectable } from '@nestjs/common';
import { MailSender, SendProps } from '../mail-sender';
import * as nodemailer from 'nodemailer';
import { EnvService } from 'src/env/env.service';

@Injectable()
export class NodemailerSender implements MailSender {
  constructor(private envService: EnvService) {}

  private transporter = nodemailer.createTransport({
    host: this.envService.get('MAIL_HOST'),
    port: this.envService.get('MAIL_PORT'),
    secure: false,
  });

  async send({ to, subject, html, text }: SendProps): Promise<void> {
    await this.transporter.sendMail({
      from: 'no-reply@example.com',
      to,
      subject,
      text,
      html,
    });
  }
}
