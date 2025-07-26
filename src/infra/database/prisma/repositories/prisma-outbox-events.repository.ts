import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { OutboxEvent } from 'src/domain/auth/application/messaging/outbox-event';
import { PrismaOutboxEventMapper } from '../mappers/prisma-outbox-event.mapper';
import { OutboxEventsRepository } from 'src/domain/auth/application/repositories/outbox-events.repository';

@Injectable()
export class PrismaOutboxEventsRepository implements OutboxEventsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(outboxEvent: OutboxEvent): Promise<void> {
    const data = PrismaOutboxEventMapper.toPrisma(outboxEvent);

    await this.prismaService.outboxEvent.create({ data });
  }
}
