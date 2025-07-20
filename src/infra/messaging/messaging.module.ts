import { Module } from '@nestjs/common';
import { EventProducer } from 'src/domain/auth/application/messaging/event-producer';
import { KafkaEventProducer } from './kafka/kafka-event-producer';
import { KafkaService } from './kafka/kafka.service';
import { UserCreatedProducer } from 'src/domain/auth/application/messaging/producers/user-created.producer';

@Module({
  providers: [
    KafkaService,
    {
      provide: EventProducer,
      useClass: KafkaEventProducer,
    },
    UserCreatedProducer,
  ],
  exports: [UserCreatedProducer],
})
export class MessagingModule {}
