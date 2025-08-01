import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './infra/env/env';
import { EnvModule } from './infra/env/env.module';
import { HttpModule } from './infra/http/http.module';
import { MailModule } from './infra/mail/mail.module';
import { EventsModule } from './infra/events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    MailModule,
    HttpModule,
    EnvModule,
    EventsModule,
  ],
})
export class AppModule {}
