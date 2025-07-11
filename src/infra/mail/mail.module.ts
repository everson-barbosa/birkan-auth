import { Module } from '@nestjs/common';
import { MailSender } from 'src/domain/auth/application/mail/mail-sender';
import { NodemailerMailSender } from './nodemailer/nodemailer-mail-sender';

@Module({
  providers: [
    {
      provide: MailSender,
      useClass: NodemailerMailSender,
    },
  ],
  exports: [MailSender],
})
export class MailModule {}
