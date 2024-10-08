import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SharedModule } from 'apps/shared/src/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { models } from 'apps/shared/common/model-exports';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/jwt.constant';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ScheduleModule } from '@nestjs/schedule';
import { MulterModule } from '@nestjs/platform-express';
import * as path from 'path';
import { Query } from 'apps/shared/common/query';

@Module({
  imports: [
    TypeOrmModule.forFeature(models),
    SharedModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2d' },
    }),
    ScheduleModule.forRoot(),
    MulterModule.register({
      dest: path.join(__dirname, '..', 'upload'),
    })
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    Query,
  ],
})
export class UsersModule {}
