import { Injectable } from '@nestjs/common';
import { SendProps, SmsSender } from '../sms-sender';
import { LowdbService } from './lowdb.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class LowdbSmsSender implements SmsSender {
  constructor(private lowdbService: LowdbService) {}

  async send({ to, message }: SendProps): Promise<void> {
    await this.lowdbService.create({
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      message,
      to,
    });
  }
}
