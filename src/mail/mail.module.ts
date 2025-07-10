import { Module } from '@nestjs/common';
import { MailSender } from './mail-sender';
import { NodemailerSender } from './node-mailer/nodemailer-sender';

@Module({
  providers: [
    {
      provide: MailSender,
      useClass: NodemailerSender,
    },
  ],
  exports: [MailSender],
})
export class MailModule {}
