import * as dotenv from 'dotenv';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';
import { TokenPayload } from '../types/TokenPayload';

dotenv.config();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    try {
      const ctx = GqlExecutionContext.create(context).getContext();
      const authorizationHeader = ctx.headers.authorization;
      const [bearer, token] = authorizationHeader.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new Error();
      }
      const verifyTokenOptions = { secret: process.env.ACCESS_TOKEN_SECRET };
      const tokenPayload = <TokenPayload>this.jwtService.verify(token, verifyTokenOptions);
      ctx.userId = tokenPayload.id;
      return true;
    } catch {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
  }
}
