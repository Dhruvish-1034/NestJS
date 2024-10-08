import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './jwt.constant';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../common/global.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );

      if(isPublic){
        return true
      }

      const request = context.switchToHttp().getRequest();
      const token = this.getTokenFromHeader(request);

      if (!token) {
        throw new UnauthorizedException();
      }

      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
    } catch (err) {
      throw new UnauthorizedException();
    }
    return true;
  }

  getTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
