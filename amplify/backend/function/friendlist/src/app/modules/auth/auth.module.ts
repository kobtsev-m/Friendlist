import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';

const jwtModuleOptions: JwtModuleOptions = {
  secret: process.env.JWT_SECRET || 'secret',
  signOptions: { expiresIn: '2h' },
};

@Module({
  providers: [AuthService, AuthResolver],
  imports: [JwtModule.register(jwtModuleOptions), forwardRef(() => UsersModule)],
  exports: [JwtModule],
})
export class AuthModule {}
