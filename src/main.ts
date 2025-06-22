import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const configService = app.get(EnvService);

  const port = configService.get('PORT');
  const kafkaBrokers = configService.get('KAFKA_BROKERS');
  const kafkaGroupId = configService.get('KAFKA_GROUP_ID');

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: kafkaBrokers,
      },
      consumer: {
        groupId: kafkaGroupId,
      },
    },
  });

  await app.listen(port);
}
bootstrap();
