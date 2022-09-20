import { Context, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from '../../entities/user.entity';
import { Roles, RolesGuard } from '../auth/guards/roles.gruad';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';

@Resolver('users')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  @UseGuards(AuthGuard)
  getUser(@Context('userId') userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Query(() => [User])
  @Roles('admin')
  @UseGuards(RolesGuard)
  getAllUsers() {
    return this.usersService.getAll();
  }
}
