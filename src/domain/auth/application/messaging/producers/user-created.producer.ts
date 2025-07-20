import { Injectable } from '@nestjs/common';
import { EventProducer } from '../event-producer';

interface UserCreatedPayload {
  readonly id: string;
  readonly email: string;
  readonly name: string;
}

@Injectable()
export class UserCreatedProducer {
  private readonly topic = 'user.created';

  constructor(private eventProducer: EventProducer) {}

  async produce(payload: UserCreatedPayload) {
    await this.eventProducer.produce({ topic: this.topic, payload });
  }
}
