import { Injectable } from '@nestjs/common';

export interface SendProps {
  to: string;
  message: string;
}

@Injectable()
export abstract class SmsSender {
  abstract send(props: SendProps): Promise<void>;
}
