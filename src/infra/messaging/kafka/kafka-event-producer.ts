import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { Producer } from 'kafkajs';
import {
  EventProducer,
  ProduceProps,
} from 'src/domain/auth/application/messaging/event-producer';

@Injectable()
export class KafkaEventProducer
  implements EventProducer, OnModuleInit, OnModuleDestroy
{
  private producer: Producer;

  constructor(private kafkaService: KafkaService) {
    this.producer = this.kafkaService.getKafka().producer();
  }

  async onModuleInit() {
    try {
      this.producer = this.kafkaService.getKafka().producer();

      await this.producer.connect();
    } catch (error) {
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }

  async produce({ topic, payload }: ProduceProps): Promise<void> {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(payload) }],
    });
  }
}
