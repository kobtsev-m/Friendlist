import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserInput } from '../users/inputs/LoginUserInput';
import { CreateUserInput } from '../users/inputs/CreateUserInput';
import { TokensObject } from '../users/objects/TokensObject';

@Resolver('auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => TokensObject)
  login(@Args('user') input: LoginUserInput) {
    return this.authService.login(input);
  }

  @Mutation(() => Boolean)
  register(@Args('user') input: CreateUserInput) {
    return this.authService.register(input);
  }

  @Query(() => TokensObject)
  refreshTokens(@Args('refreshToken') refreshToken: string) {
    return this.authService.refreshTokens(refreshToken);
  }
}
