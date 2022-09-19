import { Query, Resolver } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { Role } from '../../entities/role.entity';

@Resolver('roles')
export class RolesResolver {
  constructor(private rolesService: RolesService) {}

  @Query(() => [Role])
  getAllRoles() {
    return this.rolesService.getAll();
  }
}
