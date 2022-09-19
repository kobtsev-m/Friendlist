import * as path from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import typeOrmDataSource from '../typeorm.config';

const clientSourcePath = path.join('..', '..', '..', '..');

const graphQLModuleOptions: ApolloDriverConfig = {
  driver: ApolloDriver,
  sortSchema: true,
  context: ({ req }) => ({ headers: req.headers }),
  autoSchemaFile: path.join(clientSourcePath, 'schema.gql'),
  definitions: { path: path.join(clientSourcePath, 'src', 'types', 'api.ts') }
};

@Module({
  providers: [AppResolver],
  imports: [
    GraphQLModule.forRoot(graphQLModuleOptions),
    TypeOrmModule.forRoot(typeOrmDataSource.options),
    UsersModule,
    RolesModule,
    AuthModule
  ]
})
export class AppModule {}
