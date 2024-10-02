import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { SharedModule } from 'apps/shared/src/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { models } from 'apps/shared/common/model-exports';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature(models)],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
