import { DomainEvents } from 'src/core/events/domain-events';
import { EventHandler } from 'src/core/events/event-handler';
import { UserCreatedEvent } from 'src/domain/auth/enterprise/events/user-created.event';
import { Injectable } from '@nestjs/common';
import { UserCreatedProducer } from '../messaging/producers/user-created.producer';

@Injectable()
export class OnUserCreatedPublishEventSubscriber implements EventHandler {
  constructor(private userCreatedProducer: UserCreatedProducer) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.handler.bind(this), UserCreatedEvent.name);
  }

  private async handler({ user }: UserCreatedEvent) {
    await this.userCreatedProducer.produce({
      id: user.id.toString(),
      name: user.name,
      email: user.email,
    });
  }
}
