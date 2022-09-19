import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

const ROLES_GUARD_METADATA_KEY = 'ROLES_GUARD_METADATA_KEY';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_GUARD_METADATA_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    try {
      const requiredRoles = this.reflector.getAllAndOverride(ROLES_GUARD_METADATA_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredRoles) {
        return true;
      }
      const ctx = GqlExecutionContext.create(context).getContext();
      const authorizationHeader = ctx.headers.authorization;
      const [bearer, token] = authorizationHeader.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new Error();
      }
      const user = this.jwtService.verify(token);
      ctx.userId = user.id;
      return requiredRoles.every((role) => user.roles.includes(role));
    } catch {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
  }
}
