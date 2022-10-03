import { Context, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Role, User } from '../../entities/user.entity';
import { RolesGuard, UseRoles } from '../auth/guards/roles.gruad';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';

@Resolver('users')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  @UseGuards(AuthGuard)
  getUser(@Context('userId') userId: string) {
    return this.usersService.getById(userId);
  }

  @Query(() => [User])
  @UseRoles(Role.Admin)
  @UseGuards(RolesGuard)
  getAllUsers() {
    return this.usersService.getAll();
  }
}
