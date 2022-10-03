import * as dotenv from 'dotenv';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { TokenPayload } from '../types/TokenPayload';

dotenv.config();

const ROLES_GUARD_METADATA_KEY = 'ROLES_GUARD_METADATA_KEY';

export const UseRoles = (...roles: string[]) => SetMetadata(ROLES_GUARD_METADATA_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    try {
      const validRoles = this.reflector.getAllAndOverride(ROLES_GUARD_METADATA_KEY, [
        context.getHandler(),
        context.getClass()
      ]);
      if (!validRoles) {
        return true;
      }
      const ctx = GqlExecutionContext.create(context).getContext();
      const authorizationHeader = ctx.headers.authorization;
      const [bearer, token] = authorizationHeader.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new Error();
      }
      const verifyTokenOptions = { secret: process.env.ACCESS_TOKEN_SECRET };
      const tokenPayload = <TokenPayload>this.jwtService.verify(token, verifyTokenOptions);
      ctx.userId = tokenPayload.id;
      return validRoles.includes(tokenPayload.role);
    } catch {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
  }
}
