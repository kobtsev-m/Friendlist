import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesModule } from '../roles/roles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UsersResolver } from './users.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [UsersService, UsersResolver],
  imports: [TypeOrmModule.forFeature([User]), RolesModule, forwardRef(() => AuthModule)],
  exports: [UsersService],
})
export class UsersModule {}
