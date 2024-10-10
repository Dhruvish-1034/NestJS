import { NestFactory } from '@nestjs/core';
import { SharedModule } from './shared.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SharedModule,{
      transport: Transport.TCP,
      options:{
        port: 3001
      },
    }
  );
  await app.listen()
}

bootstrap();
