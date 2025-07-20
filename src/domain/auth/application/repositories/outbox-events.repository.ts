import { Injectable } from '@nestjs/common';
import { OutboxEvent } from '../../enterprise/entities/outbox-event.entity';

@Injectable()
export abstract class OutboxEventsRepository {
  abstract create(outboxEvent: OutboxEvent): Promise<void>;
}
