import * as path from 'path';
import * as dotenv from 'dotenv';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

dotenv.config();

const schemaPath = path.join(process.cwd(), 'schema.gql');
const frontEndPath = path.join(process.cwd(), '..', '..', '..', '..', '..');
const definitionsPath = path.join(frontEndPath, 'src', 'types', 'api.types.ts');

const graphQLConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  context: ({ req }) => ({ headers: req.headers })
};

if (process.env.ENV === 'local') {
  graphQLConfig.autoSchemaFile = schemaPath;
  graphQLConfig.definitions = { path: definitionsPath };
  graphQLConfig.sortSchema = true;
} else {
  graphQLConfig.typePaths = [schemaPath];
  graphQLConfig.playground = false;
}

export = graphQLConfig;
