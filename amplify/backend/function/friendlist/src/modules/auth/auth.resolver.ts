import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserInput } from '../users/inputs/LoginUserInput';
import { CreateUserInput } from '../users/inputs/CreateUserInput';

@Resolver('auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => String)
  login(@Args('user') input: LoginUserInput) {
    return this.authService.login(input);
  }

  @Mutation(() => String)
  register(@Args('user') input: CreateUserInput) {
    return this.authService.register(input);
  }
}
