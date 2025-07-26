import { $Enums, OutboxEvent as PrismaOutboxEvent } from '@prisma/client';
import {
  OutboxEvent,
  OutboxStatus,
} from 'src/domain/auth/application/messaging/outbox-event';

export class PrismaOutboxEventMapper {
  static toDomain(raw: PrismaOutboxEvent): OutboxEvent {
    return OutboxEvent.create({
      id: raw.id,
      payload: raw.payload,
      topic: raw.topic,
      createdAt: raw.createdAt,
      processedAt: raw.processedAt,
      status: OutboxStatus[raw.status],
    });
  }

  static toPrisma(raw: OutboxEvent): PrismaOutboxEvent {
    return {
      id: raw.id,
      payload: raw.payload,
      topic: raw.topic,
      createdAt: raw.createdAt,
      processedAt: raw.processedAt,
      status: $Enums.OutboxStatus[raw.status],
    };
  }
}
