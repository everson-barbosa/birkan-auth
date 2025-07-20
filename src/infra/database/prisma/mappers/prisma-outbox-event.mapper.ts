import { $Enums, OutboxEvent as PrismaOutboxEvent } from '@prisma/client';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import {
  OutboxEvent,
  OutboxStatus,
} from 'src/domain/auth/enterprise/entities/outbox-event.entity';

export class PrismaOutboxEventMapper {
  static toDomain(raw: PrismaOutboxEvent): OutboxEvent {
    return OutboxEvent.create(
      {
        payload: raw.payload,
        topic: raw.topic,
        createdAt: raw.createdAt,
        processedAt: raw.processedAt,
        status: OutboxStatus[raw.status],
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(raw: OutboxEvent): PrismaOutboxEvent {
    return {
      id: raw.id.toString(),
      payload: raw.payload,
      topic: raw.topic,
      createdAt: raw.createdAt,
      processedAt: raw.processedAt,
      status: $Enums.OutboxStatus[raw.status],
    };
  }
}
