import { randomUUID } from 'node:crypto';
import { Optional } from 'src/core/types/Optional';

export enum OutboxStatus {
  PENDING = 'PENDING',
  PROCESSED = 'PROCESSED',
}

interface OutboxEventProps {
  id: string;
  topic: string;
  payload: string;
  createdAt: Date;
  processedAt: Date | null;
  status: OutboxStatus;
}

export class OutboxEvent {
  private props: OutboxEventProps;

  private constructor(props: OutboxEventProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

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
    props: Optional<
      OutboxEventProps,
      'id' | 'createdAt' | 'processedAt' | 'status'
    >,
  ) {
    const outboxEvent = new OutboxEvent({
      ...props,
      id: props?.id ?? randomUUID(),
      createdAt: props?.createdAt ?? new Date(),
      processedAt: props?.processedAt ?? null,
      status: props?.status ?? OutboxStatus.PENDING,
    });

    return outboxEvent;
  }
}
