import { NestFactory } from '@nestjs/core';
import { SharedModule } from './shared.module';

async function bootstrap() {
  const app = await NestFactory.create(SharedModule);
  await app.listen(5000);
}
bootstrap();
