import { Module } from '@nestjs/common';
import { MessagingModule } from '../messaging/messaging.module';
import { OnUserCreatedPublishEventSubscriber } from 'src/domain/auth/application/subscribers/on-user-created-publish-event.subscriber';

@Module({
  imports: [MessagingModule],
  providers: [OnUserCreatedPublishEventSubscriber],
})
export class EventsModule {}
