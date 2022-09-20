import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';

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
      const user = this.jwtService.verify(token);
      ctx.userId = user.id;
      return true;
    } catch {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
  }
}
