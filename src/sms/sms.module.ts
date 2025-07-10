import { Module } from '@nestjs/common';
import { LowdbService } from './lowdb/lowdb.service';
import { SmsSender } from './sms-sender';
import { LowdbSmsSender } from './lowdb/lowdb-sms-sender';

@Module({
  providers: [
    LowdbService,
    {
      provide: SmsSender,
      useClass: LowdbSmsSender,
    },
  ],
  exports: [SmsSender],
})
export class SmsModule {}
