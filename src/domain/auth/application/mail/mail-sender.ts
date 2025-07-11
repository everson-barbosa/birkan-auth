import { Injectable } from '@nestjs/common';

export interface SendProps {
  readonly to: string;
  readonly subject: string;
  readonly text?: string;
  readonly html?: string;
}

@Injectable()
export abstract class MailSender {
  abstract send(props: SendProps): Promise<void>;
}
