import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { EnvService } from '../../env/env.service';

@Injectable()
export class KafkaService {
  private kafka: Kafka;

  constructor(private envService: EnvService) {
    const brokers = this.envService.get('KAFKA_BROKERS');

    this.kafka = new Kafka({ brokers });
  }

  getKafka(): Kafka {
    return this.kafka;
  }
}
