import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import * as graphQlConfig from './config/graphql.config';
import * as typeOrmConfig from './config/typeorm.config';

@Module({
  providers: [AppResolver],
  imports: [
    GraphQLModule.forRoot(graphQlConfig),
    TypeOrmModule.forRootAsync({ useFactory: () => typeOrmConfig }),
    UsersModule,
    RolesModule,
    AuthModule
  ]
})
export class AppModule {}
