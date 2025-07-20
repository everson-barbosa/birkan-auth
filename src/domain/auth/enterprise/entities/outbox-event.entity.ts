import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Optional } from 'src/core/types/Optional';

export enum OutboxStatus {
  PENDING = 'PENDING',
  PROCESSED = 'PROCESSED',
}

interface OutboxEventProps {
  topic: string;
  payload: string;
  createdAt: Date;
  processedAt: Date | null;
  status: OutboxStatus;
}

export class OutboxEvent extends Entity<OutboxEventProps> {
  get topic() {
    return this.props.topic;
  }

  get payload() {
    return this.props.payload;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get processedAt() {
    return this.props.processedAt;
  }

  get status() {
    return this.props.status;
  }

  static create(
    props: Optional<OutboxEventProps, 'createdAt' | 'processedAt' | 'status'>,
    id?: UniqueEntityID,
  ) {
    const outboxEvent = new OutboxEvent(
      {
        ...props,
        createdAt: props?.createdAt ?? new Date(),
        processedAt: props?.processedAt ?? null,
        status: props?.status ?? OutboxStatus.PENDING,
      },
      id,
    );

    return outboxEvent;
  }
}
