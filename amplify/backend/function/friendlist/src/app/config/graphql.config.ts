import * as path from 'path';
import * as dotenv from 'dotenv';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

dotenv.config();

const graphQLConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  context: ({ req }) => ({ headers: req.headers })
};

if (process.env.ENV === 'local') {
  graphQLConfig.sortSchema = true;
  graphQLConfig.autoSchemaFile = path.join(process.cwd(), 'app', 'types', 'schema.gql');
  graphQLConfig.definitions = { path: path.join(process.cwd(), 'app', 'types', 'gql.types.ts') };
}

export = graphQLConfig;
