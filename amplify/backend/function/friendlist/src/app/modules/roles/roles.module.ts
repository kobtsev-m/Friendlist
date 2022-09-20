import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../../entities/role.entity';
import { RolesResolver } from './roles.resolver';

@Module({
  providers: [RolesService, RolesResolver],
  imports: [TypeOrmModule.forFeature([Role])],
  exports: [RolesService],
})
export class RolesModule {}
