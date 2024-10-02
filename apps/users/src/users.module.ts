import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SharedModule } from 'apps/shared/src/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { models } from 'apps/shared/common/model-exports';

@Module({
  imports: [TypeOrmModule.forFeature(models), SharedModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
