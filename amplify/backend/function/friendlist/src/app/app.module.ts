import * as path from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import * as typeOrmConfig from './config/typeorm.config';

const graphQLModuleOptions: ApolloDriverConfig = {
  driver: ApolloDriver,
  sortSchema: true,
  context: ({ req }) => ({ headers: req.headers }),
  autoSchemaFile: path.join(process.cwd(), 'app', 'types', 'schema.gql'),
  definitions: { path: path.join(process.cwd(), 'app', 'types', 'gql.types.ts') }
};

@Module({
  providers: [AppResolver],
  imports: [
    GraphQLModule.forRoot(graphQLModuleOptions),
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    RolesModule,
    AuthModule
  ]
})
export class AppModule {}
