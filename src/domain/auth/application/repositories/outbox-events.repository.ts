import { Injectable } from '@nestjs/common';
import { OutboxEvent } from '../messaging/outbox-event';

@Injectable()
export abstract class OutboxEventsRepository {
  abstract create(outboxEvent: OutboxEvent): Promise<void>;
}
