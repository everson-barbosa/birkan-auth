import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class EventConsumer {
  abstract subscribe(
    topic: string,
    handler: (payload: any) => Promise<void>,
  ): Promise<void>;
}
