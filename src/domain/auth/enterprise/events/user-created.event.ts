import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { DomainEvent } from 'src/core/events/domain-event';
import { User } from '../entities/user.aggreate-root';

export class UserCreatedEvent implements DomainEvent {
  public user: User;
  public ocurredAt: Date;

  constructor(user: User) {
    this.user = user;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityID {
    return this.user.id;
  }
}
