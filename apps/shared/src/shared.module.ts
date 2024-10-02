import { Module } from '@nestjs/common';
import { SharedController } from './shared.controller';
import { SharedService } from './shared.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { models } from '../common/model-exports';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: 'localhost',
    database: 'test',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    entities: models,
    synchronize: true
  })],
  controllers: [SharedController],
  providers: [SharedService],
  exports: [SharedService]
})

export class SharedModule {}
