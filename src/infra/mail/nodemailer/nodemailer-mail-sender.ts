import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import {
  MailSender,
  SendProps,
} from 'src/domain/auth/application/mail/mail-sender';
import { EnvService } from 'src/infra/env/env.service';

@Injectable()
export class NodemailerMailSender implements MailSender {
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
