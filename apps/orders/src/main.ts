import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule)
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
  })
  await app.startAllMicroservices();
  await app.listen(3003);
}

bootstrap();
