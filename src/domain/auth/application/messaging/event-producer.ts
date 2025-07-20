import { Injectable } from '@nestjs/common';

export interface ProduceProps {
  readonly topic: string;
  readonly payload: any;
}

@Injectable()
export abstract class EventProducer {
  abstract produce(props: ProduceProps): Promise<any>;
}
